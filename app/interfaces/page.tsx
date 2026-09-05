// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
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
    'Every way to use ProtocolX, and the state each door is in. The vault has no interface today.',
  // A dedicated card rather than the site-wide generated one.
  //
  // It prints projectxprotocol.dev and nothing else, even though this page routes to protocolx.io
  // and weir.social. A card is the face of the page it sits on, not of the destinations that page
  // links to; a reader who sees one domain in the unfurl and lands on another has been misled by
  // the preview, however accurate each half was on its own.
  //
  // The state chips must say what the panels below say: Weir and Names are live on mainnet with
  // their door in closed alpha, and the vault's contract is live with no interface serving it
  // since 25 August 2026. A card has room for one state, so the chips name the door — the fact a
  // reader acts on. This asset is static, so a chip that overstates a product's availability
  // cannot be corrected by a later render.
  //
  // The token launcher is absent for the same reason it is absent from the page: its panel
  // renders only when LAUNCHER_URL is set, and that variable is fail-closed until a subdomain
  // resolves.
  openGraph: {
    images: [
      {
        url: '/og/interfaces.png',
        width: 1200,
        height: 630,
        alt: 'Every way to use ProjectX — Weir (closed alpha), ProjectX Draws (live on mainnet), ProjectX Names (closed alpha), ProjectX Vault (contract live, no interface)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/interfaces.png'],
  },
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
        title="Every way to use ProtocolX, and the state each door is in"
        lead="Four contracts live on Sui mainnet, and they are not equally open. Two sit behind invitation codes, one is open to anyone, and one has no interface serving it. This page says which is which before you click."
        proof="Nothing here is a privileged surface. Every interface on the pool calls the same public entry points, with the same permissions, as ours would."
        art={<InterfacesArt className="w-full" />}
      />

      <Section>
        <SectionHeader
          eyebrow="Ways in"
          title="Four surfaces, and they are not in the same state"
          lead={
            DAPP_URL
              ? 'Four contracts live on Sui mainnet. The draws and the vault are open to anyone; Weir and Names sit behind invitation codes while the alpha is closed. Know which is which before you click.'
              : 'Four contracts live on Sui mainnet. The draws are open to anyone; Weir and Names sit behind invitation codes while the alpha is closed; the vault has no interface serving it and is documented rather than sold. Know which is which before you click.'
          }
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="panel panel-hover flex flex-col gap-4 p-7">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-cyan/20 to-px-cyan/5 text-px-cyan">
                <Sparkle className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-1">
                {/*
                  Two badges, because there are two facts and dropping either one misleads: the
                  contracts are live on Sui mainnet, and entry is invitation-only. "Live" alone
                  sends a reader to an unannounced waiting list; "Closed alpha" alone denies a
                  deployment that has taken real transactions.

                  Named Weir, not "ProjectX Social" — see SOCIAL_URL in lib/links.ts.
                */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-semibold text-white">Weir</h3>
                  <Badge tone="prize">Live</Badge>
                  <Badge tone="accent">Closed alpha</Badge>
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
              held by a contract, not by the platform. Entry is in closed alpha behind invitation
              codes, so this link opens the waiting list rather than the platform. Explained in
              full on{' '}
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
              Join the waiting list
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
                  {/* Two badges, same reasoning as Weir's: the contract is live and no
                      interface serves it. Dropping either half misleads. */}
                  <Badge tone="prize">Contract live</Badge>
                  <Badge tone="gold">No interface</Badge>
                </div>
                <span className="text-xs text-px-faint">By ProjectX</span>
              </div>
            </div>

            {/*
              NEVER WRITE THAT THIS CONTRACT IS DEAD. It is live on Sui mainnet; what was retired
              on 25 August 2026 is the interface serving it. This card must describe the contract
              and must not describe an action a reader can take, because the conditional below
              withholds the button and there is no door behind it.
            */}
            <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
              A prize pool on Sui mainnet: principal delegated to a validator and returned 1:1,
              with the staking yield it earns awarded to one depositor per epoch. The contract is
              live and its interface was retired on 25 August 2026, so there is no door here today.
            </p>

            <ul className="flex flex-wrap gap-2">
              {['Contract live', 'No interface', 'Mechanism published', 'CTF target'].map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-px-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <p className="text-[0.875rem] leading-[1.6] text-px-faint">
              Documented in full on{' '}
              <Link href="/protocol" className="underline decoration-white/20 underline-offset-4 hover:text-px-muted">
                /protocol
              </Link>
              , with every object listed on{' '}
              <Link href="/chain" className="underline decoration-white/20 underline-offset-4 hover:text-px-muted">
                /chain
              </Link>
              . The retired v1.0 deployment is the range the capture-the-flag board runs against.
            </p>

            {DAPP_URL ? (
              <a
                href={DAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-auto w-fit px-5"
              >
                Open the vault
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <Button href="/ctf" variant="secondary" className="mt-auto w-fit px-5">
                Attack the retired version
              </Button>
            )}
          </div>

          <div className="panel panel-hover flex flex-col gap-4 p-7">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-gold/20 to-px-gold/5 text-px-gold">
                <Trophy className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-semibold text-white">ProjectX Draws</h3>
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
              Live on Sui mainnet; one proving draw has settled, and no competition is open today.
              ProjectX provides the draw software — the promoter holds the prize and runs the
              competition in their own name.
            </p>

            <a
              href={RAFFLE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-auto w-fit px-5"
            >
              Open the draws
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="panel panel-hover flex flex-col gap-4 p-7">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-prize/20 to-px-prize/5 text-px-prize">
                <LinkIcon className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-1">
                {/*
                  Same two facts as Weir: the registrar is live on mainnet, and its door is
                  Weir's door, which is invitation-only. NAMES_URL in lib/links.ts records
                  weir.social/names answering 307 to the waiting list while the alpha is closed.
                */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-semibold text-white">ProjectX Names</h3>
                  <Badge tone="gold">Live</Badge>
                  <Badge tone="accent">Closed alpha</Badge>
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
              The registrar moved into Weir, so this link opens the same waiting list; suins.io
              needs no invitation and is the way to register a name today.
            </p>

            <a
              href={NAMES_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-auto w-fit px-5"
            >
              Join the waiting list
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
                Open the launcher
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
              interface and tell us; we will list it here under your name. None has been built
              yet.
            </p>
            <p className="text-[0.875rem] leading-[1.6] text-px-faint">
              The on-chain events and every deployed address are documented. The HTTP read API is
              not served at present.
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
              Everything else is derivable from these, and all seven objects plus every other
              deployed package are on{' '}
              <Link href="/chain" className="text-px-accent underline underline-offset-4">
                the on-chain record
              </Link>
              . Calls need the prize coin as a type argument — omitting it is the most common
              reason a correct-looking call fails.
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
