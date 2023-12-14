const youtubedl = require('..')

;(async () => {
  for (const slug of [
    '6xKWiCMKKJg',
    'dQw4w9WgXcQ',
    'bvim4rsNHkQ',
    'fUyU3lKzoio'
  ]) {
    await youtubedl(`https://www.youtube.com/watch?v=${slug}`, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true
    }).then(result =>
      require('fs').writeFileSync(
        `${slug.json}`,
        JSON.stringify(result, null, 2)
      )
    )
  }
})()
