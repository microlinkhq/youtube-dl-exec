'use strict'

/**
 * using youtube-dl's `load-info-json` flag
 * When download a video with youtube-dl, the page gets downloaded retiving useful information stored in a `YtResponse`.
 * This information can be dumped using the `dump-json` or the `dump-single-json` flags.
 * Then this info can be passed to youtube-dl using a file with `load-info-json FILE` flag, so that the page won't be downloaded again
 */

const youtubedl = require('youtube-dl-exec')
const fs = require('fs')

const getInfo = (url, flags) =>
  youtubedl(url, { dumpSingleJson: true, ...flags })

const fromInfo = (infoFile, flags) =>
  youtubedl.exec('', { loadInfoJson: infoFile, ...flags })

async function main (url) {
  // with this function we get a YtResponse with all the info about the video
  // this info can be read and used and then passed again to youtube-dl, without having to query it again
  const info = await getInfo(url)

  // write the info to a file for youtube-dl to read it
  fs.writeFileSync('videoInfo.json', JSON.stringify(info))

  // the info the we retrive can be read directly or passed to youtube-dl
  console.log(info.description)
  console.log(
    (await fromInfo('videoInfo.json', { listThumbnails: true })).stdout
  )

  // and finally we can download the video
  await fromInfo('videoInfo.json', { output: 'path/to/output' })
}

main(process.env.URL)
