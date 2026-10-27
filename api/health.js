import { getPool } from './_lib/db.js'

/** GET /api/health — cheap check that the function can reach Neon. */
export default async function handler(req, res) {
  try {
    const { rows } = await getPool().query('select now() as now, current_database() as database')
    res.status(200).json({ ok: true, now: rows[0].now, database: rows[0].database })
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message })
  }
}
