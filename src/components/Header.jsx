import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { navigation } from '../data/site'
import { useOrgSettings } from '../lib/content'
import logo from '../assets/logo.jpg'

/**
 * Header — announcement bar + sticky navigation.
 *
 * Accessibility notes:
 *  - The mobile drawer is `inert` while closed so its links stay out of the
 *    tab order.
 *  - Dropdown menus open on hover (mouse), on focus (keyboard) and on click.
 *  - Escape closes the drawer and any open dropdown; the drawer locks scroll.
 */
export default function Header() {
  const site = useOrgSettings()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)
  const { pathname } = useLocation()
  const drawerRef = useRef(null)
  const closeButtonRef = useRef(null)

  /* Shrink/shadow the header once the page is scrolled. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close overlays whenever the route changes. */
  useEffect(() => {
    setDrawerOpen(false)
    setOpenIndex(null)
  }, [pathname])

  /* Lock body scrolling while the drawer is open. */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  /* Escape closes things; focus returns to the drawer's close button on open. */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return
      setOpenIndex(null)
      setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (drawerOpen && closeButtonRef.current) closeButtonRef.current.focus()
  }, [drawerOpen])

  const isActive = (to) => pathname === to || (to !== '/' && pathname.startsWith(to))

  return (
    <>
      {/* ---------- Announcement bar ---------- */}
      <div className="announce">
        <div className="container announce__inner">
          <Icon name="sparkle" size={16} className="announce__icon" />
          <span>
            World Sickle Cell Day is <strong>19 June</strong> — join our campaign.
          </span>
          <Link to="/events">See events</Link>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container nav-bar">
          {/* ---------- Brand ---------- */}
          <Link to="/" className="brand" aria-label={`${site.name} — home`}>
            <img className="brand__logo" src={logo} alt="" width="60" height="60" />
          </Link>

          {/* ---------- Desktop navigation ---------- */}
          <nav className="nav" aria-label="Main navigation">
            <ul className="nav__list">
              {navigation.map((item, index) => {
                if (!item.children) {
                  return (
                    <li className="nav__item" key={item.label}>
                      <Link
                        to={item.to}
                        className="nav__link"
                        aria-current={pathname === item.to ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                }

                const open = openIndex === index
                return (
                  <li
                    className="nav__item"
                    key={item.label}
                    onMouseEnter={() => setOpenIndex(index)}
                    onMouseLeave={() => setOpenIndex(null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) setOpenIndex(null)
                    }}
                  >
                    <button
                      type="button"
                      className="nav__link"
                      aria-expanded={open}
                      aria-haspopup="true"
                      aria-current={isActive(item.to) ? 'page' : undefined}
                      onClick={() => setOpenIndex(open ? null : index)}
                    >
                      {item.label}
                      <Icon name="chevronDown" size={16} className="nav__caret" />
                    </button>

                    <div className="dropdown__menu" data-open={open}>
                      <Link className="dropdown__link" to={item.to}>
                        <strong>{item.label} overview</strong>
                        <span className="dropdown__desc">Start here</span>
                      </Link>
                      {item.children.map((child) => (
                        <Link className="dropdown__link" to={child.to} key={child.label}>
                          {child.label}
                          {child.desc ? <span className="dropdown__desc">{child.desc}</span> : null}
                        </Link>
                      ))}
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ---------- Actions ---------- */}
          <div className="nav-actions">
            <Link className="btn btn--primary btn--sm" to="/donate">
              <Icon name="heart" size={17} />
              Donate
            </Link>
            <button
              type="button"
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      <div
        className="drawer-backdrop"
        data-open={drawerOpen}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        className="drawer"
        id="mobile-drawer"
        data-open={drawerOpen}
        aria-label="Mobile navigation"
        inert={drawerOpen ? undefined : true}
        ref={drawerRef}
      >
        <div className="drawer__head">
          <Link to="/" className="brand">
            <img className="brand__logo" src={logo} alt="" width="60" height="60" />
          </Link>
          <button
            type="button"
            className="drawer__close"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            ref={closeButtonRef}
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <nav className="drawer__body" aria-label="Mobile navigation links">
          <div className="drawer__group">
            <Link className="drawer__link" to="/">
              Home
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>

          {navigation
            .filter((item) => item.children)
            .map((item) => (
              <div className="drawer__group" key={item.label}>
                <p className="drawer__group-title">{item.label}</p>
                {item.children.map((child) => (
                  <Link className="drawer__link" to={child.to} key={child.label}>
                    {child.label}
                    <Icon name="arrowRight" size={18} />
                  </Link>
                ))}
              </div>
            ))}

          <div className="drawer__cta">
            <Link className="btn btn--primary btn--block" to="/donate">
              <Icon name="heart" size={18} />
              Donate
            </Link>
            <Link className="btn btn--outline btn--block" to="/living-well">
              Get support
            </Link>
            <Link className="btn btn--quiet btn--block" to="/contact">
              Contact us
            </Link>
          </div>

          <div style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>
            <p>
              <a href={`tel:${site.phoneHref}`} className="cluster" style={{ gap: '0.5rem' }}>
                <Icon name="phone" size={16} />
                {site.phoneDisplay}
              </a>
            </p>
            <p style={{ marginTop: 'var(--sp-2)' }}>
              <a href={`mailto:${site.email}`} className="cluster" style={{ gap: '0.5rem' }}>
                <Icon name="mail" size={16} />
                {site.email}
              </a>
            </p>
          </div>
        </nav>
      </aside>
    </>
  )
}
