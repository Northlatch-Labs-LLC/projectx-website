
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { InterfacesArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';
import { StackStrip } from '@/components/ui/StackStrip';
import { ArrowUpRight, Wallet, Code, ShieldCheck, Sparkle, Trophy, Link2 as LinkIcon } from '@/components/ui/Icons';
import { DAPP_URL, LAUNCHER_URL, NAMES_URL, RAFFLE_URL, SOCIAL_URL } from '@/lib/links';
import { CHAIN_OBJECTS, explorerUrl } from '@/lib/chain';
import { AddressChip } from '@/components/ui/AddressChip';

export const metadata: Metadata = {
  title: 'Interfaces',
  description:
    'Every way to use ProjectX. The vault we run is one of them — anyone can build another, with no permission and no revenue share.',
};

export default function InterfacesPage() {
  const pkg = CHAIN_OBJECTS.find((object) => object.label === 'Package')!;
  const pool = CHAIN_OBJECTS.find((object) => object.label === 'Pool')!;

  const guarantees = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: 'No privileged interface',
      body: 'Ours has no special access. It calls the same public functions yours would.',
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: 'No permission needed',
      body: 'No allowlist, no registration, no partnership call. Publish and go.',
    },
    {
      icon: <Sparkle className="h-5 w-5" />,
      title: 'No revenue share',
      body: 'We take nothing from what you build. The protocol fee is the protocol fee.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Interfaces"
        title="One pool. As many front doors as people care to build."
        lead="ProjectX is infrastructure, not an app. The vault we operate is the first way in — by design, not the only one."
        proof="The pool is a shared object on Sui. Any interface reaching it calls the same public entry points, with the same permissions, as ours."
        art={<InterfacesArt className="w-full" />}
      />

      <Section>
        <SectionHeader
          eyebrow="Available now"
          title="Ways to use ProjectX"
          lead="The reference vault is live on mainnet today, and the door is open for the next one."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="panel panel-hover flex flex-col gap-4 p-7">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-cyan/20 to-px-cyan/5 text-px-cyan">
                <Sparkle className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-semibold text-white">ProjectX Social</h3>
                  <Badge tone="prize">Live</Badge>
                </div>
                <span className="text-xs text-px-faint">By ProjectX</span>
              </div>
            </div>

            <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
              Support a creator without spending anything: park SUI in their vault, the staking
              yield goes to them, and your deposit stays withdrawable in full — the contract
              permits nothing else. Memberships and paid posts settle on chain too.
            </p>

            <ul className="flex flex-wrap gap-2">
              {['Park & withdraw', 'Yield to creator', 'On-chain paywall', 'No lock-up'].map(
                (tag) => (
                  <li
                    key={tag}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-px-muted"
                  >
                    {tag}
                  </li>
                ),
              )}
            </ul>

            <p className="text-[0.875rem] leading-[1.6] text-px-faint">
              Live on Sui mainnet. Each creator has a vault on chain; what a creator is owed is
              held by a contract, not by the platform. Explained in full on{' '}
              <Link href="/social" className="underline decoration-white/20 underline-offset-4 hover:text-px-muted">
                /social
              </Link>
              .
            </p>

            <a
              href={SOCIAL_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-auto w-fit px-5"
            >
              Open Social
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="panel panel-hover flex flex-col gap-4 p-7">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
                <Wallet className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-semibold text-white">ProjectX Vault</h3>
                  <Badge tone="prize">Reference</Badge>
                </div>
                <span className="text-xs text-px-faint">By ProjectX</span>
              </div>
            </div>

            <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
              Deposit, withdraw, watch the draw and see your position. Sponsored gas, so a
              first deposit needs no SUI for fees.
            </p>

            <ul className="flex flex-wrap gap-2">
              {['Deposit', 'Withdraw', 'Live epoch', 'Winners', 'Free entry'].map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-px-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {DAPP_URL ? (
              <a
                href={DAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-auto w-fit px-5"
              >
                Open the Vault
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <p className="mt-auto text-[0.8125rem] leading-[1.55] text-px-faint">
                The vault contract is live on Sui mainnet. No interface serves it at present.
              </p>
            )}
          </div>

          <div className="panel panel-hover flex flex-col gap-4 p-7">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-gold/20 to-px-gold/5 text-px-gold">
                <Trophy className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-semibold text-white">ProjectX Raffle</h3>
                  <Badge tone="gold">Live</Badge>
                </div>
                <span className="text-xs text-px-faint">By ProjectX</span>
              </div>
            </div>

            <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
              Prize competitions whose draw runs on chain. The entrant list is sealed when sales
              close, and the winning number comes from Sui&rsquo;s own randomness — it does not
              exist until the draw transaction runs, so nobody can know it or steer it beforehand.
            </p>

            <ul className="flex flex-wrap gap-2">
              {['Sealed entries', 'On-chain draw', 'Free entry route', 'Anyone can trigger'].map(
                (tag) => (
                  <li
                    key={tag}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-px-muted"
                  >
                    {tag}
                  </li>
                ),
              )}
            </ul>

            <p className="text-[0.875rem] leading-[1.6] text-px-faint">
              Live on Sui mainnet. ProjectX provides the draw software — the promoter holds the
              prize and runs the competition in their own name.
            </p>

            <a
              href={RAFFLE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-auto w-fit px-5"
            >
              Open the Raffle
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="panel panel-hover flex flex-col gap-4 p-7">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-prize/20 to-px-prize/5 text-px-prize">
                <LinkIcon className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-semibold text-white">ProjectX Names</h3>
                  <Badge tone="gold">Live</Badge>
                </div>
                <span className="text-xs text-px-faint">By ProjectX</span>
              </div>
            </div>

            <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
              Register a <code>.sui</code> name in one transaction. The name is issued by SuiNS
              itself, so it resolves in every wallet and explorer that supports Sui names, and it
              arrives as an NFT in your own wallet &mdash; we never take custody of it.
            </p>

            <ul className="flex flex-wrap gap-2">
              {['Apex .sui name', 'Held in your wallet', 'One signature', 'Transferable'].map(
                (tag) => (
                  <li
                    key={tag}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-px-muted"
                  >
                    {tag}
                  </li>
                ),
              )}
            </ul>

            <p className="text-[0.875rem] leading-[1.6] text-px-faint">
              Live on Sui mainnet. SuiNS&rsquo;s registration fee plus a ProjectX service fee for the
              interface &mdash; registering directly at suins.io is always available and costs less.
            </p>

            <a
              href={NAMES_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-auto w-fit px-5"
            >
              Register a name
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {LAUNCHER_URL && (
            <div className="panel panel-hover flex flex-col gap-4 p-7">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
                  <Sparkle className="h-6 w-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-semibold text-white">Token Launcher</h3>
                    <Badge tone="accent">Testnet</Badge>
                  </div>
                  <span className="text-xs text-px-faint">By ProjectX</span>
                </div>
              </div>

              <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
                Publish a fixed-supply Sui coin from your own wallet. The bytecode is built in
                your browser from an open template — we never hold your token and never sign
                anything. Supply and metadata are frozen at launch and cannot be changed after.
              </p>

              <ul className="flex flex-wrap gap-2">
                {['Fixed supply', 'Frozen metadata', 'Non-custodial', 'Two transactions'].map(
                  (tag) => (
                    <li
                      key={tag}
                      className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-px-muted"
                    >
                      {tag}
                    </li>
                  ),
                )}
              </ul>

              <p className="text-[0.875rem] leading-[1.6] text-px-faint">
                Live on Sui testnet. Not yet deployed to mainnet.
              </p>

              <a
                href={LAUNCHER_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-auto w-fit px-5"
              >
                Open the Launcher
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}

          <div className="panel flex flex-col items-start gap-4 border-dashed p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] text-px-faint">
              <Code className="h-6 w-6" />
            </span>
            <h3 className="text-xl font-semibold text-white">Your interface here</h3>
            <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
              The pool is permissionless and the integration surface is complete. Ship an
              interface and it is listed here, under your name, with the same billing as ours.
            </p>
            <p className="text-[0.875rem] leading-[1.6] text-px-faint">
              A read API, a full event stream and every deployed address are documented and
              ready to build against today.
            </p>
            <Button href="/builders" variant="secondary" className="mt-auto px-5">
              Start building
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="Why it matters"
          title="A protocol with one front door is a company"
          lead="If the only way to reach your money is a website we operate, then our hosting bill is your withdrawal risk. More interfaces is not a growth tactic — it is the failure mode being removed."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {guarantees.map((item) => (
            <Card key={item.title}>
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-prize/20 to-px-prize/5 text-px-prize">
                {item.icon}
              </span>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2.5 text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <h3 className="text-base font-semibold text-white">
            What happens if we disappear tomorrow
          </h3>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            The pool keeps working. It is a shared object on Sui with public entry points, and
            withdrawals have no dependency on our daemon, our API or this website. Anyone can
            call the contract directly from a terminal — and the addresses to do it with are
            published below and on the{' '}
            <Link href="/builders" className="text-px-accent underline underline-offset-4">
              builders page
            </Link>
            . Settlement would pause until someone cranked it; deposits would not be trapped.
          </p>
        </Card>
      </Section>

      <Section id="build">
        <SectionHeader
          eyebrow="Build one"
          title="What you need, in one place"
          lead="A read API for the numbers, on-chain events if you would rather not trust ours, and the addresses to call."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Card>
            <h3 className="text-base font-semibold text-white">Start here</h3>
            <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5 text-[1rem] leading-[1.65] text-px-muted">
              <li>
                Read the{' '}
                <Link href="/protocol" className="text-px-accent underline underline-offset-4">
                  mechanism
                </Link>{' '}
                so your interface explains the same thing ours does.
              </li>
              <li>
                Take the endpoints and events from the{' '}
                <Link href="/builders" className="text-px-accent underline underline-offset-4">
                  builders page
                </Link>
                .
              </li>
              <li>Point a Sui wallet SDK at the package below and call it directly.</li>
              <li>Ship it. Then tell us, and it appears on this page.</li>
            </ol>
          </Card>

          <Card>
            <h3 className="text-base font-semibold text-white">The two addresses that matter</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              Everything else is derivable from these. Calls need the prize coin as a type
              argument — omitting it is the most common reason a correct-looking call fails.
            </p>
            <div className="mt-5 flex flex-col items-start gap-2.5">
              <AddressChip id={pkg.id} label="package" href={explorerUrl(pkg)} />
              <AddressChip id={pool.id} label="pool" href={explorerUrl(pool)} />
            </div>
          </Card>
        </div>

        <StackStrip className="mt-14" showRoadmap={false} />

        <Callout
          className="mt-12"
          title="Ship it and we will list it"
          actions={
            <>
              <Button href="/builders" variant="primary" className="px-5">
                Developer docs
              </Button>
              <Button href="/community" variant="secondary">
                Tell us what you built
              </Button>
            </>
          }
        >
          Every interface on the pool gets the same billing as ours — no permission, no
          revenue share, no deal to sign.
        </Callout>
      </Section>
    </>
  );
}
