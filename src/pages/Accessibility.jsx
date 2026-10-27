import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHero, Callout, PlaceholderTag } from '../components/Ui'
import { site, legalPages } from '../data/site'

/**
 * Accessibility — the foundation's accessibility statement.
 *
 * ============================================================================
 * DRAFT TEMPLATE — THIS IS NOT COMPLETE AND MUST BE REVIEWED AND COMPLETED.
 * ---------------------------------------------------------------------------
 * This is a good-faith starting draft that describes the standard we build to.
 * Every comment marked
 *   REVIEW:
 * flags a value or claim the web team must verify against the live site before
 * this statement is published. Never claim conformance you have not tested.
 * ============================================================================
 */
export default function Accessibility() {
  return (
    <>
      <Seo
        title="Accessibility statement"
        description={`How ${site.name} makes this website accessible, the standard we aim for, and how to tell us about a barrier you have found.`}
        path="/accessibility"
      />

      <PageHero
        eyebrow="Legal"
        title="Accessibility statement"
        lede="We want everyone to be able to use this website — including people living with sickle cell disease, their families, and anyone using assistive technology."
        crumbs={[{ label: 'Accessibility statement' }]}
        art={null}
      />

      <section className="section">
        <div className="container legal-layout">
          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ul className="toc__list">
              <li><a className="toc__link" href="#commitment">Our commitment</a></li>
              <li><a className="toc__link" href="#standard">The standard we aim for</a></li>
              <li><a className="toc__link" href="#what-we-do">What we do</a></li>
              <li><a className="toc__link" href="#known-issues">Known limitations</a></li>
              <li><a className="toc__link" href="#feedback">Tell us about a problem</a></li>
              <li><a className="toc__link" href="#enforcement">If we cannot help</a></li>
              <li><a className="toc__link" href="#changes">Changes to this statement</a></li>
            </ul>
          </nav>

          <div>
            <p className="legal-meta">
              <span>
                <strong>Last updated:</strong> <span className="ph">DD Month YYYY</span>
              </span>
              <span>
                <strong>Applies to:</strong> {site.name} website
              </span>
            </p>

            {/*
              REVIEW: this statement must not claim conformance until the live
              site has been audited against the standard it names. Complete the
              placeholder below before publishing.
            */}
            <Callout tone="warning" title="Draft — complete before publishing" icon="accessibility">
              This is a starting draft. Before it is published, the web team must confirm the
              standard named below, test the live site against it, and complete the known
              limitations and feedback sections. <PlaceholderTag />
            </Callout>

            <div className="prose" style={{ marginTop: 'var(--sp-6)' }}>
              <section aria-labelledby="commitment">
                <h2 id="commitment">1. Our commitment</h2>
                <p>
                  {site.name} is committed to making this website usable by everyone. Many of the
                  people we serve live with a long-term health condition, and we know that fatigue,
                  pain and treatment can make using a website harder. We want this site to be calm,
                  clear and forgiving to use on the days when nothing is easy.
                </p>
                <p>
                  Accessibility is not a one-off project. We check it when we add pages and features,
                  and we treat a reported barrier as a bug to fix.
                </p>
              </section>

              <section aria-labelledby="standard">
                <h2 id="standard">2. The standard we aim for</h2>
                <p>
                  We aim to meet the{' '}
                  <strong>Web Content Accessibility Guidelines (WCAG) 2.2, Level AA</strong>, the
                  internationally recognised standard for web accessibility. Where we fall short, we
                  want to say so and fix it.
                </p>
                <p>
                  {/* REVIEW: state the real target and any legal standard that
                      applies in your jurisdiction, then confirm it with testing. */}
                  The specific standard and legal requirement that applies to {site.name} is{' '}
                  <span className="ph">REPLACE — confirm standard and any legal duty</span>.{' '}
                  <PlaceholderTag>REVIEW</PlaceholderTag>
                </p>
              </section>

              <section aria-labelledby="what-we-do">
                <h2 id="what-we-do">3. What we do to make this site accessible</h2>
                <ul>
                  <li>
                    <strong>Keyboard access.</strong> Everything can be operated with a keyboard
                    alone, with a visible focus outline on every control.
                  </li>
                  <li>
                    <strong>Semantic structure.</strong> Pages use real headings, lists, tables and
                    landmarks, so screen readers can navigate them.
                  </li>
                  <li>
                    <strong>Text alternatives.</strong> Meaningful images carry alternative text, and
                    decorative graphics are hidden from assistive technology.
                  </li>
                  <li>
                    <strong>Colour and contrast.</strong> Body text meets the AA contrast ratio, and
                    colour is never the only way information is conveyed.
                  </li>
                  <li>
                    <strong>Resizable text.</strong> The layout works when text is enlarged, and it
                    reflows on small screens without horizontal scrolling.
                  </li>
                  <li>
                    <strong>Motion safety.</strong> Decorative animation stops for anyone who has
                    asked their device to reduce motion.
                  </li>
                  <li>
                    <strong>Forms.</strong> Every field has a label, errors are described in text and
                    announced, and nothing depends on colour alone.
                  </li>
                  <li>
                    <strong>Plain language.</strong> We write for the reader, not for the award, and
                    we explain medical terms rather than assuming them.
                  </li>
                </ul>
              </section>

              <section aria-labelledby="known-issues">
                <h2 id="known-issues">4. Known limitations</h2>
                <p>
                  We would rather be honest than claim perfection. The limitations below are known
                  and being worked on.
                </p>
                <ul>
                  <li>
                    {/* REVIEW: list genuine, current limitations after testing. */}
                    <span className="ph">REPLACE — list known accessibility limitations, or state
                    that none are currently known</span>. <PlaceholderTag>REVIEW</PlaceholderTag>
                  </li>
                  <li>
                    Some downloadable documents may not be fully accessible. We can supply the
                    content in another format on request.
                  </li>
                  <li>
                    A third-party embedded map or payment page may not fully meet our own standard.
                  </li>
                </ul>
              </section>

              <section aria-labelledby="feedback">
                <h2 id="feedback">5. Tell us about a problem</h2>
                <p>
                  If you find something on this site that you cannot use, please tell us. We want to
                  fix it, and your report is the fastest way we find out.
                </p>
                <ul>
                  <li>
                    Email <a href={`mailto:${site.email}`}>{site.email}</a> with the subject line
                    “Accessibility”.
                  </li>
                  <li>
                    Call <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>.
                  </li>
                  <li>
                    Write to {site.addressLine1}, {site.addressLine2}, {site.country}.
                  </li>
                </ul>
                <p>
                  {/* REVIEW: agree a real response commitment with the team. */}
                  We aim to acknowledge accessibility reports within{' '}
                  <span className="ph">REPLACE — e.g. 5 working days</span>.{' '}
                  <PlaceholderTag>REVIEW</PlaceholderTag>
                </p>
              </section>

              <section aria-labelledby="enforcement">
                <h2 id="enforcement">6. If we cannot help</h2>
                <p>
                  If you contact us about accessibility and you are not satisfied with our response,
                  you may be able to escalate the matter. The route depends on where you are and on
                  the law that applies.
                </p>
                <p>
                  {/* REVIEW: name the relevant escalation route in your
                      jurisdiction, where one exists. */}
                  The escalation route in your jurisdiction is{' '}
                  <span className="ph">REPLACE — relevant body or regulator, with contact
                  details</span>. <PlaceholderTag>REVIEW</PlaceholderTag>
                </p>
              </section>

              <section aria-labelledby="changes">
                <h2 id="changes">7. Changes to this statement</h2>
                <p>
                  We review this statement when we make significant changes to the site, and at least
                  once a year. When we update it, we change the “Last updated” date at the top of the
                  page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight section--alt">
        <div className="container">
          <p className="small muted">
            See also:{' '}
            {legalPages
              .filter((p) => p.to !== '/accessibility')
              .map((p, i, arr) => (
                <span key={p.to}>
                  <Link to={p.to}>{p.label}</Link>
                  {i < arr.length - 1 ? ', ' : ''}
                </span>
              ))}
          </p>
        </div>
      </section>
    </>
  )
}
