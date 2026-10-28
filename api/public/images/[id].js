import { getPool } from '../../_lib/db.js'

/**
 * GET /api/public/images/:id — the stored image bytes.
 *
 * Public and immutable: the id never changes for a given image, so it is safe to
 * cache at the edge for a year.
 */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { id } = req.query
  if (!UUID.test(String(id ?? ''))) {
    res.status(404).json({ error: 'Not found' })
    return
  }

  try {
    const { rows } = await getPool().query('select mime_type, data from images where id = $1', [id])
    if (!rows[0]) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    res.setHeader('Content-Type', rows[0].mime_type)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    res.status(200).send(rows[0].data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
