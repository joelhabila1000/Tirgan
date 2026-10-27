import { hasRecordType, listRecords, createRecord, RECORD_TYPES } from '../_lib/db.js'

/**
 * /api/records/:type  —  list and create records for the admin console.
 *
 *   GET  /api/records/stories      -> { data: [...] }
 *   POST /api/records/enquiries    -> { data: {...} }
 *
 * NOTE: this endpoint is UNPROTECTED. It is fine while the console is a
 * front-end shell, but before the site is public you must add authentication
 * and per-request authorisation (see the header comment in src/pages/Admin.jsx).
 */
export default async function handler(req, res) {
  const { type } = req.query

  if (!hasRecordType(type)) {
    res.status(404).json({ error: `Unknown record type: ${type}`, allowed: RECORD_TYPES })
    return
  }

  try {
    if (req.method === 'GET') {
      const data = await listRecords(type)
      res.setHeader('Cache-Control', 'no-store')
      res.status(200).json({ data })
      return
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const data = await createRecord(type, body)
      res.status(201).json({ data })
      return
    }

    res.setHeader('Allow', 'GET, POST')
    res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
