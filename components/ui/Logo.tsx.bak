// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
/**
 * The wordmark's X. Rendered in the header, the footer and the mobile drawer, so its gradient ids
 * have to be unique per instance.
 *
 * SVG ids share a single namespace across the document. Every instance previously declared
 * `px-mark-a` and `px-mark-b`, so a page carried two or three elements under each id. Every stroke
 * in this mark — the ring included — paints through one of those references, and a reference that
 * fails to resolve renders as no paint at all rather than falling back to a colour. On engines
 * that resolve duplicate ids loosely, notably iOS Safari, what survives is the dark tile behind it
 * and the dark centre dot: a black square with no X in it.
 *
 * The namespace is a prop rather than useId or a module counter. This mark renders from server
 * components (the footer) as well as client ones (the header, the drawer), which rules out hooks;
 * and a counter would produce different values on the server and on hydration, which React reports
 * as a mismatched attribute. An explicit value at each call site is the only one of the three that
 * is both server-safe and stable across hydration.
 */
export function LogoMark({
  className = 'h-8 w-8',
  ns = 'default',
}: {
  className?: string;
  /** Must differ per instance on a page. See the note above. */
  ns?: string;
}) {
  const a = `px-mark-a-${ns}`;
  const b = `px-mark-b-${ns}`;

  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={a} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7bb9ff" />
          <stop offset="1" stopColor="#2b87ea" />
        </linearGradient>
        <linearGradient id={b} x1="36" y1="6" x2="8" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ce7b4" />
          <stop offset="1" stopColor="#22b076" />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="15.5"
        stroke={`url(#${a})`}
        strokeOpacity="0.34"
        strokeWidth="1.6"
      />
      <path d="M11 11 L29 29" stroke={`url(#${a})`} strokeWidth="4.2" strokeLinecap="round" />
      <path d="M29 11 L11 29" stroke={`url(#${b})`} strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2.6" fill="#0a1220" />
    </svg>
  );
}

export function Logo({ className = '', ns = 'default' }: { className?: string; ns?: string }) {
  return (
    <span className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-px-accent/25 blur-lg transition-opacity duration-500 group-hover:opacity-80"
        />
        <span className="ring-gradient relative inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#0a1220]">
          <LogoMark className="h-[1.35rem] w-[1.35rem]" ns={ns} />
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-gradient-chrome text-[1.0625rem] font-semibold tracking-[-0.025em]">
          Project<span className="text-px-accent">X</span>
        </span>
        <span className="mt-1 hidden text-[0.5625rem] font-medium uppercase tracking-[0.26em] text-px-faint sm:block">
          Prize Protocol
        </span>
      </span>
    </span>
  );
}
