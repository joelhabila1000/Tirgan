import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Icon from './Icon'
import { site } from '../data/site'

/* ==========================================================================
   ScrollToTop — jump to the top on navigation, or to an in-page anchor
   ========================================================================== */

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      /* Wait a tick so the target section exists before scrolling. */
      const id = hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          /* Make the target focusable for keyboard users following the link. */
          el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
        }
      }, 80)
      return () => clearTimeout(timer)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [pathname, hash])

  return null
}

/* ==========================================================================
   FloatingHelp — the persistent "Need help?" button and its popover
   ========================================================================== */

function FloatingHelp() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={wrapRef}>
      <button
        type="button"
        className="floating-help"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="help-popover"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="floating-help__pulse" aria-hidden="true" />
        <Icon name={open ? 'close' : 'info'} size={20} />
        Need help?
      </button>

      {open ? (
        <div
          id="help-popover"
          className="card"
          style={{
            position: 'fixed',
            right: 'clamp(0.75rem, 2vw, 1.5rem)',
            bottom: 'calc(clamp(0.75rem, 2vw, 1.5rem) + 64px)',
            zIndex: 81,
            width: 'min(92vw, 340px)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <p className="card__title" style={{ fontSize: 'var(--fs-base)' }}>
            Quick help
          </p>
          <p className="card__text">
            If someone is unwell right now, do not wait for an email.
          </p>

          <ul className="tick-list" style={{ marginTop: 'var(--sp-4)' }}>
            <li className="tick-list__item">
              <span className="tick-list__mark">
                <Icon name="alert" size={18} />
              </span>
              <span>
                <Link to="/living-well#emergency" className="link-arrow">
                  When to go to hospital
                </Link>
              </span>
            </li>
            <li className="tick-list__item">
              <span className="tick-list__mark">
                <Icon name="heart" size={18} />
              </span>
              <span>
                <Link to="/living-well" className="link-arrow">
                  Living well hub
                </Link>
              </span>
            </li>
            <li className="tick-list__item">
              <span className="tick-list__mark">
                <Icon name="phone" size={18} />
              </span>
              <span>
                <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
              </span>
            </li>
            <li className="tick-list__item">
              <span className="tick-list__mark">
                <Icon name="mail" size={18} />
              </span>
              <span>
                <Link to="/contact" className="link-arrow">
                  Contact the team
                </Link>
              </span>
            </li>
          </ul>

          <p className="small muted" style={{ marginTop: 'var(--sp-4)' }}>
            In an emergency call <strong>{site.emergencyNumber}</strong>.
          </p>
        </div>
      ) : null}
    </div>
  )
}

/* ==========================================================================
   BackToTop
   ========================================================================== */

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={visible}
      aria-label="Back to top of page"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior:
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'auto'
              : 'smooth',
        })
      }
    >
      <Icon name="arrowUp" size={20} />
    </button>
  )
}

/* ==========================================================================
   CookieBanner — front-end only; wire your consent manager in `choose`
   ========================================================================== */

const COOKIE_KEY = 'tf-cookie-choice'

function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let stored = null
    try {
      stored = window.localStorage.getItem(COOKIE_KEY)
    } catch {
      stored = null
    }
    if (!stored) {
      const timer = setTimeout(() => setOpen(true), 900)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [])

  const choose = (choice) => {
    try {
      window.localStorage.setItem(COOKIE_KEY, choice)
    } catch {
      /* Storage blocked — the banner simply reappears next visit. */
    }
    /* TODO: hook your analytics/consent tool in here, e.g.
       if (choice === 'all') window.loadAnalytics() */
    setOpen(false)
  }

  return (
    <div className="cookie-banner" data-open={open} role="dialog" aria-label="Cookie notice" aria-live="polite">
      <div className="cookie-banner__inner">
        <div className="cluster" style={{ alignItems: 'flex-start' }}>
          <Icon name="cookie" size={26} />
          <p>
            We use essential cookies to make the site work, and optional analytics cookies to
            understand which pages are useful. Read our{' '}
            <Link to="/cookies">cookie notice</Link> and{' '}
            <Link to="/privacy">privacy policy</Link>.
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn--gold btn--sm" onClick={() => choose('all')}>
            Accept all
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => choose('essential')}>
            Essential only
          </button>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   Layout
   ========================================================================== */

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <ScrollToTop />
      <Header />

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />

      <FloatingHelp />
      <BackToTop />
      <CookieBanner />
    </>
  )
}
