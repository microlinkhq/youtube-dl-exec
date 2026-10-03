'use strict'

const { copyFile, mkdir, mkdtemp, rm, writeFile } = require('node:fs/promises')
const { tmpdir } = require('node:os')
const path = require('node:path')

const $ = require('tinyspawn')
const test = require('ava')

const SCRIPT_NAME = 'preinstall.js'

const SCRIPTS_DIR = path.join(__dirname, '..', 'scripts')

const { YOUTUBE_DL_SKIP_PYTHON_CHECK, ...env } = process.env

const runPreinstall = dir =>
  $(process.execPath, [path.join(dir, SCRIPT_NAME)], { env })

const createProjectWithoutDependencies = async t => {
  const dir = await mkdtemp(path.join(tmpdir(), 'preinstall-'))
  t.teardown(() => rm(dir, { recursive: true, force: true }))
  await copyFile(
    path.join(SCRIPTS_DIR, SCRIPT_NAME),
    path.join(dir, SCRIPT_NAME)
  )
  return dir
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
  const dir = await createProjectWithoutDependencies(t)

  await t.notThrowsAsync(runPreinstall(dir))
})

test('fails when the version check is installed but broken', async t => {
  const dir = await createProjectWithoutDependencies(t)
  await installBrokenVersionCheck(dir)

  const error = await t.throwsAsync(runPreinstall(dir))

  t.is(error.exitCode, 1)
  t.true(error.stderr.includes('a-dependency-that-is-missing'))
})

test('passes when python is available', async t => {
  await t.notThrowsAsync(runPreinstall(SCRIPTS_DIR))
})
