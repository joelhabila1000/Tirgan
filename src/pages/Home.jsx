import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import StoryArt, { HeroArt, RoundCell, SickleCell, CellField } from '../components/Rbc'
import {
  CtaBanner,
  EventCard,
  MediaCard,
  PlaceholderTag,
  SectionHead,
  Slider,
  StatCard,
  TickList,
} from '../components/Ui'
import { impactStats, programs, stories as staticStories, events as staticEvents, partners, site, medicalDisclaimer } from '../data/site'
import { useCollection } from '../lib/content'
import { imageUrl } from '../lib/api'

/**
 * Home — the front door.
 *
 * Content carries over from the original single-page design: the "breaking
 * cycles / building awareness" positioning, the three pillars (awareness,
 * screening, medical outreach) and the Instagram call to action.
 */
export default function Home() {
  const stories = useCollection('stories', staticStories)
  const events = useCollection('events', staticEvents)
  const upcoming = events.slice(0, 4)

  return (
    <>
      <Seo
        title="Sickle cell awareness, screening and medical outreach"
        description={`${site.name} promotes sickle cell awareness, genotype education and community outreach in ${site.city}, ${site.country}.`}
        path="/"
      />

      {/* ================================================================
          1. HERO
          ================================================================ */}
      <section className="hero">
        <CellField count={16} seed={11} />

        <div className="container hero__inner">
          <div>
            <p className="eyebrow">Kaduna, Nigeria</p>

            <h1 className="hero__title">
              Breaking cycles.
              <br />
              <em style={{ color: 'var(--berry-600)', fontStyle: 'normal' }}>
                Building awareness.
              </em>
            </h1>

            <p className="hero__lede">
              Tirngan Sickle Cell Foundation promotes awareness, screening and medical outreach,
              while supporting people affected by sickle cell and encouraging genotype awareness.
            </p>

            <div className="hero__cta">
              <Link className="btn btn--primary btn--lg" to="/donate">
                <Icon name="heart" size={18} />
                Donate
              </Link>
              <Link className="btn btn--outline btn--lg" to="/living-well">
                Get support
                <Icon name="arrowRight" size={18} />
              </Link>
            </div>

            <div className="hero__trust">
              <span className="hero__trust-item">
                <Icon name="check" size={16} />
                Genotype awareness
              </span>
              <span className="hero__trust-item">
                <Icon name="check" size={16} />
                Education &amp; informed decisions
              </span>
              <span className="hero__trust-item">
                <Icon name="check" size={16} />
                Support &amp; empowerment
              </span>
            </div>
          </div>

          <div className="hero__art">
            <HeroArt />

            <div className="hero__float hero__float--one">
              <Icon name="droplet" size={22} />
              <span>
                <strong>Free</strong>
                genotype testing
              </span>
            </div>

            <div className="hero__float hero__float--two">
              <Icon name="users" size={22} />
              <span>
                <strong>Support</strong>
                for families
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. IMPACT COUNTERS
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="impact-heading">
        <div className="container">
          <SectionHead
            eyebrow="Our impact"
            title="What the community has built together"
            lede="Every figure below is a person, a family or a conversation. Replace these with your audited numbers before launch."
            id="impact-heading"
          />

          <div className="stat-grid">
            {impactStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <StatCard icon={stat.icon} label={stat.label} note={stat.note}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </StatCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          3. WHAT IS SICKLE CELL? — illustrated comparison
          ================================================================ */}
      <section className="section" aria-labelledby="what-heading">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="Start here"
                title="What is sickle cell disease?"
                lede="Red blood cells are usually round and flexible, so they travel easily through blood vessels. In sickle cell disease they can become stiff and crescent-shaped. Those cells block blood flow, which causes severe pain and, over time, damage to organs."
                id="what-heading"
              />

              <TickList
                items={[
                  'It is inherited — present from birth, never caught',
                  'Two carrier (AS) parents have a 1 in 4 chance of a child with the disease',
                  'With good care, most people live full and productive lives',
                  'Knowing your genotype is the single most useful first step',
                ]}
              />

              <div className="cluster" style={{ marginTop: 'var(--sp-6)' }}>
                <Link className="btn btn--primary" to="/understanding-sickle-cell">
                  Understand the condition
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link className="btn btn--quiet" to="/trait-and-counselling">
                  Know your genotype
                </Link>
              </div>
            </div>

            <Reveal>
              <div className="compare">
                <div className="compare__panel compare__panel--healthy">
                  <div className="compare__art">
                    <svg viewBox="0 0 200 130" width="200" aria-hidden="true">
                      <RoundCell cx="70" cy="45" r="30" fill="var(--teal-600)" dimple="var(--teal-700)" />
                      <RoundCell cx="128" cy="72" r="22" fill="var(--teal-600)" dimple="var(--teal-700)" />
                      <RoundCell cx="52" cy="96" r="15" fill="var(--teal-600)" dimple="var(--teal-700)" />
                    </svg>
                  </div>
                  <p className="compare__label">Healthy red blood cells</p>
                  <p className="compare__text">
                    Round, soft and flexible. They move through narrow blood vessels without
                    blocking them and carry oxygen to the whole body.
                  </p>
                </div>

                <div className="compare__panel compare__panel--sickle">
                  <div className="compare__art">
                    <svg viewBox="0 0 200 130" width="200" aria-hidden="true">
                      <SickleCell x={34} y={30} size={62} rotate={24} />
                      <SickleCell x={104} y={46} size={50} rotate={150} />
                      <SickleCell x={52} y={84} size={44} rotate={80} />
                    </svg>
                  </div>
                  <p className="compare__label">Sickle cells</p>
                  <p className="compare__text">
                    Stiff and crescent-shaped. They can stick together and block blood flow,
                    causing pain crises and organ damage over time.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. WHAT WE DO
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="work-heading">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What we do</p>
            <h2 id="work-heading">Showing up for the cause.</h2>
            <p className="lede">
              Awareness, screening and medical outreach are at the heart of the foundation’s work.
              Here is how that looks in practice.
            </p>
          </div>

          <div className="grid grid--3">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 70}>
                <article className="card card--hover" style={{ height: '100%' }}>
                  <p className="small muted" style={{ letterSpacing: '0.14em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <span className={`icon-badge icon-badge--${program.tone}`} style={{ marginTop: 'var(--sp-4)' }}>
                    <Icon name={program.icon} size={26} />
                  </span>
                  <h3 className="card__title">{program.title}</h3>
                  <p className="card__text">{program.short}</p>
                  <p className="card__footer">
                    <Link className="link-arrow" to={`/programs#${program.slug}`}>
                      Learn more
                      <Icon name="arrowRight" size={18} />
                    </Link>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4b. PARTNERS — auto-scrolling logo strip (left → right)
          ================================================================ */}
      <section className="section section--tight" aria-labelledby="partners-home-heading">
        <div className="container">
          <div
            className="cluster"
            style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--sp-5)' }}
          >
            <div>
              <p className="eyebrow">Working together</p>
              <h2 id="partners-home-heading" style={{ fontSize: 'var(--fs-xl)' }}>
                Our partners &amp; supporters
              </h2>
            </div>
            <Link className="link-arrow" to="/about#partners">
              See all partners
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>

        {/* Full-bleed strip. It scrolls left to right, pauses on hover, and
            becomes a plain scrollable row when motion is reduced. The list is
            rendered twice so the loop is seamless; the second copy is hidden
            from assistive tech. */}
        <div className="marquee">
          <ul className="marquee__track" aria-label="Our partners and supporters">
            {[...partners, ...partners].map((partner, i) => (
              <li
                className="logo-wall__cell marquee__item"
                key={`${partner.name}-${i}`}
                aria-hidden={i >= partners.length ? 'true' : undefined}
              >
                <Icon name="handshake" size={28} />
                <span className="logo-wall__name">{partner.name}</span>
                <span className="logo-wall__kind">{partner.kind}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="container">
          <p className="small muted" style={{ marginTop: 'var(--sp-5)' }}>
            Replace each placeholder with your real partner and, where you have permission, their
            logo. <PlaceholderTag />
          </p>
        </div>
      </section>

      {/* ================================================================
          5. FEATURED STORIES
          ================================================================ */}
      <section className="section" aria-labelledby="stories-heading">
        <div className="container">
          <SectionHead
            eyebrow="In their own words"
            title="Stories from our community"
            lede="Real stories, shared with consent, are the most persuasive thing we publish. These are sample cards — swap them for consented stories."
            id="stories-heading"
          />

          <Reveal>
            <Slider
              items={stories.slice(0, 4)}
              label="Featured stories"
              autoPlay
              renderItem={(story) => (
                <div className="quote">
                  <span className="quote__mark">
                    <Icon name="quote" size={30} />
                  </span>
                  <p className="quote__text">{story.quote}</p>
                  <div className="quote__author">
                    {story.imageId ? (
                      <img className="quote__avatar-img" src={imageUrl(story.imageId)} alt="" />
                    ) : (
                      <span className="avatar" style={{ width: 52, height: 52 }}>
                        {story.art === 'cells' ? 'TF' : 'SC'}
                      </span>
                    )}
                    <span className="quote__meta">
                      <span className="quote__name">{story.name}</span>
                      <span className="quote__role">
                        {story.role} · {story.category}
                      </span>
                    </span>
                    <span style={{ marginLeft: 'auto' }}>
                      <PlaceholderTag />
                    </span>
                  </div>
                </div>
              )}
            />
          </Reveal>

          <div className="cluster" style={{ marginTop: 'var(--sp-6)' }}>
            <Link className="btn btn--outline" to="/stories">
              Read more stories
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          6. UPCOMING EVENTS
          ================================================================ */}
      <section className="section section--tight section--alt" aria-labelledby="events-heading">
        <div className="container">
          <div
            className="cluster"
            style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--sp-6)' }}
          >
            <div>
              <p className="eyebrow">What’s coming up</p>
              <h2 id="events-heading" style={{ fontSize: 'var(--fs-xl)' }}>
                Upcoming events
              </h2>
            </div>
            <Link className="link-arrow" to="/events">
              See all events
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>

          <div className="events-strip">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          7. STAY CONNECTED + DONATE
          ================================================================ */}
      <section className="section" aria-labelledby="give-heading">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="Be part of it"
                title="Let’s keep the conversation going."
                lede="Follow foundation activities and connect with the Tirngan Sickle Cell Foundation community on Instagram."
                id="give-heading"
              />

              <div className="cluster">
                <a
                  className="btn btn--primary"
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="instagram" size={18} />
                  {site.instagramHandle}
                </a>
                <Link className="btn btn--quiet" to="/news">
                  Read the blog
                </Link>
              </div>

              <p className="small muted" style={{ marginTop: 'var(--sp-5)', display: 'flex', gap: '0.5rem' }}>
                <Icon name="info" size={16} />
                <span>{medicalDisclaimer}</span>
              </p>
            </div>

            <Reveal>
              <CtaBanner
                title="Your gift funds the next screening"
                lede="₦5,000 covers one genotype test, from the finger prick to the counselling session that follows it."
                actions={
                  <>
                    <Link className="btn btn--gold btn--lg" to="/donate">
                      Donate now
                      <Icon name="arrowRight" size={18} />
                    </Link>
                    <Link className="btn btn--ghost btn--lg" to="/get-involved">
                      Volunteer
                    </Link>
                  </>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
