'use strict'

const test = require('ava')

const youtubedl = require('../src')

test('access to subprocess object', async t => {
  const subprocess = youtubedl.exec(
    'https://www.youtube.com/watch?v=2Z4m4lnjxkY',
    {
      dumpSingleJson: true
    }
  )

  // The snapshot only needs the handle. A live yt-dlp holds the worker open.
  t.teardown(() => {
    const done = subprocess.catch(() => {})
    subprocess.kill('SIGKILL')
    return done
  })

  t.snapshot(Object.keys(subprocess))
})
