import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { HorizontalBarChart, LineChart } from '../components/Charts'
import { PageHero, SectionHead, Callout, CtaBanner, TickList } from '../components/Ui'
import { researchFigures, prevalenceByCountry, impactOverTime, researchSources } from '../data/site'

/**
 * Research — the data behind the work.
 *
 * Public estimates (each attributed to its source) plus our own programme
 * delivery over time. Every figure must be verified against its source, and
 * our own numbers replaced with audited data, before launch.
 */
export default function Research() {
  const years = impactOverTime.map((row) => row.year)

  return (
    <>
      <Seo
        title="Research & data"
        description="The scale of sickle cell disease, published prevalence estimates with their sources, and the data from Tirngan's own screening and support programmes."
        path="/research"
        schema={breadcrumbSchema([{ label: 'Research & data', to: '/research' }])}
      />

      <PageHero
        eyebrow="Evidence"
        title="Research & data"
        lede="You cannot argue with numbers. Here is the scale of sickle cell disease, where the figures come from, and what our own programmes have delivered."
        art="advocacy"
        crumbs={[{ label: 'Research & data' }]}
      />

      {/* ================================================================
          HEADLINE FIGURES
          ================================================================ */}
      <section className="section" aria-labelledby="figures-heading">
        <div className="container">
          <SectionHead
            eyebrow="The scale of it"
            title="Sickle cell disease worldwide"
            lede="These are widely cited public estimates. Each carries its source, and each must be verified against that source before publication."
            id="figures-heading"
          />

          <div className="stat-grid">
            {researchFigures.map((figure) => (
              <div className="stat" key={figure.label}>
                <svg className="stat__watermark" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 8 16A8 8 0 0 1 12 2Z" fill="currentColor" />
                </svg>
                <p className="stat__value" style={{ fontSize: 'var(--fs-2xl)' }}>
                  {figure.value}
                </p>
                <p className="stat__label">{figure.label}</p>
                <p className="stat__note">Source: {figure.source}</p>
              </div>
            ))}
          </div>

          <Callout tone="warning" title="Verify every figure against its source" icon="alert">
            These numbers come from public estimates (WHO and similar). Confirm the current figure
            and the exact citation before you publish, and never present an estimate as a measured
            fact.
          </Callout>
        </div>
      </section>

      {/* ================================================================
          PREVALENCE BY COUNTRY
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="prevalence-heading">
        <div className="container">
          <SectionHead
            eyebrow="Where the burden falls"
            title="Estimated annual births by country"
            lede="Nigeria carries the largest burden of sickle cell disease in the world. The figures below are illustrative rankings based on published estimates."
            id="prevalence-heading"
          />

          <div className="research-grid research-grid--2">
            <Reveal>
              <div className="chart">
                <h3 className="chart__title">Estimated annual births (thousands)</h3>
                <p className="chart__subtitle">Illustrative — replace with verified figures</p>
                <HorizontalBarChart
                  data={prevalenceByCountry}
                  unit="k"
                  caption="Estimated annual births with sickle cell disease by country, in thousands"
                />
                <p className="chart-footnote">
                  Horizontal bars are proportional to the value shown. Confirm each figure and its
                  source before publishing.
                </p>
              </div>
            </Reveal>

            <div>
              <h3 style={{ fontSize: 'var(--fs-lg)' }}>Why this matters for Nigeria</h3>
              <p className="lede" style={{ fontSize: 'var(--fs-base)' }}>
                Roughly one in four Nigerians carries the sickle cell gene. That makes knowing your
                genotype, and counselling before starting a family, a matter of national importance —
                not a niche concern.
              </p>

              <div style={{ marginTop: 'var(--sp-5)' }}>
                <TickList
                  items={[
                    'Newborn screening is not yet universal across Nigeria',
                    'Affordable hydroxyurea is still out of reach for many families',
                    'Pain management protocols in emergency rooms are inconsistent',
                    'Community awareness remains the most cost-effective intervention',
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          OUR DELIVERY OVER TIME
          ================================================================ */}
      <section className="section" aria-labelledby="delivery-heading">
        <div className="container">
          <SectionHead
            eyebrow="Our data"
            title="What our programmes have delivered"
            lede="Screenings delivered and people supported, year by year. Replace this with your audited programme data."
            id="delivery-heading"
          />

          <Reveal>
            <div className="chart">
              <h3 className="chart__title">Programme delivery, 2019–2026</h3>
              <p className="chart__subtitle">Screenings and people supported, per year</p>
              <LineChart
                labels={years}
                series={[
                  {
                    name: 'Genotype screenings',
                    color: 'var(--red-600)',
                    values: impactOverTime.map((row) => row.screenings),
                  },
                  {
                    name: 'People supported',
                    color: 'var(--teal-600)',
                    values: impactOverTime.map((row) => row.supported),
                  },
                ]}
                caption="Genotype screenings delivered and people supported each year"
              />
              <p className="chart-footnote">
                Illustrative figures. Replace with your audited annual numbers before publishing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          SOURCES
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="sources-heading">
        <div className="container">
          <SectionHead
            eyebrow="Read for yourself"
            title="Sources and further reading"
            lede="We would rather you checked us. These are the references we rely on, from the organisations that set the standard."
            id="sources-heading"
          />

          <div className="source-list">
            {researchSources.map((source) => (
              <div className="source-item" key={source.title}>
                <span className="source-item__badge">{source.org}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-head)', fontWeight: 'var(--fw-bold)' }}>
                    {source.href === '#' ? (
                      source.title
                    ) : (
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--red-700)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                      >
                        {source.title}
                      </a>
                    )}
                  </p>
                  <p className="small muted" style={{ marginTop: 4 }}>
                    {source.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================ */}
      <section className="section section--tight">
        <div className="container">
          <CtaBanner
            title="Fund the data that changes policy"
            lede="Research and advocacy cost money too — and they are how the system changes for everyone."
            actions={
              <>
                <Link className="btn btn--gold btn--lg" to="/donate">
                  Support our research
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/programs#research">
                  Our research programme
                </Link>
              </>
            }
          />
        </div>
      </section>
    </>
  )
}
