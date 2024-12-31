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
  t.plan(6)
  const url = 'https://www.youtube.com/watch?v=tPEE9ZwTmy0'
  try {
    await youtubedl(url, {
      extractorArgs: 'youtube:player_client=android,web'
    })
  } catch (error) {
    t.is(
      error.message,
      [
        'WARNING: [youtube] tPEE9ZwTmy0: android client https formats require a PO Token which was not provided. They will be skipped as they may yield HTTP Error 403. You can manually pass a PO Token for this client with --extractor-args "youtube:po_token=android+XXX. For more information, refer to  https://github.com/yt-dlp/yt-dlp/wiki/Extractors#po-token-guide . To enable these broken formats anyway, pass --extractor-args "youtube:formats=missing_pot"',
        'WARNING: [youtube] tPEE9ZwTmy0: web client https formats require a PO Token which was not provided. They will be skipped as they may yield HTTP Error 403. You can manually pass a PO Token for this client with --extractor-args "youtube:po_token=web+XXX. For more information, refer to  https://github.com/yt-dlp/yt-dlp/wiki/Extractors#po-token-guide . To enable these broken formats anyway, pass --extractor-args "youtube:formats=missing_pot"',
        'WARNING: Only images are available for download. use --list-formats to see them',
        'ERROR: [youtube] tPEE9ZwTmy0: Requested format is not available. Use --list-formats for a list of available formats'
      ].join('\n')
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
