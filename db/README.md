# Neon database

The admin console reads its records (stories, news, events, enquiries, donations)
from a Neon Postgres database through the serverless functions in `/api`.

```
Browser (src/lib/api.js)
      │  fetch /api/records/<type>
      ▼
Vercel Function (api/records/[type].js)
      │  SQL via pg (api/_lib/db.js)
      ▼
Neon Postgres (db/schema.sql, db/seed.sql)
```

## 1. Set the connection string

Copy `.env.example` to `.env.local` and paste the **pooled** connection string
from the Neon console (the host contains `-pooler`). `.env.local` is git-ignored.

```bash
cp .env.example .env.local
```

On Vercel, add the same value as an environment variable named `DATABASE_URL`
(Project → Settings → Environment Variables, for all environments).

## 2. Create the tables and seed the sample records

```bash
npm run db:setup      # runs db/schema.sql then db/seed.sql
npm run db:schema     # schema only
npm run db:seed       # sample rows only
```

Both SQL files are idempotent, so re-running is safe. You can also paste their
contents into the Neon SQL editor instead of using the npm scripts.

## 3. Run the app with its API

Plain `npm run dev` (Vite) has no `/api` and falls back to the bundled sample
records. To exercise the real database locally, serve the app together with the
serverless functions:

```bash
npx vercel dev        # or: npm run dev:api, after installing the Vercel CLI
```

The admin console shows a "Live data" badge when it is reading from Neon, and a
"Sample data" badge when it is not.

## 4. Create an admin account

The console is protected by server-side sessions. Create your account with:

```bash
npm run admin:create -- --email you@tirngan.org --password "a-long-secret" --name "Your Name"
```

Re-running it updates that account's name and password. Passwords are hashed with
scrypt and never stored in plain text; sessions live in `admin_sessions` and reach
the browser as an HttpOnly cookie (`tf_session`).

## Routes

| Route | Auth | Purpose |
| --- | --- | --- |
| `POST /api/auth/login` | – | Sign in, sets the session cookie |
| `POST /api/auth/logout` | – | Sign out |
| `GET /api/auth/me` | cookie | Current user |
| `GET/POST/PATCH/DELETE /api/records/:type` | **required** | Console records (`?id=` for update/delete) |
| `GET/PUT /api/settings` | **required** | Organisation details |
| `GET/POST/PATCH/DELETE /api/admins` | **required** | Console accounts (`?id=` for update/delete) |
| `GET /api/public/:type` | – | `stories`, `news`, `events`, `settings` for the public site |
| `GET /api/health` | – | Connectivity check |

## Notes

- The login route is not yet rate-limited. Add throttling (e.g. Upstash or a
  counter in Postgres) before the console is widely exposed.
- "Reply" on an enquiry and "Refund" on a donation only change their status —
  they send no email and call no payment provider.
