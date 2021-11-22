<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png">
  <br>
  <br>
</div>

![Last version](https://img.shields.io/github/tag/microlinkhq/youtube-dl-exec.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/youtube-dl-exec.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/youtube-dl-exec)
[![NPM Status](https://img.shields.io/npm/dm/youtube-dl-exec.svg?style=flat-square)](https://www.npmjs.org/package/youtube-dl-exec)

> A simple Node.js wrapper for [youtube-dl](https://github.com/ytdl-org/youtube-dl).

## Why

- Auto install the latest `youtube-dl` version available.
- Executes any command in an efficient way.
- Promise & Stream interface support.

## Install

```bash
$ npm install youtube-dl-exec --save
```

## Usage

```js
const youtubedl = require('youtube-dl-exec')

youtubedl('https://example.com', {
  dumpSingleJson: true,
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true,
  referer: 'https://example.com'
})
  .then(output => console.log(output))
```

It's equivalent to:

```bash
$ youtube-dl https://example.com --dump-single-json --no-warnings --no-call-home --no-check-certificate --prefer-free-formats --youtube-skip-dash-manifest --referer=https://example.com
```

The library will use the latest `youtube-dl` available that will downloaded on [build](https://github.com/microlinkhq/youtube-dl-exec/blob/master/package.json#L70) time.

Alternatively, you can specify your own binary path using [`.create`]():

```js
const { create: createYoutubeDl } = require('youtube-dl-exec')

const youtubedl = createYoutubeDl('/my/binary/path')
```

You can combine it with [YOUTUBE_DL_SKIP_DOWNLOAD](#youtube_dl_skip_download). See [environment variables](#environment-variables) to know more.

## API

### youtubedl(url, [flags], [options])

It execs any `youtube-dl` command, returning back the output.

#### url

*Required*<br>
Type: `string`

The URL to target.

#### flags

Type: `object`

Any flag supported by `youtube-dl`.

#### options

Any option provided here will passed to [execa#options](https://github.com/sindresorhus/execa#options).

### youtubedl.exec(url, [flags], [options])

Similar to main method but instead of a parsed output, it will return the internal subprocess object

```js
const youtubedl = require('youtube-dl-exec')
const fs = require('fs')

const subprocess = youtubedl.exec('https://example.com', { dumpSingleJson: true })

console.log(`Running subprocess as ${subprocess.pid}`)

subprocess.stdout.pipe(fs.createWriteStream('stdout.txt'))
subprocess.stderr.pipe(fs.createWriteStream('stderr.txt'))

setTimeout(subprocess.cancel, 30000)
```

### youtubedl.create(binaryPath)

It creates a `youtube-dl` using the `binaryPath` provided.

### using youtube-dl's `load-info-json` flag

When download a video with youtube-dl, the page gets downloaded retiving useful information stored in a `YtResponse`.
This information can be dumped using the `dump-json` or the `dump-single-json` flags.
Then this info can be piped back to youtube-dl with the `load-info-json` flag, so that the page won't be download again.

```js
const youtubedl = require('youtube-dl-exec')

const getInfo = (url, flags) => youtubedl(url, { dumpSingleJson: true, ...flags })

const fromInfo = (info, flags) => {
  const process = youtubedl.exec('', { loadInfoJson: '-', ...flags })
  process.stdin.write(JSON.stringify(info))
  process.stdin.end() 
  return process
}
async function main () {
  const url = 'https://www.youtube.com/watch?v=f6k0FlHGrZE'

  // with this function we get a YtResponse with all the info about the video
  // this info can be read and used and then passed again to youtube-dl, without having to query it again
  const info = await getInfo(url)

  // the info the we retrive can be read directly or passed to youtube-dl
  console.log(info.description)
  console.log((await fromInfo(info, { listThumbnails: true })).stdout)
  
  // and finally we can download the video
  await fromInfo(info, { output: 'path/to/output' });
}

main()
```

## Environment variables

The environment variables are taken into account when you perform a `npm install` in a project that contains `youtube-dl-exec` dependency.

These environment variables can also be set through "npm config", for example `npm install --YOUTUBE_DL_HOST="Some URL"`, or store it in `.npmrc` file.

They setup the download configuration for getting the `youtube-dl` binary file.

These variables can be

### YOUTUBE_DL_HOST

It determines the remote URL for getting the `youtube-dl` binary file.

The default URL is [ytdl-org/youtube-dl latest release](https://github.com/ytdl-org/youtube-dl/releases/latest).

### YOUTUBE_DL_DIR

It determines the folder where to put the binary file.

The default folder is `bin`.

### YOUTUBE_DL_FILENAME

It determines the binary filename.

The default binary file could be `youtube-dl` or `youtube-dl.exe`, depending of the [`YOUTUBE_DL_PLATFORM`](#youtube_dl_platform) value.

### YOUTUBE_DL_PLATFORM

It determines the architecture of the machine that will use the `youtube-dl` binary.

The default value will computed from `process.platform`, being `'unix'` or `'win32'`.

### YOUTUBE_DL_SKIP_DOWNLOAD

When is present, it will skip the [postinstall](/scripts/postinstall.js) script for fetching the latest `youtube-dl` version.

That variable should be set before performing the installation command, such as:

```bash
YOUTUBE_DL_SKIP_DOWNLOAD=true npm install
```

## License

**youtube-dl-exec** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/youtube-dl-exec/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/youtube-dl-exec/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
