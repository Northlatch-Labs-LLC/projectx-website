// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import { NotifySignup } from '@/components/ui/NotifySignup';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Verification',
  description:
    'ProtocolX Verify: the verification gates we run on our own mainnet contracts, installable on yours — and fixed-scope verification sprints for Sui Move teams, priced below the audit floor.',
  // A dedicated card, not the site-wide one: this page's link travels inside prospects' own
  // chats when a verification pitch is being discussed, and the card is the product's face
  // there. The asset states the five gates and no prices — pricing stays where it is quoted,
  // in writing, per engagement.
  openGraph: {
    images: [{ url: '/og/verification.png', width: 1200, height: 630, alt: 'ProtocolX Verify — the five PVS check runs' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/verification.png'],
  },
};

/**
 * The verification product line. Everything the home section states as practice, this page
 * states as an offer — with the same discipline: every claim is a measurement that has already
 * happened, the first-night record is quoted from the commit history that produced it, and the
 * independence clause is carried in full, not linked away.
 *
 * Nothing that earlier pages retired is removed by this page. It adds; it does not rewrite.
 */
export default function VerificationPage() {
  const gates = [
    {
      title: 'PVS · build',
      body: 'The package compiles on a machine that has never seen it. No caches, no leftovers, no "works here".',
    },
    {
      title: 'PVS · digest',
      body: 'The deployed-drift tripwire: source must build byte-for-byte to the digest the chain holds. An accidental edit to deployed code fails the pull request, not the incident review.',
    },
    {
      title: 'PVS · tests',
      body: 'The Move suite runs green — the floor, not the evidence. The gates above and below exist because a green suite alone proves little.',
    },
    {
      title: 'PVS · pin',
      body: 'The framework dependency cannot move silently. A toolchain that drifts changes what compiles — and what your digest means — without a line of your repository changing.',
    },
    {
      title: 'PVS · mutation-smoke',
      body: 'A slice of mutation testing on every pull request: guards are deleted on purpose and the suite must notice. A survivor names an invariant nothing tests.',
    },
  ];

  const sprint = [
    {
      title: 'A mutation report with a survivor register',
      body: 'One mutation derived per assert in your sources, every survivor named with a reason — real gap, structurally untestable, or defensive no-op. Counts, not adjectives.',
    },
    {
      title: 'A staged lifecycle at production scale',
      body: 'Your contract’s whole life run against a private network with real wallets, real transactions and real gas, at the scale production claims to support — conservation checked from chain state, not from the driver’s bookkeeping.',
    },
    {
      title: 'Machine-checked proof where the prover reaches',
      body: 'Money paths proven with the Sui Prover for all inputs in a published domain. Where the prover cannot reach, a deterministic adversarial sweep — labelled measured, not proven. The label is mandatory.',
    },
    {
      title: 'The gates, installed and left running',
      body: 'The engagement ends with the check runs above live on your repository. The harness, the staging driver and the findings register stay in your repo. We leave tools, not slideware.',
    },
  ];

  return (
    <>
      <Section>
        <div className="flex flex-col items-center gap-12">
          <SectionHeader
            eyebrow="Product · ProtocolX Verify"
            title="The gates we run on our own money, installable on your repository"
            lead="Verify is a GitHub App: install it on a Sui Move repository and every pull request receives five check runs from the ProtocolX Verification Standard — run by the same engine that measures our own mainnet contracts."
            proof="This is not an audit and is never called one. It is measured evidence — survivor counts, gas tables, proof transcripts — produced by tools with public runs of record, priced below the audit floor, and designed to make your eventual audit shorter and cheaper."
          />

          <ul className="grid w-full gap-4 md:grid-cols-3">
            {gates.map((gate, index) => (
              <Reveal as="li" key={gate.title} delay={index * 80}>
                <div className="panel flex h-full flex-col gap-2.5 p-6">
                  <h3 className="text-base font-semibold text-white">{gate.title}</h3>
                  <p className="text-[1rem] leading-[1.65] text-px-muted">{gate.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="panel">
        <div className="flex flex-col items-center gap-10">
          <SectionHeader
            eyebrow="The first-night record"
            title="On its first complete run, it found what nothing was testing"
            lead="2026-08-29, on our own live mainnet contract — the account module that guards creator identities. Five mutations from a derived set of ninety-eight:"
          />
          <pre className="panel w-full overflow-x-auto p-6 font-mono text-[0.85rem] leading-[1.8] text-px-muted">
            {`killed    account.move:145
killed    account.move:146
killed    account.move:148
SURVIVED  account.move:188  assert!(owner == ctx.sender(), ENotOwner)
SURVIVED  account.move:192  assert!(registry.by_handle.contains(handle), EHandleMismatch)

— by morning —
executed: 5   killed: 5   survived: 0
commit: "Kill the two survivors the app found on its first run"`}
          </pre>
          <p className="max-w-prose text-center text-[1rem] leading-[1.65] text-px-muted">
            An ownership guard and a registry-consistency guard, both live on mainnet, both
            untested — found by the app, closed by two tests that construct exactly the attacks
            those guards exist for, dead by morning. Every line of that story is on the public
            record of the machines that produced it.
          </p>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center gap-12">
          <SectionHeader
            eyebrow="Engagement · verification sprint"
            title="Fixed scope, flat quote, below the audit floor"
            lead="Audits for small Sui teams start at fifteen to forty-five thousand dollars with weeks of backlog — and below that line there has been nothing. A verification sprint is the layer below: a fixed-scope engagement that leaves four things in your repository."
          />

          <ul className="grid w-full gap-4 md:grid-cols-2">
            {sprint.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 80}>
                <div className="panel flex h-full flex-col gap-2.5 p-6">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="panel w-full max-w-prose p-6">
            <p className="text-[1rem] leading-[1.65] text-px-muted">
              <span className="font-semibold text-white">The independence clause, in full:</span>{' '}
              where we verify our own contracts, that is an internal review by the party that
              wrote the code — evidence, not an audit; no claim of independence is made, and none
              should be inferred. Where we verify yours, we are still not your auditors: we are
              the measured layer below the audit, and a well-verified codebase is the cheapest
              audit you will ever buy.
            </p>
            <p className="mt-4 text-[1rem] leading-[1.65] text-px-muted">
              {/* The anchor and only the anchor, by the operator's ruling (2026-08-30): it tells
                  a small team the door is open to them and a large one that this is real work —
                  and it keeps every exact figure where it belongs, quoted in writing per
                  engagement. */}
              <span className="font-semibold text-white">Sprints start at $3,500.</span> Larger
              codebases are scoped custom. Every engagement is quoted flat, in writing, before
              work begins.{' '}
              <a className="font-semibold text-white underline underline-offset-4" href="mailto:claude@protocolx.io">
                claude@protocolx.io
              </a>
            </p>
          </div>

          <div className="mt-10 w-full max-w-prose">
            <p className="mb-3 text-[0.9375rem] leading-[1.6] text-px-muted">
              Not buying today? Hear when the app opens for self-serve installs.
            </p>
            <NotifySignup source="verification" />
          </div>
        </div>
      </Section>
    </>
  );
}
