import youtubedl from '..'

/* basic */

await youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
  dumpSingleJson: true,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  addHeader: ['referer:youtube.com', 'user-agent:googlebot']
})

/* exec */

const promise = youtubedl.exec('https://www.youtube.com/watch?v=6xKWiCMKKJg')

promise.kill()
promise.ref()
promise.unref()

const result = await promise

console.log(result.stdout)
console.log(result.stderr)
