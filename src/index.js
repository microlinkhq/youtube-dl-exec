'use strict'

const dargs = require('dargs')
const execa = require('execa')

const constants = require('./constants')

const args = (url, flags = {}) =>
  [].concat(url, dargs(flags, { useEquals: false })).filter(Boolean)

const isJSON = (str = '') => str.startsWith('{')

const parse = ({ stdout, stderr, ...details }) => {
  if (!stderr) return isJSON(stdout) ? JSON.parse(stdout) : stdout
  throw Object.assign(new Error(stderr), details)
}

const create = binaryPath => {
  const fn = (url, flags, opts) =>
    fn.exec(url, flags, opts).then(parse).catch(parse)
  fn.exec = (url, flags, opts) => execa(binaryPath, args(url, flags), opts)
  return fn
}

module.exports = create(constants.YOUTUBE_DL_PATH)
module.exports.create = create
module.exports.args = args
module.exports.isJSON = isJSON
module.exports.constants = constants
