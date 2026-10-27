import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { Callout } from '../components/Ui'
import { site, stories as fallbackStories, news as fallbackNews, events as fallbackEvents } from '../data/site'
import { fetchRecords } from '../lib/api'

const RECORD_TYPES = ['stories', 'news', 'events', 'enquiries', 'donations']

/**
 * Admin — the foundation's admin console.
 *
 * ============================================================================
 * FRONT-END ONLY. NOT SECURE YET. DO NOT EXPOSE AS-IS.
 * ---------------------------------------------------------------------------
 * This is a working interface shell filled with sample records. There is no
 * server behind it: the sign-in accepts anything and only remembers a flag in
 * localStorage. Before this route is reachable from the open internet you MUST
 *   - authenticate on a server (sessions, hashed passwords, 2FA),
 *   - authorise every read and every write,
 *   - move the sample records into a real database,
 *   - and keep this route out of search engines (it already sets noindex).
 * ============================================================================
 */

const SESSION_KEY = 'tf-admin-session'

const NAV = [
  { id: 'overview', label: 'Overview', icon: 'chart' },
  { id: 'stories', label: 'Stories', icon: 'quote' },
  { id: 'news', label: 'News & blog', icon: 'file' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'enquiries', label: 'Enquiries', icon: 'mail' },
  { id: 'donations', label: 'Donations', icon: 'gift' },
  { id: 'settings', label: 'Settings', icon: 'shield' },
]

const buildKpis = (data) => [
  { icon: 'gift', value: '₦1,240,000', label: 'Donations this month', note: '+12% vs last month' },
  { icon: 'droplet', value: '7,500', label: 'Screenings this year', note: 'On track for the 2026 target' },
  { icon: 'mail', value: '18', label: 'New enquiries', note: '6 still awaiting a reply' },
  {
    icon: 'file',
    value: '12',
    label: 'Published posts',
    note: `${data.stories.length} stories · ${data.news.length} articles`,
  },
]

/* SAMPLE records — replace with real data from your backend. */
const SAMPLE_ENQUIRIES = [
  { id: 'ENQ-1042', name: 'Amina Bello', email: 'amina.b@example.com', topic: 'Genotype counselling', date: '2026-10-24', status: 'New' },
  { id: 'ENQ-1041', name: 'Chidi Okoro', email: 'chidi@example.com', topic: 'Treatment assistance', date: '2026-10-23', status: 'New' },
  { id: 'ENQ-1039', name: 'Fatima Yusuf', email: 'fatima.y@example.com', topic: 'Corporate partnership', date: '2026-10-21', status: 'Replied' },
  { id: 'ENQ-1036', name: 'Grace Adeyemi', email: 'grace@example.com', topic: 'Volunteering', date: '2026-10-19', status: 'Replied' },
  { id: 'ENQ-1033', name: 'Musa Ibrahim', email: 'musa.i@example.com', topic: 'Media & press', date: '2026-10-17', status: 'New' },
]

const SAMPLE_DONATIONS = [
  { id: 'DON-3091', donor: 'Anonymous', amount: 15000, type: 'Monthly', date: '2026-10-22', status: 'Settled' },
  { id: 'DON-3090', donor: 'A. Okafor', amount: 150000, type: 'One-off', date: '2026-10-21', status: 'Settled' },
  { id: 'DON-3088', donor: 'Kaduna Staff Co-op', amount: 500000, type: 'One-off', date: '2026-10-18', status: 'Pending' },
  { id: 'DON-3085', donor: 'Anonymous', amount: 5000, type: 'Monthly', date: '2026-10-15', status: 'Settled' },
  { id: 'DON-3081', donor: 'B. Danladi', amount: 40000, type: 'One-off', date: '2026-10-12', status: 'Failed' },
]

const naira = (value) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value)

const BADGE_TONE = {
  New: 'badge--red',
  Replied: 'badge--success',
  Settled: 'badge--success',
  Pending: 'badge--gold',
  Failed: 'badge--alert',
  Published: 'badge--success',
  Sample: 'badge--gold',
}

function StatusBadge({ status }) {
  return <span className={`badge ${BADGE_TONE[status] || ''}`}>{status}</span>
}

