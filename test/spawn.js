'use strict'

const { mkdtempSync, writeFileSync, chmodSync, rmSync } = require('fs')
const { tmpdir } = require('os')
const path = require('path')
const test = require('ava')

const { create } = require('..')

test('passes url and flags as argv when the binary path has spaces', async t => {
  const dir = mkdtempSync(path.join(tmpdir(), 'yt dl-'))
  t.teardown(() => rmSync(dir, { recursive: true, force: true }))

  const binary = path.join(dir, 'echo-args')
  writeFileSync(
    binary,
    `#!${process.execPath}\nprocess.stdout.write(JSON.stringify(process.argv.slice(2)))\n`
  )
  chmodSync(binary, 0o755)

  const url = 'https://example.com/watch?v=1&foo=bar'
  const { stdout, spawnfile } = await create(binary).exec(url, {
    skipDownload: true,
    output: 'a|b'
  })

  t.is(spawnfile, binary)
  t.deepEqual(JSON.parse(stdout), [url, '--skip-download', '--output', 'a|b'])
})
