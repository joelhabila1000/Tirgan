/**
 * Create or update an admin account.
 *
 *   npm run admin:create -- --email you@tirngan.org --password "a-long-secret" --name "Your Name" [--role editor]
 *
 * Flags fall back to ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME / ADMIN_ROLE
 * environment variables. DATABASE_URL is read from .env.local (see db/README.md).
 *
 * Roles: admin (everything), editor (content and settings, no accounts),
 * viewer (read-only). The role is only applied when you pass --role, so running
 * this to reset a password never changes an existing account's role.
 */
import pg from 'pg'
import { hashPassword } from '../api/_lib/auth.js'

const ROLES = ['admin', 'editor', 'viewer']

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
const roleArg = args.role || process.env.ADMIN_ROLE || ''

if (!email || !password) {
  console.error('Usage: npm run admin:create -- --email you@example.org --password "secret" [--name "Your Name"] [--role admin|editor|viewer]')
  process.exit(1)
}
if (password.length < 8) {
  console.error('Choose a password of at least 8 characters.')
  process.exit(1)
}
if (roleArg && !ROLES.includes(roleArg)) {
  console.error(`Role must be one of: ${ROLES.join(', ')}.`)
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
    `insert into admin_users (email, name, role, password_hash)
     values ($1, $2, $3, $4)
     on conflict (email) do update
       set name = excluded.name,
           password_hash = excluded.password_hash,
           role = case when $5::boolean then excluded.role else admin_users.role end
     returning id, email, role`,
    [email, name, roleArg || 'admin', hashPassword(password), Boolean(roleArg)],
  )
  console.log(`Admin user ready: ${rows[0].email} (id ${rows[0].id}, role ${rows[0].role})`)
  console.log('Sign in at /admin with the password you just set.')
} finally {
  await client.end()
}
