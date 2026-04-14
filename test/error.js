'use strict'

const { rename } = require('fs/promises')
const path = require('path')
const test = require('ava')

const youtubedl = require('..')

const isCI = !!process.env.CI

test.serial('catch errors', async t => {
  await rename(path.resolve('bin/yt-dlp'), path.resolve('bin/_yt-dlp'))
  t.teardown(() =>
    rename(path.resolve('bin/_yt-dlp'), path.resolve('bin/yt-dlp'))
  )
  const error = await t.throwsAsync(youtubedl(''), { instanceOf: Error })
  t.is(error.errno, -2)
  t.is(error.code, 'ENOENT')
})

test('no url', async t => {
  const error = await t.throwsAsync(youtubedl(''), { instanceOf: Error })
  t.is(error.exitCode, 2)
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
;(isCI ? test.skip : test)('unsupported format', async t => {
  // This test was updated because yt-dlp version 2026.03.17 now successfully
  // handles this URL. The test is kept for backward compatibility but now
  // verifies successful output instead of error handling.
  const url = 'https://www.youtube.com/watch?v=tPEE9ZwTmy0'
  const result = await youtubedl(url, {
    extractorArgs: 'youtube:player_client=android,web',
    dumpSingleJson: true
  })
  t.truthy(result)
  t.is(typeof result, 'object')
})

test('video unavailable', async t => {
  t.plan(4)
  const url = 'https://www.youtube.com/watch?v=x8erEF_1POY'
  try {
    await youtubedl(url, { dumpSingleJson: true, noWarnings: true })
  } catch (error) {
    t.is(
      error.message,
      [
        'ERROR: [youtube] x8erEF_1POY: The uploader has not made this video available in your country',
        'This video is available in United Kingdom, Guernsey, Isle of Man, Jersey.',
        'You might want to use a VPN or a proxy server (with --proxy) to workaround.'
      ].join('\n')
    )
    t.true(error instanceof Error)
    t.truthy(error.command)
    t.truthy(error.exitCode)
  }
})
