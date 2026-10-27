/**
 * Create or update an admin account.
 *
 *   npm run admin:create -- --email you@tirngan.org --password "a-long-secret" --name "Your Name"
 *
 * Flags fall back to ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME environment variables.
 * DATABASE_URL is read from .env.local (see db/README.md).
 */
import pg from 'pg'
import { hashPassword } from '../api/_lib/auth.js'

const args = {}
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i += 1) {
  if (!argv[i].startsWith('--')) continue
  const key = argv[i].slice(2)
  const value = argv[i + 1]
  if (value && !value.startsWith('--')) {
    args[key] = value
    i += 1
  } else {
    args[key] = 'true'
  }
}

const email = (args.email || process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = args.password || process.env.ADMIN_PASSWORD || ''
const name = args.name || process.env.ADMIN_NAME || ''

if (!email || !password) {
  console.error('Usage: npm run admin:create -- --email you@example.org --password "secret" [--name "Your Name"]')
  process.exit(1)
}
if (password.length < 8) {
  console.error('Choose a password of at least 8 characters.')
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env.local or export it before running.')
  process.exit(1)
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

try {
  const { rows } = await client.query(
    `insert into admin_users (email, name, password_hash)
     values ($1, $2, $3)
     on conflict (email) do update set name = excluded.name, password_hash = excluded.password_hash
     returning id, email`,
    [email, name, hashPassword(password)],
  )
  console.log(`Admin user ready: ${rows[0].email} (id ${rows[0].id})`)
  console.log('Sign in at /admin with the password you just set.')
} finally {
  await client.end()
}
