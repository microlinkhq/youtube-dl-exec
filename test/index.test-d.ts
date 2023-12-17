import youtubedl from '..'

/* basic */

await youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
  dumpSingleJson: true,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  addHeader: ['referer:youtube.com', 'user-agent:googlebot']
})

youtubedl.exec('https://www.youtube.com/watch?v=6xKWiCMKKJg')
youtubedl.exec('https://www.youtube.com/watch?v=6xKWiCMKKJg', { dumpSingleJson: true })
youtubedl.exec('https://www.youtube.com/watch?v=6xKWiCMKKJg', { dumpSingleJson: true }, { shell: true, killSignal: 'SIGKILL', timeout: 3000 })

youtubedl.create('mypath')
