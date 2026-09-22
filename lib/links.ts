// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
/**
 * Origins that must be supplied, with no fallback of any kind.
 *
 * `DAPP_URL` used to default to a `.ts.net` tailnet hostname — the address the dashboard had before
 * it moved to cloud hosting. It was correct once and then quietly outlived its evidence. Production
 * happens to override it, so nothing broke and nothing complained, which is the problem: the
 * repository still carried a private machine name that would ship in the client bundle the moment
 * an environment forgot to set the variable, and it would ship silently, on a site that rendered
 * perfectly.
 *
 * `SITE_URL` had the same shape with `http://localhost:4000` — unset in production means every
 * canonical URL and every `og:url` points at a machine nobody else can reach.
 *
 * A default that is only ever right because something downstream replaces it is not a default, it
 * is a fixture that survived. Both now throw at module load naming the variable, so the failure
 * lands at build time in the repository rather than on a live page.
 *
 * `process.env.NEXT_PUBLIC_*` is read by literal static reference on purpose. Next replaces the
 * exact text at build time; a dynamic lookup like `process.env[name]` is not substituted and would
 * be `undefined` in every client bundle, which would turn this guard into the outage it prevents.
 */
function requireOrigin(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `${name} is not set. This site refuses to build without it rather than falling back to a ` +
        `development address — see lib/links.ts. Set it in .env.local for development and in the ` +
        `deployment environment for anything public.`,
    );
  }
  return value;
}

// The vault's interface was retired on 25 August 2026 and the draws took `protocolx.io`. The vault
// CONTRACT is still live on Sui mainnet — only the front end is gone.
//
// Nullable, on exactly the reasoning `LAUNCHER_URL` carries below: never advertise a host that does
// not serve the thing the link promises. It was `requireOrigin`, and the deployed value was
// `https://protocolx.io` — so until this change every "Open the vault" button on this site sent
// people to the raffle. A link that resolves is not a link that is correct, and nothing in a build
// can tell the difference.
//
// Every consumer must handle `null` by not rendering the control. Set it again the moment a vault
// interface serves somewhere.
export const DAPP_URL = process.env.NEXT_PUBLIC_DAPP_URL ?? null;

