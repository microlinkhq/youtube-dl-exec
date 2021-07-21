<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png"">
</div>

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
$ youtube-dl https://example.com --dump-json --no-warnings --no-call-home --no-check-certificate --prefer-free-formats --youtube-skip-dash-manifest --referer=https://example.com
```

## API

### youtubedl(url, [flags], [options])

#### url

*Required*<br>
Type: `string`

The URL to target.

#### flags

Type: `object`

Any flag supported by `youtube-dl`.

#### options

Any option provided here will passed to [execa#options](https://github.com/sindresorhus/execa#options).

### youtubedl.raw(url, [flags], [options])

It's the same than the main method but it will return the raw subprocess object:

```js
const youtubedl = require('youtube-dl-exec')
const fs = require('fs')

const subprocess = youtubedl.raw('https://example.com', { dumpSingleJson: true })

console.log(`Running subprocess as ${subprocess.pid}`)

subprocess.stdout.pipe(fs.createWriteStream('stdout.txt'))
subprocess.stderr.pipe(fs.createWriteStream('stderr.txt'))

setTimeout(subprocess.cancel, 30000)
```

## Environment variables

The environment variables are taken into account when you perform a `npm install` in a project that contains `youtube-dl-exec` dependency.

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

## License

**youtube-dl-exec** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/youtube-dl-exec/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/youtube-dl-exec/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
