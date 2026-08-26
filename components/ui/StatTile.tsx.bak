// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { ReactNode } from 'react';
import { AnimatedNumber } from './AnimatedNumber';

export function StatTile({
  label,
  value,
  unit,
  note,
  accent = 'default',
  animate = false,
  className = '',
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  note?: ReactNode;
  accent?: 'default' | 'accent' | 'prize' | 'gold';
  animate?: boolean;
  className?: string;
}) {
  const valueColor =
    accent === 'accent'
      ? 'text-px-accent-200'
      : accent === 'prize'
        ? 'text-px-prize'
        : accent === 'gold'
          ? 'text-px-gold'
          : 'text-white';

  const canAnimate = animate && (typeof value === 'string' || typeof value === 'number');

  return (
    <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
      <span className="label">{label}</span>
      <span className="flex items-baseline justify-center gap-1.5">
        {canAnimate ? (
          <AnimatedNumber value={String(value)} className={`stat-value ${valueColor}`} />
        ) : (
          <span className={`stat-value ${valueColor}`}>{value}</span>
        )}
        {unit ? <span className="text-[0.9375rem] font-medium text-px-faint">{unit}</span> : null}
      </span>
      {note ? <span className="text-[0.875rem] leading-[1.6] text-px-faint">{note}</span> : null}
    </div>
  );
}
