'use strict'

const VERSION_CHECK_PACKAGE = 'binary-version-check'

const PYTHON_VERSION_RANGE = '>=3.9'

const isInstalled = packageName => {
  try {
    require.resolve(packageName)
    return true
  } catch {
    return false
  }
}

const throwError = error => {
  throw new Error(
    `youtube-dl-exec needs Python. ${error.message}. You can skip this check passing \`YOUTUBE_DL_SKIP_PYTHON_CHECK=1\``
  )
}

if (process.env.YOUTUBE_DL_SKIP_PYTHON_CHECK !== undefined) process.exit()
if (!isInstalled(VERSION_CHECK_PACKAGE)) process.exit()

const { default: binaryVersionCheck } = require(VERSION_CHECK_PACKAGE)

const checkPython = binary => binaryVersionCheck(binary, PYTHON_VERSION_RANGE)

checkPython('python3')
  .catch(() => checkPython('python'))
  .catch(throwError)
