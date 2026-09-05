// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { ReactNode } from 'react';

export function Callout({
  title,
  children,
  actions,
  tone = 'lit',
  className = '',
}: {
  title?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: 'lit' | 'quiet';
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${
        tone === 'lit'
          ? 'ring-gradient bg-gradient-to-br from-px-accent/[0.07] via-px-cyan/[0.04] to-transparent'
          : 'border border-white/[0.06] bg-white/[0.02]'
      } ${className}`}
    >
      {tone === 'lit' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 animate-aurora rounded-full bg-px-cyan/15 blur-3xl"
        />
      ) : null}

      <div className="relative flex flex-col items-center gap-6 p-6 text-center md:p-9">
        <div className="flex flex-col items-center gap-2.5">
          {title ? (
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          ) : null}
          {children ? (
            <div className="body-copy mx-auto">{children}</div>
          ) : null}
        </div>

        {actions ? (
          <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
