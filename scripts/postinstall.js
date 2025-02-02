'use strict'

const debug = require('debug-logfmt')('youtube-dl-exec:install')
const { mkdir, chmod } = require('node:fs/promises')
const { pipeline } = require('node:stream/promises')
const { createWriteStream } = require('node:fs')

const {
  YOUTUBE_DL_PATH,
  YOUTUBE_DL_HOST,
  YOUTUBE_DL_DIR,
  YOUTUBE_DL_FILE,
  YOUTUBE_DL_SKIP_DOWNLOAD
} = require('../src/constants')

const getLatest = ({ assets }) => {
  const { browser_download_url: url } = assets.find(
    ({ name }) => name === YOUTUBE_DL_FILE
  )
  return fetch(url)
}

const getBinary = async url => {
  let response = await fetch(url)

  if (response.headers.get('content-type') !== 'application/octet-stream') {
    const payload = await response.json()
    if (!response.ok) throw new Error(JSON.stringify(payload, null, 2))
    response = await getLatest(payload)
  }

  return response.body
}

const installBinary = async () => {
  debug('downloading', { url: YOUTUBE_DL_HOST })
  const [binary] = await Promise.all([
    getBinary(YOUTUBE_DL_HOST),
    mkdir(YOUTUBE_DL_DIR, { recursive: true })
  ])
  debug('writing', { path: YOUTUBE_DL_PATH })
  await pipeline(binary, createWriteStream(YOUTUBE_DL_PATH))
  await chmod(YOUTUBE_DL_PATH, 0o755)
  debug({ status: 'success' })
}

YOUTUBE_DL_SKIP_DOWNLOAD ? debug({ status: 'skipped' }) : installBinary()
