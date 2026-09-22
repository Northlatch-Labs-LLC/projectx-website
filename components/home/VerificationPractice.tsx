// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Reveal } from '@/components/ui/Reveal';
import { VERIFY_REPO_URL } from '@/lib/links';

/**
 * CLAIMS CONSTRAINT: every claim here must be a measurement that has already happened on this
 * estate's own contracts — the mutation ledgers, the 60,000-entrant staging runs, the Sui Prover
 * transcript for the registrar's money path. Nothing here may be called an audit; /security
 * carries the independence clause and this section must not soften it.
 */
export function VerificationPractice() {
  const layers = [
    {
      title: 'Mutation testing',
      body: 'A passing suite is not evidence. The engine deletes each guard on purpose and proves the tests notice — the ones that survive are named in public, not averaged away.',
      detail:
        'Three contracts measured this way; the ledgers are not published yet.',
    },
    {
      title: 'Full-scale staging',
      body: 'Before code faces real money it is staged on a private network with funded wallets and real gas, and the escrow must come out at zero. The run logs are not published yet.',
      detail:
        'Real gas per phase, measured, including the last buy costing the same as the first.',
    },
    {
      title: 'Machine-checked proof',
      body: 'Tests sample inputs; a prover exhausts them. The registrar’s money path is proven with the Sui Prover: every mist of a payment ends in the treasury or back in your change.',
      detail: 'Proven for all inputs in a declared domain. The spec is not published yet.',
    },
  ];

  return (
    <Section>
      <div className="flex flex-col items-center gap-12">
        <SectionHeader
          eyebrow="The flagship · ProtocolX Verify"
          title="The three measurements, and what each one refuses to accept"
          lead="Everything here holds other people’s money, so nothing ships on a green checkmark alone. Three of these contracts are measured by mutation, one lifecycle was staged on a private network, and one money path — the registrar’s — is proven with the Sui Prover. The rest is not, and this page does not say otherwise. These are the tools you are buying, and Northlatch Labs built them on its own contracts first."
          proof="No external audit has been completed, and this page will never pretend otherwise. What it offers instead is numbers: survivor counts, gas tables, and proof transcripts, published as they land."
        />

        <ul className="grid w-full gap-4 md:grid-cols-3">
          {layers.map((layer, index) => (
            <Reveal as="li" key={layer.title} delay={index * 90}>
              <div className="panel flex h-full flex-col gap-2.5 p-6">
                <h3 className="text-subhead font-semibold text-white">{layer.title}</h3>
                <p className="text-body text-px-muted">{layer.body}</p>
                <p className="mt-auto w-full pt-3 text-meta text-px-faint">
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
            <Button href={VERIFY_REPO_URL} variant="secondary">
              The Action on GitHub
            </Button>
          </>
        }
      >
        {/* Must not say the layer below the audit is empty: open-source Move mutation testing
            exists and is maintained. The defensible claim is narrower — it produces no evidence
            a reader can carry. */}
        The harnesses, the staging network and the proving practice were built for Northlatch
        Labs&rsquo; own contracts first. They can run on yours today: the Action is published and
        free in your own CI, the hosted App is installed by arrangement, and a single measured
        report is priced on the verification page — because the layer below the audit should leave
        evidence you can hand to someone, and today it leaves a console log.
      </Callout>
    </Section>
  );
}
