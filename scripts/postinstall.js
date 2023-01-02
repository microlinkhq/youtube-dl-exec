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
  const { response, data } = await get(url)
  const contentType = response['content-type']
  if (BINARY_CONTENT_TYPES.includes(contentType)) return data
  const [{ assets }] = JSON.parse(data)
  const { browser_download_url: downloadUrl } = assets.find(
    ({ name }) => name === YOUTUBE_DL_FILE
  )
  return (await get(downloadUrl)).data
}

if (!YOUTUBE_DL_SKIP_DOWNLOAD) {
  Promise.all([getBinary(YOUTUBE_DL_HOST), mkdirp(YOUTUBE_DL_DIR)])
    .then(([buffer]) => writeFile(YOUTUBE_DL_PATH, buffer, { mode: 0o755 }))
    .catch(err => console.error(err.message || err))
}
