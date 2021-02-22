<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png"">
</div>

> A simple Node.js wrapper for [youtube-dl](https://github.com/ytdl-org/youtube-dl).

## Why

- Auto install the latest `youtube-dl` version available.
- Executes any command in a efficient way.
- Intuitive interface.

## Install

```bash
$ npm install youtube-dl-exec --save
```

## Usage

```js
const youtubedl = require('youtube-dl-exec')

const outut = await youtubedl('https://example.com', {
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true,
  referer: 'https://example.com'
})

console.log(output)
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

Type: `object`

Any option provided here will passed to [execa#options](https://github.com/sindresorhus/execa#options).

## License

**youtube-dl-exec** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/youtube-dl-exec/blob/master/LICENSE.md) License.<br>
Authored and maintained by [microlink.io](https://microlink.io) with help from [contributors](https://github.com/microlinkhq/youtube-dl-exec/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
