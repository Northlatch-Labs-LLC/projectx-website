// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Button } from '@/components/ui/Button';
import { NotifySignup } from '@/components/ui/NotifySignup';
import { AuroraBackdrop, GlowBackdrop } from '@/components/ui/Backdrop';
import { Signature } from '@/components/ui/Signature';
import { ArrowUpRight } from '@/components/ui/Icons';
import { DAPP_URL, NAMES_URL, RAFFLE_URL } from '@/lib/links';

export function CtaBand() {
  return (
    <section className="relative isolate w-full overflow-hidden border-t border-white/[0.06]">
      <AuroraBackdrop />
      <GlowBackdrop tone="accent" position="bottom" />

      <div className="mx-auto flex max-w-content flex-col items-center gap-7 px-5 py-24 text-center sm:px-8 md:py-28">
        <Signature width="short" className="mb-2" />

        <h2 className="text-gradient-chrome max-w-2xl text-display">
          Get the measurement.
          <br />
          <span className="text-gradient-accent">Then decide who to trust.</span>
        </h2>

        {/*
          Do not print the depositor count here. The hero withholds that figure below a
          DISPLAY_FLOOR threshold (see components/home/Hero.tsx), and restating it two screens
          later defeats that guard — the page would show a number it had just decided to hide.
          Nothing in this paragraph depends on the stats fetch, so it renders identically whether
          or not the API answered.
        */}
        <p className="lead mx-auto text-center">
          Five gates on one Move package, from $1,000, returned as an evidence bundle whose digest
          you can re-derive without us. Turnaround is agreed in writing when you order. It is a
          measurement, not an audit, and we will never call it one.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/verification" variant="primary" className="px-7">
            See what it measures
          </Button>
          <Button href={NAMES_URL} variant="secondary" showExternalIcon={false}>
            Claim a .sui name
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          {/* /organiser/apply, not /organiser — the console refuses any wallet not on the
              platform allowlist. See the note in components/home/Organisers.tsx. */}
          <Button href={`${RAFFLE_URL}/organiser/apply`} variant="secondary" showExternalIcon={false}>
            Run a competition
          </Button>
          {DAPP_URL && (
            <Button href={DAPP_URL} variant="secondary" showExternalIcon={false}>
              Open the vault
            </Button>
          )}
        </div>

        <div className="mt-6 flex w-full flex-col items-center">
          <NotifySignup source="home" />
        </div>
      </div>
    </section>
  );
}
