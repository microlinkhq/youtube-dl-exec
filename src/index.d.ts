import { SpawnOptions } from 'child_process';
import { TinyspawnPromise } from 'tinyspawn';

export type Payload = {
  id: string;
  title: string;
  formats: Format[];
  thumbnails: Thumbnail[];
  thumbnail: string;
  description: string;
  channel_id: string;
  channel_url: string;
  duration: number;
  view_count: number;
  average_rating: null;
  age_limit: number;
  webpage_url: string;
  categories: string[];
  tags: string[];
  playable_in_embed: boolean;
  live_status: string;
  media_type: string;
  release_timestamp: null;
  _format_sort_fields: string[];
  automatic_captions: { [key: string]: AutomaticCaption[] };
  subtitles: any;
  album?: string;
  artists?: string[];
  track?: string;
  release_date?: string;
  release_year?: number;
  comment_count: number | null;
  chapters: null;
  heatmap: Heatmap[] | null;
  like_count: number;
  channel: string;
  channel_follower_count: number;
  creators: string[] | null;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  upload_date: string;
  timestamp: number;
  alt_title?: string;
  availability: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: string;
  extractor: string;
  extractor_key: string;
  playlist: null;
  playlist_index: null;
  display_id: string;
  fulltitle: string;
  duration_string: string;
  is_live: boolean;
  was_live: boolean;
  artist?: string;
  creator?: string;
  requested_subtitles: null;
  _has_drm: null;
  epoch: number;
  requested_downloads: RequestedDownload[];
  requested_formats: Format[];
  format: string;
  format_id: string;
  ext: AudioEXTEnum;
  protocol: string;
  language: Language | null;
  format_note: string;
  filesize_approx: number;
  tbr: number;
  width: number;
  height: number;
  resolution: string;
  fps: number;
  dynamic_range: DynamicRange;
  vcodec: string;
  vbr: number;
  stretched_ratio: null;
  aspect_ratio: number;
  acodec: Acodec;
  abr: number;
  asr: number;
  audio_channels: number;
  _type: string;
  _version: Version;
  channel_is_verified?: boolean;
}

export type Version = {
  version: string;
  current_git_head: null;
  release_git_head: string;
  repository: string;
}

export enum Acodec {
  Mp4A402 = "mp4a.40.2",
  Mp4A405 = "mp4a.40.5",
  None = "none",
  Opus = "opus",
}

export type AutomaticCaption = {
  ext: AutomaticCaptionEXT;
  url: string;
  name: string;
}

export enum AutomaticCaptionEXT {
  Json3 = "json3",
  Srv1 = "srv1",
  Srv2 = "srv2",
  Srv3 = "srv3",
  Ttml = "ttml",
  Vtt = "vtt",
}

export enum DynamicRange {
  SDR = "SDR",
}

export enum AudioEXTEnum {
  M4A = "m4a",
  Mhtml = "mhtml",
  Mp4 = "mp4",
  None = "none",
  The3Gp = "3gp",
  Webm = "webm",
}

export type Format = {
  format_id: string;
  format_note?: FormatNote;
  ext: AudioEXTEnum;
  protocol: Protocol;
  acodec?: Acodec;
  vcodec: string;
  url: string;
  width?: number | null;
  height?: number | null;
  fps?: number | null;
  rows?: number;
  columns?: number;
  fragments?: Fragment[];
  resolution: string;
  aspect_ratio: number | null;
  http_headers: HTTPHeaders;
  audio_ext: AudioEXTEnum;
  video_ext: AudioEXTEnum;
  vbr: number | null;
  abr: number | null;
  tbr: number | null;
  format: string;
  format_index?: null;
  manifest_url?: string;
  language?: Language | null;
  preference?: number | null;
  quality?: number;
  has_drm?: boolean;
  source_preference?: number;
  asr?: number | null;
  filesize?: number | null;
  audio_channels?: number | null;
  language_preference?: number;
  dynamic_range?: DynamicRange | null;
  container?: Container;
  downloader_options?: DownloaderOptions;
  filesize_approx?: number;
}

export enum Container {
  M4ADash = "m4a_dash",
  Mp4Dash = "mp4_dash",
  WebmDash = "webm_dash",
}

export type DownloaderOptions = Record<string, string | number>

export enum FormatNote {
  Default = "Default",
  Low = "low",
  Medium = "medium",
  Premium = "Premium",
  Storyboard = "storyboard",
  The1080P = "1080p",
  The144P = "144p",
  The240P = "240p",
  The360P = "360p",
  The480P = "480p",
  The720P = "720p",
  Ultralow = "ultralow",
}

