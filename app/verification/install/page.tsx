// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata } from 'next';
import { CopyBlock } from '@/components/ui/CopyBlock';
import { NotifySignup } from '@/components/ui/NotifySignup';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { VERIFY_REPO_URL } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Install ProtocolX Verify',
  description:
    'What the five ProtocolX Verify check runs measure on your pull request, what a repository needs to qualify, the .protocolx-verify.json config in full, how to run the Action free in your own CI, and how the hosted GitHub App gets installed for you.',
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
 * The install page for ProtocolX Verify: what the checks measure in the reader's own terms, the
 * four steps, the exact file a repository needs, and one control to press.
 *
 * Three claim disciplines govern what this page may say:
 *
 *   1. **Never "audited".** Not of our own work and not of anyone's. What the App produces is
 *      measured evidence — verdicts, counts, a bundle with a reproducible digest — and the word
 *      audit describes an independent engagement that has not happened. The independence clause
 *      at the foot of this page is the same paragraph /verification carries, in full, not linked.
 *
 *   2. **No price the thing being described does not have.** The entry anchor is the First
 *      Report at $1,000, which buys a measurement of one public Move package rather than an
 *      engagement — so the copy below must carry the exclusions beside the price (public
 *      repositories only, no remediation, not an audit) or the number promises more than it
 *      covers. Sprints are quoted per engagement, so no sprint figure is printed here.
 *
 *      The hosted App tier now carries a list price and a founding price, and both are printed.
 *      That price is the App's alone. The GitHub Action is free to run in a customer's own CI on
 *      their own code, public or private, and the licence says so — never present the hosted
 *      service's monthly figure as the Action's price, and never let the App's billing state be
 *      read as a charge for the Action.
 *
 *   3. **Separate the two products, every time.** The Action is published and free: the licence
 *      grants production use in a customer's own CI, on public and private repositories alike,
 *      with nothing to sign and nothing metered, and it does not expire. The HOSTED App is the
 *      one that is installable on one account only — multi-tenancy beyond this org is not built,
 *      so it is genuinely not self-serve and this page says so. Never let a limit on the App be
 *      read as a limit on the Action. When the App is listed, the honest change here is a public
 *      install button — not a rewrite of the claims.
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
      body: 'A clean runner, a pinned Sui CLI, your package, nothing cached. A build that depends on something only your machine has fails the pull request, not the day someone else clones the repository.',
    },
    {
      title: 'PVS · digest',
      question: 'Does your source still build to the contract that is live?',
      body: 'Where your package carries a recorded digest, the check builds your source and compares the result byte for byte against it. An accidental edit to deployed code fails the pull request instead of surfacing in an incident review. With no digest recorded, the check reports neutral.',
    },
    {
      title: 'PVS · tests',
      question: 'Is the Move suite green on the runner, not just for you?',
      body: 'The suite runs against the exact commit the pull request proposes. It is the floor, not the evidence: a green suite says only that nothing you wrote a test for is broken.',
    },
    {
      title: 'PVS · pin',
      question: 'Has the framework moved underneath you?',
      body: 'Where your repository carries an executable framework-pin script, the check runs it. A dependency that drifts changes what compiles, and what your digest means, without a line of your repository changing. With no such script, the check reports neutral and names the file it looked for.',
    },
    {
      title: 'PVS · mutation-smoke',
      question: 'Would your tests notice if a guard were quietly deleted?',
      body: 'Five assertions in your sources are broken on purpose, one at a time, and the suite has to fail for each. A survivor names an assertion no test exercises: a gap in the suite, not a defect in the contract. A full run costs one suite run per assert and belongs on a schedule.',
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
      title: 'Add it to the repository',
      body: 'The Action is published and free: drop it into your own CI today, public or private, nothing to sign. The hosted App, where Northlatch Labs runs the gates for you, is not yet listed for public installation, so that one is added over email.',
    },
    {
      step: '02',
      title: 'Open a pull request',
      body: 'Push a branch and open the pull request you were going to open anyway. The checks attach themselves to the head commit. There is nothing to remember and no command to run.',
    },
    {
      step: '03',
      title: 'Five checks run',
      body: 'PVS · build, digest, tests, pin and mutation-smoke, run by the same engine that measures Northlatch Labs’ own mainnet contracts. A gate that never reported is swept to an explicit failure at the end: never ran must not read as passed.',
    },
    {
      step: '04',
      title: 'Read the evidence',
      body: 'Every check reports what it measured with the run log behind it. The run also writes an evidence bundle — a manifest, a report and a digest that reproduces — uploaded as a workflow artifact. The bundle is the file an auditor can cite.',
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
            lead="Verify is a published GitHub Action and a hosted GitHub App. Either one puts five check runs from the ProtocolX Verification Standard on every pull request of a Sui Move repository, run by the engine that measures Northlatch Labs' own mainnet contracts."
            proof="The two differ. The Action is free to run in your own CI today, on public and private repositories alike. The hosted App is installable on one account and not yet listed for self-serve installation, so that install is arranged by email."
          />

          <ul className="grid w-full gap-4 md:grid-cols-3">
            {checks.map((check, index) => (
              <Reveal as="li" key={check.title} delay={index * 80}>
                <div className="panel flex h-full flex-col gap-2.5 p-6">
                  {/* h2 for the same reason as the gate cards on /verification: this page's
                      opening SectionHeader is the document h1, so h3 here skipped a level. */}
                  <h2 className="font-mono text-meta text-px-faint">{check.title}</h2>
                  <p className="text-body font-semibold text-white">{check.question}</p>
                  <p className="text-body text-px-muted">{check.body}</p>
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
                  <span className="font-mono text-meta text-px-cyan">{item.step}</span>
                  <h3 className="text-subhead font-semibold text-white">{item.title}</h3>
                  <p className="text-body text-px-muted">{item.body}</p>
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
              <h3 className="text-subhead font-semibold text-white">A Sui Move package</h3>
              <p className="text-body text-px-muted">
                A directory in your repository holding a Move.toml that sui move build and sui
                move test can run in. The App measures one package per repository.
              </p>
            </div>

            <div className="panel flex flex-col gap-2.5 p-6">
              <h3 className="text-subhead font-semibold text-white">
                .protocolx-verify.json at the repository root
              </h3>
              <p className="text-body text-px-muted">
                One required key: package, the path from the repository root to the directory
                holding your Move.toml. The runner refuses a config whose package is not a
                non-empty string. It does not guess, because a lucky guess is a verdict about the
                wrong directory.
              </p>
            </div>

            <CopyBlock
              caption=".protocolx-verify.json"
              label="the .protocolx-verify.json config"
              code={'{ "package": "sui-contracts" }'}
            />

            <div className="panel flex flex-col gap-2.5 p-6">
              <h3 className="text-subhead font-semibold text-white">
                Two optional files, each turning on one more check
              </h3>
              <p className="text-body text-px-muted">
                A file named ci-expected-digest beside your Move.toml, holding the hex digest your
                deployed package builds to, turns PVS · digest from neutral into a live
                deployed-drift tripwire. An executable scripts/check-framework-pin.sh inside the
                package does the same for PVS · pin. Neither is required, and neither is written
                for you.
              </p>
            </div>

            <p className="text-meta text-px-faint">
              With no .protocolx-verify.json at all, all five checks complete neutral and carry
              setup instructions. A repository that has not opted in gets an explanation, never a
              red cross.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="panel">
        <div className="flex flex-col items-center gap-10">
          <SectionHeader
            eyebrow="What it costs"
            title="Running it yourself is free. The two hosted things have numbers."
            lead="Three products, one price list. The Action costs nothing to run in your own CI. The First Report and the hosted App are priced, and both figures are below."
          />

          <div className="panel w-full max-w-prose p-6">
            <p className="text-body text-px-muted">
              {/* Deliberately word-for-word with /verification. Two pages that paraphrase the
                  same price eventually quote two different ones. */}
              <span className="font-semibold text-white">From $1,000.</span> That is the First
              Report: one Move package, all five PVS gates, returned as an evidence bundle whose
              digest you can re-derive without us, paid in USDC on Sui. Turnaround is agreed in
              writing when you order; none has been delivered yet. It is a measurement, not an
              engagement: public repositories only, no remediation, no claim of independence.
            </p>
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
              self-serve billing is not open. Running the Action needs none of that.
            </p>
          </div>

          {/* The licence paragraph above says the engine may be run in your own CI. A reader who
              is told that and given no address has been told to take our word for it, so the
              repository carrying the composite Action and its gate scripts is linked here. */}
          <Button href={VERIFY_REPO_URL} variant="secondary" className="px-5">
            The Action on GitHub
          </Button>

          {/* Two controls, and they are deliberately not the same control.
              The email is the one that gets a repository installed: early access means a person
              at this end, so the ask is a repository name and the answer is a reply. The field
              below it is the announcements list, and it stays the announcements list — the
              consent line under it promises announcements and nothing else, forever, so quietly
              treating a signup there as permission to open a sales conversation would break the
              one promise this site makes to every address it holds. Naming which control does
              which costs two sentences and keeps both honest. */}
          <div className="w-full max-w-prose">
            <h3 className="text-subhead font-semibold text-white">
              Want the hosted App instead? Name the repository
            </h3>
            <p className="mt-2 text-body text-px-muted">
              Send the repository name and Northlatch Labs replies with what the install needs from
              your side. The Action needs no email at all: it is published and you can start with
              it today.
            </p>
            {/* MUST be hello@projectxprotocol.dev: it is the published address for verification
                enquiries and it reaches a monitored inbox — verified.

                Do not point this at claude@protocolx.io. That address forwards only to
                protocolx@atomicmail.ai, a machine mailbox nobody reads, so a reader who pressed
                this control would land in a void. Any address printed on a public page must
                resolve to an inbox somebody reads; that is a different question from which
                address outbound mail uses as its reply-to. */}
            <a
              className="btn-primary mt-4 inline-flex px-5"
              href="mailto:hello@projectxprotocol.dev?subject=ProtocolX%20Verify%20early%20access"
            >
              Send us the repository
            </a>
          </div>

          <div className="w-full max-w-prose">
            <h3 className="text-subhead font-semibold text-white">
              Not ready to name a repository
            </h3>
            <p className="mb-3 mt-2 text-meta text-px-muted">
              This field is the announcements list and only that. It tells you the day the hosted
              App opens for self-serve installation, and nothing else.
            </p>
            <NotifySignup source="install" cta="Tell me when it opens" />
          </div>

          <div className="panel w-full max-w-prose p-6">
            <p className="text-body text-px-muted">
              <span className="font-semibold text-white">The independence clause, in full:</span>{' '}
              where Northlatch Labs verifies its own contracts, that is an internal review by the
              party that wrote the code — evidence, not an audit, and no claim of independence is
              made. Where it verifies yours, it is still not your auditor. This is the measured
              layer below the audit.
            </p>
            <p className="mt-4 text-body text-px-muted">
              What the App produces is measured evidence: verdicts, survivor counts, and an
              evidence bundle whose digest reproduces. No audit opinion is offered.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
