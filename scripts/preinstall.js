'use strict'

const { execFileSync } = require('node:child_process')

const YT_DLP_PYTHON_BINARY = 'python3'

const MINIMUM_PYTHON = { major: 3, minor: 11 }

const isWindowsExecutableBundlingPython = process.platform === 'win32'

const isSupportedPython = binary => {
  try {
    const version = execFileSync(binary, ['--version'], {
      encoding: 'utf8',
      stdio: 'pipe'
    })
    const [major, minor] = version.match(/\d+/g).map(Number)
    return (
      major > MINIMUM_PYTHON.major ||
      (major === MINIMUM_PYTHON.major && minor >= MINIMUM_PYTHON.minor)
    )
  } catch {
    return false
  }
}

if (
  process.env.YOUTUBE_DL_SKIP_PYTHON_CHECK === undefined &&
  !isWindowsExecutableBundlingPython &&
  !isSupportedPython(YT_DLP_PYTHON_BINARY)
) {
  throw new Error(
    `youtube-dl-exec needs Python ${MINIMUM_PYTHON.major}.${MINIMUM_PYTHON.minor} or newer as \`${YT_DLP_PYTHON_BINARY}\`. You can skip this check passing \`YOUTUBE_DL_SKIP_PYTHON_CHECK=1\``
  )
}
