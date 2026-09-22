// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { StreamBackdrop } from '@/components/ui/Backdrop';
import { formatBps, formatSui, formatUsdc } from '@/lib/format';
import type { ProtocolSnapshot } from '@/lib/types';

export function Revenue({ snapshot }: { snapshot: ProtocolSnapshot }) {
  const { config } = snapshot.pool;
  const { treasury } = snapshot;

  return (
    <Section tone="panel" className="relative">
      <StreamBackdrop className="top-1/2 -translate-y-1/2" />

      <SectionHeader
        eyebrow="Revenue"
        title="Two fees, both disclosed, neither able to touch your deposit"
        lead="The protocol takes a share of the yield it produces and a spread on the conversion that pays the prize. That is the whole model — there is no third stream, and no fee on principal at any point."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <StreamCard
          tag="Stream A"
          tone="accent"
          rate={formatBps(config.stakingFeeBps)}
          title="Staking fee"
          body="A share of the gross staking yield the pool harvests each epoch, taken in SUI before the remainder becomes the prize."
          lifetimeLabel="Lifetime, in SUI"
          lifetime={`${formatSui(treasury.streamA.lifetimeMist, 4)} SUI`}
        />
        <StreamCard
          tag="Stream B"
          tone="prize"
          rate={formatBps(config.spreadBps)}
          title="Conversion spread"
          body="A spread on the SUI → USDC conversion performed at settlement, taken from the converted prize rather than from the pool."
          lifetimeLabel="Lifetime, in USDC"
          lifetime={`${formatUsdc(treasury.streamB.lifetimeBaseUnits, 4)} USDC`}
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Fact
          label="Early exit fee"
          value={formatBps(config.earlyExitFeeBps)}
          body="Charged on your pro-rata share of the accrued prize pot when you leave mid-epoch — never on your principal, which returns in full."
        />
        <Fact
          label="Max slippage"
          value={formatBps(config.maxSlippageBps)}
          body="A settlement swap that would exceed this bound reverts. The prize rolls into the next epoch rather than being sold badly."
        />
        <Fact
          label="Fee on principal"
          value="0%"
          body="There is no deposit fee, no management fee and no withdrawal fee on principal. The number is zero because the code has no place to put one."
        />
      </div>

      <Callout
        className="mt-10"
        title="Every fee comes out of yield, never principal"
        actions={
          <Button href="/protocol" variant="primary" className="px-5">
            Where the fees go
          </Button>
        }
      >
        Sponsorships of the prize pot are not revenue either — they go straight to a
        depositor.
      </Callout>
    </Section>
  );
}

function StreamCard({
  tag,
  tone,
  rate,
  title,
  body,
  lifetimeLabel,
  lifetime,
}: {
  tag: string;
  tone: 'accent' | 'prize';
  rate: string;
  title: string;
  body: string;
  lifetimeLabel: string;
  lifetime: string;
}) {
  const accent = tone === 'prize' ? 'text-px-prize' : 'text-px-accent-200';
  const border = tone === 'prize' ? 'border-px-prize/30' : 'border-px-accent/30';

  return (
    <div className={`panel flex flex-col gap-4 border p-7 ${border}`}>
      <div className="flex items-center gap-3">
        <span className="label">{tag}</span>
        <span className={`ml-auto font-mono text-heading font-semibold ${accent}`}>{rate}</span>
      </div>
      <h3 className="text-subhead font-semibold text-white">{title}</h3>
      <p className="text-body text-px-muted">{body}</p>
      <div className="mt-auto flex items-baseline gap-2 border-t border-white/[0.06] pt-4">
        <span className="label">{lifetimeLabel}</span>
        <span className={`ml-auto font-mono text-meta ${accent}`}>{lifetime}</span>
      </div>
    </div>
  );
}

function Fact({ label, value, body }: { label: string; value: string; body: string }) {
  return (
    <div className="panel flex flex-col gap-2 p-6">
      <span className="label">{label}</span>
      <span className="font-mono text-heading font-semibold text-white">{value}</span>
      <p className="text-body text-px-muted">{body}</p>
    </div>
  );
}
