// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { LegalNav } from '@/components/layout/LegalNav';
import { SecurityArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';
import { Warning, ShieldCheck } from '@/components/ui/Icons';
import {
  SECURITY_PACKAGES,
  SECURITY_READ_AT,
  SECURITY_NETWORK,
  SALT_SERVICE_PROVIDER,
} from '@/lib/security-chain-read';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'How ProtocolX secures what it ships: the measurements every contract passes before it touches money, who holds the upgrade authority over each deployed package, how to report a vulnerability, and exactly where the guarantees stop.',
};

/**
 * Re-registered 30 August 2026, on the Master's order: this page must be *"about our verification
 * practice and threat model, not the vault's no-loss guarantee."*
 *
 * It opened "Why your deposit is safe" — a sentence addressed to a depositor, about a product
 * whose interface was retired on 25 August 2026, on the page a verification buyer opens to decide
 * whether this company is competent. Six of its nine sections argued the vault's invariant.
 *
 * WHAT MOVED, AND WHERE — nothing was deleted:
 *   · The six type-system defences ("Principal is unreachable from admin code" and the rest) are
 *     properties of the vault CONTRACT. They moved to /protocol, which is the record of that
 *     contract, and they moved verbatim.
 *   · The zero-yield monitoring card moved with them, for the same reason.
 *   · Two of the four out-of-scope items — oracle validation and third-party liveness — are
 *     settlement facts about that same contract and went to /protocol too.
 *   · The upgrade-authority TABLE moved to /chain, which is the deployment record's own surface.
 *     The interpretation stays here, because "who can upgrade this" is a threat-model question and
 *     /chain is a data page. One table, one source, rendered once.
 *
 * WHAT ARRIVED: the practice itself. What this company does to its own code before that code holds
 * anyone's money — which is the thing the flagship sells, and which this page did not mention.
 *
 * Every claim below is already published on /verification, /verification/install or /chain. The
 * independence clause is repeated rather than softened: no third party has reviewed any of this.
 */
