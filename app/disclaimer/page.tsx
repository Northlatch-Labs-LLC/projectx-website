// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { LegalNav } from '@/components/layout/LegalNav';
import { LegalArt } from '@/components/ui/PageArt';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Warning } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Protocol disclaimer',
  description:
    'The risks of using ProjectX, stated plainly: what is protected, what is not, and what depends on systems outside the protocol.',
};

export default function DisclaimerPage() {
  const risks = [
    {
      title: 'Smart contract risk',
      body: 'The protocol is experimental software and has not been independently audited. The no-loss invariant is enforced by the Move type system, which is a strong guarantee about a specific property — not a guarantee that the code is free of defects. A defect could result in the loss of deposited funds.',
    },
    {
      title: 'The prize is not guaranteed',
      body: 'Prizes are designed to come from realised staking yield. If the pool earns little, the prize is small; if a harvest realises nothing, an epoch can pass with no prize at all and the pot rolls forward. In Alpha the harvester has not yet covered a prize, and every draw so far has been funded by a sponsor. Sponsorship is voluntary and nobody is obliged to continue it, so past prizes are not evidence that a future epoch will carry one. Nothing on this site is a projection of what you might win.',
    },
    {
      title: 'Third-party dependencies',
      body: 'Settlement requires a price feed and a decentralised exchange. Both are operated by others. If either is unavailable or behaves unexpectedly, settlement is deferred. Principal is unaffected, but a prize can be delayed indefinitely while the condition persists.',
    },
    {
      title: 'Validator and staking risk',
      body: 'Principal is delegated to a validator. Sui’s delegated staking does not slash principal, but validator performance affects yield, and a validator that stops performing reduces or eliminates the prize for as long as that lasts.',
    },
    {
      title: 'Upgrade authority exists',
      body: 'The package can be upgraded by the holder of its upgrade capability. That authority is the single largest trust assumption in the system, and it is disclosed here rather than omitted. It cannot be exercised silently — an upgrade is a public transaction on chain.',
    },
    {
      title: 'Regulatory and tax exposure',
      body: 'The legal character of a prize-linked savings promotion differs by jurisdiction, and access may be restricted where you are. Prizes may be taxable. Determining both is your responsibility, and neither this site nor the protocol does it for you.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Disclaimer"
        title="What is protected, and what is not"
        lead="Your principal is protected by the structure of the contract. That sentence is precise, and this page is about everything it does not cover."
        art={<LegalArt className="w-full" />}
      />

      <Section width="prose">
        <LegalNav current="/disclaimer" />
        <p className="mb-8 text-body text-px-muted">
          This site is published by Northlatch Labs LLC, a Wyoming limited liability company
          (Wyoming Filing ID 2026-002064040), 5830 E 2nd St, Ste 7000 #38326, Casper, Wyoming 82609,
          United States. Northlatch develops and licenses the ProjectX protocol software. It does not
          operate the prize vault or any draw, does not sponsor any prize, and does not hold user
          funds.
        </p>

        <Card className="border-px-gold/30">
          <div className="flex gap-4">
            <Warning className="mt-0.5 h-5 w-5 shrink-0 text-px-gold" />
            <p className="text-body text-px-muted">
              <span className="font-semibold text-white">Read this before depositing.</span>{' '}
              &ldquo;No loss&rdquo; describes what happens to your principal — it is never spent,
              whatever funds the prize — not an absence of risk. Do not deposit more than you can
              afford to lose entirely.
            </p>
          </div>
        </Card>

        <ul className="mt-8 flex flex-col gap-4">
          {risks.map((risk) => (
            <li key={risk.title} className="panel flex flex-col gap-2 p-6">
              <h2 className="text-subhead font-semibold text-white">{risk.title}</h2>
              <p className="text-body text-px-muted">{risk.body}</p>
            </li>
          ))}
        </ul>

        <div className="prose-px mt-12">
          <h2>No advice, no offer</h2>
          <p>
            Nothing published here is financial, investment, tax or legal advice, and nothing
            here is an offer or solicitation to buy or sell any asset or security. Figures
            describing past settlements are a record of what happened and say nothing about
            what will.
          </p>

          <h2>No warranty</h2>
          <p>
            The protocol and this website are provided as-is, without warranty of any kind.
            To the fullest extent permitted by law, Northlatch Labs LLC accepts no liability for
            loss arising from their use.
          </p>

          <h2>Where to check the claims</h2>
          <p>
            Every factual claim about the protocol on this site can be verified against the
            chain. The{' '}
            <Link href="/builders#addresses">builders page</Link> lists every deployed address;
            the{' '}
            <Link href="/security">security page</Link> sets out what the invariant does and
            does not cover.
          </p>
        </div>

        <Callout
          className="mt-10"
          tone="quiet"
          title="Read alongside"
          actions={
            <>
              <Button href="/security" variant="secondary">
                Security model
              </Button>
              <Button href="/legal/terms" variant="secondary">
                Terms of use
              </Button>
            </>
          }
        >
          The security model sets out what the guarantee covers; the terms govern use of this
          site.
        </Callout>
      </Section>
    </>
  );
}
