import { Link, useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import StoryArt from '../components/Rbc'
import { footerLinks } from '../data/site'

/**
 * NotFound — the 404 page.
 *
 * Keeps the visitor moving: the most useful destinations, plus a search hint.
 * The Seo component sets noindex so a broken link is never indexed.
 */
export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <>
      <Seo title="Page not found" description="The page you were looking for does not exist." path="/404" noIndex />

      <section className="section">
        <div className="container container--narrow text-center">
          <div style={{ width: 180, margin: '0 auto' }} aria-hidden="true">
            <StoryArt name="cell" />
          </div>

          <p className="eyebrow" style={{ justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
            Error 404
          </p>
          <h1>We could not find that page</h1>
          <p className="lede">
            The link <code>{pathname}</code> may be out of date, or the page may have moved. Here are
            some places that still work.
          </p>

          <div className="cluster" style={{ justifyContent: 'center', marginTop: 'var(--sp-6)' }}>
            <Link className="btn btn--primary" to="/">
              <Icon name="arrowRight" size={18} style={{ transform: 'rotate(180deg)' }} />
              Back to home
            </Link>
            <Link className="btn btn--outline" to="/contact">
              Contact us
            </Link>
          </div>

          <div style={{ marginTop: 'var(--sp-9)', textAlign: 'left' }}>
            <div className="grid grid--3">
              {footerLinks.map((group) => (
                <nav key={group.title} aria-label={group.title}>
                  <h2 style={{ fontSize: 'var(--fs-base)', marginBottom: 'var(--sp-3)' }}>
                    {group.title}
                  </h2>
                  <ul className="stack" style={{ gap: 'var(--sp-2)' }}>
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link className="link-arrow" to={link.to}>
                          {link.label}
                          <Icon name="arrowRight" size={16} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
