// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata } from 'next';
import { NotifySignup } from '@/components/ui/NotifySignup';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Callout } from '@/components/ui/Callout';
import { Button } from '@/components/ui/Button';
import { VERIFY_REPO_URL } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Verification',
  description:
    'ProtocolX Verify: the gates Northlatch Labs runs on its own mainnet contracts, free to run in your own CI — plus fixed-scope sprints for Sui Move teams, priced below the audit floor.',
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
      edge: 'Needs a recorded digest beside your Move.toml. Without one it reports neutral and names what is missing.',
    },
    {
      title: 'PVS · tests',
      body: 'The Move suite runs green. That is the floor, not the evidence: the gates around it exist because a green suite only covers what someone wrote a test for.',
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
      edge: 'Five assertions per pull request. A survivor is a gap in your suite, not a defect in your contract.',
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
      body: 'A digest is taken over the bundle, and you can re-derive it without us. Hand the bundle to a third party and they can check it on their own machine.',
    },
    {
      title: 'Never ran does not read as passed',
      body: 'A gate that never reported is swept to an explicit failure at the end of the run. A silent pass would make every other verdict on the page worthless.',
    },
  ];

  const sprint = [
    {
      title: 'A mutation report with a survivor register',
      body: 'Offered, not yet delivered to a client: one mutation derived per assert in your sources, every survivor named with a reason — real gap, structurally untestable, or defensive no-op. Counts, not adjectives.',
    },
    {
      title: 'A staged lifecycle at production scale',
      body: 'Offered, not yet delivered to a client: your contract’s whole lifecycle run on a private network with real wallets, real transactions and real gas. Conservation is checked from chain state, not from the driver’s bookkeeping.',
    },
    {
      title: 'Machine-checked proof where the prover reaches',
      body: 'Offered, not yet delivered to a client: money paths proven with the Sui Prover across an input domain published with the proof. Where the prover cannot reach, a deterministic adversarial sweep, labelled measured rather than proven.',
    },
    {
      title: 'The gates, installed and left running',
      body: 'Offered, not yet delivered to a client: the engagement ends with the check runs live on your repository. The harness, the staging driver and the findings register stay in your repo.',
    },
  ];

  return (
    <>
      <Section>
        <div className="flex flex-col items-center gap-12">
          <SectionHeader
            as="h1"
            eyebrow="Product · ProtocolX Verify"
            title="The gates Northlatch Labs runs on its own money, installable on your repository"
            lead="Verify runs two ways. The Action is published and free: drop it into your own CI, public or private, and every pull request gets five check runs from the ProtocolX Verification Standard. The hosted App runs the same five gates for you."
            proof="Not an audit, and never called one. It is measured evidence — survivor counts, gas tables, proof transcripts — from the engine that measures Northlatch Labs' own mainnet contracts."
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
                  <h2 className="text-subhead font-semibold text-white">{gate.title}</h2>
                  <p className="text-body text-px-muted">{gate.body}</p>
                  <p className="mt-auto w-full border-t border-white/[0.06] pt-3 text-meta text-px-faint">
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
              <>
                <Button href="/verification/install" variant="primary" className="px-5">
                  Install ProtocolX Verify
                </Button>
                {/* The Action is public source, so the page that describes it links to it rather
                    than asking the reader to take its word. The repository carries the composite
                    action.yml and the gate scripts these five cards describe. */}
                <Button href={VERIFY_REPO_URL} variant="secondary">
                  The Action on GitHub
                </Button>
              </>
            }
          >
            What each check measures, the four steps from install to evidence, the config file it
            reads, and how the hosted App gets installed for you.
          </Callout>
        </div>
      </Section>

      <Section tone="panel">
        <div className="flex flex-col items-center gap-10">
          <SectionHeader
            eyebrow="The first-night record"
            title="On its first complete run, it found what nothing was testing"
            lead="29 August 2026, on Northlatch Labs' own live mainnet contract — the account module that guards creator identities. Five mutations from a derived set of ninety-eight:"
          />
          <pre className="panel w-full overflow-x-auto p-6 font-mono text-meta text-px-muted">
            {`killed    account.move:145
killed    account.move:146
killed    account.move:148
SURVIVED  account.move:188  assert!(owner == ctx.sender(), ENotOwner)
SURVIVED  account.move:192  assert!(registry.by_handle.contains(handle), EHandleMismatch)

— by morning —
executed: 5   killed: 5   survived: 0
commit: "Kill the two survivors the app found on its first run"`}
          </pre>
          <p className="max-w-prose text-center text-body text-px-muted">
            An ownership guard and a registry-consistency guard, both live on mainnet, both
            untested. The app found them; two tests closed them by morning. The run log is on a
            private repository, and the two tests are in the public contracts.
          </p>
          {/* The demo repository ships a deliberately red mutation-smoke gate, and a reader who
              meets red without this paragraph reads the product as broken. Stated as a strength,
              because it is one: the engine reports what it measured, on its author's code as
              readily as on anyone else's. Do not soften this into an apology. */}
          <p className="max-w-prose text-center text-body text-px-muted">
            The demo repository reports red on mutation-smoke, on purpose, and it stays red. A
            surviving mutation is what that gate exists to surface, so red is the gate working. The
            engine reports what it measured, on Northlatch Labs&rsquo; own code as readily as on
            anyone else&rsquo;s.
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
            lead="A check run is five coloured rows that live as long as GitHub keeps the page. The bundle is the file someone else can hold: a manifest, a report, and a digest over them that reproduces."
            proof="Open-source mutation engines for Move exist, and one already runs as a pull-request action. None of them leaves behind an artifact a funder, an auditor or a buyer can check against a later commit."
          />

          <ul className="grid w-full gap-4 md:grid-cols-3">
            {bundle.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 80}>
                <div className="panel flex h-full flex-col gap-2.5 p-6">
                  <h3 className="text-subhead font-semibold text-white">{item.title}</h3>
                  <p className="text-body text-px-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="panel w-full max-w-prose p-6">
            <p className="text-body text-px-muted">
              <span className="font-semibold text-white">
                What a repository has to do to qualify:
              </span>{' '}
              hold a Sui Move package and one file at its root. There is no dashboard and no
              account: <code>.protocolx-verify.json</code> names the directory holding your{' '}
              <code>Move.toml</code>. Two optional files each turn one more gate from neutral into
              live.
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
            lead="Of the audit firms serving Sui Move, exactly one publishes a price: roughly seven to twelve thousand dollars for a standard review, fifteen to twenty-five with formal verification. A verification sprint is the layer below that, and it leaves four things in your repository."
            proof="Below that price there is tooling: open-source mutation engines for Move exist, one of them Sui-only and already runnable as a pull-request action. An exit code and a console log are not something a funder, an auditor or a buyer can hold. There is no shareable, attestable, per-commit record of test quality for Move, and no installable app that speaks it."
          />

          <ul className="grid w-full gap-4 md:grid-cols-2">
            {sprint.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 80}>
                <div className="panel flex h-full flex-col gap-2.5 p-6">
                  <h3 className="text-subhead font-semibold text-white">{item.title}</h3>
                  <p className="text-body text-px-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="panel w-full max-w-prose p-6">
            <p className="text-body text-px-muted">
              <span className="font-semibold text-white">The independence clause, in full:</span>{' '}
              where Northlatch Labs verifies its own contracts, that is an internal review by the
              party that wrote the code — evidence, not an audit, and no claim of independence is
              made. Where it verifies yours, it is still not your auditor. This is the measured
              layer below the audit.
            </p>
            <p className="mt-4 text-body text-px-muted">
              {/* The entry anchor. It describes a measurement, not an engagement, which is why
                  the exclusions are stated here rather than left to be asked for. Exact sprint
                  figures are quoted in writing per engagement and deliberately not printed. */}
              <span className="font-semibold text-white">From $1,000.</span> That is the First
              Report: one Move package, all five PVS gates, returned as an evidence bundle whose
              digest you can re-derive without us, paid in USDC on Sui. Turnaround is agreed in
              writing when you order; none has been delivered yet. It is a measurement, not an
              engagement: public repositories only, no remediation, no claim of independence.
            </p>
            {/* Word-for-word with /verification/install. Two pages that paraphrase the same price
                eventually quote two different ones. */}
            <p className="mt-4 text-body text-px-muted">
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
            <p className="mt-4 text-body text-px-muted">
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
            <p className="mt-4 text-body text-px-muted">
              <span className="font-semibold text-white">Running the Action yourself is free, on
              public and private repositories alike.</span> The licence grants production use in
              your own CI against your own code, with nothing to sign and nothing metered. It is
              not a trial and it does not expire. The subscription buys the hosted App: the runs,
              the check runs, the retained bundles and the digest gate that reads the chain.
            </p>
            <p className="mt-4 text-body text-px-muted">
              The hosted App is not publicly listed yet, so that install is arranged by email and
              self-serve billing is not open. Send the repository name to{' '}
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
              and Northlatch Labs replies with what the install needs from your side.
            </p>
          </div>

          <div className="mt-10 w-full max-w-prose">
            <p className="mb-3 text-meta text-px-muted">
              Running the Action yourself instead? Hear the day the hosted App opens for
              self-serve installs.
            </p>
            <NotifySignup source="verification" />
          </div>
        </div>
      </Section>
    </>
  );
}
