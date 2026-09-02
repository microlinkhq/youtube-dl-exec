'use strict'

const { spawn } = require('child_process')
const { EOL } = require('os')
const dargs = require('dargs')

const constants = require('./constants')

const args = (flags = {}) => dargs(flags, { useEquals: false }).filter(Boolean)

const isJSON = (str = '') => str.startsWith('{')

const parse = ({ stdout, stderr, ...details }) => {
  if (details.exitCode === 0) {
    return isJSON(stdout) ? JSON.parse(stdout) : stdout
  }
  throw Object.assign(new Error(stderr), { stderr, stdout }, details)
}

const EE_PROPS = Object.getOwnPropertyNames(
  require('events').EventEmitter.prototype
)
  .filter(name => !name.startsWith('_'))
  .concat(['kill', 'ref', 'unref'])

const collect = stream => {
  const chunks = []
  if (stream) stream.on('data', chunk => chunks.push(chunk))
  return chunks
}

const text = chunks => Buffer.concat(chunks).toString().trim()

const childProcessError = (file, argv, child) => {
  const command = `${file} ${argv.join(' ')}`
  const error = new Error(
    `The command spawned as:${EOL}${EOL}  \`${command}\`${EOL}${EOL}exited with:${EOL}${EOL}  \`{ signal: '${child.signalCode}', code: ${child.exitCode} }\` ${EOL}${EOL}with the following trace:${EOL}`
  )
  error.command = command
  error.name = 'ChildProcessError'
  Object.keys(child).forEach(key => {
    if (!key.startsWith('_') && key !== 'stdio' && key !== 'stdin') {
      error[key] = child[key]
    }
  })
  return error
}

// tinyspawn splits `file` on spaces, which forced the #270 shell:true
// workaround and the Windows injection. Pass the path to spawn intact.
const $ = (file, argv = [], opts = {}) => {
  argv = argv.filter(Boolean)
  let child

  const promise = new Promise((resolve, reject) => {
    child = spawn(file, argv, opts)
    const stdout = collect(child.stdout)
    const stderr = collect(child.stderr)

    child.on('error', reject).on('close', code => {
      Object.defineProperty(child, 'stdout', { get: () => text(stdout) })
      Object.defineProperty(child, 'stderr', { get: () => text(stderr) })
      if (code !== 0) {
        const error = childProcessError(file, argv, child)
        if (opts.reject !== false) return reject(error)
        child.error = error
      }
      resolve(child)
    })
  })

  const subprocess = Object.assign(promise, child)
  if (child) {
    EE_PROPS.forEach(name => {
      subprocess[name] = child[name].bind(child)
    })
  }
  return subprocess
}

const create = binaryPath => {
  const fn = (...fnArgs) =>
    fn
      .exec(...fnArgs)
      .then(parse)
      .catch(parse)
  fn.exec = (url, flags, opts = {}) =>
    $(binaryPath, [url, ...args(flags)], opts)
  return fn
}

const update = (binaryPath = constants.YOUTUBE_DL_PATH) => $(binaryPath, ['-U'])

const defaultInstance = create(constants.YOUTUBE_DL_PATH)

module.exports = defaultInstance
module.exports.youtubeDl = defaultInstance
module.exports.create = create
module.exports.update = update
module.exports.args = args
module.exports.isJSON = isJSON
module.exports.constants = constants
