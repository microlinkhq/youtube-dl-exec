'use strict'

const test = require('ava')

const youtubedl = require('../src')

test('acess to subprocess object', async t => {
  const subprocess = youtubedl.exec(
    'https://www.youtube.com/watch?v=2Z4m4lnjxkY',
    {
      dumpSingleJson: true
    }
  )

  t.snapshot(Object.keys(subprocess))
})
