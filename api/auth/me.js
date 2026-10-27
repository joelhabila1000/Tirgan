import { getSessionUser } from '../_lib/auth.js'

/** GET /api/auth/me -> { user } or 401 */
export default async function handler(req, res) {
  try {
    const user = await getSessionUser(req)
    if (!user) {
      res.status(401).json({ error: 'Not signed in' })
      return
    }
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
