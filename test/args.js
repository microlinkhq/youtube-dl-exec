'use strict'

const test = require('ava')

const { args } = require('..')

test('no flags', t => {
  const flags = args('https://example.com')
  t.deepEqual(flags, ['https://example.com'])
})

test('parse arguments into flags', t => {
  const flags = args('https://example.com', {
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
    'https://example.com',
    '--no-warnings',
    '--no-call-home',
    '--no-check-certificate',
    '--prefer-free-formats',
    '--youtube-skip-dash-manifest',
    '--referer',
    'https://example.com',
    '--car-dir',
    '/tmp',
    '--user-agent',
    'googlebot'
  ])
})
