// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
type ArtProps = { className?: string };

// SVG ids are document-global, so every def is namespaced per scene. Two scenes on one page
// sharing a bare id means the second silently repaints the first.
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-bloom`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="9" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${id}-soft`} x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="20" />
      </filter>

      <radialGradient id={`${id}-core`} cx="0.36" cy="0.3" r="0.9">
        <stop stopColor="#eaf4ff" />
        <stop offset="0.28" stopColor="#5cb0ff" />
        <stop offset="0.62" stopColor="#2f6fd0" />
        <stop offset="0.86" stopColor="#3c3a7a" />
        <stop offset="1" stopColor="#4a3320" />
      </radialGradient>

      <linearGradient id={`${id}-warm`} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop stopColor="#ffb020" stopOpacity="0" />
        <stop offset="0.55" stopColor="#ffb020" stopOpacity="0" />
        <stop offset="1" stopColor="#ffcf7a" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#8ef2ff" />
        <stop offset="0.42" stopColor="#4da2ff" />
        <stop offset="0.74" stopColor="#a274ff" />
        <stop offset="1" stopColor="#ffb86b" />
      </linearGradient>
      <linearGradient id={`${id}-yield`} x1="0" y1="1" x2="1" y2="0">
        <stop stopColor="#3ddc97" stopOpacity="0" />
        <stop offset="0.45" stopColor="#3ddc97" stopOpacity="0.95" />
        <stop offset="1" stopColor="#a8ffd8" />
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#ffe9b0" />
        <stop offset="0.45" stopColor="#ffb020" />
        <stop offset="1" stopColor="#b8760a" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0.3" y2="1">
        <stop stopColor="#ffffff" stopOpacity="0.22" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
      </linearGradient>
      <radialGradient id={`${id}-halo`} cx="0.5" cy="0.5" r="0.5">
        <stop stopColor="#4da2ff" stopOpacity="0.5" />
        <stop offset="0.5" stopColor="#8b6bff" stopOpacity="0.2" />
        <stop offset="0.78" stopColor="#ff9d4d" stopOpacity="0.12" />
        <stop offset="1" stopColor="#ff9d4d" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-halo-gold`} cx="0.5" cy="0.5" r="0.5">
        <stop stopColor="#ffb020" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ffb020" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Frame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 400 340" fill="none" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}

function Core({ id, cx, cy, r = 46 }: { id: string; cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 2.6} fill={`url(#${id}-halo)`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-core)`} />

      <circle
        cx={cx}
        cy={cy}
        r={r - 1}
        fill="none"
        stroke={`url(#${id}-warm)`}
        strokeWidth={r * 0.16}
      />

      <ellipse
        cx={cx - r * 0.3}
        cy={cy - r * 0.36}
        rx={r * 0.4}
        ry={r * 0.28}
        fill="#ffffff"
        opacity="0.34"
        transform={`rotate(-28 ${cx - r * 0.3} ${cy - r * 0.36})`}
      />

      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`url(#${id}-ring)`} strokeOpacity="0.55" />
    </g>
  );
}

function Ladder({ id, cx, cy, r, from = 0 }: { id: string; cx: number; cy: number; r: number; from?: number }) {
  return (
    <g filter={`url(#${id}-bloom)`}>
      {[0, 1, 2, 3, 4, 5].map((index) => {
        const angle = from + (index / 6) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const heat = 0.35 + index * 0.13;
        return (
          <g key={index}>
            <circle cx={x} cy={y} r="9" fill="#4da2ff" opacity={heat * 0.35} />
            <circle cx={x} cy={y} r="4.6" fill="#a5d0ff" opacity={heat + 0.25} />
          </g>
        );
      })}
    </g>
  );
}

export function ProtocolArt({ className }: ArtProps) {
  const id = 'pa-proto';
  return (
    <Frame className={className}>
      <Defs id={id} />
      <circle cx="200" cy="170" r="150" stroke="#1c2740" strokeDasharray="1 10" />
      <g className="animate-spin-slow" style={{ transformOrigin: '200px 170px' }}>
        <circle
          cx="200"
          cy="170"
          r="112"
          stroke={`url(#${id}-ring)`}
          strokeWidth="2.5"
          strokeDasharray="104 32"
          strokeLinecap="round"
          filter={`url(#${id}-bloom)`}
        />
      </g>
      <Ladder id={id} cx={200} cy={170} r={112} />
      <path
        d="M112 246C158 214 188 184 214 146 244 102 276 66 356 26"
        stroke={`url(#${id}-yield)`}
        strokeWidth="3"
        strokeLinecap="round"
        filter={`url(#${id}-bloom)`}
      />
      <circle cx="356" cy="26" r="7" fill="#a8ffd8" filter={`url(#${id}-bloom)`} />
      <Core id={id} cx={200} cy={170} />
    </Frame>
  );
}

