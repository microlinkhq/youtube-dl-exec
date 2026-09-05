'use strict'

const {
  chmodSync,
  copyFileSync,
  mkdtempSync,
  writeFileSync,
  rmSync
} = require('fs')
const { tmpdir } = require('os')
const path = require('path')
const test = require('ava')

const { create } = require('..')

const echoArgvBinary = () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'yt dl-'))
  const script = path.join(dir, 'echo-args.js')
  writeFileSync(
    script,
    'process.stdout.write(JSON.stringify(process.argv.slice(2)))\n'
  )

  if (process.platform === 'win32') {
    const node = path.join(dir, path.basename(process.execPath))
    const binary = path.join(dir, 'yt-dlp.cmd')
    copyFileSync(process.execPath, node)
    writeFileSync(binary, `@echo off\r\n"${node}" "${script}" %*\r\n`)
    return { dir, binary }
  }

  const binary = path.join(dir, 'yt-dlp')
  writeFileSync(
    binary,
    `#!${process.execPath}\nprocess.stdout.write(JSON.stringify(process.argv.slice(2)))\n`
  )
  chmodSync(binary, 0o755)
  return { dir, binary }
}

test('passes url and flags as argv when the binary path has spaces', async t => {
  const { dir, binary } = echoArgvBinary()
  t.teardown(() => rmSync(dir, { recursive: true, force: true }))

  const url = 'https://example.com/watch?v=1&foo=bar'
  const { stdout, spawnfile } = await create(binary).exec(url, {
    skipDownload: true,
    output: url
  })

  t.is(spawnfile, binary)
  t.deepEqual(JSON.parse(stdout), [
    '--skip-download',
    '--output',
    url,
    '--',
    url
  ])
})

test('places an option-shaped url after -- so it stays positional', async t => {
  const { dir, binary } = echoArgvBinary()
  t.teardown(() => rmSync(dir, { recursive: true, force: true }))

  const url = '--version'
  const subprocess = create(binary).exec(url, { skipDownload: true })
  t.deepEqual(subprocess.spawnargs, [
    binary,
    '--skip-download',
    '--',
    url
  ])

  const { stdout } = await subprocess
  t.deepEqual(JSON.parse(stdout), ['--skip-download', '--', url])
})
