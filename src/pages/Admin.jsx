import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { Callout } from '../components/Ui'
import { site, stories as fallbackStories, news as fallbackNews, events as fallbackEvents } from '../data/site'
import * as api from '../lib/api'
import {
  ADMIN_EDIT_FIELDS,
  ADMIN_FIELDS,
  PK_FIELD,
  RECORD_FIELDS,
  ROLE_LABELS,
  SETTINGS_FIELDS,
  recordToForm,
  formToRecord,
} from '../lib/fields'

/**
 * Admin — the foundation's admin console.
 *
 * Authentication is server-side: /api/auth/login verifies a scrypt password hash
 * and sets an HttpOnly session cookie; every /api/records and /api/settings call
 * requires that session. Keep this route out of search engines (it sets noindex).
 */

const RECORD_TYPES = ['stories', 'news', 'events', 'enquiries', 'donations']

/* Bundled records used only if an API call fails mid-session. */
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

const FALLBACK = {
  stories: fallbackStories,
  news: fallbackNews,
  events: fallbackEvents,
  enquiries: SAMPLE_ENQUIRIES,
  donations: SAMPLE_DONATIONS,
}

const defaultSettings = () => ({
  name: site.name,
  shortName: site.shortName,
  url: site.url,
  email: site.email,
  emailDonations: site.emailDonations,
  emailSupport: site.emailSupport,
  phoneDisplay: site.phoneDisplay,
  phoneHref: site.phoneHref,
  whatsappDisplay: site.whatsappDisplay,
  whatsappHref: site.whatsappHref,
  instagramUrl: site.instagramUrl,
  addressLine1: site.addressLine1,
  addressLine2: site.addressLine2,
  addressCountry: site.addressCountry,
  emergencyNumber: site.emergencyNumber,
})

const NAV = [
  { id: 'overview', label: 'Overview', icon: 'chart' },
  { id: 'stories', label: 'Stories', icon: 'quote' },
  { id: 'news', label: 'News & blog', icon: 'file' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'enquiries', label: 'Enquiries', icon: 'mail' },
  { id: 'donations', label: 'Donations', icon: 'gift' },
  { id: 'admins', label: 'Admins', icon: 'users' },
  { id: 'settings', label: 'Settings', icon: 'shield' },
]

const buildKpis = (data) => [
  { icon: 'gift', value: '₦1,240,000', label: 'Donations this month', note: '+12% vs last month' },
  { icon: 'droplet', value: '7,500', label: 'Screenings this year', note: 'On track for the 2026 target' },
  { icon: 'mail', value: String(data.enquiries.filter((e) => e.status === 'New').length), label: 'New enquiries', note: 'Awaiting a reply' },
  {
    icon: 'file',
    value: '12',
    label: 'Published posts',
    note: `${data.stories.length} stories · ${data.news.length} articles`,
  },
]

const naira = (value) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value)

const formatWhen = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const BADGE_TONE = {
  New: 'badge--red',
  Replied: 'badge--success',
  Settled: 'badge--success',
  Pending: 'badge--gold',
  Failed: 'badge--alert',
  Refunded: 'badge--teal',
  Published: 'badge--success',
  Sample: 'badge--gold',
}

function StatusBadge({ status }) {
  return <span className={`badge ${BADGE_TONE[status] || ''}`}>{status}</span>
}

