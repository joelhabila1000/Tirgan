import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHero, Callout, PlaceholderTag } from '../components/Ui'
import { site, legalPages } from '../data/site'

/**
 * Cookies — the cookie notice.
 *
 * ============================================================================
 * DRAFT TEMPLATE — THIS IS NOT LEGAL ADVICE AND MUST NOT BE RELIED UPON YET.
 * ---------------------------------------------------------------------------
 * Every comment marked
 *   LEGAL-REVIEW:
 * flags a value or wording a lawyer (or the client's web team) must settle
 * before this notice is published or relied upon. The visible warning callout
 * near the top is the reader-facing notice.
 * ============================================================================
 */
export default function Cookies() {
  return (
    <>
      <Seo
        title="Cookie notice"
        description={`Which cookies the ${site.name} website uses, what they do, how long they last, and how to control them in your browser.`}
        path="/cookies"
      />

      <PageHero
        eyebrow="Legal"
        title="Cookie notice"
        lede={`This notice explains what cookies are, which ones this website uses, and how you can control them.`}
        crumbs={[{ label: 'Cookie notice' }]}
        art={null}
      />

      <section className="section">
        <div className="container legal-layout">
          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ul className="toc__list">
              <li><a className="toc__link" href="#what-are-cookies">What cookies are</a></li>
              <li><a className="toc__link" href="#categories">The cookies we use</a></li>
              <li><a className="toc__link" href="#cookie-table">List of cookies</a></li>
              <li><a className="toc__link" href="#browser-controls">Controlling cookies</a></li>
              <li><a className="toc__link" href="#effect">Effect of disabling cookies</a></li>
              <li><a className="toc__link" href="#your-choice">Changing your choice</a></li>
              <li><a className="toc__link" href="#third-party">Third-party cookies</a></li>
              <li><a className="toc__link" href="#changes">Changes to this notice</a></li>
              <li><a className="toc__link" href="#contact">Contact</a></li>
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
              LEGAL-REVIEW: DRAFT NOTICE. Keep visible until a qualified lawyer
              has reviewed this notice, and until the analytics/marketing cookie
              rows have been filled in with the real cookie names.
            */}
            <Callout tone="warning" title="Draft — needs legal review">
              This is a starting template, not finished legal wording. It must be reviewed and
              approved by a lawyer qualified in the relevant jurisdiction before {site.name} relies
              on it. The analytics and marketing cookie rows below are placeholders and must be
              filled in with the real cookie names, purposes and durations before launch.{' '}
              <PlaceholderTag />
            </Callout>

            <div className="prose" style={{ marginTop: 'var(--sp-6)' }}>
              {/* ============================================================= */}
              <section aria-labelledby="what-are-cookies">
                <h2 id="what-are-cookies">1. What cookies are</h2>
                <p>
                  Cookies are small text files that a website places on your device when you visit
                  it. They are widely used to make websites work, to remember your choices, and to
                  help the site owner understand how the site is used. Some cookies last only until
                  you close your browser (session cookies); others stay for a set period or until you
                  delete them (persistent cookies).
                </p>
                <p>
                  We also use your browser’s <strong>local storage</strong> for a similar purpose —
                  to remember a small choice you have made on this site. Where this notice refers to
                  “cookies”, it includes comparable technologies such as local storage, unless we say
                  otherwise.
                </p>
                <p>
                  This notice should be read alongside our <Link to="/privacy">privacy policy</Link>,
                  which explains more broadly how we handle personal data.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="categories">
                <h2 id="categories">2. The categories of cookies we use</h2>

                <h3>Strictly necessary</h3>
                <p>
                  These are needed for the website to work and cannot usually be switched off. They
                  include remembering whether you have already seen and answered our cookie banner.
                  This site stores your cookie choice in your browser’s local storage under the key{' '}
                  <code>tf-cookie-choice</code>. Because it is essential to respecting your choice,
                  it is not optional and it contains no personal information.
                </p>

                <h3>Analytics</h3>
                {/* LEGAL-REVIEW: confirm which analytics tool (if any) will be
                    used, its cookie names and durations, and that it is not
                    loaded until the visitor opts in. */}
                <p>
                  Analytics cookies help us understand how many people visit the site and which
                  pages they find useful. <strong>No analytics cookies are enabled until you opt
                  in.</strong> If and when analytics are switched on, the tool we use will be{' '}
                  <span className="ph">REPLACE — analytics provider name</span> and it will only run
                  after you consent. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>

                <h3>Marketing</h3>
                <p>
                  Marketing cookies are used to track visitors across websites so that advertising
                  can be shown. <strong>This website uses no marketing cookies by default</strong>,
                  and we do not run advertising trackers. If that ever changes, this notice and the
                  cookie table below will be updated first and your consent will be requested.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="cookie-table">
                <h2 id="cookie-table">3. List of cookies</h2>
                <p>
                  The table below lists the cookie this site currently sets, together with the
                  categories we may use in future. Rows marked as placeholders must be completed
                  before any analytics or marketing cookie is enabled.
                </p>

                <div className="table-wrap">
                  <table className="data-table">
                    <caption>
                      Cookies and comparable storage used by this website.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Type</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <code>tf-cookie-choice</code>
                        </td>
                        <td>
                          Records whether you have accepted or declined optional cookies, so that the
                          banner does not reappear on every page.
                        </td>
                        <td>Strictly necessary (local storage)</td>
                        <td>Persists until you clear your browser storage</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="ph">REPLACE — e.g. _ga</span>
                        </td>
                        <td>
                          Analytics: distinguishes visitors and counts page views once you have opted
                          in. <PlaceholderTag />
                        </td>
                        <td>Analytics (third party)</td>
                        <td>
                          <span className="ph">REPLACE — e.g. up to 2 years</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="ph">REPLACE — e.g. _gid</span>
                        </td>
                        <td>
                          Analytics: distinguishes visitors for a short period. <PlaceholderTag />
                        </td>
                        <td>Analytics (third party)</td>
                        <td>
                          <span className="ph">REPLACE — e.g. 24 hours</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="ph">REPLACE — marketing cookie name</span>
                        </td>
                        <td>
                          Only if marketing is ever enabled. None are used by default.{' '}
                          <PlaceholderTag />
                        </td>
                        <td>Marketing</td>
                        <td>
                          <span className="ph">REPLACE — duration</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  {/* LEGAL-REVIEW: the cookie table must reflect the live site.
                      Complete it before publishing and keep it accurate. */}
                  Every “REPLACE” row must be completed with the real name, purpose and duration, or
                  removed if that category is not used.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="browser-controls">
                <h2 id="browser-controls">4. How to control cookies in your browser</h2>
                <p>
                  You can set your browser to block or delete cookies and site data. The steps differ
                  slightly between browsers; the guidance below is correct at the time of writing,
                  and you can always find the current steps in your browser’s own help pages.
                </p>
                <ul>
                  <li>
                    <strong>Google Chrome</strong> — open Settings, then “Privacy and security”, then
                    “Third-party cookies” (or “Site settings → Cookies and site data”). To remove
                    what is already stored, click the padlock icon in the address bar, choose
                    “Cookies and site data”, and delete the entries you want to remove.
                  </li>
                  <li>
                    <strong>Apple Safari</strong> — on macOS open Settings and choose “Privacy”, then
                    “Manage Website Data” to view or remove what is stored. On iPhone or iPad, open
                    the Settings app, choose Safari, then “Advanced” and “Website Data”.
                  </li>
                  <li>
                    <strong>Mozilla Firefox</strong> — open Settings, choose “Privacy &amp; Security”,
                    and use the “Cookies and Site Data” section. Use “Manage Data” to remove
                    individual cookies, or “Clear Data” to remove them all.
                  </li>
                  <li>
                    <strong>Microsoft Edge</strong> — open Settings, choose “Cookies and site
                    permissions”, then “Manage and delete cookies and site data”. You can block
                    third-party cookies here, and delete existing database entries.
                  </li>
                </ul>
                <p>
                  You can also use your browser’s private or incognito mode, which discards most
                  cookies and site data when you close the window.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="effect">
                <h2 id="effect">5. The effect of disabling cookies</h2>
                <p>
                  If you block or delete cookies and local storage, the strictly necessary entry that
                  remembers your cookie choice is also removed. This means the cookie banner will
                  appear again the next time you visit, because the site cannot tell that you have
                  already made a choice.
                </p>
                <p>
                  Blocking optional cookies does not otherwise stop you using the site. It does mean
                  we cannot measure how the site is used, which makes it harder for us to improve it.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="your-choice">
                <h2 id="your-choice">6. How to change your choice on this site</h2>
                <p>
                  When you first visit, a banner asks whether you accept optional cookies. Your
                  answer is stored under <code>tf-cookie-choice</code> so that we do not ask again.
                </p>
                <p>
                  {/* LEGAL-REVIEW: describe the real mechanism for changing a
                      stored choice. If there is a settings link or button,
                      name it here. If the only way is clearing storage, say so
                      plainly. REPLACE the placeholder. */}
                  To change your choice, <span className="ph">REPLACE — describe how a visitor
                  re-opens cookie settings on this site</span>. If you have cleared your browser’s
                  storage, the banner will simply reappear the next time you visit and you can choose
                  again. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="third-party">
                <h2 id="third-party">7. Third-party cookies</h2>
                <p>
                  Some features we may add to the site are provided by other companies and can set
                  their own cookies. These may include an embedded map and our payment provider when
                  you go to the donation page. We do not control those third-party cookies, and their
                  use is governed by the privacy and cookie policies of the companies that set them.
                </p>
                <p>
                  {/* LEGAL-REVIEW: list each third party that sets cookies on the
                      live site, with a link to its policy. */}
                  The third parties that may set cookies on this site are{' '}
                  <span className="ph">REPLACE — list each provider and link to its cookie
                  policy</span>. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="changes">
                <h2 id="changes">8. Changes to this notice</h2>
                <p>
                  We may update this notice if we change the cookies we use or if the law changes.
                  When we do, we will update the “Last updated” date at the top of this page. If the
                  change affects optional cookies, we will ask for your consent again.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="contact">
                <h2 id="contact">9. Contact</h2>
                <p>
                  If you have a question about cookies or about this notice, please contact us at{' '}
                  <a href={`mailto:${site.email}`}>{site.email}</a> or on {site.phoneDisplay}. You
                  can also write to us at {site.addressLine1}, {site.addressLine2}, {site.country}.
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
              .filter((p) => p.to !== '/cookies')
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
