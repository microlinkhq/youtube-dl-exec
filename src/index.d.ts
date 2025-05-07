import { SpawnOptions } from 'child_process';
import { SubprocessPromise } from 'tinyspawn';

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
  release_timestamp: null;
  _format_sort_fields: string[];
  automatic_captions: { [key: string]: AutomaticCaption[] };
  subtitles: any;
  comment_count: number | null;
  chapters: null;
  heatmap: Heatmap[] | null;
  channel: string;
  channel_follower_count: number;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  upload_date: string;
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
export type Flags = {
  abortOnError?: boolean
  abortOnUnavailableFragment?: boolean
  addHeader?: string[]
  addMetadata?: boolean
  ageLimit?: number
  allFormats?: boolean
  allSubs?: boolean
  apListMso?: boolean
  apMso?: string
  apPassword?: string
  apUsername?: string
  audioFormat?: string
  audioQuality?: number
  autonumberStart?: number
  batchFile?: string
  bidiWorkaround?: boolean
  bufferSize?: string
  cacheDir?: string
  callHome?: boolean
  configLocation?: string
  consoleTitle?: boolean
  continue?: boolean
  convertSubs?: string
  cookies?: string
  date?: string
  dateafter?: string
  datebefore?: string
  defaultSearch?: string
  downloadArchive?: string
  downloadSections?: string
  dumpJson?: boolean
  dumpPages?: boolean
  dumpSingleJson?: boolean
  dumpUserAgent?: boolean
  embedSubs?: boolean
  embedThumbnail?: boolean
  encoding?: string
  exec?: string
  externalDownloader?: string
  externalDownloaderArgs?: string
  extractAudio?: boolean
  extractorDescriptions?: boolean
  ffmpegLocation?: string
  fixup?: string
  flatPlaylist?: boolean
  forceGenericExtractor?: boolean
  forceIpv4?: boolean
  forceIpv6?: boolean
  forceKeyframesAtCuts?: boolean
  forceOverwrites?: boolean
  format?: string
  formatSort?: OptionFormatSortPlus[]
  geoBypass?: boolean
  geoBypassCountry?: string
  geoBypassIpBlock?: string
  geoVerificationProxy?: string
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
  hlsUseMpegts?: boolean
  httpChunkSize?: string
  id?: boolean
  ignoreConfig?: boolean
  ignoreErrors?: boolean
  includeAds?: boolean
  keepFragments?: boolean
  keepVideo?: boolean
  limitRate?: string
  listExtractors?: boolean
  listFormats?: boolean
  listSubs?: boolean
  listThumbnails?: boolean
  loadInfoJson?: string
  markWatched?: boolean
  matchFilter?: string
  matchTitle?: string
  maxDownloads?: number
  maxFilesize?: string
  maxSleepInterval?: number
  maxViews?: number
  mergeOutputFormat?: string
  metadataFromTitle?: string
  minFilesize?: string
  minViews?: number
  netrc?: boolean
  newline?: boolean
  noCacheDir?: boolean
  noCheckCertificates?: boolean
  noColor?: boolean
  noMtime?: boolean
  noOverwrites?: boolean
  noPart?: boolean
  noPlaylist?: boolean
  noPostOverwrites?: boolean
  noProgress?: boolean
  noResizeBuffer?: boolean
  noWarnings?: boolean
  output?: string
  outputNaPlaceholder?: string
  password?: string
  paths?: string
  playlistEnd?: number | 'last'
  playlistItems?: string
  playlistRandom?: boolean
  playlistReverse?: boolean
  playlistStart?: number
  postprocessorArgs?: string
  preferAvconv?: boolean
  preferFfmpeg?: boolean
  preferFreeFormats?: boolean
  preferInsecure?: boolean
  printJson?: boolean
  printTraffic?: boolean
  proxy?: string
  quiet?: boolean
  recodeVideo?: string
  referer?: string
  rejectTitle?: string
  remuxVideo?: string
  restrictFilenames?: boolean
  retries?: number | 'infinite'
  rmCacheDir?: boolean
  simulate?: boolean
  skipDownload?: boolean
  skipUnavailableFragments?: boolean
  sleepInterval?: number
  socketTimeout?: number
  sourceAddress?: string
  subFormat?: string
  subLang?: string
  trimFilenames?: number
  twofactor?: string
  update?: boolean
  userAgent?: string
  username?: string
  verbose?: boolean
  version?: boolean
  videoPassword?: string
  windowsFilenames?: boolean
  writeAllThumbnails?: boolean
  writeAnnotations?: boolean
  writeAutoSub?: boolean
  writeDescription?: boolean
  writeInfoJson?: boolean
  writePages?: boolean
  writeSub?: boolean
  writeThumbnail?: boolean
  xattrs?: boolean
  xattrSetFilesize?: boolean
  yesPlaylist?: boolean
  youtubeSkipDashManifest?: boolean
}

export type Exec = (url: string, flags?: Flags, options?: SpawnOptions) => SubprocessPromise
export type Create = (binaryPath: string) => { (url: string, flags?: Flags, options?: SpawnOptions): Promise<Payload>; exec: Exec }
export const youtubeDl: ((...args: Parameters<Exec>) => Promise<Payload | string>) & { exec: Exec, create: Create }

export function exec(...args: Parameters<Exec>): ReturnType<Exec>
export function create(...args: Parameters<Create>): ReturnType<Create>

export default youtubeDl
