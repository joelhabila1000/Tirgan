import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { PageHero, SectionHead, Callout, CtaBanner, TickList } from '../components/Ui'
import { programs, site } from '../data/site'

/**
 * Programs — what the foundation actually does for people.
 *
 * An overview grid that links down the page, then one section per programme
 * anchored on its slug so the header dropdown and home page can deep-link in.
 */
export default function Programs() {
  return (
    <>
      <Seo
        title="Programs & services"
        description={`The services ${site.name} provides — free genotype screening, treatment financial assistance, awareness and school outreach, peer support, research and advocacy, and welfare support.`}
        path="/programs"
        schema={breadcrumbSchema([{ label: 'Programs & services', to: '/programs' }])}
      />

      <PageHero
        eyebrow="What we do"
        title="Programs & services"
        lede={`Everything ${site.name} runs, and how to access it. If you are living with sickle cell disease, or caring for someone who is, one of these programmes may be able to help.`}
        art="screening"
        crumbs={[{ label: 'Programs & services' }]}
        actions={
          <Link className="btn btn--primary" to="/contact">
            Request support
            <Icon name="arrowRight" size={18} />
          </Link>
        }
      />

      {/* ================================================================
          OVERVIEW
          ================================================================ */}
      <section className="section" aria-labelledby="overview-heading">
        <div className="container">
          <SectionHead
            eyebrow="At a glance"
            title="Where our work goes"
            lede="Six programmes, one purpose: fewer families caught off guard by sickle cell disease, and better lives for the people already living with it."
            id="overview-heading"
          />

          <div className="grid grid--3">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 60}>
                <article className="card card--hover" style={{ height: '100%' }}>
                  <span className={`icon-badge icon-badge--${program.tone}`}>
                    <Icon name={program.icon} size={26} />
                  </span>
                  <h3 className="card__title">{program.title}</h3>
                  <p className="card__text">{program.short}</p>
                  <div className="program-stats">
                    <span className="program-stats__item">
                      <strong>{program.stat.value}</strong>
                      {program.stat.label}
                    </span>
                  </div>
                  <p className="card__footer">
                    <a className="link-arrow" href={`#${program.slug}`}>
                      See the details
                      <Icon name="arrowRight" size={18} />
                    </a>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PER-PROGRAMME DETAIL
          ================================================================ */}
      {programs.map((program, i) => (
        <section
          key={program.slug}
          id={program.slug}
          className={`section ${i % 2 === 1 ? 'section--alt' : ''}`}
          aria-labelledby={`${program.slug}-heading`}
        >
          <div className="container">
            <div className={`split ${i % 2 === 1 ? 'split--wide-right' : 'split--wide-left'}`}>
              {i % 2 === 1 ? (
                <Reveal>
                  <ProgrammeArt tone={program.tone} icon={program.icon} />
                </Reveal>
              ) : null}

              <div>
                <span className={`icon-badge icon-badge--${program.tone}`}>
                  <Icon name={program.icon} size={28} />
                </span>
                <h2 id={`${program.slug}-heading`} style={{ marginTop: 'var(--sp-4)' }}>
                  {program.title}
                </h2>
                <p className="lede">{program.short}</p>

                <h3 style={{ fontSize: 'var(--fs-base)', margin: 'var(--sp-5) 0 var(--sp-3)' }}>
                  What this includes
                </h3>
                <TickList items={program.what} />

                <p className="small muted" style={{ marginTop: 'var(--sp-5)' }}>
                  <strong>{program.stat.value}</strong> {program.stat.label}
                </p>
              </div>

              {i % 2 === 0 ? (
                <Reveal>
                  <ProgrammeArt tone={program.tone} icon={program.icon} />
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {/* ================================================================
          HOW TO ACCESS + CTA
          ================================================================ */}
      <section className="section section--tight">
        <div className="container">
          <Callout tone="info" title="How to access a programme" icon="info">
            For screening, simply come to a community drive or call the office. For financial or
            welfare assistance, start with a phone call or the form on our contact page — one of our
            team will explain what information we need and how quickly we can help.
          </Callout>

          <div className="cluster" style={{ marginTop: 'var(--sp-6)' }}>
            <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
              <Icon name="phone" size={18} />
              {site.phoneDisplay}
            </a>
            <Link className="btn btn--outline" to="/contact">
              Contact the team
            </Link>
          </div>

          <div style={{ marginTop: 'var(--sp-8)' }}>
            <CtaBanner
              title="Fund the next programme"
              lede="Every programme here is paid for by people who decided to help. Your gift goes straight into screening, support and care."
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
          </div>
        </div>
      </section>
    </>
  )
}

/** Illustrated panel for a programme, coloured to match its tone. */
function ProgrammeArt({ tone, icon }) {
  const toneVar = {
    red: 'var(--red-050)',
    teal: 'var(--teal-050)',
    gold: 'var(--warning-050)',
    coral: 'var(--coral-050)',
    charcoal: 'var(--cream-200)',
  }[tone] || 'var(--cream-200)'

  return (
    <div
      className="card"
      style={{
        background: toneVar,
        display: 'grid',
        placeItems: 'center',
        minHeight: 260,
        border: '1px solid var(--border)',
      }}
      aria-hidden="true"
    >
      <Icon name={icon} size={72} />
    </div>
  )
}
