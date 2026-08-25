// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import { Section, SectionHeader } from '@/components/ui/Section';
import { HeroStage } from '@/components/ui/HeroStage';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Reveal } from '@/components/ui/Reveal';
import { getStats } from '@/lib/stats';

export async function Mission() {
  const STATS = await getStats();

  const comparison = [
    {
      title: 'A lottery',
      body: 'You buy a ticket. The money is gone the moment you do.',
      tone: 'bad' as const,
    },
    {
      title: 'ProjectX',
      body: 'Keep every coin. Play for the pool’s entire yield, daily.',
      tone: 'good' as const,
    },
  ];

  return (
    <Section>
      <div className="flex flex-col items-center gap-12">
        {/* Sat directly under a section whose title was "A prize draw where nobody loses" — two
            near-identical headlines about the same product, back to back. This one keeps the
            argument for prize-linked saving; the one above keeps the mechanism. */}
        <SectionHeader
          eyebrow="Vault · why prize savings"
          title="People save more when saving is exciting"
          lead="Prize-linked savings is a proven idea with decades of evidence behind it: people save more when saving is exciting. Here, nobody loses for somebody to win."
          proof={`${STATS.draws} prizes awarded on Sui mainnet, and not one depositor has ever lost a coin — the contract contains no path that could take one.`}
        />

        {/* The trophy and its orbiting labels — "no loss to date", "daily draw", "withdraw anytime",
            "someone wins tonight". They used to fill half the hero, opposite a name search, where
            every one of those phrases was about a product the visitor was not being shown. Here
            they sit against the argument they actually illustrate. */}
        <HeroStage className="w-full max-w-2xl" />

        <ul className="grid w-full gap-4 sm:grid-cols-2">
          {comparison.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 90}>
              <div
                className={`panel flex h-full flex-col gap-2.5 p-6 ${
                  item.tone === 'good' ? 'border-px-prize/35' : ''
                }`}
              >
                <span
                  className={`text-lg ${
                    item.tone === 'good'
                      ? 'text-px-prize'
                      : item.tone === 'bad'
                        ? 'text-px-danger'
                        : 'text-px-faint'
                  }`}
                  aria-hidden="true"
                >
                  {item.tone === 'good' ? '✓' : item.tone === 'bad' ? '✕' : '—'}
                </span>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <div className="panel flex flex-col items-center gap-2.5 p-6 text-center">
          <h3 className="text-base font-semibold text-white">Principal is never spent by the protocol</h3>
          <p className="text-[1rem] leading-[1.65] text-px-muted">
            No protocol function can reach deposits. The package upgrade authority is the one
            exception, and it is public — see Security.
          </p>
          <p className="mt-auto w-full pt-3 text-[0.875rem] leading-[1.6] text-px-faint">
            Deposits are unreachable from every administrative function. Enforced by the Move
            compiler itself, not by a permission check that could be misconfigured.
          </p>
        </div>
        <div className="panel flex flex-col items-center gap-2.5 p-6 text-center">
          <h3 className="text-base font-semibold text-white">Leave whenever</h3>
          <p className="text-[1rem] leading-[1.65] text-px-muted">
            No lock-up. No notice period. No queue.
          </p>
          <p className="mt-auto w-full pt-3 text-[0.875rem] leading-[1.6] text-px-faint">
            No protocol state can stop a withdrawal. The test suite asserts the absence of
            any such guard on every build.
          </p>
        </div>
        <div className="panel flex flex-col items-center gap-2.5 p-6 text-center">
          <h3 className="text-base font-semibold text-white">Check it yourself</h3>
          <p className="text-[1rem] leading-[1.65] text-px-muted">
            Every prize is a public transaction you can open and read.
          </p>
          <p className="mt-auto w-full pt-3 text-[0.875rem] leading-[1.6] text-px-faint">
            Deposits, draws, fees and payouts are all emitted on chain, permanently.
          </p>
        </div>
      </div>

      <Callout
        className="mt-12"
        title="The Move type system prevents any function from spending deposits"
        actions={
          <>
            <Button href="/security" variant="primary" className="px-5">
              How it is protected
            </Button>
            <Button href="/faq" variant="secondary">
              Common questions
            </Button>
          </>
        }
      >
        Not by a policy, a permission check or a promise — by the Move type system, on every
        build, at compile time.
      </Callout>
    </Section>
  );
}
