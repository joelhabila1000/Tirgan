import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { getPool } from './db.js'

/**
 * Authentication for the admin console.
 *
 * Passwords are hashed with scrypt (Node's built-in KDF). Sessions are random
 * tokens stored in the database as a SHA-256 hash, handed to the browser in an
 * HttpOnly cookie — so a database read never exposes a usable password or token.
 */
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 }
const SESSION_COOKIE = 'tf_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 /* 7 days */

export function hashPassword(password) {
  const salt = randomBytes(16)
  const hash = scryptSync(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p })
  return ['scrypt', SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString('base64'), hash.toString('base64')].join('$')
}

export function verifyPassword(password, stored) {
  try {
    const [scheme, n, r, p, saltB64, hashB64] = String(stored).split('$')
    if (scheme !== 'scrypt') return false
    const expected = Buffer.from(hashB64, 'base64')
    const actual = scryptSync(password, Buffer.from(saltB64, 'base64'), expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    })
    return actual.length === expected.length && timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

const hashToken = (token) => createHash('sha256').update(token).digest('hex')

export async function createSession(userId) {
  const token = randomBytes(32).toString('base64url')
  await getPool().query(
    'insert into admin_sessions (token_hash, user_id, expires_at) values ($1, $2, $3)',
    [hashToken(token), userId, new Date(Date.now() + SESSION_TTL_MS)],
  )
  return token
}

export async function destroySession(token) {
  if (!token) return
  await getPool().query('delete from admin_sessions where token_hash = $1', [hashToken(token)])
}

export function sessionTokenFrom(req) {
  return readCookie(req, SESSION_COOKIE)
}

export async function getSessionUser(req) {
  const token = sessionTokenFrom(req)
  if (!token) return null
  const { rows } = await getPool().query(
    `select u.id, u.email, u.name, u.role
       from admin_sessions s
       join admin_users u on u.id = s.user_id
      where s.token_hash = $1 and s.expires_at > now()`,
    [hashToken(token)],
  )
  return rows[0] ?? null
}

/** Returns the signed-in user, or sends a 401 and returns null. */
export async function requireUser(req, res) {
  const user = await getSessionUser(req)
  if (!user) {
    res.status(401).json({ error: 'Not signed in' })
    return null
  }
  return user
}

export function setSessionCookie(res, token) {
  res.setHeader('Set-Cookie', serializeCookie(SESSION_COOKIE, token, SESSION_TTL_MS / 1000))
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', serializeCookie(SESSION_COOKIE, '', 0))
}

function serializeCookie(name, value, maxAgeSeconds) {
  const parts = [`${name}=${encodeURIComponent(value)}`, 'Path=/', `Max-Age=${maxAgeSeconds}`, 'HttpOnly', 'SameSite=Lax']
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) parts.push('Secure')
  return parts.join('; ')
}

function readCookie(req, name) {
  const header = req.headers?.cookie
  if (!header) return null
  for (const part of header.split(';')) {
    const index = part.indexOf('=')
    if (index === -1) continue
    if (part.slice(0, index).trim() === name) return decodeURIComponent(part.slice(index + 1).trim())
  }
  return null
}
