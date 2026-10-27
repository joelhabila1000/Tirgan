import { clearSessionCookie, destroySession, sessionTokenFrom } from '../_lib/auth.js'

/** POST /api/auth/logout -> { ok: true } */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    await destroySession(sessionTokenFrom(req))
  } catch {
    /* The cookie is cleared regardless. */
  }
  clearSessionCookie(res)
  res.status(200).json({ ok: true })
}
