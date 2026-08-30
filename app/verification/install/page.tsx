// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import { CopyBlock } from '@/components/ui/CopyBlock';
import { NotifySignup } from '@/components/ui/NotifySignup';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Install ProtocolX Verify',
  description:
    'What the five ProtocolX Verify check runs measure on your pull request, what a repository needs to qualify, the .protocolx-verify.json config in full, and how to get the GitHub App installed while it is in early access.',
  // The install-flow plate, reused as the card rather than redrawn. It states the same four
  // steps this page states, in the same order and the same words, so a reader who arrives from
  // a shared link recognises the page they land on. Reusing it is also the only way the two can
  // never disagree: one artwork, one flow.
  openGraph: {
    images: [
      {
        url: '/og/verification-install.png',
        width: 1600,
        height: 900,
        alt: 'ProtocolX Verify — install the App, open a pull request, five checks run, read the evidence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/verification-install.png'],
  },
};

/**
 * The conversion page for ProtocolX Verify — the one that has to work without us in the room.
 *
 * /verification sells the engagement: it states the standard, quotes the first-night record and
 * carries the sprint anchor. It ends, though, in an email address, which makes every reader who
 * was ready to act into a conversation we have to have. This page is the other door: what the
 * checks measure in the reader's own terms, the honest four steps, the exact file their
 * repository needs, and a control to press that says exactly what pressing it does.
 *
 * Three disciplines govern what it may say, and each has already cost this estate something:
 *
 *   1. **Never "audited".** Not of our own work and not of anyone's. What the App produces is
 *      measured evidence — verdicts, counts, a bundle with a reproducible digest — and the word
 *      audit describes an independent engagement that has not happened. The independence clause
 *      at the foot of this page is the same paragraph /verification carries, in full, not linked.
 *
 *   2. **No price the thing being described does not have.** The entry anchor is the First
 *      Report at $1,000 — a measurement of one public Move package, ruled live by the operator
 *      2026-08-30 ("bless the thousand"), terms in
 *      operations/company/first-report-sku-2026-08-30.md. It supersedes the $3,500 sprint anchor
 *      this note carried until that date. Sprints still sit above it and are still quoted per
 *      engagement, so no sprint figure is printed on this page. Because the anchor now buys a
 *      measurement rather than an engagement, the copy below has to carry the exclusions with the
 *      price — public repositories only, no remediation, not an audit — or the number promises
 *      something the SKU does not.
 *
 *      The App tier still has no price: billing and metering are deliberately unbuilt until the
 *      first service dollar (protocolx-verify/README.md, road 2). Printing a number here to make
 *      the page feel finished would be a number we would later have to withdraw, and a withdrawn
 *      price is worth less than no price. And when the App does get a price, that price is the
 *      App's alone: the GitHub Action is licensed BUSL-1.1 and is free to run in a customer's own
 *      CI on their own code, public or private. Presenting the hosted service's monthly figure as
 *      the Action's price is an error a prior notice has already made once, and it must not be
 *      made on this page.
 *
 *   3. **No claim of general availability.** app/REGISTRATION.md station 3 sets "Where can this
 *      app be installed" to *Only on this account*, and the status ledger lists multi-tenancy
 *      beyond this org as not built. So the App is genuinely not self-serve today, and the page
 *      says early access and means it. When the Owner flips that setting and the App is listed,
 *      the honest change to this page is a public install button — not a rewrite of the claims.
 *
 * The five gate descriptions are written from `engine/ci/gates.sh`, not from the marketing copy,
 * which is why two of them say when they will report neutral. `digest` runs only where a
 * `ci-expected-digest` file exists and `pin` only where `scripts/check-framework-pin.sh` is
 * executable — a reader who is told five checks run and then sees two grey rows has been misled
 * by omission, and the fix costs one sentence each.
 */
