'use strict'

const { readFileSync } = require('fs')
const path = require('path')
const $ = require('tinyspawn')
const test = require('ava')

const { args, constants } = require('..')

const TYPES_PATH = path.join(__dirname, '..', 'src', 'index.d.ts')

const HELP_COLUMNS = '80'

const OPTIONS_NOT_EXPRESSIBLE_AS_FLAGS = [
  '--alias',
  '--print-to-file',
  '--replace-in-metadata',
  '--S-force'
]

const FLAGS_NOT_LISTED_IN_HELP = [
  'allFormats',
  'allSubs',
  'autonumberStart',
  'callHome',
  'cleanInfojson',
  'convertSub',
  'dumpUserAgent',
  'forceGenericExtractor',
  'forceWriteDownloadArchive',
  'geoBypass',
  'geoBypassCountry',
  'geoBypassIpBlock',
  'getDuration',
  'getFilename',
  'getFormat',
  'getId',
  'getThumbnail',
  'getTitle',
  'getUrl',
  'hlsPreferFfmpeg',
  'hlsPreferNative',
  'id',
  'includeAds',
  'matchTitle',
  'maxViews',
  'metadataFromTitle',
  'minViews',
  'noCleanInfojson',
  'noColor',
  'noSplitTracks',
  'noWriteSrt',
  'playlistEnd',
  'playlistReverse',
  'playlistStart',
  'preferAvconv',
  'preferFfmpeg',
  'preferUnsecure',
  'printJson',
  'rateLimit',
  'referer',
  'rejectTitle',
  'splitTracks',
  'srtLangs',
  'trimFileNames',
  'userAgent',
  'writeAnnotations',
  'writeSrt',
  'xattrSetFilesize',
  'yesOverwrites',
  'youtubeSkipDashManifest'
]

const HELP_ENTRY_SEPARATOR = /\n(?= {4}-)/

const HELP_ENTRY_PATTERN = /^ {4}(?:-\w, )?(--[\w-]+)( \S)?/

const HELP_ALIAS_PATTERN = /\(Alias: (--[\w-]+)\)/

const FLAGS_TYPE_PATTERN = /export type Flags = \{\n([\s\S]+?)\n\}/

const FLAG_PATTERN = /^ {2}(\w+)\?: (.+)$/gm

const toFlag = option =>
  option.slice(2).replace(/-(\w)/g, (_, char) => char.toUpperCase())

const toOption = flag => args({ [flag]: true })[0]

const unwrap = text => text.replace(/-\n\s+/g, '-').replace(/\s+/g, ' ')

const binaryOptions = async () => {
  const { stdout } = await $(constants.YOUTUBE_DL_PATH, ['--help'], {
    env: { ...process.env, COLUMNS: HELP_COLUMNS }
  })
  const options = new Map()
  for (const entry of stdout.split(HELP_ENTRY_SEPARATOR)) {
    const [, option, metavar] = entry.match(HELP_ENTRY_PATTERN) ?? []
    if (!option) continue
    const takesValue = Boolean(metavar)
    const [, alias] = unwrap(entry).match(HELP_ALIAS_PATTERN) ?? []
    options.set(option, takesValue)
    if (alias) options.set(alias, takesValue)
  }
  return options
}

const typedFlags = () => {
  const [, flagsType] = readFileSync(TYPES_PATH, 'utf8').match(
    FLAGS_TYPE_PATTERN
  )
  return new Map(
    Array.from(flagsType.matchAll(FLAG_PATTERN), ([, flag, type]) => [
      flag,
      type
    ])
  )
}

const expressibleOptions = options =>
  [...options.keys()].filter(
    option => !OPTIONS_NOT_EXPRESSIBLE_AS_FLAGS.includes(option)
  )

const resolveOption = (options, flag) => {
  const option = toOption(flag)
  if (options.has(option)) return option
  const abbreviated = [...options.keys()].filter(name =>
    name.startsWith(option)
  )
  return abbreviated.length === 1 ? abbreviated[0] : undefined
}

test('every option listed by the binary is a typed flag', async t => {
  const flags = typedFlags()
  const options = await binaryOptions()
  const untyped = expressibleOptions(options).filter(
    option => !flags.has(toFlag(option))
  )

  t.true(options.has('--impersonate'))
  t.true(options.has('--no-simulate'))
  t.true(options.has('--ppa'))
  t.deepEqual(untyped, [])
})

test('every option listed by the binary round-trips through args', async t => {
  const options = await binaryOptions()
  const mangled = expressibleOptions(options).filter(
    option => toOption(toFlag(option)) !== option
  )

  t.deepEqual(mangled, [])
})

test('every typed flag is an option of the binary', async t => {
  const options = await binaryOptions()
  const unknown = [...typedFlags().keys()].filter(
    flag =>
      !FLAGS_NOT_LISTED_IN_HELP.includes(flag) && !resolveOption(options, flag)
  )

  t.deepEqual(unknown, [])
})

test('only flags without a value are typed as boolean', async t => {
  const options = await binaryOptions()
  const mistyped = [...typedFlags()].filter(([flag, type]) => {
    const option = resolveOption(options, flag)
    return option && options.get(option) === (type === 'boolean')
  })

  t.deepEqual(mistyped, [])
})