export function InterfacesArt({ className }: ArtProps) {
  const id = 'pa-int';
  return (
    <Frame className={className}>
      <Defs id={id} />
      <circle cx="200" cy="170" r="150" stroke="#1c2740" strokeDasharray="1 10" />
      <circle cx="200" cy="170" r="126" stroke="#233350" strokeOpacity="0.6" />

      {[0, 1, 2, 3, 4, 5].map((index) => {
        const angle = (index / 6) * Math.PI * 2 - Math.PI / 2;
        const x = 200 + Math.cos(angle) * 126;
        const y = 170 + Math.sin(angle) * 126;
        const live = index === 0;
        return (
          <g key={index}>
            <path
              d={`M200 170 L${x} ${y}`}
              stroke={live ? `url(#${id}-ring)` : '#33496f'}
              strokeWidth={live ? 2.4 : 1.4}
              strokeDasharray={live ? undefined : '4 6'}
              filter={live ? `url(#${id}-bloom)` : undefined}
            />

            <g filter={`url(#${id}-bloom)`}>
              <rect
                x={x - 19}
                y={y - 25}
                width="38"
                height="50"
                rx="13"
                fill={live ? `url(#${id}-core)` : '#0c1728'}
                stroke={live ? 'none' : '#3fd8f5'}
                strokeOpacity={live ? 1 : 0.45}
                strokeWidth="1.6"
                strokeDasharray={live ? undefined : '6 5'}
              />
              <rect
                x={x - 19}
                y={y - 25}
                width="38"
                height="50"
                rx="13"
                fill={`url(#${id}-glass)`}
                opacity={live ? 1 : 0.5}
              />
              <circle
                cx={x + 8}
                cy={y}
                r="2.8"
                fill={live ? '#eaf4ff' : '#3fd8f5'}
                opacity={live ? 1 : 0.85}
              />
            </g>
          </g>
        );
      })}

      <Core id={id} cx={200} cy={170} r={44} />
    </Frame>
  );
}

export function BuildersArt({ className }: ArtProps) {
  const id = 'pa-build';
  const blocks = [
    { x: 200, y: 58 },
    { x: 300, y: 132 },
    { x: 262, y: 252 },
    { x: 138, y: 252 },
    { x: 100, y: 132 },
  ];
  return (
    <Frame className={className}>
      <Defs id={id} />
      <circle cx="200" cy="170" r="146" stroke="#1c2740" strokeDasharray="1 10" />
      {blocks.map((b, i) => (
        <path
          key={`l${i}`}
          d={`M200 170 L${b.x} ${b.y}`}
          stroke={`url(#${id}-ring)`}
          strokeOpacity="0.3"
          strokeWidth="1.4"
          strokeDasharray="5 7"
        />
      ))}
      {blocks.map((b, i) => (
        <g key={i} filter={`url(#${id}-bloom)`} className="animate-float" style={{ animationDelay: `${i * 0.45}s` }}>
          <rect x={b.x - 24} y={b.y - 24} width="48" height="48" rx="14" fill={`url(#${id}-core)`} />
          <rect x={b.x - 24} y={b.y - 24} width="48" height="48" rx="14" fill={`url(#${id}-glass)`} />
          <path
            d={`M${b.x - 9} ${b.y - 5} l-5 5 5 5M${b.x + 9} ${b.y - 5} l5 5-5 5`}
            stroke="#eaf4ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </g>
      ))}
      <Core id={id} cx={200} cy={170} r={36} />
    </Frame>
  );
}

