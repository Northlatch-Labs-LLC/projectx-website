// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, Code, Sparkle, Trophy, Wallet } from '@/components/ui/Icons';
import { DAPP_URL, RAFFLE_URL, SOCIAL_URL } from '@/lib/links';

/**
 * The four products, then the invitation to build a fifth.
 *
 * Weir takes the full-width card above the grid and the remaining four keep their 2×2. That is a
 * layout weighting only — no card in this section may badge or word itself as primary.
 *
 * Do not retitle this section "One pool, many front doors". Names and Draws are not interfaces
 * onto the prize vault — Draws is its own contract with its own treasury, and the registrar is a
 * separate business selling SuiNS names.
 *
 * Each card keeps the one sentence that says what its contract guarantees. The full engineering
 * account belongs on /protocol, /security and /builders, not here.
 */
const LIVE = [
  {
    title: 'ProjectX Vault',
    // "Reference" implied a surface to refer to. Every other badge in this grid states the state
    // of the DOOR — Live, Closed alpha — so this one does too, and the blurb's first clause
    // carries the other half: the contract is live. /interfaces has room for two badges and shows
    // both; a single slot has to pick the fact a visitor acts on.
    badge: 'No interface',
    tone: 'prize' as const,
    Icon: Wallet,
    accent: 'from-px-accent/20 to-px-accent/5 text-px-accent',
    // The blurb is written in the present tense of the CONTRACT, not of a door.
    //
    // It used to open "Save your SUI" and close "you can take it back whenever you like" — a
    // two-step instruction to a visitor, beside a button `DAPP_URL` had already suppressed and
    // above a line admitting no interface serves it. The card withheld the control and kept
    // giving the instruction. This is the same pattern lib/links.ts describes for links: never
    // advertise a thing that does not answer. Prose is advertising too.
    //
    // Nothing is retired here. Every guarantee the old blurb made is still made; it is stated as
    // a property of a contract on mainnet rather than as a step the reader can take today. Put
    // the instruction back the moment NEXT_PUBLIC_DAPP_URL is set again.
    // Rewritten 30 August 2026 in the hub sweep. The previous blurb still opened by describing
    // what a depositor gets — "the whole day's staking yield goes to one depositor", "a withdrawal
    // returns it 1:1" — which is an offer, on the front door, for the one product with no way in.
    // The note underneath already admitted as much, so the card argued with itself.
    //
    // It reads as a record now: what the contract is, that it is live, and where it is still a
    // live subject on this hub. Nothing is retired and nothing says the vault is dead — the
    // guarantee is still stated, on /protocol, which is where a reader who wants it now goes.
    blurb:
      'A prize pool on Sui mainnet: principal delegated to a validator and returned 1:1, with the staking yield awarded to one depositor per epoch. Documented in full rather than sold — its interface was retired on 25 August 2026.',
    note: 'Where it is still an active subject here is the capture-the-flag range, which runs against the retired v1.0 deployment.',
    legal:
      'Software developed and licensed by Northlatch Labs LLC. Interface operator not designated. When an interface serves it again, this card is where it will be linked.',
    cta: 'Open the vault',
    href: DAPP_URL,
    // Where the card points while DAPP_URL is null. Without this the card rendered its note and
    // no control at all, which on a grid of four is read as a broken tile rather than as a
    // deliberate absence.
    fallback: { label: 'Attack the retired version', href: '/ctf' },
  },
  {
    title: 'ProjectX Draws',
    badge: 'Live',
    tone: 'gold' as const,
    Icon: Trophy,
    accent: 'from-px-gold/20 to-px-gold/5 text-px-gold',
    blurb:
      'Draw software for competition organisers. One proving draw has settled on mainnet; no competition is open today.',
    note: 'We build the draw. The organiser runs the competition in their own name and holds the prize.',
    legal:
      'Draw software by Northlatch Labs LLC. Each competition is run by its organiser under the organiser’s own name and licence.',
    cta: 'See competitions',
    href: RAFFLE_URL,
  },
];

