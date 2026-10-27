import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHero, Callout, PlaceholderTag } from '../components/Ui'
import { site, legalPages } from '../data/site'

/**
 * Terms — terms of use for this website.
 *
 * ============================================================================
 * DRAFT TEMPLATE — THIS IS NOT LEGAL ADVICE AND MUST NOT BE RELIED UPON YET.
 * ---------------------------------------------------------------------------
 * Plain-language starting draft only. Every comment marked
 *   LEGAL-REVIEW:
 * flags wording or a value that a lawyer qualified in the relevant
 * jurisdiction must settle before these terms are published or relied upon.
 * The visible warning callout near the top is the reader-facing notice.
 * ============================================================================
 */
export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of use"
        description={`The terms on which you may use the ${site.name} website, including intellectual property, user submissions, medical disclaimers, donations and liability.`}
        path="/terms"
      />

      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        lede={`These terms govern your use of the ${site.name} website. By using the site you accept them, so please read them carefully.`}
        crumbs={[{ label: 'Terms of use' }]}
        art={null}
      />

      <section className="section">
        <div className="container legal-layout">
          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ul className="toc__list">
              <li><a className="toc__link" href="#acceptance">Acceptance of these terms</a></li>
              <li><a className="toc__link" href="#about">About the foundation</a></li>
              <li><a className="toc__link" href="#permitted-use">Permitted use of the site</a></li>
              <li><a className="toc__link" href="#ip">Intellectual property</a></li>
              <li><a className="toc__link" href="#submissions">User submissions</a></li>
              <li><a className="toc__link" href="#no-medical-advice">No medical advice</a></li>
              <li><a className="toc__link" href="#accuracy-links">Accuracy &amp; third-party links</a></li>
              <li><a className="toc__link" href="#donations">Donations</a></li>
              <li><a className="toc__link" href="#liability">Limitation of liability</a></li>
              <li><a className="toc__link" href="#indemnity">Indemnity</a></li>
              <li><a className="toc__link" href="#governing-law">Governing law</a></li>
              <li><a className="toc__link" href="#changes">Changes to these terms</a></li>
              <li><a className="toc__link" href="#contact">How to contact us</a></li>
            </ul>
          </nav>

          <div>
            <p className="legal-meta">
              <span>
                <strong>Last updated:</strong> <span className="ph">DD Month YYYY</span>
              </span>
              <span>
                <strong>Applies to:</strong> {site.name}
              </span>
            </p>

            {/*
              LEGAL-REVIEW: DRAFT NOTICE. This template has not been reviewed by a
              lawyer. Keep the on-page notice visible until a qualified lawyer
              signs the terms off. Never present these as binding terms in their
              current form.
            */}
            <Callout tone="warning" title="Draft — needs legal review">
              This is a starting template, not finished legal wording. It must be reviewed and
              approved by a lawyer qualified in the relevant jurisdiction before {site.name} relies
              on it. Every highlighted value and clause must be confirmed or replaced. Parts of
              these terms (in particular liability, indemnity and governing law) are intentionally
              incomplete. <PlaceholderTag />
            </Callout>

            <div className="prose" style={{ marginTop: 'var(--sp-6)' }}>
              {/* ============================================================= */}
              <section aria-labelledby="acceptance">
                <h2 id="acceptance">1. Acceptance of these terms</h2>
                <p>
                  These terms of use (“terms”) apply to this website and to any content, forms or
                  services made available through it. By accessing or using the site you agree to be
                  bound by these terms. If you do not agree with them, please do not use the site.
                </p>
                <p>
                  If you use the site on behalf of an organisation, you confirm that you have
                  authority to accept these terms for that organisation. Where you use the site as a
                  parent or guardian on behalf of a child, you accept these terms on their behalf.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="about">
                <h2 id="about">2. About the foundation</h2>
                <p>
                  This website is operated by {site.name}, a not-for-profit sickle cell organisation
                  based in {site.city}, {site.state}, {site.country}, at {site.addressLine1},{' '}
                  {site.addressLine2}. We are registered as a charity under registration number{' '}
                  <span className="ph">{site.registrationNumber}</span>. You can reach us using the
                  details in section 13.
                </p>
                <p>
                  This website provides information about sickle cell disease and about our
                  awareness, screening, support and advocacy work, and it allows visitors to donate,
                  volunteer, subscribe, submit their own story and contact us.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="permitted-use">
                <h2 id="permitted-use">3. Permitted use of the site</h2>
                <p>
                  You may use this website for lawful, personal and non-commercial purposes, and to
                  learn about or support our work. You agree <strong>not</strong> to:
                </p>
                <ul>
                  <li>
                    use the site in any way that breaks the law or infringes anyone’s rights;
                  </li>
                  <li>
                    attempt to gain unauthorised access to the site, its servers or any connected
                    system, or interfere with its normal operation;
                  </li>
                  <li>
                    introduce viruses, malware or any other harmful material, or use automated tools
                    to scrape content in a way that places unreasonable load on the site;
                  </li>
                  <li>
                    copy, reproduce, republish or distribute substantial parts of the site for
                    commercial purposes without our written permission; or
                  </li>
                  <li>
                    misrepresent your identity, impersonate the foundation, or suggest that we
                    endorse you when we do not.
                  </li>
                </ul>
                <p>
                  We may suspend or withdraw access to the site, or to any part of it, at any time,
                  including where we believe these terms have been broken.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="ip">
                <h2 id="ip">4. Intellectual property</h2>
                <p>
                  All content on this website — including the text, the foundation’s name, logo and
                  wordmark, the page design, and the illustrations — is owned by {site.name} or
                  licensed to us, and is protected by copyright and other intellectual property
                  laws. All rights are reserved.
                </p>
                <p>
                  The illustrations on this site, including the red blood cell and sickle cell
                  graphics, are <strong>original SVG artwork created for the foundation</strong>.
                  They are not stock images and may not be copied, re-used or redistributed without
                  our written permission.
                </p>
                <p>You may:</p>
                <ul>
                  <li>view and print pages for your own personal, non-commercial use;</li>
                  <li>
                    share links to our pages, and quote short extracts with clear attribution to{' '}
                    {site.name} and a link back to the page; and
                  </li>
                  <li>
                    download our own resource guides where a download link is provided, for personal
                    or educational use.
                  </li>
                </ul>
                <p>
                  Any other use — including reproduction on another website, in a publication, or in
                  advertising — requires our prior written consent. Please contact us if you would
                  like to use our material.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="submissions">
                <h2 id="submissions">5. User submissions</h2>
                <p>
                  From time to time we invite you to submit content, such as your story, a
                  testimonial, a photograph, an enquiry or feedback (“submission”). When you submit
                  content, these rules apply.
                </p>

                <h3>Consent is required</h3>
                <p>
                  Where a submission includes a personal story, a name, a photograph or health
                  information, you must have the right to share it and must give us your consent to
                  use it. If the submission is about, shows or identifies anyone else — in particular
                  a child — you must have their permission, or the permission of their parent or
                  guardian, before sending it to us.
                </p>

                <h3>The licence you grant us</h3>
                <p>
                  {/* LEGAL-REVIEW: the scope, term and territorial reach of the
                      content licence are legal choices the client must make. */}
                  By submitting content, you grant {site.name} a{' '}
                  <span className="ph">REPLACE — worldwide, non-exclusive, royalty-free,
                  perpetual licence</span> to use, reproduce, edit for length and clarity, publish
                  and display that content on our website, in our printed materials and on our
                  social media channels, in connection with our charitable work.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>

                <h3>Your promises and our rights</h3>
                <ul>
                  <li>
                    You confirm the submission is your own, or that you have permission to share it,
                    and that it does not break anyone’s rights or any law.
                  </li>
                  <li>
                    You keep ownership of your submission; the licence above simply lets us use it.
                  </li>
                  <li>
                    We are not obliged to publish any submission, and we may edit, decline or remove
                    content at our discretion, including if it is inaccurate, offensive or a risk to
                    someone’s privacy.
                  </li>
                  <li>
                    You can ask us to stop using your submission in future by contacting us, and we
                    will do so where we reasonably can — though we may not be able to recall
                    materials already printed or shared.
                  </li>
                </ul>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="no-medical-advice">
                <h2 id="no-medical-advice">6. No medical advice</h2>

                <Callout tone="alert" title="This website is not medical advice" icon="alert">
                  The information on this website is provided for general education only. It is{' '}
                  <strong>not</strong> a diagnosis, and it is not a substitute for advice, diagnosis
                  or treatment from a qualified health professional. Always seek the advice of your
                  doctor or another qualified health professional about any medical condition, and
                  never delay seeking it because of something you have read on this site.
                </Callout>

                <p>
                  Nothing on this website should be understood as a recommendation to start, stop or
                  change any treatment. Sickle cell disease affects people differently, and care
                  decisions can only be made by a clinician who knows your individual situation.
                </p>
                <p>
                  <strong>In an emergency, do not rely on this website.</strong> Call{' '}
                  <a href={`tel:${site.emergencyNumber}`}>{site.emergencyNumber}</a> or go to{' '}
                  {site.hospitalNote} immediately. If you are in a pain crisis and cannot control
                  the pain at home, or if there is fever, chest pain or difficulty breathing, seek
                  urgent medical help straight away.
                </p>
                <p>
                  The content on this site is reviewed by our medical advisers, but it is written for
                  a general audience and cannot take account of your individual circumstances.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="accuracy-links">
                <h2 id="accuracy-links">7. Accuracy and third-party links</h2>
                <p>
                  We work hard to keep our information accurate and up to date, and where we publish
                  medical statements they are reviewed by clinicians. Even so, the site is provided
                  on an “as is” basis, and we cannot guarantee that every item is complete, current
                  or error-free, particularly as medical understanding changes over time.
                </p>
                <p>
                  Our website links to sources such as the World Health Organization (WHO), the
                  United States National Institutes of Health (NIH), the Centers for Disease Control
                  and Prevention (CDC) and similar bodies. These links are provided for information
                  only. A link is <strong>not</strong> an endorsement of that organisation, nor
                  evidence that it endorses us, and we are not responsible for the content, accuracy
                  or availability of any external site.
                </p>
                <p>
                  Where you rely on information from this site or from a linked third party, you do
                  so at your own risk.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="donations">
                <h2 id="donations">8. Donations</h2>
                <p>
                  Donations made through this website, or arranged with us directly, are handled
                  under our <Link to="/refund-policy">Donation &amp; refund policy</Link>, which
                  sets out how recurring gifts work, when a refund may be possible, and how to
                  request one. By making a donation you also agree to that policy.
                </p>
                <p>
                  We are grateful for every gift. Donations are used to fund our charitable work;
                  our published fund allocation sets out how money is applied. Unless expressly
                  stated, a donation is a gift and does not create any obligation on us to provide a
                  particular service or benefit.
                </p>
                <p>
                  {/* LEGAL-REVIEW: confirm the treatment of donations, any
                      restricted/unrestricted distinctions and tax receipts with
                      the foundation's advisers. */}
                  Where you designate a gift for a particular programme, we will use it for that
                  purpose where we can; if a programme is fully funded or closes, we may apply the
                  gift to our work more broadly.{' '}
                  <span className="ph">REPLACE — confirm your restricted-donation wording</span>.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="liability">
                <h2 id="liability">9. Limitation of liability</h2>
                <p>
                  Nothing in these terms excludes or limits our liability where it would be unlawful
                  to do so, including liability for death or personal injury caused by our
                  negligence, or for fraud.
                </p>
                <p>
                  {/* LEGAL-REVIEW: the entire liability clause below is a
                      placeholder. The type and level of any cap, and the
                      carve-outs, are matters for the client's lawyer under the
                      governing law chosen in section 11. */}
                  Subject to the paragraph above, and to the fullest extent permitted by law,{' '}
                  {site.name} <span className="ph">REPLACE — excludes or limits its liability
                  for loss or damage arising from your use of the site, including indirect or
                  consequential loss, and caps any remaining liability at REPLACE — amount</span>.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
                <p>
                  We do not guarantee that the site will be uninterrupted, secure or free from
                  errors, or that any downloadable material is free from viruses or other harmful
                  components. You are responsible for your own security measures, including
                  protecting your devices and data.
                </p>
                <p>
                  This clause must be drafted by a qualified lawyer before the terms are published.
                  It is deliberately left incomplete here.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="indemnity">
                <h2 id="indemnity">10. Indemnity</h2>
                <p>
                  You agree to indemnify and hold {site.name}, its trustees, staff and volunteers
                  harmless against any claims, losses, liabilities, damages and costs (including
                  reasonable legal fees) arising from your use of the site or your breach of these
                  terms — including any claim that content you submitted infringes someone else’s
                  rights or breaches their privacy.
                </p>
                <p>
                  {/* LEGAL-REVIEW: in many jurisdictions an indemnity such as this
                      is unenforceable or must be narrowed when given by a
                      consumer. It must be reviewed before publication. */}
                  <span className="ph">REPLACE — confirm the scope and enforceability of this
                  indemnity</span>. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="governing-law">
                <h2 id="governing-law">11. Governing law and jurisdiction</h2>
                <p>
                  {/* LEGAL-REVIEW: the governing law and the courts that hear
                      disputes are jurisdiction-specific and must be chosen by the
                      client's lawyer. This is intentionally a placeholder. */}
                  These terms are governed by the laws of{' '}
                  <span className="ph">REPLACE — governing law, e.g. the laws of the Federal
                  Republic of Nigeria</span>, and the courts of{' '}
                  <span className="ph">REPLACE — jurisdiction, e.g. the courts of Kaduna State</span>{' '}
                  have exclusive jurisdiction over any dispute arising from them.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
                <p>
                  If any part of these terms is found to be unlawful or unenforceable, the rest will
                  continue to apply. These terms, together with our{' '}
                  <Link to="/privacy">privacy policy</Link>, the{' '}
                  <Link to="/cookies">cookie notice</Link> and the{' '}
                  <Link to="/refund-policy">donation &amp; refund policy</Link>, are the whole
                  agreement between you and us about the use of this site.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="changes">
                <h2 id="changes">12. Changes to these terms</h2>
                <p>
                  We may revise these terms at any time by updating this page and the “Last updated”
                  date above. The version in force when you use the site is the version that applies
                  to that use. If the changes are significant, we will take reasonable steps to make
                  that clear, such as a notice on the website.
                </p>
                <p>
                  We encourage you to check this page from time to time so that you are aware of the
                  terms that apply to you.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="contact">
                <h2 id="contact">13. How to contact us</h2>
                <p>
                  If you have any questions about these terms, or would like to ask for permission to
                  use our content, please contact:
                </p>
                <ul>
                  <li>
                    Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                  <li>
                    Phone: <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
                  </li>
                  <li>
                    Post: {site.name}, {site.addressLine1}, {site.addressLine2}, {site.country}
                  </li>
                </ul>
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
              .filter((p) => p.to !== '/terms')
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