export function BlueprintsArt({ className }: ArtProps) {
  const id = 'pa-bp';
  return (
    <Frame className={className}>
      <Defs id={id} />
      {[68, 134, 200, 266, 332].map((x) => (
        <path key={`v${x}`} d={`M${x} 24V316`} stroke="#1c2740" strokeOpacity="0.5" strokeDasharray="1 9" />
      ))}
      {[60, 115, 170, 225, 280].map((y) => (
        <path key={`h${y}`} d={`M34 ${y}H366`} stroke="#1c2740" strokeOpacity="0.5" strokeDasharray="1 9" />
      ))}
      <circle cx="200" cy="170" r="106" stroke={`url(#${id}-ring)`} strokeWidth="2" filter={`url(#${id}-bloom)`} />
      <circle cx="200" cy="170" r="106" stroke="#8ef2ff" strokeOpacity="0.12" strokeWidth="14" />
      <path d="M200 64V276M94 170h212" stroke="#4da2ff" strokeOpacity="0.4" strokeDasharray="7 6" />
      <g stroke="#8ef2ff" strokeOpacity="0.7" strokeWidth="1.4">
        <path d="M94 302h212M94 296v12M306 296v12" />
      </g>
      <path d="M188 302h24" stroke="#05080f" strokeWidth="6" />
      <text x="200" y="306" fill="#8ef2ff" fontSize="11" fontFamily="monospace" textAnchor="middle">
        6
      </text>
      <Ladder id={id} cx={200} cy={170} r={106} />
      <Core id={id} cx={200} cy={170} r={34} />
    </Frame>
  );
}