export default function VerifyInstallPage() {
  /**
   * The gates, in the reader's language: each one leads with the question it answers about THEIR
   * pull request. /verification states the same five from our side of the fence — what the
   * standard requires — because that page is addressed to someone deciding whether the standard
   * is serious. This page is addressed to someone deciding whether to install it before lunch.
   */
  const checks = [
    {
      title: 'PVS · build',
      question: 'Does it still compile somewhere that is not your laptop?',
      body: 'A clean runner, a pinned Sui CLI, your package, nothing cached and nothing left over from a previous run. If the build depends on something only your machine has, that surfaces on the pull request rather than on the day someone else clones the repository.',
    },
    {
      title: 'PVS · digest',
      question: 'Does your source still build to the contract that is live?',
      body: 'Where your package carries a recorded digest, the check builds your source and compares the result byte for byte against it. An accidental edit to deployed code fails the pull request instead of surfacing in an incident review. Where no digest is recorded, this check reports neutral and says so — it will not claim to have measured a package you never deployed.',
    },
    {
      title: 'PVS · tests',
      question: 'Is the Move suite green on the runner, not just for you?',
      body: 'The suite runs against the exact commit the pull request proposes. Treat it as the floor rather than the evidence: the four checks around it exist because a green suite on its own says only that nothing you wrote a test for is broken.',
    },
    {
      title: 'PVS · pin',
      question: 'Has the framework moved underneath you?',
      body: 'Where your repository carries an executable framework-pin script, the check runs it. A dependency that drifts changes what compiles — and changes what your digest means — without a single line of your repository changing. Where there is no such script, this check reports neutral and names the file it looked for.',
    },
    {
      title: 'PVS · mutation-smoke',
      question: 'Would your tests notice if a guard were quietly deleted?',
      body: 'Five assertions in your sources are broken on purpose, one at a time, and the suite has to fail for each. A mutation that survives names an assertion no test exercises — a gap in the suite, not a defect found in the contract, and the report is checked against a word list so it cannot be promoted into one. Five per pull request: a full run costs one suite run per assert and belongs on a schedule.',
    },
  ];

  /**
   * The four steps, carried verbatim in substance from the install-flow plate this page uses as
   * its social card, because a diagram and a page that describe the same flow differently is a
   * defect the reader finds and we do not. Step one is the only one that differs from the plate
   * today, and it differs by being more honest, not less: while the App is installable on one
   * account only, the install happens with us.
   */
  const flow = [
    {
      step: '01',
      title: 'Install the App',
      body: 'The App is added to your repository from GitHub. While it is in early access we do that step with you, on a call or over email, because the App is not yet listed for public installation.',
    },
    {
      step: '02',
      title: 'Open a pull request',
      body: 'Push a branch and open the pull request you were going to open anyway. The checks attach themselves to the head commit. There is nothing to remember and no command to run.',
    },
    {
      step: '03',
      title: 'Five checks run',
      body: 'PVS · build, digest, tests, pin and mutation-smoke, run by the same engine that measures our own mainnet contracts. A gate that never reported is swept to an explicit failure at the end: never ran must not read as passed.',
    },
    {
      step: '04',
      title: 'Read the evidence',
      body: 'Every check reports what it measured with the run log behind it, and the run writes an evidence bundle — a manifest and a report, with a digest over them that reproduces — uploaded as a workflow artifact. A check run is five coloured rows that live as long as GitHub keeps the page; the bundle is the file an auditor can cite.',
    },
  ];

  return (
    <>
      <Section>
        <div className="flex flex-col items-center gap-12">
          <SectionHeader
            as="h1"
            eyebrow="Product · ProtocolX Verify"
            title="Install it, open a pull request, read the evidence"
            lead="Verify is a GitHub App. Installed on a Sui Move repository, it puts five check runs from the ProtocolX Verification Standard on every pull request — run by the same engine that measures our own mainnet contracts, reported on your commit."
            proof="Early access, stated plainly: the App is installable on one account today and is not yet listed for self-serve installation, so an install is arranged with us. Everything below describes what it does on the repositories it already runs on, not what it will do."
          />

          <ul className="grid w-full gap-4 md:grid-cols-3">
            {checks.map((check, index) => (
              <Reveal as="li" key={check.title} delay={index * 80}>
                <div className="panel flex h-full flex-col gap-2.5 p-6">
                  {/* h2 for the same reason as the gate cards on /verification: this page's
                      opening SectionHeader is the document h1, so h3 here skipped a level. */}
                  <h2 className="font-mono text-[0.8125rem] text-px-faint">{check.title}</h2>
                  <p className="text-base font-semibold text-white">{check.question}</p>
                  <p className="text-[1rem] leading-[1.65] text-px-muted">{check.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="panel">
        <div className="flex flex-col items-center gap-10">
          <SectionHeader
            eyebrow="The flow"
            title="From install to evidence, in one pull request"
            lead="Four steps, and three of them are things your team already does."
          />

          <ol className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
            {flow.map((item, index) => (
              <Reveal as="li" key={item.step} delay={index * 80}>
                <div className="panel flex h-full flex-col gap-2.5 p-6">
                  <span className="font-mono text-[0.8125rem] text-px-cyan">{item.step}</span>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center gap-10">
          <SectionHeader
            eyebrow="Qualifying"
            title="A Sui Move package and one file at the root"
            lead="There is no dashboard to configure and no account to create. The App reads one file from your repository, and that file names the package it should measure."
          />

          <div className="flex w-full max-w-3xl flex-col gap-6">
            <div className="panel flex flex-col gap-2.5 p-6">
              <h3 className="text-base font-semibold text-white">A Sui Move package</h3>
              <p className="text-[1rem] leading-[1.65] text-px-muted">
                A directory in your repository holding a Move.toml that sui move build and sui
                move test can run in. One package per repository is what the App measures today.
              </p>
            </div>

            <div className="panel flex flex-col gap-2.5 p-6">
              <h3 className="text-base font-semibold text-white">
                .protocolx-verify.json at the repository root
              </h3>
              <p className="text-[1rem] leading-[1.65] text-px-muted">
                One required key: package, the path from the repository root to the directory
                holding your Move.toml. The runner refuses a config whose package is not a
                non-empty string rather than guessing — a guess that happened to work would be a
                verdict about the wrong directory.
              </p>
            </div>

            <CopyBlock
              caption=".protocolx-verify.json"
              label="the .protocolx-verify.json config"
              code={'{ "package": "sui-contracts" }'}
            />

            <div className="panel flex flex-col gap-2.5 p-6">
              <h3 className="text-base font-semibold text-white">
                Two optional files, each turning on one more check
              </h3>
              <p className="text-[1rem] leading-[1.65] text-px-muted">
                A file named ci-expected-digest beside your Move.toml, holding the hex digest your
                deployed package builds to, turns PVS · digest from neutral into a live
                deployed-drift tripwire. An executable scripts/check-framework-pin.sh inside the
                package does the same for PVS · pin. Neither is required, and neither is invented
                for you: a digest recorded by us would be a digest nobody checked.
              </p>
            </div>

            <p className="text-[0.9375rem] leading-[1.6] text-px-faint">
              With no .protocolx-verify.json at all, the App still answers: all five checks
              complete neutral carrying setup instructions. A repository that has not opted in
              gets an explanation, never a red cross.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="panel">
        <div className="flex flex-col items-center gap-10">
          <SectionHeader
            eyebrow="What it costs"
            title="The measurement has a number. The App does not have one yet."
            lead="Two things are being sold here and only one of them is priced, so this page prices one of them."
          />

          <div className="panel w-full max-w-prose p-6">
            <p className="text-[1rem] leading-[1.65] text-px-muted">
              {/* Deliberately word-for-word with /verification. Two pages that paraphrase the
                  same price eventually quote two different ones. */}
              <span className="font-semibold text-white">From $1,000.</span> That is the First
              Report: one Move package, all five PVS gates, delivered inside 24 hours as an
              evidence bundle whose digest you can re-derive without us, paid in USDC on Sui. It
              is a measurement and not an engagement — public repositories only, no remediation,
              and no claim of independence. Sprints sit above it, scoped to the codebase and
              quoted flat, in writing, before work begins.
            </p>
            <p className="mt-4 text-[1rem] leading-[1.65] text-px-muted">
              <span className="font-semibold text-white">The App is $149 per repository per
              month</span>, or $1,490 a year. Every pull request gets the five gates and its own
              evidence bundle, the digest gate included — the one that reads the chain. One public
              repository is free, permanently, with no card and no expiry.
            </p>
            <p className="mt-4 text-[1rem] leading-[1.65] text-px-muted">
              Self-serve billing is not open yet, so early access is arranged by email and costs
              nothing until it is. Nothing here commits you to a subscription.
            </p>
          </div>

          {/* Two controls, and they are deliberately not the same control.
              The email is the one that gets a repository installed: early access means a person
              at this end, so the ask is a repository name and the answer is a reply. The field
              below it is the announcements list, and it stays the announcements list — the
              consent line under it promises announcements and nothing else, forever, so quietly
              treating a signup there as permission to open a sales conversation would break the
              one promise this site makes to every address it holds. Naming which control does
              which costs two sentences and keeps both honest. */}
          <div className="w-full max-w-prose">
            <h3 className="text-base font-semibold text-white">
              Tell us your repository and we will install it with you
            </h3>
            <p className="mt-2 text-[1rem] leading-[1.65] text-px-muted">
              One email is the whole process while the App is in early access: send the repository
              name and we reply with what the install needs from your side, then the two of us do
              step 01 together.
            </p>
            {/* hello@projectxprotocol.dev, per operations/BRAND-EMAIL-LAW.md line 23: the hub's
                published address for verification and prospects, forwarding to the Master's
                inbox — verified.

                This button pointed at claude@protocolx.io until 30 August 2026, which forwards
                ONLY to protocolx@atomicmail.ai (same law, line 147) — a machine mailbox nobody
                currently reads. It was the buy control on the page that sells the First Report,
                so the one action this page asks for landed in a void.

                Unrelated to the Master's "keep claude" ruling of the same date: that governs the
                reply-to on OUTBOUND prospect sends, not an address printed on a public sales
                page. Do not conflate them. */}
            <a
              className="btn-primary mt-4 inline-flex px-5"
              href="mailto:hello@projectxprotocol.dev?subject=ProtocolX%20Verify%20early%20access"
            >
              Send us the repository
            </a>
          </div>

          <div className="w-full max-w-prose">
            <h3 className="text-base font-semibold text-white">
              Not ready to name a repository
            </h3>
            <p className="mb-3 mt-2 text-[0.9375rem] leading-[1.6] text-px-muted">
              This field is the announcements list and only that: it tells you the day the App
              opens for self-serve installation, and it is never used to start a conversation you
              did not ask for.
            </p>
            <NotifySignup source="install" cta="Tell me when it opens" />
          </div>

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
              What the App produces is measured evidence — verdicts, survivor counts, an evidence
              bundle whose digest reproduces — and nothing on this page should be read as an audit
              opinion, because none is offered.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
