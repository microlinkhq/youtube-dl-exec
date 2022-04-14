'use strict'

const execa = require('execa')

const constants = require('./constants')
const args = require('./args')

const isJSON = (str = '') => str.startsWith('{')

const parse = ({ stdout }) => (isJSON(stdout) ? JSON.parse(stdout) : stdout)

const create = binaryPath => {
  const fn = (url, flags, opts) => fn.exec(url, flags, opts).then(parse)
  fn.exec = (url, flags, opts) => execa(binaryPath, args(url, flags), opts)
  return fn
}

module.exports = create(constants.YOUTUBE_DL_PATH)
module.exports.create = create
module.exports.args = args
module.exports.isJSON = isJSON
module.exports.constants = constants
