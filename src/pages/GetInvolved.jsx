import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import {
  PageHero,
  SectionHead,
  Callout,
  CtaBanner,
  TickList,
  FormShell,
  TextField,
  SelectField,
  CheckboxField,
  validators,
} from '../components/Ui'
import { site } from '../data/site'

/**
 * GetInvolved — volunteer, partner, fundraise or give.
 *
 * Both forms are front-end only. FormShell validates and shows the success
 * state; to go live, replace the marked block inside FormShell's handleSubmit
 * with a fetch() to your endpoint.
 */

const waysToHelp = [
  {
    icon: 'users',
    tone: 'red',
    title: 'Volunteer your time',
    text: 'Screening drives need registration helpers, counsellors, interpreters and logistics. We also need drivers, photographers and campus ambassadors.',
    href: '#volunteer',
    cta: 'Apply to volunteer',
  },
  {
    icon: 'handshake',
    tone: 'teal',
    title: 'Partner with us',
    text: 'Companies and institutions can sponsor a programme, fund a screening drive or provide in-kind support such as transport, printing or supplies.',
    href: '#partner',
    cta: 'Corporate partnership',
  },
  {
    icon: 'gift',
    tone: 'gold',
    title: 'Give regularly',
    text: 'Monthly giving lets us plan screening and medicine supply in advance. One-off gifts are just as welcome and just as useful.',
    href: '/donate',
    cta: 'Donate',
  },
  {
    icon: 'megaphone',
    tone: 'coral',
    title: 'Fundraise for us',
    text: 'A birthday fundraiser, a school mufti day, a sponsored walk or a church collection — we will give you everything you need to run it.',
    href: '#fundraise',
    cta: 'Fundraise',
  },
]

const volunteerRoles = [
  'Screening drive helper (registration, crowd flow)',
  'Counselling support (with clinical supervision)',
  'Hausa / English interpreter',
  'Logistics, transport and set-up',
  'Photography and social media',
  'Campus or community ambassador',
  'Event support on the day',
  'Office and administration support',
]

