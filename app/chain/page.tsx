// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { BuildersArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AddressChip } from '@/components/ui/AddressChip';
import { AddressTable } from '@/components/live/AddressTable';
import { NETWORK, EXPLORER, PRIZE_COIN, CHAIN_OBJECTS } from '@/lib/chain';
import {
  SECURITY_PACKAGES,
  SECURITY_READ_AT,
  SECURITY_NETWORK,
} from '@/lib/security-chain-read';
import { TARGET, OUT_OF_SCOPE_LIVE_POOL, isCtfConfigured } from '@/lib/ctf';

export const metadata: Metadata = {
  title: 'On chain',
  description:
    'Every ProtocolX package and object on Sui mainnet, with the identifier and explorer link for each, and who holds upgrade authority over each.',
};

/**
 * The on-chain deployment record.
 *
 * This page renders material that `/builders#addresses` and `/security` also render, from the
 * same modules. Nothing was moved out of those pages; each still renders its own.
 *
 * INVARIANT: every identifier here comes from a module, never from prose typed into this file.
 * `chain.ts` is the deployment record, `security-chain-read.ts` is a dated chain read that
 * renders "not yet published" rather than a guess for anything it could not verify, and `ctf.ts`
 * carries the retired v1.0 range. If a value is wrong it is wrong in one place.
 */
