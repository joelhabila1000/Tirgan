import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHero, Callout, PlaceholderTag } from '../components/Ui'
import { site, legalPages } from '../data/site'

/**
 * Privacy — the foundation's data protection policy.
 *
 * ============================================================================
 * DRAFT TEMPLATE — THIS IS NOT LEGAL ADVICE AND MUST NOT BE RELIED UPON YET.
 * ---------------------------------------------------------------------------
 * This page is a genuine, plain-language starting draft. It is NOT the
 * organisation's binding legal terms. Every comment below marked
 *   LEGAL-REVIEW:
 * flags wording, a value or a legal reference that a qualified lawyer
 * (qualified in Nigeria and in any other jurisdiction the foundation operates
 * in) must settle before this policy is published or relied upon.
 * The block below the meta line is the visible review notice for readers.
 * ============================================================================
 */
export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy policy"
        description={`How ${site.name} collects, uses, shares and protects your personal data, including the health information you choose to share with us.`}
        path="/privacy"
      />

      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lede={`This policy explains what personal information ${site.name} collects, why we hold it, who we share it with, and the choices and rights you have over it.`}
        crumbs={[{ label: 'Privacy policy' }]}
        art={null}
      />

      <section className="section">
        <div className="container legal-layout">
          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ul className="toc__list">
              <li><a className="toc__link" href="#who-we-are">Who we are</a></li>
              <li><a className="toc__link" href="#what-we-collect">What data we collect</a></li>
              <li><a className="toc__link" href="#lawful-basis">Lawful basis &amp; health data</a></li>
              <li><a className="toc__link" href="#how-we-use">How we use your data</a></li>
              <li><a className="toc__link" href="#sharing">Who we share it with</a></li>
              <li><a className="toc__link" href="#transfers">International transfers</a></li>
              <li><a className="toc__link" href="#retention">How long we keep it</a></li>
              <li><a className="toc__link" href="#your-rights">Your rights</a></li>
              <li><a className="toc__link" href="#children">Children’s data</a></li>
              <li><a className="toc__link" href="#security">Data security</a></li>
              <li><a className="toc__link" href="#complaints">How to complain</a></li>
              <li><a className="toc__link" href="#changes">Changes to this policy</a></li>
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
              LEGAL-REVIEW: DRAFT NOTICE. This template was not written by a
              lawyer. It must be reviewed by a qualified lawyer in the relevant
              jurisdiction before it is relied upon. Do not remove this notice
              until a lawyer has signed it off. Keep the on-page notice in sync
              with this comment.
            */}
            <Callout tone="warning" title="Draft — needs legal review">
              This is a starting template, not finished legal wording. It must be reviewed and
              approved by a lawyer qualified in the relevant jurisdiction — including{' '}
              <span className="ph">Nigeria’s Data Protection Act 2023</span> and any other law that
              applies to {site.name} — before the foundation relies on it. Every highlighted value
              and clause must be confirmed or replaced. <PlaceholderTag />
            </Callout>

            <div className="prose" style={{ marginTop: 'var(--sp-6)' }}>
              {/* ============================================================= */}
              <section aria-labelledby="who-we-are">
                <h2 id="who-we-are">1. Who we are and how to contact us</h2>
                <p>
                  {site.name} (“we”, “us”, “our”) is a not-for-profit sickle cell organisation based
                  in {site.city}, {site.state}, {site.country}. Our address is{' '}
                  {site.addressLine1}, {site.addressLine2}, {site.country}. We are registered as a
                  charity under registration number <span className="ph">{site.registrationNumber}</span>
                  , and we run genotype screening, counselling, patient support and awareness
                  programmes for people living with sickle cell disease and their families.
                </p>
                <p>
                  For the purposes of applicable data protection law, we are the{' '}
                  <strong>data controller</strong> of the personal data described in this policy.
                  That means we decide why and how your personal data is used, and we are
                  responsible for looking after it. If the law requires us to register as a data
                  controller, our registration number is{' '}
                  <span className="ph">REPLACE — data controller registration number</span>.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>

                <h3>Contacting us about your data</h3>
                <p>You can reach us about anything in this policy using the details below:</p>
                <ul>
                  <li>
                    Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                  <li>
                    Phone: <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
                  </li>
                  <li>
                    Post: {site.addressLine1}, {site.addressLine2}, {site.country}
                  </li>
                </ul>
                <p>
                  {/* LEGAL-REVIEW: a statutory DPO is required in some cases.
                      Confirm whether the foundation must appoint one, and if so
                      supply the real name and contact route. */}
                  Data protection is handled by{' '}
                  <span className="ph">REPLACE — role or named data protection lead</span>. Where
                  the law requires us to appoint a formal Data Protection Officer, the appointed
                  officer is <span className="ph">REPLACE — DPO name</span>, reachable at{' '}
                  <span className="ph">REPLACE — DPO email</span>. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="what-we-collect">
                <h2 id="what-we-collect">2. What personal data we collect</h2>
                <p>
                  “Personal data” means any information that identifies you, or that could identify
                  you when combined with other information. Much of what we hold is given to us
                  directly by you; some is collected automatically when you use this website.
                </p>
                <p>Depending on how you interact with us, we may collect:</p>
                <ul>
                  <li>
                    <strong>Contact details</strong> — your name, email address, phone number and,
                    where relevant, your postal address or the address of a person you are
                    supporting.
                  </li>
                  <li>
                    <strong>Health information you choose to share</strong> — for example your or a
                    family member’s genotype (such as AA, AS or SS), a diagnosis, symptoms, current
                    medicines, treatment history, hospital appointments and any detail you include
                    in a support request, counselling note or story submission. This is{' '}
                    <strong>special category data</strong> and is treated with extra care (see
                    section 3).
                  </li>
                  <li>
                    <strong>Donation and payment metadata</strong> — the amount and date of a gift,
                    the currency, whether it is one-off or recurring, the payment reference and the
                    last four digits of the card used. We do <strong>not</strong> store your full
                    card number; payments are processed by our payment provider (see section 5).
                  </li>
                  <li>
                    <strong>Form submissions</strong> — enquiries, volunteer applications, programme
                    or assistance applications, partnership requests and event RSVPs, together with
                    whatever you type into those forms.
                  </li>
                  <li>
                    <strong>Newsletter subscriptions</strong> — your email address, the date you
                    subscribed and your communication preferences.
                  </li>
                  <li>
                    <strong>Cookies and analytics data</strong> — cookie identifiers, pages viewed,
                    the site you arrived from and how long you stayed.{' '}
                    <Link to="/cookies">Our cookie notice</Link> lists these in detail.
                  </li>
                  <li>
                    <strong>Technical data</strong> — your IP address, browser type, device type and
                    general location (usually only the city level), collected automatically by our
                    web host and security tools.
                  </li>
                </ul>
                <p>
                  We do not ask for information we do not need, and we ask you not to send us more
                  health detail than a particular conversation requires.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="lawful-basis">
                <h2 id="lawful-basis">3. Lawful basis, consent and health data</h2>
                <p>
                  Every use of your personal data must have a lawful basis. The bases we rely on
                  are set out below. Which one applies depends on why we hold the data.
                </p>

                <Callout tone="alert" title="Health data is special category data" icon="shield">
                  Information about your health — including your genotype, diagnosis, symptoms,
                  medicines and treatment — is <strong>special category data</strong> under data
                  protection law. We only collect it with your <strong>explicit consent</strong>, we
                  only use it to provide the support you have asked for, and we do not process it
                  for any other purpose without asking you again. You may withdraw that consent at
                  any time (see section 8).
                </Callout>

                <h3>The bases we rely on</h3>
                <ul>
                  <li>
                    <strong>Explicit consent</strong> — for the collection and use of health
                    information you voluntarily share with us, and for any clinical referral you ask
                    us to arrange. You give this consent in the form or conversation through which
                    you contact us, and you can withdraw it at any time.
                  </li>
                  <li>
                    <strong>Consent</strong> — for our newsletter and other marketing messages. You
                    opt in, and every message contains an unsubscribe link.
                  </li>
                  <li>
                    <strong>Legitimate interests</strong> — for responding to enquiries, keeping our
                    website secure, understanding how many people visit it, and running the
                    foundation responsibly, in each case balanced against your rights.
                  </li>
                  <li>
                    <strong>Contract</strong> — where we need to take steps you have requested, such
                    as processing a donation or administering a grant.
                  </li>
                  <li>
                    <strong>Legal obligation</strong> — where we must retain financial or other
                    records to meet a legal or regulatory duty.
                  </li>
                  <li>
                    <strong>Vital interests</strong> — in a genuine emergency, where it is necessary
                    to protect someone’s life or health and we cannot obtain consent in time.
                  </li>
                </ul>

                <p>
                  {/* LEGAL-REVIEW: confirm the exact statutory wording and any
                      additional conditions for processing special category data in
                      your jurisdiction. The references below are placeholders. */}
                  Where the law requires an additional condition for processing health data, we
                  rely on <span className="ph">REPLACE — the relevant statutory condition</span>{' '}
                  under <span className="ph">Nigeria’s Data Protection Act 2023</span>. The
                  regulator for data protection is assumed to be the{' '}
                  <span className="ph">Nigeria Data Protection Commission (NDPC)</span>. Confirm
                  both before publication. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="how-we-use">
                <h2 id="how-we-use">4. How we use your data</h2>
                <p>We use personal data only for the purposes for which we collected it. In practice, that means:</p>
                <ul>
                  <li>responding to your questions, requests for support and complaints;</li>
                  <li>
                    delivering our services — screening, counselling, care navigation, welfare and
                    financial assistance — and keeping a record of the support we have provided;
                  </li>
                  <li>
                    arranging a referral to a clinician, clinic or hospital where you ask us to;
                  </li>
                  <li>
                    processing and acknowledging donations, issuing receipts and meeting our
                    accounting and audit obligations;
                  </li>
                  <li>
                    sending updates, event invitations and appeals you have agreed to receive, and
                    measuring whether they are useful;
                  </li>
                  <li>
                    understanding how the website is used so that we can improve it, in aggregate
                    and — where analytics are enabled — in cookie-based form;
                  </li>
                  <li>
                    keeping the website and our systems secure, and preventing fraud or misuse; and
                  </li>
                  <li>
                    compiling anonymised statistics for our own reporting and advocacy, in which
                    nobody can be identified.
                  </li>
                </ul>
                <p>
                  We do <strong>not</strong> use your data for automated decision-making that
                  produces legal or similarly significant effects about you.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="sharing">
                <h2 id="sharing">5. Who we share your data with</h2>
                <p>
                  We never sell your personal data. We share it only where it is necessary, and only
                  with the categories of recipient described below. Each of these is a placeholder
                  you must name and contract with before launch.
                </p>
                <ul>
                  <li>
                    <strong>Payment processors</strong> — <span className="ph">REPLACE — payment
                    provider name(s)</span> handles card and bank payments on our behalf and
                    receives the details needed to take and refund a donation. <PlaceholderTag />
                  </li>
                  <li>
                    <strong>Email and communications providers</strong> —{' '}
                    <span className="ph">REPLACE — email service provider</span> sends our
                    newsletters and transactional messages and holds your email address on our
                    instructions. <PlaceholderTag />
                  </li>
                  <li>
                    <strong>Hosting, storage and analytics providers</strong> —{' '}
                    <span className="ph">REPLACE — host and analytics provider</span> keep the
                    website running and, where you allow analytics cookies, record how it is used.{' '}
                    <PlaceholderTag />
                  </li>
                  <li>
                    <strong>Clinicians and healthcare partners</strong> — where you ask us to refer
                    you or to share information with your doctor, hospital or counsellor, we share
                    only what is needed for that referral, and only with your explicit consent.
                  </li>
                  <li>
                    <strong>Professional advisers</strong> — our accountants, auditors and legal
                    advisers, where they need access to records to do their work.
                  </li>
                  <li>
                    <strong>Authorities and the law</strong> — we may disclose personal data to
                    regulators, law enforcement or courts where we are legally required to, or to
                    protect someone’s safety in an emergency.
                  </li>
                </ul>
                <p>
                  {/* LEGAL-REVIEW: if you process health data on behalf of
                      another organisation, or act as a processor, the roles and
                      any required data processing agreements must be documented. */}
                  Where any provider processes data on our behalf, we put a written contract in
                  place that limits them to acting on our instructions.{' '}
                  <span className="ph">REPLACE — confirm your processor-agreement wording</span>.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="transfers">
                <h2 id="transfers">6. International transfers</h2>
                <p>
                  Some of our service providers may store or process data outside {site.country} — for
                  example a cloud host, an email platform or a payment processor with data centres
                  in another region. When that happens, we take steps to make sure your data
                  continues to receive an adequate level of protection.
                </p>
                <p>
                  {/* LEGAL-REVIEW: name the actual transfer mechanism required in
                      your jurisdiction and confirm each provider's processing
                      location. Nothing here is binding until verified. */}
                  Where data is transferred outside {site.country}, we rely on{' '}
                  <span className="ph">REPLACE — the transfer safeguard you use (for example an
                  adequacy decision or approved contractual clauses)</span>, together with the
                  security measures described in section 10. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="retention">
                <h2 id="retention">7. How long we keep your data</h2>
                <p>
                  We keep personal data only for as long as we need it for the purpose we collected
                  it for, and then delete or anonymise it. The exact periods depend on the type of
                  data and on our legal and accounting duties. The figures below are placeholders
                  that our advisers must set.
                </p>
                <ul>
                  <li>
                    Donation and financial records:{' '}
                    <span className="ph">REPLACE — e.g. 7 years</span> from the end of the relevant
                    financial year. <PlaceholderTag />
                  </li>
                  <li>
                    Health and support records:{' '}
                    <span className="ph">REPLACE — e.g. X years after the last contact</span>, and
                    then securely destroyed. <PlaceholderTag />
                  </li>
                  <li>
                    Enquiry and form submissions:{' '}
                    <span className="ph">REPLACE — e.g. 24 months</span> after the matter is closed.{' '}
                    <PlaceholderTag />
                  </li>
                  <li>
                    Newsletter subscriptions: until you unsubscribe, plus a short period to honour
                    your request. <PlaceholderTag />
                  </li>
                  <li>
                    Website analytics and cookie data:{' '}
                    <span className="ph">REPLACE — e.g. 14 months</span>. <PlaceholderTag />
                  </li>
                </ul>
                <p>
                  {/* LEGAL-REVIEW: retention periods must reflect statutory
                      record-keeping duties and be justified. Confirm with a
                      lawyer and your accountant. */}
                  Every retention period above must be confirmed against the record-keeping
                  requirements that apply to {site.name}. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="your-rights">
                <h2 id="your-rights">8. Your rights</h2>
                <p>Subject to the law and to our other obligations, you have the right to:</p>
                <ul>
                  <li>
                    <strong>Access</strong> the personal data we hold about you and receive a copy
                    of it;
                  </li>
                  <li>
                    <strong>Correct</strong> data that is inaccurate or incomplete;
                  </li>
                  <li>
                    <strong>Delete</strong> your data where there is no good reason for us to keep
                    it;
                  </li>
                  <li>
                    <strong>Object</strong> to certain processing, including processing based on our
                    legitimate interests and any direct marketing;
                  </li>
                  <li>
                    <strong>Withdraw consent</strong> at any time where we rely on your consent —
                    including consent to hold your health information. Withdrawal does not affect
                    processing carried out before you withdrew;
                  </li>
                  <li>
                    <strong>Restrict</strong> how we use your data while a concern is being
                    resolved; and
                  </li>
                  <li>
                    <strong>Complain</strong> to the data protection authority (section 11).
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, email{' '}
                  <a href={`mailto:${site.email}`}>{site.email}</a> or write to us at the address in
                  section 1. We may need to verify your identity before we act, and we will respond
                  within <span className="ph">REPLACE — the statutory response window</span>.
                </p>
                <p>
                  {/* LEGAL-REVIEW: confirm the statutory rights and the exact
                      response deadline that apply in your jurisdiction. Some
                      rights may be qualified (for example where we must keep a
                      record by law). */}
                  These rights may be limited where we have a legal duty to keep data. Confirm the
                  exact set of rights and the response deadline.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="children">
                <h2 id="children">9. Children’s data</h2>
                <p>
                  Many of the people we support are children. This matters to us, and we handle
                  children’s data especially carefully.
                </p>
                <ul>
                  <li>
                    We collect a child’s health and contact information from a parent or guardian,
                    or from the child with a parent or guardian present. We do not knowingly collect
                    a young child’s data directly without that involvement.
                  </li>
                  <li>
                    Where a young person is old enough to understand, we ask for their agreement as
                    well, and we respect their views about what is shared.
                  </li>
                  <li>
                    We never publish a photograph, full name, school or identifying detail of a
                    child on this website or on social media without written consent from a parent
                    or guardian.
                  </li>
                  <li>
                    Parents and guardians can ask to see, correct or delete a child’s information at
                    any time using the contact details in section 1.
                  </li>
                </ul>
                <p>
                  {/* LEGAL-REVIEW: state the age at which consent must be given
                      by the child, the age of digital consent, and any extra
                      safeguards your jurisdiction requires for children. */}
                  Where the law sets an age below which a parent or guardian must consent, we treat
                  that age as <span className="ph">REPLACE — age of consent for children’s data</span>.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="security">
                <h2 id="security">10. Data security</h2>
                <p>
                  We take the security of your data seriously and use appropriate technical and
                  organisational measures to protect it. These include limiting access to those who
                  need it, using encrypted connections (HTTPS), keeping our website platform and
                  plugins up to date, choosing providers with strong security records, and training
                  our staff and volunteers on handling sensitive information confidentially.
                </p>
                <p>
                  No method of storage or transmission is completely secure. If a personal data
                  breach occurs that is likely to affect your rights, we will tell you and the
                  relevant authority without undue delay, as the law requires. Our internal breach
                  procedure is <span className="ph">REPLACE — reference your breach response
                  procedure</span>. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="complaints">
                <h2 id="complaints">11. How to make a complaint</h2>
                <p>
                  If you are unhappy with how we have handled your data, please tell us first — it is
                  usually the fastest way to put things right. Email{' '}
                  <a href={`mailto:${site.email}`}>{site.email}</a> with the subject line “Data
                  protection complaint”, or call {site.phoneDisplay}.
                </p>
                <p>
                  You also have the right to complain to the data protection authority at any time.
                  For {site.country}, we understand this to be the{' '}
                  <span className="ph">Nigeria Data Protection Commission (NDPC)</span>, reachable at{' '}
                  <span className="ph">REPLACE — authority website and contact details</span>.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="changes">
                <h2 id="changes">12. Changes to this policy</h2>
                <p>
                  We may update this policy from time to time — for example if our services change
                  or if the law changes. When we do, we will update the “Last updated” date at the
                  top of this page. If the change is significant, we will take reasonable steps to
                  tell you, such as a notice on the website or an email to subscribers.
                </p>
                <p>
                  Please check back periodically so that you always know how we handle your data.
                  This policy was last reviewed on{' '}
                  <span className="ph">DD Month YYYY</span>. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
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
              .filter((p) => p.to !== '/privacy')
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
