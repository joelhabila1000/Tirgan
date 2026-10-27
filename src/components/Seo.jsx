import { useEffect } from 'react'
import { site } from '../data/site'

/**
 * Seo — a tiny head manager.
 *
 * React Router renders everything client-side, so per-page <title> and meta
 * tags are written into <head> on navigation. That covers browsers, and it is
 * enough for most crawlers. If you need guaranteed per-page meta in the raw
 * HTML (best for SEO), prerender the routes at build time — see the README.
 *
 * Usage: <Seo title="About us" description="…" path="/about" />
 */

const SITE_NAME = site.name
const SITE_URL = site.url
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

/** Create the tag if missing, then set its content. */
function upsertMeta(attribute, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** JSON-LD block, replaced on every navigation. */
function upsertJsonLd(id, data) {
  let el = document.head.querySelector(`script[data-seo="${id}"]`)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-seo', id)
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/* ---------------------------------------------------------------------------
   Site-wide Organisation (NGO) markup, injected once from App.jsx.
   --------------------------------------------------------------------------- */
export const ngoSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: SITE_NAME,
  alternateName: site.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: DEFAULT_IMAGE,
  description: site.mission,
  slogan: site.tagline,
  foundingDate: String(site.founded),
  email: site.email,
  telephone: site.phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.addressLine1,
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: 'NG',
  },
  areaServed: { '@type': 'AdministrativeArea', name: `${site.state}, ${site.country}` },
  sameAs: site.socials.map((s) => s.href),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.emailSupport,
      telephone: site.phoneDisplay,
      availableLanguage: ['en', 'ha'],
    },
  ],
}

/**
 * NgoSchema — injects the site-wide schema.org NGO block once, from App.jsx.
 * Per-page schemas are passed to <Seo schema={...} />.
 */
export function NgoSchema() {
  useEffect(() => {
    upsertJsonLd('ngo', ngoSchema)
    return undefined
  }, [])

  return null
}

export default function Seo({
  title,
  description = site.mission,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${site.city}, ${site.country}`
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`

  useEffect(() => {
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    if (noIndex) upsertMeta('name', 'robots', 'noindex, nofollow')
    else upsertMeta('name', 'robots', 'index, follow')

    /* Open Graph */
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:alt', `${SITE_NAME} logo`)
    upsertMeta('property', 'og:locale', 'en_NG')

    /* Twitter / X */
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    upsertLink('canonical', canonical)

    upsertJsonLd('page', schema || null)
  }, [fullTitle, description, canonical, image, type, schema, noIndex])

  return null
}

/** Convenience: build a BreadcrumbList schema from an array of crumbs. */
export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.to === '/' ? '' : crumb.to}`,
    })),
  }
}

/** Convenience: Article schema for blog posts. */
export function articleSchema({ title, description, path, image, datePublished, author }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || DEFAULT_IMAGE,
    datePublished,
    author: { '@type': 'Organization', name: author || SITE_NAME },
    publisher: { '@type': 'NGO', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/apple-touch-icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
  }
}

/** Convenience: FAQPage schema. */
export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
