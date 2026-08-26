
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { StackStrip } from '@/components/ui/StackStrip';
import { Callout } from '@/components/ui/Callout';
import { Wallet, Trophy, ShieldCheck } from '@/components/ui/Icons';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { getStats } from '@/lib/stats';
import Link from 'next/link';

const DISPLAY_FLOOR = { principalSui: 5_000, depositors: 250 };

export async function HowItWorks() {
  const STATS = await getStats();

  const figures = [
    { label: 'Lost to date', value: STATS.lossesEver, tone: 'prize' as const },
    { label: 'Won so far', value: STATS.paidToWinners, unit: 'USDC', tone: 'prize' as const },
    { label: 'Draws settled', value: String(STATS.draws) },
    ...(STATS.principalSui >= DISPLAY_FLOOR.principalSui
      ? [{ label: 'Protected', value: STATS.principal, unit: 'SUI' }]
      : []),
    ...(STATS.depositorCount >= DISPLAY_FLOOR.depositors
      ? [{ label: 'Savers', value: STATS.depositors }]
      : []),
  ];

  const steps = [
    {
      icon: <Wallet className="h-5 w-5" />,
      title: 'Put SUI in',
      body: 'Deposit from 1 SUI. Every coin stays yours, always.',
      proof: 'Your position is a Move object that no transaction on earth can transfer away from you.',
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: 'One saver wins',
      body: 'Every 24 hours the whole prize pot goes to one depositor.',
      proof: 'Drawn by Sui’s native randomness, with odds exactly proportional to your stake.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: 'Principal is never spent by the protocol',
      body: 'Withdraw any time, 1:1, subject to Sui’s staking epoch timing.',
      proof: 'The contract contains no mechanism to pause, delay or reduce a withdrawal.'
    },
  ];

  return (
    <Section tone="panel">
      {}
      <SectionHeader
        eyebrow="Vault · Sui mainnet"
        title="Your deposit is never the prize"
        lead="Deposit SUI and it earns staking yield. Rather than splitting that yield into pennies, the protocol awards the whole pot to one depositor every day. The deposit itself is never spent, and comes back in full whenever you ask."
      />

      <dl className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-7 border-y border-white/[0.07] py-8 sm:grid-cols-3">
        {figures.map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-1.5 text-center">
            <dt className="label">{f.label}</dt>
            <dd className="flex items-baseline gap-1">
              <AnimatedNumber
                value={f.value}
                className={`font-mono text-2xl font-semibold tabular-nums ${
                  f.tone === 'prize' ? 'text-px-prize' : 'text-white'
                }`}
              />
              {f.unit ? <span className="text-xs text-px-faint">{f.unit}</span> : null}
            </dd>
          </div>
        ))}
      </dl>

      {}
      <p className="mx-auto mt-5 max-w-2xl text-center text-[0.9375rem] leading-[1.6] text-px-faint">
        <span className="font-semibold text-px-gold">Alpha.</span> Yield has not yet covered a
        prize. Every draw settled so far was funded by a sponsor rather than by pooled yield.
        Funding a prize is permissionless, so the funding transaction for any epoch is on chain
        and you can check it yourself.{' '}
        <Link href="/sponsor" className="text-px-accent underline underline-offset-4">
          Boost the prize
        </Link>
        .
      </p>

      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 90}>
            <div className="panel panel-hover flex h-full flex-col items-center gap-4 p-7 text-center">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
                  {step.icon}
                </span>
                <span className="font-mono text-xs text-px-faint">0{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-[1.0625rem] leading-[1.65] text-px-muted">{step.body}</p>
              <p className="mt-auto w-full border-t border-white/[0.06] pt-4 text-[0.875rem] leading-[1.6] text-px-faint">
                {step.proof}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      <StackStrip className="mt-14" />

      <Callout
        className="mt-12"
        title="One protocol, many networks"
        actions={
          <>
            <Button href="/protocol" variant="primary" className="px-5">
              The whole mechanism
            </Button>
            <Button href="/builders" variant="secondary">
              Integrate it
            </Button>
          </>
        }
      >
        Move carries the pool, the stake ladder and the draw across every network it runs on
        without a rewrite. Each launch is an oracle and a settlement venue — named here the
        moment they are signed.
      </Callout>
    </Section>
  );
}