function Table({ columns, caption, children }) {
  /* A trailing "Actions" column is dropped for read-only roles (see .admin--readonly). */
  const hasActions = columns[columns.length - 1] === 'Actions'
  return (
    <div className={`table-wrap${hasActions ? ' table-wrap--actions' : ''}`}>
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
   Modal + form plumbing
   --------------------------------------------------------------------------- */

function Modal({ title, onClose, children }) {
  return (
    <div className="admin-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="admin-modal__backdrop" aria-label="Close" onClick={onClose} />
      <div className="admin-modal__panel">
        <div className="admin-modal__head">
          <h2 style={{ fontSize: 'var(--fs-lg)', margin: 0 }}>{title}</h2>
          <button type="button" className="admin-modal__close" aria-label="Close" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="admin-modal__body">{children}</div>
      </div>
    </div>
  )
}

function Fields({ fields, values, onChange }) {
  return (
    <div className="form-grid form-grid--2">
      {fields.map((field) => {
        const id = `rf-${field.name}`
        if (field.kind === 'checkbox') {
          return (
            <label className="checkbox record-form__check" key={field.name} htmlFor={id}>
              <input
                id={id}
                type="checkbox"
                checked={Boolean(values[field.name])}
                onChange={(event) => onChange(field.name, event.target.checked)}
              />
              <span>{field.label}</span>
            </label>
          )
        }
        return (
          <div className={`field ${field.kind === 'textarea' ? 'record-form__wide' : ''}`} key={field.name}>
            <label className="field__label" htmlFor={id}>
              {field.label}
            </label>
            {field.kind === 'textarea' ? (
              <textarea
                className="textarea"
                id={id}
                rows={4}
                value={values[field.name] ?? ''}
                onChange={(event) => onChange(field.name, event.target.value)}
              />
            ) : field.kind === 'select' ? (
              <select className="select" id={id} value={values[field.name] ?? ''} onChange={(event) => onChange(field.name, event.target.value)}>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="input"
                id={id}
                type={['number', 'date', 'email', 'password'].includes(field.kind) ? field.kind : 'text'}
                autoComplete={field.kind === 'password' ? 'new-password' : undefined}
                value={values[field.name] ?? ''}
                onChange={(event) => onChange(field.name, event.target.value)}
              />
            )}
            {field.help ? <span className="field__hint">{field.help}</span> : null}
          </div>
        )
      })}
    </div>
  )
}

function RecordForm({ title, fields, initial, submitLabel = 'Save', busy, error, onSubmit, onCancel }) {
  const [values, setValues] = useState(initial)
  const setField = (name, value) => setValues((prev) => ({ ...prev, [name]: value }))

  return (
    <Modal title={title} onClose={onCancel}>
      <form
        className="form-grid"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit(values)
        }}
      >
        <Fields fields={fields} values={values} onChange={setField} />

        {error ? (
          <p className="field__error" role="alert">
            <Icon name="alert" size={14} />
            {error}
          </p>
        ) : null}

        <div className="admin-modal__foot">
          <button type="button" className="btn btn--quiet" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={busy}>
            {busy ? 'Saving…' : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  )
}

function ConfirmDialog({ title, message, busy, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="card__text">{message}</p>
      <div className="admin-modal__foot">
        <button type="button" className="btn btn--quiet" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="button" className="btn btn--primary" onClick={onConfirm} disabled={busy}>
          {busy ? 'Working…' : 'Delete'}
        </button>
      </div>
    </Modal>
  )
}

/* ---------------------------------------------------------------------------
   Sign-in
   --------------------------------------------------------------------------- */

function AdminLogin({ onSubmit, notice }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    if (!email.trim() || !password) {
      setError('Enter your email address and password.')
      return
    }
    setBusy(true)
    setError('')
    try {
      await onSubmit(email.trim(), password)
    } catch (err) {
      setError(err.message || 'Sign in failed.')
      setBusy(false)
    }
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

          <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
            {busy ? null : <Icon name="arrowRight" size={18} />}
          </button>
        </form>

        {notice ? (
          <div style={{ marginTop: 'var(--sp-5)' }}>
            <Callout tone="warning" title="Admin API not reachable" icon="alert">
              {notice}
            </Callout>
          </div>
        ) : null}

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
  const [status, setStatus] = useState('checking') // checking | signed-out | signed-in
  const [notice, setNotice] = useState('')
  const [user, setUser] = useState(null)
  const [panel, setPanel] = useState('overview')
  const [toast, setToast] = useState('')
  const [data, setData] = useState({ stories: [], news: [], events: [], enquiries: [], donations: [] })
  const [source, setSource] = useState('loading') // loading | live | sample
  const [settings, setSettings] = useState(null)
  const [admins, setAdmins] = useState([])
  const [editor, setEditor] = useState(null) // { type, mode, record }
  const [confirm, setConfirm] = useState(null) // { type, id, label }
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')

  /* Who is signed in? */
  useEffect(() => {
    let active = true
    api
      .me()
      .then((current) => {
        if (!active) return
        setUser(current)
        setStatus('signed-in')
      })
      .catch((error) => {
        if (!active) return
        setStatus('signed-out')
        if (error.status !== 401) {
          setNotice(
            'In development, run `npx vercel dev` so the app is served together with its API — a plain `npm run dev` has no /api.',
          )
        }
      })
    return () => {
      active = false
    }
  }, [])

  /* Load records and settings once signed in. */
  useEffect(() => {
    if (status !== 'signed-in') return undefined
    let active = true
    ;(async () => {
      const results = await Promise.all(
        RECORD_TYPES.map(async (type) => {
          try {
            return [type, await api.fetchRecords(type), true]
          } catch {
            return [type, FALLBACK[type], false]
          }
        }),
      )
      if (!active) return
      const next = {}
      let live = true
      for (const [type, rows, ok] of results) {
        next[type] = rows
        if (!ok) live = false
      }
      setData(next)
      setSource(live ? 'live' : 'sample')
      try {
        const stored = await api.getSettings()
        if (active) setSettings({ ...defaultSettings(), ...stored })
      } catch {
        if (active) setSettings(defaultSettings())
      }
    })()
    return () => {
      active = false
    }
  }, [status])

  /* Load the admin list when that panel is opened. */
  useEffect(() => {
    if (status !== 'signed-in' || panel !== 'admins') return undefined
    let active = true
    api
      .listAdmins()
      .then((rows) => {
        if (active) setAdmins(rows)
      })
      .catch((error) => {
        if (active) setToast(error.message)
      })
    return () => {
      active = false
    }
  }, [status, panel])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 4200)
    return () => clearTimeout(timer)
  }, [toast])

  const signIn = async (email, password) => {
    const current = await api.login(email, password)
    setUser(current)
    setNotice('')
    setStatus('signed-in')
  }

  const signOut = async () => {
    try {
      await api.logout()
    } catch {
      /* sign out locally regardless */
    }
    setUser(null)
    setPanel('overview')
    setStatus('signed-out')
  }

  const refresh = async (type) => {
    try {
      const rows = await api.fetchRecords(type)
      setData((prev) => ({ ...prev, [type]: rows }))
      setSource('live')
    } catch (error) {
      setToast(error.message)
    }
  }

  const refreshAdmins = async () => {
    try {
      setAdmins(await api.listAdmins())
    } catch (error) {
      setToast(error.message)
    }
  }

  const openCreate = (type) => {
    setFormError('')
    setEditor({ type, mode: 'create', record: {} })
  }

  const openEdit = (type, record) => {
    setFormError('')
    setEditor({ type, mode: 'edit', record })
  }

  const submitRecord = async (values) => {
    const { type, mode, record } = editor
    const payload = formToRecord(type, values)
    setBusy(true)
    setFormError('')
    try {
      if (mode === 'create') await api.createRecord(type, payload)
      else await api.updateRecord(type, record[PK_FIELD[type]], payload)
      setEditor(null)
      await refresh(type)
      setToast(mode === 'create' ? 'Record created.' : 'Record updated.')
    } catch (error) {
      setFormError(error.message)
    } finally {
      setBusy(false)
    }
  }

  const submitAdmin = async (values) => {
    const { mode, record } = editor
    const isSelf = mode === 'edit' && String(record.id) === String(user?.id)
    setBusy(true)
    setFormError('')
    try {
      if (mode === 'create') {
        await api.createAdmin({ name: values.name, email: values.email, password: values.password, role: values.role })
        setToast('Admin account created.')
      } else {
        const patch = { name: values.name }
        if (!isSelf) patch.role = values.role
        if (values.password) patch.password = values.password
        await api.updateAdmin(record.id, patch)
        setToast('Admin account updated.')
      }
      setEditor(null)
      await refreshAdmins()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setBusy(false)
    }
  }

  const confirmDelete = async () => {
    const { type, id } = confirm
    setBusy(true)
    try {
      if (type === 'admins') {
        await api.deleteAdmin(id)
        await refreshAdmins()
        setToast('Admin account removed.')
      } else {
        await api.deleteRecord(type, id)
        await refresh(type)
        setToast('Record deleted.')
      }
      setConfirm(null)
    } catch (error) {
      setToast(error.message)
      setConfirm(null)
    } finally {
      setBusy(false)
    }
  }

  const changeStatus = async (type, id, nextStatus) => {
    try {
      await api.updateRecord(type, id, { status: nextStatus })
      await refresh(type)
      setToast(`Marked as ${nextStatus}.`)
    } catch (error) {
      setToast(error.message)
    }
  }

  const saveOrgSettings = async (values) => {
    setBusy(true)
    try {
      const saved = await api.saveSettings(values)
      setSettings({ ...defaultSettings(), ...saved })
      setToast('Settings saved.')
    } catch (error) {
      setToast(error.message)
    } finally {
      setBusy(false)
    }
  }

  const exportDonations = () => {
    const header = ['Reference', 'Donor', 'Amount', 'Type', 'Date', 'Status']
    const lines = [header, ...data.donations.map((row) => [row.id, row.donor, row.amount, row.type, row.date, row.status])]
    const csv = lines
      .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'donations.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  if (status === 'checking') {
    return (
      <>
        <Seo title="Admin" path="/admin" noIndex />
        <div className="admin-login">
          <div className="card admin-login__card">
            <p className="card__text">Checking your session…</p>
          </div>
        </div>
      </>
    )
  }

  if (status === 'signed-out') {
    return (
      <>
        <Seo title="Admin sign in" path="/admin" noIndex />
        <AdminLogin onSubmit={signIn} notice={notice} />
      </>
    )
  }

  const { stories, news, events, enquiries, donations } = data
  const role = user?.role
  const canEdit = role === 'admin' || role === 'editor'
  const canManageAdmins = role === 'admin'
  const navItems = NAV.filter((item) => item.id !== 'admins' || canManageAdmins)
  const active = NAV.find((item) => item.id === panel)
  const initials = (user?.name || user?.email || 'A')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const editorFields = !editor
    ? []
    : editor.type === 'admins'
      ? editor.mode === 'edit'
        ? ADMIN_EDIT_FIELDS.filter(
            (field) => field.name !== 'role' || String(editor.record.id) !== String(user?.id),
          )
        : ADMIN_FIELDS
      : editor.mode === 'edit'
        ? RECORD_FIELDS[editor.type].filter((field) => field.name !== PK_FIELD[editor.type])
        : RECORD_FIELDS[editor.type]

  const editorInitial = !editor
    ? {}
    : editor.type === 'admins'
      ? editor.mode === 'edit'
        ? { name: editor.record.name ?? '', role: editor.record.role ?? 'editor', password: '' }
        : { name: '', email: '', password: '', role: 'editor' }
      : recordToForm(editor.type, editor.record)

  return (
    <>
      <Seo title="Admin" path="/admin" noIndex />

      <div className={canEdit ? 'admin' : 'admin admin--readonly'}>
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
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="admin-nav__link"
                aria-current={panel === item.id ? 'true' : undefined}
                onClick={() => setPanel(item.id)}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
                {item.id === 'enquiries' ? <span className="admin-nav__count">{enquiries.length}</span> : null}
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
              <div className="admin-account">
                <span className="avatar" style={{ width: 36, height: 36, fontSize: 'var(--fs-xs)' }} aria-hidden="true">
                  {initials}
                </span>
                <div className="admin-account__meta">
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{user?.name || 'Admin'}</span>
                  <span className="small muted">{user?.email}</span>
                </div>
                <button type="button" className="btn btn--quiet btn--sm" onClick={signOut}>
                  Sign out
                </button>
              </div>
            </div>
          </header>

          <div className="admin__content">
            {!canEdit ? (
              <Callout tone="info" title="Read-only access" icon="shield">
                Your account has the “{ROLE_LABELS[role] || role}” role, so you can browse records
                but not change them.
              </Callout>
            ) : null}

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
                    ? 'Records are being read from your Neon database through /api. Changes you make here appear on the public site.'
                    : 'Some records could not be loaded from the API, so bundled samples are shown. Edits may not persist.'}
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
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => openCreate('stories')}>
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
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => openEdit('stories', story)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn--quiet btn--sm"
                            onClick={() => setConfirm({ type: 'stories', id: story.slug, label: story.title })}
                          >
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
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => openCreate('news')}>
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
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => openEdit('news', article)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn--quiet btn--sm"
                            onClick={() => setConfirm({ type: 'news', id: article.slug, label: article.title })}
                          >
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
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => openCreate('events')}>
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
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => openEdit('events', event)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn--quiet btn--sm"
                            onClick={() => setConfirm({ type: 'events', id: event.id, label: event.title })}
                          >
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
                          {row.status === 'New' ? (
                            <button
                              type="button"
                              className="btn btn--quiet btn--sm"
                              onClick={() => changeStatus('enquiries', row.id, 'Replied')}
                            >
                              Mark replied
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn--quiet btn--sm"
                              onClick={() => changeStatus('enquiries', row.id, 'New')}
                            >
                              Reopen
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn btn--quiet btn--sm"
                            onClick={() => setConfirm({ type: 'enquiries', id: row.id, label: `${row.id} — ${row.name}` })}
                          >
                            Delete
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
                      {naira(donations.filter((d) => d.status === 'Settled').reduce((sum, d) => sum + Number(d.amount || 0), 0))}
                    </p>
                    <p className="stat__label">Settled (all time)</p>
                    <p className="stat__note">{donations.length} gifts on record</p>
                  </div>
                  <div className="stat">
                    <span className="stat__icon">
                      <Icon name="refresh" size={24} />
                    </span>
                    <p className="stat__value" style={{ fontSize: 'var(--fs-xl)' }}>
                      {donations.filter((d) => d.type === 'Monthly').length}
                    </p>
                    <p className="stat__label">Monthly donors</p>
                    <p className="stat__note">Recurring giving</p>
                  </div>
                  <div className="stat">
                    <span className="stat__icon">
                      <Icon name="alert" size={24} />
                    </span>
                    <p className="stat__value" style={{ fontSize: 'var(--fs-xl)' }}>
                      {donations.filter((d) => d.status === 'Pending' || d.status === 'Failed').length}
                    </p>
                    <p className="stat__label">Payments need attention</p>
                    <p className="stat__note">Pending or failed</p>
                  </div>
                </div>

                <section className="admin-panel" aria-labelledby="donations-heading">
                  <div className="admin-panel__head">
                    <h2 id="donations-heading" style={{ fontSize: 'var(--fs-base)' }}>
                      Recent donations
                    </h2>
                    <button type="button" className="btn btn--outline btn--sm" onClick={exportDonations}>
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
                            <button type="button" className="btn btn--quiet btn--sm" onClick={() => openEdit('donations', row)}>
                              Edit
                            </button>
                            {row.status === 'Settled' ? (
                              <button
                                type="button"
                                className="btn btn--quiet btn--sm"
                                onClick={() => changeStatus('donations', row.id, 'Refunded')}
                              >
                                Refund
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Table>
                </section>
              </>
            ) : null}

            {/* ================= ADMINS ================= */}
            {panel === 'admins' ? (
              <section className="admin-panel" aria-labelledby="admins-heading">
                <div className="admin-panel__head">
                  <h2 id="admins-heading" style={{ fontSize: 'var(--fs-base)' }}>
                    Admins ({admins.length})
                  </h2>
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => openCreate('admins')}>
                    <Icon name="plus" size={16} />
                    New admin
                  </button>
                </div>

                <Table columns={['Name', 'Email', 'Role', 'Last sign-in', 'Actions']}>
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>
                        {admin.name || '—'}
                        {String(admin.id) === String(user?.id) ? ' (you)' : ''}
                      </td>
                      <td>{admin.email}</td>
                      <td>
                        <span className="badge badge--teal">{ROLE_LABELS[admin.role] || admin.role}</span>
                      </td>
                      <td>{admin.lastLoginAt ? formatWhen(admin.lastLoginAt) : 'Never'}</td>
                      <td>
                        <div className="admin-actions">
                          <button type="button" className="btn btn--quiet btn--sm" onClick={() => openEdit('admins', admin)}>
                            Reset password
                          </button>
                          {String(admin.id) === String(user?.id) ? null : (
                            <button
                              type="button"
                              className="btn btn--quiet btn--sm"
                              onClick={() => setConfirm({ type: 'admins', id: admin.id, label: admin.email })}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>

                <Callout tone="info" title="Who can do what" icon="shield">
                  <strong>Admin</strong> can do everything, including managing accounts.{' '}
                  <strong>Editor</strong> can manage content and settings but not accounts.{' '}
                  <strong>Viewer</strong> is read-only. You cannot change your own role or remove your
                  own account.
                </Callout>
              </section>
            ) : null}

            {/* ================= SETTINGS ================= */}
            {panel === 'settings' ? (
              <section className="admin-panel admin-panel--form" aria-labelledby="settings-heading">
                <div className="admin-panel__head">
                  <h2 id="settings-heading" style={{ fontSize: 'var(--fs-base)' }}>
                    Website settings
                  </h2>
                </div>

                {settings ? (
                  <form
                    className="form-grid"
                    onSubmit={(event) => {
                      event.preventDefault()
                      saveOrgSettings(settings)
                    }}
                  >
                    <fieldset className="form-grid__reset" disabled={!canEdit}>
                      <Fields
                        fields={SETTINGS_FIELDS}
                        values={settings}
                        onChange={(name, value) => setSettings((prev) => ({ ...prev, [name]: value }))}
                      />
                    </fieldset>

                    {canEdit ? (
                      <div className="form-grid__full">
                        <button type="submit" className="btn btn--primary" disabled={busy}>
                          {busy ? 'Saving…' : 'Save changes'}
                          {busy ? null : <Icon name="check" size={18} />}
                        </button>
                      </div>
                    ) : null}
                  </form>
                ) : (
                  <p className="card__text">Loading settings…</p>
                )}

                <div style={{ marginTop: 'var(--sp-6)' }}>
                  <Callout tone="info" title="Shown on the public site" icon="globe">
                    These details are saved to your database and used by the public site (header, footer
                    and contact pages).
                  </Callout>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      {editor ? (
        <RecordForm
          title={
            editor.type === 'admins'
              ? editor.mode === 'create'
                ? 'New admin'
                : 'Edit admin'
              : editor.mode === 'create'
                ? `New ${editor.type.replace(/s$/, '')}`
                : `Edit ${editor.type.replace(/s$/, '')}`
          }
          fields={editorFields}
          initial={editorInitial}
          submitLabel={editor.mode === 'create' ? 'Create' : 'Save changes'}
          busy={busy}
          error={formError}
          onSubmit={editor.type === 'admins' ? submitAdmin : submitRecord}
          onCancel={() => setEditor(null)}
        />
      ) : null}

      {confirm ? (
        <ConfirmDialog
          title={confirm.type === 'admins' ? 'Remove admin' : 'Delete record'}
          message={
            confirm.type === 'admins'
              ? `Remove the admin account “${confirm.label}”? They will be signed out and lose access.`
              : `Delete “${confirm.label}”? This cannot be undone.`
          }
          busy={busy}
          onConfirm={confirmDelete}
          onCancel={() => setConfirm(null)}
        />
      ) : null}

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
