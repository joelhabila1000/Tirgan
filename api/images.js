import { getPool } from './_lib/db.js'
import { requireRole } from './_lib/auth.js'

/**
 * Uploaded images (photos and fliers). Requires the 'admin' or 'editor' role.
 *
 *   POST   /api/images        { data: "data:image/jpeg;base64,..." } -> { data: { id, url } }
 *   DELETE /api/images?id=<id>
 *
 * The browser resizes before uploading (see src/lib/image.js), so payloads stay
 * small; the 3 MB cap is a backstop.
 */
const MAX_BYTES = 3 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']

export default async function handler(req, res) {
  const user = await requireRole(req, res, ['admin', 'editor'])
  if (!user) return

  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const match = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(String(body?.data ?? ''))

      if (!match) {
        res.status(400).json({ error: 'Expected a base64 image data URL.' })
        return
      }

      const mimeType = match[1].toLowerCase()
      if (!ALLOWED.includes(mimeType)) {
        res.status(400).json({ error: `Unsupported image type: ${mimeType}. Use JPEG, PNG or WebP.` })
        return
      }

      const buffer = Buffer.from(match[2], 'base64')
      if (!buffer.length) {
        res.status(400).json({ error: 'That image is empty.' })
        return
      }
      if (buffer.length > MAX_BYTES) {
        res.status(413).json({ error: 'Image must be smaller than 3 MB.' })
        return
      }

      const { rows } = await getPool().query(
        'insert into images (mime_type, size_bytes, data) values ($1, $2, $3) returning id',
        [mimeType, buffer.length, buffer],
      )
      res.status(201).json({ data: { id: rows[0].id, url: `/api/public/images/${rows[0].id}` } })
      return
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id) {
        res.status(400).json({ error: 'Missing ?id=' })
        return
      }
      await getPool().query('delete from images where id = $1', [id])
      res.status(200).json({ data: { id } })
      return
    }

    res.setHeader('Allow', 'POST, DELETE')
    res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