export default function ChainPage() {
  const ctfPublished = isCtfConfigured();

  return (
    <>
      <PageHeader
        eyebrow="On chain"
        title="Everything we run, with the identifier to check it"
        lead="Four products, deployed on Sui mainnet. Every package, every shared object and every upgrade capability is listed below with its identifier and a link that opens it on a block explorer."
        proof="Nothing on this page asks you to take our word for it. That is the entire point of publishing it — an identifier you can open is an argument, and a claim you cannot check is not."
        art={<BuildersArt className="w-full" />}
      >
        <Badge tone="neutral">{NETWORK}</Badge>
        <Badge tone="accent">Read from chain {SECURITY_READ_AT}</Badge>
      </PageHeader>

      <Section>
        <SectionHeader
          eyebrow="What is deployed"
          title="Four products, one network"
          lead="Weir, Names, Draws and the Prize Vault are each a published Move package on Sui mainnet with its own lineage. The table below is a recorded chain read, not a specification: where a value could not be verified it says so rather than guessing."
          proof={`Read from ${SECURITY_NETWORK} on ${SECURITY_READ_AT} by resolving each lineage's UpgradeCap — its version, its latest package and its current owner.`}
        />

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full min-w-[46rem] border-collapse text-left text-[0.875rem]">
            <caption className="sr-only">
              ProtocolX packages deployed on {SECURITY_NETWORK}, with package identifier, upgrade
              count and the current holder of each upgrade capability.
            </caption>
            <thead>
              <tr className="border-b border-white/[0.1] bg-white/[0.02] text-px-faint">
                <th scope="col" className="p-4 font-medium">Product</th>
                <th scope="col" className="p-4 font-medium">Package ID</th>
                <th scope="col" className="p-4 font-medium">Upgrades</th>
                <th scope="col" className="p-4 font-medium">UpgradeCap holder</th>
              </tr>
            </thead>
            <tbody>
              {SECURITY_PACKAGES.map((row) => (
                <tr key={row.product} className="border-b border-white/[0.06] align-top last:border-0">
                  <th scope="row" className="p-4 text-left font-medium text-white">
                    {row.product}
                    <span className="mt-1 block text-[0.6875rem] font-normal uppercase tracking-wide text-px-faint">
                      {row.source === 'chain' ? `read from chain · ${SECURITY_READ_AT}` : 'from spec · not re-read'}
                    </span>
                  </th>
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
                  <td className="p-4 font-mono tabular-nums text-px-muted">
                    {row.version ?? 'not yet published'}
                  </td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="mt-6 border-px-gold/30">
          <h2 className="text-base font-semibold text-white">
            Why the upgrade column is the one to read first
          </h2>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            On Sui the holder of a package&rsquo;s UpgradeCap can publish a new version of it. An
            upgrade cannot change the types of existing objects or remove public functions, but it
            can add functions and change the behaviour of existing non-public logic. That makes the
            holder the largest trust assumption in any Sui system, which is why it is published
            here rather than described. Every upgrade is itself a public transaction.{' '}
            <Link href="/security" className="text-px-accent underline underline-offset-4">
              What that authority can and cannot do
            </Link>
            .
          </p>
        </Card>
      </Section>

      <Section id="objects" tone="panel">
        <SectionHeader
          eyebrow="Prize Vault"
          title="The objects the pool is made of"
          lead="The vault's contract is live on Sui mainnet and no interface serves it at present — which changes nothing about what is on chain. Package, pool, treasury, DEX adapter, price feed, liquidity pool and validator, each resolvable below."
          proof="These seven identifiers are the deployment record in lib/chain.ts. Every figure this website has ever displayed about the pool was read from them."
        />
        <div className="mt-10">
          <AddressTable />
        </div>

        <Card className="mt-6">
          <h3 className="text-base font-semibold text-white">Calling it needs the coin type</h3>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            The pool is generic over the coin it pays in. Every call must supply that coin as a
            type argument — omitting it is the single most common reason a correct-looking
            transaction fails to resolve.
          </p>
          <code className="mt-4 block overflow-x-auto rounded-lg border border-white/[0.08] bg-black/40 p-3 font-mono text-[0.8125rem] leading-relaxed text-px-muted">
            --type-args {PRIZE_COIN.type}
          </code>
          <p className="mt-4 text-[0.875rem] leading-[1.6] text-px-faint">
            {PRIZE_COIN.symbol} at {PRIZE_COIN.decimals} decimals. Amounts everywhere on this
            estate are base-unit strings — convert with a big-integer type, never a float.
          </p>
        </Card>
      </Section>

      <Section id="retired">
        <SectionHeader
          eyebrow="Retired, and still standing"
          title="The deployments we did not take down"
          lead="A retired deployment is not a deleted one. Both of these are still on chain, still readable, and listed here so that nobody has to guess which pool a given identifier belongs to."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Card>
            <span className="label">Retired · in situ</span>
            <h3 className="mt-3 text-lg font-semibold text-white">{TARGET.label}</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              The v1.0 deployment, taken out of service when v1.0.1 shipped. Its balances were
              migrated at that point, so it holds no depositor funds — which is exactly why it was
              left standing. It is the range the capture-the-flag board runs against.
            </p>
            {ctfPublished ? (
              <div className="mt-5 flex flex-col items-start gap-2.5">
                <AddressChip
                  id={TARGET.packageId}
                  label="package"
                  href={`${TARGET.explorerBaseUrl}/object/${TARGET.packageId}`}
                />
                <AddressChip
                  id={TARGET.poolId}
                  label="pool"
                  href={`${TARGET.explorerBaseUrl}/object/${TARGET.poolId}`}
                />
              </div>
            ) : (
              <p className="mt-5 rounded-2xl border border-dashed border-px-gold/30 bg-px-gold/[0.04] p-4 text-[1rem] leading-[1.65] text-px-muted">
                <span className="font-semibold text-px-gold">Being finalised.</span> The retired
                deployment&rsquo;s identifiers are not published yet. They will be listed here, and
                on the capture-the-flag board, once they are.
              </p>
            )}
            <div className="mt-6">
              <Button href="/ctf" variant="secondary">
                What runs against it
              </Button>
            </div>
          </Card>

          <Card className="border-px-danger/30">
            <span className="label text-px-danger">Live · never a target</span>
            <h3 className="mt-3 text-lg font-semibold text-white">The v1.0.1 pool</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              The current pool holds real deposits. It is out of scope for the capture-the-flag
              board and always will be. Anything found here is a real vulnerability and is worth
              more as a private report than as a flag —{' '}
              <Link href="/security" className="text-px-accent underline underline-offset-4">
                the disclosure route
              </Link>{' '}
              is on the security page.
            </p>
            <div className="mt-5">
              <AddressChip
                id={OUT_OF_SCOPE_LIVE_POOL}
                label="live pool"
                href={`${EXPLORER}/object/${OUT_OF_SCOPE_LIVE_POOL}`}
                className="w-fit"
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section tone="edge">
        <SectionHeader
          eyebrow="Check it"
          title="Open any one of them"
          lead={`Every identifier on this page links to ${EXPLORER.replace('https://', '')}. Nothing about reading them depends on this website being up, on our API answering, or on us existing.`}
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/verification" variant="primary" className="px-5">
            How we measure our own code
          </Button>
          <Button href="/builders" variant="secondary">
            Index it yourself
          </Button>
        </div>
        <p className="mt-8 text-center text-[0.875rem] leading-[1.6] text-px-faint">
          {CHAIN_OBJECTS.length} vault objects and {SECURITY_PACKAGES.length} product lineages
          listed above, all on {NETWORK}.
        </p>
      </Section>
    </>
  );
}
