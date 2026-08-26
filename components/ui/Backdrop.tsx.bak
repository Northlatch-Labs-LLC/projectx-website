// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
export function GridBackdrop({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-grid mask-fade-b ${className}`}
    />
  );
}

export function AuroraBackdrop({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <span className="absolute -left-1/4 -top-1/3 h-[42rem] w-[42rem] animate-aurora rounded-full bg-px-accent/[0.13] blur-[110px]" />
      <span className="absolute -right-1/4 top-0 h-[34rem] w-[34rem] animate-aurora-slow rounded-full bg-px-prize/[0.07] blur-[120px]" />
    </div>
  );
}

export function GlowBackdrop({
  tone = 'accent',
  position = 'top',
  className = '',
}: {
  tone?: 'accent' | 'prize' | 'gold';
  position?: 'top' | 'center' | 'bottom';
  className?: string;
}) {
  const colour =
    tone === 'prize'
      ? 'rgba(61,220,151,0.14)'
      : tone === 'gold'
        ? 'rgba(255,176,32,0.12)'
        : 'rgba(77,162,255,0.18)';

  const place =
    position === 'top' ? 'top-[-30%]' : position === 'bottom' ? 'bottom-[-30%]' : 'top-1/4';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -z-10 h-[38rem] w-[70rem] -translate-x-1/2 ${place} ${className}`}
      style={{ background: `radial-gradient(closest-side, ${colour}, transparent 72%)` }}
    />
  );
}

export function OrbitFigure({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
      className={className}
      role="presentation"
    >
      <defs>
        <linearGradient id="px-orbit-ring" x1="80" y1="80" x2="440" y2="440">
          <stop stopColor="#7bb9ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2b87ea" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="px-orbit-yield" x1="120" y1="400" x2="460" y2="90">
          <stop stopColor="#3ddc97" stopOpacity="0" />
          <stop offset="0.45" stopColor="#3ddc97" stopOpacity="0.85" />
          <stop offset="1" stopColor="#6ce7b4" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="px-orbit-core" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#4da2ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4da2ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="260" r="248" stroke="#1c2740" strokeWidth="1" />
      <circle cx="260" cy="260" r="196" stroke="#1c2740" strokeWidth="1" strokeDasharray="2 8" />

      <g className="animate-spin-slow" style={{ transformOrigin: '260px 260px' }}>
        <circle
          cx="260"
          cy="260"
          r="150"
          stroke="url(#px-orbit-ring)"
          strokeWidth="2"
          strokeDasharray="118 34"
          strokeLinecap="round"
        />
      </g>

      {[0, 1, 2, 3, 4, 5].map((index) => {
        const angle = (index / 6) * Math.PI * 2 - Math.PI / 2;
        const x = 260 + Math.cos(angle) * 150;
        const y = 260 + Math.sin(angle) * 150;
        return (
          <g key={index}>
            <circle cx={x} cy={y} r="7" fill="#0b1220" stroke="#4da2ff" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="2.5" fill="#4da2ff" opacity={0.35 + index * 0.11} />
          </g>
        );
      })}

      <path
        d="M148 372 C 210 330, 250 300, 292 250 C 330 205, 372 150, 452 96"
        stroke="url(#px-orbit-yield)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="7 9"
        className="animate-dash"
      />
      <circle cx="452" cy="96" r="5" fill="#6ce7b4" />
      <circle cx="452" cy="96" r="13" stroke="#3ddc97" strokeOpacity="0.35" strokeWidth="1" />

      <circle cx="260" cy="260" r="86" fill="url(#px-orbit-core)" />
      <circle cx="260" cy="260" r="54" fill="#0b1220" stroke="#2a3856" strokeWidth="1" />
      <circle cx="260" cy="260" r="54" stroke="#4da2ff" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 6" />
    </svg>
  );
}

export function StreamBackdrop({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 200"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 -z-10 h-40 w-full opacity-60 ${className}`}
    >
      <defs>
        <linearGradient id="px-stream-a" x1="0" y1="0" x2="1200" y2="0">
          <stop stopColor="#4da2ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#4da2ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#4da2ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="px-stream-b" x1="0" y1="0" x2="1200" y2="0">
          <stop stopColor="#3ddc97" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3ddc97" stopOpacity="0.45" />
          <stop offset="1" stopColor="#3ddc97" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 70 C 300 40, 900 40, 1200 70" stroke="url(#px-stream-a)" strokeWidth="1.5" />
      <path d="M0 100 C 300 130, 900 130, 1200 100" stroke="url(#px-stream-b)" strokeWidth="1.5" />
      <path d="M0 85 C 300 85, 900 85, 1200 85" stroke="url(#px-stream-a)" strokeWidth="1" strokeDasharray="3 12" className="animate-dash" />
    </svg>
  );
}
