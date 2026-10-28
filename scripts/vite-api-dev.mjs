import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

/**
 * Dev-only Vite plugin that serves /api/* by running the very same handlers
 * Vercel runs in production, so `npm run dev` has a working API without the
 * Vercel CLI or project linking.
 *
 * - Loads .env / .env.local (via Vite's loadEnv) into process.env, so the
 *   handlers see DATABASE_URL.
 * - Resolves dynamic routes: /api/records/stories -> api/records/[type].js.
 * - Caches handler modules so module-level state (the pg pool) is shared across
 *   requests. Edit an api/ file and the dev server needs a restart.
 *
 * In production this plugin does nothing (apply: 'serve'); Vercel handles /api.
 */
export default function apiDevPlugin() {
  const handlers = new Map()
  let root = process.cwd()

  const loadHandler = (file) => {
    if (!handlers.has(file)) {
      handlers.set(
        file,
        import(pathToFileURL(file).href).then((module) => module.default),
      )
    }
    return handlers.get(file)
  }

  return {
    name: 'tirngan-api-dev',
    apply: 'serve',
    configResolved(config) {
      root = config.root
      /* Only fill in what the shell/Vercel has not already provided. */
      const env = loadEnv(config.mode, config.root, '')
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        if (url.pathname !== '/api' && !url.pathname.startsWith('/api/')) return next()

        const segments = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean)
        const match = await resolveRoute(root, segments)

        if (!match) {
          respond(res, 404, { error: `No API handler for ${url.pathname}` })
          return
        }

        try {
          const handler = await loadHandler(match.file)
          if (typeof handler !== 'function') throw new Error(`${match.file} has no default export`)

          const query = { ...match.params }
          for (const [key, value] of url.searchParams) query[key] = value

          req.query = query
          req.body = await readBody(req)

          /* The Vercel-style res.status().json() helpers, on the Node response. */
          res.status = (code) => {
            res.statusCode = code
            return res
          }
          res.json = (payload) => {
            if (!res.getHeader('Content-Type')) res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(payload))
            return res
          }
          /* Some handlers (e.g. images) send raw bytes or text. */
          res.send = (payload) => {
            if (Buffer.isBuffer(payload) || typeof payload === 'string') res.end(payload)
            else if (payload === undefined || payload === null) res.end()
            else res.end(JSON.stringify(payload))
            return res
          }

          await handler(req, res)
        } catch (error) {
          server.config.logger.error(`[api] ${url.pathname} failed:\n${error.stack || error.message}`)
          if (!res.headersSent) respond(res, 500, { error: error.message })
        }
      })
    },
  }
}

async function resolveRoute(root, segments) {
  const exact = `${path.join(root, 'api', ...segments)}.js`
  if (existsSync(exact)) return { file: exact, params: {} }

  if (segments.length < 2) return null

  const dir = path.join(root, 'api', ...segments.slice(0, -1))
  const entries = await readdir(dir).catch(() => [])
  for (const entry of entries) {
    const dynamic = /^\[(.+)\]\.js$/.exec(entry)
    if (dynamic) {
      return { file: path.join(dir, entry), params: { [dynamic[1]]: segments[segments.length - 1] } }
    }
  }
  return null
}

function readBody(req) {
  return new Promise((done) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) {
        done(undefined)
        return
      }
      if ((req.headers['content-type'] || '').includes('application/json')) {
        try {
          done(JSON.parse(raw))
          return
        } catch {
          /* fall through and hand back the raw string */
        }
      }
      done(raw)
    })
    req.on('error', () => done(undefined))
  })
}

function respond(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}
