'use strict'

const { copyFile, mkdtemp, rm } = require('node:fs/promises')
const { tmpdir } = require('node:os')
const path = require('node:path')

const $ = require('tinyspawn')
const test = require('ava')

const SCRIPT_NAME = 'preinstall.mjs'

const SCRIPT_PATH = path.join(__dirname, '..', 'scripts', SCRIPT_NAME)

const createEnv = () => {
  const { YOUTUBE_DL_SKIP_PYTHON_CHECK, ...env } = process.env
  return env
}

const runPreinstall = scriptPath =>
  $(process.execPath, [scriptPath], { env: createEnv() })

test('passes when dependencies are not installed yet', async t => {
  const dir = await mkdtemp(path.join(tmpdir(), 'preinstall-'))
  t.teardown(() => rm(dir, { recursive: true, force: true }))
  const scriptPath = path.join(dir, SCRIPT_NAME)
  await copyFile(SCRIPT_PATH, scriptPath)

  const { exitCode } = await runPreinstall(scriptPath)

  t.is(exitCode, 0)
})

test('passes when python is available', async t => {
  const { exitCode } = await runPreinstall(SCRIPT_PATH)

  t.is(exitCode, 0)
})
