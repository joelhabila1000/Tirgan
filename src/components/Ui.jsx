import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import StoryArt from './Rbc'

/**
 * Shared UI kit.
 *
 * Anything used on more than one page lives here: breadcrumbs, page heroes,
 * form plumbing, the accordion, the carousel, and the various card types.
 */

/* ==========================================================================
   BREADCRUMBS
   ========================================================================== */

export function Breadcrumbs({ items = [], className = '' }) {
  if (!items.length) return null
  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li className="breadcrumbs__item" key={`${item.label}-${i}`}>
              {isLast || !item.to ? (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ==========================================================================
   SECTION HEADING
   ========================================================================== */

export function SectionHead({ eyebrow, title, lede, center = false, id, as: Tag = 'h2', children }) {
  return (
    <div className={`section__head ${center ? 'section__head--center' : ''}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag id={id} style={{ fontSize: Tag === 'h2' ? 'var(--fs-2xl)' : undefined }}>
        {title}
      </Tag>
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </div>
  )
}

/* ==========================================================================
   PAGE HERO (inner pages)
   ========================================================================== */

export function PageHero({
  eyebrow,
  title,
  lede,
  art = 'cells',
  dark = false,
  crumbs,
  actions,
  children,
}) {
  return (
    <header className={`page-hero ${dark ? 'page-hero--dark on-dark' : ''}`}>
      {dark ? <span className="cell-bg cell-bg--strong" aria-hidden="true" /> : null}
      <div className="container">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
      </div>
      <div className={`container page-hero__inner ${art ? 'page-hero__inner--split' : ''}`}>
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="page-hero__title">{title}</h1>
          {lede ? <p className="page-hero__lede">{lede}</p> : null}
          {actions ? <div className="cluster" style={{ marginTop: 'var(--sp-5)' }}>{actions}</div> : null}
          {children}
        </div>
        {art ? (
          <div className="page-hero__art" aria-hidden="true">
            <StoryArt name={art} />
          </div>
        ) : null}
      </div>
    </header>
  )
}

/* ==========================================================================
   CALLOUT
   ========================================================================== */

export function Callout({ tone = 'info', title, icon = 'info', children }) {
  return (
    <div className={`callout callout--${tone}`}>
      <span className="callout__icon">
        <Icon name={icon} size={22} />
      </span>
      <div>
        {title ? <p className="callout__title">{title}</p> : null}
        {children}
      </div>
    </div>
  )
}

/* ==========================================================================
   PLACEHOLDER MARKERS — make it obvious what the client must replace
   ========================================================================== */

/** Small chip for content the client must supply (names, quotes, figures). */
export function PlaceholderTag({ children = 'Sample', title }) {
  return (
    <span
      className="badge badge--gold"
      title={title || 'Placeholder content — replace before launch'}
      style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
    >
      <Icon name="alert" size={13} />
      {children}
    </span>
  )
}

/** Overlay chip for a graphic slot that should become a real photograph. */
export function ImgSlot({ label = 'Image slot — swap in a photo' }) {
  return <span className="img-slot">{label}</span>
}

/* ==========================================================================
   FORM PLUMBING
   ========================================================================== */

export function Field({ id, label, required, hint, error, children }) {
  return (
    <div className={`field ${error ? 'field--invalid' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <span className="field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="field__error" id={`${id}-error`} role="alert">
          <Icon name="alert" size={14} />
          {error}
        </span>
      ) : null}
    </div>
  )
}

export function TextField({
  id,
  label,
  type = 'text',
  required = false,
  hint,
  error,
  value,
  onChange,
  placeholder,
  autoComplete,
  textarea = false,
  rows = 5,
  ...rest
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const shared = {
    id,
    name: id,
    value,
    placeholder,
    required,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    onChange: (e) => onChange(e.target.value),
    ...rest,
  }

  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      {textarea ? (
        <textarea className="textarea" rows={rows} {...shared} />
      ) : (
        <input className="input" type={type} autoComplete={autoComplete} {...shared} />
      )}
    </Field>
  )
}

export function SelectField({ id, label, options = [], required = false, hint, error, value, onChange, placeholder }) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <select
        className="select"
        id={id}
        name={id}
        value={value}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value
          const lab = typeof opt === 'string' ? opt : opt.label
          return (
            <option key={val} value={val}>
              {lab}
            </option>
          )
        })}
      </select>
    </Field>
  )
}

