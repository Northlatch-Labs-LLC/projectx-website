// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProtocolArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';
import { StatTile } from '@/components/ui/StatTile';
import { StackStrip } from '@/components/ui/StackStrip';
import { PhaseFlow } from '@/components/protocol/PhaseFlow';
import { LadderDiagram } from '@/components/protocol/LadderDiagram';
import { DrawDiagram } from '@/components/protocol/DrawDiagram';
import { Mission } from '@/components/home/Mission';
import { formatBps, formatDuration, formatSui } from '@/lib/format';
import { LADDER_DEPTH } from '@/lib/derive';
import { SNAPSHOT } from '@/lib/snapshot';

import { DAPP_URL } from '@/lib/links';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'The mechanism in full: the stake ladder, the weighted draw, the oracle-bounded conversion, and the four phases each epoch walks through.',
};

/**
 * `Mission` is rendered here, not on the home page.
 *
 * It moved on 30 August 2026. It is the argument for prize-linked saving — why the mechanism
 * this page documents is worth having — and it ran on the home page directly beneath
 * `HowItWorks`, which is the mechanism itself. Two consecutive vault sections on the hub the
 * Master has ruled the verification hub, the second of them arguing for a product whose
 * interface was retired in August.
 *
 * The component is imported unchanged from components/home/ and its file was not touched. It
 * keeps that path because it is still the same section, and moving the file would make the
 * relocation look like a rewrite in every diff that follows. It renders last, after the
 * mechanism and the caveat, which is the order the argument reads best in: what it does, what
 * it costs you when it breaks, then why anyone wants it.
 *
 * This page is now async because Mission is — it reads the settled-draw count from getStats().
 */
