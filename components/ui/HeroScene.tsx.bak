// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
export function HeroScene({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 520" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="px-pool" x1="120" y1="300" x2="440" y2="440">
          <stop stopColor="#2b87ea" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#4da2ff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#22b076" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="px-pool-rim" x1="90" y1="300" x2="470" y2="330">
          <stop stopColor="#a5d0ff" />
          <stop offset="1" stopColor="#6ce7b4" />
        </linearGradient>
        <linearGradient id="px-coin" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffc75c" />
          <stop offset="1" stopColor="#c9860d" />
        </linearGradient>
        <linearGradient id="px-trophy" x1="240" y1="90" x2="320" y2="230">
          <stop stopColor="#ffe9b0" />
          <stop offset="0.5" stopColor="#ffb020" />
          <stop offset="1" stopColor="#c9860d" />
        </linearGradient>
        <radialGradient id="px-beam" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#ffb020" stopOpacity="0.42" />
          <stop offset="1" stopColor="#ffb020" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="px-glow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#4da2ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#4da2ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="280" cy="360" rx="250" ry="150" fill="url(#px-glow)" opacity="0.55" />
      <ellipse cx="280" cy="170" rx="130" ry="150" fill="url(#px-beam)" />

      {[
        { x: 92, y: 132, r: 3.5, d: '0s' },
        { x: 470, y: 108, r: 2.6, d: '1.4s' },
        { x: 132, y: 236, r: 2.2, d: '2.6s' },
        { x: 442, y: 224, r: 3.2, d: '0.7s' },
        { x: 500, y: 300, r: 2, d: '2s' },
        { x: 62, y: 300, r: 2.4, d: '3.1s' },
      ].map((spark) => (
        <circle
          key={`${spark.x}-${spark.y}`}
          cx={spark.x}
          cy={spark.y}
          r={spark.r}
          fill="#a5d0ff"
          opacity="0.75"
          className="animate-float"
          style={{ animationDelay: spark.d }}
        />
      ))}

      <g className="animate-float" style={{ transformOrigin: '280px 170px' }}>
        <path
          d="M236 96h88v42a44 44 0 0 1-88 0V96Z"
          fill="url(#px-trophy)"
          stroke="#ffe9b0"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <path
          d="M236 104h-20a22 22 0 0 0 20 22M324 104h20a22 22 0 0 1-20 22"
          stroke="#ffc75c"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M280 182v26" stroke="#ffc75c" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M252 216h56l-6 14h-44l-6-14Z"
          fill="url(#px-trophy)"
          stroke="#ffe9b0"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="M252 108c0 18 4 30 12 38"
          stroke="#fff6df"
          strokeOpacity="0.75"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {[
        { cx: 176, cy: 268, rx: 26, ry: 9, d: '0.2s' },
        { cx: 388, cy: 250, rx: 22, ry: 8, d: '1.1s' },
        { cx: 300, cy: 288, rx: 18, ry: 6.5, d: '2.2s' },
      ].map((coin) => (
        <g key={coin.cx} className="animate-float" style={{ animationDelay: coin.d }}>
          <ellipse
            cx={coin.cx}
            cy={coin.cy}
            rx={coin.rx}
            ry={coin.ry}
            fill="url(#px-coin)"
            stroke="#ffe9b0"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <ellipse
            cx={coin.cx}
            cy={coin.cy - 2.5}
            rx={coin.rx * 0.62}
            ry={coin.ry * 0.5}
            fill="#fff6df"
            fillOpacity="0.35"
          />
        </g>
      ))}

      <g>
        <ellipse cx="280" cy="352" rx="196" ry="62" fill="url(#px-pool)" />
        <ellipse
          cx="280"
          cy="352"
          rx="196"
          ry="62"
          stroke="url(#px-pool-rim)"
          strokeOpacity="0.65"
          strokeWidth="2.5"
        />
        <ellipse cx="280" cy="352" rx="140" ry="42" stroke="#dbeeff" strokeOpacity="0.28" strokeWidth="1.5" />
        <ellipse cx="280" cy="352" rx="86" ry="26" stroke="#dbeeff" strokeOpacity="0.2" strokeWidth="1.5" />
        <ellipse cx="280" cy="352" rx="38" ry="11" stroke="#dbeeff" strokeOpacity="0.14" strokeWidth="1.5" />

        {['0s', '2.5s'].map((delay) => (
          <ellipse
            key={delay}
            cx="280"
            cy="352"
            rx="150"
            ry="46"
            stroke="#8ef2ff"
            strokeWidth="2"
            fill="none"
            className="animate-ripple-out"
            style={{ transformOrigin: '280px 352px', animationDelay: delay }}
          />
        ))}

        <path
          d="M84 352c0 34 88 62 196 62s196-28 196-62v34c0 34-88 62-196 62S84 420 84 386v-34Z"
          fill="url(#px-pool)"
          fillOpacity="0.55"
        />
        <path
          d="M84 386c0 34 88 62 196 62s196-28 196-62"
          stroke="url(#px-pool-rim)"
          strokeOpacity="0.35"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {[
        { cx: 212, cy: 392, r: 5, d: '0.4s' },
        { cx: 330, cy: 404, r: 3.5, d: '1.8s' },
        { cx: 268, cy: 418, r: 2.8, d: '2.9s' },
      ].map((bubble) => (
        <circle
          key={bubble.cx}
          cx={bubble.cx}
          cy={bubble.cy}
          r={bubble.r}
          fill="#dbeeff"
          fillOpacity="0.4"
          className="animate-float"
          style={{ animationDelay: bubble.d }}
        />
      ))}
    </svg>
  );
}