export function CtfArt({ className }: ArtProps) {
  const id = 'pa-ctf';
  return (
    <Frame className={className}>
      <Defs id={id} />
      <circle cx="190" cy="172" r="148" stroke="#1c2740" strokeDasharray="1 10" />
      <path
        d="M190 62a110 110 0 0 1 88 176"
        stroke={`url(#${id}-ring)`}
        strokeWidth="2.6"
        strokeLinecap="round"
        filter={`url(#${id}-bloom)`}
      />
      <path
        d="M252 264a110 110 0 0 1-158-134"
        stroke={`url(#${id}-ring)`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <g filter={`url(#${id}-bloom)`}>
        <path d="M278 238l-26 26" stroke="#ff5c5c" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="5 6" />
        <path d="M292 214l10-6M300 246l12 4M268 272l-4 12" stroke="#ff8a8a" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      </g>
      <g filter={`url(#${id}-bloom)`} className="animate-float">
        <path d="M318 262V186" stroke="#ffe9b0" strokeWidth="3" strokeLinecap="round" />
        <path d="M318 188l40 13-40 13z" fill={`url(#${id}-gold)`} />
        <circle cx="318" cy="262" r="5" fill="#ffc75c" />
      </g>
      <Ladder id={id} cx={190} cy={172} r={110} />
      <Core id={id} cx={190} cy={172} r={40} />
    </Frame>
  );
}

export function SecurityArt({ className }: ArtProps) {
  const id = 'pa-sec';
  return (
    <Frame className={className}>
      <Defs id={id} />
      <ellipse cx="200" cy="176" rx="140" ry="150" fill={`url(#${id}-halo)`} opacity="0.5" />
      <path
        d="M200 28l122 47v100c0 79-52 139-122 160-70-21-122-81-122-160V75z"
        fill="#0a1322"
        stroke={`url(#${id}-ring)`}
        strokeWidth="2.4"
        strokeLinejoin="round"
        filter={`url(#${id}-bloom)`}
      />
      <path
        d="M200 28l122 47v100c0 79-52 139-122 160z"
        fill={`url(#${id}-glass)`}
      />
      <circle
        cx="200"
        cy="168"
        r="74"
        stroke={`url(#${id}-ring)`}
        strokeWidth="2"
        strokeDasharray="92 24"
        strokeLinecap="round"
      />
      <Ladder id={id} cx={200} cy={168} r={74} />
      <Core id={id} cx={200} cy={168} r={34} />
      <g filter={`url(#${id}-bloom)`}>
        <path d="M178 168h44" stroke="#6ce7b4" strokeWidth="3" strokeLinecap="round" />
        <path d="M178 158h44" stroke="#6ce7b4" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      </g>
    </Frame>
  );
}

export function SponsorArt({ className }: ArtProps) {
  const id = 'pa-spon';
  return (
    <Frame className={className}>
      <Defs id={id} />
      <ellipse cx="200" cy="96" rx="110" ry="86" fill={`url(#${id}-halo-gold)`} />
      <g filter={`url(#${id}-bloom)`} className="animate-float">
        <path d="M164 40h72v34a36 36 0 0 1-72 0z" fill={`url(#${id}-gold)`} />
        <path d="M164 40h72v34a36 36 0 0 1-72 0z" fill={`url(#${id}-glass)`} />
        <path
          d="M164 48h-18a20 20 0 0 0 18 20M236 48h18a20 20 0 0 1-18 20"
          stroke="#ffc75c"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path d="M200 110v18" stroke="#ffc75c" strokeWidth="6" strokeLinecap="round" />
        <path d="M176 134h48l-5 12h-38z" fill={`url(#${id}-gold)`} />
        <path d="M178 50c0 16 4 27 11 34" stroke="#fff6df" strokeOpacity="0.8" strokeWidth="4" strokeLinecap="round" />
      </g>
      {[
        { x: 104, y: 186, r: 20, d: '0s' },
        { x: 296, y: 190, r: 17, d: '1.3s' },
        { x: 200, y: 212, r: 14, d: '2.5s' },
      ].map((c) => (
        <g key={c.x} className="animate-float" style={{ animationDelay: c.d }} filter={`url(#${id}-bloom)`}>
          <ellipse cx={c.x} cy={c.y} rx={c.r} ry={c.r * 0.36} fill={`url(#${id}-gold)`} />
          <ellipse cx={c.x} cy={c.y - 2.5} rx={c.r * 0.6} ry={c.r * 0.2} fill="#fff6df" opacity="0.5" />
        </g>
      ))}
      <ellipse cx="200" cy="264" rx="152" ry="52" fill={`url(#${id}-core)`} opacity="0.55" />
      <ellipse cx="200" cy="264" rx="152" ry="52" stroke={`url(#${id}-ring)`} strokeWidth="2" />
      <ellipse cx="200" cy="264" rx="100" ry="32" stroke="#dbeeff" strokeOpacity="0.18" />
      <ellipse cx="200" cy="264" rx="48" ry="14" stroke="#dbeeff" strokeOpacity="0.12" />
    </Frame>
  );
}

export function FaqArt({ className }: ArtProps) {
  const id = 'pa-faq';
  return (
    <Frame className={className}>
      <Defs id={id} />
      <circle cx="200" cy="170" r="146" stroke="#1c2740" strokeDasharray="1 10" />
      <circle
        cx="200"
        cy="170"
        r="106"
        stroke={`url(#${id}-ring)`}
        strokeWidth="2"
        strokeDasharray="96 26"
        strokeLinecap="round"
        filter={`url(#${id}-bloom)`}
      />
      {[0, 1, 2, 3, 4].map((index) => {
        const angle = (index / 5) * Math.PI * 2 - Math.PI / 2;
        const x = 200 + Math.cos(angle) * 134;
        const y = 170 + Math.sin(angle) * 134;
        return (
          <g
            key={index}
            className="animate-float"
            style={{ animationDelay: `${index * 0.55}s` }}
            filter={`url(#${id}-bloom)`}
          >
            <circle cx={x} cy={y} r="21" fill={`url(#${id}-core)`} />
            <circle cx={x} cy={y} r="21" fill={`url(#${id}-glass)`} />
            <path
              d={`M${x - 6} ${y - 5}a6 6 0 1 1 6 7v3`}
              stroke="#eaf4ff"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx={x} cy={y + 10} r="1.8" fill="#eaf4ff" />
          </g>
        );
      })}
      <Core id={id} cx={200} cy={170} r={40} />
    </Frame>
  );
}

export function CommunityArt({ className }: ArtProps) {
  const id = 'pa-comm';
  const nodes = [
    { x: 200, y: 66 },
    { x: 318, y: 138 },
    { x: 276, y: 268 },
    { x: 124, y: 268 },
    { x: 82, y: 138 },
  ];
  return (
    <Frame className={className}>
      <Defs id={id} />
      <circle cx="200" cy="176" r="148" stroke="#1c2740" strokeDasharray="1 10" />
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => (
          <path
            key={`${i}-${j}`}
            d={`M${a.x} ${a.y} L${b.x} ${b.y}`}
            stroke={`url(#${id}-ring)`}
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
        )),
      )}
      {nodes.map((n, i) => (
        <g key={i} className="animate-float" style={{ animationDelay: `${i * 0.5}s` }} filter={`url(#${id}-bloom)`}>
          <circle cx={n.x} cy={n.y} r="24" fill={`url(#${id}-core)`} />
          <circle cx={n.x} cy={n.y} r="24" fill={`url(#${id}-glass)`} />
          <ellipse cx={n.x - 7} cy={n.y - 8} rx="9" ry="6" fill="#ffffff" opacity="0.28" transform={`rotate(-28 ${n.x - 7} ${n.y - 8})`} />
        </g>
      ))}
      <Core id={id} cx={200} cy={176} r={34} />
    </Frame>
  );
}

