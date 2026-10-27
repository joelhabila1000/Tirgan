import { createSession, setSessionCookie, verifyPassword } from '../_lib/auth.js'
import { getPool } from '../_lib/db.js'

/** POST /api/auth/login  { email, password } -> { user } */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const email = String(body?.email ?? '').trim().toLowerCase()
  const password = String(body?.password ?? '')

  if (!email || !password) {
    res.status(400).json({ error: 'Enter your email address and password.' })
    return
  }

  try {
    const { rows } = await getPool().query(
      'select id, email, name, role, password_hash from admin_users where email = $1',
      [email],
    )
    const user = rows[0]

    /* Always run a comparison so a missing account and a wrong password look alike. */
    const ok = user ? verifyPassword(password, user.password_hash) : verifyPassword(password, hashPlaceholder())

    if (!user || !ok) {
      res.status(401).json({ error: 'Invalid email or password.' })
      return
    }

    const token = await createSession(user.id)
    await getPool().query('update admin_users set last_login_at = now() where id = $1', [user.id])
    setSessionCookie(res, token)
    res.status(200).json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/* A valid-format hash that no password matches, used to keep timing uniform. */
let placeholder
function hashPlaceholder() {
  if (!placeholder) {
    placeholder = `scrypt$16384$8$1$${Buffer.alloc(16).toString('base64')}$${Buffer.alloc(64).toString('base64')}`
  }
  return placeholder
}
