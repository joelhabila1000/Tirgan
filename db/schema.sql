-- ============================================================================
-- Tirngan admin console — schema
-- ----------------------------------------------------------------------------
-- Run this in the Neon SQL editor, with `psql -f db/schema.sql`, or via
-- `npm run db:setup` (which runs this file then db/seed.sql).
--
-- Safe to re-run: every statement is idempotent.
-- ============================================================================


-- ---------------------------------------------------------------------------
-- STORIES  (mirrors the shape in src/data/site.js `stories`)
-- ---------------------------------------------------------------------------
create table if not exists stories (
  slug        text primary key,
  placeholder boolean     not null default true,
  category    text        not null,
  title       text        not null,
  name        text        not null default '',
  role        text        not null default '',
  quote       text        not null default '',
  body        text        not null default '',
  art         text        not null default 'cells',
  tone        text        not null default 'teal',
  created_at  timestamptz not null default now()
);


-- ---------------------------------------------------------------------------
-- NEWS & BLOG  (mirrors `news`; `body` is an array of paragraphs)
-- ---------------------------------------------------------------------------
create table if not exists news (
  slug        text primary key,
  placeholder boolean     not null default true,
  title       text        not null,
  category    text        not null,
  date        date,
  author      text        not null default '',
  author_role text        not null default '',
  read_time   text        not null default '',
  excerpt     text        not null default '',
  body        text[]      not null default '{}',
  art         text        not null default 'care',
  tone        text        not null default 'teal',
  featured    boolean     not null default false,
  created_at  timestamptz not null default now()
);


-- ---------------------------------------------------------------------------
-- EVENTS  (mirrors `events`)
-- ---------------------------------------------------------------------------
create table if not exists events (
  id         text primary key,
  title      text        not null,
  date       date,
  time       text        not null default '',
  location   text        not null default '',
  type       text        not null default 'Awareness',
  summary    text        not null default '',
  spots      text        not null default '',
  created_at timestamptz not null default now()
);


-- ---------------------------------------------------------------------------
-- ENQUIRIES  (contact-form submissions)
-- ---------------------------------------------------------------------------
create table if not exists enquiries (
  id         text primary key,
  name       text        not null,
  email      text        not null,
  topic      text        not null default '',
  date       date,
  status     text        not null default 'New',
  created_at timestamptz not null default now()
);


-- ---------------------------------------------------------------------------
-- DONATIONS
-- ---------------------------------------------------------------------------
create table if not exists donations (
  id         text primary key,
  donor      text          not null default 'Anonymous',
  amount     numeric(14,2) not null default 0,
  type       text          not null default 'One-off',
  date       date,
  status     text          not null default 'Pending',
  created_at timestamptz  not null default now()
);


-- ---------------------------------------------------------------------------
-- Indexes for the console's default ordering and filters
-- ---------------------------------------------------------------------------
create index if not exists stories_category_idx  on stories (category);
create index if not exists news_date_idx         on news (date desc);
create index if not exists events_date_idx       on events (date);
create index if not exists enquiries_status_idx  on enquiries (status);
create index if not exists donations_date_idx    on donations (date desc);