export function InterfacesPreview() {
  return (
    <Section tone="panel" id="interfaces">
      {/* Deliberately no longer counts the products.
          A headline carrying a number has to be edited every time the estate changes shape, and it
          silently stops being true the moment nobody remembers to — the previous version said four
          products were "live and taking real transactions today", which a reader reasonably takes
          as "you can use all four right now". One of them is a contract on mainnet with no
          interface serving it. The claim below is about the chain and the standard we build to,
          both of which stay true as products come and go. */}
      <SectionHeader
        eyebrow="Built on Sui"
        title="One chain. Every promise kept in code."
        lead="Northlatch Labs builds on Sui mainnet because a promise written into a contract is checkable by the person it was made to. Public rules, a permanent record, and a result anyone can verify for themselves — that is the same foundation under every product here."
        proof="A public ledger, settled in seconds — every contract and every transaction is there to be looked up."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        <Reveal className="md:col-span-2">
          <div className="panel panel-hover flex h-full flex-col gap-4 p-7">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-cyan/20 to-px-cyan/5 text-px-cyan">
              <Sparkle className="h-5 w-5" />
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-heading font-semibold text-white">Weir</h3>
              <Badge tone="prize">Live · open</Badge>
            </div>
            <p className="text-meta font-medium uppercase tracking-wide text-px-faint">
              Operated by Northlatch Labs LLC under its own terms.
            </p>
            <p className="text-body text-px-muted">
              Support a creator without spending anything. Park SUI in their vault: the staking
              yield goes to them, and your deposit stays yours — withdrawable in full, any time,
              enforced by the contract rather than promised by us.
            </p>
            <p className="text-meta text-px-faint">
              Subscriptions and paid posts settle on chain too, so what a creator is owed is held
              by a contract, not by the platform. Name registration through Weir is open too.
            </p>
            <div className="mt-auto flex flex-wrap gap-2.5">
              {SOCIAL_URL && (
                <a
                  href={SOCIAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-fit px-5"
                >
                  Create your account
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <Button href="/social" variant="ghost">
                How it works
              </Button>
            </div>
          </div>
        </Reveal>

        {LIVE.map(({ title, badge, tone, Icon, accent, blurb, note, legal, cta, href, fallback }, index) => (
          <Reveal key={title} delay={index * 90}>
            <div className="panel panel-hover flex h-full flex-col gap-4 p-7">
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br ${accent}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-heading font-semibold text-white">{title}</h3>
                <Badge tone={tone}>{badge}</Badge>
              </div>
              <p className="text-body text-px-muted">{blurb}</p>
              <p className="text-meta text-px-faint">{note}</p>
              <p className="text-meta text-px-faint/80">{legal}</p>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-auto w-fit px-5"
                >
                  {cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : fallback ? (
                // A product whose interface has been retired keeps its card and loses its OUTBOUND
                // button. Rendering the CTA against a null href would produce a link to the current
                // page, and pointing it at whatever now occupies the old address is how "Open the
                // vault" came to send people to the raffle.
                //
                // It gets an internal control instead, added 30 August 2026. The card previously
                // ended on a flat "No interface serves this at present" — true, and a dead end on a
                // grid where every other tile leads somewhere. The fallback goes to a page about
                // this same contract, which is the honest place to send someone who was interested
                // enough to read four lines about it.
                <Button href={fallback.href} variant="secondary" className="mt-auto w-fit px-5">
                  {fallback.label}
                </Button>
              ) : (
                <p className="mt-auto text-meta text-px-faint">
                  No interface serves this at present.
                </p>
              )}
            </div>
          </Reveal>
        ))}

        <Reveal delay={LIVE.length * 90}>
          <div className="panel panel-hover flex h-full flex-col gap-4 border-dashed p-7">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-prize/20 to-px-prize/5 text-px-prize">
              <Code className="h-5 w-5" />
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-heading font-semibold text-white">Yours</h3>
              <span className="badge border-white/10 bg-white/[0.04] text-px-muted">Open</span>
            </div>
            <p className="text-body text-px-muted">
              Build on any of it. No permission to ask for, no revenue share, no deal to sign.
            </p>
            <p className="text-meta text-px-faint">
              The on-chain events and every deployed address are documented. The HTTP read API is
              not served at present.
            </p>
            <div className="mt-auto flex flex-wrap gap-2.5">
              <Button href="/interfaces" variant="secondary" className="px-5">
                See all interfaces
              </Button>
              <Button href="/builders" variant="ghost">
                Start building
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
