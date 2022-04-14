'use strict'

const dargs = require('dargs')

const ignoreFalseFor = ['ignoreErrors']

const filterByKeys = (o, toExclude) =>
  Object.fromEntries(Object.entries(o).filter(([k]) => !toExclude.includes(k)))

const filterFlags = (flags) => filterByKeys(flags, ignoreFalseFor)

const args = (url, flags = {}) =>
  [].concat(url, dargs(filterFlags(flags), { useEquals: false })).filter(Boolean)

module.exports = args