export default async function ProtocolPage() {
  const { config } = SNAPSHOT.pool;

  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="A prize built from staking yield, on a deposit that never leaves your control"
        lead="Principal is delegated to a validator and returned 1:1. The yield that principal earns is pooled, and each epoch the whole pot goes to one depositor instead of a fraction of it to everyone. That is the design; in Alpha the harvester has not yet covered a prize, and sponsors have funded every draw settled so far."
        art={<ProtocolArt className="w-full" />}
      >
        <Badge tone="neutral">Sui mainnet</Badge>
      </PageHeader>

      <Section>
        <SectionHeader
          eyebrow="Parameters"
          title="The settings it runs on"
          lead="Four numbers decide how the pool behaves: how long an epoch lasts, the smallest deposit it accepts, how much it holds back unstaked, and how long a tranche must age before it is rotated."
          proof="Governance can adjust these within compiled ceilings. Any interface reads the current values live from the ProjectX API."
        />
        <div className="mt-10 grid gap-6 rounded-3xl border border-white/[0.06] bg-gradient-to-b from-px-elevated/60 to-px-panel/50 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Epoch length"
            value={formatDuration(config.epochDurationMs)}
            note="One prize per epoch"
          />
          <StatTile
            label="Minimum deposit"
            value={formatSui(config.minDepositMist, 2)}
            unit="SUI"
          />
          <StatTile
            label="Liquidity buffer"
            value={formatBps(config.liquidityBufferBps)}
            note="Held unstaked so ordinary withdrawals settle at once"
          />
          <StatTile
            label="Tranche maturity"
            value={formatDuration(config.maturityPeriodMs)}
            note="Before a tranche is rotated off the ladder"
          />
        </div>

        <StackStrip className="mt-14" showRoadmap={false} />
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="The epoch"
          title="Four phases, and the pool is only ever in one of them"
          lead="An epoch closes, a winner is drawn, a price is checked, the prize is converted and paid. Each transition is a separate on-chain transaction, so a failure in one stage cannot corrupt another."
        />
        <div className="mt-10">
          <PhaseFlow />
        </div>

        <Card className="mt-6">
          <h3 className="text-base font-semibold text-white">
            What happens if a phase cannot complete
          </h3>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            An epoch that closes with no yield, no depositors or no draw weight rolls over
            rather than aborting — the prize carries into the next epoch, and the pool stays
            in a phase the harvest can run from. If the conversion cannot be made within the
            slippage bound, or the price feed is stale, settlement does not happen this
            epoch. In none of these paths is principal touched.
          </p>
        </Card>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Where the yield comes from"
          title="A ladder, not a lump"
          lead={`Sui staking rewards accrue per epoch and are only realised when a stake is withdrawn. Staking everything as one position would mean unstaking everything to harvest — so the pool stakes in ${LADDER_DEPTH} tranches of staggered age.`}
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <LadderDiagram />
          <div className="flex flex-col gap-5">
            <Card>
              <h3 className="text-base font-semibold text-white">Withdrawals come first</h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
                A {formatBps(config.liquidityBufferBps)} buffer stays liquid, so an ordinary
                withdrawal never has to disturb the ladder. A withdrawal larger than the
                buffer pulls from the ladder head immediately and regardless of maturity —
                your right to leave outranks the pool&rsquo;s yield, every time, by design.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-white">
                Yield is real, and it takes time
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
                A tranche must sit for {formatDuration(config.maturityPeriodMs)} before it is
                rotated and its rewards realised. On a young pool, or one being actively tested with
                withdrawals, harvests can legitimately return zero for a while. The protocol
                tracks consecutive zero-yield harvests and flags the anomaly rather than
                quietly reporting health.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="The draw"
          title="Your weight is your share"
          lead="Selection is weighted in proportion to stake. Twice the principal is twice the weight — never a guarantee, and never at anyone else's expense."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <DrawDiagram />
          <div className="flex flex-col gap-5">
            <Card>
              <h3 className="text-base font-semibold text-white">Losing costs nothing</h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
                If you are not drawn, your position is exactly what it was: the same
                principal, withdrawable on demand, entered in the next epoch. The only thing
                you forgo is the staking yield you would have earned on your own deposit — which
                is what the prize is designed to come from.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-white">
                The receipt cannot be taken from you
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
                Your deposit receipt is a Move object with{' '}
                <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-[0.85em] text-px-accent-200">
                  key
                </code>{' '}
                and no{' '}
                <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-[0.85em] text-px-accent-200">
                  store
                </code>
                . No external transaction can transfer, sell, lend or wrap it — a whole class
                of drain exploits simply has no surface here.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Settlement"
          title="The prize is converted at a rate the contract checks first"
          lead="Winners are paid in USDC. Getting there means a price and a swap, and both are bounded before either runs."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card>
            <span className="label">Step one</span>
            <h3 className="mt-3 text-base font-semibold text-white">Read the oracle</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              A Switchboard on-demand aggregator is pulled and validated: positive mean,
              sample age inside the freshness window, dispersion within the permitted band.
              A reading that fails any check stops settlement.
            </p>
          </Card>
          <Card>
            <span className="label">Step two</span>
            <h3 className="mt-3 text-base font-semibold text-white">Bound the swap</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              The oracle price sets fair value; the contract will not accept an execution
              worse than {formatBps(config.maxSlippageBps)} from it. A DEX quote outside that
              bound reverts the settlement rather than selling the prize badly.
            </p>
          </Card>
          <Card>
            <span className="label">Step three</span>
            <h3 className="mt-3 text-base font-semibold text-white">Pay the winner</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              The converted USDC is paid to the drawn depositor, less the{' '}
              {formatBps(config.spreadBps)} conversion spread, and the settlement is emitted
              as an on-chain event with the realised rate and slippage.
            </p>
          </Card>
        </div>

        <Card className="mt-6 border-px-gold/30">
          <h3 className="text-base font-semibold text-white">The honest caveat</h3>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            Settlement depends on two external systems — one price feed and one DEX pool.
            There is no feed redundancy today; it is a known limitation and it is on the
            roadmap. The failure mode is a delayed prize, not a lost deposit: if either
            system is unavailable, the epoch does not settle and the pot rolls forward.
          </p>
        </Card>
      </Section>

      <Mission />

      <Section tone="edge">
        <Callout
          title="Every claim here resolves to an object on Sui"
          actions={
            <>
              {DAPP_URL && (
                <Button href={DAPP_URL} variant="primary" className="px-5">
                  Open the vault
                </Button>
              )}
              <Button href="/builders#addresses" variant="secondary">
                Deployed addresses
              </Button>
            </>
          }
        >
          Open the package, the pool, the treasury or the price feed on a block explorer and
          read the same state this page describes.
        </Callout>
      </Section>
    </>
  );
}
