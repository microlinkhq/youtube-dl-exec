'use strict'

const test = require('ava')

const { args } = require('..')

test('no flags', t => {
  const flags = args()
  t.deepEqual(flags, [])
})

test('parse arguments into flags', t => {
  const flags = args({
    noWarnings: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    carDir: '/tmp',
    addHeader: ['referer:example.com', 'user-agent:googlebot']
  })

  t.deepEqual(flags, [
    '--no-warnings',
    '--no-check-certificate',
    '--prefer-free-formats',
    '--youtube-skip-dash-manifest',
    '--car-dir',
    '/tmp',
    '--add-header',
    'referer:example.com',
    '--add-header',
    'user-agent:googlebot'
  ])
})
