import { hasRecordType, listRecords } from '../_lib/db.js'
import { getPool } from '../_lib/db.js'

/**
 * /api/public/:type — unauthenticated read access for the public site.
 * Only published content types are exposed; enquiries and donations are never
 * reachable here.
 *
 *   GET /api/public/stories | news | events | settings
 */
const PUBLIC_TYPES = ['stories', 'news', 'events']

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { type } = req.query

  try {
    if (type === 'settings') {
      const { rows } = await getPool().query("select value from settings where key = 'organisation'")
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
      res.status(200).json({ data: rows[0]?.value ?? {} })
      return
    }

    if (!hasRecordType(type) || !PUBLIC_TYPES.includes(type)) {
      res.status(404).json({ error: `Unknown public type: ${type}`, allowed: [...PUBLIC_TYPES, 'settings'] })
      return
    }

    const data = await listRecords(type)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
