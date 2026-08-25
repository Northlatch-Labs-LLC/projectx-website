// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { ReactNode } from 'react';
import { AuroraBackdrop, GlowBackdrop, GridBackdrop } from '@/components/ui/Backdrop';

export function PageHeader({
  eyebrow,
  title,
  lead,
  proof,
  art,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  proof?: ReactNode;
  art?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate w-full overflow-hidden">
      <GridBackdrop />
      <AuroraBackdrop />
      <GlowBackdrop tone="accent" position="top" />

      <div className="mx-auto flex max-w-content flex-col items-center px-5 pb-16 pt-14 text-center sm:px-8 md:pb-20 md:pt-16">
        {art ? (
          <div className="mb-3 w-full max-w-[17rem] animate-drift sm:max-w-[21rem] lg:max-w-[27rem] xl:max-w-[32rem]">
            {art}
          </div>
        ) : null}

        <div className="flex flex-col items-center gap-5">
          <span className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-px-cyan shadow-[0_0_10px_2px_rgba(63,216,245,0.85)]"
            />
            <span className="label bg-gradient-to-r from-px-cyan to-px-accent-200 bg-clip-text text-transparent">
              {eyebrow}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-px-cyan/60 to-transparent"
            />
          </span>

          <h1 className="text-gradient-chrome max-w-[22ch] text-display">{title}</h1>
          {lead ? <p className="lead mx-auto">{lead}</p> : null}
          {proof ? <p className="proof proof-centered">{proof}</p> : null}
          {children ? (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">{children}</div>
          ) : null}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(77,162,255,0.32) 22%, rgba(63,216,245,0.4) 50%, rgba(77,162,255,0.32) 78%, transparent)',
        }}
      />
    </header>
  );
}
