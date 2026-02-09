'use strict'

const { dirname, basename } = require('node:path')

const dargs = require('dargs')
const $ = require('tinyspawn')

const constants = require('./constants')

const args = (flags = {}) => dargs(flags, { useEquals: false }).filter(Boolean)

const isJSON = (str = '') => str.startsWith('{')

const parse = ({ stdout, stderr, ...details }) => {
  if (details.exitCode === 0) { return isJSON(stdout) ? JSON.parse(stdout) : stdout }
  throw Object.assign(new Error(stderr), { stderr, stdout }, details)
}

const create = binaryPath => {
  const fn = (...args) =>
    fn
      .exec(...args)
      .then(parse)
      .catch(parse)
  fn.exec = (url, flags, opts) => $(binaryPath, [url].concat(args(flags)), opts)
  return fn
}

const update = (binaryPath = constants.YOUTUBE_DL_PATH) => {
  return $("./"+basename(binaryPath), ['-U'], { cwd: dirname(binaryPath) })
}

const defaultInstance = create(constants.YOUTUBE_DL_PATH)

module.exports = defaultInstance
module.exports.youtubeDl = defaultInstance
module.exports.create = create
module.exports.update = update
module.exports.args = args
module.exports.isJSON = isJSON
module.exports.constants = constants