export default function SecurityPage() {
  const practice = [
    {
      title: 'Five gates, on our own pull requests first',
      body: 'Build, digest, tests, pin and mutation-smoke — the ProtocolX Verification Standard runs against our own Sui mainnet contracts, by the same engine we sell. The product is not a thing we built for customers and then adopted; it is the instrument we built for ourselves and then listed.',
    },
    {
      title: 'A passing suite is not evidence',
      body: 'Mutation testing deletes each guard on purpose and proves the tests notice. The ones that survive name an assertion nothing exercises. Survivors are published as counts rather than averaged into a score, because a percentage is the format in which an uncomfortable number goes missing.',
    },
    {
      title: 'Staged at production scale before mainnet',
      body: 'Before code faces real money it faces a private network: 60,000 funded wallets, 60,000 real transactions, the whole lifecycle — and the escrow must come out at exactly zero. A conservation check that passes on ten transactions has told you nothing about ten thousand.',
    },
    {
      title: 'Money paths proven, not argued',
      body: 'Tests sample inputs; a prover exhausts them. The registrar’s money path is proven with the Sui Prover: every mist of a payment ends in the treasury or back in your change. This is being applied one contract at a time and the ones it has not reached yet are not described as though it has.',
    },
    {
      title: 'Deployed drift is a tripwire, not a review item',
      body: 'A recorded digest beside the source means a build that no longer matches the chain fails a check rather than waiting for someone to notice. The gap between "what we audited" and "what is deployed" is where a great many incidents actually live.',
    },
    {
      title: 'A gate that did not run is a failure',
      body: 'Any check that never reported is swept to an explicit failure at the end of the run. Never ran must not read as passed — a silent gate is worse than a red one, because it looks like the good outcome.',
    },
  ];

  const scope = [
    {
      title: 'No independent review has been completed',
      body: 'No third party has reviewed this code, and nothing on this site should be read as saying otherwise. The contract suite passes 75 tests and the vault’s no-loss invariant is enforced by the compiler — both real, neither a review. The two areas that most need one, the randomness analysis and the admin-isolation argument, are published rather than left for a reviewer to find.',
    },
    {
      title: 'A measurement is not an audit, and we are not your auditors',
      body: 'What ProtocolX Verify produces is measured evidence: verdicts, survivor counts and a bundle whose digest reproduces. Where we measure our own contracts we are the party that wrote the code. Where we measure yours we are the layer below your audit, not a substitute for it, and no report of ours will ever be worded as one.',
    },
    {
      title: 'A survivor is a gap in a suite, not a defect in a contract',
      body: 'Mutation-smoke names assertions no test exercises. It does not find vulnerabilities and does not claim to. The report is checked against a word list so that a survivor cannot be promoted into a finding by whoever writes the summary — including by us.',
    },
    {
      title: 'The upgrade authority is real and it is the largest assumption here',
      body: 'Every deployed package has a holder who can publish a new version of it. Sui prevents an upgrade from changing existing object types or removing public functions; it does not prevent new functions or changed non-public behaviour. Each holder is named on the on-chain record rather than described in general terms.',
    },
    {
      title: 'The source is not published, and we will not pretend it is',
      body: 'The Northlatch Labs GitHub organisation currently publishes no public repositories. Published Move bytecode is readable on any explorer, which is a genuine and checkable thing — but it is not the same as reading the source, and no page here will tell you to go and read one that is not there.',
    },
    {
      title: 'Legal compliance is not a protocol property',
      body: 'Jurisdiction restrictions, official rules and a promoter’s legal identity are matters for counsel, not for code. Geo-restriction is one layer and is defeated by a VPN; it is not a compliance programme.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="What we do to our own code before it holds anyone's money"
        lead="Everything on this estate settles real value on Sui mainnet, so nothing ships on a green checkmark alone. This page is the practice that stands behind that — the measurements, who holds the upgrade authority over every deployed package, how to report a defect, and exactly where the guarantees stop."
        art={<SecurityArt className="w-full" />}
      >
        <Badge tone="prize">
          <ShieldCheck className="h-3.5 w-3.5" />
          Measured, not asserted
        </Badge>
        <Badge tone="accent">
          <ShieldCheck className="h-3.5 w-3.5" />
          Threat model on this page
        </Badge>
      </PageHeader>

      <Section>
        <LegalNav current="/security" />
        <SectionHeader
          eyebrow="The practice"
          title="Six things that happen before a contract sees mainnet"
          lead="These are not policies anyone promises to follow. Five of the six are check runs that fail a pull request, and the sixth is a staging network that has to balance to zero."
          proof="This is the same standard ProtocolX Verify installs on a customer's repository. We are not selling a process we do not run — we are listing the one we already had."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {practice.map((item) => (
            <li key={item.title} className="panel flex flex-col gap-3 p-6">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <Callout
          className="mt-10"
          title="Every gate, described one at a time"
          actions={
            <>
              <Button href="/verification" variant="primary" className="px-5">
                What the five gates measure
              </Button>
              <Button href="/verification/install" variant="secondary">
                Run them on your repository
              </Button>
            </>
          }
        >
          Each gate is written up with the condition it refuses to accept and the case where it
          reports neutral instead of guessing.
        </Callout>
      </Section>

      <Section tone="panel" width="wide">
        <SectionHeader
          eyebrow="Trust assumptions"
          title="Who can change what, after it is deployed"
          lead="On Sui the largest trust assumption is who holds a package's UpgradeCap. There are four across this estate, every one of them read from the chain rather than taken from a specification."
          proof={`Last read against ${SECURITY_NETWORK}: ${SECURITY_READ_AT}. Anything that could not be verified renders as “not yet published” on the record rather than as a guess.`}
        />

        <div className="prose-px mx-auto mt-10 max-w-prose">
          <h2>What the upgrade authority can do</h2>
          <p>
            The holder of a package&rsquo;s UpgradeCap can publish a new version of that package. On
            Sui an upgrade cannot change the types of existing objects or remove public functions,
            but it can add functions and change the behaviour of existing non-public logic. Any
            upgrade is a public, on-chain transaction visible to anyone. This is the largest trust
            assumption in the system and is why the holders are published.
          </p>
          <p>
            {/* The table itself lives on /chain as of 30 August 2026. It is the deployment record,
                and the deployment record now has a page. Rendering it in two places from one module
                would not drift, but it would ask a reader to work out which copy is canonical. */}
            All {SECURITY_PACKAGES.length} lineages — Weir, Names, the Prize Vault and Draws — are
            listed with their package identifier, their upgrade count and the current holder of
            each capability on{' '}
            <Link href="/chain">the on-chain record</Link>. Two of the four are held by a 2-of-3
            multisig; the record says which, and gives the capability&rsquo;s own object id so you
            can read its owner yourself rather than take that sentence on trust.
          </p>

          <h2>zkLogin</h2>
          <p>
            Weir&rsquo;s zkLogin flow uses a prover at prover.protocolx.io operated by Northlatch Labs
            LLC, and a salt service{' '}
            {SALT_SERVICE_PROVIDER
              ? `operated by ${SALT_SERVICE_PROVIDER}`
              : 'whose operator is not yet published here'}.
          </p>

          {/* The single reporting section. A second one lived in the card grid at the foot of
              this page carrying the private-disclosure ask but not the 72-hour commitment; its
              text was folded in here, and that card is gone. One heading, one address, every
              term in one place. */}
          <h2>Reporting a vulnerability</h2>
          <p>
            If you find a defect that affects deployed funds, report it privately to{' '}
            <a href="mailto:security@projectxprotocol.dev">security@projectxprotocol.dev</a> rather
            than opening a public issue. We acknowledge within 72 hours. Please do not test against
            mainnet with real user funds.
          </p>
          <p>
            A report that arrives before an exploit is worth considerably more to us than one that
            arrives after, and we would rather hear it early and imperfectly than late.
          </p>

          <h2>Audits</h2>
          <p>No independent audit has been completed as of the date above.</p>
        </div>
      </Section>

      <Section id="limitations">
        <SectionHeader
          eyebrow="Out of scope"
          title="The perimeter of the guarantee"
          lead="A guarantee is only as good as its stated boundary. Here is exactly where ours sits, in full, on the page rather than behind a link."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {scope.map((item) => (
            <li key={item.title} className="panel flex gap-4 border-px-gold/20 p-6">
              <Warning className="mt-0.5 h-5 w-5 shrink-0 text-px-gold" />
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <Card className="mt-6">
          <h3 className="text-base font-semibold text-white">
            The contract-level guarantees, and where they are written down
          </h3>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            The vault contract&rsquo;s own defences — principal unreachable from admin code, the two
            writers on the principal total, the absence of any guard on the withdrawal path, the
            non-transferable receipt, the ungrindable draw and the on-chain settlement floor — are
            properties of that contract rather than of this company, and they are set out on{' '}
            <Link href="/protocol" className="text-px-accent underline underline-offset-4">
              the mechanism page
            </Link>{' '}
            alongside the oracle and liveness limits that bound them. The contract is live on Sui
            mainnet and no interface serves it at present.
          </p>
        </Card>
      </Section>

      <Section tone="edge">
        <Callout
          title="Test the guarantee yourself"
          actions={
            <>
              <Button href="/ctf" variant="primary" className="px-5">
                Enter the range
              </Button>
              <Button href="/chain" variant="secondary">
                Read the deployment record
              </Button>
            </>
          }
        >
          Eight challenges built from real findings, running against a retired mainnet
          deployment — the fastest way to see exactly what the invariant covers, and where it
          did not.
        </Callout>
      </Section>
    </>
  );
}
