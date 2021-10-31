'use strict'

const dargs = require('dargs')
const execa = require('execa')

const { YOUTUBE_DL_PATH } = require('./constants')

const args = (url, flags = {}) =>
  [].concat(url, dargs(flags, { useEquals: false })).filter(Boolean)

const isJSON = (str = '') => str.startsWith('{')

const parse = ({ stdout }) => (isJSON(stdout) ? JSON.parse(stdout) : stdout)

const create = binaryPath => {
  const fn = (url, flags, opts) => fn.raw(url, flags, opts).then(parse)
  fn.raw = (url, flags, opts) => execa(binaryPath, args(url, flags), opts)
  return fn
}

module.exports = create(YOUTUBE_DL_PATH)
module.exports.raw = create(YOUTUBE_DL_PATH).raw
module.exports.create = create
module.exports.args = args
module.exports.isJSON = isJSON
