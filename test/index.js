'use strict'

const pReflect = require('p-reflect')
const test = require('ava')

const youtubedl = require('..')

test('throw errors', async t => {
  const { reason } = await pReflect(youtubedl())
  t.true(reason instanceof Error)
})

test('execute commands', async t => {
  const output = await youtubedl(
    'https://www.youtube.com/watch?v=2Z4m4lnjxkY',
    {
      dumpJson: true
    }
  )

  t.true(typeof output === 'object')
})
