import { useMemo, useState } from 'react'
import { site } from '../data/site'

/**
 * PunnettSquare — an interactive inheritance calculator.
 *
 * The tool is deliberately simple: pick each parent's genotype and see the
 * probability of each possible outcome for a child. It is an educational aid,
 * not a diagnosis, and the wording says so.
 */

/* Alleles for each genotype people can select. */
const GENOTYPES = {
  AA: ['A', 'A'],
  AS: ['A', 'S'],
  SS: ['S', 'S'],
  AC: ['A', 'C'],
  SC: ['S', 'C'],
}

const USE_LABEL = {
  AA: 'AA — normal haemoglobin',
  AS: 'AS — sickle cell trait (carrier)',
  SS: 'SS — sickle cell disease',
  AC: 'AC — haemoglobin C trait',
  SC: 'SC — sickle cell disease (HbSC)',
}

/* How each resulting genotype is described in plain language. */
const OUTCOMES = {
  AA: {
    key: 'aa',
    plain: 'No sickle cell gene (AA)',
    blurb: 'Two normal haemoglobin genes. No trait and no disease.',
  },
  AS: {
    key: 'as',
    plain: 'Sickle cell trait — carrier (AS)',
    blurb: 'A healthy carrier who can pass the sickle gene to their children.',
  },
  AC: {
    key: 'ac',
    plain: 'Haemoglobin C trait — carrier (AC)',
    blurb: 'A carrier state, generally without symptoms.',
  },
  SS: {
    key: 'ss',
    plain: 'Sickle cell disease (SS)',
    blurb: 'The most common form of sickle cell disease. Needs lifelong care.',
  },
  SC: {
    key: 'sc',
    plain: 'Sickle cell disease (SC)',
    blurb: 'A form of sickle cell disease, often milder than SS but still needs monitoring.',
  },
  CC: {
    key: 'cc',
    plain: 'Haemoglobin C disease (CC)',
    blurb: 'A separate haemoglobin disorder, usually milder than sickle cell disease.',
  },
}

/* Alphabetical ordering gives the conventional notation: AA, AC, AS, CC, SC, SS */
function pairKey(a, b) {
  return [a, b].sort().join('')
}

