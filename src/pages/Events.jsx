import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import StoryArt from '../components/Rbc'
import {
  PageHero,
  SectionHead,
  Callout,
  CtaBanner,
  EventCard,
  FormShell,
  TextField,
  SelectField,
  CheckboxField,
  validators,
} from '../components/Ui'
import { events as staticEvents, pastEvents, site } from '../data/site'
import { useCollection } from '../lib/content'

/**
 * Events — what is coming up, World Sickle Cell Day and a simple RSVP.
 *
 * World Sickle Cell Day is fixed at 19 June each year; the countdown computes
 * the next occurrence from today's date.
 */

/** The next 19 June at 00:00 local time. */
function nextWscd() {
  const now = new Date()
  const year = now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 19) ? now.getFullYear() + 1 : now.getFullYear()
  return new Date(year, 5, 19, 0, 0, 0)
}

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => target - Date.now())

  useEffect(() => {
    const timer = setInterval(() => setRemaining(target - Date.now()), 1000)
    return () => clearInterval(timer)
  }, [target])

  const clamp = Math.max(remaining, 0)
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp / 3600000) % 24),
    minutes: Math.floor((clamp / 60000) % 60),
    seconds: Math.floor((clamp / 1000) % 60),
  }
}

export default function Events() {
  const events = useCollection('events', staticEvents)
  const target = useMemo(() => nextWscd(), [])
  const { days, hours, minutes, seconds } = useCountdown(target.getTime())

  const upcoming = events
  const wscd = upcoming.find((e) => e.type === 'Awareness' && e.title.includes('World Sickle Cell Day'))

  return (
    <>
      <Seo
        title="Events & awareness"
        description={`Screening drives, awareness walks, support circles and World Sickle Cell Day with ${site.name} in ${site.city}.`}
        path="/events"
        schema={breadcrumbSchema([{ label: 'Events & awareness', to: '/events' }])}
      />

      <PageHero
        eyebrow="What's coming up"
        title="Events & awareness"
        lede="Screening drives, awareness walks, support circles and our biggest day of the year. Come to an event, bring someone who has never been tested, and help us start the conversation."
        art="media"
        crumbs={[{ label: 'Events & awareness' }]}
      />

      {/* ================================================================
          WORLD SICKLE CELL DAY COUNTDOWN
          ================================================================ */}
      <section className="section section--red" aria-labelledby="wscd-heading">
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <p className="eyebrow">Save the date</p>
              <h2 id="wscd-heading">World Sickle Cell Day · 19 June {target.getFullYear()}</h2>
              <p className="lede">
                Our biggest day of the year: screenings, awareness, media and a community
                celebration across {site.state}. {wscd ? wscd.summary : ''}
              </p>

              <div className="cluster" style={{ marginTop: 'var(--sp-5)' }}>
                <Link className="btn btn--gold btn--lg" to="#rsvp">
                  Register your interest
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/get-involved">
                  Volunteer on the day
                </Link>
              </div>
            </div>

            <div>
              <p className="small" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--sp-3)' }}>
                Counting down to World Sickle Cell Day
              </p>
              <div className="countdown" role="timer" aria-live="off">
                {[
                  { value: days, label: 'Days' },
                  { value: hours, label: 'Hours' },
                  { value: minutes, label: 'Minutes' },
                  { value: seconds, label: 'Seconds' },
                ].map((unit) => (
                  <div className="countdown__unit" key={unit.label}>
                    <p className="countdown__value">{String(unit.value).padStart(2, '0')}</p>
                    <p className="countdown__label">{unit.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          UPCOMING EVENTS
          ================================================================ */}
      <section className="section" aria-labelledby="upcoming-heading">
        <div className="container">
          <SectionHead
            eyebrow="Calendar"
            title="Upcoming events"
            lede="Dates, venues and times below are placeholders — confirm each one before publishing."
            id="upcoming-heading"
          />

          <div className="grid grid--2">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PAST EVENTS GALLERY
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="past-heading">
        <div className="container">
          <SectionHead
            eyebrow="Looking back"
            title="Past events"
            lede="A few of the days we have shared with the community. Swap the illustrations for real photographs when you have them."
            id="past-heading"
          />

          <div className="gallery">
            {pastEvents.map((event) => (
              <figure className="gallery__item" key={event.title} style={{ background: 'linear-gradient(140deg, var(--cream-200), var(--coral-050))' }}>
                <StoryArt name={event.art} />
                <figcaption
                  className="img-slot"
                  style={{ left: 'var(--sp-2)', right: 'auto' }}
                >
                  {event.title}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="small muted" style={{ marginTop: 'var(--sp-4)' }}>
            {pastEvents.map((e) => e.meta).join(' · ')}
          </p>
        </div>
      </section>

      {/* ================================================================
          RSVP
          ================================================================ */}
      <section className="section" id="rsvp" aria-labelledby="rsvp-heading">
        <div className="container">
          <div className="split split--wide-left" style={{ alignItems: 'start' }}>
            <div>
              <SectionHead
                eyebrow="Join us"
                title="Register for an event"
                lede="Some events are walk-in and some need registration. Tell us which you are coming to and we will send the details."
                id="rsvp-heading"
              />

              <Callout tone="info" title="Screening events are walk-in" icon="info">
                You do not need to register for a free genotype screening — just come. Registration
                helps us know how many to expect for the other events.
              </Callout>
            </div>

            <div className="card">
              <h3 className="card__title">Event registration</h3>
              <p className="card__text" style={{ marginBottom: 'var(--sp-5)' }}>
                We will email you the venue, time and what to bring.
              </p>

              <FormShell
                initial={{ name: '', email: '', phone: '', event: '', guests: '', consent: false }}
                className="form-grid"
                rules={{
                  name: validators.required('Your name'),
                  email: validators.email,
                  event: validators.required('An event'),
                  consent: validators.checked('Please confirm you agree to be contacted.'),
                }}
                successTitle="You're registered"
                successBody="We'll email you the venue, time and what to bring. See you there."
                submitLabel="Register"
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
                        value={values.phone}
                        onChange={(v) => setField('phone', v)}
                        autoComplete="tel"
                      />
                      <TextField
                        id="guests"
                        label="Number of people"
                        inputMode="numeric"
                        value={values.guests}
                        onChange={(v) => setField('guests', v.replace(/[^\d]/g, ''))}
                        placeholder="e.g. 2"
                      />
                    </div>

                    <SelectField
                      id="event"
                      label="Which event?"
                      required
                      placeholder="Choose an event"
                      options={upcoming.map((e) => e.title)}
                      value={values.event}
                      onChange={(v) => setField('event', v)}
                      error={errors.event}
                    />

                    <CheckboxField
                      id="consent"
                      label={`I agree that ${site.name} may contact me about this event.`}
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
          CTA
          ================================================================ */}
      <section className="section section--tight section--alt">
        <div className="container">
          <CtaBanner
            title="Can't make an event? You can still help"
            lede="A gift funds the screening drive even if you cannot be there in person."
            actions={
              <>
                <Link className="btn btn--gold btn--lg" to="/donate">
                  Donate
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/get-involved">
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
