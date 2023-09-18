'use strict'

const test = require('ava')

const youtubedl = require('..')

test('show help', async t => {
  await t.throwsAsync(youtubedl(), { instanceOf: Error })
})

test('unsupported URLs', async t => {
  t.plan(6)
  const url = 'https://www.apple.com/homepod'
  try {
    await youtubedl(url, { dumpSingleJson: true, noWarnings: true })
  } catch (error) {
    t.is(
      error.message,
      'ERROR: Unsupported URL: https://www.apple.com/homepod/'
    )
    t.true(error instanceof Error)
    t.truthy(error.command)
    t.truthy(error.stderr)
    t.truthy(error.stdout)
    t.truthy(error.exitCode)
  }
})

test('video unavailable', async t => {
  t.plan(4)
  const url = 'https://www.youtube.com/watch?v=x8erEF_1POY'
  try {
    await youtubedl(url, { dumpSingleJson: true, noWarnings: true })
  } catch (error) {
    t.is(
      error.message,
      'ERROR: [youtube] x8erEF_1POY: Video unavailable. The uploader has not made this video available in your country'
    )
    t.true(error instanceof Error)
    t.truthy(error.command)
    t.truthy(error.exitCode)
  }
})
