import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import { PageHero, SectionHead, FilterTabs, MediaCard, Callout, CtaBanner } from '../components/Ui'
import { stories as staticStories, storyCategories } from '../data/site'
import { useCollection } from '../lib/content'

/**
 * Stories — filterable grid of community stories.
 *
 * IMPORTANT: every story in the data file is invented sample content and must
 * be replaced with a real, consented story before launch. The cards carry a
 * visible "Sample" chip so nothing ships by accident.
 */
export default function Stories() {
  const stories = useCollection('stories', staticStories)
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () => (category === 'All' ? stories : stories.filter((s) => s.category === category)),
    [stories, category],
  )

  return (
    <>
      <Seo
        title="Stories"
        description="Stories from people living with sickle cell disease, their caregivers and our volunteers — shared with consent, in their own words."
        path="/stories"
        schema={breadcrumbSchema([{ label: 'Stories', to: '/stories' }])}
      />

      <PageHero
        eyebrow="In their own words"
        title="Stories"
        lede="Numbers tell you what happened. Stories tell you what it was like. These are the experiences of the people our work exists for."
        art="support"
        crumbs={[{ label: 'Stories' }]}
      />

      <section className="section">
        <div className="container">
          <Callout tone="warning" title="Every story here is a placeholder" icon="alert">
            Each card on this page is invented for layout purposes and marked “Sample”. Replace them
            with real, written-consent stories — and a name or role the person has approved — before
            this page goes live.
          </Callout>

          <div style={{ marginTop: 'var(--sp-6)' }}>
            <FilterTabs
              options={storyCategories}
              value={category}
              onChange={setCategory}
              label="Filter stories by category"
            />

            <p className="results-count" aria-live="polite">
              Showing {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
              {category !== 'All' ? ` in ${category}` : ''}.
            </p>

            {filtered.length ? (
              <div className="grid-results">
                {filtered.map((story) => (
                  <MediaCard
                    key={story.slug}
                    to={`/stories/${story.slug}`}
                    imageId={story.imageId}
                    art={story.art}
                    tone={story.tone}
                    tag={story.category}
                    placeholder
                    title={story.title}
                    excerpt={story.quote}
                    cta="Read their story"
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Icon name="search" size={30} />
                <p style={{ marginTop: 'var(--sp-3)' }}>
                  No stories in this category yet. Try another filter.
                </p>
              </div>
            )}
          </div>

          <div className="cluster" style={{ marginTop: 'var(--sp-7)' }}>
            <Link className="btn btn--outline" to="/news">
              Read our news & blog
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight section--alt">
        <div className="container">
          <SectionHead
            eyebrow="Share yours"
            title="Have a story you would like to tell?"
            lede="If you live with sickle cell disease, care for someone who does, or volunteer with us, we would love to hear from you. We only publish with your written consent, and you can approve every word."
          />

          <CtaBanner
            title="Tell us your story"
            lede="Get in touch and a member of the team will talk through how we handle stories, consent and privacy."
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
