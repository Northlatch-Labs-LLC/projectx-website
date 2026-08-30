// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
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
// This one carries a default where the launcher deliberately does not, because the condition that
// rule protects against does not hold — the host was verified serving 200 before this line was
// written. The reasoning is the same in both places: never advertise a host that does not answer.
//
// Moved to the apex on 25 August 2026, when the vault dashboard was retired and the draws took
// `protocolx.io`. `raffle.protocolx.io` still 308s here, but a link that depends on a redirect is
// advertising a host we have moved off — the same reasoning applied to the retired registrar
// below. Pointed at the destination instead.
export const RAFFLE_URL = process.env.NEXT_PUBLIC_RAFFLE_URL ?? 'https://protocolx.io';

// The name registrar, on the same reasoning as the two above: it connects a wallet and requests a
// signature, which this site promises not to do.
//
// The registrar moved into Weir. `suins.protocolx.io` has been retired and answers 404 (verified
// 22 August 2026) — for a while it 308'd to `weir.social/names`, but a link that depends on a
// redirect is advertising a host we have retired, and that redirect has now gone. Pointed at the
// destination instead.
//
// Carries a default on the same evidence standard as the raffle: weir.social/names was verified
// answering on 22 August 2026, immediately before this was deployed — 307 to the waiting list while
// the alpha is closed, which is the site's own front door and not a dead host. Never advertise a
// host that does not answer.
export const NAMES_URL = process.env.NEXT_PUBLIC_NAMES_URL ?? 'https://weir.social/names';

// The social platform — creator support over staking yield. A separate origin for the same reason
// as every product above: it connects wallets and settles subscriptions on chain, which this site
// promises not to do.
//
// The product is now **Weir**, at its own domain. `social.protocolx.io` was scaffolding and has
// been retired; it is not redirected, so a link left pointing at it would advertise a host that no
// longer answers — precisely what the standard below forbids.
//
// Carries a default on the same evidence standard as the raffle and the registrar: weir.social was
// verified serving 200 over TLS on 19 August 2026, immediately before this line was written, from
// the same Vercel project that served the old host. Never advertise a host that does not answer.
export const SOCIAL_URL = process.env.NEXT_PUBLIC_SOCIAL_URL ?? 'https://weir.social';

// RE-MEASURED 2026-08-30, in a browser, at 1024px — the tightest width at which this bar renders
// at all, since the pill is `hidden` below `lg`. The previous note here put the ceiling at ~630px
// and these labels at ~545px, and it was conservative in a way that mattered: it was read as
// forbidding a sixth entry, and "Verification" could not be added without deleting something.
//
// The real figures, hit-tested rather than estimated. The bar is 1009px inside its padding; the
// logo is 153px and the actions cluster 172px of actual content, both fixed. The centred pill
// therefore breaks at a measured 637px — confirmed by growing a probe label one step at a time
// until the bar, the document, or the button's own height overflowed. The six labels below
// measure 557px, which leaves 80px of headroom at the worst width, with the bar and document
// both at zero horizontal overflow and the "See draws" button still 128×40 on one line.
//
// So six is not a ceiling and never was — 637px is. Anyone adding a seventh should re-run that
// measurement rather than trusting this paragraph, for exactly the reason this paragraph exists.
//
// Until 11 Aug the desktop bar carried five and `/security`, `/sponsor` and `/community` were
// reachable *only* through the mobile hamburger, which renders FOOTER_SECTIONS. Three real pages
// were invisible to anyone on a laptop.
/**
 * The primary navigation, ordered by how quickly a visitor can become revenue.
 *
 * It used to be How it works · Security · Sponsor · Builders · Community · CTF — six links, five of
 * which serve developers and sponsors, and none of which reached a thing anyone can buy. Two of the
 * three products had no entry in their own company's navigation, and the organiser — the highest
 * value customer on the estate — could only be reached by knowing the raffle subdomain existed and
 * then finding the third link inside it.
 *
 * Everything the old nav carried still exists; it now lives under Developers, which is what it was.
 */
