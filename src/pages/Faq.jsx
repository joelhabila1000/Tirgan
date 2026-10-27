import { Link } from 'react-router-dom'
import Seo, { faqSchema, breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import { PageHero, Accordion, Callout, CtaBanner } from '../components/Ui'
import { faqGroups, site } from '../data/site'

/**
 * Faq — answers grouped by audience.
 *
 * The page emits FAQPage structured data so the questions can surface in
 * search results, built from the same content the visitor reads.
 */
export default function Faq() {
  const allItems = faqGroups.flatMap((group) => group.items)

  return (
    <>
      <Seo
        title="Frequently asked questions"
        description={`Answers for people living with sickle cell disease, parents and families, donors and volunteers — from ${site.name}.`}
        path="/faq"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            faqSchema(allItems),
            breadcrumbSchema([{ label: 'FAQ', to: '/faq' }]),
          ],
        }}
      />

      <PageHero
        eyebrow="Questions & answers"
        title="Frequently asked questions"
        lede="The questions we are asked most often, grouped by who is asking. If yours is not here, ask us directly — a person will read it."
        art="cells"
        crumbs={[{ label: 'FAQ' }]}
      />

      <section className="section">
        <div className="container legal-layout">
          {/* Jump links */}
          <nav className="toc" aria-label="Question categories">
            <p className="toc__title">Jump to</p>
            <ul className="toc__list">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a className="toc__link" href={`#${group.id}`}>
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            {faqGroups.map((group) => (
              <section className="faq-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-heading`}>
                <div className="faq-group__head">
                  <span className="faq-group__icon">
                    <Icon name={group.icon} size={22} />
                  </span>
                  <h2 id={`${group.id}-heading`} style={{ fontSize: 'var(--fs-xl)' }}>
                    {group.title}
                  </h2>
                </div>

                <Accordion items={group.items} idPrefix={group.id} />
              </section>
            ))}

            <div style={{ marginTop: 'var(--sp-8)' }}>
              <Callout tone="info" title="Still not answered?" icon="mail">
                Send your question to <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
                {site.phoneDisplay}. For a medical emergency, call {site.emergencyNumber} instead of
                emailing us.
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight section--alt">
        <div className="container">
          <CtaBanner
            title="Found what you needed?"
            lede="If this answered your question, someone else is asking it too. Share the page, or help us keep answering."
            actions={
              <>
                <Link className="btn btn--gold btn--lg" to="/donate">
                  Donate
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/contact">
                  Ask a question
                </Link>
              </>
            }
          />
        </div>
      </section>
    </>
  )
}
