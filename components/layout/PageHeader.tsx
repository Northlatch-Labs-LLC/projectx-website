// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
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

      {/*
        Left to right, not center-stacked (the brand ruling). The text column runs down the left
        edge, the same way the hub home's own Hero does (components/home/Hero.tsx): a two-column
        grid at lg and up, headline on one side, art on the other; a single left-aligned column
        below lg, where the grid has no second track and the items stack in source order — text
        first, art after it, never a centred pile.
      */}
      <div
        className={
          art
            ? 'mx-auto grid max-w-content items-center gap-10 px-5 pb-16 pt-14 sm:px-8 md:pb-20 md:pt-16 lg:grid-cols-[1fr_1fr] lg:gap-16'
            : 'mx-auto flex max-w-content flex-col items-start px-5 pb-16 pt-14 sm:px-8 md:pb-20 md:pt-16'
        }
      >
        <div className="flex min-w-0 flex-col items-start gap-5">
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
          {lead ? <p className="lead">{lead}</p> : null}
          {proof ? <p className="proof mt-1 border-l-2 border-px-accent/30 pl-4">{proof}</p> : null}
          {children ? (
            <div className="mt-2 flex flex-wrap items-center gap-3">{children}</div>
          ) : null}
        </div>

        {art ? (
          <div className="w-full min-w-0 max-w-[17rem] animate-drift justify-self-center sm:max-w-[21rem] lg:max-w-[27rem] xl:max-w-[32rem]">
            {art}
          </div>
        ) : null}
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
