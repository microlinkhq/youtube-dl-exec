'use strict'

const { mkdtemp, readdir, readFile } = require('node:fs/promises')
const { spawn } = require('node:child_process')
const { createServer } = require('node:http')
const { once } = require('node:events')
const { tmpdir } = require('node:os')
const path = require('node:path')

const test = require('ava')

const SCRIPT_PATH = path.join(__dirname, '..', 'scripts', 'postinstall.js')

const runPostinstall = env =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [SCRIPT_PATH], { env })
    let stderr = ''
    child.stderr.on('data', chunk => (stderr += chunk))
    child.on('error', reject)
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(stderr))
    )
  })

const createFixtureServer = async handler => {
  const server = createServer(handler)
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  return { server, origin: `http://127.0.0.1:${server.address().port}` }
}

const createEnv = extra => {
  const { GITHUB_TOKEN, GH_TOKEN, ...env } = process.env
  return { ...env, ...extra }
}

const readBinary = async dir => {
  const [file] = await readdir(dir)
  return readFile(path.join(dir, file), 'utf8')
}

test('forwards the GitHub token as authorization header', async t => {
  let authorization
  const { server, origin } = await createFixtureServer((req, res) => {
    if (req.url === '/release') {
      authorization = req.headers.authorization
      res.setHeader('content-type', 'application/json')
      return res.end(
        JSON.stringify({
          assets: ['yt-dlp', 'yt-dlp.exe'].map(name => ({
            name,
            browser_download_url: `http://${req.headers.host}/download`
          }))
        })
      )
    }
    res.setHeader('content-type', 'application/octet-stream')
    res.end('binary content')
  })

  const dir = await mkdtemp(path.join(tmpdir(), 'youtube-dl-exec-'))

  await runPostinstall(
    createEnv({
      GITHUB_TOKEN: 'test-token',
      YOUTUBE_DL_HOST: `${origin}/release`,
      YOUTUBE_DL_DIR: dir
    })
  )

  server.close()

  t.is(authorization, 'Bearer test-token')
  t.is(await readBinary(dir), 'binary content')
})

test('downloads directly when the response is a binary stream', async t => {
  const { server, origin } = await createFixtureServer((req, res) => {
    res.setHeader('content-type', 'application/octet-stream')
    res.end('binary content')
  })

  const dir = await mkdtemp(path.join(tmpdir(), 'youtube-dl-exec-'))

  await runPostinstall(
    createEnv({
      YOUTUBE_DL_HOST: `${origin}/binary`,
      YOUTUBE_DL_DIR: dir
    })
  )

  server.close()

  t.is(await readBinary(dir), 'binary content')
})
