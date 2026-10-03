'use strict'

const { execFileSync } = require('node:child_process')

const PYTHON_BINARIES = ['python3', 'python']

const MINIMUM_PYTHON = { major: 3, minor: 9 }

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
  !PYTHON_BINARIES.some(isSupportedPython)
) {
  throw new Error(
    `youtube-dl-exec needs Python ${MINIMUM_PYTHON.major}.${MINIMUM_PYTHON.minor} or newer. You can skip this check passing \`YOUTUBE_DL_SKIP_PYTHON_CHECK=1\``
  )
}
