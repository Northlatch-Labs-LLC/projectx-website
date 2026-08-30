// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
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

        {/* The close used to be vault-only — "Keep your SUI, play with the yield", one button, to
            the slowest of the three. It is the last thing on a page that now spends three sections
            on three products, so it offers all three and leads with the one that completes today. */}
        <h2 className="text-gradient-chrome max-w-2xl text-display">
          Start with a name.
          <br />
          <span className="text-gradient-accent">It takes one transaction.</span>
        </h2>

        {/*
          The depositor count used to open this sentence. The hero now withholds that same figure
          below a threshold precisely because it argues against joining — and printing it here
          undid that two screens later, which is worse than never having hidden it: the page
          contradicts itself about which numbers it is willing to show.

          What is left is the claim that does not weaken with a small pool. "Not one has ever lost
          a coin" is a property of the contract rather than of the fetch, so it holds whether the
          API answered or not, and it gets stronger as the count grows rather than weaker.
        */}
        <p className="lead mx-auto text-center">
          Every deposit ever made has come back in full. That is enforced by the contract, not by
          our conduct — the vault has no function that can spend your principal.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={NAMES_URL} variant="primary" showExternalIcon={false} className="px-7">
            Claim a .sui name
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button href={`${RAFFLE_URL}/organiser`} variant="secondary" showExternalIcon={false}>
            Run a competition
          </Button>
          {DAPP_URL && (
            <Button href={DAPP_URL} variant="secondary" showExternalIcon={false}>
              Open the vault
            </Button>
          )}
        </div>

        {/* The one thing a visitor who is not ready to transact can still leave behind: a way to
            be told when something ships. Below the buttons, because acting now beats subscribing;
            present at all, because until it was, every not-today visitor left without a trace. */}
        <div className="mt-6 flex w-full flex-col items-center">
          <NotifySignup source="home" />
        </div>
      </div>
    </section>
  );
}
