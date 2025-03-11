'use strict'

const isUnix = require('is-unix')
const path = require('path')

const PLATFORM_WIN = 'win32'
const PLATFORM_UNIX = 'unix'

const YOUTUBE_DL_HOST =
  process.env.YOUTUBE_DL_HOST ??
  'https://api.github.com/repos/yt-dlp/yt-dlp/releases/latest'

const YOUTUBE_DL_DIR =
  process.env.YOUTUBE_DL_DIR ?? path.join(__dirname, '..', 'bin')

const YOUTUBE_DL_PLATFORM =
  process.env.YOUTUBE_DL_PLATFORM ?? isUnix(process.platform)
    ? PLATFORM_UNIX
    : PLATFORM_WIN

const YOUTUBE_DL_FILENAME = process.env.YOUTUBE_DL_FILENAME || 'yt-dlp'

const YOUTUBE_DL_FILE =
  !YOUTUBE_DL_FILENAME.endsWith('.exe') && YOUTUBE_DL_PLATFORM === 'win32'
    ? `${YOUTUBE_DL_FILENAME}.exe`
    : YOUTUBE_DL_FILENAME

const YOUTUBE_DL_PATH = path.join(YOUTUBE_DL_DIR, YOUTUBE_DL_FILE)

const YOUTUBE_DL_SKIP_DOWNLOAD = process.env.YOUTUBE_DL_SKIP_DOWNLOAD

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN

module.exports = {
  GITHUB_TOKEN,
  YOUTUBE_DL_DIR,
  YOUTUBE_DL_FILE,
  YOUTUBE_DL_FILENAME,
  YOUTUBE_DL_HOST,
  YOUTUBE_DL_PATH,
  YOUTUBE_DL_PLATFORM,
  YOUTUBE_DL_SKIP_DOWNLOAD
}