export default function GetInvolved() {
  return (
    <>
      <Seo
        title="Get involved"
        description={`Ways to support ${site.name} — volunteer at a screening drive, partner as a company, fundraise in your community or give to fund the work.`}
        path="/get-involved"
        schema={breadcrumbSchema([{ label: 'Get involved', to: '/get-involved' }])}
      />

      <PageHero
        eyebrow="Take action"
        title="Get involved"
        lede={`There is a place for you in this work — whether you have an hour, a skill, a company budget or a community. Here is how people help ${site.shortName} change outcomes for families.`}
        art="advocacy"
        crumbs={[{ label: 'Get involved' }]}
        actions={
          <>
            <Link className="btn btn--primary" to="#volunteer">
              Volunteer
              <Icon name="arrowRight" size={18} />
            </Link>
            <Link className="btn btn--outline" to="/donate">
              Donate
            </Link>
          </>
        }
      />

      {/* ================================================================
          WAYS TO HELP
          ================================================================ */}
      <section className="section" aria-labelledby="ways-heading">
        <div className="container">
          <SectionHead
            eyebrow="Ways to help"
            title="Choose how you want to make a difference"
            lede="Every route below feeds the same thing: more people screened, more families supported, fewer crises."
            id="ways-heading"
          />

          <div className="grid grid--2">
            {waysToHelp.map((way, i) => (
              <Reveal key={way.title} delay={i * 60}>
                <article className="card card--hover involve-card">
                  <span className={`icon-badge icon-badge--${way.tone}`}>
                    <Icon name={way.icon} size={26} />
                  </span>
                  <h3 className="card__title">{way.title}</h3>
                  <p className="card__text involve-card__list">{way.text}</p>
                  <p className="card__footer">
                    {way.href.startsWith('#') ? (
                      <a className="link-arrow" href={way.href}>
                        {way.cta}
                        <Icon name="arrowRight" size={18} />
                      </a>
                    ) : (
                      <Link className="link-arrow" to={way.href}>
                        {way.cta}
                        <Icon name="arrowRight" size={18} />
                      </Link>
                    )}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          VOLUNTEER FORM
          ================================================================ */}
      <section className="section section--alt" id="volunteer" aria-labelledby="volunteer-heading">
        <div className="container">
          <div className="split split--wide-left" style={{ alignItems: 'start' }}>
            <div>
              <SectionHead
                eyebrow="Volunteer"
                title="Join the volunteer team"
                lede="Most roles need no medical training. Anything involving counselling or testing is supervised by qualified clinicians, and we provide the training free."
                id="volunteer-heading"
              />

              <h3 style={{ fontSize: 'var(--fs-base)', marginBottom: 'var(--sp-3)' }}>
                Roles we usually need
              </h3>
              <TickList items={volunteerRoles} />

              <Callout tone="info" title="What we ask of you" icon="users" >
                Bring reliability and respect. We will provide training, a briefing before every
                event, and a named coordinator to call if anything is unclear.
              </Callout>
            </div>

            <div className="card">
              <h3 className="card__title">Volunteer application</h3>
              <p className="card__text" style={{ marginBottom: 'var(--sp-5)' }}>
                Tell us a little about yourself. A coordinator will reply.
              </p>

              <FormShell
                initial={{
                  name: '',
                  email: '',
                  phone: '',
                  location: '',
                  role: '',
                  availability: '',
                  notes: '',
                  consent: false,
                }}
                className="form-grid"
                rules={{
                  name: validators.required('Your name'),
                  email: validators.email,
                  phone: validators.phone,
                  role: validators.required('A role'),
                  consent: validators.checked('Please confirm you agree to be contacted.'),
                }}
                successTitle="Thank you for offering your time"
                successBody="A volunteer coordinator will be in touch to talk through roles and the next briefing."
                submitLabel="Send application"
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
                        label="Phone"
                        type="tel"
                        hint="Include your country code if you are outside Nigeria."
                        value={values.phone}
                        onChange={(v) => setField('phone', v)}
                        error={errors.phone}
                        autoComplete="tel"
                      />
                      <TextField
                        id="location"
                        label="Where you are based"
                        value={values.location}
                        onChange={(v) => setField('location', v)}
                        placeholder="e.g. Kaduna North"
                      />
                    </div>

                    <SelectField
                      id="role"
                      label="Role you are interested in"
                      required
                      placeholder="Choose a role"
                      options={volunteerRoles}
                      value={values.role}
                      onChange={(v) => setField('role', v)}
                      error={errors.role}
                    />

                    <SelectField
                      id="availability"
                      label="How much time can you give?"
                      placeholder="Select an option"
                      options={[
                        'A few hours, occasionally',
                        'A few hours each month',
                        'Regularly, most weeks',
                        'Full-time for a season',
                      ]}
                      value={values.availability}
                      onChange={(v) => setField('availability', v)}
                    />

                    <TextField
                      id="notes"
                      label="Anything else we should know?"
                      textarea
                      rows={4}
                      value={values.notes}
                      onChange={(v) => setField('notes', v)}
                      hint="Skills, languages, any medical background, or dates you are unavailable."
                    />

                    <CheckboxField
                      id="consent"
                      label={`I agree that ${site.name} may contact me about volunteering, and I have read the privacy policy.`}
                      checked={values.consent}
                      onChange={(v) => setField('consent', v)}
                      error={errors.consent}
                    />
                  </>
                )}
              </FormShell>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CORPORATE PARTNERSHIP
          ================================================================ */}
      <section className="section" id="partner" aria-labelledby="partner-heading">
        <div className="container">
          <div className="split split--wide-right" style={{ alignItems: 'start' }}>
            <div className="card">
              <h3 className="card__title">Corporate partnership enquiry</h3>
              <p className="card__text" style={{ marginBottom: 'var(--sp-5)' }}>
                We offer programme sponsorship, event sponsorship and in-kind support. Tell us what
                you have in mind and we will come back within five working days.
              </p>

              <FormShell
                initial={{
                  company: '',
                  contactName: '',
                  email: '',
                  phone: '',
                  interest: '',
                  budget: '',
                  message: '',
                  consent: false,
                }}
                className="form-grid"
                rules={{
                  company: validators.required('Your organisation'),
                  contactName: validators.required('A contact name'),
                  email: validators.email,
                  interest: validators.required('An area of interest'),
                  message: validators.minLength(20, 'Your message'),
                  consent: validators.checked('Please confirm you agree to be contacted.'),
                }}
                successTitle="Thank you — enquiry received"
                successBody="Our partnerships lead will review your enquiry and reply within five working days."
                submitLabel="Send enquiry"
              >
                {({ values, errors, setField }) => (
                  <>
                    <div className="form-grid form-grid--2">
                      <TextField
                        id="company"
                        label="Organisation"
                        required
                        value={values.company}
                        onChange={(v) => setField('company', v)}
                        error={errors.company}
                      />
                      <TextField
                        id="contactName"
                        label="Contact name"
                        required
                        value={values.contactName}
                        onChange={(v) => setField('contactName', v)}
                        error={errors.contactName}
                      />
                      <TextField
                        id="email"
                        label="Work email"
                        type="email"
                        required
                        value={values.email}
                        onChange={(v) => setField('email', v)}
                        error={errors.email}
                      />
                      <TextField
                        id="phone"
                        label="Phone"
                        type="tel"
                        value={values.phone}
                        onChange={(v) => setField('phone', v)}
                      />
                    </div>

                    <SelectField
                      id="interest"
                      label="What are you interested in?"
                      required
                      placeholder="Select an option"
                      options={[
                        'Sponsor a screening drive',
                        'Sponsor a programme',
                        'Event sponsorship',
                        'Staff volunteering day',
                        'In-kind support',
                        'Other',
                      ]}
                      value={values.interest}
                      onChange={(v) => setField('interest', v)}
                      error={errors.interest}
                    />

                    <SelectField
                      id="budget"
                      label="Indicative budget (optional)"
                      placeholder="Prefer not to say"
                      options={['Under ₦500,000', '₦500,000 – ₦2m', '₦2m – ₦10m', '₦10m+', 'In-kind only']}
                      value={values.budget}
                      onChange={(v) => setField('budget', v)}
                    />

                    <TextField
                      id="message"
                      label="Your message"
                      required
                      textarea
                      rows={5}
                      value={values.message}
                      onChange={(v) => setField('message', v)}
                      error={errors.message}
                      hint="Tell us a little about your goals and any timeline."
                    />

                    <CheckboxField
                      id="consent"
                      label="I agree that Tirngan Sickle Cell Foundation may contact me about this enquiry."
                      checked={values.consent}
                      onChange={(v) => setField('consent', v)}
                      error={errors.consent}
                    />
                  </>
                )}
              </FormShell>
            </div>

            <div>
              <SectionHead
                eyebrow="Corporate partners"
                title="What a partnership looks like"
                lede="We build partnerships that are specific and measurable, not vague gestures. You always know what your money funded."
                id="partner-heading"
              />

              <TickList
                items={[
                  'Fund a screening drive and receive the number of people tested',
                  'Sponsor our hydroxyurea access programme for a year',
                  'Give your staff a volunteering day at an event',
                  'Support a school outreach term in your community',
                  'Provide in-kind printing, transport or medical supplies',
                ]}
              />

              <Callout tone="info" title="A named person, every time" icon="briefcase">
                Every partner gets a named contact at {site.shortName} and a short report on what
                their support achieved.
              </Callout>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FUNDRAISE
          ================================================================ */}
      <section className="section section--alt" id="fundraise" aria-labelledby="fundraise-heading">
        <div className="container">
          <SectionHead
            eyebrow="Fundraise"
            title="Run your own fundraiser"
            lede="You do not need an events team. Pick something you would enjoy anyway, and turn it into support for a screening drive."
            id="fundraise-heading"
            center
          />

          <div className="grid grid--3">
            {[
              { icon: 'gift', tone: 'gold', title: 'Birthday fundraiser', text: 'Ask friends to give to us instead of buying gifts. We will send you a shareable link and a thank-you.' },
              { icon: 'school', tone: 'red', title: 'School or campus event', text: 'A mufti day, a match, a talent show. We will provide talks, materials and a speaker if you want one.' },
              { icon: 'activity', tone: 'teal', title: 'Sponsored challenge', text: 'A walk, a run or a cycle. We will help you set a target and a fundraising page.' },
              { icon: 'handshake', tone: 'coral', title: 'Faith or community group', text: 'A collection or a community dinner. We can attend and explain where the money goes.' },
              { icon: 'megaphone', tone: 'charcoal', title: 'Workplace giving', text: 'A dress-down day, a bake sale or payroll giving. We can supply posters and a short talk.' },
              { icon: 'book', tone: 'teal', title: 'In memory or celebration', text: 'Mark a life or a milestone by supporting our work. We will handle the tribute with care.' },
            ].map((idea, i) => (
              <Reveal key={idea.title} delay={i * 50}>
                <article className="card card--hover" style={{ height: '100%' }}>
                  <span className={`icon-badge icon-badge--${idea.tone}`}>
                    <Icon name={idea.icon} size={24} />
                  </span>
                  <h3 className="card__title">{idea.title}</h3>
                  <p className="card__text">{idea.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="cluster" style={{ marginTop: 'var(--sp-6)', justifyContent: 'center' }}>
            <Link className="btn btn--primary" to="/contact">
              Ask for a fundraiser pack
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="section section--tight">
        <div className="container">
          <CtaBanner
            title="Every hour and every naira reaches a family"
            lede="Volunteers run our drives, and donors pay for the tests. Both are how this works."
            actions={
              <>
                <Link className="btn btn--gold btn--lg" to="/donate">
                  Donate
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link className="btn btn--ghost btn--lg" to="#volunteer">
                  Volunteer
                </Link>
              </>
            }
          />
        </div>
      </section>
    </>
  )
}
