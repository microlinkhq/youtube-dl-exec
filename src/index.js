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

const collect = (stream, buffer = []) =>
  stream ? stream.on('data', data => buffer.push(data)) && buffer : buffer

const text = buffer =>
  buffer.length
    ? Buffer.concat(buffer).toString().trim().replace(/\n$/, '')
    : ''

// Spawn file+args with no shell. tinyspawn splits `file` on spaces, which is
// what forced the #270 shell:true workaround and the Windows injection.
const $ = (cmd, cmdArgs = [], opts = {}) => {
  cmdArgs = cmdArgs.filter(Boolean)
  let childProcess

  const promise = new Promise((resolve, reject) => {
    childProcess = spawn(cmd, cmdArgs, opts)
    const stdout = collect(childProcess.stdout)
    const stderr = collect(childProcess.stderr)

    childProcess.on('error', reject).on('exit', exitCode => {
      Object.defineProperty(childProcess, 'stdout', { get: () => text(stdout) })
      Object.defineProperty(childProcess, 'stderr', { get: () => text(stderr) })
      if (exitCode !== 0) {
        const command = `${cmd} ${cmdArgs.join(' ')}`
        const error = new Error(
          `The command spawned as:${EOL}${EOL}  \`${command}\`${EOL}${EOL}exited with:${EOL}${EOL}  \`{ signal: '${childProcess.signalCode}', code: ${childProcess.exitCode} }\` ${EOL}${EOL}with the following trace:${EOL}`
        )
        error.command = command
        error.name = 'ChildProcessError'
        Object.keys(childProcess)
          .filter(
            key => !key.startsWith('_') && !['stdio', 'stdin'].includes(key)
          )
          .forEach(key => {
            error[key] = childProcess[key]
          })
        if (opts.reject !== false) return reject(error)
        childProcess.error = error
      }
      return resolve(childProcess)
    })
  })

  const subprocess = Object.assign(promise, childProcess)
  if (childProcess) {
    EE_PROPS.forEach(name => {
      subprocess[name] = childProcess[name].bind(childProcess)
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
    $(binaryPath, [url].concat(args(flags)), opts)
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
