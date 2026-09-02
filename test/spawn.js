'use strict'

const {
  copyFileSync,
  mkdtempSync,
  writeFileSync,
  rmSync,
  symlinkSync
} = require('fs')
const { tmpdir } = require('os')
const path = require('path')
const test = require('ava')

const { create } = require('..')

test('passes url and flags as argv when the binary path has spaces', async t => {
  const dir = mkdtempSync(path.join(tmpdir(), 'yt dl-'))
  t.teardown(() => rmSync(dir, { recursive: true, force: true }))

  const binary = path.join(dir, path.basename(process.execPath))
  const script = path.join(dir, 'echo-args.js')
  if (process.platform === 'win32') copyFileSync(process.execPath, binary)
  else symlinkSync(process.execPath, binary)
  writeFileSync(
    script,
    'process.stdout.write(JSON.stringify(process.argv.slice(2)))\n'
  )

  const url = 'https://example.com/watch?v=1&foo=bar'
  const { stdout, spawnfile } = await create(binary).exec(script, {
    skipDownload: true,
    output: url
  })

  t.is(spawnfile, binary)
  t.deepEqual(JSON.parse(stdout), ['--skip-download', '--output', url])
})
