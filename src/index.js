'use strict'

const dargs = require('dargs')
const execa = require('execa')

const { YOUTUBE_DL_PATH } = require('./constants')

const args = (url, flags = {}) => [].concat(url, dargs(flags)).filter(Boolean)

module.exports = async (url, flags, opts) => {
  const { stdout } = await execa(YOUTUBE_DL_PATH, args(url, flags), opts)
  return JSON.parse(stdout)
}

module.exports.args = args
