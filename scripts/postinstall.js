'use strict'

const fetch = require('node-fetch')
const fs = require('fs').promises
const mkdirp = require('mkdirp')

const BINARY_CONTENT_TYPES = [
  'binary/octet-stream',
  'application/octet-stream',
  'application/x-binary'
]

const {
  YOUTUBE_DL_PATH,
  YOUTUBE_DL_HOST,
  YOUTUBE_DL_DIR,
  YOUTUBE_DL_FILE,
  YOUTUBE_DL_SKIP_DOWNLOAD
} = require('../src/constants')

const getBinary = async url => {
  const response = await fetch(url)
  const contentType = response.headers.get('content-type')

  if (BINARY_CONTENT_TYPES.includes(contentType)) {
    return response.buffer()
  }

  const [{ assets }] = await response.json()
  const { browser_download_url: downloadUrl } = assets.find(
    ({ name }) => name === YOUTUBE_DL_FILE
  )

  return fetch(downloadUrl).then(res => res.buffer())
}

if (!YOUTUBE_DL_SKIP_DOWNLOAD) {
  Promise.all([getBinary(YOUTUBE_DL_HOST), mkdirp(YOUTUBE_DL_DIR)])
    .then(([buffer]) => fs.writeFile(YOUTUBE_DL_PATH, buffer, { mode: 493 }))
    .catch(err => console.error(err.message || err))
}
