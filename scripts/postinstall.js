'use strict'

const { tmpdir } = require('node:os')
const { Readable } = require('node:stream')
const { pipeline } = require('node:stream/promises')
const { randomBytes } = require('node:crypto')
const { createWriteStream } = require('node:fs')
const { mkdir, chmod, rename } = require('node:fs/promises')

const mkdirp = filepath => mkdir(filepath, { recursive: true })

const log = (...args) => console.log('[youtube-dl-exec]', ...args)

const get = async url => {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'microlinkhq/youtube-dl-exec'
    }
  })

  return {
    headers: response.headers,
    stream: () => Readable.fromWeb(response.body),
    json: () => response.json()
  }
}

const {
  YOUTUBE_DL_PATH,
  YOUTUBE_DL_HOST,
  YOUTUBE_DL_DIR,
  YOUTUBE_DL_FILE,
  YOUTUBE_DL_SKIP_DOWNLOAD
} = require('../src/constants')

const getLatest = async data => {
  const { assets } = data
  const { browser_download_url: url } = assets.find(
    ({ name }) => name === YOUTUBE_DL_FILE
  )
  return get(url)
}

const getBinary = async url => {
  let response = await get(url)
  if (response.headers.get('content-type') !== 'application/octet-stream') {
    response = await getLatest(await response.json())
  }
  return response.stream()
}

const installBinary = async () => {
  log('Downloading `youtube-dl` binary')

  const binary = await getBinary(YOUTUBE_DL_HOST)

  const tmpfile = `${tmpdir()}/yt-dl-exec-${randomBytes(4).toString('hex')}`

  log(`Download Location: \`${tmpfile}\``)

  await pipeline(binary, createWriteStream(tmpfile))

  log(`Ensuring directory exists: \`${YOUTUBE_DL_DIR}\``)

  await mkdirp(YOUTUBE_DL_DIR)

  log(`Moving binary to \`${YOUTUBE_DL_PATH}\``)

  await rename(tmpfile, YOUTUBE_DL_PATH)

  log(`Setting permissions for \`${YOUTUBE_DL_PATH}\``)

  await chmod(YOUTUBE_DL_PATH, 0o755)

  log('Installation complete')
}

const main = async () => {
  if (YOUTUBE_DL_SKIP_DOWNLOAD) {
    return log('Skipping youtube-dl binary download')
  }

  try {
    await installBinary()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
