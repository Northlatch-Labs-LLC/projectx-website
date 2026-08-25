// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { ReactNode } from 'react';

const TONES = {
  accent: 'border-px-accent/35 bg-px-accent/10 text-px-accent-200',
  prize: 'border-px-prize/35 bg-px-prize/10 text-px-prize',
  gold: 'border-px-gold/35 bg-px-gold/10 text-px-gold',
  danger: 'border-px-danger/40 bg-px-danger/10 text-px-danger',
  neutral: 'border-white/[0.1] bg-white/[0.04] text-px-muted',
} as const;

export function Badge({
  children,
  tone = 'neutral',
  className = '',
  ...rest
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'>) {
  return (
    <span className={`badge ${TONES[tone]} ${className}`} {...rest}>
      {children}
    </span>
  );
}

/**
 * The status dot. It pulses only while something is actually live.
 *
 * The ring used to run unconditionally, which made it decoration wearing the costume of a status
 * light: the page could show a pulsing green dot beside the word "Live" while the reader was
 * looking at figures served from a baked snapshot because the feed was unreachable. A visitor has
 * no way to tell those two states apart, and this project's whole argument is that an outage and
 * an observation must never look the same.
 *
 * `pulsing` is therefore a required decision at every call site rather than a default. Motion is
 * the signal here — a still dot means the data behind it is not live.
 */
export function LiveDot({
  tone = 'prize',
  pulsing,
  className = '',
}: {
  tone?: 'prize' | 'accent' | 'gold' | 'danger';
  /** Pass the real liveness of whatever this dot is reporting on. */
  pulsing: boolean;
  className?: string;
}) {
  const colour =
    tone === 'accent'
      ? 'bg-px-accent'
      : tone === 'gold'
        ? 'bg-px-gold'
        : tone === 'danger'
          ? 'bg-px-danger'
          : 'bg-px-prize';

  return (
    <span className={`relative inline-flex h-2 w-2 shrink-0 ${className}`} aria-hidden="true">
      {pulsing ? (
        <span className={`absolute inset-0 rounded-full ${colour} opacity-70 animate-pulse-ring`} />
      ) : null}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colour}`} />
    </span>
  );
}
