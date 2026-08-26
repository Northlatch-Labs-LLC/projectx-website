
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

export function LiveDot({
  tone = 'prize',
  pulsing,
  className = '',
}: {
  tone?: 'prize' | 'accent' | 'gold' | 'danger';

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
