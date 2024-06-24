'use strict'

const dargs = require('dargs')
const $ = require('tinyspawn')

const constants = require('./constants')

const args = (flags = {}) => dargs(flags, { useEquals: false }).filter(Boolean)

const isJSON = (str = '') => str.startsWith('{')

const parse = ({ stdout, stderr, ...details }) => {
  if (stdout !== undefined && stdout !== '' && stdout !== 'null') {
    return isJSON(stdout) ? JSON.parse(stdout) : stdout
  }
  throw Object.assign(new Error(stderr), { stderr, stdout }, details)
}

const create = binaryPath => {
  const fn = (...args) => fn.exec(...args).then(parse).catch(parse)
  fn.exec = (url, flags, opts) => $(binaryPath, [url].concat(args(flags)), opts)
  return fn
}

const defaultInstance = create(constants.YOUTUBE_DL_PATH)

module.exports = defaultInstance
module.exports.youtubeDl = defaultInstance
module.exports.create = create
module.exports.args = args
module.exports.isJSON = isJSON
module.exports.constants = constants
