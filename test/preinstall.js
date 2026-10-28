'use strict'

const { chmod, mkdtemp, rm, writeFile } = require('node:fs/promises')
const { tmpdir } = require('node:os')
const path = require('node:path')

const $ = require('tinyspawn')
const test = require('ava')

const { YOUTUBE_DL_PATH } = require('../src/constants')

const SCRIPT_PATH = path.join(__dirname, '..', 'scripts', 'preinstall.js')

const testOnUnix = process.platform === 'win32' ? test.skip : test

const { YOUTUBE_DL_SKIP_PYTHON_CHECK, ...env } = process.env

const runPreinstall = extraEnv =>
  $(process.execPath, [SCRIPT_PATH], { env: { ...env, ...extraEnv } })

const createBinDir = async (t, pythons = {}) => {
  const dir = await mkdtemp(path.join(tmpdir(), 'preinstall-'))
  t.teardown(() => rm(dir, { recursive: true, force: true }))
  for (const [binary, version] of Object.entries(pythons)) {
    const file = path.join(dir, binary)
    await writeFile(file, `#!/bin/sh\necho "Python ${version}"\n`)
    await chmod(file, 0o755)
  }
  return dir
}

const READ_YT_DLP_PYTHON_FLOOR = `
import re, sys, zipfile
source = zipfile.ZipFile(sys.argv[1]).read('yt_dlp/__init__.py').decode()
print('.'.join(re.search(r'sys.version_info < \\((\\d+), (\\d+)\\)', source).groups()))
`

const getPreinstallPythonFloor = async t => {
  const error = await t.throwsAsync(
    runPreinstall({ PATH: await createBinDir(t) })
  )
  return error.stderr.match(/needs Python (\d+\.\d+) or newer/)[1]
}

test('passes with the python of this machine', async t => {
  await t.notThrowsAsync(runPreinstall())
})

test('fails when python is missing', async t => {
  const PATH = await createBinDir(t)

  const error = await t.throwsAsync(runPreinstall({ PATH }))

  t.is(error.exitCode, 1)
  t.true(error.stderr.includes('youtube-dl-exec needs Python 3.11 or newer'))
})

test('passes when python is missing but the check is skipped', async t => {
  const PATH = await createBinDir(t)

  await t.notThrowsAsync(
    runPreinstall({ PATH, YOUTUBE_DL_SKIP_PYTHON_CHECK: '1' })
  )
})

testOnUnix('passes with the minimum python', async t => {
  const PATH = await createBinDir(t, { python3: '3.11.0' })

  await t.notThrowsAsync(runPreinstall({ PATH }))
})

testOnUnix('fails when python is too old', async t => {
  const PATH = await createBinDir(t, { python3: '3.10.14', python: '2.7.18' })

  await t.throwsAsync(runPreinstall({ PATH }))
})

testOnUnix('falls back to python when python3 is too old', async t => {
  const PATH = await createBinDir(t, { python3: '3.10.14', python: '3.12.1' })

  await t.notThrowsAsync(runPreinstall({ PATH }))
})

testOnUnix('requires the same python as the bundled yt-dlp', async t => {
  const { stdout: ytDlpFloor } = await $('python3', [
    '-c',
    READ_YT_DLP_PYTHON_FLOOR,
    YOUTUBE_DL_PATH
  ])

  t.is(await getPreinstallPythonFloor(t), ytDlpFloor)
})
