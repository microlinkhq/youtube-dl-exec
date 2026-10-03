'use strict'

const { copyFile, mkdir, mkdtemp, rm, writeFile } = require('node:fs/promises')
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

const copyScriptToEmptyProject = async t => {
  const dir = await mkdtemp(path.join(tmpdir(), 'preinstall-'))
  t.teardown(() => rm(dir, { recursive: true, force: true }))
  const scriptPath = path.join(dir, SCRIPT_NAME)
  await copyFile(SCRIPT_PATH, scriptPath)
  return { dir, scriptPath }
}

const installBrokenVersionCheck = async dir => {
  const packageDir = path.join(dir, 'node_modules', 'binary-version-check')
  await mkdir(packageDir, { recursive: true })
  await writeFile(
    path.join(packageDir, 'package.json'),
    JSON.stringify({ type: 'module', exports: './index.js' })
  )
  await writeFile(
    path.join(packageDir, 'index.js'),
    "import 'a-dependency-that-is-missing'\n"
  )
}

test('passes when dependencies are not installed yet', async t => {
  const { scriptPath } = await copyScriptToEmptyProject(t)

  const { exitCode } = await runPreinstall(scriptPath)

  t.is(exitCode, 0)
})

test('fails when the version check is installed but broken', async t => {
  const { dir, scriptPath } = await copyScriptToEmptyProject(t)
  await installBrokenVersionCheck(dir)

  const error = await t.throwsAsync(runPreinstall(scriptPath))

  t.is(error.exitCode, 1)
  t.true(error.stderr.includes('a-dependency-that-is-missing'))
})

test('passes when python is available', async t => {
  const { exitCode } = await runPreinstall(SCRIPT_PATH)

  t.is(exitCode, 0)
})
