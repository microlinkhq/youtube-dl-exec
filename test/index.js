'use strict'

const test = require('ava')

const youtubedl = require('..')

const isCI = !!process.env.CI

;(isCI ? test.skip : test)('execute commands', async t => {
  const output = await youtubedl(
    'https://www.youtube.com/watch?v=2Z4m4lnjxkY',
    {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true
    }
  )
  t.true(typeof output === 'object')
})
;(isCI ? test.skip : test)('parse JSON automatically', async t => {
  const output = await youtubedl(
    'https://www.youtube.com/watch?v=tu3Db9onH6k',
    {
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      simulate: true
    }
  )
  t.is(typeof output, 'string')
})
