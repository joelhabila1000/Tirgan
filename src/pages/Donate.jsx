import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { DonutChart } from '../components/Charts'
import { PageHero, SectionHead, Callout, TickList } from '../components/Ui'
import { donationPresets, donationImpact, fundAllocation, bankDetails } from '../data/site'
import { useOrgSettings } from '../lib/content'

/**
 * Donate — the giving page.
 *
 * The widget is front-end only: choosing an amount and frequency updates the
 * summary, but the "Continue to payment" button is a placeholder. To go live,
 * open your payment provider (Paystack, Flutterwave, Stripe, etc.) here.
 */

const naira = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)

export default function Donate() {
  const site = useOrgSettings()
  const [frequency, setFrequency] = useState('once')
  const [amount, setAmount] = useState(15000)
  const [custom, setCustom] = useState('')

  const activeAmount = custom ? Number(custom.replace(/[^\d]/g, '')) || 0 : amount
  const isMonthly = frequency === 'monthly'

  return (
    <>
      <Seo
        title="Donate"
        description={`Give to ${site.name}. Your gift funds genotype screening, counselling, treatment support and awareness in ${site.city}, ${site.country}.`}
        path="/donate"
        schema={breadcrumbSchema([{ label: 'Donate', to: '/donate' }])}
      />

      <PageHero
        eyebrow="Support our work"
        title="Give. It goes further than you think."
        lede="A single genotype test, from the finger prick to the counselling that follows it, costs about the price of a meal. Your gift puts that test in front of someone who would never otherwise have had it."
        art={null}
        crumbs={[{ label: 'Donate' }]}
        dark
      />

      {/* ================================================================
          DONATION WIDGET + IMPACT
          ================================================================ */}
      <section className="section" aria-labelledby="donate-heading">
        <div className="container">
          <div className="donation-layout">
            {/* ---------- Widget ---------- */}
            <div className="donation-widget">
              <h2 id="donate-heading" style={{ fontSize: 'var(--fs-xl)' }}>
                Make a donation
              </h2>
              <p className="card__text" style={{ marginTop: 'var(--sp-2)' }}>
                All amounts are in Nigerian naira ({site.currencySymbol}).
              </p>

              {/* Frequency */}
              <div className="freq-toggle" style={{ marginTop: 'var(--sp-5)' }} role="group" aria-label="Donation frequency">
                <button
                  type="button"
                  aria-pressed={!isMonthly}
                  onClick={() => setFrequency('once')}
                >
                  One-off
                </button>
                <button
                  type="button"
                  aria-pressed={isMonthly}
                  onClick={() => setFrequency('monthly')}
                >
                  Monthly
                </button>
              </div>

              {/* Amount presets */}
              <fieldset className="fieldset" style={{ border: 0, padding: 0, marginTop: 'var(--sp-5)' }}>
                <legend className="field__label" style={{ padding: 0, marginBottom: 'var(--sp-3)' }}>
                  Choose an amount
                </legend>
                <div className="amount-grid">
                  {donationPresets.map((preset) => {
                    const selected = !custom && amount === preset
                    return (
                      <button
                        key={preset}
                        type="button"
                        className="amount-btn"
                        aria-pressed={selected}
                        onClick={() => {
                          setAmount(preset)
                          setCustom('')
                        }}
                      >
                        {naira(preset)}
                        <span className="amount-btn__note">{isMonthly ? 'per month' : 'one-off'}</span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {/* Custom amount */}
              <div className="field" style={{ marginTop: 'var(--sp-5)' }}>
                <label className="field__label" htmlFor="custom-amount">
                  Or enter your own amount ({site.currencySymbol})
                </label>
                <input
                  className="input"
                  id="custom-amount"
                  name="custom-amount"
                  inputMode="numeric"
                  placeholder="e.g. 20000"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ''))}
                />
              </div>

              {/* Summary */}
              <div className="donation-summary">
                <div className="donation-summary__row">
                  <span>Giving</span>
                  <span>{isMonthly ? 'Monthly' : 'One-off'}</span>
                </div>
                <div className="donation-summary__row">
                  <span>{isMonthly ? 'Amount each month' : 'Amount'}</span>
                  <span className="donation-summary__total">{naira(activeAmount)}</span>
                </div>
              </div>

              {/* TODO: connect the payment provider here. */}
              <button
                type="button"
                className="btn btn--primary btn--lg btn--block"
                style={{ marginTop: 'var(--sp-5)' }}
                onClick={() =>
                  document.getElementById('payment-note')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
              >
                <Icon name="heart" size={18} />
                Continue to payment
              </button>

              <div id="payment-note" style={{ marginTop: 'var(--sp-5)' }}>
                <Callout tone="warning" title="Payment provider not connected yet" icon="lock">
                  This is a front-end demo. Connect your payment provider (for example{' '}
                  <span className="ph">REPLACE — Paystack / Flutterwave / Stripe</span>) to take real
                  payments, and make sure the donor’s privacy and refund terms are shown before they
                  pay.
                </Callout>
              </div>

              <div className="trust-badges">
                <span className="trust-badge">
                  <Icon name="shield" size={16} />
                  Secure payment
                </span>
                <span className="trust-badge">
                  <Icon name="lock" size={16} />
                  Your card is never stored on this site
                </span>
                <span className="trust-badge">
                  <Icon name="check" size={16} />
                  {site.registrationLabel}
                </span>
              </div>
            </div>

            {/* ---------- Impact ---------- */}
            <div>
              <SectionHead
                eyebrow="Your impact"
                title="What your gift does"
                lede="These figures are illustrative estimates based on our unit costs. Replace them with your verified numbers before launch."
              />

              <div className="impact-list">
                {donationImpact.map((item) => (
                  <div className="impact-row" key={item.amount}>
                    <span className="impact-row__amount">{naira(item.amount)}</span>
                    <span className="cluster" style={{ gap: '0.75rem' }}>
                      <span className="impact-row__icon">
                        <Icon name={item.icon} size={20} />
                      </span>
                      <span className="small">{item.text}</span>
                    </span>
                    <span aria-hidden="true" />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'var(--sp-6)' }}>
                <Callout tone="info" title="Where the money goes" icon="chart">
                  The chart opposite shows how we allocate funds. Our full annual accounts are
                  available on request.
                </Callout>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ALLOCATION
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="allocation-heading">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="Transparency"
                title="How we allocate the money"
                lede="We are a charity, so every naira is accounted for. This is the split we aim to hold to each year."
                id="allocation-heading"
              />

              <p className="small muted">
                Replace these percentages with your audited allocation figures. <span className="ph">REPLACE</span>
              </p>

              <div style={{ marginTop: 'var(--sp-5)' }}>
                <TickList
                  items={[
                    'Screening and testing take the largest share',
                    'Direct patient support is second',
                    'Administration is deliberately kept low',
                    'Every figure is published in our annual accounts',
                  ]}
                />
              </div>
            </div>

            <Reveal>
              <div className="chart">
                <h3 className="chart__title">Fund allocation</h3>
                <p className="chart__subtitle">Share of each naira donated</p>
                <DonutChart
                  data={fundAllocation}
                  centerValue="100%"
                  centerLabel="of funds"
                  caption="How donations are allocated across our work"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          BANK TRANSFER + OTHER WAYS
          ================================================================ */}
      <section className="section" aria-labelledby="other-heading">
        <div className="container">
          <SectionHead
            eyebrow="Other ways to give"
            title="Bank transfer and beyond"
            lede="If you would rather not give online, or you want to give in another way, these routes all work."
            id="other-heading"
          />

          <div className="split split--wide-left" style={{ alignItems: 'start' }}>
            <div className="bank-details">
              <p style={{ fontFamily: 'var(--font-head)', fontWeight: 'var(--fw-bold)' }}>
                Direct bank transfer
              </p>
              <div className="bank-details__row">
                <span className="bank-details__label">Account name</span>
                <span className="bank-details__value">{bankDetails.accountName}</span>
              </div>
              <div className="bank-details__row">
                <span className="bank-details__label">Account number</span>
                <span className="bank-details__value">{bankDetails.accountNumber}</span>
              </div>
              <div className="bank-details__row">
                <span className="bank-details__label">Bank</span>
                <span className="bank-details__value">{bankDetails.bankName}</span>
              </div>
              <div className="bank-details__row">
                <span className="bank-details__label">Branch</span>
                <span className="bank-details__value">{bankDetails.sortOrBranch}</span>
              </div>
              <div className="bank-details__row">
                <span className="bank-details__label">Reference</span>
                <span className="bank-details__value">{bankDetails.reference}</span>
              </div>
              <p className="small" style={{ color: 'rgba(255,255,255,0.72)' }}>
                Please use the reference so we can acknowledge your gift, and email us a note so we
                can thank you properly.
              </p>
            </div>

            <div className="grid" style={{ gap: 'var(--sp-4)' }}>
              <article className="card">
                <span className="icon-badge icon-badge--teal">
                  <Icon name="refresh" size={24} />
                </span>
                <h3 className="card__title">Give monthly</h3>
                <p className="card__text">
                  Monthly giving is the most useful kind, because it lets us plan screening drives
                  and medicine supply in advance. You can cancel at any time.
                </p>
                <p className="card__footer">
                  <Link className="link-arrow" to="/refund-policy">
                    How to cancel
                    <Icon name="arrowRight" size={18} />
                  </Link>
                </p>
              </article>

              <article className="card">
                <span className="icon-badge icon-badge--gold">
                  <Icon name="briefcase" size={24} />
                </span>
                <h3 className="card__title">Give as a company</h3>
                <p className="card__text">
                  Sponsor a screening drive or a whole programme, and receive a short report on
                  exactly what your support achieved.
                </p>
                <p className="card__footer">
                  <Link className="link-arrow" to="/get-involved#partner">
                    Corporate partnership
                    <Icon name="arrowRight" size={18} />
                  </Link>
                </p>
              </article>

              <article className="card">
                <span className="icon-badge icon-badge--coral">
                  <Icon name="gift" size={24} />
                </span>
                <h3 className="card__title">Fundraise for us</h3>
                <p className="card__text">
                  A birthday, a challenge, a school event — we will give you everything you need to
                  run it and to tell people where the money goes.
                </p>
                <p className="card__footer">
                  <Link className="link-arrow" to="/get-involved#fundraise">
                    Start a fundraiser
                    <Icon name="arrowRight" size={18} />
                  </Link>
                </p>
              </article>
            </div>
          </div>

          <p className="small muted" style={{ marginTop: 'var(--sp-6)' }}>
            Questions about a gift, a receipt or a refund? Email{' '}
            <a href={`mailto:${site.emailDonations}`}>{site.emailDonations}</a> or read our{' '}
            <Link to="/refund-policy">donation &amp; refund policy</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
