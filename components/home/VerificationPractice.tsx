// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The verification practice, stated as fact — and the direction, stated as direction.
 *
 * Every claim here is a measurement that has already happened on this estate's own contracts:
 * the mutation ledgers, the 60,000-entrant staging runs, the Sui Prover transcript for the
 * registrar's money path. Nothing here is called an audit — the security page carries the
 * independence clause and this section does not soften it.
 *
 * It used to add "nothing is offered for sale". That is no longer true and the section now says
 * so: this is the flagship, it sits second on the homepage, and the price is on the face of it.
 */
export function VerificationPractice() {
  const layers = [
    {
      title: 'Mutation testing',
      body: 'A passing suite is not evidence. We delete each guard on purpose and prove the tests notice — the ones that survive are named in public, not averaged away.',
      detail:
        'Three contracts measured this way. Every harness verifies its own restore byte-for-byte.',
    },
    {
      title: 'Full-scale staging',
      body: 'Before code faces real money it faces a private network: 60,000 funded wallets, 60,000 real transactions, the whole lifecycle — and the escrow must come out at exactly zero.',
      detail:
        'Real gas per phase, measured, including the last buy costing the same as the first.',
    },
    {
      title: 'Machine-checked proof',
      body: 'Tests sample inputs; a prover exhausts them. The registrar’s money path is proven with the Sui Prover: every mist of a payment ends in the treasury or back in your change.',
      detail: 'Proven for all inputs in a declared domain — the domain is published with the proof.',
    },
  ];

  return (
    <Section>
      <div className="flex flex-col items-center gap-12">
        <SectionHeader
          eyebrow="The flagship · ProtocolX Verify"
          title="The three measurements, and what each one refuses to accept"
          lead="Everything here holds other people’s money, so nothing ships on a green checkmark alone. Every suite is measured by mutation, every lifecycle is staged at production scale on a private network, and the money paths are being proven — not argued — one contract at a time. These are the tools you are buying, and they were built on our own contracts first."
          proof="No external audit has been completed, and this page will never pretend otherwise. What it offers instead is numbers: survivor counts, gas tables, and proof transcripts, published as they land."
        />

        <ul className="grid w-full gap-4 md:grid-cols-3">
          {layers.map((layer, index) => (
            <Reveal as="li" key={layer.title} delay={index * 90}>
              <div className="panel flex h-full flex-col gap-2.5 p-6">
                <h3 className="text-base font-semibold text-white">{layer.title}</h3>
                <p className="text-[1rem] leading-[1.65] text-px-muted">{layer.body}</p>
                <p className="mt-auto w-full pt-3 text-[0.875rem] leading-[1.6] text-px-faint">
                  {layer.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <Callout
        className="mt-12"
        title="These tools are the product"
        actions={
          <>
            <Button href="/verification" variant="primary" className="px-5">
              What the five gates measure
            </Button>
            <Button href="/verification/install" variant="secondary">
              Install it on your repository
            </Button>
            <Button href="/security" variant="secondary">
              The evidence, in public
            </Button>
          </>
        }
      >
        {/* Deliberately not "the layer below the audit is empty": open-source Move mutation
            testing exists and is maintained. What it does not produce is evidence anyone can
            carry, and that is the claim worth making. */}
        The harnesses, the staging network and the proving practice were built for our own
        contracts first. They now run on other people’s: five gates on every pull request, or a
        single measured report on one package from $1,000 — because the layer below the audit
        should leave evidence you can hand to someone, and today it leaves a console log.
      </Callout>
    </Section>
  );
}
