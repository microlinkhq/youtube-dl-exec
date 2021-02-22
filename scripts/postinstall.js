'use strict'

const { promisify } = require('util')
const stream = require('stream')
const mkdirp = require('mkdirp')
const got = require('got')
const fs = require('fs')

const pipeline = promisify(stream.pipeline)

const {
  YOUTUBE_DL_PATH,
  YOUTUBE_DL_HOST,
  YOUTUBE_DL_DIR,
  YOUTUBE_DL_FILENAME
} = require('../src/constants')

const getBinaryUrl = async endpoint => {
  const [{ assets }] = await got(endpoint, {
    responseType: 'json',
    resolveBodyOnly: true
  })

  const { browser_download_url: downloadUrl } = assets.find(
    ({ name }) => name === YOUTUBE_DL_FILENAME
  )
  return downloadUrl
}

const main = async url => {
  await mkdirp(YOUTUBE_DL_DIR)
  return pipeline(
    got.stream(url),
    fs.createWriteStream(YOUTUBE_DL_PATH, { mode: 493 })
  )
}

getBinaryUrl(YOUTUBE_DL_HOST)
  .then(main)
  .then(message => message && console.log(message))
  .catch(err => console.error(err.message || err))
