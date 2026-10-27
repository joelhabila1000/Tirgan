import pg from 'pg'

const { Pool, types } = pg

/**
 * Hand back DATE columns as 'YYYY-MM-DD' strings and NUMERIC as numbers, so the
 * JSON the console receives matches the shape of the bundled sample records.
 * (Without this, `date` columns become a JS Date at local midnight and can shift
 * by a day once serialised to UTC.)
 */
types.setTypeParser(1082, (value) => value)
types.setTypeParser(1700, (value) => Number(value))

/**
 * Record types the API will serve, with the mapping between the field names the
 * front end uses and the snake_case columns in Postgres. Every column name here
 * is a fixed string, so it is safe to interpolate into SQL. Values are always
 * passed as query parameters.
 */
const TABLES = {
  stories: {
    fields: {
      slug: 'slug',
      placeholder: 'placeholder',
      category: 'category',
      title: 'title',
      name: 'name',
      role: 'role',
      quote: 'quote',
      body: 'body',
      art: 'art',
      tone: 'tone',
    },
    order: 'title asc',
  },
  news: {
    fields: {
      slug: 'slug',
      placeholder: 'placeholder',
      title: 'title',
      category: 'category',
      date: 'date',
      author: 'author',
      authorRole: 'author_role',
      readTime: 'read_time',
      excerpt: 'excerpt',
      body: 'body',
      art: 'art',
      tone: 'tone',
      featured: 'featured',
    },
    order: 'date desc nulls last',
  },
  events: {
    fields: {
      id: 'id',
      title: 'title',
      date: 'date',
      time: 'time',
      location: 'location',
      type: 'type',
      summary: 'summary',
      spots: 'spots',
    },
    order: 'date asc nulls last',
  },
  enquiries: {
    fields: {
      id: 'id',
      name: 'name',
      email: 'email',
      topic: 'topic',
      date: 'date',
      status: 'status',
    },
    order: 'date desc nulls last',
  },
  donations: {
    fields: {
      id: 'id',
      donor: 'donor',
      amount: 'amount',
      type: 'type',
      date: 'date',
      status: 'status',
    },
    order: 'date desc nulls last',
  },
}

export const RECORD_TYPES = Object.keys(TABLES)

export function hasRecordType(type) {
  return Object.prototype.hasOwnProperty.call(TABLES, type)
}

let pool

export function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL is not set. Add it to your Vercel project environment variables, or to .env.local for local development.',
      )
    }
    /* Reuse connections across warm invocations. Use the pooled Neon host. */
    pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3, idleTimeoutMillis: 10_000 })
  }
  return pool
}

const selectList = (config) =>
  Object.entries(config.fields)
    .map(([field, column]) => `"${column}" as "${field}"`)
    .join(', ')

export async function listRecords(type) {
  const config = TABLES[type]
  const { rows } = await getPool().query(`select ${selectList(config)} from ${type} order by ${config.order}`)
  return rows
}

export async function createRecord(type, payload) {
  const config = TABLES[type]
  const entries = Object.entries(config.fields).filter(([field]) => payload?.[field] !== undefined)
  if (!entries.length) {
    throw new Error('No recognised fields in payload')
  }
  const columns = entries.map(([, column]) => `"${column}"`).join(', ')
  const placeholders = entries.map((_, index) => `$${index + 1}`).join(', ')
  const values = entries.map(([field]) => payload[field])
  const { rows } = await getPool().query(
    `insert into ${type} (${columns}) values (${placeholders}) returning ${selectList(config)}`,
    values,
  )
  return rows[0]
}