export default function PunnettSquare() {
  const [parentOne, setParentOne] = useState('AS')
  const [parentTwo, setParentTwo] = useState('AS')

  const result = useMemo(() => {
    const a = GENOTYPES[parentOne]
    const b = GENOTYPES[parentTwo]

    /* Every combination has the same 1-in-4 probability. */
    const grid = [
      [pairKey(a[0], b[0]), pairKey(a[0], b[1])],
      [pairKey(a[1], b[0]), pairKey(a[1], b[1])],
    ]

    const counts = {}
    grid.flat().forEach((k) => {
      counts[k] = (counts[k] || 0) + 1
    })

    const rows = Object.entries(counts)
      .map(([code, count]) => ({
        code,
        percent: (count / 4) * 100,
        ...OUTCOMES[code],
      }))
      .sort((x, y) => y.percent - x.percent)

    /* Roll the genotypes up into the three answers families actually ask. */
    const chance = (codes) =>
      rows.filter((r) => codes.includes(r.code)).reduce((sum, r) => sum + r.percent, 0)

    return {
      grid,
      rows,
      disease: chance(['SS', 'SC']),
      trait: chance(['AS', 'AC']),
      neither: chance(['AA']),
      hbC: chance(['CC']),
    }
  }, [parentOne, parentTwo])

  return (
    <div className="punnett">
      {/* ---------- Controls ---------- */}
      <div className="card">
        <h3 className="card__title">Choose each parent’s genotype</h3>
        <p className="card__text">
          This works out the chance for each pregnancy. Change either parent to see how the
          probabilities move.
        </p>

        <div className="form-grid" style={{ marginTop: 'var(--sp-5)' }}>
          <div className="field">
            <label className="field__label" htmlFor="punnett-parent-one">
              Parent one
            </label>
            <select
              id="punnett-parent-one"
              className="select"
              value={parentOne}
              onChange={(e) => setParentOne(e.target.value)}
            >
              {Object.keys(GENOTYPES).map((g) => (
                <option key={g} value={g}>
                  {USE_LABEL[g]}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="punnett-parent-two">
              Parent two
            </label>
            <select
              id="punnett-parent-two"
              className="select"
              value={parentTwo}
              onChange={(e) => setParentTwo(e.target.value)}
            >
              {Object.keys(GENOTYPES).map((g) => (
                <option key={g} value={g}>
                  {USE_LABEL[g]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ---------- Punnett grid ---------- */}
        <div className="punnett__grid-wrap" style={{ marginTop: 'var(--sp-6)' }}>
          <div
            className="punnett__grid"
            role="img"
            aria-label={`Punnett square: parent one ${parentOne} crossed with parent two ${parentTwo} gives ${result.grid
              .flat()
              .join(', ')}`}
          >
            <div className="punnett__corner" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path d="M4 20 20 4" stroke="var(--border-strong)" strokeWidth="2" />
              </svg>
            </div>
            {GENOTYPES[parentTwo].map((allele, i) => (
              <div className="punnett__head" key={`col-${i}`}>
                {allele}
              </div>
            ))}

            {result.grid.map((row, r) => (
              <FragmentRow key={`row-${r}`} allele={GENOTYPES[parentOne][r]} row={row} />
            ))}
          </div>
        </div>

        <p className="small muted" style={{ marginTop: 'var(--sp-4)' }}>
          Each cell is one equally likely outcome (1 in 4).
        </p>
      </div>

      {/* ---------- Results ---------- */}
      <div className="card">
        <h3 className="card__title">What this means for a child</h3>

        <div className="punnett__results">
          <div className="result-bar">
            <span className="result-bar__label">Chance the child has sickle cell disease</span>
            <span className="result-bar__pct">{result.disease}%</span>
            <span className="result-bar__track">
              <span
                className="result-bar__fill"
                style={{ width: `${result.disease}%`, background: 'var(--red-600)' }}
              />
            </span>
          </div>

          <div className="result-bar">
            <span className="result-bar__label">Chance the child is a carrier (trait)</span>
            <span className="result-bar__pct">{result.trait}%</span>
            <span className="result-bar__track">
              <span
                className="result-bar__fill"
                style={{ width: `${result.trait}%`, background: 'var(--gold-600)' }}
              />
            </span>
          </div>

          <div className="result-bar">
            <span className="result-bar__label">Chance the child has no sickle cell gene</span>
            <span className="result-bar__pct">{result.neither}%</span>
            <span className="result-bar__track">
              <span
                className="result-bar__fill"
                style={{ width: `${result.neither}%`, background: 'var(--teal-600)' }}
              />
            </span>
          </div>

          {result.hbC > 0 ? (
            <div className="result-bar">
              <span className="result-bar__label">Chance the child has HbC disease</span>
              <span className="result-bar__pct">{result.hbC}%</span>
              <span className="result-bar__track">
                <span
                  className="result-bar__fill"
                  style={{ width: `${result.hbC}%`, background: 'var(--ink-600)' }}
                />
              </span>
            </div>
          ) : null}
        </div>

        <h4 style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--fs-base)' }}>Possible genotypes</h4>
        <div className="genotype-legend">
          {result.rows.map((r) => (
            <div className="genotype-key" key={r.code}>
              <span className={`genotype-key__tag genotype-key__tag--${r.key}`}>{r.code}</span>
              <span>
                <strong>{r.plain}</strong>
                <span className="small muted" style={{ display: 'block' }}>
                  {r.percent}% chance · {r.blurb}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="callout callout--info" style={{ marginTop: 'var(--sp-6)' }}>
          <span className="callout__icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="8.4" />
              <path d="M12 11.2v5.4M12 7.8h.02" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            <strong>These are probabilities, not predictions.</strong> Each pregnancy is a fresh
            1-in-4 chance regardless of what came before. Talk to a genetic counsellor or your
            doctor before making decisions — you can{' '}
            <a className="link-arrow" href="/contact" style={{ display: 'inline-flex' }}>
              request a counselling session
            </a>
            .
          </span>
        </div>

        <p className="disclaimer" style={{ marginTop: 'var(--sp-5)' }}>
          <strong>Educational tool only.</strong> This calculator shows whole-genotype
          probabilities for the genotypes listed and does not cover every haemoglobin variant,
          such as sickle beta-thalassaemia. It is not medical advice and is not a substitute for
          laboratory testing. Speak to a qualified health professional about your own results —
          call {site.emergencyNumber} in an emergency.
        </p>
      </div>
    </div>
  )
}

/* Renders a grid row: the parent allele header plus the two result cells. */
function FragmentRow({ allele, row }) {
  return (
    <>
      <div className="punnett__head">{allele}</div>
      {row.map((code, i) => (
        <div key={`${code}-${i}`} className={`punnett__cell punnett__cell--${OUTCOMES[code].key}`}>
          {code}
        </div>
      ))}
    </>
  )
}
