// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
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
 * layout weighting, not a claim of primacy: verification is the estate's flagship and is headlined
 * separately. Nothing in this section should badge or word itself as the flagship.
 *
 * Do not retitle this section "One pool, many front doors". Names and Draws are not interfaces onto
 * the prize vault — Draws is its own contract with its own treasury, and the registrar is a
 * separate business selling SuiNS names.
 *
 * Copy leads with what a person gets and what it costs them, because this page is read by people
 * deciding whether to use something. The mechanism is not hidden — each card keeps the one sentence
 * that says what is guaranteed — but it comes after the offer, not instead of it. The engineering
 * account lives on /protocol, /security and /builders.
 */
const LIVE = [
  {
    title: 'ProjectX Vault',
    badge: 'Reference',
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
    blurb:
      'A vault where the whole day’s staking yield goes to one depositor and the draw runs in public. Principal is never at stake — the contract holds no path that could spend it, and a withdrawal returns it 1:1.',
    note: 'The contract is live on Sui mainnet. Its interface was retired in August, so there is nothing to deposit into today.',
    legal:
      'Software developed and licensed by Northlatch Labs LLC. Interface operator and prize sponsor: not yet designated. When an interface serves it again, this card is where it will be linked.',
    cta: 'Open the vault',
    href: DAPP_URL,
  },
  {
    title: 'ProjectX Draws',
    badge: 'Live',
    tone: 'gold' as const,
    Icon: Trophy,
    accent: 'from-px-gold/20 to-px-gold/5 text-px-gold',
    blurb:
      'Enter competitions where the draw happens in public. Nobody — including us — can know or change the winner before it runs, and anyone can check it afterwards.',
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
        lead="We build on Sui mainnet because a promise written into a contract doesn't ask you to trust us. Public rules, a permanent record, and a result anyone can check for themselves — that's the same foundation under everything we make."
        proof="A public ledger, settled in seconds — every contract and every transaction is there to be looked up."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        <Reveal className="md:col-span-2">
          <div className="panel panel-hover flex h-full flex-col gap-4 p-7">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-cyan/20 to-px-cyan/5 text-px-cyan">
              <Sparkle className="h-5 w-5" />
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold text-white">Weir</h3>
              <Badge tone="prize">Live</Badge>
            </div>
            <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-px-faint">
              Operated by Northlatch Labs LLC under its own terms.
            </p>
            <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
              Support a creator without spending anything. Park SUI in their vault: the staking
              yield goes to them, and your deposit stays yours — withdrawable in full, any time,
              enforced by the contract rather than promised by us.
            </p>
            <p className="text-[0.875rem] leading-[1.6] text-px-faint">
              Subscriptions and paid posts settle on chain too, so what a creator is owed is held
              by a contract, not by the platform. Includes .sui name registration.
            </p>
            <div className="mt-auto flex flex-wrap gap-2.5">
              <a
                href={SOCIAL_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-fit px-5"
              >
                Join the waiting list
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Button href="/social" variant="ghost">
                How it works
              </Button>
            </div>
          </div>
        </Reveal>

        {LIVE.map(({ title, badge, tone, Icon, accent, blurb, note, legal, cta, href }, index) => (
          <Reveal key={title} delay={index * 90}>
            <div className="panel panel-hover flex h-full flex-col gap-4 p-7">
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br ${accent}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <Badge tone={tone}>{badge}</Badge>
              </div>
              <p className="text-[1.0625rem] leading-[1.65] text-px-muted">{blurb}</p>
              <p className="text-[0.875rem] leading-[1.6] text-px-faint">{note}</p>
              <p className="text-[0.8125rem] leading-[1.55] text-px-faint/80">{legal}</p>
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
              ) : (
                // A product whose interface has been retired keeps its card and loses its button.
                // Rendering the CTA against a null href would produce a link to the current page,
                // and pointing it at whatever now occupies the old address is how "Open the vault"
                // came to send people to the raffle.
                <p className="mt-auto text-[0.8125rem] leading-[1.55] text-px-faint">
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
              <h3 className="text-xl font-semibold text-white">Yours</h3>
              <span className="badge border-white/10 bg-white/[0.04] text-px-muted">Open</span>
            </div>
            <p className="text-[1.0625rem] leading-[1.65] text-px-muted">
              Build on any of it. No permission to ask for, no revenue share, no deal to sign.
            </p>
            <p className="text-[0.875rem] leading-[1.6] text-px-faint">
              A public read API, a full on-chain event stream and every deployed address are
              documented and ready.
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
