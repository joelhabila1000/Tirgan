import { useEffect, useState } from 'react'
import { fetchPublic } from './api'
import { site } from '../data/site'

/**
 * Public content hooks.
 *
 * Read once per type from /api/public/:type, then cache in module scope. If the
 * API is unavailable (plain `vite dev`, a static build, offline) the hooks keep
 * the bundled site.js data, so the public pages always render.
 */
const promises = new Map()
const values = new Map()

function load(type) {
  if (!promises.has(type)) {
    promises.set(
      type,
      fetchPublic(type)
        .then((rows) => {
          values.set(type, rows)
          return rows
        })
        .catch(() => null),
    )
  }
  return promises.get(type)
}

export function useCollection(type, fallback) {
  const [data, setData] = useState(() => (values.has(type) ? values.get(type) : fallback))

  useEffect(() => {
    if (values.has(type)) {
      setData(values.get(type))
      return undefined
    }
    let active = true
    load(type).then((rows) => {
      if (active && rows) setData(rows)
    })
    return () => {
      active = false
    }
  }, [type])

  return data
}

/** Organisation details from the database, merged over the static defaults. */
export function useOrgSettings() {
  const stored = useCollection('settings', null)
  return stored ? { ...site, ...stored } : site
}
