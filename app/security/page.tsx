// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
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
    'What a contract must pass before it touches money, who holds upgrade authority over each package, how to report a vulnerability, and where the guarantees stop.',
};

/**
 * This company's verification practice and threat model.
 *
 * SINGLE SOURCE, split by subject. Properties of the vault CONTRACT — the six type-system
 * defences, the zero-yield monitoring card, and the oracle-validation and third-party-liveness
 * scope items — are rendered on /protocol, not here. The upgrade-authority TABLE is rendered on
 * /chain; only its interpretation stays here, because "who can upgrade this" is a threat-model
 * question and /chain is a data page. Do not duplicate any of them onto this page.
 *
 * Every claim below is already published on /verification, /verification/install or /chain. The
 * independence clause is stated in full and must not be softened: no third party has reviewed
 * any of this code.
 */
export default function SecurityPage() {
  // Counted, not typed in: how many of the four upgrade caps this multisig actually holds. The
  // sentence below used to say "two" while the table it points at showed three (Weir, Names and
  // Draws all held by 0x00e734d5…11605, in full or truncated form) — this derives the count so
  // the prose cannot drift from the table again.
  const multisigCount = SECURITY_PACKAGES.filter((p) =>
    p.upgradeCapHolder.includes('00e734d5'),
  ).length;

  const practice = [
    {
      title: 'Five gates, on our own pull requests first',
      body: 'Build, digest, tests, pin and mutation-smoke. The ProtocolX Verification Standard runs against Northlatch Labs’ own Sui mainnet contracts, by the same engine it sells.',
    },
    {
      title: 'A passing suite is not evidence',
      body: 'Mutation testing deletes each guard on purpose and proves the tests notice. A survivor names an assertion nothing exercises. Survivors are published as counts, never averaged into a score.',
    },
    {
      title: 'Staged at production scale before mainnet',
      body: 'Before code faces real money, the whole lifecycle runs on a private network with funded wallets and real gas, and the escrow must come out at exactly zero. The run logs are not published.',
    },
    {
      title: 'Money paths proven, not argued',
      body: 'Tests sample inputs; a prover exhausts them. The registrar’s money path is proven with the Sui Prover: every mist of a payment ends in the treasury or back in your change. The spec is not published, and contracts the prover has not reached are not described as proven.',
    },
    {
      title: 'Deployed drift is a tripwire, not a review item',
      body: 'A recorded digest beside the source means a build that no longer matches the chain fails a check rather than waiting for someone to notice. The gap between reviewed code and deployed code is where incidents live.',
    },
    {
      title: 'A gate that did not run is a failure',
      body: 'Any check that never reported is swept to an explicit failure at the end of the run. Never ran must not read as passed.',
    },
  ];

  const scope = [
    {
      title: 'No independent review has been completed',
      body: 'No third party has reviewed this code. On the last local run (3 September 2026) the protocol package passed 75 Move tests and the vault package 170, and the vault’s no-loss invariant is enforced by the compiler. Neither of those is a review.',
    },
    {
      title: 'A measurement is not an audit',
      body: 'What ProtocolX Verify produces is measured evidence: verdicts, survivor counts and a bundle whose digest reproduces. Northlatch Labs wrote the contracts it measures here. Where it measures yours, it is the layer below your audit, not a substitute for it.',
    },
    {
      title: 'A survivor is a gap in a suite, not a defect in a contract',
      body: 'Mutation-smoke names assertions no test exercises. It does not find vulnerabilities. The report is checked against a word list so a survivor cannot be promoted into a finding by whoever writes the summary.',
    },
    {
      title: 'The upgrade authority is real and it is the largest assumption here',
      body: 'Every deployed package has a holder who can publish a new version of it. Sui prevents an upgrade from changing existing object types or removing public functions; new functions and changed non-public behaviour are permitted. Each holder is named on the on-chain record.',
    },
    {
      title: 'The source is not published',
      body: 'The Northlatch Labs GitHub organisation publishes one repository, weir-protocol: the Weir contracts and six libraries. The vault, draws, names and the verification engine are not published. Their bytecode is readable on any explorer, which is not the same as reading the source.',
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
        title="What every contract passes before it holds anyone's money"
        lead="Everything on this estate settles real value on Sui mainnet, so nothing ships on a green checkmark. This page carries the measurements, who holds upgrade authority over each deployed package, how to report a defect, and where the guarantees stop."
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
          lead="Five of the six are check runs that fail a pull request. The sixth is a staging network that has to balance to zero."
          proof="This is the same standard ProtocolX Verify installs on a repository: Northlatch Labs' own today, yours on request."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {practice.map((item) => (
            <li key={item.title} className="panel flex flex-col gap-3 p-6">
              <h3 className="text-subhead font-semibold text-white">{item.title}</h3>
              <p className="text-body text-px-muted">{item.body}</p>
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
            but it can add functions and change non-public logic. Every upgrade is a public,
            on-chain transaction. This is the largest trust assumption here, which is why the
            holders are published.
          </p>
          <p>
            {/* The table itself is rendered on /chain. Rendering it in two places from one
                module would not drift, but it would ask a reader to work out which copy is
                canonical. */}
            All {SECURITY_PACKAGES.length} lineages — Weir, Names, the Prize Vault and Draws — are
            listed with their package identifier, their upgrade count and the current holder of
            each capability on{' '}
            <Link href="/chain">the on-chain record</Link>. {['Zero', 'One', 'Two', 'Three', 'Four'][multisigCount]} of the {SECURITY_PACKAGES.length} are held by a 2-of-3
            multisig. The record says which, and gives each capability&rsquo;s object id so you can
            read its owner yourself.
          </p>

          <h2>zkLogin</h2>
          <p>
            Weir&rsquo;s zkLogin flow uses a prover at prover.protocolx.io operated by Northlatch Labs
            LLC, and a salt service{' '}
            {SALT_SERVICE_PROVIDER
              ? `operated by ${SALT_SERVICE_PROVIDER}`
              : 'whose operator is not yet published here'}.
          </p>

          {/* The single reporting section: one heading, one address, every term in one place.
              Do not add a second disclosure block elsewhere on this page — the last one stated
              the private-disclosure ask without the 72-hour commitment. */}
          <h2>Reporting a vulnerability</h2>
          <p>
            If you find a defect that affects deployed funds, report it privately to{' '}
            <a href="mailto:security@projectxprotocol.dev">security@projectxprotocol.dev</a> rather
            than opening a public issue. We aim to acknowledge within 72 hours. Please do not test
            against mainnet with real user funds.
          </p>
          <p>
            A report that arrives before an exploit is worth more than one that arrives after.
            Early and imperfect beats late.
          </p>

          <h2>Audits</h2>
          <p>No independent audit has been completed as of the date above.</p>
        </div>
      </Section>

      <Section id="limitations">
        <SectionHeader
          eyebrow="Out of scope"
          title="The perimeter of the guarantee"
          lead="A guarantee is only as good as its stated boundary. Here is where this one stops, in full, on the page rather than behind a link."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {scope.map((item) => (
            <li key={item.title} className="panel flex gap-4 border-px-gold/20 p-6">
              <Warning className="mt-0.5 h-5 w-5 shrink-0 text-px-gold" />
              <div className="flex flex-col gap-2">
                <h3 className="text-subhead font-semibold text-white">{item.title}</h3>
                <p className="text-body text-px-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <Card className="mt-6">
          <h3 className="text-subhead font-semibold text-white">
            The contract-level guarantees, and where they are written down
          </h3>
          <p className="mt-3 text-body text-px-muted">
            The vault contract&rsquo;s six defences — from principal unreachable by admin code to
            the on-chain settlement floor — are properties of that contract rather than of this
            company. They are set out on{' '}
            <Link href="/protocol" className="text-px-accent underline underline-offset-4">
              the mechanism page
            </Link>{' '}
            alongside the oracle and liveness limits that bound them. The contract is live on Sui
            mainnet and no interface serves it.
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
