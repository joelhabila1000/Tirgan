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

`npm run dev` serves the front end **and** runs the `/api` handlers in-process
(see `scripts/vite-api-dev.mjs`), reading `DATABASE_URL` from `.env.local`. No
Vercel CLI and no project linking are needed:

```bash
npm run dev           # http://localhost:5173 — app + API
```

`npm run dev:api` runs `vercel dev` instead; it only adds value if you want the
linked Vercel project's environment, and note that `vercel dev` does **not**
read `.env.local`.

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

You can also manage accounts from the console itself (Admins panel, `admin` role only).

### Roles

| Role | Read records/settings | Create, edit, delete records | Change settings | Manage accounts |
| --- | --- | --- | --- | --- |
| `admin` | yes | yes | yes | yes |
| `editor` | yes | yes | yes | no |
| `viewer` | yes | no | no | no |

Set the role when creating an account (`--role editor`), or change it in the Admins
panel. Enforcement is server-side (`requireRole` in `api/_lib/auth.js`); the console
also hides controls a role cannot use. You cannot change your own role or remove your
own or the last admin account.

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
