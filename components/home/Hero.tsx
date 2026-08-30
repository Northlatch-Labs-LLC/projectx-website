// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import { LiveBadge } from '@/components/ui/LiveBadge';
import { Button } from '@/components/ui/Button';
import { AuroraBackdrop, GlowBackdrop } from '@/components/ui/Backdrop';
import { NameSearch } from '@/components/home/NameSearch';
import { DAPP_URL, RAFFLE_URL } from '@/lib/links';
import { priceSentence } from '@/lib/suins-pricing';

/**
 * Headline on one side, the thing to do on the other.
 *
 * The offer in that panel was a name until 30 August 2026, when the Master ruled verification the
 * main service promoted on this hub and Names explicitly not the flagship. The panel now leads
 * with the First Report and keeps the name search below the divider — demoted, not withdrawn.
 * Nothing was deleted to make room: NameSearch is the same component, unchanged.
 *
 * The right half used to hold an illustrated trophy ringed by floating labels — "no loss to date",
 * "daily draw", "withdraw anytime", "someone wins tonight". Six phrases orbiting a cup, none of
 * them clickable, all of them competing with the one control on the page that takes money. The
 * offer now occupies that space instead: the sentence, the search, and the two other products.
 *
 * The pool figures that used to sit under this have moved to the vault section, which is what they
 * measure. A depositor count is not a fact about the company, and reading it beside a name search
 * asked the visitor to hold two unrelated products in mind at once.
 *
 * The grid backdrop went with them. Aurora and the top glow stay — they are the site's ground, not
 * an illustration.
 */
export function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden">
      <AuroraBackdrop />
      <GlowBackdrop tone="accent" position="top" />

      <div className="mx-auto grid max-w-content items-center gap-10 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* min-w-0 is load-bearing. A grid item defaults to min-width:auto, so it refuses to shrink
            below its own content — at 375px the headline held this column at 367px inside 335px of
            available width, and the section's overflow-hidden silently cut the right edge off
            rather than scrolling. The text had no chance to wrap because the box never narrowed. */}
        <div className="flex min-w-0 flex-col items-start gap-6">
          <LiveBadge />

          {/* The space before <br /> is deliberate. Without it the accessible name concatenates
              to "proofand none of it" — a screen reader says one word. */}
          <h1 className="text-hero">
            We break our own contracts{' '}
            <br />
            <span className="text-gradient-accent">so you don’t find out how.</span>
          </h1>

          {/* Task-mandated disclosure, in body weight and above the fold at every width. */}
          <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-px-faint">
            Experimental, unaudited software. Not a bank, not a savings product, not investment
            advice.
          </p>
        </div>

        {/* The offer, in the space the illustration used to occupy. */}
        <div className="panel flex w-full min-w-0 flex-col gap-5 p-6 sm:p-8">
          <p className="text-lg leading-relaxed text-px-muted">
            <span className="font-semibold text-white">Start with the proof.</span> ProtocolX
            Verify runs five checks on a Sui Move package — it compiles clean on a machine that
            has never seen it, it still matches the digest the chain holds, the suite is green,
            the toolchain cannot drift, and guards deleted on purpose are noticed.
          </p>

          <p className="text-[0.9375rem] leading-relaxed text-px-muted">
            <span className="font-semibold text-white">From $1,000.</span> One package, all five
            gates, delivered inside 24 hours as an evidence bundle whose digest you can re-derive
            without us. It is a measurement and not an audit, and it is never called one.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/verification" variant="primary" className="flex-1 justify-center">
              What it measures
            </Button>
            <Button
              href="/verification/install"
              variant="secondary"
              showExternalIcon={false}
              className="flex-1 justify-center"
            >
              Install it
            </Button>
          </div>

          <div className="mt-1 border-t border-white/[0.07] pt-5">
            {/* Names lost the lead here on the Master's order of 30 August 2026 — "Names is not
                the flagship product" — and kept the search. The control is unchanged and still
                works; what changed is that it is now one of the ways to start rather than the
                only one on offer, which is also the truer statement: the registrar sits behind
                Weir's closed alpha, and the First Report does not. */}
            <p className="label mb-3">Or start somewhere else</p>

            <p className="mb-3 text-[0.9375rem] leading-relaxed text-px-faint">
              A <code>.sui</code> name replaces the sixty-four characters of your wallet address
              with something a person can type — {priceSentence()}, one transaction.
            </p>

            <NameSearch />

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Button
                // /organiser/apply, not /organiser — the console refuses any wallet not on the
                // platform allowlist, and shows a full creation form before saying so. See the
                // note in components/home/Organisers.tsx.
                href={`${RAFFLE_URL}/organiser/apply`}
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
