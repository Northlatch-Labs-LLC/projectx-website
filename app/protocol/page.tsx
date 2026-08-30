// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import Link from 'next/link';
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
import { Warning } from '@/components/ui/Icons';
import { formatBps, formatDuration, formatSui } from '@/lib/format';
import { LADDER_DEPTH } from '@/lib/derive';
import { SNAPSHOT } from '@/lib/snapshot';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'The prize vault contract in full: the stake ladder, the weighted draw, the oracle-bounded conversion, the four phases of an epoch, and the type-system properties that bound all of it. Live on Sui mainnet; no interface serves it at present.',
};

/**
 * The record of the prize-vault contract: parameters, phases, diagrams, bounds and caveats, all
 * read from the same modules that feed /chain and /ctf.
 *
 * IT MUST NEVER SAY THE VAULT IS DEAD. It is not. The contract is live on Sui mainnet, its
 * objects are listed on /chain, and `sponsor_prize` is still a public entry function. What was
 * retired on 25 August 2026 is the interface. It is real and it is unreachable, and those are
 * different sentences.
 *
 * This page describes a contract; it must not address a depositor in the second person, because
 * there is no interface through which a reader can act on it.
 */
export default function ProtocolPage() {
  const { config } = SNAPSHOT.pool;

  /* Compile-time properties of the vault package, stated beside the mechanism they bound.
     Rendered only here; /security links across rather than duplicating them. */
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

  /* Out-of-scope items that are facts about this contract's settlement path. Rendered only
     here, for the same reason as `defences` above. */
  const bounds = [
    {
      title: 'Oracle validation',
      body: 'Settlement bounds every conversion with a Switchboard aggregator, validated hard: a non-positive price, a zero mean, a sample older than the freshness window, responder dispersion or a value outside the permitted band each abort the settlement outright. Multi-feed redundancy is on the roadmap.',
    },
    {
      title: 'Third-party liveness',
      body: 'Settlement needs an oracle gateway and a DEX pool to be reachable. When they are not, the epoch does not settle and the pot rolls forward. That is the designed outcome and it costs liveness, not principal.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Prize Vault · the mechanism"
        title="How the prize vault works, in full"
        lead={`Principal is delegated to a validator and returned 1:1. The yield that principal earns is pooled, and each epoch the whole pot goes to one depositor instead of a fraction of it to everyone. That is the design; in Alpha the harvester has not yet covered a prize, and sponsors funded every draw settled so far.`}
        proof="This page is a record of a deployed contract, not an offer. It is also the technical appendix to the capture-the-flag range, which runs against the retired v1.0 of the package described here."
        art={<ProtocolArt className="w-full" />}
      >
        <Badge tone="neutral">Sui mainnet</Badge>
        <Badge tone="gold">No interface serves it</Badge>
      </PageHeader>

      {/* The status statement, first thing, before any mechanism — a reader arriving from an old
          link must know where they stand before three screens about a deposit flow. It states two
          facts: the contract is live, and no interface serves it. Neither half may be dropped. */}
      <Section>
        <Card className="border-px-gold/40">
          <div className="flex gap-4">
            <Warning className="mt-0.5 h-6 w-6 shrink-0 text-px-gold" />
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-white">Where this stands today</h2>
              <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
                The vault&rsquo;s contract is live on Sui mainnet and everything on this page
                describes it accurately. Its interface was retired on 25 August 2026, so there is
                nothing here to deposit into today. The package, the pool, the treasury and every
                other object are listed with their identifiers on{' '}
                <Link href="/chain" className="text-px-accent underline underline-offset-4">
                  the on-chain record
                </Link>
                , and can be read on a block explorer without our permission or our participation.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-px-text">
                Where the vault is still an active subject on this hub is{' '}
                <Link href="/ctf" className="text-px-accent underline underline-offset-4">
                  the capture-the-flag range
                </Link>
                : eight challenges built from real findings in v1.0, each fixed in v1.0.1, run
                against the retired deployment. This page is the appendix a player reads first.
              </p>
            </div>
          </div>
        </Card>
      </Section>

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
                buffer pulls from the ladder head immediately and regardless of maturity — a
                depositor&rsquo;s right to leave outranks the pool&rsquo;s yield, every time, by
                design.
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
          title="Weight is share"
          lead="Selection is weighted in proportion to stake. Twice the principal is twice the weight — never a guarantee, and never at anyone else's expense."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <DrawDiagram />
          <div className="flex flex-col gap-5">
            <Card>
              <h3 className="text-base font-semibold text-white">Losing costs nothing</h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
                A depositor who is not drawn holds exactly what they held before: the same
                principal, withdrawable on demand, entered in the next epoch. The only thing
                forgone is the staking yield that deposit would have earned on its own — which is
                what the prize is designed to come from.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-white">
                The receipt cannot be taken from its holder
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
                A deposit receipt is a Move object with{' '}
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

      {/* Compile-time properties of this package. Rendered here and not on /security — one
          source, one render. */}
      <Section tone="panel">
        <SectionHeader
          eyebrow="Defences"
          title="Six properties, each enforced by structure rather than policy"
          lead="A protective measure that depends on an operator behaving correctly is a promise. These are not that — each one is a consequence of how the Move package is typed, and the compiler is what enforces it."
          proof="Relocated from the security page on 30 August 2026, unchanged. They are properties of this contract rather than of the company that wrote it, and they belong beside the mechanism they bound."
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

      <Section>
        <SectionHeader
          eyebrow="Where it stops"
          title="What the contract does not control"
          lead="The guarantees above end at the package boundary. Two things outside it can stop an epoch settling, and neither of them can reach principal."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {bounds.map((item) => (
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
          <h3 className="text-base font-semibold text-white">Monitoring what silence hides</h3>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            A protocol can fail by doing nothing, and a dashboard showing green is not evidence
            that anything happened. The pool counts consecutive zero-yield harvests and the Sui
            epochs elapsed since yield was last realised, and reports the state as anomalous once
            it crosses a threshold — emitted on chain, where it cannot be quietly ignored.
          </p>
        </Card>
      </Section>

      <Section tone="edge">
        <Callout
          title="Every claim here resolves to an object on Sui"
          actions={
            <>
              <Button href="/ctf" variant="primary" className="px-5">
                Attack the retired version
              </Button>
              <Button href="/chain" variant="secondary">
                The on-chain record
              </Button>
            </>
          }
        >
          Open the package, the pool, the treasury or the price feed on a block explorer and
          read the same state this page describes. Nothing about doing that depends on us.
        </Callout>
      </Section>
    </>
  );
}
