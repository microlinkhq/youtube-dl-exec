'use strict'

const test = require('ava')

const youtubedl = require('..')

test('acess to subprocess object', async t => {
  const subprocess = youtubedl.raw(
    'https://www.youtube.com/watch?v=2Z4m4lnjxkY',
    {
      dumpJson: true
    }
  )

  t.snapshot(Object.keys(subprocess))
})
