// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
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
    'The security model of ProjectX: how the no-loss invariant is enforced by the type system, how the draw and settlement are protected, and what is explicitly out of scope.',
};

export default function SecurityPage() {
  const defences = [
    {
      title: 'Principal is unreachable from admin code',
      body: 'No function taking the admin capability can reach the liquid balance, the staked principal, the total, or any deposit receipt. This is not a permission check that could be misconfigured or forgotten — those types are not in scope for that code path, and the compiler is what enforces it.',
    },
    {
      title: 'Total principal has exactly two writers',
      body: 'It increases in deposit, by exactly the coin paid in, and decreases in withdraw, by exactly the receipt principal. No other function writes it, and the test suite asserts the invariant after every operation.',
    },
    {
      title: 'Withdrawals have no guard to abuse',
      body: 'Deposits can be paused. Withdrawals cannot: there is no pause flag, cooldown or rate limit on the withdrawal path, and its absence is asserted directly in the tests so it cannot be reintroduced quietly.',
    },
    {
      title: 'Positions cannot be moved by anyone',
      body: 'The deposit receipt has key without store. It cannot be transferred, sold, lent or wrapped by any external transaction, which removes an entire class of position-stealing exploit rather than defending against it.',
    },
    {
      title: 'The draw cannot be ground',
      body: 'Randomness is drawn from Sui’s native source inside a non-public entry function, so the value cannot be observed and acted upon in the same transaction. Ineligible slots are resampled rather than skipped, keeping the distribution exactly proportional to stake.',
    },
    {
      title: 'The settlement swap is floored on chain',
      body: 'The price is read and a minimum output pinned into a ticket object that Move cannot drop, copy or store — so the transaction cannot complete unless the settlement consumes it in the same block. An execution below the floor reverts the swap with it.',
    },
  ];

  const scope = [
    {
      title: 'No independent review has been completed',
      body: 'The contract suite passes 75 tests and the no-loss invariant is enforced by the compiler. No third party has reviewed this code, and nothing on this site should be read as saying otherwise. The two areas that most need one — the randomness analysis and the admin-isolation argument — are set out on this page rather than left for a reviewer to find.',
    },
    {
      title: 'Oracle validation',
      body: 'Settlement bounds every conversion with a Switchboard aggregator, validated hard: a non-positive price, a zero mean, a sample older than the freshness window, responder dispersion or a value outside the permitted band each abort the settlement outright. Multi-feed redundancy is on the roadmap.',
    },
    {
      title: 'Third-party liveness',
      body: 'Settlement needs an oracle gateway and a DEX pool to be reachable. When they are not, the epoch does not settle and the pot rolls forward. That is the designed outcome and it costs liveness, not principal.',
    },
    {
      title: 'Legal compliance is not a protocol property',
      body: 'Jurisdiction restrictions, the official rules and the sponsor’s legal identity are matters for counsel, not for code. Geo-restriction is one layer and is defeated by a VPN; it is not a compliance programme.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="Why your deposit is safe"
        lead="The no-loss guarantee is structural. It is enforced by the Move type system at compile time, not promised in documentation — and the threat model, including where the guarantee stops, is on this page."
        art={<SecurityArt className="w-full" />}
      >
        <Badge tone="prize">
          <ShieldCheck className="h-3.5 w-3.5" />
          Invariant type-enforced
        </Badge>
        <Badge tone="accent">
          <ShieldCheck className="h-3.5 w-3.5" />
          Threat model on this page
        </Badge>
      </PageHeader>

      <Section width="wide">
        <LegalNav current="/security" />
        <SectionHeader
          eyebrow="Security and control"
          title="Who controls each deployed package"
          lead="On Sui, the largest trust assumption is who can upgrade a package. Every value below was read from the chain on the date shown; anything not verified reads “not yet published” rather than a guess."
        />
        <p className="mt-4 text-center font-mono text-[0.8125rem] text-px-faint">
          Last verified against {SECURITY_NETWORK}: {SECURITY_READ_AT}
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full min-w-[46rem] border-collapse text-left text-[0.875rem]">
            <thead>
              <tr className="border-b border-white/[0.1] bg-white/[0.02] text-px-faint">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Package ID</th>
                <th className="p-4 font-medium">Version</th>
                <th className="p-4 font-medium">UpgradeCap holder</th>
                <th className="p-4 font-medium">Other capabilities</th>
              </tr>
            </thead>
            <tbody>
              {SECURITY_PACKAGES.map((row) => (
                <tr key={row.product} className="border-b border-white/[0.06] align-top last:border-0">
                  <td className="p-4">
                    <span className="font-medium text-white">{row.product}</span>
                    <span className="mt-1 block text-[0.6875rem] uppercase tracking-wide text-px-faint">
                      {row.source === 'chain' ? `read from chain · ${SECURITY_READ_AT}` : 'from spec · not re-read'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="block break-all font-mono text-[0.75rem] text-px-muted">
                      {row.packageId}
                    </span>
                    {row.packageOrigin ? (
                      <span className="mt-1 block break-all font-mono text-[0.6875rem] text-px-faint">
                        origin {row.packageOrigin}
                      </span>
                    ) : null}
                  </td>
                  <td className="p-4 font-mono tabular-nums text-px-muted">{row.version ?? 'not yet published'}</td>
                  <td className="p-4">
                    <span className="block break-all font-mono text-[0.75rem] text-px-muted">
                      {row.upgradeCapHolder}
                    </span>
                    {row.upgradeCapId ? (
                      <span className="mt-1 block break-all font-mono text-[0.6875rem] text-px-faint">
                        cap {row.upgradeCapId}
                      </span>
                    ) : null}
                  </td>
                  <td className="p-4 text-px-muted">{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose-px mx-auto mt-12 max-w-prose">
          <h2>What the upgrade authority can do</h2>
          <p>
            The holder of a package&rsquo;s UpgradeCap can publish a new version of that package. On
            Sui an upgrade cannot change the types of existing objects or remove public functions, but
            it can add functions and change the behaviour of existing non-public logic. Any upgrade is
            a public, on-chain transaction visible to anyone. This is the largest trust assumption in
            the system and is why it is published here.
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
              text has been folded in here, and that card is gone. One heading, one address,
              every term in one place. */}
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

      <Section>
        <SectionHeader
          eyebrow="Defences"
          title="Six properties, each enforced by structure rather than policy"
          lead="A protective measure that depends on an operator behaving correctly is a promise. These are not that."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {defences.map((item) => (
            <li key={item.title} className="panel flex flex-col gap-3 p-6">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="limitations" tone="panel">
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
      </Section>

      <Section>
        {/* This grid held a second "Reporting a vulnerability" card beside the monitoring one.
            Its text now sits in the single reporting section above, which is the one that
            carries the 72-hour acknowledgement. */}
        <div className="grid gap-5">
          <Card>
            <h2 className="text-lg font-semibold text-white">Monitoring what silence hides</h2>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              A protocol can fail by doing nothing, and a dashboard showing green is not
              evidence that anything happened. ProjectX counts consecutive zero-yield
              harvests and the Sui epochs elapsed since yield was last realised, and reports
              the state as anomalous once it crosses a threshold — surfaced in the interfaces,
              where it cannot be quietly ignored.
            </p>
          </Card>
        </div>

        <Callout
          className="mt-10"
          title="Test the guarantee yourself"
          actions={
            <>
              <Button href="/ctf" variant="primary" className="px-5">
                Enter the range
              </Button>
              <Button href="/protocol" variant="secondary">
                How it works
              </Button>
            </>
          }
        >
          Eight challenges built from real findings, running against a retired mainnet
          deployment — the fastest way to see exactly what the invariant covers.
        </Callout>
      </Section>
    </>
  );
}
