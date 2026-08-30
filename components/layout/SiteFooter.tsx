// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Badge, LiveDot } from '@/components/ui/Badge';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { AddressChip } from '@/components/ui/AddressChip';
import { ShieldCheck } from '@/components/ui/Icons';
import { CHAIN_OBJECTS, NETWORK, explorerUrl } from '@/lib/chain';
import { ChannelLinks } from '@/components/ui/ChannelLinks';
import { FOOTER_SECTIONS } from '@/lib/links';

export function SiteFooter() {
  const pkg = CHAIN_OBJECTS.find((object) => object.label === 'Package')!;
  const pool = CHAIN_OBJECTS.find((object) => object.label === 'Pool')!;

  return (
    <footer className="relative mt-auto overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(77,162,255,0.35) 22%, rgba(63,216,245,0.45) 50%, rgba(77,162,255,0.35) 78%, transparent)',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 h-[30rem] w-[46rem] animate-aurora-slow rounded-full bg-px-accent/[0.08] blur-[120px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[26rem] w-[36rem] animate-aurora rounded-full bg-px-violet/[0.07] blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-5 pt-16 sm:px-8">
        {/* The band that renders on every route, so it states the flagship.

            It read "Deposit SUI. Win the yield." until 30 August 2026 — the vault's pitch, on all
            nineteen routes, beside a button that `DAPP_URL` had already suppressed. The control
            was correctly withheld and the argument for pressing it went on running: a call to
            action with no door, repeated site-wide, on the domain the Master has ruled the
            verification hub.

            The vault is not dropped from the footer. Its door is the conditional `Prize vault`
            entry under Products in FOOTER_SECTIONS, on the same variable and the same reasoning
            (lib/links.ts) — present the moment an interface serves it, absent while none does.
            The band carries the thing that is for sale today instead; the vault's own account is
            on /protocol, which this band still links to. */}
        <div className="ring-gradient relative overflow-hidden rounded-3xl bg-gradient-to-br from-px-accent/[0.09] via-px-cyan/[0.05] to-transparent p-8 md:p-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex flex-1 flex-col gap-3">
              <h2 className="text-gradient-chrome max-w-[20ch] text-title">
                Five gates on every pull request.
              </h2>
              <p className="body-copy max-w-[46ch]">
                ProtocolX Verify runs the checks we run on our own {NETWORK} contracts against
                yours, and leaves an evidence bundle whose digest you can re-derive without us.
                Not an audit, and never called one.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link href="/verification/install" className="btn-primary px-6 py-3.5">
                Install ProtocolX Verify
              </Link>
              <Link href="/verification" className="btn-secondary">
                What it measures
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-8">
          <div className="flex flex-col gap-5">
            <Logo ns="footer" />
            {/* No product count and no list. This paragraph sits on every page, so it was the
                slowest thing in the estate to notice going stale — it still enumerated four
                products, one of which no longer has an interface. What is described here is the
                standard, which does not change when a surface is added or retired. */}
            <p className="max-w-[34ch] text-[1rem] leading-[1.65] text-px-muted">
              Software built on Sui, where the rules live in a contract rather than in a policy
              page. Public, permanent, and checkable by anyone — including you.
            </p>
            <LiveBadge className="w-fit" />

            {/* The channels, on every page rather than only on /community.
                That page calls its list canonical and tells visitors any account not on it is not
                ours — a defence that only works if a visitor being impersonated can reach it
                without already knowing it exists. The footer is where they look. /community keeps
                the full statement and the impersonation warning; this is the shortcut to it, and
                both render from CHANNELS so they cannot drift apart. */}
            <ChannelLinks className="mt-1" />

          </div>

          {FOOTER_SECTIONS.map((section) => (
            <nav key={section.title} aria-label={section.title} className="flex flex-col gap-4">
              <h2 className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 shrink-0 rounded-full bg-px-cyan shadow-[0_0_8px_2px_rgba(63,216,245,0.8)]"
                />
                <span className="label bg-gradient-to-r from-px-cyan to-px-accent-200 bg-clip-text text-transparent">
                  {section.title}
                </span>
              </h2>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-px-muted transition-colors duration-300 hover:text-white"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-px-cyan transition-all duration-300 group-hover:w-3"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="panel panel-lit mt-16 overflow-hidden p-8 md:p-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="relative inline-flex h-14 w-14 items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-px-cyan/25 blur-xl"
              />
              <span className="ring-gradient relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black/40 text-px-cyan">
                <ShieldCheck className="h-7 w-7" />
              </span>
            </span>

            <h2 className="text-gradient-chrome text-title">Verify it yourself</h2>

            {/* The band ships on every route, so its sentence has to be true of the whole site
                rather than of one product. It named "the package and the pool" — the vault's two
                objects — as though they were what the site rests on, on pages about verification,
                Weir and the draws. It now names the record, and the record covers all four. */}
            <p className="body-copy mx-auto max-w-[52ch]">
              Every claim on this site resolves to an object on {NETWORK}. Four products are
              deployed, each with its identifier and its upgrade authority published — open any
              one on a block explorer and read the same state we do. Nothing here asks you to
              take our word for it.
            </p>

            <LiveBadge className="mt-1" />
          </div>

          <ul className="mx-auto mt-9 flex max-w-2xl flex-col gap-3">
            {[
              {
                object: pkg,
                role: 'The published Move package. Bytecode readable on any explorer, without our permission.',
              },
              {
                object: pool,
                role: 'The shared pool object. Contract live on mainnet; no interface serves it at present.',
              },
            ].map(({ object, role }) => (
              <li
                key={object.id}
                className="ring-gradient flex flex-col gap-3 rounded-2xl bg-black/30 p-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex min-w-0 flex-col gap-1 text-left">
                  <span className="font-display text-[1.0625rem] font-medium text-white">
                    {object.label}
                  </span>
                  <span className="text-[0.875rem] leading-[1.55] text-px-faint">{role}</span>
                </div>
                <AddressChip
                  id={object.id}
                  href={explorerUrl(object)}
                  className="shrink-0 sm:ml-auto"
                />
              </li>
            ))}
          </ul>

          {/* Was /builders#addresses — three sections down a page addressed to integrators. The
              deployment record has its own route as of 30 August 2026, and this is the link most
              readers of this band actually want. The old anchor still resolves. */}
          <p className="mt-6 text-center text-[0.875rem] text-px-faint">
            Every package and every object —{' '}
            <Link href="/chain" className="text-px-cyan underline underline-offset-4">
              the on-chain record, with the upgrade authority for each
            </Link>
            .
          </p>
        </div>

        {/* Publisher imprint. Northlatch Labs LLC is the named publisher of this site; it develops
            and licenses the protocol software and does not operate the vault, run any draw, sponsor
            any prize, or hold user funds. See /disclaimer and /legal/terms. */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] py-8 text-[0.875rem] leading-[1.6] text-px-faint">
          <p className="max-w-[70ch]">
            Published by{' '}
            <span className="text-px-muted">Northlatch Labs LLC</span> · Casper, Wyoming ·{' '}
            <a
              href="mailto:legal@projectxprotocol.dev"
              className="text-px-muted underline underline-offset-4 transition-colors hover:text-px-cyan"
            >
              legal@projectxprotocol.dev
            </a>
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {[
              { label: 'Terms', href: '/legal/terms' },
              { label: 'Privacy', href: '/legal/privacy' },
              { label: 'Security', href: '/security' },
              { label: 'Trademarks', href: '/legal/trademarks' },
              { label: 'Disclaimer', href: '/disclaimer' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-px-muted underline underline-offset-4 transition-colors hover:text-px-cyan"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <span>© 2026 Northlatch Labs LLC</span>
        </div>
      </div>
    </footer>
  );
}
