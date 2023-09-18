/* eslint-disable */
declare module 'youtube-dl-exec' {
  import { ExecaChildProcess, Options } from 'execa'

  export type YtFormat = {
    asr: number
    filesize: number
    format_id: string
    format_note: string
    fps: number
    height: number
    quality: number
    tbr: number
    vbr?: number
    url: string
    manifest_url: string
    width: number
    ext: string
    vcodec: string
    acodec: string
    abr: number
    downloader_options: unknown
    container: string
    format: string
    protocol: string
    http_headers: unknown
  }

  export type YtThumbnail = {
    height: number
    url: string
    width: number
    resolution: string
    id: string
  }

  export type YtResponse = {
    id: string
    title: string
    formats: YtFormat[]
    thumbnails: YtThumbnail[]
    description: string
    upload_date: string
    uploader: string
    uploader_id: string
    uploader_url: string
    channel_id: string
    channel_url: string
    duration: number
    view_count: number
    average_rating: number
    age_limit: number
    webpage_url: string
    categories: string[]
    tags: string[]
    is_live: boolean
    like_count: number
    dislike_count: number
    channel: string
    track: string
    artist: string
    creator: string
    alt_title: string
    extractor: string
    webpage_url_basename: string
    extractor_key: string
    playlist: string
    playlist_index: number
    thumbnail: string
    display_id: string
    requested_subtitles: unknown
    asr: number
    filesize: number
    format_id: string
    format_note: string
    fps: number
    height: number
    quality: number
    tbr: number
    url: string
    width: number
    ext: string
    vcodec: string
    acodec: string
    abr: number
    downloader_options: { http_chunk_size: number }
    container: string
    format: string
    protocol: string
    http_headers: unknown
    fulltitle: string
    _filename: string
  }

  export type YtFlags = {
    help?: boolean
    version?: boolean
    update?: boolean
    ignoreErrors?: boolean
    abortOnError?: boolean
    dumpUserAgent?: boolean
    listExtractors?: boolean
    extractorDescriptions?: boolean
    forceGenericExtractor?: boolean
    defaultSearch?: string
    ignoreConfig?: boolean
    configLocation?: string
    flatPlaylist?: boolean
    markWatched?: boolean
    noColor?: boolean
    proxy?: string
    socketTimeout?: number
    sourceAddress?: string
    forceIpv4?: boolean
    forceIpv6?: boolean
    geoVerificationProxy?: string
    geoBypass?: boolean
    geoBypassCountry?: string
    geoBypassIpBlock?: string
    playlistStart?: number
    playlistEnd?: number | 'last'
    playlistItems?: string
    matchTitle?: string
    rejectTitle?: string
    maxDownloads?: number
    minFilesize?: string
    maxFilesize?: string
    date?: string
    datebefore?: string
    dateafter?: string
    minViews?: number
    maxViews?: number
    matchFilter?: string
    noPlaylist?: boolean
    yesPlaylist?: boolean
    ageLimit?: number
    downloadArchive?: string
    includeAds?: boolean
    limitRate?: string
    retries?: number | 'infinite'
    skipUnavailableFragments?: boolean
    abortOnUnavailableFragment?: boolean
    keepFragments?: boolean
    bufferSize?: string
    noResizeBuffer?: boolean
    httpChunkSize?: string
    playlistReverse?: boolean
    playlistRandom?: boolean
    xattrSetFilesize?: boolean
    hlsPreferNative?: boolean
    hlsPreferFfmpeg?: boolean
    hlsUseMpegts?: boolean
    externalDownloader?: string
    externalDownloaderArgs?: string
    batchFile?: string
    id?: boolean
    output?: string
    outputNaPlaceholder?: string
    autonumberStart?: number
    restrictFilenames?: boolean
    noOverwrites?: boolean
    continue?: boolean
    noPart?: boolean
    noMtime?: boolean
    writeDescription?: boolean
    writeInfoJson?: boolean
    writeAnnotations?: boolean
    loadInfoJson?: string
    cookies?: string
    cacheDir?: string
    noCacheDir?: boolean
    rmCacheDir?: boolean
    writeThumbnail?: boolean
    writeAllThumbnails?: boolean
    listThumbnails?: boolean
    quiet?: boolean
    noWarnings?: boolean
    simulate?: boolean
    skipDownload?: boolean
    getUrl?: boolean
    getTitle?: boolean
    getId?: boolean
    getThumbnail?: boolean
    getDuration?: boolean
    getFilename?: boolean
    getFormat?: boolean
    dumpJson?: boolean
    dumpSingleJson?: boolean
    printJson?: boolean
    newline?: boolean
    noProgress?: boolean
    consoleTitle?: boolean
    verbose?: boolean
    dumpPages?: boolean
    writePages?: boolean
    printTraffic?: boolean
    callHome?: boolean
    encoding?: string
    noCheckCertificates?: boolean
    preferInsecure?: boolean
    userAgent?: string
    referer?: string
    addHeader?: string[]
    bidiWorkaround?: boolean
    sleepInterval?: number
    maxSleepInterval?: number
    format?: string
    allFormats?: boolean
    preferFreeFormats?: boolean
    listFormats?: boolean
    youtubeSkipDashManifest?: boolean
    mergeOutputFormat?: string
    writeSub?: boolean
    writeAutoSub?: boolean
    allSubs?: boolean
    listSubs?: boolean
    subFormat?: string
    subLang?: string
    username?: string
    password?: string
    twofactor?: string
    netrc?: boolean
    videoPassword?: string
    apMso?: string
    apUsername?: string
    apPassword?: string
    apListMso?: boolean
    extractAudio?: boolean
    audioFormat?: string
    audioQuality?: number
    recodeVideo?: string
    remuxVideo?: string
    postprocessorArgs?: string
    keepVideo?: boolean
    noPostOverwrites?: boolean
    embedSubs?: boolean
    embedThumbnail?: boolean
    addMetadata?: boolean
    metadataFromTitle?: string
    xattrs?: boolean
    fixup?: string
    preferAvconv?: boolean
    preferFfmpeg?: boolean
    ffmpegLocation?: string
    exec?: string
    convertSubs?: string
  }

  export type YtdlExecFunction = (
    url: string,
    flags?: YtFlags,
    options?: Options<string>
  ) => ExecaChildProcess
  export type YtdlCreateFuncion = (binaryPath: string) => {
    (
      url: string,
      flags?: YtFlags,
      options?: Options<string>
    ): Promise<YtResponse>
    exec: YtdlExecFunction
  }

  const youtubeDl: ((
    url: string,
    flags?: YtFlags,
    options?: Options<string>
  ) => Promise<YtResponse>) & {
    exec: YtdlExecFunction
    create: YtdlCreateFuncion
  }

  export default youtubeDl
  export function exec (
    ...[url, flags, options]: Parameters<YtdlExecFunction>
  ): ReturnType<YtdlExecFunction>
  export function create (
    ...[binaryPath]: Parameters<YtdlCreateFuncion>
  ): ReturnType<YtdlCreateFuncion>
}