export function CheckboxField({ id, label, checked, onChange, error, required = false }) {
  return (
    <div className={`checkbox ${error ? 'checkbox--invalid' : ''}`}>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div>
        <label htmlFor={id}>{label}</label>
        {error ? (
          <span className="field__error" id={`${id}-error`} role="alert" style={{ marginTop: 4 }}>
            <Icon name="alert" size={14} />
            {error}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export function FormStatus({ state, title, children }) {
  if (state !== 'success' && state !== 'error') return null
  return (
    <div className="form-status" data-state={state} role={state === 'error' ? 'alert' : 'status'}>
      <span className="form-status__icon">
        <Icon name={state === 'success' ? 'check' : 'alert'} size={22} />
      </span>
      <div>
        <strong>{title}</strong>
        {children}
      </div>
    </div>
  )
}

/**
 * FormShell — one place for validation, error focus and the success state.
 *
 * FRONT-END ONLY. When you are ready to connect a backend, replace the marked
 * block inside `handleSubmit` with a fetch() to your endpoint (Formspree,
 * Netlify Forms, your own API, a CRM, or an email service). Nothing else needs
 * to change.
 *
 * Usage:
 *   <FormShell
 *     initial={{ email: '' }}
 *     rules={{ email: (v) => (!v ? 'Please enter your email' : null) }}
 *     successTitle="Thank you"
 *     successBody="We'll be in touch."
 *     submitLabel="Send"
 *   >
 *     {({ values, errors, setField, status }) => (
 *       <>
 *         <TextField id="email" label="Email" value={values.email}
 *                    onChange={(v) => setField('email', v)} error={errors.email} required />
 *         <button className="btn btn--primary" type="submit">Send</button>
 *       </>
 *     )}
 *   </FormShell>
 */
export function FormShell({
  initial = {},
  rules = {},
  successTitle = 'Thank you',
  successBody,
  submitLabel = 'Submit',
  submitClassName = 'btn btn--primary',
  children,
  encType,
  className = 'form-grid',
}) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)
  const statusRef = useRef(null)

  /* Move focus to the confirmation so keyboard and screen-reader users notice it. */
  useEffect(() => {
    if (status === 'success' && statusRef.current) {
      statusRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [status])

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    /* Clear an existing error as soon as the field becomes valid. */
    if (errors[name] && rules[name]) {
      const message = rules[name](value, { ...values, [name]: value })
      if (!message) setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = () => {
    const next = {}
    Object.keys(rules).forEach((key) => {
      const message = rules[key](values[key], values)
      if (message) next[key] = message
    })
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      const firstKey = Object.keys(nextErrors)[0]
      const el = formRef.current?.querySelector(`[name="${firstKey}"]`)
      if (el && typeof el.focus === 'function') el.focus()
      return
    }

    setErrors({})

    /* ------------------------------------------------------------------
       TODO: CONNECT YOUR BACKEND HERE
       Example:
         await fetch('https://your-endpoint', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(values),
         })
       Wrap it in try/catch and setStatus('error') on failure.
       ------------------------------------------------------------------ */
    setStatus('success')
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setStatus('idle')
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate encType={encType} className={className}>
      <FormStatus state={status} title={status === 'error' ? 'Please check the highlighted fields' : ''} />

      {status === 'success' ? (
        <div ref={statusRef}>
          <FormStatus state="success" title={successTitle}>
            {successBody ? <span className="small">{successBody}</span> : null}
            <button type="button" className="btn btn--quiet btn--sm" style={{ marginTop: 'var(--sp-3)' }} onClick={reset}>
              Send another response
            </button>
          </FormStatus>
        </div>
      ) : (
        <>
          {children({ values, errors, setField, status })}
          <div className="form-grid__full">
            <button type="submit" className={submitClassName}>
              {submitLabel}
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </>
      )}
    </form>
  )
}

/* Validation helpers shared by the forms. */
export const validators = {
  required: (label) => (value) => (value && String(value).trim() ? null : `${label} is required.`),
  email: (value) =>
    !value
      ? 'Email address is required.'
      : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim())
        ? null
        : 'Please enter a valid email address.',
  phone: (value) =>
    !value || String(value).replace(/[^\d]/g, '').length >= 7
      ? null
      : 'Please enter a valid phone number.',
  checked: (message) => (value) => (value ? null : message),
  minLength: (n, label) => (value) =>
    !value || String(value).trim().length >= n ? null : `${label} needs at least ${n} characters.`,
}

/* ==========================================================================
   NEWSLETTER
   ========================================================================== */

export function NewsletterForm({ variant = 'default', idPrefix = 'newsletter' }) {
  return (
    <div className={`newsletter ${variant === 'footer' ? 'newsletter--footer' : ''}`}>
      <h2 style={{ fontSize: 'var(--fs-lg)' }}>Stay in the loop</h2>
      <p className="small" style={{ marginTop: 'var(--sp-2)', color: 'inherit', opacity: 0.88 }}>
        Monthly updates on screening drives, events and new resources. No spam, and you can
        unsubscribe at any time.
      </p>

      <FormShell
        initial={{ email: '' }}
        rules={{ email: validators.email }}
        successTitle="You’re on the list"
        successBody="We’ve sent a confirmation to your inbox. If it doesn’t arrive, check your spam folder."
        submitLabel="Subscribe"
        submitClassName="btn btn--gold"
        className="newsletter__form"
      >
        {({ values, errors, setField }) => (
          <div style={{ flex: '1 1 240px', minWidth: 0 }}>
            <label className="visually-hidden" htmlFor={`${idPrefix}-email`}>
              Email address
            </label>
            <input
              className="input"
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            />
            {errors.email ? (
              <span className="field__error" id={`${idPrefix}-email-error`} role="alert" style={{ marginTop: 6 }}>
                <Icon name="alert" size={14} />
                {errors.email}
              </span>
            ) : null}
          </div>
        )}
      </FormShell>

      <p className="newsletter__consent">
        By subscribing you agree to our <Link to="/privacy" style={{ textDecoration: 'underline' }}>privacy policy</Link>.
      </p>
    </div>
  )
}

/* ==========================================================================
   ACCORDION
   ========================================================================== */

export function Accordion({ items = [], idPrefix = 'acc' }) {
  const [open, setOpen] = useState(() => new Set())
  const baseId = useId()

  const toggle = (index) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open.has(i)
        const panelId = `${baseId}-${idPrefix}-panel-${i}`
        const buttonId = `${baseId}-${idPrefix}-button-${i}`
        return (
          <div className="accordion__item" key={item.q || i}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={buttonId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <span className="accordion__icon" aria-hidden="true">
                  <Icon name="plus" size={18} />
                </span>
              </button>
            </h3>
            <div className="accordion__panel" id={panelId} role="region" aria-labelledby={buttonId} data-open={isOpen}>
              <div className="accordion__panel-inner">
                <div className="accordion__content">
                  {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ==========================================================================
   FILTER TABS
   ========================================================================== */

export function FilterTabs({ options = [], value, onChange, label = 'Filter' }) {
  return (
    <div className="filter-bar" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="tab"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

/* ==========================================================================
   SLIDER / CAROUSEL
   ========================================================================== */

export function Slider({ items = [], renderItem, label = 'Carousel', autoPlay = false, interval = 7000 }) {
  const [index, setIndex] = useState(0)
  const count = items.length
  const reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const go = (next) => setIndex(((next % count) + count) % count)

  useEffect(() => {
    if (!autoPlay || reduceMotion || count <= 1) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearInterval(timer)
  }, [autoPlay, reduceMotion, count, interval])

  if (!count) return null

  return (
    <div
      className="slider"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          go(index + 1)
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          go(index - 1)
        }
      }}
      tabIndex={0}
    >
      <div className="slider__viewport">
        <div className="slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((item, i) => (
            <div
              className="slider__slide"
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      <div className="slider__controls">
        <div className="slider__dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className="slider__dot"
              aria-current={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="slider__buttons">
          <button type="button" className="slider__btn" onClick={() => go(index - 1)} aria-label="Previous slide">
            <Icon name="arrowRight" size={20} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button type="button" className="slider__btn" onClick={() => go(index + 1)} aria-label="Next slide">
            <Icon name="arrowRight" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   CARDS
   ========================================================================== */

export function MediaCard({
  to,
  art = 'cells',
  tone = 'red',
  tag,
  meta = [],
  title,
  excerpt,
  cta = 'Read more',
  placeholder = false,
  imgSlot = false,
  imgSlotLabel,
}) {
  const Inner = (
    <>
      <div className={`media-card__media media-card__media--${tone}`}>
        <StoryArt name={art} />
        {tag ? <span className="badge media-card__tag">{tag}</span> : null}
        {imgSlot ? <ImgSlot label={imgSlotLabel} /> : null}
      </div>
      <div className="media-card__body">
        {meta.length ? (
          <div className="media-card__meta">
            {meta.map((m, i) => (
              <span key={i} className="cluster" style={{ gap: '0.35rem' }}>
                {m.icon ? <Icon name={m.icon} size={14} /> : null}
                {m.text || m}
              </span>
            ))}
          </div>
        ) : null}
        <h3 className="media-card__title">{title}</h3>
        {excerpt ? <p className="media-card__excerpt">{excerpt}</p> : null}
        <div className="cluster" style={{ justifyContent: 'space-between' }}>
          {to ? (
            <span className="link-arrow">
              {cta}
              <Icon name="arrowRight" size={18} />
            </span>
          ) : null}
          {placeholder ? <PlaceholderTag /> : null}
        </div>
      </div>
    </>
  )

  if (!to) return <article className="card media-card">{Inner}</article>

  return (
    <article className="card media-card card--hover">
      <Link to={to} style={{ display: 'contents' }}>
        {Inner}
      </Link>
    </article>
  )
}

export function StatCard({ icon, children, label, note, delay = 0 }) {
  return (
    <div className="stat" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      <svg className="stat__watermark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 2a10 10 0 1 0 8 16A8 8 0 0 1 12 2Z"
          fill="currentColor"
        />
      </svg>
      {icon ? (
        <span className="stat__icon">
          <Icon name={icon} size={26} />
        </span>
      ) : null}
      <p className="stat__value">{children}</p>
      <p className="stat__label">{label}</p>
      {note ? <p className="stat__note">{note}</p> : null}
    </div>
  )
}

export function DownloadCard({ title, meta, icon = 'file' }) {
  return (
    <a className="download-card" href="#placeholder-download" onClick={(e) => e.preventDefault()}>
      <span className="download-card__icon">
        <Icon name={icon} size={22} />
      </span>
      <span>
        <span className="download-card__title">{title}</span>
        <span className="download-card__meta" style={{ display: 'block' }}>
          {meta}
        </span>
      </span>
      <Icon name="download" size={20} />
    </a>
  )
}

export function EventCard({ event, idPrefix = 'ev' }) {
  const date = new Date(event.date)
  const month = date.toLocaleString('en-GB', { month: 'short' })
  const day = date.getDate()
  const readable = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <article className="event-card">
      <div className="event-card__date">
        <span className="event-card__month">{month}</span>
        <span className="event-card__day">{day}</span>
      </div>
      <div>
        <span className="badge badge--teal">{event.type}</span>
        <h3 className="event-card__title" style={{ marginTop: 'var(--sp-2)' }}>
          {event.title}
        </h3>
        <div className="event-card__meta">
          <span>
            <Icon name="calendar" size={14} /> {readable}, {event.time}
          </span>
          <span>
            <Icon name="pin" size={14} /> {event.location}
          </span>
        </div>
        <p className="card__text" style={{ marginTop: 'var(--sp-2)' }}>
          {event.summary}
        </p>
        <div className="event-card__actions">
          <a
            className="btn btn--outline btn--sm"
            href={`#rsvp-${event.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            RSVP
            <Icon name="ticket" size={16} />
          </a>
          <span className="badge">{event.spots}</span>
        </div>
      </div>
    </article>
  )
}

export function TickList({ items = [], icon = 'check' }) {
  return (
    <ul className="tick-list">
      {items.map((item) => (
        <li className="tick-list__item" key={item}>
          <span className="tick-list__mark">
            <Icon name={icon} size={18} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function CtaBanner({ title, lede, actions, idPrefix = 'cta' }) {
  return (
    <div className="cta-banner on-dark">
      <span className="cell-bg cell-bg--strong" aria-hidden="true" />
      <div className="cta-banner__inner">
        <div>
          <h2>{title}</h2>
          {lede ? <p className="lede">{lede}</p> : null}
        </div>
        {actions ? <div className="cta-banner__actions">{actions}</div> : null}
      </div>
    </div>
  )
}

export function MapPlaceholder({ query, label = 'Map', height }) {
  return (
    <div className="map-placeholder" style={height ? { minHeight: height } : undefined} role="img" aria-label={`Map showing ${query}`}>
      <span className="map-placeholder__grid" aria-hidden="true" />
      <div className="map-placeholder__inner">
        <span className="icon-badge icon-badge--coral" style={{ marginInline: 'auto' }}>
          <Icon name="pin" size={26} />
        </span>
        <h3 style={{ fontSize: 'var(--fs-base)', marginTop: 'var(--sp-3)' }}>
          {label} placeholder
        </h3>
        <p className="small muted" style={{ marginTop: 'var(--sp-2)' }}>
          Embed a Google Map, OpenStreetMap or Mapbox view here showing{' '}
          <strong>{query}</strong>. Replace this block with the embed iframe.
        </p>
      </div>
    </div>
  )
}