function Table({ columns, caption, children }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Sign-in — a DEMO gate only. See the file header.
   --------------------------------------------------------------------------- */

function AdminLogin({ onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Enter an email address and a password.')
      return
    }
    onSignIn()
  }

  return (
    <div className="admin-login">
      <div className="card admin-login__card">
        <div className="cluster" style={{ gap: 'var(--sp-3)', alignItems: 'center' }}>
          <span className="icon-badge" style={{ marginBottom: 0 }}>
            <Icon name="lock" size={24} />
          </span>
          <div>
            <p className="eyebrow" style={{ marginBottom: 0 }}>
              Admin
            </p>
            <h1 style={{ fontSize: 'var(--fs-xl)' }}>{site.shortName} console</h1>
          </div>
        </div>

        <p className="card__text" style={{ marginTop: 'var(--sp-4)' }}>
          Sign in to manage stories, news, events, enquiries and donations.
        </p>

        <form onSubmit={submit} noValidate className="form-grid" style={{ marginTop: 'var(--sp-5)' }}>
          <div className="field">
            <label className="field__label" htmlFor="admin-email">
              Email address
            </label>
            <input
              className="input"
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="admin-password">
              Password
            </label>
            <input
              className="input"
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-describedby={error ? 'admin-login-error' : undefined}
            />
          </div>

          {error ? (
            <p className="field__error" id="admin-login-error" role="alert">
              <Icon name="alert" size={14} />
              {error}
            </p>
          ) : null}

          <button type="submit" className="btn btn--primary btn--block">
            Sign in
            <Icon name="arrowRight" size={18} />
          </button>
        </form>

        <div style={{ marginTop: 'var(--sp-5)' }}>
          <Callout tone="alert" title="Demo sign-in — not real security" icon="shield">
            This form accepts any email and password and stores nothing but a browser flag. It is a
            placeholder for a real, server-side sign-in. Do not put this page on the open internet
            until authentication and authorisation are handled by a backend.
          </Callout>
        </div>

        <p className="small muted" style={{ marginTop: 'var(--sp-5)' }}>
          <Link to="/">← Back to the website</Link>
        </p>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Admin shell
   --------------------------------------------------------------------------- */

export default function Admin() {
  const [authed, setAuthed] = useState(() => {
    try {
      return window.localStorage.getItem(SESSION_KEY) === '1'
    } catch {
      return false
    }
  })
  const [panel, setPanel] = useState('overview')
  const [toast, setToast] = useState('')
  const [settings, setSettings] = useState({
    name: site.name,
    email: site.email,
    phone: site.phoneDisplay,
    addressLine1: site.addressLine1,
    addressLine2: site.addressLine2,
    instagram: site.instagramUrl,
  })

  /* Records come from Neon via /api/records/<type>; fall back to bundled samples. */
  const [data, setData] = useState({
    stories: fallbackStories,
    news: fallbackNews,
    events: fallbackEvents,
    enquiries: SAMPLE_ENQUIRIES,
    donations: SAMPLE_DONATIONS,
  })
  const [source, setSource] = useState('sample')

  useEffect(() => {
    let cancelled = false
    Promise.all(RECORD_TYPES.map((type) => fetchRecords(type).then((rows) => [type, rows])))
      .then((pairs) => {
        if (cancelled) return
        const next = {}
        for (const [type, rows] of pairs) {
          if (Array.isArray(rows)) next[type] = rows
        }
        setData((prev) => ({ ...prev, ...next }))
        setSource('live')
      })
      .catch(() => {
        if (!cancelled) setSource('sample')
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 4200)
    return () => clearTimeout(timer)
  }, [toast])

  const signIn = () => {
    try {
      window.localStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* Storage blocked — the flag simply will not persist. */
    }
    setAuthed(true)
  }

  const signOut = () => {
    try {
      window.localStorage.removeItem(SESSION_KEY)
    } catch {
      /* ignore */
    }
    setAuthed(false)
  }

  /* Every write is a stub until a backend exists. */
  const todo = (action) => setToast(`${action} is not connected yet — wire it to your backend.`)

  const { stories, news, events, enquiries, donations } = data

  if (!authed) {
    return (
      <>
        <Seo title="Admin sign in" path="/admin" noIndex />
        <AdminLogin onSignIn={signIn} />
      </>
    )
  }

  const active = NAV.find((item) => item.id === panel)

  return (
    <>
      <Seo title="Admin" path="/admin" noIndex />

      <div className="admin">
        {/* ---------- Sidebar ---------- */}
        <aside className="admin__sidebar">
          <Link to="/admin" className="brand" aria-label={`${site.shortName} admin`}>
            <span className="brand__mark">
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--white)', fontSize: '0.72rem' }}>
                TF
              </span>
            </span>
            <span className="brand__text">
              <span className="brand__name" style={{ color: 'var(--white)' }}>
                {site.shortName}
              </span>
              <span className="brand__tag" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Admin console
              </span>
            </span>
          </Link>

          <nav className="admin-nav" aria-label="Admin sections">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className="admin-nav__link"
                aria-current={panel === item.id ? 'true' : undefined}
                onClick={() => setPanel(item.id)}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
                {item.id === 'enquiries' ? (
                  <span className="admin-nav__count">{enquiries.length}</span>
                ) : null}
              </button>
            ))}
          </nav>

          <div className="admin__sidebar-foot">
            <Link className="btn btn--ghost btn--sm btn--block" to="/">
              <Icon name="globe" size={16} />
              View site
            </Link>
          </div>
        </aside>

        {/* ---------- Main ---------- */}
        <div className="admin__main">
          <header className="admin__topbar">
            <div>
              <p className="small muted" style={{ marginBottom: 2 }}>
                Admin / {active?.label}
              </p>
              <h1 style={{ fontSize: 'var(--fs-lg)' }}>{active?.label}</h1>
            </div>

            <div className="admin__topbar-actions">
              <label className="search-field admin__search">
                <span className="search-field__icon">
                  <Icon name="search" size={16} />
                </span>
                <span className="visually-hidden">Search records</span>
                <input className="input" type="search" placeholder="Search records…" />
              </label>

              <div className="admin-account">
                <span className="avatar" style={{ width: 36, height: 36, fontSize: 'var(--fs-xs)' }} aria-hidden="true">
                  AD
                </span>
                <div className="admin-account__meta">
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Admin user</span>
                  <span className="small muted">admin@tirngan.org</span>
                </div>
                <button type="button" className="btn btn--quiet btn--sm" onClick={signOut}>
                  Sign out
                </button>
              </div>
            </div>
          </header>

          <div className="admin__content">
            {/* ================= OVERVIEW ================= */}
            {panel === 'overview' ? (
              <>
                <div className="admin-card-grid">
                  {buildKpis(data).map((kpi) => (
                    <div className="stat" key={kpi.label}>
                      <span className="stat__icon">
                        <Icon name={kpi.icon} size={24} />
                      </span>
                      <p className="stat__value" style={{ fontSize: 'var(--fs-xl)' }}>
                        {kpi.value}
                      </p>
                      <p className="stat__label">{kpi.label}</p>
                      <p className="stat__note">{kpi.note}</p>
                    </div>
                  ))}
                </div>

                <div className="admin-split">
                  <section className="admin-panel" aria-labelledby="recent-enquiries">
                    <div className="admin-panel__head">
                      <h2 id="recent-enquiries" style={{ fontSize: 'var(--fs-base)' }}>
                        Latest enquiries
                      </h2>
                      <button type="button" className="link-arrow" onClick={() => setPanel('enquiries')}>
                        View all
                        <Icon name="arrowRight" size={16} />
                      </button>
                    </div>

                    <Table columns={['Reference', 'Name', 'Topic', 'Status']}>
                      {enquiries.slice(0, 4).map((row) => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.name}</td>
                          <td>{row.topic}</td>
                          <td>
                            <StatusBadge status={row.status} />
                          </td>
                        </tr>
                      ))}
                    </Table>
                  </section>

                  <section className="admin-panel" aria-labelledby="recent-donations">
                    <div className="admin-panel__head">
                      <h2 id="recent-donations" style={{ fontSize: 'var(--fs-base)' }}>
                        Latest donations
                      </h2>
                      <button type="button" className="link-arrow" onClick={() => setPanel('donations')}>
                        View all
                        <Icon name="arrowRight" size={16} />
                      </button>
                    </div>

                    <Table columns={['Reference', 'Donor', 'Amount', 'Status']}>
                      {donations.slice(0, 4).map((row) => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.donor}</td>
                          <td>{naira(row.amount)}</td>
                          <td>
                            <StatusBadge status={row.status} />
                          </td>
                        </tr>
                      ))}
                    </Table>
                  </section>
                </div>

                <Callout
                  tone={source === 'live' ? 'info' : 'warning'}
                  title={source === 'live' ? 'Live data' : 'Sample data'}
                  icon={source === 'live' ? 'check' : 'alert'}
                >
                  {source === 'live'
                    ? 'Records are being read from your Neon database through /api/records.'
                    : 'Showing bundled sample records. Set DATABASE_URL and serve the app with its API (vercel dev) to read live data from Neon.'}
                </Callout>
              </>
            ) : null}

            {/* ================= STORIES ================= */}
            {panel === 'stories' ? (
              <section className="admin-panel" aria-labelledby="stories-heading">
                <div className="admin-panel__head">
                  <h2 id="stories-heading" style={{ fontSize: 'var(--fs-base)' }}>
                    Stories ({stories.length})
                  </h2>
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => todo('Adding a story')}>
                    <Icon name="plus" size={16} />
                    New story
                  </button>
                </div>

                <Table columns={['Title', 'Category', 'Author', 'Status', 'Actions']}>
                  {stories.map((story) => (
                    <tr key={story.slug}>
                      <td style={{ minWidth: 220 }}>{story.title}</td>
                      <td>{story.category}</td>
                      <td>{story.name}</td>
                      <td>
                        <StatusBadge status={story.placeholder ? 'Sample' : 'Published'} />
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => todo('Editing')}>
                            Edit
                          </button>
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => todo('Deleting')}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </section>
            ) : null}

            {/* ================= NEWS ================= */}
            {panel === 'news' ? (
              <section className="admin-panel" aria-labelledby="news-heading">
                <div className="admin-panel__head">
                  <h2 id="news-heading" style={{ fontSize: 'var(--fs-base)' }}>
                    News &amp; blog ({news.length})
                  </h2>
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => todo('Adding an article')}>
                    <Icon name="plus" size={16} />
                    New article
                  </button>
                </div>

                <Table columns={['Title', 'Category', 'Author', 'Date', 'Status', 'Actions']}>
                  {news.map((article) => (
                    <tr key={article.slug}>
                      <td style={{ minWidth: 240 }}>{article.title}</td>
                      <td>{article.category}</td>
                      <td>{article.author}</td>
                      <td>{article.date}</td>
                      <td>
                        <StatusBadge status={article.placeholder ? 'Sample' : 'Published'} />
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => todo('Editing')}>
                            Edit
                          </button>
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => todo('Deleting')}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </section>
            ) : null}

            {/* ================= EVENTS ================= */}
            {panel === 'events' ? (
              <section className="admin-panel" aria-labelledby="events-heading">
                <div className="admin-panel__head">
                  <h2 id="events-heading" style={{ fontSize: 'var(--fs-base)' }}>
                    Events ({events.length})
                  </h2>
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => todo('Adding an event')}>
                    <Icon name="plus" size={16} />
                    New event
                  </button>
                </div>

                <Table columns={['Title', 'Type', 'Date', 'Location', 'Places', 'Actions']}>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td style={{ minWidth: 200 }}>{event.title}</td>
                      <td>
                        <span className="badge badge--teal">{event.type}</span>
                      </td>
                      <td>{event.date}</td>
                      <td>{event.location}</td>
                      <td>{event.spots}</td>
                      <td>
                        <div className="admin-actions">
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => todo('Editing')}>
                            Edit
                          </button>
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => todo('Deleting')}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </section>
            ) : null}

            {/* ================= ENQUIRIES ================= */}
            {panel === 'enquiries' ? (
              <section className="admin-panel" aria-labelledby="enquiries-heading">
                <div className="admin-panel__head">
                  <h2 id="enquiries-heading" style={{ fontSize: 'var(--fs-base)' }}>
                    Enquiries ({enquiries.length})
                  </h2>
                  <StatusBadge status="New" />
                </div>

                <Table columns={['Reference', 'Name', 'Email', 'Topic', 'Date', 'Status', 'Actions']}>
                  {enquiries.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.topic}</td>
                      <td>{row.date}</td>
                      <td>
                        <StatusBadge status={row.status} />
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => todo('Replying')}>
                            Reply
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </section>
            ) : null}

            {/* ================= DONATIONS ================= */}
            {panel === 'donations' ? (
              <>
                <div className="admin-card-grid">
                  <div className="stat">
                    <span className="stat__icon">
                      <Icon name="gift" size={24} />
                    </span>
                    <p className="stat__value" style={{ fontSize: 'var(--fs-xl)' }}>
                      ₦1,240,000
                    </p>
                    <p className="stat__label">This month</p>
                    <p className="stat__note">Across 34 gifts</p>
                  </div>
                  <div className="stat">
                    <span className="stat__icon">
                      <Icon name="refresh" size={24} />
                    </span>
                    <p className="stat__value" style={{ fontSize: 'var(--fs-xl)' }}>
                      11
                    </p>
                    <p className="stat__label">New monthly donors</p>
                    <p className="stat__note">Recurring giving is up</p>
                  </div>
                  <div className="stat">
                    <span className="stat__icon">
                      <Icon name="alert" size={24} />
                    </span>
                    <p className="stat__value" style={{ fontSize: 'var(--fs-xl)' }}>
                      2
                    </p>
                    <p className="stat__label">Payments need attention</p>
                    <p className="stat__note">1 pending · 1 failed</p>
                  </div>
                </div>

                <section className="admin-panel" aria-labelledby="donations-heading">
                  <div className="admin-panel__head">
                    <h2 id="donations-heading" style={{ fontSize: 'var(--fs-base)' }}>
                      Recent donations
                    </h2>
                    <button type="button" className="btn btn--primary btn--sm" onClick={() => todo('Exporting')}>
                      <Icon name="download" size={16} />
                      Export CSV
                    </button>
                  </div>

                  <Table columns={['Reference', 'Donor', 'Amount', 'Type', 'Date', 'Status', 'Actions']}>
                    {donations.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.donor}</td>
                        <td>{naira(row.amount)}</td>
                        <td>{row.type}</td>
                        <td>{row.date}</td>
                        <td>
                          <StatusBadge status={row.status} />
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button type="button" className="btn btn--quiet btn--sm" onClick={() => todo('Refunding')}>
                              Refund
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Table>
                </section>
              </>
            ) : null}

            {/* ================= SETTINGS ================= */}
            {panel === 'settings' ? (
              <section className="admin-panel admin-panel--form" aria-labelledby="settings-heading">
                <div className="admin-panel__head">
                  <h2 id="settings-heading" style={{ fontSize: 'var(--fs-base)' }}>
                    Website settings
                  </h2>
                </div>

                <form
                  className="form-grid"
                  onSubmit={(event) => {
                    event.preventDefault()
                    todo('Saving settings')
                  }}
                >
                  <div className="form-grid form-grid--2">
                    <div className="field">
                      <label className="field__label" htmlFor="set-name">
                        Organisation name
                      </label>
                      <input
                        className="input"
                        id="set-name"
                        value={settings.name}
                        onChange={(event) => setSettings((prev) => ({ ...prev, name: event.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label className="field__label" htmlFor="set-email">
                        Public email
                      </label>
                      <input
                        className="input"
                        id="set-email"
                        type="email"
                        value={settings.email}
                        onChange={(event) => setSettings((prev) => ({ ...prev, email: event.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label className="field__label" htmlFor="set-phone">
                        Phone
                      </label>
                      <input
                        className="input"
                        id="set-phone"
                        value={settings.phone}
                        onChange={(event) => setSettings((prev) => ({ ...prev, phone: event.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label className="field__label" htmlFor="set-instagram">
                        Instagram URL
                      </label>
                      <input
                        className="input"
                        id="set-instagram"
                        value={settings.instagram}
                        onChange={(event) => setSettings((prev) => ({ ...prev, instagram: event.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label className="field__label" htmlFor="set-address1">
                        Address line 1
                      </label>
                      <input
                        className="input"
                        id="set-address1"
                        value={settings.addressLine1}
                        onChange={(event) => setSettings((prev) => ({ ...prev, addressLine1: event.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label className="field__label" htmlFor="set-address2">
                        Address line 2
                      </label>
                      <input
                        className="input"
                        id="set-address2"
                        value={settings.addressLine2}
                        onChange={(event) => setSettings((prev) => ({ ...prev, addressLine2: event.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="form-grid__full">
                    <button type="submit" className="btn btn--primary">
                      Save changes
                      <Icon name="check" size={18} />
                    </button>
                  </div>
                </form>

                <div style={{ marginTop: 'var(--sp-6)' }}>
                  <Callout tone="warning" title="Not wired to anything yet" icon="alert">
                    These fields are not saved anywhere. Connect them to your backend (or your CMS)
                    so they update the public site. Until then, edit <code>src/data/site.js</code>.
                  </Callout>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      {toast ? (
        <div className="admin-toast" role="status" aria-live="polite">
          <Icon name="info" size={18} />
          <span>{toast}</span>
          <button type="button" className="admin-toast__close" aria-label="Dismiss" onClick={() => setToast('')}>
            <Icon name="close" size={16} />
          </button>
        </div>
      ) : null}
    </>
  )
}
