'use strict'

const test = require('ava')

const { args } = require('..')

test('parse arguments into flags', async t => {
  const flags = args('https://example', {
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: 'https://example.com',
    carDir: '/tmp',
    userAgent: 'googlebot'
  })

  t.deepEqual(flags, [
    'https://example',
    '--no-warnings',
    '--no-call-home',
    '--no-check-certificate',
    '--prefer-free-formats',
    '--youtube-skip-dash-manifest',
    '--referer=https://example.com',
    '--car-dir=/tmp',
    '--user-agent=googlebot'
  ])
})