export type Fragment = {
  url: string;
  duration: number;
}

export type HTTPHeaders = Record<string, string | number>

export type Language = `${string}${string}`;

export enum Protocol {
  HTTPS = "https",
  M3U8Native = "m3u8_native",
  Mhtml = "mhtml",
}

export type Heatmap = {
  start_time: number;
  end_time: number;
  value: number;
}

export type RequestedDownload = {
  requested_formats: Format[];
  format: string;
  format_id: string;
  ext: AudioEXTEnum;
  protocol: string;
  format_note: string;
  filesize_approx: number;
  tbr: number;
  width: number;
  height: number;
  resolution: string;
  fps: number;
  dynamic_range: DynamicRange;
  vcodec: string;
  vbr: number;
  aspect_ratio: number;
  acodec: Acodec;
  abr: number;
  asr: number;
  audio_channels: number;
  _filename: string;
  filename: string;
  __write_download_archive: boolean;
  language?: Language;
}

export type Thumbnail = {
  url: string;
  preference: number;
  id: string;
  height?: number;
  width?: number;
  resolution?: string;
}
export type OptionFormatSort =
  | "hasvid"
  | "hasaud"
  | "ie_pref"
  | "lang"
  | "quality"
  | "source"
  | "proto"
  | "vcodec"
  | "acodec"
  | "codec"
  | "vext"
  | "aext"
  | "ext"
  | "filesize"
  | "fs_approx"
  | "size"
  | "height"
  | "width"
  | "res"
  | "fps"
  | "hdr"
  | "channels"
  | "tbr"
  | "vbr"
  | "abr"
  | "br"
  | "asr";
