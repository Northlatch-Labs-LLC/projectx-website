// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { BuildersArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { AddressChip } from '@/components/ui/AddressChip';
import { Toolkit } from '@/components/builders/Toolkit';
import { Ideas } from '@/components/builders/Ideas';
import { Code, Layers, Chart, Book } from '@/components/ui/Icons';
import { PRIZE_COIN, CHAIN_OBJECTS, explorerUrl } from '@/lib/chain';
import { getStats } from '@/lib/stats';

export const metadata: Metadata = {
  title: 'Builders',
  description:
    'Integrate with ProjectX: the read API, the on-chain entry points, the event stream and every deployed address on Sui mainnet.',
};

export default async function BuildersPage() {
  const STATS = await getStats();
  const pkg = CHAIN_OBJECTS.find((object) => object.label === 'Package')!;
  const pool = CHAIN_OBJECTS.find((object) => object.label === 'Pool')!;

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/pool',
      body: 'Pool state: epoch, phase, depositor count, total / staked / liquid principal, the prize pot, and the full configuration including every fee in basis points.',
    },
    {
      method: 'GET',
      path: '/api/v1/pool/treasury',
      body: 'Revenue: available and lifetime totals for both streams — staking fee in SUI, conversion spread in USDC.',
    },
    {
      method: 'GET',
      path: '/api/v1/pool/history?limit=n',
      body: 'Settled epochs, newest first: winner, SUI converted, gross out, spread taken, realised slippage, payout and transaction digest.',
    },
    {
      method: 'GET',
      path: '/api/v1/pool/yield-breakdown',
      body: 'The current oracle reading and the conversion it implies, including the effective rate after the spread. Display data — settlement performs its own stricter read.',
    },
    {
      method: 'GET',
      path: '/api/v1/pool/activity?limit=n',
      body: 'A live tail of protocol events read from the chain: deposits, withdrawals, prize funding, staking requests and settlements.',
    },
  ];

  /**
   * The published npm packages, with the version read from the registry on 11 September 2026 with
   * `npm view <name> version` and the one-line description taken from each package's own manifest
   * rather than written for this page.
   *
   * The version is a mirror, and a mirror drifts: the registry is the record, which is why every
   * card links to it. Do not edit a number here without running `npm view` first.
   */
  const packages = [
    {
      name: '@projectx-social/sdk',
      version: '1.0.2',
      body: 'TypeScript client for the projectx_social Move package on Sui.',
    },
    {
      name: '@projectx-social/agent',
      version: '1.0.2',
      body: 'A headless Node 22 library that lets an agent hold a weir account with its own Ed25519 keypair, read what it has paid for, and pay for more.',
    },
    {
      name: '@projectx-social/mcp',
      version: '1.0.4',
      body: 'weir.social as a tool inside any agent runtime that speaks Model Context Protocol — read the network, quote a price, verify authorship and publish, without ever holding a key.',
    },
    {
      name: '@projectx-social/signer',
      version: '1.0.2',
      body: 'The custody boundary: four adapters that hold a key at four different distances from the process, and a wrapper that will not let any of them sign a transaction that has not been simulated and judged.',
    },
    {
      name: '@projectx-social/policy',
      version: '1.0.2',
      body: 'A pure evaluator with zero dependencies and no I/O. It takes what a simulation observed, what an operator wrote down and what the agent has already spent, and returns allow, or a reason.',
    },
  ];

  const events = [
    ['DepositMade', 'Principal entered the pool and a receipt was issued.'],
    ['WithdrawalMade', 'Principal left the pool, 1:1, with any early-exit fee itemised.'],
    ['PrizeFunded', 'The prize pot for an epoch increased, with the resulting balance.'],
    ['WinnerSelected', 'A draw completed and pinned the winner for settlement.'],
    ['PrizeSettled', 'The prize was converted and paid, with the realised rate.'],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Builders"
        title="Read the protocol directly"
        lead={
          STATS.live
            ? 'Everything this website displays comes from a public read API and from events the contract emits. There is no privileged data path — you can rebuild every page here from the same sources.'
            : `Everything this website displays about the pool was read from the chain or from our read API, last on ${STATS.capturedOn}. The API is not served at present; the events are.`
        }
        proof="No API keys, no allowlist, no partnership call. The pool is a shared object on Sui and your interface calls the same entry points ours does."
        art={<BuildersArt className="w-full" />}
      />

      <Ideas />

      <Toolkit />

      <Section id="packages">
        <SectionHeader
          eyebrow="Packages"
          title="Published on npm"
          lead="Five packages, all Apache-2.0, installable with npm install. Each card links to the registry, which is the record — the version beside the name is a copy of it."
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {packages.map((item, index) => (
            <Reveal as="li" key={item.name} delay={index * 70}>
              <div className="panel flex h-full flex-col gap-3 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <code className="break-all font-mono text-meta text-px-text">{item.name}</code>
                  <Badge tone="neutral" className="ml-auto">
                    {item.version} · Apache-2.0
                  </Badge>
                </div>
                <p className="text-body text-px-muted">{item.body}</p>
                <div className="mt-auto pt-2">
                  <Button
                    href={`https://www.npmjs.com/package/${item.name}`}
                    variant="secondary"
                  >
                    View on npm
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="api">
        <SectionHeader
          eyebrow="Read API"
          title="Five endpoints"
          lead="JSON over HTTP. Amounts are decimal strings of base units — mist for SUI, six-decimal units for USDC — so nothing is lost to floating point in transit. Documented; not served at present."
        />

        <ul className="mt-10 flex flex-col gap-3">
          {endpoints.map((endpoint) => (
            <li key={endpoint.path} className="panel flex flex-col gap-3 p-5 md:flex-row md:gap-6">
              <div className="flex shrink-0 items-start gap-2 md:w-80">
                <span className="rounded-md border border-px-accent/30 bg-px-accent/10 px-2 py-0.5 font-mono text-meta text-px-accent-200">
                  {endpoint.method}
                </span>
                <code className="break-all font-mono text-meta text-px-text">{endpoint.path}</code>
              </div>
              <p className="text-body text-px-muted">{endpoint.body}</p>
            </li>
          ))}
        </ul>

        <Card className="mt-6">
          <h3 className="text-subhead font-semibold text-white">A note on units</h3>
          <p className="mt-3 text-body text-px-muted">
            Every amount is a base-unit string. Convert with a big-integer type, not a
            float — 1 SUI is 10<sup>9</sup> mist, prizes are quoted in{' '}
            {PRIZE_COIN.symbol} at {PRIZE_COIN.decimals} decimals, and a protocol that runs
            long enough will produce values a double rounds.
          </p>
        </Card>
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="On chain"
          title="Events and entry points"
          lead="If you would rather not depend on our API at all, index the package directly. The events below carry everything the API reports."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Card>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
                <Chart className="h-5 w-5" />
              </span>
              <h3 className="text-subhead font-semibold text-white">Emitted events</h3>
            </div>
            <dl className="mt-5 flex flex-col gap-3">
              {events.map(([name, description]) => (
                <div key={name} className="flex flex-col gap-1">
                  <dt className="font-mono text-meta text-px-cyan">{name}</dt>
                  <dd className="text-body text-px-muted">{description}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <div className="flex flex-col gap-5">
            <Card>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
                  <Code className="h-5 w-5" />
                </span>
                <h3 className="text-subhead font-semibold text-white">Calling the package</h3>
              </div>
              <p className="mt-4 text-body text-px-muted">
                The pool is generic over its prize coin type. Every call must supply the
                prize coin as a type argument — omitting it is the single most common reason
                a correct-looking transaction fails to resolve.
              </p>
              <code className="mt-4 block overflow-x-auto rounded-lg border border-white/[0.08] bg-black/40 p-3 font-mono text-meta text-px-muted">
                --type-args {PRIZE_COIN.type}
              </code>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
                  <Layers className="h-5 w-5" />
                </span>
                <h3 className="text-subhead font-semibold text-white">Separately deployed pieces</h3>
              </div>
              <p className="mt-4 text-body text-px-muted">
                The DEX adapter is its own package so a vendor upgrade can be re-pinned
                without touching the pool. If you fork or extend this design, keep that
                seam — pin dependencies by tag rather than branch, and the cost of a
                breaking upstream change stays local.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/*
        The full address table lives on /chain and is rendered there from the same module, once.

        This section KEEPS its id. `#addresses` is linked from the footer band, from /interfaces and
        from anywhere anyone has ever pasted it, and a fragment cannot be redirected: the hash never
        reaches the server. So the anchor still lands somewhere that answers the question, with the
        two identifiers an integrator needs in hand and a link to the rest.
      */}
      <Section id="addresses">
        <SectionHeader
          eyebrow="Addresses"
          title="Everything you need to index it yourself"
          lead="The two identifiers every call needs are below. Package, pool, treasury, adapter, price feed, DEX pool and validator — plus every other package this estate has deployed — are on the on-chain record."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Card>
            <h3 className="text-subhead font-semibold text-white">The two that matter</h3>
            <p className="mt-3 text-body text-px-muted">
              Everything else is derivable from these. Both open on a block explorer, and reading
              them depends on nothing of ours.
            </p>
            <div className="mt-5 flex flex-col items-start gap-2.5">
              <AddressChip id={pkg.id} label="package" href={explorerUrl(pkg)} />
              <AddressChip id={pool.id} label="pool" href={explorerUrl(pool)} />
            </div>
          </Card>

          <Card>
            <h3 className="text-subhead font-semibold text-white">The complete record</h3>
            <p className="mt-3 text-body text-px-muted">
              All {CHAIN_OBJECTS.length} vault objects, and all four deployed product lineages with
              the current holder of each upgrade capability, on one page — read from chain rather
              than transcribed from a specification.
            </p>
            <div className="mt-6">
              <Button href="/chain" variant="secondary" className="px-5">
                Open the on-chain record
              </Button>
            </div>
          </Card>
        </div>

        <Callout
          className="mt-10"
          title="Permissionless by construction"
          actions={
            <>
              <Button href="/chain" variant="primary" className="px-5">
                <Book className="h-4 w-4" />
                Every deployed address
              </Button>
              <Button href="/verification" variant="secondary">
                Verify your own package
              </Button>
            </>
          }
        >
          No API keys, no allowlist, no partnership call. The pool is a shared object and
          your integration needs nobody&rsquo;s approval — and the same five gates we run on our
          own contracts will run on yours.
        </Callout>
      </Section>
    </>
  );
}
