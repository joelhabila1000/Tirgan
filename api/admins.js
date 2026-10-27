import { getPool } from './_lib/db.js'
import { ROLES, hashPassword, requireRole } from './_lib/auth.js'

/**
 * /api/admins — manage console accounts. Requires the 'admin' role.
 *
 *   GET    /api/admins          -> { data: [...] }   (never exposes password_hash)
 *   POST   /api/admins          -> { data: {...} }   { name, email, password, role }
 *   PATCH  /api/admins?id=<id>  -> { data: {...} }   { name?, role?, password? }
 *   DELETE /api/admins?id=<id>  -> { data: { id } }
 */
const MIN_PASSWORD = 8

const COLUMNS = `id, email, name, role, created_at as "createdAt", last_login_at as "lastLoginAt"`

export default async function handler(req, res) {
  const user = await requireRole(req, res, ['admin'])
  if (!user) return

  try {
    if (req.method === 'GET') {
      const { rows } = await getPool().query(`select ${COLUMNS} from admin_users order by created_at asc`)
      res.setHeader('Cache-Control', 'no-store')
      res.status(200).json({ data: rows })
      return
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const id = req.query.id ? Number(req.query.id) : null
    const isSelf = id !== null && String(id) === String(user.id)

    if (req.method === 'POST') {
      const email = String(body?.email ?? '').trim().toLowerCase()
      const name = String(body?.name ?? '').trim()
      const password = String(body?.password ?? '')
      const role = String(body?.role ?? 'editor')

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ error: 'Enter a valid email address.' })
        return
      }
      if (password.length < MIN_PASSWORD) {
        res.status(400).json({ error: `Choose a password of at least ${MIN_PASSWORD} characters.` })
        return
      }
      if (!ROLES.includes(role)) {
        res.status(400).json({ error: `Role must be one of: ${ROLES.join(', ')}.` })
        return
      }

      const { rows } = await getPool().query(
        `insert into admin_users (email, name, role, password_hash) values ($1, $2, $3, $4) returning ${COLUMNS}`,
        [email, name, role, hashPassword(password)],
      )
      res.status(201).json({ data: rows[0] })
      return
    }

    if (req.method === 'PATCH' || req.method === 'PUT') {
      if (!id) {
        res.status(400).json({ error: 'Missing ?id=' })
        return
      }
      const assignments = []
      const values = []
      if (body?.name !== undefined) {
        values.push(String(body.name).trim())
        assignments.push(`name = $${values.length}`)
      }
      if (body?.role !== undefined) {
        if (isSelf) {
          res.status(400).json({ error: 'You cannot change your own role.' })
          return
        }
        if (!ROLES.includes(String(body.role))) {
          res.status(400).json({ error: `Role must be one of: ${ROLES.join(', ')}.` })
          return
        }
        values.push(String(body.role))
        assignments.push(`role = $${values.length}`)
      }
      if (body?.password) {
        if (String(body.password).length < MIN_PASSWORD) {
          res.status(400).json({ error: `Choose a password of at least ${MIN_PASSWORD} characters.` })
          return
        }
        values.push(hashPassword(String(body.password)))
        assignments.push(`password_hash = $${values.length}`)
      }
      if (!assignments.length) {
        res.status(400).json({ error: 'Nothing to update' })
        return
      }
      values.push(id)
      const { rows } = await getPool().query(
        `update admin_users set ${assignments.join(', ')} where id = $${values.length} returning ${COLUMNS}`,
        values,
      )
      if (!rows[0]) {
        res.status(404).json({ error: 'Admin not found' })
        return
      }
      res.status(200).json({ data: rows[0] })
      return
    }

    if (req.method === 'DELETE') {
      if (!id) {
        res.status(400).json({ error: 'Missing ?id=' })
        return
      }
      if (isSelf) {
        res.status(400).json({ error: 'You cannot remove your own account.' })
        return
      }
      const { rows: counted } = await getPool().query('select count(*)::int as count from admin_users')
      if (counted[0].count <= 1) {
        res.status(400).json({ error: 'You cannot remove the last admin account.' })
        return
      }
      const { rows } = await getPool().query('delete from admin_users where id = $1 returning id', [id])
      if (!rows[0]) {
        res.status(404).json({ error: 'Admin not found' })
        return
      }
      res.status(200).json({ data: { id } })
      return
    }

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE')
    res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'An admin with that email address already exists.' })
      return
    }
    res.status(500).json({ error: error.message })
  }
}
