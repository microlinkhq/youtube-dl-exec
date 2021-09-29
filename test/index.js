'use strict'

const test = require('ava')

const youtubedl = require('..')

test('throw errors', async t => {
  await t.throwsAsync(youtubedl(), { instanceOf: Error })
})

test('execute commands', async t => {
  const output = await youtubedl(
    'https://www.youtube.com/watch?v=2Z4m4lnjxkY',
    {
      dumpSingleJson: true
    }
  )

  t.true(typeof output === 'object')
})

test('conditional JSON parsing', async t => {
  const output = await youtubedl(
    'https://www.youtube.com/watch?v=tu3Db9onH6k',
    {
      listFormats: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true
    }
  )

  t.is(typeof output, 'string')
})
