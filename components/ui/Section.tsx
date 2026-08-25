// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { ReactNode } from 'react';

// Owns vertical padding for every page. Callers must not set their own py-*.
export function Section({
  children,
  id,
  tone = 'plain',
  className = '',
  width = 'content',
}: {
  children: ReactNode;
  id?: string;
  tone?: 'plain' | 'panel' | 'edge';
  className?: string;
  width?: 'content' | 'prose' | 'wide';
}) {
  const toneClass =
    tone === 'panel'
      ? 'bg-px-bg-alt/70 border-y border-white/[0.05]'
      : tone === 'edge'
        ? 'border-y border-white/[0.04]'
        : '';

  const widthClass =
    width === 'prose' ? 'max-w-prose' : width === 'wide' ? 'max-w-[92rem]' : 'max-w-content';

  return (
    <section id={id} className={`relative w-full scroll-mt-24 ${toneClass}`}>
      <div className={`mx-auto w-full px-5 py-20 sm:px-8 md:py-28 ${widthClass} ${className}`}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  proof,
  align = 'center',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  proof?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centred = align === 'center';

  return (
    <div className={`flex flex-col gap-5 ${centred ? 'items-center text-center' : ''} ${className}`}>
      {eyebrow ? (
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-px-cyan shadow-[0_0_10px_2px_rgb(var(--px-hue-3)/0.85)]"
          />
          <span className="label bg-gradient-to-r from-px-cyan to-px-accent-200 bg-clip-text text-transparent">
            {eyebrow}
          </span>
          {!centred ? (
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-px-cyan/60 to-transparent"
            />
          ) : null}
        </span>
      ) : null}

      <h2 className="text-gradient-chrome max-w-[20ch] text-title sm:max-w-[26ch]">{title}</h2>

      {lead ? <p className={`lead ${centred ? 'mx-auto' : ''}`}>{lead}</p> : null}

      {proof ? (
        <p className={`proof ${centred ? 'proof-centered' : 'mt-1 border-l-2 border-px-accent/30 pl-4'}`}>
          {proof}
        </p>
      ) : null}
    </div>
  );
}
