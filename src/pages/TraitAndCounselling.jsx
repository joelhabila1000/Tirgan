import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import PunnettSquare from '../components/PunnettSquare'
import { PageHero, SectionHead, Callout, CtaBanner, TickList } from '../components/Ui'
import { genotypes, site } from '../data/site'

/**
 * TraitAndCounselling — knowing your genotype, and what genetic counselling is.
 *
 * Carries the interactive inheritance tool (PunnettSquare) plus the genotype
 * reference table and the questions worth asking a counsellor.
 */

const counsellingQuestions = [
  'What exactly does my genotype result mean?',
  'If we have children, what are the chances for each pregnancy?',
  'What are our options if we are both carriers?',
  'How is a test done, how long do results take, and is it confidential?',
  'Who can we talk to if we are anxious about a result?',
  'How do we tell our family that they, too, should be tested?',
]

export default function TraitAndCounselling() {
  return (
    <>
      <Seo
        title="Trait & genetic counselling"
        description="What it means to carry the sickle cell trait, how inheritance works, and how genetic counselling helps you plan with clear information instead of fear."
        path="/trait-and-counselling"
        schema={breadcrumbSchema([
          { label: 'Trait & genetic counselling', to: '/trait-and-counselling' },
        ])}
      />

      <PageHero
        eyebrow="Know your genotype"
        title="Trait & genetic counselling"
        lede="Carrying the sickle cell trait usually changes nothing about your health — but it changes the odds you can pass on. Knowing your genotype, and understanding what it means, lets you plan a family with clear information instead of fear."
        art="dna"
        crumbs={[{ label: 'Trait & genetic counselling' }]}
      />

      {/* ================================================================
          WHAT TRAIT MEANS
          ================================================================ */}
      <section className="section" aria-labelledby="trait-heading">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="The trait"
                title="What it means to be a carrier"
                lede="Someone with the sickle cell trait (AS) has one normal haemoglobin gene and one sickle gene. They are generally healthy, and most do not know they carry it — which is exactly why testing matters before starting a family."
                id="trait-heading"
              />

              <TickList
                items={[
                  'Trait is a carrier state, not a disease — most carriers live healthy, active lives',
                  'You cannot tell by looking, and it does not usually cause symptoms',
                  'Two carriers have a 1 in 4 chance, in each pregnancy, of a child with sickle cell disease',
                  'Everyone should know their genotype, regardless of gender',
                ]}
              />

              <p className="small muted" style={{ marginTop: 'var(--sp-5)' }}>
                In rare cases, people with trait may notice blood in their urine or, at very high
                altitude or intense exertion, other problems. Ask a clinician if you are concerned.
              </p>
            </div>

            <Reveal>
              <Callout tone="info" title="A chance, not a certainty" icon="info">
                Being a carrier couple does <strong>not</strong> mean every child will have sickle
                cell disease. Each pregnancy is a fresh roll of the same four outcomes. Use the
                calculator below to see how the probabilities move for any pairing.
              </Callout>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          INHERITANCE CALCULATOR
          ================================================================ */}
      <section className="section section--alt" id="calculator" aria-labelledby="calculator-heading">
        <div className="container">
          <SectionHead
            eyebrow="Inheritance calculator"
            title="Work out the odds for any pairing"
            lede="Choose each parent's genotype and see the chance of each possible outcome for a child. This is an educational aid, not a diagnosis."
            id="calculator-heading"
          />

          <PunnettSquare />
        </div>
      </section>

      {/* ================================================================
          GENOTYPE REFERENCE
          ================================================================ */}
      <section className="section" aria-labelledby="reference-heading">
        <div className="container">
          <SectionHead
            eyebrow="Reference"
            title="The genotypes at a glance"
            lede="A quick reference for the patterns you are most likely to be given on a result slip."
            id="reference-heading"
          />

          <div className="table-wrap">
            <table className="data-table">
              <caption>Haemoglobin genotypes, what they mean, and how they are inherited.</caption>
              <thead>
                <tr>
                  <th scope="col">Genotype</th>
                  <th scope="col">Name</th>
                  <th scope="col">What it means</th>
                </tr>
              </thead>
              <tbody>
                {genotypes.map((g) => (
                  <tr key={g.code}>
                    <td>
                      <span className={`genotype-key__tag genotype-key__tag--${g.key}`}>{g.code}</span>
                    </td>
                    <td>
                      <strong>{g.name}</strong>
                    </td>
                    <td>
                      {g.summary} <span className="muted">{g.note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================================
          COUNSELLING
          ================================================================ */}
      <section className="section section--alt" aria-labelledby="counselling-heading">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="Genetic counselling"
                title="What a counselling session is for"
                lede="Counselling is a private conversation with a trained professional. It is not about telling you what to do — it is about making sure you understand your result and your options well enough to decide for yourself."
                id="counselling-heading"
              />

              <h3 style={{ fontSize: 'var(--fs-lg)', marginTop: 'var(--sp-5)' }}>
                Questions worth asking
              </h3>
              <TickList items={counsellingQuestions} icon="arrowRight" />

              <div className="cluster" style={{ marginTop: 'var(--sp-6)' }}>
                <Link className="btn btn--primary" to="/contact">
                  Request a session
                  <Icon name="arrowRight" size={18} />
                </Link>
              </div>
            </div>

            <Reveal>
              <div className="card">
                <span className="icon-badge icon-badge--teal">
                  <Icon name="users" size={26} />
                </span>
                <h3 className="card__title">What happens in a session</h3>
                <div className="stack small" style={{ marginTop: 'var(--sp-4)' }}>
                  <p>
                    <strong>Your result, explained.</strong> A counsellor walks through your exact
                    genotype and what it does and does not mean for your health.
                  </p>
                  <p>
                    <strong>The odds, with a tool.</strong> You look at inheritance together, so the
                    probabilities stop feeling abstract.
                  </p>
                  <p>
                    <strong>Your options, without pressure.</strong> You hear what is available and
                    what the implications are. The decision stays yours.
                  </p>
                  <p>
                    <strong>Time to ask.</strong> You get to ask the questions you came with,
                    including the awkward ones.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="section section--tight">
        <div className="container">
          <CtaBanner
            title="Test once, know for life"
            lede={`Free genotype screening is available at our community drives. To talk to a counsellor or find the next drive, reach us on ${site.phoneDisplay}.`}
            actions={
              <>
                <Link className="btn btn--gold btn--lg" to="/programs#screening">
                  Find a screening
                  <Icon name="arrowRight" size={18} />
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/faq">
                  Read the FAQ
                </Link>
              </>
            }
          />
        </div>
      </section>
    </>
  )
}
