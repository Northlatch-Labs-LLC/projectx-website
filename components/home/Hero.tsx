
import { LiveBadge } from '@/components/ui/LiveBadge';
import { Button } from '@/components/ui/Button';
import { AuroraBackdrop, GlowBackdrop } from '@/components/ui/Backdrop';
import { NameSearch } from '@/components/home/NameSearch';
import { DAPP_URL, RAFFLE_URL } from '@/lib/links';
import { priceSentence } from '@/lib/suins-pricing';

export function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden">
      <AuroraBackdrop />
      <GlowBackdrop tone="accent" position="top" />

      <div className="mx-auto grid max-w-content items-center gap-10 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {}
        <div className="flex min-w-0 flex-col items-start gap-6">
          <LiveBadge />

          {}
          <h1 className="text-hero">
            Your money, your name, your odds{' '}
            <br />
            <span className="text-gradient-accent">and none of it needs trusting us.</span>
          </h1>

          {}
          <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-px-faint">
            Experimental, unaudited software. Not a bank, not a savings product, not investment
            advice.
          </p>
        </div>

        {}
        <div className="panel flex w-full min-w-0 flex-col gap-5 p-6 sm:p-8">
          <p className="text-lg leading-relaxed text-px-muted">
            <span className="font-semibold text-white">Start with a name.</span> A{' '}
            <code>.sui</code> name replaces the sixty-four characters of your wallet address with
            something a person can type. It costs {priceSentence()} and arrives in one transaction.
          </p>

          <NameSearch />

          <div className="mt-1 border-t border-white/[0.07] pt-5">
            <p className="label mb-3">Or start somewhere else</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={`${RAFFLE_URL}/organiser`}
                variant="secondary"
                showExternalIcon={false}
                className="flex-1 justify-center"
              >
                Run a competition
              </Button>
              {DAPP_URL && (
                <Button
                  href={DAPP_URL}
                  variant="secondary"
                  showExternalIcon={false}
                  className="flex-1 justify-center"
                >
                  Open the vault
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
