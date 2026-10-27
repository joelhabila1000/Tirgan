import { Link } from 'react-router-dom'
import Icon from './Icon'
import { NewsletterForm } from './Ui'
import { footerLinks, legalPages } from '../data/site'
import { useOrgSettings } from '../lib/content'
import logo from '../assets/logo.jpg'

/**
 * Footer — quick links, newsletter, socials, registration number, legal links.
 */
export default function Footer() {
  const site = useOrgSettings()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__top">
          {/* ---------- Brand + contact ---------- */}
          <div className="footer__brand">
            {/* The logo artwork has a black plate; `lighten` blends it into the footer. */}
            <img
              className="footer__logo"
              src={logo}
              alt={`${site.name} logo`}
              width="230"
              height="230"
            />

            <p className="footer__about">{site.mission}</p>

            <address style={{ fontStyle: 'normal', marginTop: 'var(--sp-5)', fontSize: 'var(--fs-sm)' }}>
              <span className="cluster" style={{ gap: '0.5rem', alignItems: 'flex-start' }}>
                <Icon name="pin" size={16} />
                <span>
                  {site.addressLine1}
                  <br />
                  {site.addressLine2}
                  <br />
                  {site.addressCountry}
                </span>
              </span>
              <span className="cluster" style={{ gap: '0.5rem', marginTop: 'var(--sp-3)' }}>
                <Icon name="phone" size={16} />
                <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
              </span>
              <span className="cluster" style={{ gap: '0.5rem', marginTop: 'var(--sp-2)' }}>
                <Icon name="mail" size={16} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </address>

            <ul className="socials">
              {site.socials.map((social) => (
                <li key={social.key}>
                  <a
                    className="social"
                    href={social.href}
                    aria-label={`${site.shortName} on ${social.label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={social.key} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Quick links ---------- */}
          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="footer__title">{group.title}</h2>
              <ul className="footer__list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link className="footer__link" to={link.to}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* ---------- Newsletter ---------- */}
          <div>
            <NewsletterForm variant="footer" idPrefix="footer-newsletter" />
            <p style={{ marginTop: 'var(--sp-5)' }}>
              <span className="charity-note">
                <Icon name="shield" size={15} />
                {site.registrationLabel}: {site.registrationNumber}
              </span>
            </p>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="footer__bottom">
          <p>
            © {year} {site.name}. {site.city}, {site.country}. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="footer__legal">
              {legalPages.map((page) => (
                <li key={page.label}>
                  <Link to={page.to}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="small" style={{ paddingBottom: 'var(--sp-7)', color: 'rgba(255,247,239,0.6)', maxWidth: '80ch' }}>
          The information on this website is educational and is not a substitute for professional
          medical advice. For medical emergencies, call {site.emergencyNumber} or go to your nearest
          hospital.
        </p>
      </div>
    </footer>
  )
}
