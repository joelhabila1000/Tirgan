/**
 * Charts — dependency-free inline SVG charts.
 *
 * Every chart also renders a visually-hidden data table so screen-reader users
 * get the underlying numbers rather than an image description.
 */

/* ---------------------------------------------------------------------------
   Accessible data table (visually hidden)
   --------------------------------------------------------------------------- */
function HiddenTable({ caption, columns, rows }) {
  return (
    <table className="visually-hidden">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} scope="col">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/* ---------------------------------------------------------------------------
   DonutChart — fund allocation
   --------------------------------------------------------------------------- */

export function DonutChart({ data, size = 220, thickness = 34, centerValue, centerLabel, caption = 'Chart data' }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  let offset = 0

  return (
    <figure className="chart__figure">
      <svg
        className="chart__svg"
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={`${caption}. ${data.map((d) => `${d.label} ${d.value}%`).join(', ')}`}
      >
        <g className="chart__donut">
          {data.map((d) => {
            const length = (d.value / total) * circumference
            const seg = (
              <circle
                key={d.label}
                className="chart__donut-seg"
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
              />
            )
            offset += length
            return seg
          })}
        </g>
        {centerValue ? (
          <text
            x={center}
            y={center - 2}
            textAnchor="middle"
            style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.6rem', fill: 'var(--charcoal)' }}
          >
            {centerValue}
          </text>
        ) : null}
        {centerLabel ? (
          <text x={center} y={center + 20} textAnchor="middle" style={{ fontSize: '0.7rem', fill: 'var(--text-muted)' }}>
            {centerLabel}
          </text>
        ) : null}
      </svg>

      <div className="chart-legend">
        {data.map((d) => (
          <div className="chart-legend__item" key={d.label}>
            <span className="chart-legend__dot" style={{ background: d.color }} />
            <span>{d.label}</span>
            <span className="chart-legend__value">{d.value}%</span>
          </div>
        ))}
      </div>

      <HiddenTable
        caption={caption}
        columns={['Category', 'Share of funds']}
        rows={data.map((d) => [d.label, `${d.value}%`])}
      />
    </figure>
  )
}

/* ---------------------------------------------------------------------------
   BarChart — programme delivery by year
   --------------------------------------------------------------------------- */

export function BarChart({ data, height = 260, color = 'var(--red-600)', yLabel = '', caption = 'Chart data', valueSuffix = '' }) {
  const width = 640
  const padding = { top: 24, right: 16, bottom: 44, left: 52 }
  const plotW = width - padding.left - padding.right
  const plotH = height - padding.top - padding.bottom
  const max = Math.max(...data.map((d) => d.value)) * 1.15
  const slot = plotW / data.length
  const barW = Math.min(slot * 0.55, 46)

  const ticks = 4

  return (
    <figure className="chart__figure">
      <svg
        className="chart__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${caption}. ${data.map((d) => `${d.label}: ${d.value}${valueSuffix}`).join(', ')}`}
      >
        {/* horizontal gridlines + y labels */}
        {Array.from({ length: ticks + 1 }).map((_, i) => {
          const value = (max / ticks) * (ticks - i)
          const y = padding.top + (plotH / ticks) * i
          return (
            <g key={i}>
              <line className="chart__gridline" x1={padding.left} y1={y} x2={width - padding.right} y2={y} />
              <text x={padding.left - 10} y={y + 4} textAnchor="end">
                {Math.round(value).toLocaleString('en-NG')}
              </text>
            </g>
          )
        })}

        {yLabel ? (
          <text x={padding.left - 42} y={padding.top - 8} textAnchor="start" style={{ fontSize: '10px' }}>
            {yLabel}
          </text>
        ) : null}

        {/* bars */}
        {data.map((d, i) => {
          const barH = (d.value / max) * plotH
          const x = padding.left + slot * i + (slot - barW) / 2
          const y = padding.top + plotH - barH
          return (
            <g key={d.label} className="chart__bar" style={{ animationDelay: `${i * 70}ms`, transformOrigin: `${x + barW / 2}px ${padding.top + plotH}px` }}>
              <rect x={x} y={y} width={barW} height={barH} rx="7" fill={d.color || color} />
              <text x={x + barW / 2} y={y - 8} textAnchor="middle" style={{ fontWeight: 700, fill: 'var(--charcoal)' }}>
                {d.value.toLocaleString('en-NG')}
              </text>
              <text x={x + barW / 2} y={height - 16} textAnchor="middle">
                {d.label}
              </text>
            </g>
          )
        })}

        <line className="chart__axis" x1={padding.left} y1={padding.top + plotH} x2={width - padding.right} y2={padding.top + plotH} />
      </svg>

      <HiddenTable
        caption={caption}
        columns={['Period', `Value${valueSuffix ? ` (${valueSuffix})` : ''}`]}
        rows={data.map((d) => [d.label, d.value.toLocaleString('en-NG')])}
      />
    </figure>
  )
}

/* ---------------------------------------------------------------------------
   HorizontalBarChart — country burden comparison
   --------------------------------------------------------------------------- */

export function HorizontalBarChart({ data, caption = 'Chart data', unit = '' }) {
  const max = Math.max(...data.map((d) => d.value)) || 1

  return (
    <figure className="chart__figure">
      <div className="chart-legend" style={{ marginTop: 0 }}>
        {data.map((d, i) => (
          <div key={d.country} style={{ display: 'grid', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: 'var(--fs-sm)' }}>
              <span style={{ fontWeight: 600 }}>{d.country}</span>
              <span className="chart-legend__value">
                {d.value.toLocaleString('en-NG')}
                {unit}
              </span>
            </div>
            <div className="progress__track" aria-hidden="true">
              <div
                className="progress__fill"
                style={{
                  width: `${(d.value / max) * 100}%`,
                  animation: `grow-bar 900ms var(--ease-out) ${i * 90}ms both`,
                  transformOrigin: 'left',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <HiddenTable
        caption={caption}
        columns={['Country', `Value${unit ? ` (${unit})` : ''}`]}
        rows={data.map((d) => [d.country, d.value.toLocaleString('en-NG')])}
      />
    </figure>
  )
}

/* ---------------------------------------------------------------------------
   LineChart — programme impact over time (multi-series)
   --------------------------------------------------------------------------- */

export function LineChart({ labels, series, height = 300, caption = 'Chart data' }) {
  const width = 660
  const padding = { top: 24, right: 24, bottom: 44, left: 58 }
  const plotW = width - padding.left - padding.right
  const plotH = height - padding.top - padding.bottom

  const maxValue = Math.max(...series.flatMap((s) => s.values)) * 1.15
  const ticks = 4

  const xFor = (i) => padding.left + (plotW / Math.max(labels.length - 1, 1)) * i
  const yFor = (v) => padding.top + plotH - (v / maxValue) * plotH

  return (
    <figure className="chart__figure">
      <svg
        className="chart__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${caption}. Series: ${series.map((s) => `${s.name} — ${s.values.join(', ')}`).join('. ')}`}
      >
        {Array.from({ length: ticks + 1 }).map((_, i) => {
          const value = (maxValue / ticks) * (ticks - i)
          const y = padding.top + (plotH / ticks) * i
          return (
            <g key={i}>
              <line className="chart__gridline" x1={padding.left} y1={y} x2={width - padding.right} y2={y} />
              <text x={padding.left - 10} y={y + 4} textAnchor="end">
                {Math.round(value).toLocaleString('en-NG')}
              </text>
            </g>
          )
        })}

        <line className="chart__axis" x1={padding.left} y1={padding.top + plotH} x2={width - padding.right} y2={padding.top + plotH} />

        {labels.map((label, i) => (
          <text key={label} x={xFor(i)} y={height - 16} textAnchor="middle">
            {label}
          </text>
        ))}

        {series.map((s, si) => {
          const points = s.values.map((v, i) => `${xFor(i)},${yFor(v)}`).join(' ')
          return (
            <g key={s.name}>
              <polyline
                className="chart__line"
                points={points}
                stroke={s.color}
                pathLength="1400"
                style={{ animationDelay: `${si * 260}ms` }}
              />
              {s.values.map((v, i) => (
                <circle
                  key={i}
                  className="chart__point"
                  cx={xFor(i)}
                  cy={yFor(v)}
                  r="4.5"
                  fill={s.color}
                />
              ))}
            </g>
          )
        })}
      </svg>

      <div className="chart-legend" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
        {series.map((s) => (
          <span key={s.name} className="cluster" style={{ gap: '0.5rem' }}>
            <span className="chart-legend__dot" style={{ background: s.color, borderRadius: 999 }} />
            <span className="small">{s.name}</span>
          </span>
        ))}
      </div>

      <HiddenTable
        caption={caption}
        columns={['Year', ...series.map((s) => s.name)]}
        rows={labels.map((label, i) => [label, ...series.map((s) => s.values[i].toLocaleString('en-NG'))])}
      />
    </figure>
  )
}
