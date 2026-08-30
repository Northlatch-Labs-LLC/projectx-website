// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { SponsorArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight, Warning, Trophy, Sparkle, Coins } from '@/components/ui/Icons';
import { SUGGESTED_MIN_CONTRIBUTION_SUI } from '@/lib/derive';
import { DAPP_URL } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Boost the prize',
  description:
    'Anyone can add SUI to the prize. It is a gift, not an investment — you cannot get it back, and it goes to a saver rather than to us.',
};

export default function SponsorPage() {
  const reasons = [
    {
      icon: <Trophy className="h-5 w-5" />,
      title: 'Make a small pool worth entering',
      body: 'A young pool earns young-pool staking yield. A boost buys it a real prize while it grows.',
    },
    {
      icon: <Sparkle className="h-5 w-5" />,
      title: 'Sponsor a draw',
      body: 'Fund one epoch’s prize. Your address is on the receipt, on chain, forever.',
    },
    {
      icon: <Coins className="h-5 w-5" />,
      title: 'Just be nice',
      body: 'Some contributions are simply gifts to the pool. Every one is on the record.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Boost the prize"
        title="Put your name on tomorrow’s prize"
        lead="Fund a draw for the whole pool. One permissionless transaction, your address on the on-chain receipt, and a prize every depositor sees."
        proof="Contributions join the prize balance — a pot structurally separate from depositor principal, which no administrative function can reach."
        art={<SponsorArt className="w-full" />}
      />

      <Section>
        <Card className="border-px-gold/40">
          <div className="flex gap-4">
            <Warning className="mt-0.5 h-6 w-6 shrink-0 text-px-gold" />
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-white">How sponsorship works</h2>
              <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
                A contribution is a sponsorship, not an investment: it goes to a depositor,
                not back to you, and the contract has no function that returns it. What you
                get is a bigger prize, a public on-chain receipt in your name, and the
                attention of everyone watching that draw.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-px-text">
                Contribute because you want a bigger prize to exist. Not because you expect it
                back.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="Why people do it"
          title="Three reasons teams do it"
          lead="A prize vault has a cold start: the staking yield can’t fund a good prize until the pool is big, and the pool won’t get big without a good prize."
        />

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title} className="panel flex flex-col gap-3.5 p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-prize/20 to-px-prize/5 text-px-prize">
                {reason.icon}
              </span>
              <h3 className="text-lg font-semibold text-white">{reason.title}</h3>
              <p className="text-[1rem] leading-[1.65] text-px-muted">{reason.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">How to do it</h3>
            {/* This read as a three-step how-to. The interface it opens with was retired, and the
                button below is conditional on one existing — so the instruction outlived the thing
                it instructed. `sponsor_prize` is a public entry function and remains callable
                directly, which is what the second action below is for. */}
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              {DAPP_URL
                ? 'Open an interface, connect a wallet, use the prize funding control. One transaction. Your contribution and the epoch it landed in are emitted on chain, and every interface can list them.'
                : 'No interface serves the vault at present, so this is a direct contract call today. One transaction against the published entry function — your contribution and the epoch it landed in are emitted on chain, and any future interface can list them.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {DAPP_URL && (
                <a
                  href={DAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary px-5"
                >
                  Open the vault
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <Button href="/builders" variant="secondary">
                Call it directly
              </Button>
            </div>
          </Card>

          <Card className="border-px-prize/25">
            <h3 className="text-lg font-semibold text-white">Sizing a sponsorship</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              A sponsorship should be large enough to make a prize worth winning. Amounts
              below the suggested floor round away at settlement and produce no meaningful
              draw, so the protocol treats them as dust rather than a prize.
            </p>
            <div className="mt-6 flex items-baseline gap-3 rounded-2xl border border-white/[0.07] bg-black/30 px-5 py-4">
              <span className="label">Suggested minimum</span>
              <span className="ml-auto font-mono text-xl font-semibold text-px-prize">
                {SUGGESTED_MIN_CONTRIBUTION_SUI} SUI
              </span>
            </div>
            <p className="mt-4 text-[0.875rem] leading-[1.6] text-px-faint">
              Guidance rather than a hard limit, so you know where the useful range begins
              before you send anything.
            </p>
          </Card>
        </div>

        <p className="mt-10 max-w-2xl text-[1rem] leading-[1.65] text-px-muted">
          Contributions are not revenue. They go to a saver, not to us — how the protocol
          actually earns is set out on the{' '}
          <Link href="/protocol" className="text-px-accent underline underline-offset-4">
            mechanism page
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
