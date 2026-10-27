import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import {
  PageHero,
  SectionHead,
  Callout,
  CtaBanner,
  StatCard,
  PlaceholderTag,
} from '../components/Ui'
import { site, values, timeline, team, partners, impactStats } from '../data/site'

/**
 * About — who we are.
 *
 * Mission and vision, the values that govern how we work, the story so far,
 * the people who run the foundation and the partners who make it possible.
 */

/** "Full Name" -> "FN" for the initials-only avatar that stands in for a photo. */
function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function About() {
  const leadership = team.filter((member) => member.group === 'leadership')
  const staff = team.filter((member) => member.group === 'team')
  const timelineRef = useRef(null)

  /* Fill the story line with colour as the reader scrolls through it, and
     light each year's dot as the advancing tip reaches it. A single
     rAF-throttled listener writes --timeline-progress (0 → 1). */
  useEffect(() => {
    const el = timelineRef.current
    if (!el) return undefined

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Precompute where each dot sits, as a fraction of the timeline height,
       so the per-frame work is just a comparison. */
    let dots = []
    const measure = () => {
      const rect = el.getBoundingClientRect()
      dots = Array.from(el.querySelectorAll('.timeline__dot')).map((dot) => {
        const r = dot.getBoundingClientRect()
        return {
          dot,
          ratio: rect.height ? (r.top + r.height / 2 - rect.top) / rect.height : 0,
        }
      })
    }

    const paint = (progress) => {
      dots.forEach(({ dot, ratio }) => {
        const lit = progress >= ratio
        if (dot.dataset.lit !== String(lit)) dot.dataset.lit = String(lit)
      })
    }

    measure()

    /* Motion-sensitive readers get the finished line and every dot lit. */
    if (reduceMotion) {
      el.style.setProperty('--timeline-progress', '1')
      paint(1)
      const onResizeReduced = () => {
        measure()
        paint(1)
      }
      window.addEventListener('resize', onResizeReduced)
      return () => window.removeEventListener('resize', onResizeReduced)
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      /* The fill follows a line ~55% down the viewport. */
      const reference = window.innerHeight * 0.55
      const progress = Math.min(Math.max((reference - rect.top) / rect.height, 0), 1)
      el.style.setProperty('--timeline-progress', progress.toFixed(4))
      paint(progress)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <Seo
        title="About us"
        description={`Who ${site.name} is — our mission, vision, values, history, the people who run the foundation and the partners we work with in ${site.city}, ${site.country}.`}
        path="/about"
        schema={breadcrumbSchema([{ label: 'About us', to: '/about' }])}
      />

      <PageHero
        eyebrow="About us"
        title="Support, educate, advocate."
        lede={`${site.name} works on sickle cell awareness, screening and medical outreach in ${site.city}, ${site.country}. We exist so that more families know their genotype, understand the condition and get support early — and so that the people already living with sickle cell disease are helped to live well.`}
        art="support"
        crumbs={[{ label: 'About us' }]}
        actions={
          <Link className="btn btn--primary" to="/get-involved">
            Get involved
            <Icon name="arrowRight" size={18} />
          </Link>
        }
      />

      {/* ================================================================
          MISSION, VISION, STORY
          ================================================================ */}
      <section className="section" aria-labelledby="mission-heading">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="Why we exist"
                title="Our mission and vision"
                id="mission-heading"
              />

              <div className="stack">
                <p className="lede">{site.mission}</p>
                <p className="lede">{site.vision}</p>
              </div>

              <p className="small muted" style={{ marginTop: 'var(--sp-5)', display: 'flex', gap: '0.5rem' }}>
                <Icon name="info" size={16} />
                <span>
                  Founded in {site.founded} in {site.city}. <PlaceholderTag>Confirm our history</PlaceholderTag>
                </span>
              </p>
            </div>

            <Reveal>
              <div className="card">
                <span className="icon-badge">
                  <Icon name="heart" size={26} />
                </span>
                <h3 className="card__title">Our promise in one line</h3>
                <p className="card__text">
                  We speak about people living with sickle cell disease, never about victims.
                  Person-first language is a promise, not a preference.
                </p>
                <div className="trust-badges">
                  <span className="trust-badge">
                    <Icon name="shield" size={16} />
                    Clinician-reviewed content
                  </span>
                  <span className="trust-badge">
                    <Icon name="chart" size={16} />
                    Accounts published yearly
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          VALUES
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="values-heading">
        <div className="container">
          <SectionHead
            eyebrow="How we work"
            title="The values behind every decision"
            lede="These are not wall art. They are the tests we run a new programme, a new partnership and a new piece of writing against."
            id="values-heading"
            center
          />

          <div className="grid grid--3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 60}>
                <article className="card card--hover value-card" style={{ height: '100%' }}>
                  <span className="icon-badge">
                    <Icon name={value.icon} size={26} />
                  </span>
                  <h3 className="card__title">{value.title}</h3>
                  <p className="card__text">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          STORY / TIMELINE
          ================================================================ */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container">
          <SectionHead
            eyebrow="Our story"
            title="From a living room to a statewide programme"
            lede="Every milestone below should be replaced with your real, verifiable history."
            id="story-heading"
          />

          <ol className="timeline" ref={timelineRef}>
            {timeline.map((item) => (
              <li className="timeline__item" key={item.year}>
                <span className="timeline__dot" aria-hidden="true" />
                <p className="timeline__year">{item.year}</p>
                <div className="card timeline__card">
                  <h3 className="card__title">{item.title}</h3>
                  <p className="card__text">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================
          IMPACT FIGURES
          ================================================================ */}
      <section className="section section--tight section--alt" aria-labelledby="numbers-heading">
        <div className="container">
          <SectionHead
            eyebrow="By the numbers"
            title="What the community has built together"
            id="numbers-heading"
          />
          <div className="stat-grid">
            {impactStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <StatCard icon={stat.icon} label={stat.label} note={stat.note}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </StatCard>
              </Reveal>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: 'var(--sp-5)' }}>
            Replace every figure with your audited numbers before launch. <PlaceholderTag />
          </p>
        </div>
      </section>

      {/* ================================================================
          TEAM
          ================================================================ */}
      <section className="section" id="team" aria-labelledby="team-heading">
        <div className="container">
          <SectionHead
            eyebrow="Leadership & team"
            title="The people who run the foundation"
            lede="Names, roles and short biographies must be supplied before launch. The initials-only avatars stand in for portrait photographs."
            id="team-heading"
          />

          <h3 style={{ fontSize: 'var(--fs-lg)', marginBottom: 'var(--sp-4)' }}>Leadership</h3>
          <div className="grid grid--4">
            {leadership.map((member) => (
              <article className="card team-card" key={member.role}>
                <span className="avatar" aria-hidden="true">
                  {initials(member.name)}
                </span>
                <p className="team-card__name">{member.name}</p>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
                <p style={{ marginTop: 'var(--sp-3)' }}>
                  <PlaceholderTag />
                </p>
              </article>
            ))}
          </div>

          <h3 style={{ fontSize: 'var(--fs-lg)', margin: 'var(--sp-8) 0 var(--sp-4)' }}>Team</h3>
          <div className="grid grid--4">
            {staff.map((member) => (
              <article className="card team-card" key={member.role}>
                <span className="avatar" aria-hidden="true">
                  {initials(member.name)}
                </span>
                <p className="team-card__name">{member.name}</p>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
                <p style={{ marginTop: 'var(--sp-3)' }}>
                  <PlaceholderTag />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PARTNERS
          ================================================================ */}
      <section className="section section--alt" id="partners" aria-labelledby="partners-heading">
        <div className="container">
          <SectionHead
            eyebrow="Partners & sponsors"
            title="We do not do this alone"
            lede="Hospitals, government, laboratories, universities and companies make the work possible. Replace each placeholder with your real partner and, where you have permission, their logo."
            id="partners-heading"
          />

          <ul className="logo-wall">
            {partners.map((partner) => (
              <li className="logo-wall__cell" key={partner.name}>
                <Icon name="handshake" size={28} />
                <span className="logo-wall__name">{partner.name}</span>
                <span className="logo-wall__kind">{partner.kind}</span>
              </li>
            ))}
          </ul>

          <div className="cluster" style={{ marginTop: 'var(--sp-6)' }}>
            <Link className="btn btn--outline" to="/get-involved#partner">
              Become a partner
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="section">
        <div className="container">
          <Callout tone="info" title="Our accounts are open" icon="shield">
            We publish our screening numbers and how every naira is allocated. If you would like to
            see our most recent annual report, email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we will send it to you.
          </Callout>

          <div style={{ marginTop: 'var(--sp-7)' }}>
            <CtaBanner
              title="Help us reach the next family"
              lede="Whether you give, volunteer or partner with us, you are part of breaking the cycle."
              actions={
                <>
                  <Link className="btn btn--gold btn--lg" to="/donate">
                    Donate
                    <Icon name="arrowRight" size={18} />
                  </Link>
                  <Link className="btn btn--ghost btn--lg" to="/get-involved">
                    Volunteer
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </section>
    </>
  )
}
