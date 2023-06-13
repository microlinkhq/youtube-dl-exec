'use strict'

const { writeFile, mkdir } = require('fs/promises')
const { concat } = require('simple-get')

const mkdirp = filepath => mkdir(filepath, { recursive: true }).catch(() => {})

const get = url =>
  new Promise((resolve, reject) =>
    concat(
      {
        url,
        headers: {
          'user-agent': 'microlinkhq/youtube-dl-exec'
        }
      },
      (err, response, data) => (err ? reject(err) : resolve({ response, data }))
    )
  )

const {
  YOUTUBE_DL_PATH,
  YOUTUBE_DL_HOST,
  YOUTUBE_DL_DIR,
  YOUTUBE_DL_FILE,
  YOUTUBE_DL_SKIP_DOWNLOAD
} = require('../src/constants')

const getLatest = data => {
  const { assets } = JSON.parse(data)
  const { browser_download_url: url } = assets.find(
    ({ name }) => name === YOUTUBE_DL_FILE
  )
  return get(url).then(({ data }) => data)
}

const getBinary = async url => {
  const { response, data } = await get(url)
  return response.headers['content-type'] === 'application/octet-stream'
    ? data
    : getLatest(data)
}

if (!YOUTUBE_DL_SKIP_DOWNLOAD) {
  Promise.all([getBinary(YOUTUBE_DL_HOST), mkdirp(YOUTUBE_DL_DIR)])
    .then(([buffer]) => writeFile(YOUTUBE_DL_PATH, buffer, { mode: 0o755 }))
    .catch(err => console.error(err.message || err))
}
