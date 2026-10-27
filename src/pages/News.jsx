import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import { PageHero, FilterTabs, MediaCard, Callout, CtaBanner, PlaceholderTag } from '../components/Ui'
import { news as staticNews, newsCategories } from '../data/site'
import { useCollection } from '../lib/content'

/**
 * News — announcements, updates and the blog.
 *
 * Every article in the data file is sample content and must be replaced with a
 * real, reviewed article before launch.
 */

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function News() {
  const news = useCollection('news', staticNews)
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () => (category === 'All' ? news : news.filter((n) => n.category === category)),
    [news, category],
  )

  const featured = news.find((n) => n.featured)
  const rest = filtered.filter((n) => !n.featured || category !== 'All')

  return (
    <>
      <Seo
        title="News & blog"
        description={`Announcements, programme updates and stories from ${'Tirngan Sickle Cell Foundation'} in Kaduna, Nigeria.`}
        path="/news"
        schema={breadcrumbSchema([{ label: 'News & blog', to: '/news' }])}
      />

      <PageHero
        eyebrow="Updates"
        title="News & blog"
        lede="What we have been doing, what we have learned and what is next — programme updates, advocacy and plain-language explainers."
        art="media"
        crumbs={[{ label: 'News & blog' }]}
      />

      {/* ================================================================
          FEATURED
          ================================================================ */}
      {featured ? (
        <section className="section" aria-labelledby="featured-heading">
          <div className="container">
            <h2 id="featured-heading" className="visually-hidden">
              Featured article
            </h2>

            <Link
              to={`/news/${featured.slug}`}
              className="card card--hover"
              style={{ display: 'grid', gap: 'var(--sp-5)', padding: 0, overflow: 'hidden' }}
            >
              <div className={`media-card__media media-card__media--${featured.tone}`} style={{ aspectRatio: '21 / 9' }}>
                <PlaceholderTag />
                <span className="badge media-card__tag">Featured · {featured.category}</span>
              </div>
              <div style={{ padding: 'var(--sp-6)' }}>
                <p className="eyebrow">{formatDate(featured.date)} · {featured.readTime}</p>
                <h3 style={{ fontSize: 'var(--fs-2xl)' }}>{featured.title}</h3>
                <p className="lede" style={{ maxWidth: '68ch' }}>{featured.excerpt}</p>
                <p className="cluster" style={{ marginTop: 'var(--sp-5)' }}>
                  <span className="link-arrow">
                    Read the article
                    <Icon name="arrowRight" size={18} />
                  </span>
                </p>
              </div>
            </Link>

            <Callout tone="warning" title="Sample content" icon="alert">
              This featured article is a placeholder. Replace every article in{' '}
              <code>site.js</code> with real, reviewed writing before launch.
            </Callout>
          </div>
        </section>
      ) : null}

      {/* ================================================================
          ALL ARTICLES
          ================================================================ */}
      <section className={`section ${featured ? 'section--alt' : ''}`} aria-labelledby="all-heading">
        <div className="container">
          <h2 id="all-heading" style={{ fontSize: 'var(--fs-xl)', marginBottom: 'var(--sp-5)' }}>
            All articles
          </h2>

          <FilterTabs
            options={newsCategories}
            value={category}
            onChange={setCategory}
            label="Filter articles by category"
          />

          <p className="results-count" aria-live="polite">
            Showing {rest.length} {rest.length === 1 ? 'article' : 'articles'}
            {category !== 'All' ? ` in ${category}` : ''}.
          </p>

          {rest.length ? (
            <div className="grid-results">
              {rest.map((article) => (
                <MediaCard
                  key={article.slug}
                  to={`/news/${article.slug}`}
                  art={article.art}
                  tone={article.tone}
                  tag={article.category}
                  placeholder
                  meta={[
                    { icon: 'calendar', text: formatDate(article.date) },
                    { icon: 'clock', text: article.readTime },
                  ]}
                  title={article.title}
                  excerpt={article.excerpt}
                  cta="Read more"
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="search" size={30} />
              <p style={{ marginTop: 'var(--sp-3)' }}>No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="section section--tight">
        <div className="container">
          <CtaBanner
            title="Get the updates first"
            lede="Subscribe to our monthly email for screening dates, events and new resources."
            actions={
              <Link className="btn btn--gold btn--lg" to="/contact">
                Contact us
                <Icon name="arrowRight" size={18} />
              </Link>
            }
          />
        </div>
      </section>
    </>
  )
}
