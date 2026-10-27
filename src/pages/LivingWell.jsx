import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import StoryArt from '../components/Rbc'
import {
  PageHero,
  SectionHead,
  Callout,
  CtaBanner,
  DownloadCard,
} from '../components/Ui'
import {
  site,
  careChecklist,
  nutritionTips,
  redFlags,
  crisisTriggers,
  crisisSteps,
  mentalHealth,
  downloads,
  supportGroups,
} from '../data/site'

/**
 * LivingWell — the day-to-day and the emergency.
 *
 * Daily care, nutrition, what to do in a pain crisis and the red flags that
 * mean hospital now, mental health, downloadable resources and support groups.
 */
export default function LivingWell() {
  return (
    <>
      <Seo
        title="Living well with sickle cell disease"
        description="Daily care, nutrition and hydration, what to do in a pain crisis, the red flags that mean hospital now, mental health, and where to find support."
        path="/living-well"
        schema={breadcrumbSchema([{ label: 'Living well', to: '/living-well' }])}
      />

      <PageHero
        eyebrow="Support"
        title="Living well"
        lede="Sickle cell disease is managed, day by day, at home. This is the everyday care that prevents crises, and the emergency guide for when a crisis starts anyway."
        art="care"
        crumbs={[{ label: 'Living well' }]}
        actions={
          <>
            <Link className="btn btn--primary" to="#emergency">
              Emergency guide
              <Icon name="arrowRight" size={18} />
            </Link>
            <Link className="btn btn--outline" to="#groups">
              Support groups
            </Link>
          </>
        }
      />

      {/* ================================================================
          DAILY CARE
          ================================================================ */}
      <section className="section" aria-labelledby="care-heading">
        <div className="container">
          <SectionHead
            eyebrow="Every day"
            title="The daily care that keeps crises away"
            lede="None of this is dramatic. Done consistently, it is the single most effective thing a person with sickle cell disease can do to reduce pain crises."
            id="care-heading"
          />

          <div className="care-checklist">
            {careChecklist.map((item) => (
              <div className="care-item" key={item.title}>
                <span className="care-item__icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <div>
                  <p className="care-item__title">{item.title}</p>
                  <p className="care-item__text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          NUTRITION
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="nutrition-heading">
        <div className="container">
          <SectionHead
            eyebrow="Food & water"
            title="Nutrition and hydration"
            lede="What you eat and drink supports red blood cell production and helps prevent the dehydration that triggers pain."
            id="nutrition-heading"
          />

          <div className="grid grid--3">
            {nutritionTips.map((tip, i) => (
              <Reveal key={tip.title} delay={i * 50}>
                <article className="card" style={{ height: '100%' }}>
                  <span className={`icon-badge icon-badge--${tip.tone}`}>
                    <Icon name={tip.icon} size={24} />
                  </span>
                  <h3 className="card__title">{tip.title}</h3>
                  <p className="card__text">{tip.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          EMERGENCY GUIDE
          ================================================================ */}
      <section className="section" id="emergency" aria-labelledby="emergency-heading">
        <div className="container">
          <SectionHead
            eyebrow="In a crisis"
            title="What to do when a pain crisis starts"
            lede="A pain crisis is a medical event, not a test of endurance. Treat it early, and know the signs that mean hospital rather than home."
            id="emergency-heading"
          />

          <div className="split split--wide-left" style={{ alignItems: 'start' }}>
            <div>
              <h3 style={{ fontSize: 'var(--fs-lg)', marginBottom: 'var(--sp-4)' }}>
                Step by step
              </h3>
              <ol className="steps">
                {crisisSteps.map((step, i) => (
                  <li className="step" key={step.title}>
                    <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="step__title">{step.title}</p>
                      <p className="step__text">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Reveal>
              <div className="stack">
                <div className="red-flag-panel">
                  <p className="red-flag-panel__head">
                    <Icon name="alert" size={22} />
                    Go to hospital now if you see
                  </p>
                  <div className="red-flag-panel__body">
                    <ul className="flag-list">
                      {redFlags.map((flag, i) => (
                        <li className="flag-list__item" key={flag}>
                          <span className="flag-list__marker">{i + 1}</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Callout tone="alert" title="Do not wait until morning" icon="phone">
                  If you are unsure, treat it as an emergency. Call{' '}
                  <strong>{site.emergencyNumber}</strong> or go to{' '}
                  {site.hospitalNote}. It is always better to be seen and sent home than to wait.
                </Callout>
              </div>
            </Reveal>
          </div>

          {/* Triggers */}
          <div style={{ marginTop: 'var(--sp-8)' }}>
            <h3 style={{ fontSize: 'var(--fs-lg)', marginBottom: 'var(--sp-2)' }}>
              Common triggers to avoid
            </h3>
            <p className="small muted" style={{ marginBottom: 'var(--sp-5)' }}>
              Crises often have a trigger. Knowing yours helps you plan around it.
            </p>
            <div className="icon-row">
              {crisisTriggers.map((trigger) => (
                <div className="icon-row__item" key={trigger.label}>
                  <Icon name={trigger.icon} size={24} />
                  <span>{trigger.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MENTAL HEALTH
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="mind-heading">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="Mind & mood"
                title="Looking after your mental health"
                id="mind-heading"
              />
              <p className="lede">{mentalHealth.intro}</p>

              <div className="grid grid--2" style={{ marginTop: 'var(--sp-6)' }}>
                {mentalHealth.points.map((point) => (
                  <div className="card card--flat" key={point.title}>
                    <span className="icon-badge icon-badge--teal">
                      <Icon name={point.icon} size={22} />
                    </span>
                    <h3 className="card__title" style={{ fontSize: 'var(--fs-base)' }}>
                      {point.title}
                    </h3>
                    <p className="card__text">{point.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <Reveal>
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <StoryArt name="support" />
                <p className="small muted" style={{ marginTop: 'var(--sp-4)', textAlign: 'center' }}>
                  You are not the only one living with this. Our peer circles exist for exactly this
                  reason.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          RESOURCES / DOWNLOADS
          ================================================================ */}
      <section className="section" id="resources" aria-labelledby="resources-heading">
        <div className="container">
          <SectionHead
            eyebrow="Resources"
            title="Guides you can print and keep"
            lede="Plain-language guides for home, school and work. These are placeholder files — attach the real PDFs before launch."
            id="resources-heading"
          />

          <div className="grid grid--2">
            {downloads.map((item) => (
              <DownloadCard key={item.title} title={item.title} meta={item.meta} icon={item.icon} />
            ))}
          </div>

          <Callout tone="warning" title="Attach the real documents" icon="file">
            Each card above links to a placeholder. Replace the <code>href</code> in{' '}
            <code>DownloadCard</code> with the path to your real, clinician-reviewed PDFs.
          </Callout>
        </div>
      </section>

      {/* ================================================================
          SUPPORT GROUPS
      ================================================================ */}
      <section className="section section--alt" id="groups" aria-labelledby="groups-heading">
        <div className="container">
          <SectionHead
            eyebrow="You are not alone"
            title="Support groups"
            lede="Meeting someone who lives with the same condition, or cares for someone who does, is often the most useful medicine there is."
            id="groups-heading"
          />

          <div className="grid grid--2">
            {supportGroups.map((group) => (
              <article className="card" key={group.name}>
                <span className="icon-badge icon-badge--coral">
                  <Icon name="users" size={24} />
                </span>
                <h3 className="card__title">{group.name}</h3>
                <div className="stack small" style={{ marginTop: 'var(--sp-3)' }}>
                  <p className="cluster" style={{ gap: '0.5rem' }}>
                    <Icon name="calendar" size={16} />
                    {group.when}
                  </p>
                  <p className="cluster" style={{ gap: '0.5rem' }}>
                    <Icon name="pin" size={16} />
                    {group.where}
                  </p>
                  <p className="cluster" style={{ gap: '0.5rem' }}>
                    <Icon name="users" size={16} />
                    {group.for}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="cluster" style={{ marginTop: 'var(--sp-6)' }}>
            <Link className="btn btn--primary" to="/contact">
              Ask about joining
              <Icon name="arrowRight" size={18} />
            </Link>
            <a className="btn btn--quiet" href={`tel:${site.phoneHref}`}>
              <Icon name="phone" size={18} />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="section section--tight">
        <div className="container">
          <CtaBanner
            title="Need practical help, not just information?"
            lede="Our programmes cover treatment costs, education and welfare support for families who need it."
            actions={
              <>
                <Link className="btn btn--gold btn--lg" to="/programs">
                  See our programmes
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/contact">
                  Contact us
                </Link>
              </>
            }
          />
        </div>
      </section>
    </>
  )
}
