/**
 * Apply the SQL files in db/ to the database in DATABASE_URL.
 *
 *   npm run db:setup                 # db/schema.sql then db/seed.sql
 *   npm run db:setup db/schema.sql   # just one file
 *
 * Reads DATABASE_URL from the environment. For local use, put it in .env.local
 * and run with:  node --env-file=.env.local scripts/db-seed.mjs
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const { Client } = pg
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL is not set. Add it to .env.local or export it before running.')
  process.exit(1)
}

const files = process.argv.slice(2)
const targets = files.length ? files : ['db/schema.sql', 'db/seed.sql']

const client = new Client({ connectionString })
await client.connect()

try {
  for (const file of targets) {
    const sqlText = await readFile(path.resolve(root, file), 'utf8')
    await client.query(sqlText)
    console.log(`applied ${file}`)
  }
  console.log('done')
} finally {
  await client.end()
}