export type OptionFormatSortPlus = OptionFormatSort | `+${OptionFormatSort}`
export type JSRuntime = 'node' | 'bun' | 'quickjs' | 'deno'
export type JSRuntimeLocation = JSRuntime | `${JSRuntime}:${string}`
export type Flags = {
  abortOnError?: boolean
  abortOnUnavailableFragment?: boolean
  abortOnUnavailableFragments?: boolean
  addChapters?: boolean
  addHeader?: string | string[]
  addHeaders?: string | string[]
  addMetadata?: boolean
  ageLimit?: number
  allFormats?: boolean
  allowDynamicMpd?: boolean
  allSubs?: boolean
  apListMso?: boolean
  apMso?: string
  apPassword?: string
  apUsername?: string
  audioFormat?: string
  audioMultistreams?: boolean
  audioQuality?: number | string
  autonumberStart?: number
  batchFile?: string
  bidiWorkaround?: boolean
  breakMatchFilters?: string | string[]
  breakOnExisting?: boolean
  breakPerInput?: boolean
  bufferSize?: string
  cacheDir?: string
  callHome?: boolean
  checkAllFormats?: boolean
  checkFormats?: boolean
  cleanInfoJson?: boolean
  cleanInfojson?: boolean
  clientCertificate?: string
  clientCertificateKey?: string
  clientCertificatePassword?: string
  color?: string | string[]
  compatOptions?: string | string[]
  concatPlaylist?: 'never' | 'always' | 'multi_video'
  concurrentFragments?: number
  configLocation?: string | string[]
  configLocations?: string | string[]
  consoleTitle?: boolean
  continue?: boolean
  convertSub?: string
  convertSubs?: string
  convertSubtitles?: string
  convertThumbnails?: string
  cookies?: string
  cookiesFromBrowser?: string
  date?: string
  dateafter?: string
  datebefore?: string
  defaultSearch?: string
  downloadArchive?: string
  downloader?: string | string[]
  downloaderArgs?: string | string[]
  downloadSections?: string | string[]
  dumpJson?: boolean
  dumpPages?: boolean
  dumpSingleJson?: boolean
  dumpUserAgent?: boolean
  embedChapters?: boolean
  embedInfoJson?: boolean
  embedMetadata?: boolean
  embedSubs?: boolean
  embedThumbnail?: boolean
  enableFileUrls?: boolean
  encoding?: string
  exec?: string | string[]
  externalDownloader?: string | string[]
  externalDownloaderArgs?: string | string[]
  extractAudio?: boolean
  extractorArgs?: string | string[]
  extractorDescriptions?: boolean
  extractorRetries?: number | 'infinite'
  ffmpegLocation?: string
  fileAccessRetries?: number | 'infinite'
  fixup?: string
  flatPlaylist?: boolean
  forceDownloadArchive?: boolean
  forceGenericExtractor?: boolean
  forceIpv4?: boolean
  forceIpv6?: boolean
  forceKeyframesAtCuts?: boolean
  forceOverwrites?: boolean
  forceWriteArchive?: boolean
  forceWriteDownloadArchive?: boolean
  format?: string
  formatSort?: OptionFormatSortPlus[]
  formatSortForce?: boolean
  formatSortReset?: boolean
  fragmentRetries?: number | 'infinite'
  geoBypass?: boolean
  geoBypassCountry?: string
  geoBypassIpBlock?: string
  geoVerificationProxy?: string
  getComments?: boolean
  getDuration?: boolean
  getFilename?: boolean
  getFormat?: boolean
  getId?: boolean
  getThumbnail?: boolean
  getTitle?: boolean
  getUrl?: boolean
  help?: boolean
  hlsPreferFfmpeg?: boolean
  hlsPreferNative?: boolean
  hlsSplitDiscontinuity?: boolean
  hlsUseMpegts?: boolean
  httpChunkSize?: string
  id?: boolean
  ies?: string | string[]
  ignoreConfig?: boolean
  ignoreDynamicMpd?: boolean
  ignoreErrors?: boolean
  ignoreNoFormatsError?: boolean
  impersonate?: string
  includeAds?: boolean
  jsRuntimes?: JSRuntimeLocation | JSRuntimeLocation[]
  keepFragments?: boolean
  keepVideo?: boolean
  lazyPlaylist?: boolean
  legacyServerConnect?: boolean
  limitRate?: string
  listExtractors?: boolean
  listFormats?: boolean
  listImpersonateTargets?: boolean
  listSubs?: boolean
  listThumbnails?: boolean
  liveFromStart?: boolean
  loadInfoJson?: string
  markWatched?: boolean
  matchFilter?: string | string[]
  matchFilters?: string | string[]
  matchTitle?: string
  maxDownloads?: number
  maxFilesize?: string
  maxSleepInterval?: number
  maxViews?: number
  mergeOutputFormat?: string
  metadataFromTitle?: string
  minFilesize?: string
  minSleepInterval?: number
  minViews?: number
  mtime?: boolean
  netrc?: boolean
  netrcCmd?: string
  netrcLocation?: string
  newline?: boolean
  noAbortOnError?: boolean
  noAbortOnUnavailableFragments?: boolean
  noAddChapters?: boolean
  noAddMetadata?: boolean
  noAllowDynamicMpd?: boolean
  noAudioMultistreams?: boolean
  noBatchFile?: boolean
  noBreakMatchFilters?: boolean
  noBreakOnExisting?: boolean
  noBreakPerInput?: boolean
  noCacheDir?: boolean
  noCheckCertificates?: boolean
  noCheckFormats?: boolean
  noCleanInfoJson?: boolean
  noCleanInfojson?: boolean
  noColor?: boolean
  noConfig?: boolean
  noConfigLocations?: boolean
  noContinue?: boolean
  noCookies?: boolean
  noCookiesFromBrowser?: boolean
  noDownload?: boolean
  noDownloadArchive?: boolean
  noEmbedChapters?: boolean
  noEmbedInfoJson?: boolean
  noEmbedMetadata?: boolean
  noEmbedSubs?: boolean
  noEmbedThumbnail?: boolean
  noExec?: boolean
  noFlatPlaylist?: boolean
  noForceKeyframesAtCuts?: boolean
  noForceOverwrites?: boolean
  noFormatSortForce?: boolean
  noGetComments?: boolean
  noHlsSplitDiscontinuity?: boolean
  noHlsUseMpegts?: boolean
  noIgnoreDynamicMpd?: boolean
  noIgnoreErrors?: boolean
  noIgnoreNoFormatsError?: boolean
  noJsRuntimes?: boolean
  noKeepFragments?: boolean
  noKeepVideo?: boolean
  noLazyPlaylist?: boolean
  noLiveFromStart?: boolean
  noMarkWatched?: boolean
  noMatchFilters?: boolean
  noMtime?: boolean
  noOverwrites?: boolean
  noPart?: boolean
  noPlaylist?: boolean
  noPluginDirs?: boolean
  noPostOverwrites?: boolean
  noPreferFreeFormats?: boolean
  noProgress?: boolean
  noQuiet?: boolean
  noRemoteComponents?: boolean
  noRemoveChapters?: boolean
  noResizeBuffer?: boolean
  noRestrictFilenames?: boolean
  noSimulate?: boolean
  noSkipUnavailableFragments?: boolean
  noSplitChapters?: boolean
  noSplitTracks?: boolean
  noSponsorblock?: boolean
  noUpdate?: boolean
  noVideoMultistreams?: boolean
  noWaitForVideo?: boolean
  noWarnings?: boolean
  noWindowsFilenames?: boolean
  noWriteAutomaticSubs?: boolean
  noWriteAutoSubs?: boolean
  noWriteComments?: boolean
  noWriteDescription?: boolean
  noWriteInfoJson?: boolean
  noWritePlaylistMetafiles?: boolean
  noWriteSrt?: boolean
  noWriteSubs?: boolean
  noWriteThumbnail?: boolean
  output?: string | string[]
  outputNaPlaceholder?: string
  parseMetadata?: string | string[]
  part?: boolean
  password?: string
  paths?: string | string[]
  playlistEnd?: number
  playlistItems?: string
  playlistRandom?: boolean
  playlistReverse?: boolean
  playlistStart?: number
  pluginDirs?: string | string[]
  postOverwrites?: boolean
  postprocessorArgs?: string | string[]
  ppa?: string | string[]
  preferAvconv?: boolean
  preferFfmpeg?: boolean
  preferFreeFormats?: boolean
  preferInsecure?: boolean
  preferUnsecure?: boolean
  presetAlias?: string | string[]
  print?: string | string[]
  printJson?: boolean
  printTraffic?: boolean
  progress?: boolean
  progressDelta?: number
  progressTemplate?: string | string[]
  proxy?: string
  quiet?: boolean
  rateLimit?: string
  recodeVideo?: string
  referer?: string
  rejectTitle?: string
  remoteComponent?: string | string[]
  remoteComponents?: string | string[]
  removeChapters?: string | string[]
  remuxVideo?: string
  resizeBuffer?: boolean
  restrictFilenames?: boolean
  retries?: number | 'infinite'
  retrySleep?: string | string[]
  rmCacheDir?: boolean
  simulate?: boolean
  skipDownload?: boolean
  skipPlaylistAfterErrors?: number
  skipUnavailableFragments?: boolean
  sleepInterval?: number
  sleepRequests?: number
  sleepSubtitles?: number
  socketTimeout?: number
  sourceAddress?: string
  splitChapters?: boolean
  splitTracks?: boolean
  sponsorblockApi?: string
  sponsorblockChapterTitle?: string
  sponsorblockMark?: string | string[]
  sponsorblockRemove?: string | string[]
  srtLangs?: string | string[]
  subFormat?: string
  subLang?: string | string[]
  subLangs?: string | string[]
  throttledRate?: string
  trimFilenames?: number
  trimFileNames?: number
  twofactor?: string
  update?: boolean
  updateTo?: string
  useExtractors?: string | string[]
  usePostprocessor?: string | string[]
  userAgent?: string
  username?: string
  verbose?: boolean
  version?: boolean
  videoMultistreams?: boolean
  videoPassword?: string
  waitForVideo?: number | string
  windowsFilenames?: boolean
  writeAllThumbnails?: boolean
  writeAnnotations?: boolean
  writeAutomaticSubs?: boolean
  writeAutoSub?: boolean
  writeAutoSubs?: boolean
  writeComments?: boolean
  writeDescription?: boolean
  writeDesktopLink?: boolean
  writeInfoJson?: boolean
  writeLink?: boolean
  writePages?: boolean
  writePlaylistMetafiles?: boolean
  writeSrt?: boolean
  writeSub?: boolean
  writeSubs?: boolean
  writeThumbnail?: boolean
  writeUrlLink?: boolean
  writeWeblocLink?: boolean
  xattr?: boolean
  xattrs?: boolean
  xattrSetFilesize?: boolean
  xff?: string
  yesOverwrites?: boolean
  yesPlaylist?: boolean
  youtubeSkipDashManifest?: boolean
}

export type Exec = (url: string, flags?: Flags, options?: SpawnOptions) => TinyspawnPromise
export type Create = (binaryPath: string) => { (url: string, flags?: Flags, options?: SpawnOptions): Promise<Payload>; exec: Exec }
export type Update = (binaryPath?: string) => TinyspawnPromise
export const youtubeDl: ((...args: Parameters<Exec>) => Promise<Payload | string>) & { exec: Exec, create: Create }

export function exec(...args: Parameters<Exec>): ReturnType<Exec>
export function create(...args: Parameters<Create>): ReturnType<Create>
export function update(...args: Parameters<Update>): ReturnType<Update>

export default youtubeDl
