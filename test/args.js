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
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    carDir: '/tmp',
    addHeader: ['referer:example.com', 'user-agent:googlebot']
  })

  t.deepEqual(flags, [
    'https://example.com',
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
