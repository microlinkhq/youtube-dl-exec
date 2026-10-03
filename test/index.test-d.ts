import { expectError } from 'tsd'
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

/* flags */

await youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
  impersonate: 'chrome:windows-10',
  noSimulate: true,
  print: ['title', 'after_move:filepath'],
  extractorArgs: 'youtube:player_client=web',
  concatPlaylist: 'multi_video',
  fragmentRetries: 'infinite',
  concurrentFragments: 4
})

expectError(
  youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
    concatPlaylist: 'sometimes'
  })
)

expectError(
  youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
    notAYtDlpFlag: true
  })
)

await youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
  addHeader: 'referer:youtube.com',
  output: ['%(title)s.%(ext)s', 'thumbnail:%(title)s.%(ext)s'],
  jsRuntimes: ['node', 'deno:/usr/local/bin/deno'],
  audioQuality: '128K',
  playlistEnd: 3
})

expectError(
  youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
    playlistEnd: 'last'
  })
)

expectError(
  youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
    impersonate: true
  })
)
