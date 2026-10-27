import { getPool } from './_lib/db.js'
import { requireUser } from './_lib/auth.js'

/** Organisation settings, stored as one JSON row. Requires a signed-in user. */
const KEY = 'organisation'

export default async function handler(req, res) {
  const user = await requireUser(req, res)
  if (!user) return

  try {
    if (req.method === 'GET') {
      const { rows } = await getPool().query('select value from settings where key = $1', [KEY])
      res.setHeader('Cache-Control', 'no-store')
      res.status(200).json({ data: rows[0]?.value ?? {} })
      return
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        res.status(400).json({ error: 'Expected a settings object' })
        return
      }
      const { rows } = await getPool().query(
        `insert into settings (key, value, updated_at) values ($1, $2::jsonb, now())
         on conflict (key) do update set value = excluded.value, updated_at = now()
         returning value`,
        [KEY, JSON.stringify(body)],
      )
      res.status(200).json({ data: rows[0].value })
      return
    }

    res.setHeader('Allow', 'GET, PUT')
    res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