export const NAV_LINKS = [
  // Verification leads, by operator order (30 Aug 2026: "Verification is now the main service
  // promoted on the .dev hub .... Names is not the flagship product"). It is the only entry that
  // is a page on THIS site rather than a link off it, which is the point — this domain is the
  // verification hub, and the other three surfaces are products it vouches for.
  { href: '/verification', label: 'Verification' },
  { href: RAFFLE_URL, label: 'Draws', external: true },
  { href: SOCIAL_URL, label: 'Social', external: true },
  // Names keeps its place and loses the lead. Same order-of-revenue reasoning as before; what
  // changed is that a name is no longer the fastest thing a stranger can buy here, because the
  // registrar is behind Weir's closed alpha and the First Report is not.
  { href: NAMES_URL, label: 'Names', external: true },
  // Present only while an interface serves it. The vault's front end was retired on 25 August
  // 2026 and the draws took `protocolx.io`; leaving this entry would have put "Vault" in the top
  // nav pointing at the raffle. Restores itself the moment NEXT_PUBLIC_DAPP_URL is set again.
  ...(DAPP_URL ? ([{ href: DAPP_URL, label: 'Vault', external: true }] as const) : []),
  // /organiser/apply, not /organiser. The console at /organiser is allowlisted — the contract
  // aborts with `EOrganiserNotAllowed` for any address that has not been admitted — and it
  // renders the full creation form to a disconnected visitor before it says so. /organiser/apply
  // opens with "Apply to run competitions" and the admission steps, which is what this label
  // promises. See components/home/Organisers.tsx.
  //
  // This entry was accidentally dropped when Verification was added on 30 August 2026 and put
  // straight back the same hour. Nothing about the ruling called for removing it, the bar has the
  // room (see the measurement above), and losing it would have taken the highest-value customer
  // on the raffle off the top nav as a side effect of promoting a different product.
  { href: `${RAFFLE_URL}/organiser/apply`, label: 'For organisers', external: true },
  { href: '/builders', label: 'Developers' },
] as const;

/**
 * The estate's public channels, stated once and rendered everywhere.
 *
 * These were on /community and nowhere else, which meant the canonical list of "these accounts
 * are ours and nothing else is" sat three clicks from the front door on a site whose whole
 * argument is that you should not have to take anyone's word for anything. An impersonation
 * defence that is hard to reach is not a defence.
 *
 * `@protocolx_io` leads because it is the account that carries the draws and the pinned launch
 * thread (29 August 2026); `@ProjectX_Sui` is the estate's own voice. Both verified first-hand —
 * posts from each are recorded in operations/campaign-log.md with their status ids.
 *
 * GitHub is the organisation profile, verified answering 200 on 30 August 2026. It is listed on
 * the Master's order of the same date. Note honestly: the organisation currently publishes ZERO
 * public repositories, so this link opens an empty shelf until `protocolx-verify` is published
 * (see operations/company/publication-plan-2026-08-30.md). The link is not wrong — the profile is
 * real and it is ours — but anyone adding a "read the source" claim beside it before that
 * publication lands would be writing a promise the page cannot keep.
 *
 * Whatever is added here must also be added to /community, which states in its own words that
 * "if a channel is not listed here, it is not ours" and calls its list canonical. Two lists that
 * disagree is worse than one list — the shorter one starts reading as the impersonation.
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
  /*
   * Products first.
   *
   * The footer opened with the protocol and gave its largest block — seven links — to developers,
   * while the three things anyone can actually buy had no section at all. On a page being read by
   * someone deciding whether to put their competition licence next to this software, a quarter of
   * the footer was addressed to people who will never pay.
   *
   * Nothing was removed. Blueprints, the CTF, build ideas and the API all still exist and are all
   * still one click away; they sit under Developers now instead of leading.
   */
  {
    title: 'Products',
    links: [
      // Verification leads the footer for the same reason it leads the nav (operator order,
      // 30 Aug 2026). Two entries rather than one: the page states the offer, /verification/install
      // is the door — and a reader who has already decided should not have to read the pitch again
      // to find the control.
      { label: 'Verify a Move package', href: '/verification' },
      { label: 'Install ProtocolX Verify', href: '/verification/install' },
      { label: 'Support a creator', href: SOCIAL_URL, external: true },
      { label: 'Register a .sui name', href: NAMES_URL, external: true },
      { label: 'Live competitions', href: RAFFLE_URL, external: true },
      // /organiser/apply for the same reason as the nav entry above.
      { label: 'Run a competition', href: `${RAFFLE_URL}/organiser/apply`, external: true },
      // Dropped from the nav entirely while no interface serves the vault, rather than rendered
      // pointing at nothing. A nav entry is a promise that something is there.
      ...(DAPP_URL ? [{ label: 'Prize vault', href: DAPP_URL, external: true }] : []),
    ],
  },
  {
    title: 'Protocol',
    links: [
      { label: 'How it works', href: '/protocol' },
      { label: 'Security', href: '/security' },
      { label: 'Deployed addresses', href: '/builders#addresses' },
      { label: 'Boost the prize', href: '/sponsor' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Build on ProjectX', href: '/builders' },
      { label: 'Protocol API', href: '/builders#api' },
      { label: 'Blueprints', href: '/blueprints' },
      { label: 'Ship an interface', href: '/interfaces#build' },
      { label: 'Capture the flag', href: '/ctf' },
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
