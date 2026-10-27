import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import StoryArt, { RoundCell, SickleCell } from '../components/Rbc'
import { PageHero, SectionHead, Callout, CtaBanner, TickList } from '../components/Ui'
import { genotypes, symptoms, treatments, myths, medicalDisclaimer } from '../data/site'

/**
 * Understanding — what sickle cell disease is, in plain language.
 *
 * Genotypes, the symptoms and complications to watch for, the treatments
 * available, and a myth-versus-fact section for the things people are told
 * that are simply not true.
 */

/** A single flip card. The whole card is a button so it works by keyboard too. */
function FlipCard({ myth, fact, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="flip-card"
      data-flipped={flipped}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Myth ${index + 1}. ${flipped ? 'Showing the fact. Activate to show the myth.' : 'Activate to reveal the fact.'}`}
    >
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__face--front">
          <span className="flip-card__kicker">
            <Icon name="alert" size={15} />
            Myth
          </span>
          <p className="flip-card__text">{myth}</p>
          <span className="flip-card__hint">
            <Icon name="refresh" size={15} />
            Tap to reveal the fact
          </span>
        </div>

        <div className="flip-card__face flip-card__face--back">
          <span className="flip-card__kicker">
            <Icon name="check" size={15} />
            Fact
          </span>
          <p className="flip-card__text">{fact}</p>
          <span className="flip-card__hint">
            <Icon name="refresh" size={15} />
            Tap to go back
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Understanding() {
  return (
    <>
      <Seo
        title="Understanding sickle cell disease"
        description="What sickle cell disease is, how it is inherited, the symptoms and complications to watch for, the treatments available and the myths worth putting to rest."
        path="/understanding-sickle-cell"
        schema={breadcrumbSchema([
          { label: 'Understanding sickle cell', to: '/understanding-sickle-cell' },
        ])}
      />

      <PageHero
        eyebrow="Start here"
        title="Understanding sickle cell disease"
        lede="Sickle cell disease is an inherited blood disorder, present from birth. Here is what it is, how it is passed on, what it does to the body and what can be done about it — in plain language, reviewed by clinicians."
        art="dna"
        crumbs={[{ label: 'Understanding sickle cell' }]}
      />

      {/* ================================================================
          WHAT IT IS — the cell comparison
          ================================================================ */}
      <section className="section" aria-labelledby="what-heading">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="The basics"
                title="What is sickle cell disease?"
                lede="Red blood cells are normally round and flexible, so they travel easily through blood vessels and carry oxygen to the whole body. In sickle cell disease, a change in haemoglobin makes red blood cells stiff and crescent-shaped."
                id="what-heading"
              />

              <TickList
                items={[
                  'It is inherited — present from birth and never caught from anyone',
                  'The sickle cells can stick together and block blood flow',
                  'Blocked flow causes severe pain and, over time, organ damage',
                  'With good, consistent care, most people live full and productive lives',
                ]}
              />

              <div className="cluster" style={{ marginTop: 'var(--sp-6)' }}>
                <Link className="btn btn--primary" to="#genotypes">
                  See the genotypes
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
                    Round, soft and flexible. They move through narrow vessels without blocking them.
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
                    Stiff and crescent-shaped. They can stick together and block blood flow.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          GENOTYPES
          ================================================================ */}
      <section className="section section--alt" id="genotypes" aria-labelledby="genotypes-heading">
        <div className="container">
          <SectionHead
            eyebrow="Genotypes"
            title="The haemoglobin patterns you may be given"
            lede="A genotype test reports your haemoglobin pattern. These are the common ones, and what each means in everyday language."
            id="genotypes-heading"
          />

          <div className="grid grid--3">
            {genotypes.map((g, i) => (
              <Reveal key={g.code} delay={i * 50}>
                <article className="card card--hover" style={{ height: '100%' }}>
                  <span className={`genotype-key__tag genotype-key__tag--${g.key}`}>{g.code}</span>
                  <h3 className="card__title" style={{ marginTop: 'var(--sp-4)' }}>
                    {g.name}
                  </h3>
                  <p className="card__text">{g.summary}</p>
                  <p className="small muted" style={{ marginTop: 'var(--sp-3)' }}>
                    {g.note}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="small muted" style={{ marginTop: 'var(--sp-5)' }}>
            Sickle cell disease also includes less common forms, such as sickle beta-thalassaemia.
            Your clinician can explain your own result.
          </p>
        </div>
      </section>

      {/* ================================================================
          SYMPTOMS & COMPLICATIONS
          ================================================================ */}
      <section className="section" aria-labelledby="symptoms-heading">
        <div className="container">
          <SectionHead
            eyebrow="What it does"
            title="Symptoms and complications"
            lede="Sickle cell disease affects people differently, but these are the problems it most commonly causes. Knowing them is the first step to catching them early."
            id="symptoms-heading"
          />

          <div className="icon-row">
            {symptoms.map((item) => (
              <div className="icon-row__item" key={item.title} style={{ textAlign: 'left', justifyItems: 'start' }}>
                <span className="icon-badge icon-badge--coral" style={{ marginBottom: 0 }}>
                  <Icon name={item.icon} size={24} />
                </span>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--fs-base)', color: 'var(--charcoal)' }}>
                  {item.title}
                </span>
                <span style={{ fontWeight: 'var(--fw-regular)', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <Callout tone="alert" title="Some symptoms mean hospital, now" icon="alert">
            Fever, chest pain, difficulty breathing, sudden weakness or confusion, or pain that
            medicine will not control are emergencies. See the{' '}
            <Link to="/living-well#emergency">emergency guide on our Living Well page</Link>, and
            call the emergency number if in doubt.
          </Callout>
        </div>
      </section>

      {/* ================================================================
          TREATMENTS
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="treatments-heading">
        <div className="container">
          <SectionHead
            eyebrow="What can be done"
            title="Treatments, in plain language"
            lede="Most care is about managing the disease well. A small number of people may be able to have a cure. Everything below is general information — your treatment is a decision for you and your clinician."
            id="treatments-heading"
          />

          <div className="grid grid--3">
            {treatments.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <article className="card card--hover" style={{ height: '100%' }}>
                  <span className={`icon-badge icon-badge--${item.tone}`}>
                    <Icon name={item.icon} size={26} />
                  </span>
                  <h3 className="card__title">{item.title}</h3>
                  <p className="card__text">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="disclaimer" style={{ marginTop: 'var(--sp-7)' }}>
            <strong>This is educational information, not advice.</strong> {medicalDisclaimer}
          </p>
        </div>
      </section>

      {/* ================================================================
          MYTHS VS FACTS
          ================================================================ */}
      <section className="section" aria-labelledby="myths-heading">
        <div className="container">
          <SectionHead
            eyebrow="Myths & facts"
            title="What people get wrong"
            lede="Fear and misinformation stop people getting tested. Here are the beliefs we hear most often, and what is actually true."
            id="myths-heading"
            center
          />

          <div className="grid grid--3">
            {myths.map((item, i) => (
              <FlipCard key={item.myth} myth={item.myth} fact={item.fact} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="section section--tight">
        <div className="container">
          <ArticleArtRow />
          <div style={{ marginTop: 'var(--sp-7)' }}>
            <CtaBanner
              title="The most useful thing you can do is know your genotype"
              lede="It takes minutes, it is free at our drives, and it changes the decisions a family can make."
              actions={
                <>
                  <Link className="btn btn--gold btn--lg" to="/trait-and-counselling">
                    Learn about trait & counselling
                    <Icon name="arrowRight" size={18} />
                  </Link>
                  <Link className="btn btn--ghost btn--lg" to="/programs#screening">
                    Free screening
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

/** A slim illustrated band that keeps the page feeling designed between sections. */
function ArticleArtRow() {
  return (
    <div className="compare" aria-hidden="true">
      <div className="card" style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ width: 180 }}>
          <StoryArt name="screening" />
        </div>
        <p className="small muted" style={{ marginTop: 'var(--sp-3)', textAlign: 'center' }}>
          A finger-prick test and a private conversation is all it takes.
        </p>
      </div>
      <div className="card" style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ width: 180 }}>
          <StoryArt name="dna" />
        </div>
        <p className="small muted" style={{ marginTop: 'var(--sp-3)', textAlign: 'center' }}>
          Two genes, one from each parent, decide the pattern.
        </p>
      </div>
      <div className="card" style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ width: 180 }}>
          <StoryArt name="care" />
        </div>
        <p className="small muted" style={{ marginTop: 'var(--sp-3)', textAlign: 'center' }}>
          With consistent care, most people live full lives.
        </p>
      </div>
    </div>
  )
}
