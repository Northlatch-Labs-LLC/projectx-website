
import { Button } from '@/components/ui/Button';
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

        {}
        <h2 className="text-gradient-chrome max-w-2xl text-display">
          Start with a name.
          <br />
          <span className="text-gradient-accent">It takes one transaction.</span>
        </h2>

        {}
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
      </div>
    </section>
  );
}
