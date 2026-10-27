/**
 * Thin client for the /api functions that sit in front of Neon.
 *
 * These calls only work when the app is served with its serverless functions —
 * `vercel dev` locally, or a Vercel deployment. Under a plain `vite dev` there
 * is no /api, so callers fall back to the bundled sample data (see Admin.jsx).
 */
const BASE = '/api'

async function request(path, options) {
  const response = await fetch(`${BASE}${path}`, options)
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    /* e.g. vite dev serving index.html for an unknown /api path */
    throw new Error(`Unexpected ${response.status} response from ${path}`)
  }

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload?.error || `Request to ${path} failed (${response.status})`)
  }
  return payload
}

export async function fetchRecords(type) {
  const { data } = await request(`/records/${type}`)
  return data
}

export async function createRecord(type, values) {
  const { data } = await request(`/records/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })
  return data
}

export async function checkHealth() {
  return request('/health')
}