export function LegalArt({ className }: ArtProps) {
  const id = 'pa-legal';
  return (
    <Frame className={className}>
      <Defs id={id} />
      <ellipse cx="200" cy="170" rx="130" ry="140" fill={`url(#${id}-halo)`} opacity="0.4" />
      <rect x="108" y="40" width="184" height="240" rx="20" fill="#0a1322" stroke="#2f3f61" strokeWidth="1.4" />
      <rect x="108" y="40" width="184" height="240" rx="20" fill={`url(#${id}-glass)`} />
      {[88, 118, 148, 178].map((y, index) => (
        <path
          key={y}
          d={`M142 ${y}h${index % 2 === 0 ? 116 : 84}`}
          stroke={`url(#${id}-ring)`}
          strokeOpacity={0.45 - index * 0.07}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      <g filter={`url(#${id}-bloom)`}>
        <circle cx="200" cy="240" r="38" fill={`url(#${id}-core)`} />
        <circle cx="200" cy="240" r="38" fill={`url(#${id}-glass)`} />
        <path d="M186 226l28 28" stroke="#eaf4ff" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M214 226l-28 28" stroke="#6ce7b4" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="4 4" />
      </g>
    </Frame>
  );
}

/**
 * The social platform: principal intact at the centre, supporters in orbit around it, and the
 * one thing that leaves — the yield — streaming to a creator lit gold at the edge. The core
 * never moves; only the stream does. That is the product, drawn.
 */
export function SocialArt({ className }: ArtProps) {
  const id = 'pa-social';
  return (
    <Frame className={className}>
      <Defs id={id} />
      <circle cx="176" cy="182" r="150" stroke="#1c2740" strokeDasharray="1 10" />
      <g className="animate-spin-slow" style={{ transformOrigin: '176px 182px' }}>
        <circle
          cx="176"
          cy="182"
          r="104"
          stroke={`url(#${id}-ring)`}
          strokeWidth="2.5"
          strokeDasharray="76 28"
          strokeLinecap="round"
          filter={`url(#${id}-bloom)`}
        />
      </g>

      {/* Supporters: small, many, and each still whole — none is consumed by supporting. */}
      <g filter={`url(#${id}-bloom)`}>
        {[0, 1, 2, 3, 4].map((index) => {
          const angle = 0.55 + (index / 5) * Math.PI * 2;
          const x = 176 + Math.cos(angle) * 104;
          const y = 182 + Math.sin(angle) * 104;
          return (
            <g key={index}>
              <circle cx={x} cy={y} r="10" fill="#4da2ff" opacity="0.3" />
              <circle cx={x} cy={y} r="5" fill="#a5d0ff" opacity="0.9" />
            </g>
          );
        })}
      </g>

      {/* The yield stream — the only thing that travels outward. */}
      <path
        d="M226 132C258 106 288 84 330 62"
        stroke={`url(#${id}-yield)`}
        strokeWidth="3"
        strokeLinecap="round"
        filter={`url(#${id}-bloom)`}
      />

      {/* The creator: lit gold, fed by the stream, holding none of the principal. */}
      <g filter={`url(#${id}-bloom)`}>
        <circle cx="336" cy="58" r="42" fill={`url(#${id}-halo-gold)`} />
        <circle cx="336" cy="58" r="15" fill={`url(#${id}-gold)`} />
        <circle cx="336" cy="58" r="15" fill={`url(#${id}-glass)`} />
      </g>

      <Core id={id} cx={176} cy={182} r={44} />
    </Frame>
  );
}
