import youtubedl from '..'

/* basic */

await youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
  dumpSingleJson: true,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  addHeader: ['referer:youtube.com', 'user-agent:googlebot']
})
