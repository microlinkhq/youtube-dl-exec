const throwError = error => {
  throw new Error(
    `youtube-dl-exec needs Python. ${error.message}. You can skip this check passing \`YOUTUBE_DL_SKIP_PYTHON_CHECK=1\``
  )
}

const pReflect = p =>
  Promise.resolve(p)
    .then(() => ({ isError: false }))
    .catch(error => ({ isError: true, error }))

const exitWhenDependenciesAreNotInstalled = error => {
  if (error.code === 'ERR_MODULE_NOT_FOUND') process.exit()
  throw error
}

if (process.env.YOUTUBE_DL_SKIP_PYTHON_CHECK !== undefined) process.exit()

const { default: binaryVersionCheck } = await import(
  'binary-version-check'
).catch(exitWhenDependenciesAreNotInstalled)

let result = await pReflect(binaryVersionCheck('python3', '>=3.9'))
if (!result.isError) process.exit()

result = await pReflect(binaryVersionCheck('python', '>=3.9'))
if (result.isError) throwError(result.error)
