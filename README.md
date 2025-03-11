<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner-dark.png">
  <img alt="microlink cdn" src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner.png" align="center">
</picture>
&nbsp;

![Last version](https://img.shields.io/github/tag/microlinkhq/youtube-dl-exec.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/youtube-dl-exec.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/youtube-dl-exec)
[![NPM Status](https://img.shields.io/npm/dm/youtube-dl-exec.svg?style=flat-square)](https://www.npmjs.org/package/youtube-dl-exec)

> A simple Node.js wrapper for [yt-dlp](https://github.com/yt-dlp/yt-dlp).

## Why

- Auto install the latest `yt-dlp` version available.
- Executes any command in an efficient way.
- Promise & Stream interface support.

## Install

> **Note**: It requires Python 3.7 or above available in your system as `python3`. Otherwise, the library will throw an error.

```bash
$ npm install youtube-dl-exec --save
```

By default, the library will auto-install the latest `yt-dlp` available that will downloaded on [build](https://github.com/microlinkhq/youtube-dl-exec/blob/master/package.json#L70) time.

## Usage

Any `yt-dlp` flags is supported:

```js
const youtubedl = require('youtube-dl-exec')

youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
  dumpSingleJson: true,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  addHeader: ['referer:youtube.com', 'user-agent:googlebot']
}).then(output => console.log(output))
```

It's equivalent to:

```bash
$ ./bin/yt-dlp \
  --dump-single-json \
  --no-check-certificates \
  --no-warnings \
  --prefer-free-formats \
  --add-header='user-agent:googlebot' \
  --add-header='referer:youtube.com' \
  'https://www.youtube.com/watch?v=6xKWiCMKKJg'
```

Type `yt-dlp --help` for seeing all of them.

## Custom binary

In case you need, you can specify your own binary path using [`.create`]():

```js
const { create: createYoutubeDl } = require('youtube-dl-exec')
const youtubedl = createYoutubeDl('/my/binary/path')
```

## Progress bar

Since the library is returning a promise, you can use any library that makes a progress estimation taking a promise as input:

```js
const logger = require('progress-estimator')()
const youtubedl = require('youtube-dl-exec')

const url = 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
const promise = youtubedl(url, { dumpSingleJson: true })
const result = await logger(promise, `Obtaining ${url}`)

console.log(result)
```

Alternatively, you can access to the subprocess to have more granular control. See [youtubedl.exec](https://github.com/microlinkhq/youtube-dl-exec#youtubedlexecurl-flags-options).

Also, combine that with [YOUTUBE_DL_SKIP_DOWNLOAD](#youtube_dl_skip_download). See [environment variables](#environment-variables) to know more.

## Timeout & cancellation

You can customize [spawn#options](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options) by passing a third argument:

```js
const url = 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
const result = await youtubedl.exec(url, ,{ dumpSingleJson: true }, {
  timeout: 5000,
  killSignal: 'SIGKILL'
})

console.log(result)
```

You can also interact with the subprocess programmatically:

```js
const url = 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
const subprocess = youtubedl.exec(url, { dumpSingleJson: true })

setTimeout(() => {
  subprocess.kill('SIGKILL')
}, 5000)

const result = await subprocess
console.log(result)
```

## API

### youtubedl(url, [flags], [options])

It execs any `yt-dlp` command, returning back the output.

#### url

_Required_<br>
Type: `string`

The URL to target.

#### flags

Type: `object`

Any flag supported by `yt-dlp`.

#### options

Any option provided here will passed to [spawn#options](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options).

### youtubedl.exec(url, [flags], [options])

Similar to main method but instead of a parsed output, it will return the internal subprocess object:

```js
const youtubedl = require('youtube-dl-exec')
const fs = require('fs')

const subprocess = youtubedl.exec(
  'https://www.youtube.com/watch?v=6xKWiCMKKJg',
  {
    dumpSingleJson: true
  }
)

console.log(`Running subprocess as ${subprocess.pid}`)

subprocess.stdout.pipe(fs.createWriteStream('stdout.txt'))
subprocess.stderr.pipe(fs.createWriteStream('stderr.txt'))

setTimeout(subprocess.cancel, 30000)
```

### youtubedl.create(binaryPath)

It creates a `yt-dlp` using the `binaryPath` provided.

## Environment variables

The environment variables are used to customize the [postinstall script](https://github.com/microlinkhq/youtube-dl-exec/blob/master/scripts/postinstall.js) behavior that will be triggered after `npm install` is performed.

This is mostly for backward compatibility or debugging purposes. You don't need to do anything by default.

### DEBUG

Set `DEBUG="youtube-dl-exec*"` to enable debug mode. This will enable log additional information during the post-install script.

### YOUTUBE_DL_DIR

It determines the folder where to put the binary file.

The default folder is `bin`.

### YOUTUBE_DL_FILENAME

It determines the binary filename.

The default binary file could be `yt-dlp` or `youtube-dl.exe`, depending of the [`YOUTUBE_DL_PLATFORM`](#youtube_dl_platform) value.

### YOUTUBE_DL_HOST

It determines the remote URL for getting the `yt-dlp` binary file.

The default URL is [yt-dlp/yt-dlp latest release](https://github.com/yt-dlp/yt-dlp/releases/latest).

### YOUTUBE_DL_PLATFORM

It determines the architecture of the machine that will use the `yt-dlp` binary.

The default value will computed from `process.platform`, being `'unix'` or `'win32'`.

### YOUTUBE_DL_SKIP_DOWNLOAD

When is present, it will skip the [postinstall](/scripts/postinstall.js) script for fetching the latest `yt-dlp` version.

That variable should be set before performing the installation command, such as:

```bash
YOUTUBE_DL_SKIP_DOWNLOAD=true npm install
```

### YOUTUBE_DL_SKIP_PYTHON_CHECK

When is present, it skip the python step on installation.

## License

**youtube-dl-exec** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/youtube-dl-exec/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/youtube-dl-exec/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · X [@microlinkhq](https://x.com/microlinkhq)
