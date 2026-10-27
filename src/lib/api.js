/**
 * Client for the /api functions that sit in front of Neon.
 *
 * These calls only work when the app is served with its serverless functions —
 * `vercel dev` locally, or a Vercel deployment. Errors carry a `status` so
 * callers can tell "not signed in" (401) from "API not reachable" (status 0).
 */
const BASE = '/api'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, options) {
  let response
  try {
    response = await fetch(`${BASE}${path}`, options)
  } catch {
    throw new ApiError('Could not reach the API.', 0)
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    /* e.g. vite dev serving index.html for an unknown /api path */
    throw new ApiError(`Unexpected ${response.status} response from ${path}`, response.status)
  }

  const payload = await response.json()
  if (!response.ok) {
    throw new ApiError(payload?.error || `Request to ${path} failed (${response.status})`, response.status)
  }
  return payload
}

const send = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

/* --- authentication ---------------------------------------------------- */
export const me = () => request('/auth/me').then((r) => r.user)
export const login = (email, password) => request('/auth/login', send('POST', { email, password })).then((r) => r.user)
export const logout = () => request('/auth/logout', { method: 'POST' })

/* --- admin records ----------------------------------------------------- */
export const fetchRecords = (type) => request(`/records/${type}`).then((r) => r.data)
export const createRecord = (type, values) => request(`/records/${type}`, send('POST', values)).then((r) => r.data)
export const updateRecord = (type, id, values) =>
  request(`/records/${type}?id=${encodeURIComponent(id)}`, send('PATCH', values)).then((r) => r.data)
export const deleteRecord = (type, id) =>
  request(`/records/${type}?id=${encodeURIComponent(id)}`, { method: 'DELETE' }).then((r) => r.data)

/* --- settings ---------------------------------------------------------- */
export const getSettings = () => request('/settings').then((r) => r.data)
export const saveSettings = (values) => request('/settings', send('PUT', values)).then((r) => r.data)

/* --- public (no auth) -------------------------------------------------- */
export const fetchPublic = (type) => request(`/public/${type}`).then((r) => r.data)
export const checkHealth = () => request('/health')
