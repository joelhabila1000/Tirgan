import { Link, useParams } from 'react-router-dom'
import Seo, { articleSchema } from '../components/Seo'
import Icon from '../components/Icon'
import StoryArt from '../components/Rbc'
import { Breadcrumbs, Callout, CtaBanner, MediaCard, PlaceholderTag } from '../components/Ui'
import { news as staticNews, site } from '../data/site'
import { useCollection } from '../lib/content'

/**
 * Article — a single news post or blog article.
 *
 * Bodies are arrays of paragraph strings in the data file. Replace them with
 * real, reviewed writing and drop `placeholder: true` when you do.
 */

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Article() {
  const { slug } = useParams()
  const news = useCollection('news', staticNews)
  const article = news.find((n) => n.slug === slug)

  if (!article) {
    return (
      <>
        <Seo title="Article not found" path="/news" noIndex />
        <section className="section">
          <div className="container container--narrow">
            <div className="empty-state">
              <Icon name="search" size={34} />
              <h1 style={{ fontSize: 'var(--fs-2xl)', marginTop: 'var(--sp-4)' }}>
                We could not find that article
              </h1>
              <p style={{ marginTop: 'var(--sp-3)' }}>
                The link may be out of date, or the article may have moved.
              </p>
              <p style={{ marginTop: 'var(--sp-5)' }}>
                <Link className="btn btn--primary" to="/news">
                  Back to news &amp; blog
                  <Icon name="arrowRight" size={18} />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </>
    )
  }

  const related = news.filter((n) => n.slug !== article.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/news/${article.slug}`}
        type="article"
        schema={{
          ...articleSchema({
            title: article.title,
            description: article.excerpt,
            path: `/news/${article.slug}`,
            datePublished: article.date,
            author: article.author,
          }),
        }}
      />

      <section className="section">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: 'News & blog', to: '/news' }, { label: article.category }]} />

          <header className="article-header" style={{ marginTop: 'var(--sp-4)' }}>
            <p className="eyebrow">
              {article.category} · {formatDate(article.date)}
            </p>
            <h1>{article.title}</h1>
            <div className="article-meta">
              <span className="article-author">
                <span className="avatar" aria-hidden="true">
                  TF
                </span>
                <span className="quote__meta">
                  <span className="quote__name">{article.author}</span>
                  <span className="quote__role">{article.authorRole}</span>
                </span>
              </span>
              <span className="cluster" style={{ gap: '0.4rem' }}>
                <Icon name="clock" size={15} />
                {article.readTime}
              </span>
              {article.placeholder ? <PlaceholderTag /> : null}
            </div>
          </header>

          <div className="article-hero-art" aria-hidden="true">
            <StoryArt name={article.art} />
          </div>

          <div className="article-body article-body--aside" style={{ marginTop: 'var(--sp-7)' }}>
            <div>
              <div className="prose">
                {article.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <Callout tone="warning" title="Sample article — replace before launch" icon="alert">
                This article is placeholder content. Replace it with a real, reviewed post, and
                remove the <code>placeholder: true</code> flag in <code>site.js</code>.{' '}
                <PlaceholderTag />
              </Callout>

              <p style={{ marginTop: 'var(--sp-6)' }}>
                <Link className="link-arrow" to="/news">
                  <Icon name="arrowRight" size={18} style={{ transform: 'rotate(180deg)' }} />
                  Back to news &amp; blog
                </Link>
              </p>
            </div>

            {/* Share aside */}
            <aside className="article-share" aria-label="Share this article">
              <p className="share-bar__label">Share</p>
              <div className="share-bar" style={{ marginTop: 'var(--sp-3)' }}>
                <a
                  className="share-btn"
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on Instagram`}
                >
                  <Icon name="instagram" size={18} />
                </a>
                <a
                  className="share-btn"
                  href={`mailto:?subject=${encodeURIComponent(article.title)}`}
                  aria-label="Share by email"
                >
                  <Icon name="mail" size={18} />
                </a>
                <a className="share-btn" href="#share" onClick={(e) => e.preventDefault()} aria-label="Copy share link">
                  <Icon name="share" size={18} />
                </a>
              </div>

              <hr style={{ marginBlock: 'var(--sp-5)' }} />

              <p className="small muted">
                Published {formatDate(article.date)} by {site.shortName}.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section section--alt" aria-labelledby="related-heading">
        <div className="container">
          <h2 id="related-heading" style={{ fontSize: 'var(--fs-xl)', marginBottom: 'var(--sp-5)' }}>
            More from the blog
          </h2>
          <div className="grid-results">
            {related.map((n) => (
              <MediaCard
                key={n.slug}
                to={`/news/${n.slug}`}
                art={n.art}
                tone={n.tone}
                tag={n.category}
                placeholder
                meta={[
                  { icon: 'calendar', text: formatDate(n.date) },
                  { icon: 'clock', text: n.readTime },
                ]}
                title={n.title}
                excerpt={n.excerpt}
                cta="Read more"
              />
            ))}
          </div>

          <div style={{ marginTop: 'var(--sp-7)' }}>
            <CtaBanner
              title="Help us do more of this"
              lede="Screening, counselling and advocacy all depend on the support of people like you."
              actions={
                <Link className="btn btn--gold btn--lg" to="/donate">
                  Donate
                  <Icon name="arrowRight" size={18} />
                </Link>
              }
            />
          </div>
        </div>
      </section>
    </>
  )
}