export const SITE_URL = requireOrigin('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL);

// The token launcher is a separate origin on purpose, not a path on this site. It connects a
// wallet, requests signatures and builds transactions — all three of which /privacy and /terms
// promise this site does not do. Linking out keeps those promises true.
//
// Unset means NOT LINKED, and the card on /interfaces does not render at all. Deliberately no
// default: a fallback URL would advertise launch.projectxprotocol.dev from a live page before
// that subdomain resolves, and a dead link on the front door is worse than no link.
//
// ⚠️ There is currently nothing to link to: `launch.projectxprotocol.dev` no longer resolves.
// The variable has never been set in production, so the card does not render and the fail-closed
// default is what keeps a dead link off the front door. The export is kept rather than deleted
// because the launcher's source still exists. Do not set it until a subdomain resolves.
export const LAUNCHER_URL = process.env.NEXT_PUBLIC_LAUNCHER_URL ?? null;

// The raffle is a separate origin for the same reason as the launcher: it connects a wallet and
// requests signatures, which this site promises not to do.
//
// It carried `?? 'https://protocolx.io'` until this change, on the argument that the host had been
// verified answering. That argument is about the VALUE; the defect is the SHAPE. A deployment
// address written into source is a fixture that survives — it is right only for as long as nobody
// moves the product, it ships in the client bundle of every environment that forgets the variable,
// and it ships silently, on a page that renders perfectly. That is the paragraph at the top of this
// file, and it applies here exactly as it applies to `DAPP_URL`.
//
// So: nullable, fail-closed, required in production. Every consumer must render nothing rather than
// a control pointing at a guess. Set `NEXT_PUBLIC_RAFFLE_URL` to the draws' origin, with no
// trailing slash — `/organiser/apply` and `/rules` are appended to it.
//
// Whatever it is set to must be the destination, not a host that redirects to one: the draws moved
// to the apex on 25 August 2026 and `raffle.protocolx.io` only 308s there. A link that depends on a
// redirect advertises a host we have moved off.
export const RAFFLE_URL = process.env.NEXT_PUBLIC_RAFFLE_URL ?? null;

// The name registrar, on the same reasoning as the two above: it connects a wallet and requests a
// signature, which this site promises not to do.
//
// The registrar moved into Weir. `suins.protocolx.io` has been retired and answers 404 (verified
// 22 August 2026) — for a while it 308'd to `weir.social/names`, but a link that depends on a
// redirect is advertising a host we have retired, and that redirect has now gone. Pointed at the
// destination instead.
//
// Nullable and fail-closed for the same reason as the raffle above: a verified host is an argument
// about the value, and what is wrong is a deployment address living in source. Required in
// production — unset, the name search and the registrar's links do not render.
//
// This one is a full path rather than a bare origin. `NameSearch` appends `?name=` directly, so a
// value with a trailing slash produces `/names/?name=`, which answers 308 before the page is
// reached.
export const NAMES_URL = process.env.NEXT_PUBLIC_NAMES_URL ?? null;

// The social platform — creator support over staking yield. A separate origin for the same reason
// as every product above: it connects wallets and settles subscriptions on chain, which this site
// promises not to do.
//
// The product is now **Weir**, at its own domain. `social.protocolx.io` was scaffolding and has
// been retired; it is not redirected, so a link left pointing at it would advertise a host that no
// longer answers — precisely what the standard below forbids.
//
// Nullable and fail-closed, on the reasoning the raffle carries above. Required in production:
// unset, every outbound control to the platform is withheld and the pages that describe it keep
// their prose and lose their buttons.
export const SOCIAL_URL = process.env.NEXT_PUBLIC_SOCIAL_URL ?? null;

// The public source of ProtocolX Verify: the composite GitHub Action, the gate scripts it runs and
// the licence that grants running them in your own CI. A constant rather than a literal in three
// pages, for the reason every other origin here is one — a moved repository is then one edit.
//
// Not an environment variable: this is a public GitHub URL that is the same in every environment,
// and a variable would let a deployment quietly point the word "source" at something else.
export const VERIFY_REPO_URL = 'https://github.com/Northlatch-Labs-LLC/protocolx-verify';

// RE-MEASURED 2026-08-30 (second pass), in a browser, at 1024px — the tightest
// width at which this bar renders at all, since the pill is `hidden` below `lg`.
//
// ⚠️ THE CRITERION MATTERS MORE THAN THE NUMBER, and the first pass of this measurement got it
// wrong. Growing a probe label and watching for overflow gives a ceiling of ~677px: the document,
// the header and the row all still report zero horizontal overflow at 675px. That figure is
// useless, because this pill is a flex container that WRAPS. It never overflows — it silently
// becomes two rows of links inside a rounded bar, which reads as a layout bug rather than as an
// overflow, and no scrollWidth check anywhere will catch it.
//
// Measured again with the honest predicate — every link's `top` identical, so exactly one line —
// on the real element, growing a probe one narrow character at a time:
//
//     644px  one line     ← last good
//     646px  TWO LINES    ← breaks
//
// So the ceiling is 645px, and the previous note's 637px was very nearly right for the right
// reason. Fixed figures either side: the bar is 1009px inside its padding, the logo 160px, the
// "Verify a repo" button 118×40.
//
// Measured candidates, all at 1024px on the live element:
//
//     Verification · Draws · Social · Names · For organisers · Developers        557px  1 line
//     Verification · Security · On chain · Social · Draws · Developers           526px  1 line  ← shipped
//     Verification · Security · On chain · Social · Draws · Names · Developers   603px  1 line
//     …· Draws · Organisers · Developers (7, shortened)                          627px  1 line
//     …· Draws · For organisers · Developers (7, full label)                     646px  2 LINES
//
// The seven-label set that keeps "For organisers" is the one that breaks, by a single pixel over
// the ceiling. Shortening it to "Organisers" fits at 627px but leaves 18px of headroom, which is
// not enough to survive a font-metric difference on someone else's machine. The shipped set
// leaves 119px.
//
// Anyone changing this bar must re-run the measurement WITH THE LINE-COUNT PREDICATE, for exactly
// the reason this paragraph exists. Checking for overflow will tell you a broken bar is fine.
/**
 * The site's primary navigation.
 *
 * Five of the six entries are routes on THIS site; only `Draws` leaves the origin. `Names` and
 * `For organisers` are not on the bar and are kept in the footer's Products block — the
 * seven-label set that keeps `For organisers` measures 646px against the 645px ceiling
 * measured above, so it does not fit on one line.
 *
 * Every entry the bar does not carry is still reachable in one click from the footer on every
 * page.
 */
export const NAV_LINKS = [
  { href: '/verification', label: 'Verification' },
  { href: '/security', label: 'Security' },
  { href: '/chain', label: 'On chain' },
  // Internal on purpose; see the note above. /social links out to weir.social from the page.
  { href: '/social', label: 'Social' },
  // Present only while `NEXT_PUBLIC_RAFFLE_URL` is set, for the reason the Vault entry below is
  // conditional: a nav entry is a promise that something is there.
  ...(RAFFLE_URL ? ([{ href: RAFFLE_URL, label: 'Draws', external: true }] as const) : []),
  // Present only while an interface serves the vault. The vault's front end was retired on
  // 25 August 2026 and the draws took `protocolx.io`; leaving this entry would have put "Vault" in
  // the top nav pointing at the raffle. Restores itself the moment NEXT_PUBLIC_DAPP_URL is set.
  //
  // It costs nothing while DAPP_URL is null, and the measurement above has 119px of headroom —
  // enough for the 62px this label adds if a vault interface ever serves again.
  ...(DAPP_URL ? ([{ href: DAPP_URL, label: 'Vault', external: true }] as const) : []),
  { href: '/builders', label: 'Developers' },
] as const;

/**
 * The public channel list, declared once and rendered everywhere (footer, mobile drawer,
 * /community).
 *
 * Every entry was verified answering before it was added here. The GitHub organisation
 * currently publishes ZERO public repositories, so that link opens an empty profile — do not
 * write a "read the source" claim beside it until a repository is published there.
 *
 * INVARIANT: whatever is added here must also be added to /community, which states in its own
 * words that "if a channel is not listed here, it is not ours" and calls its list canonical.
 * Two lists that disagree is worse than one list — the shorter one starts reading as the
 * impersonation.
 */
export const CHANNELS = [
  { label: 'X · @protocolx_io', short: '@protocolx_io', href: 'https://x.com/protocolx_io', icon: 'x' },
  { label: 'X · @ProjectX_Sui', short: '@ProjectX_Sui', href: 'https://x.com/ProjectX_Sui', icon: 'x' },
  { label: 'GitHub · Northlatch Labs', short: 'GitHub', href: 'https://github.com/Northlatch-Labs-LLC', icon: 'github' },
] as const;

export const FOOTER_SECTIONS: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: 'Products',
    links: [
      // Two entries rather than one: /verification states the offer, /verification/install is
      // the control. /verification/install is linked from nowhere else in the navigation.
      { label: 'Verify a Move package', href: '/verification' },
      { label: 'Install ProtocolX Verify', href: '/verification/install' },
      // Each is dropped rather than rendered against a guess when its origin is unset — the same
      // rule the Prize vault entry below has always followed.
      ...(SOCIAL_URL ? [{ label: 'Support a creator', href: SOCIAL_URL, external: true }] : []),
      ...(NAMES_URL ? [{ label: 'Register a .sui name', href: NAMES_URL, external: true }] : []),
      ...(RAFFLE_URL
        ? [
            { label: 'Live competitions', href: RAFFLE_URL, external: true },
            // /organiser/apply for the same reason as the nav entry above.
            { label: 'Run a competition', href: `${RAFFLE_URL}/organiser/apply`, external: true },
          ]
        : []),
      // Dropped from the nav entirely while no interface serves the vault, rather than rendered
      // pointing at nothing. A nav entry is a promise that something is there.
      ...(DAPP_URL ? [{ label: 'Prize vault', href: DAPP_URL, external: true }] : []),
    ],
  },
  /*
   * `/sponsor` is retired and is not linked from here. It 308s to /protocol (next.config.mjs),
   * so any copy of that URL still in the wild lands on a page rather than on a 404.
   *
   * `On chain` names /chain rather than the older /builders#addresses anchor. That anchor still
   * resolves — /builders keeps its #addresses section and hands off to /chain — so no shared
   * link breaks either way.
   */
  {
    title: 'Protocol',
    links: [
      { label: 'How it works', href: '/protocol' },
      { label: 'Security', href: '/security' },
      { label: 'On chain', href: '/chain' },
      { label: 'Capture the flag', href: '/ctf' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Build on ProjectX', href: '/builders' },
      { label: 'Protocol API', href: '/builders#api' },
      { label: 'Blueprints', href: '/blueprints' },
      { label: 'Every interface', href: '/interfaces' },
      { label: 'Ship an interface', href: '/interfaces#build' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Community', href: '/community' },
      { label: 'Known limitations', href: '/security#limitations' },
      { label: 'Risk disclosure', href: '/disclaimer' },
      { label: 'Free entry (AMOE)', href: '/faq#amoe' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of use', href: '/legal/terms' },
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Trademarks', href: '/legal/trademarks' },
      { label: 'Protocol disclaimer', href: '/disclaimer' },
    ],
  },
];
