import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHero, Callout, PlaceholderTag } from '../components/Ui'
import { site, legalPages } from '../data/site'

/**
 * RefundPolicy — the donation and refund policy.
 *
 * ============================================================================
 * DRAFT TEMPLATE — THIS IS NOT LEGAL ADVICE AND MUST NOT BE RELIED UPON YET.
 * ---------------------------------------------------------------------------
 * Every comment marked
 *   LEGAL-REVIEW:
 * flags wording or a value that a lawyer qualified in the relevant
 * jurisdiction must settle, or a figure the client must decide, before this
 * policy is published or relied upon. The visible warning callout near the top
 * is the reader-facing notice.
 * ============================================================================
 */
export default function RefundPolicy() {
  return (
    <>
      <Seo
        title="Donation & refund policy"
        description={`How donations to ${site.name} work — one-off and monthly giving, how to cancel a recurring gift, and when a refund may be possible.`}
        path="/refund-policy"
      />

      <PageHero
        eyebrow="Legal"
        title="Donation &amp; refund policy"
        lede={`How giving to ${site.name} works, how to change or cancel a monthly gift, and the limited circumstances in which we can refund a donation.`}
        crumbs={[{ label: 'Donation & refund policy' }]}
        art={null}
      />

      <section className="section">
        <div className="container legal-layout">
          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ul className="toc__list">
              <li><a className="toc__link" href="#thanks">Our thanks and your trust</a></li>
              <li><a className="toc__link" href="#one-off">One-off donations</a></li>
              <li><a className="toc__link" href="#recurring">Monthly donations &amp; cancelling</a></li>
              <li><a className="toc__link" href="#refunds">Refunds</a></li>
              <li><a className="toc__link" href="#how-to-request">How to request a refund</a></li>
              <li><a className="toc__link" href="#approved">When a refund is approved</a></li>
              <li><a className="toc__link" href="#disputes">Failed &amp; disputed payments</a></li>
              <li><a className="toc__link" href="#tax">Tax receipts</a></li>
              <li><a className="toc__link" href="#in-kind">Gifts in kind &amp; in memoriam</a></li>
              <li><a className="toc__link" href="#changes">Changing or pausing monthly giving</a></li>
              <li><a className="toc__link" href="#complaints">Complaints &amp; escalation</a></li>
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
              has reviewed this policy. The refund window, timing and tax
              wording are placeholders.
            */}
            <Callout tone="warning" title="Draft — needs legal review">
              This is a starting template, not finished legal wording. It must be reviewed and
              approved by a lawyer qualified in the relevant jurisdiction before {site.name} relies
              on it. The refund window, the refund timing and the tax wording are placeholders and
              must be confirmed or replaced. <PlaceholderTag />
            </Callout>

            <div className="prose" style={{ marginTop: 'var(--sp-6)' }}>
              {/* ============================================================= */}
              <section aria-labelledby="thanks">
                <h2 id="thanks">1. Our thanks and your trust</h2>
                <p>
                  Thank you for supporting {site.name}. Every gift — one-off or monthly — is a
                  direct contribution to sickle cell screening, counselling, patient support and
                  awareness in {site.city} and beyond. We know that giving is an act of trust, and
                  we treat it that way: we publish how funds are allocated, we keep our accounts in
                  order, and we answer questions about a gift honestly.
                </p>
                <p>
                  This policy explains how donations work, how to change or cancel a recurring gift,
                  and when we can — and generally cannot — refund a donation. It should be read
                  together with our <Link to="/terms">terms of use</Link> and our{' '}
                  <Link to="/privacy">privacy policy</Link>.
                </p>
                <p>
                  If anything here is unclear, please contact us at{' '}
                  <a href={`mailto:${site.emailDonations}`}>{site.emailDonations}</a> or{' '}
                  {site.phoneDisplay}. A person, not a machine, will read your message.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="one-off">
                <h2 id="one-off">2. One-off donations</h2>
                <p>
                  A one-off donation is a single gift. You can give through this website using our
                  payment provider, by bank transfer using the details on our Donate page, or by
                  other means we advertise from time to time. All amounts are shown in{' '}
                  {site.currency} ({site.currencySymbol}) unless stated otherwise.
                </p>
                <p>
                  When you give online, our payment provider processes the payment and we receive
                  the amount donated together with limited transaction details (such as the date,
                  amount and a payment reference). We do not receive or store your full card number.
                  Please see our <Link to="/privacy">privacy policy</Link> for more about this.
                </p>
                <p>
                  We will acknowledge your gift by email where you provide an address, and you can
                  request a receipt at any time.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="recurring">
                <h2 id="recurring">3. Monthly (recurring) donations and how to cancel</h2>
                <p>
                  A monthly donation repeats automatically at the amount and interval you choose,
                  until you cancel it. Monthly giving is the most useful kind of support, because it
                  lets us plan screening drives and medicine supply in advance — but you are always
                  free to stop, and cancelling is straightforward.
                </p>

                <h3>How a recurring gift works</h3>
                <ul>
                  <li>
                    You authorise your card or account to be charged the chosen amount each month by
                    our payment provider.
                  </li>
                  <li>
                    You can cancel or change the gift at any time, and you will not be charged again
                    after your request has been processed.
                  </li>
                  <li>
                    If your card expires or a payment fails, your provider or we may contact you to
                    ask whether you would like to continue.
                  </li>
                </ul>

                <h3>How to cancel, step by step</h3>
                <ol>
                  <li>
                    Find your most recent donation receipt or confirmation email. It contains your
                    donation reference and, where available, a management link.
                  </li>
                  <li>
                    If you gave through a payment provider with an account or app (such as a card
                    provider or a giving platform), you can usually cancel the recurring authorisation
                    there directly, in the section for subscriptions or recurring payments.
                  </li>
                  <li>
                    If you would prefer us to cancel it for you, email{' '}
                    <a href={`mailto:${site.emailDonations}`}>{site.emailDonations}</a> with the
                    subject line “Cancel monthly donation”, or call {site.phoneDisplay}.
                  </li>
                  <li>
                    Include the name on the donation, the amount, and the date of the most recent
                    payment so that we can find your record quickly.
                  </li>
                  <li>
                    We will confirm by email that your recurring gift has been cancelled. Keep that
                    confirmation for your records.
                  </li>
                  <li>
                    Please allow us a reasonable period to action your request, and allow for any
                    payment already in progress to complete. Cancelling a recurring gift does not, by
                    itself, refund payments already taken — see sections 4 to 6.
                  </li>
                </ol>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="refunds">
                <h2 id="refunds">4. Refunds</h2>
                <p>
                  As a charity, we rely on donations to run our programmes, and money is generally put
                  to work quickly. For that reason, and like most charities, our default position is
                  that <strong>donations are non-refundable</strong> once they have been made.
                </p>
                <p>
                  We do, however, understand that mistakes happen. We will consider a refund in the
                  following situations:
                </p>
                <ul>
                  <li>
                    <strong>Duplicate payment</strong> — the same donation was charged to you more
                    than once.
                  </li>
                  <li>
                    <strong>Payment made in error</strong> — for example you gave the wrong amount, or
                    money was sent to us by mistake.
                  </li>
                  <li>
                    <strong>Unauthorised payment</strong> — the donation was made from your card or
                    account without your authority.
                  </li>
                  <li>
                    <strong>A genuine mistake</strong> — for example you intended to give a different
                    amount, or a recurring gift continued when you reasonably believed it had been
                    stopped.
                  </li>
                </ul>
                <p>
                  {/* LEGAL-REVIEW: set the refund window with the client and their
                      advisers. It is deliberately a placeholder. */}
                  To be considered, a refund request must normally reach us within{' '}
                  <span className="ph">REPLACE — refund window, e.g. 30 days</span> of the donation
                  date. Requests outside that window will be reviewed case by case. All refunds are
                  at our reasonable discretion and are subject to the donation having not yet been
                  spent on an irrevocable commitment. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="how-to-request">
                <h2 id="how-to-request">5. How to request a refund</h2>
                <p>If you would like to request a refund, please follow these steps:</p>
                <ol>
                  <li>
                    Email <a href={`mailto:${site.emailDonations}`}>{site.emailDonations}</a> or call{' '}
                    {site.phoneDisplay}. You can also write to us at {site.addressLine1},{' '}
                    {site.addressLine2}, {site.country}.
                  </li>
                  <li>
                    Give us the details we need to find the payment: the name on the donation, the
                    amount, the date, and any payment or donation reference you have.
                  </li>
                  <li>
                    Tell us briefly why you are asking for a refund — for example “duplicate
                    payment” or “gave in error”.
                  </li>
                  <li>
                    We will acknowledge your request and, if we need anything else, ask you for it.
                    We may need to confirm your identity to protect against fraud.
                  </li>
                  <li>
                    We will write back to tell you our decision, and our reasons if we are unable to
                    refund.
                  </li>
                </ol>
                <p>
                  To help us respond quickly, please send your request from the email address you used
                  to donate, or include the phone number associated with a phone-based gift.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="approved">
                <h2 id="approved">6. When a refund is approved</h2>
                <p>
                  If we approve a refund, we will return the amount to the same payment method used
                  for the original donation, in {site.currency} ({site.currencySymbol}), unless we
                  agree otherwise with you. We cannot usually refund to a different card or account.
                </p>
                <p>
                  {/* LEGAL-REVIEW: confirm actual processing times with your
                      payment provider; these are placeholders. */}
                  Approved refunds are normally processed within{' '}
                  <span className="ph">REPLACE — e.g. 5 to 10 working days</span>, though the time it
                  takes for the money to appear in your account depends on your bank or card issuer,
                  which can add a further{' '}
                  <span className="ph">REPLACE — e.g. 5 to 10 working days</span>. We will confirm by
                  email once we have issued the refund. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
                <p>
                  Where a refund is issued, we will also cancel any associated recurring gift and
                  issue a corrected acknowledgement for our records.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="disputes">
                <h2 id="disputes">7. Failed or disputed payments and chargebacks</h2>
                <p>
                  If a payment fails, your bank or provider may decline it and no donation will be
                  taken. Where a recurring payment fails, your provider or we may contact you to ask
                  whether you wish to update your details and continue supporting us.
                </p>
                <p>
                  If you believe a charge was made in error, please contact us first at{' '}
                  <a href={`mailto:${site.emailDonations}`}>{site.emailDonations}</a> — we can almost
                  always resolve a problem faster than a formal dispute. If you raise a chargeback or
                  payment dispute with your bank or card issuer instead, the payment provider will
                  freeze the amount while the dispute is investigated.
                </p>
                <p>
                  {/* LEGAL-REVIEW: the handling of chargebacks and any
                      consequences for the donor are matters for the client's
                      advisers. */}
                  Where a chargeback is raised, we will cooperate with the payment provider’s
                  process and may suspend any associated recurring gift.{' '}
                  <span className="ph">REPLACE — confirm your chargeback handling wording</span>.{' '}
                  <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="tax">
                <h2 id="tax">8. Tax receipts and deductibility</h2>
                <p>
                  We can provide a written receipt or acknowledgement for any donation on request.
                  Receipts state the foundation’s registered name and registration number, the
                  amount and date of the gift, and whether it was a one-off or a recurring donation.
                </p>
                <p>
                  {/* LEGAL-REVIEW: state whether donations are tax-deductible in
                      the donor's jurisdiction, with the correct authority and
                      the correct registration number. Do not state this as fact
                      until it has been confirmed. */}
                  Whether a donation is tax-deductible depends on the law of the donor’s own
                  jurisdiction and on {site.name}’s registration status. Our registration number is{' '}
                  <span className="ph">{site.registrationNumber}</span>. We cannot give tax advice,
                  and you should confirm any claim with your own tax adviser.{' '}
                  <span className="ph">REPLACE — confirm your deductibility wording and any
                  applicable reference</span>. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="in-kind">
                <h2 id="in-kind">9. Gifts in kind and in-memoriam gifts</h2>
                <p>
                  Not every gift is money. We are grateful for gifts in kind — such as medical
                  supplies, printing, transport, food or professional services offered without
                  charge. Because gifts in kind cannot usually be returned once accepted and used,
                  they are generally <strong>non-refundable</strong>, and we will confirm the terms
                  in writing before we accept a significant gift in kind.
                </p>
                <p>
                  We also receive gifts made in memory of someone, and gifts given on behalf of a
                  group or family. These are treated with the same care and respect as any other
                  donation. If you would like a gift in memoriam to be acknowledged in a particular
                  way, or directed to a particular programme, please tell us when you give, and where
                  we can we will honour that wish.
                </p>
                <p>
                  {/* LEGAL-REVIEW: confirm how in-kind gifts and restricted gifts
                      are recorded and whether any are returnable. */}
                  <span className="ph">REPLACE — confirm your gifts-in-kind and restricted-gift
                  wording</span>. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="changes">
                <h2 id="changes">10. Changing or pausing monthly giving</h2>
                <p>
                  You do not have to cancel to make a change. You can ask us to:
                </p>
                <ul>
                  <li>
                    <strong>Change the amount</strong> — increase or reduce your monthly gift;
                  </li>
                  <li>
                    <strong>Change the date</strong> — move the day your gift is taken;
                  </li>
                  <li>
                    <strong>Pause</strong> — suspend your gift for a set period and restart it
                    automatically afterwards; or
                  </li>
                  <li>
                    <strong>Restart</strong> a gift you previously paused or cancelled.
                  </li>
                </ul>
                <p>
                  To make any of these changes, email{' '}
                  <a href={`mailto:${site.emailDonations}`}>{site.emailDonations}</a> or call{' '}
                  {site.phoneDisplay}, with your donation details as in section 3. Changes usually
                  take effect from the next scheduled payment.
                </p>
              </section>

              {/* ============================================================= */}
              <section aria-labelledby="complaints">
                <h2 id="complaints">11. Complaints and escalation</h2>
                <p>
                  If you are unhappy with how a donation or a refund request has been handled, please
                  tell us so that we can put it right. In the first instance, contact us at{' '}
                  <a href={`mailto:${site.emailDonations}`}>{site.emailDonations}</a> or on{' '}
                  {site.phoneDisplay}, and we will look into it and respond.
                </p>
                <p>
                  {/* LEGAL-REVIEW: state the foundation's formal complaints route
                      and any external escalation body (for example a charity
                      regulator or fundraising regulator). REPLACE both. */}
                  If you are not satisfied with our response, you can escalate your complaint to{' '}
                  <span className="ph">REPLACE — the responsible person or committee within the
                  foundation, and how to reach them</span>, and ultimately to{' '}
                  <span className="ph">REPLACE — the relevant external regulator or ombudsman for
                  fundraising, if any</span>. <PlaceholderTag>LEGAL-REVIEW</PlaceholderTag>
                </p>
              </section>

              {/* Reader-facing reassurance, kept as a visible callout. */}
              <Callout tone="info" title="A person reads every request" icon="users">
                Whether you are cancelling a monthly gift, asking a question about a receipt or
                requesting a refund, your message is read and answered by a member of{' '}
                {site.name}’s team — not an automated system. You can reach us at{' '}
                <a href={`mailto:${site.emailDonations}`}>{site.emailDonations}</a> or{' '}
                {site.phoneDisplay}.
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight section--alt">
        <div className="container">
          <p className="small muted">
            See also:{' '}
            {legalPages
              .filter((p) => p.to !== '/refund-policy')
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
