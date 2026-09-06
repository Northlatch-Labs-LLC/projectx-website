// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata } from 'next';
import { NotifySignup } from '@/components/ui/NotifySignup';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Callout } from '@/components/ui/Callout';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Verification',
  description:
    'ProtocolX Verify: gates we run on our own mainnet contracts, installable on yours — plus fixed-scope sprints for Sui Move teams, priced below the audit floor.',
  // A dedicated card rather than the site-wide generated one. The asset states the five gates
  // and carries NO price: prices change and a static card cannot be corrected once shared.
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
  /**
   * The five gates, each with the condition under which it reports NEUTRAL rather than a verdict.
   *
   * Those conditions are written from `engine/ci/gates.sh` and are also stated, in the reader's
   * language, on /verification/install. Two of the five cannot run everywhere, and both pages
   * must say so — a page that describes only the happy path misleads by omission, and the reader
   * discovers it on their first pull request.
   */
  const gates = [
    {
      title: 'PVS · build',
      body: 'The package compiles on a machine that has never seen it. No caches, no leftovers, no "works here".',
      edge: 'Runs everywhere. A clean runner and a pinned Sui CLI, every time.',
    },
    {
      title: 'PVS · digest',
      body: 'The deployed-drift tripwire: source must build byte-for-byte to the digest the chain holds. An accidental edit to deployed code fails the pull request, not the incident review.',
      edge: 'Needs a recorded digest beside your Move.toml. Without one it reports neutral and says so — it will not claim to have measured a package you never deployed.',
    },
    {
      title: 'PVS · tests',
      body: 'The Move suite runs green — the floor, not the evidence. The gates above and below exist because a green suite alone proves little.',
      edge: 'Runs everywhere, against the exact commit the pull request proposes.',
    },
    {
      title: 'PVS · pin',
      body: 'The framework dependency cannot move silently. A toolchain that drifts changes what compiles — and what your digest means — without a line of your repository changing.',
      edge: 'Needs an executable framework-pin script. Without one it reports neutral and names the file it looked for.',
    },
    {
      title: 'PVS · mutation-smoke',
      body: 'A slice of mutation testing on every pull request: guards are deleted on purpose and the suite must notice. A survivor names an invariant nothing tests.',
      edge: 'Five assertions per pull request. A survivor is a gap in your suite, not a defect in your contract, and the report is checked against a word list so it cannot be promoted into one.',
    },
  ];

  /**
   * The evidence bundle, stated on the page that sells the product rather than only on the page
   * that installs it. Every line is carried from /verification/install; nothing here is new.
   */
  const bundle = [
    {
      title: 'A manifest and a report',
      body: 'What was measured, on which commit, by which engine, with the run log behind every verdict. Counts and verdicts — not adjectives, and not an opinion.',
    },
    {
      title: 'A digest that reproduces',
      body: 'A digest is taken over the bundle and you can re-derive it without us. That is what makes it something you can hand to a third party rather than something you have to be trusted about.',
    },
    {
      title: 'Never ran does not read as passed',
      body: 'A gate that never reported is swept to an explicit failure at the end of the run. A silent gate is the one failure mode that would make every other verdict on the page worthless.',
    },
  ];

  const sprint = [
    {
      title: 'A mutation report with a survivor register',
      body: 'Offered, not yet delivered to a client: one mutation derived per assert in your sources, every survivor named with a reason — real gap, structurally untestable, or defensive no-op. Counts, not adjectives.',
    },
    {
      title: 'A staged lifecycle at production scale',
      body: 'Offered, not yet delivered to a client: your contract’s whole life run against a private network with real wallets, real transactions and real gas, at the scale production claims to support — conservation checked from chain state, not from the driver’s bookkeeping.',
    },
    {
      title: 'Machine-checked proof where the prover reaches',
      body: 'Offered, not yet delivered to a client: money paths proven with the Sui Prover for all inputs in a domain we publish with the proof. Where the prover cannot reach, a deterministic adversarial sweep — labelled measured, not proven. The label is mandatory.',
    },
    {
      title: 'The gates, installed and left running',
      body: 'Offered, not yet delivered to a client: the engagement ends with the check runs above live on your repository. The harness, the staging driver and the findings register stay in your repo. We leave tools, not slideware.',
    },
  ];

  return (
    <>
      <Section>
        <div className="flex flex-col items-center gap-12">
          <SectionHeader
            as="h1"
            eyebrow="Product · ProtocolX Verify"
            title="The gates we run on our own money, installable on your repository"
            lead="Verify is a GitHub App, in early access: install it on a Sui Move repository and every pull request receives five check runs from the ProtocolX Verification Standard — run by the same engine that measures our own mainnet contracts."
            proof="This is not an audit and is never called one. It is measured evidence — survivor counts, gas tables, proof transcripts — produced by tools whose runs of record are ours; the public repository carries the Weir libraries and contracts, and the verification engine is not published yet. Meant to make your eventual audit shorter and cheaper."
          />

          <ul className="grid w-full gap-4 md:grid-cols-3">
            {gates.map((gate, index) => (
              <Reveal as="li" key={gate.title} delay={index * 80}>
                <div className="panel flex h-full flex-col gap-2.5 p-6">
                  {/* h2, not h3. The opening SectionHeader on this page is the document h1 (it
                      has no PageHeader), so an h3 here skipped a level and left a screen-reader
                      heading list reading 1 → 3 with nothing between. These five gates ARE the
                      page's first-level subsections. Base styling is identical for h1–h4 in
                      globals.css, so this is a semantic change only. */}
                  <h2 className="text-base font-semibold text-white">{gate.title}</h2>
                  <p className="text-[1rem] leading-[1.65] text-px-muted">{gate.body}</p>
                  <p className="mt-auto w-full border-t border-white/[0.06] pt-3 text-[0.875rem] leading-[1.6] text-px-faint">
                    {gate.edge}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* The route to /verification/install, which carries the config file and a control to
              press. Without it the only control on this page is a mailto. */}
          <Callout
            className="w-full"
            title="Ready to put the checks on your own pull requests?"
            actions={
              <Button href="/verification/install" variant="primary" className="px-5">
                Install ProtocolX Verify
              </Button>
            }
          >
            What each check measures on your repository, the four steps from install to evidence,
            the exact config file it reads, and how to get it installed while the App is in early
            access.
          </Callout>
        </div>
      </Section>

      <Section tone="panel">
        <div className="flex flex-col items-center gap-10">
          <SectionHeader
            eyebrow="The first-night record"
            title="On its first complete run, it found what nothing was testing"
            lead="29 August 2026, on our own live mainnet contract — the account module that guards creator identities. Five mutations from a derived set of ninety-eight:"
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
            those guards exist for, dead by morning. The run log is on a private repository; the
            two tests that closed it are in the public contracts.
          </p>
        </div>
      </Section>

      {/* Every fact in this section is also stated on /verification/install. It carries no claim
          and no number that is not already published there.

          It must never be called an audit report. It is a bundle of measurements with a digest. */}
      <Section>
        <div className="flex flex-col items-center gap-10">
          <SectionHeader
            eyebrow="The artifact"
            title="What the run leaves behind when the tab is closed"
            lead="A check run is five coloured rows that live as long as GitHub keeps the page. The bundle is the file someone else can hold: a manifest and a report, with a digest over them that reproduces, written on every run and uploaded with it."
            proof="This is the difference the product actually turns on. As far as we have found, open-source mutation engines for Move exist and one is already runnable as a pull-request action — what none of them leaves behind is an artifact a funder, an auditor or a buyer can point at and check against a later commit."
          />

          <ul className="grid w-full gap-4 md:grid-cols-3">
            {bundle.map((item, index) => (
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
              <span className="font-semibold text-white">
                What a repository has to do to qualify:
              </span>{' '}
              hold a Sui Move package and one file at its root. There is no dashboard to
              configure and no account to create — <code>.protocolx-verify.json</code> names the
              directory holding your <code>Move.toml</code>, and that is the whole of it. Two
              optional files each turn one more gate from neutral into live. With no config file
              at all the App still answers: all five checks complete neutral carrying setup
              instructions, because a repository that has not opted in deserves an explanation
              rather than a red cross.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center gap-12">
          {/* TWO CLAIMS ARE BANNED IN THIS LEAD and config/claims-banned.json fails the build if
              either returns.

              Do not assert an audit price floor of fifteen to forty-five thousand dollars: of
              eighteen firms serving Sui, exactly one publishes a price at all and it starts near
              seven thousand, so the figure is falsifiable by any reader who has asked for a quote.

              Do not say the layer below the audit is empty: open-source Move mutation testing
              exists, is actively maintained, and one engine is Sui-only and already runnable as a
              pull-request action.

              The defensible claim is narrower and survives a hostile reader: those tools leave an
              exit code and a console log, and nobody produces a shareable, attestable, per-commit
              artifact for Move. That is what this copy claims. */}
          <SectionHeader
            eyebrow="Engagement · verification sprint"
            title="Fixed scope, flat quote, below the audit floor"
            lead="Of the audit firms serving Sui Move, exactly one publishes a price: roughly seven to twelve thousand dollars for a standard review, fifteen to twenty-five with formal verification. By our own count, not independently sourced, Move audits in 2026 run thirty to forty-five percent above the equivalent EVM work. A verification sprint is the layer below that price — a fixed-scope engagement that leaves four things in your repository."
            proof="Below that price there is tooling, and this page will not pretend otherwise: open-source mutation engines for Move exist, one of them Sui-only and already runnable as a pull-request action. What none of them leaves behind is an artifact. An exit code and a console log are nothing a funder, an auditor or a buyer can hold, point at, or check against a later commit. There is no shareable, attestable, per-commit record of test quality for Move, and no installable app that speaks it — which is the line this sits on."
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
              {/* The entry anchor. It describes a measurement, not an engagement, which is why
                  the exclusions are stated here rather than left to be asked for. Exact sprint
                  figures are quoted in writing per engagement and deliberately not printed. */}
              <span className="font-semibold text-white">From $1,000.</span> That is the First
              Report: one Move package, all five PVS gates, returned as an evidence bundle whose
              digest you can re-derive without us, paid in USDC on Sui. Turnaround is agreed in
              writing when you order; none has been delivered yet. It is a measurement and not an
              engagement — public repositories only, no remediation, and no claim of independence.
              Sprints sit above it, scoped to the codebase and quoted flat, in writing, before work
              begins.
            </p>
            {/* Word-for-word with /verification/install. Two pages that paraphrase the same price
                eventually quote two different ones. */}
            <p className="mt-4 text-[1rem] leading-[1.65] text-px-muted">
              <span className="font-semibold text-white">The App is $249 per repository per
              month</span>, or $2,490 a year. Every pull request gets the five gates and its own
              evidence bundle, the digest gate included — the one that reads the chain. One public
              repository is free, permanently, with no expiry.
            </p>
            {/* The founding price is $149 because $149 is what this page published before the
                list price was set. Raising a printed number and letting the people who read it
                discover the increase on an invoice is how a verification product loses the only
                thing it sells. The first three repositories keep it, and "for as long as it runs"
                is a commitment, not a promotion — it does not expire and there is no review date.
                If this offer is ever withdrawn, it is withdrawn for NEW repositories only. */}
            <p className="mt-4 text-[1rem] leading-[1.65] text-px-muted">
              <span className="font-semibold text-white">The first three repositories are $149,
              and keep that price for as long as the app runs on them.</span> That is the figure
              this page carried before the list price was set, and anyone who read it then is
              held to it, not to the new number.
            </p>
            {/* Said here because it is said on the public GitHub App listing, and two surfaces
                that describe the same product must not disagree. The Additional Use Grant in
                LICENSE permits running the engine in your own CI, for your own organisation, at
                no charge and with no separate agreement. A buyer who discovers that themselves
                concludes we hid it; a buyer told it up front concludes we are the kind of vendor
                that says the inconvenient thing. We sell verifiability, so it is the only
                position available to us. */}
            <p className="mt-4 text-[1rem] leading-[1.65] text-px-muted">
              <span className="font-semibold text-white">The engine is licensed BUSL-1.1 with
              self-hosting permitted.</span> The repository is not public yet — ask and we send
              it. What the subscription buys is the hosted App: the runs, the check runs on your
              pull requests, the retained evidence bundles, and the digest gate that reads the
              chain — none of which you have to stand up or keep running yourself.
            </p>
            <p className="mt-4 text-[1rem] leading-[1.65] text-px-muted">
              Self-serve billing is not open yet, so early access is arranged by email and costs
              nothing until it is. Send the repository name to{' '}
              {/* MUST be hello@projectxprotocol.dev: it is the published address for
                  verification enquiries and it reaches a monitored inbox — verified.

                  Do not point this at claude@protocolx.io. That address forwards only to
                  protocolx@atomicmail.ai, a machine mailbox nobody reads, so a reader who wrote
                  to it would land in a void. Any address printed on a public page must resolve to
                  an inbox somebody reads; that is a different question from which address
                  outbound mail uses as its reply-to. */}
              <a
                className="font-semibold text-white underline underline-offset-4"
                href="mailto:hello@projectxprotocol.dev?subject=ProtocolX%20Verify%20early%20access"
              >
                hello@projectxprotocol.dev
              </a>{' '}
              and we reply with what the install needs from your side.
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
