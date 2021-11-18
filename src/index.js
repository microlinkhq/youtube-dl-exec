'use strict'

const dargs = require('dargs')
const execa = require('execa')

const args = (url, flags = {}) =>
  [].concat(url, dargs(flags, { useEquals: false })).filter(Boolean)

const isJSON = (str = '') => str.startsWith('{')

const parse = ({ stdout }) => (isJSON(stdout) ? JSON.parse(stdout) : stdout)

const create = binaryPath => {
    const fn = (url, flags, opts) => fn.raw(url, flags, opts).then(parse)
    fn.raw = (url, flags, opts) => execa(binaryPath, args(url, flags), opts)
    fn.getDownloadInfo = (url, flags, opts) => {
        flags ||= {}
        flags.dumpSingleJson = true;
        return fn.raw(url, flags, opts).then(parse)
    }
    fn.fromDownloadInfo = (info, flags, opts) => {
        flags ||= {}
        flags.loadInfoJson = '-'
        const process = execa(binaryPath, dargs(flags, { useEquals: false }), opts)
        process.stdin.write(JSON.stringify(info));
        process.stdin.end();
        return process.then(parse);
    }
    return fn
}

module.exports = create(require('./constants').YOUTUBE_DL_PATH)
module.exports.create = create
module.exports.args = args
module.exports.isJSON = isJSON
