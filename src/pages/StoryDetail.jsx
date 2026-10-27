import { Link, useParams } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import StoryArt from '../components/Rbc'
import { Breadcrumbs, Callout, CtaBanner, MediaCard, PlaceholderTag } from '../components/Ui'
import { stories as staticStories, site } from '../data/site'
import { useCollection } from '../lib/content'

/**
 * StoryDetail — a single community story.
 *
 * Story bodies in the data file are placeholders. When you add real stories,
 * replace `body` with an array of paragraphs (and, if you like, an `author`
 * field) and drop `placeholder: true`.
 */
export default function StoryDetail() {
  const { slug } = useParams()
  const stories = useCollection('stories', staticStories)
  const story = stories.find((s) => s.slug === slug)

  if (!story) {
    return (
      <>
        <Seo title="Story not found" path="/stories" noIndex />
        <section className="section">
          <div className="container container--narrow">
            <div className="empty-state">
              <Icon name="search" size={34} />
              <h1 style={{ fontSize: 'var(--fs-2xl)', marginTop: 'var(--sp-4)' }}>
                We could not find that story
              </h1>
              <p style={{ marginTop: 'var(--sp-3)' }}>
                The link may be out of date, or the story may have moved.
              </p>
              <p style={{ marginTop: 'var(--sp-5)' }}>
                <Link className="btn btn--primary" to="/stories">
                  Back to all stories
                  <Icon name="arrowRight" size={18} />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </>
    )
  }

  const related = stories.filter((s) => s.slug !== story.slug).slice(0, 3)
  const paragraphs = Array.isArray(story.body) ? story.body : [story.body]

  return (
    <>
      <Seo
        title={story.title}
        description={story.quote}
        path={`/stories/${story.slug}`}
        schema={breadcrumbSchema([
          { label: 'Stories', to: '/stories' },
          { label: story.title, to: `/stories/${story.slug}` },
        ])}
      />

      <section className="section">
        <div className="container container--narrow">
          <Breadcrumbs
            items={[{ label: 'Stories', to: '/stories' }, { label: story.category }]}
          />

          <header className="article-header" style={{ marginTop: 'var(--sp-4)' }}>
            <p className="eyebrow">{story.category}</p>
            <h1>{story.title}</h1>
            <div className="article-meta">
              <span className="article-author">
                <span className="avatar" aria-hidden="true">
                  TF
                </span>
                <span className="quote__meta">
                  <span className="quote__name">{story.name}</span>
                  <span className="quote__role">{story.role}</span>
                </span>
              </span>
              {story.placeholder ? <PlaceholderTag /> : null}
            </div>
          </header>

          <div className="article-hero-art" aria-hidden="true">
            <StoryArt name={story.art} />
          </div>

          <div className="article-body" style={{ marginTop: 'var(--sp-7)' }}>
            <div>
              <blockquote className="quote" style={{ marginBottom: 'var(--sp-6)' }}>
                <p className="quote__text">“{story.quote}”</p>
              </blockquote>

              <div className="prose">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <Callout tone="warning" title="Sample story — replace before launch" icon="alert">
                This story is invented for layout purposes. Before publishing, replace it with a
                real story told by a real person, with their written consent and their approval of
                the final wording and the name used.{' '}
                <PlaceholderTag />
              </Callout>

              <div className="article-share" style={{ marginTop: 'var(--sp-6)' }}>
                <p className="share-bar__label">Share this story</p>
                <div className="share-bar" style={{ marginTop: 'var(--sp-3)' }}>
                  <a
                    className="share-btn"
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Instagram"
                  >
                    <Icon name="instagram" size={18} />
                  </a>
                  <a
                    className="share-btn"
                    href={`mailto:?subject=${encodeURIComponent(story.title)}`}
                    aria-label="Share by email"
                  >
                    <Icon name="mail" size={18} />
                  </a>
                  <a className="share-btn" href="#share" onClick={(e) => e.preventDefault()} aria-label="Share link">
                    <Icon name="share" size={18} />
                  </a>
                </div>
              </div>

              <p style={{ marginTop: 'var(--sp-6)' }}>
                <Link className="link-arrow" to="/stories">
                  <Icon name="arrowRight" size={18} style={{ transform: 'rotate(180deg)' }} />
                  Back to all stories
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section section--alt" aria-labelledby="related-heading">
        <div className="container">
          <h2 id="related-heading" style={{ fontSize: 'var(--fs-xl)', marginBottom: 'var(--sp-5)' }}>
            More stories
          </h2>
          <div className="grid-results">
            {related.map((s) => (
              <MediaCard
                key={s.slug}
                to={`/stories/${s.slug}`}
                art={s.art}
                tone={s.tone}
                tag={s.category}
                placeholder
                title={s.title}
                excerpt={s.quote}
                cta="Read their story"
              />
            ))}
          </div>

          <div style={{ marginTop: 'var(--sp-7)' }}>
            <CtaBanner
              title="Your gift keeps these conversations going"
              lede="Storytelling, counselling and screening all depend on the support of people like you."
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
