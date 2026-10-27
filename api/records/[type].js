import { hasRecordType, listRecords, createRecord, updateRecord, deleteRecord, RECORD_TYPES } from '../_lib/db.js'
import { ROLES, requireRole } from '../_lib/auth.js'

/**
 * /api/records/:type — records for the admin console.
 *
 * Every role may read; only 'admin' and 'editor' may create, update or delete.
 *
 *   GET    /api/records/stories             -> { data: [...] }
 *   POST   /api/records/stories             -> { data: {...} }       create
 *   PATCH  /api/records/stories?id=<slug>   -> { data: {...} }       update
 *   DELETE /api/records/stories?id=<slug>   -> { data: { id } }      delete
 */
export default async function handler(req, res) {
  const { type, id } = req.query

  if (!hasRecordType(type)) {
    res.status(404).json({ error: `Unknown record type: ${type}`, allowed: RECORD_TYPES })
    return
  }

  const user = await requireRole(req, res, req.method === 'GET' ? ROLES : ['admin', 'editor'])
  if (!user) return

  try {
    if (req.method === 'GET') {
      const data = await listRecords(type)
      res.setHeader('Cache-Control', 'no-store')
      res.status(200).json({ data })
      return
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

    if (req.method === 'POST') {
      res.status(201).json({ data: await createRecord(type, body ?? {}) })
      return
    }

    if (req.method === 'PATCH' || req.method === 'PUT') {
      if (!id) {
        res.status(400).json({ error: 'Missing ?id=' })
        return
      }
      const data = await updateRecord(type, id, body ?? {})
      if (!data) {
        res.status(404).json({ error: 'Record not found' })
        return
      }
      res.status(200).json({ data })
      return
    }

    if (req.method === 'DELETE') {
      if (!id) {
        res.status(400).json({ error: 'Missing ?id=' })
        return
      }
      const deleted = await deleteRecord(type, id)
      if (!deleted) {
        res.status(404).json({ error: 'Record not found' })
        return
      }
      res.status(200).json({ data: { id: deleted } })
      return
    }

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE')
    res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
