import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import {
  PageHero,
  SectionHead,
  Callout,
  MapPlaceholder,
  FormShell,
  TextField,
  SelectField,
  CheckboxField,
  validators,
} from '../components/Ui'
import { site } from '../data/site'

/**
 * Contact — how to reach us, plus the general enquiry form.
 *
 * The form is front-end only; connect your backend (or a form service) inside
 * FormShell's handleSubmit to receive real messages.
 */

const enquiryTypes = [
  'General enquiry',
  'Request support or assistance',
  'Genotype counselling',
  'Volunteering',
  'Corporate partnership',
  'Media & press',
  'Report a problem with this website',
]

export default function Contact() {
  const contactItems = [
    {
      icon: 'phone',
      label: 'Call us',
      value: site.phoneDisplay,
      href: `tel:${site.phoneHref}`,
      note: 'Weekdays, 9:00–17:00 WAT',
    },
    {
      icon: 'mail',
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      note: 'We reply within five working days',
    },
    {
      icon: 'gift',
      label: 'Donations',
      value: site.emailDonations,
      href: `mailto:${site.emailDonations}`,
      note: 'Receipts, refunds and monthly giving',
    },
    {
      icon: 'pin',
      label: 'Visit',
      value: `${site.addressLine1}, ${site.addressLine2}`,
      href: null,
      note: 'Please call ahead of a visit',
    },
  ]

  return (
    <>
      <Seo
        title="Contact us"
        description={`How to reach ${site.name} in ${site.city} — phone, email, address and our enquiry form.`}
        path="/contact"
        schema={breadcrumbSchema([{ label: 'Contact', to: '/contact' }])}
      />

      <PageHero
        eyebrow="Get in touch"
        title="Contact us"
        lede={`Whether you need support, want to volunteer or have a question about giving, we would rather hear from you than have you guess. A member of the ${site.shortName} team reads every message.`}
        art="support"
        crumbs={[{ label: 'Contact' }]}
      />

      {/* ================================================================
          EMERGENCY NOTICE
          ================================================================ */}
      <section className="section section--tight">
        <div className="container">
          <Callout tone="alert" title="If this is a medical emergency" icon="alert">
            Do not wait for an email. Call <strong>{site.emergencyNumber}</strong> or go to{' '}
            {site.hospitalNote} immediately. See our{' '}
            <Link to="/living-well#emergency">emergency guide</Link> for the red flags that mean
            hospital now.
          </Callout>
        </div>
      </section>

      {/* ================================================================
          FORM + DETAILS
          ================================================================ */}
      <section className="section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="contact-layout">
            {/* Form */}
            <div>
              <SectionHead
                eyebrow="Send a message"
                title="How can we help?"
                lede="Tell us a little about your enquiry and we will route it to the right person."
                id="contact-heading"
              />

              <div className="card">
                <FormShell
                  initial={{ name: '', email: '', phone: '', type: '', message: '', consent: false }}
                  className="form-grid"
                  rules={{
                    name: validators.required('Your name'),
                    email: validators.email,
                    type: validators.required('An enquiry type'),
                    message: validators.minLength(20, 'Your message'),
                    consent: validators.checked('Please confirm you agree to be contacted.'),
                  }}
                  successTitle="Thank you — your message is on its way"
                  successBody="A member of the team will read it and reply, usually within five working days."
                  submitLabel="Send message"
                >
                  {({ values, errors, setField }) => (
                    <>
                      <div className="form-grid form-grid--2">
                        <TextField
                          id="name"
                          label="Full name"
                          required
                          value={values.name}
                          onChange={(v) => setField('name', v)}
                          error={errors.name}
                          autoComplete="name"
                        />
                        <TextField
                          id="email"
                          label="Email"
                          type="email"
                          required
                          value={values.email}
                          onChange={(v) => setField('email', v)}
                          error={errors.email}
                          autoComplete="email"
                        />
                        <TextField
                          id="phone"
                          label="Phone (optional)"
                          type="tel"
                          value={values.phone}
                          onChange={(v) => setField('phone', v)}
                          autoComplete="tel"
                        />
                        <SelectField
                          id="type"
                          label="What is this about?"
                          required
                          placeholder="Choose a topic"
                          options={enquiryTypes}
                          value={values.type}
                          onChange={(v) => setField('type', v)}
                          error={errors.type}
                        />
                      </div>

                      <TextField
                        id="message"
                        label="Your message"
                        required
                        textarea
                        rows={6}
                        value={values.message}
                        onChange={(v) => setField('message', v)}
                        error={errors.message}
                        hint="Please do not include sensitive medical details in this form — we will arrange a private conversation if needed."
                      />

                      <CheckboxField
                        id="consent"
                        label={`I agree that ${site.name} may contact me about this enquiry, and I have read the privacy policy.`}
                        checked={values.consent}
                        onChange={(v) => setField('consent', v)}
                        error={errors.consent}
                      />
                    </>
                  )}
                </FormShell>
              </div>

              <p className="small muted" style={{ marginTop: 'var(--sp-4)' }}>
                By sending this form you agree to our <Link to="/privacy">privacy policy</Link>. We
                only collect health information you choose to share, with your explicit consent.
              </p>
            </div>

            {/* Details */}
            <div>
              <h2 style={{ fontSize: 'var(--fs-lg)', marginBottom: 'var(--sp-4)' }}>
                Other ways to reach us
              </h2>
              <div className="grid" style={{ gap: 'var(--sp-4)' }}>
                {contactItems.map((item) => (
                  <div className="contact-item" key={item.label}>
                    <span className="contact-item__icon">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <div>
                      <p className="contact-item__label">{item.label}</p>
                      <p className="contact-item__value">
                        {item.href ? <a href={item.href}>{item.value}</a> : item.value}
                      </p>
                      <p className="small muted" style={{ marginTop: 4 }}>
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="help-panel" style={{ marginTop: 'var(--sp-5)' }}>
                <p style={{ fontFamily: 'var(--font-head)', fontWeight: 'var(--fw-bold)' }}>
                  Looking for support, not a general enquiry?
                </p>
                <p className="small muted">
                  Our programmes cover treatment costs, counselling and welfare support. Start there
                  and we will guide you through what we need from you.
                </p>
                <div className="help-panel__actions">
                  <Link className="btn btn--primary btn--sm" to="/programs">
                    Programs &amp; services
                  </Link>
                  <Link className="btn btn--outline btn--sm" to="/living-well">
                    Living well
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MAP
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="map-heading">
        <div className="container">
          <SectionHead eyebrow="Find us" title="Where to find the office" id="map-heading" />
          <MapPlaceholder query={site.mapQuery} label="Office location" />
          <p className="small muted" style={{ marginTop: 'var(--sp-4)' }}>
            Replace this block with an embedded map showing{' '}
            <strong>{site.mapQuery}</strong>. Use a mapped address, not just a city name.
          </p>
        </div>
      </section>
    </>
  )
}
