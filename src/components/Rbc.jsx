/**
 * RBC graphics — the site's visual motif.
 *
 * The idea: round, bouncy healthy red blood cells contrasted with stiff
 * crescent-shaped sickle cells. These shapes appear in the hero illustration,
 * as background patterns, as dividers, in card artwork and as the loader.
 *
 * Everything here is inline SVG, so there are no image files to load and every
 * graphic inherits the brand palette from CSS variables.
 *
 * To swap in real photography later, replace the <StoryArt> usage in a page
 * with an <img>. Each media slot is already marked with a visible placeholder
 * chip, so they are easy to find.
 */

/* ---------------------------------------------------------------------------
   Geometry
   --------------------------------------------------------------------------- */

/** The crescent ("sickle") outline, drawn on a 24x24 grid. */
export const CRESCENT_PATH = 'M12 2a10 10 0 1 0 8 16A8 8 0 0 1 12 2Z'

/** A healthy, biconcave round red blood cell. */
export function RoundCell({
  cx,
  cy,
  r,
  fill = 'var(--red-600)',
  dimple = 'var(--red-800)',
  opacity = 1,
}) {
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill={dimple} opacity="0.32" />
    </g>
  )
}

/** A crescent-shaped sickle cell. */
export function SickleCell({ x = 0, y = 0, size = 24, rotate = 0, fill = 'var(--red-800)', opacity = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 12 12) scale(${size / 24})`} opacity={opacity}>
      <path d={CRESCENT_PATH} fill={fill} />
    </g>
  )
}

/* ---------------------------------------------------------------------------
   Deterministic pseudo-random helpers (stable between renders / reloads)
   --------------------------------------------------------------------------- */

function makeRandom(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/* ---------------------------------------------------------------------------
   CellField — drifting cells used behind hero and dark sections
   --------------------------------------------------------------------------- */

export function CellField({
  count = 22,
  seed = 7,
  width = 1000,
  height = 600,
  className = '',
  light = false,
}) {
  const rand = makeRandom(seed)
  const cells = []

  for (let i = 0; i < count; i += 1) {
    const x = rand() * width
    const y = rand() * height
    const size = 26 + rand() * 70
    const isSickle = rand() > 0.62
    const opacity = 0.1 + rand() * 0.4
    const duration = 12 + rand() * 16
    const delay = rand() * -18
    const anim = rand() > 0.5 ? 'drift-a' : 'drift-b'
    const fill = light ? 'var(--white)' : 'var(--red-600)'

    cells.push(
      <g
        key={i}
        style={{
          animation: `${anim} ${duration}s ease-in-out ${delay}s infinite`,
          transformOrigin: `${x}px ${y}px`,
        }}
      >
        {isSickle ? (
          <SickleCell x={x - size / 2} y={y - size / 2} size={size} rotate={rand() * 360} fill={fill} opacity={opacity} />
        ) : (
          <RoundCell cx={x} cy={y} r={size / 2} fill={fill} dimple={light ? 'var(--red-800)' : 'var(--red-800)'} opacity={opacity} />
        )}
      </g>,
    )
  }

  return (
    <svg
      className={`cell-bg ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {cells}
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   HeroArt — the animated headline illustration
   --------------------------------------------------------------------------- */

export function HeroArt() {
  return (
    <svg
      viewBox="0 0 560 500"
      role="img"
      aria-labelledby="hero-art-title hero-art-desc"
      focusable="false"
    >
      <title id="hero-art-title">Illustration of red blood cells</title>
      <desc id="hero-art-desc">
        Round, healthy red blood cells sitting beside several stiff, crescent-shaped sickle cells,
        surrounded by a soft circular orbit.
      </desc>

      <defs>
        <radialGradient id="rbc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--coral-500)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--coral-500)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rbc-cell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C82A34" />
          <stop offset="100%" stopColor="var(--red-700)" />
        </linearGradient>
        <linearGradient id="rbc-sickle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--red-800)" />
          <stop offset="100%" stopColor="#5E0F15" />
        </linearGradient>
      </defs>

      {/* soft halo */}
      <circle cx="280" cy="250" r="230" fill="url(#rbc-glow)" />

      {/* orbit ring */}
      <g style={{ animation: 'spin-slow 40s linear infinite', transformOrigin: '280px 250px' }}>
        <ellipse
          cx="280"
          cy="250"
          rx="205"
          ry="205"
          fill="none"
          stroke="var(--teal-600)"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="7 13"
        />
        <circle cx="280" cy="45" r="7" fill="var(--teal-600)" opacity="0.75" />
        <circle cx="485" cy="250" r="5" fill="var(--gold-500)" />
      </g>

      {/* faint grid of tiny cells */}
      <g opacity="0.5">
        <RoundCell cx="90" cy="120" r="9" fill="var(--coral-500)" />
        <RoundCell cx="470" cy="140" r="7" fill="var(--gold-500)" dimple="var(--gold-600)" />
        <SickleCell x={60} y={380} size={30} rotate={35} fill="var(--coral-500)" opacity="0.8" />
        <RoundCell cx="500" cy="400" r="11" fill="var(--teal-600)" dimple="var(--teal-700)" />
      </g>

      {/* --- main healthy cell cluster --- */}
      <g style={{ animation: 'drift-a 11s ease-in-out infinite', transformOrigin: '215px 250px' }}>
        <circle cx="215" cy="250" r="112" fill="url(#rbc-cell)" />
        <circle cx="215" cy="250" r="44" fill="var(--red-800)" opacity="0.28" />
        <ellipse cx="176" cy="205" rx="30" ry="20" fill="var(--white)" opacity="0.22" transform="rotate(-28 176 205)" />
      </g>

      {/* satellite healthy cells */}
      <g style={{ animation: 'drift-b 14s ease-in-out infinite', transformOrigin: '360px 360px' }}>
        <circle cx="360" cy="360" r="56" fill="url(#rbc-cell)" />
        <circle cx="360" cy="360" r="22" fill="var(--red-800)" opacity="0.26" />
      </g>
      <g style={{ animation: 'drift-a 17s ease-in-out infinite', transformOrigin: '330px 145px' }}>
        <circle cx="330" cy="145" r="38" fill="url(#rbc-cell)" />
        <circle cx="330" cy="145" r="15" fill="var(--red-800)" opacity="0.26" />
      </g>

      {/* --- sickle cells, the contrast --- */}
      <g style={{ animation: 'drift-b 9s ease-in-out infinite', transformOrigin: '400px 240px' }}>
        <SickleCell x={358} y={198} size={86} rotate={-24} fill="url(#rbc-sickle)" />
      </g>
      <g style={{ animation: 'drift-a 13s ease-in-out infinite', transformOrigin: '430px 320px' }}>
        <SickleCell x={400} y={292} size={62} rotate={118} fill="url(#rbc-sickle)" opacity="0.92" />
      </g>
      <g style={{ animation: 'drift-b 15s ease-in-out infinite', transformOrigin: '250px 400px' }}>
        <SickleCell x={210} y={368} size={52} rotate={200} fill="url(#rbc-sickle)" opacity="0.85" />
      </g>

      {/* plasma sparkles */}
      <g fill="var(--gold-500)" opacity="0.9">
        <circle cx="140" cy="330" r="4" />
        <circle cx="455" cy="180" r="3.5" />
        <circle cx="120" cy="215" r="3" />
      </g>
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   CellDivider — used between sections
   --------------------------------------------------------------------------- */

export function CellDivider({ className = '' }) {
  return (
    <div className={`cell-divider ${className}`} aria-hidden="true">
      <svg viewBox="0 0 520 44" focusable="false">
        <line x1="0" y1="22" x2="196" y2="22" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="4 8" />
        <line x1="324" y1="22" x2="520" y2="22" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="4 8" />
        <RoundCell cx="215" cy="22" r="12" />
        <SickleCell x={232} y={10} size={24} rotate={20} />
        <RoundCell cx="272" cy="22" r="9" fill="var(--coral-500)" />
        <SickleCell x={284} y={10} size={24} rotate={160} />
        <RoundCell cx="320" cy="22" r="12" />
      </svg>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   LoaderCells — a calm loading state
   --------------------------------------------------------------------------- */

export function LoaderCells({ label = 'Loading…' }) {
  return (
    <div className="loader-cells" role="status" aria-live="polite">
      <div className="loader-cells__orbit" aria-hidden="true">
        <span>
          <RoundCell cx="12" cy="12" r="8" />
        </span>
        <span>
          <SickleCell x={0} y={0} size={24} rotate={40} />
        </span>
      </div>
      <span>{label}</span>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   StoryArt — themed illustrations for cards, galleries and page heroes
   --------------------------------------------------------------------------- */

const artRegistry = {
  /* A cluster of cells — the default illustration */
  cells: (
    <>
      <RoundCell cx="100" cy="70" r="34" />
      <RoundCell cx="140" cy="52" r="20" fill="var(--coral-500)" />
      <SickleCell x={44} y={44} size={52} rotate={30} />
      <RoundCell cx="72" cy="104" r="14" fill="var(--gold-500)" dimple="var(--gold-600)" />
      <SickleCell x={128} y={88} size={40} rotate={150} />
    </>
  ),

  /* DNA double helix — inheritance */
  dna: (
    <>
      <path
        d="M70 20c0 30 60 30 60 60s-60 30-60 60"
        fill="none"
        stroke="var(--red-600)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M130 20c0 30-60 30-60 60s60 30 60 60"
        fill="none"
        stroke="var(--teal-600)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <g stroke="var(--gold-500)" strokeWidth="5" strokeLinecap="round">
        <line x1="76" y1="38" x2="124" y2="38" />
        <line x1="82" y1="62" x2="118" y2="62" />
        <line x1="82" y1="86" x2="118" y2="86" />
        <line x1="76" y1="110" x2="124" y2="110" />
      </g>
    </>
  ),

  /* Screening drive — a test and a result */
  screening: (
    <>
      <RoundCell cx="66" cy="66" r="30" />
      <rect x="104" y="30" width="44" height="84" rx="10" fill="var(--white)" stroke="var(--border-strong)" strokeWidth="3" />
      <rect x="114" y="46" width="24" height="8" rx="4" fill="var(--red-600)" />
      <rect x="114" y="62" width="24" height="8" rx="4" fill="var(--teal-600)" />
      <rect x="114" y="78" width="24" height="8" rx="4" fill="var(--gold-500)" />
      <path d="M120 104l8 8 14-16" fill="none" stroke="var(--teal-600)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <SickleCell x={20} y={92} size={38} rotate={40} />
    </>
  ),

  /* School outreach */
  school: (
    <>
      <path d="M30 62 100 30l70 32-70 32-70-32Z" fill="var(--red-600)" />
      <path d="M56 78v30c0 8 20 14 44 14s44-6 44-14V78" fill="none" stroke="var(--red-800)" strokeWidth="7" strokeLinecap="round" />
      <circle cx="100" cy="112" r="14" fill="var(--gold-500)" />
      <SickleCell x={22} y={104} size={34} rotate={30} />
      <RoundCell cx="176" cy="106" r="16" fill="var(--teal-600)" dimple="var(--teal-700)" />
    </>
  ),

  /* Peer support — two people and a heart */
  support: (
    <>
      <circle cx="72" cy="58" r="24" fill="var(--red-600)" />
      <path d="M34 118a38 38 0 0 1 76 0Z" fill="var(--red-600)" />
      <circle cx="132" cy="58" r="24" fill="var(--teal-600)" />
      <path d="M94 118a38 38 0 0 1 76 0Z" fill="var(--teal-600)" />
      <path d="M150 22c0 9-13 17-13 17s-13-8-13-17a7.5 7.5 0 0 1 13-5 7.5 7.5 0 0 1 13 5Z" fill="var(--gold-500)" />
    </>
  ),

  /* Clinical care — stethoscope and heart */
  care: (
    <>
      <path d="M46 26v34a24 24 0 0 0 48 0V26" fill="none" stroke="var(--teal-600)" strokeWidth="8" strokeLinecap="round" />
      <path d="M70 84v14a28 28 0 0 0 56 0v-8" fill="none" stroke="var(--teal-600)" strokeWidth="8" strokeLinecap="round" />
      <circle cx="126" cy="86" r="12" fill="none" stroke="var(--red-600)" strokeWidth="8" />
      <path d="M46 26h-8M94 26h8" stroke="var(--teal-700)" strokeWidth="8" strokeLinecap="round" />
      <path d="M150 116c0 8-12 15-12 15s-12-7-12-15a6.8 6.8 0 0 1 12-4.4 6.8 6.8 0 0 1 12 4.4Z" fill="var(--red-600)" />
    </>
  ),

  /* Media & awareness — megaphone with waves */
  media: (
    <>
      <path d="M34 62v24l62 26V36L34 62Z" fill="var(--red-600)" />
      <rect x="20" y="60" width="18" height="30" rx="7" fill="var(--red-800)" />
      <path d="M52 116v18" stroke="var(--red-800)" strokeWidth="8" strokeLinecap="round" />
      <g fill="none" stroke="var(--gold-500)" strokeWidth="6" strokeLinecap="round">
        <path d="M112 56a28 28 0 0 1 0 36" />
        <path d="M130 42a50 50 0 0 1 0 64" />
      </g>
      <circle cx="170" cy="94" r="12" fill="var(--teal-600)" />
    </>
  ),

  /* Nutrition & hydration */
  nutrition: (
    <>
      <circle cx="96" cy="76" r="46" fill="var(--white)" stroke="var(--border-strong)" strokeWidth="4" />
      <path d="M96 52c-6-12-19-15-28-9-12 8-15 28-6 46 6 12 15 23 24 23 3 0 6-2 10-2s7 2 10 2c9 0 18-11 24-23 9-18 6-38-6-46-9-6-22-3-28 9Z" fill="var(--red-600)" />
      <path d="M96 52v-9a12 12 0 0 1 12-12" fill="none" stroke="var(--teal-700)" strokeWidth="5" strokeLinecap="round" />
      <path d="M150 96c0 16-9 30-9 30s-9-14-9-30a9 9 0 0 1 18 0Z" fill="var(--teal-600)" />
      <SickleCell x={26} y={96} size={34} rotate={30} />
    </>
  ),

  /* Advocacy — growing bars and a voice */
  advocacy: (
    <>
      <g>
        <rect x="30" y="86" width="24" height="44" rx="6" fill="var(--coral-500)" />
        <rect x="66" y="66" width="24" height="64" rx="6" fill="var(--gold-500)" />
        <rect x="102" y="42" width="24" height="88" rx="6" fill="var(--teal-600)" />
        <rect x="138" y="24" width="24" height="106" rx="6" fill="var(--red-600)" />
      </g>
      <path d="M24 130h144" stroke="var(--border-strong)" strokeWidth="4" strokeLinecap="round" />
    </>
  ),

  /* Single cell — fallback */
  cell: (
    <>
      <RoundCell cx="100" cy="70" r="44" />
      <circle cx="100" cy="70" r="18" fill="var(--red-800)" opacity="0.3" />
      <ellipse cx="84" cy="52" rx="14" ry="9" fill="var(--white)" opacity="0.25" transform="rotate(-28 84 52)" />
    </>
  ),
}

/**
 * StoryArt — pick a themed illustration by key.
 * Falls back to the generic cell cluster when a key is unknown.
 */
export default function StoryArt({ name = 'cells', className = '' }) {
  const art = artRegistry[name] || artRegistry.cells
  return (
    <svg className={className} viewBox="0 0 200 140" aria-hidden="true" focusable="false">
      {art}
    </svg>
  )
}

export { artRegistry }
