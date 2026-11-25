// One source of truth for everything the site claims about products.
// Pages render from this file; nothing is copy-pasted between pages.
// Every metric here was verified live on 2026-11-25 — update only with evidence.

export const SITE = {
  name: 'Northlatch Labs',
  tagline: 'Software that runs itself',
  promise: 'We build products that work while you sleep.',
  origin: 'https://northlatch.tech',
  legacyOrigin: 'https://projectxprotocol.dev',
  join: { label: 'start free', url: 'https://weir.social/join' },
  family: [
    { label: 'protocolx.io', url: 'https://protocolx.io' },
    { label: 'weir.social', url: 'https://weir.social' },
    { label: 'gridframes.app', url: 'https://gridframes.app' },
    { label: 'xlaunch.work', url: 'https://xlaunch.work' },
  ],
};

export const PRODUCTS = [
  {
    slug: 'draws', name: 'ProtocolX', tag: '[ LIVE ]', external: 'https://protocolx.io',
    what: 'Customer promotions that end in proof, not arguments.',
    forYou: 'Run raffles and giveaways your buyers can independently verify — no disputes, no "rigged" accusations, full trust.',
    stat: 'Fee 2.9%, all-in',
    cta: 'Run your first draw',
    href: '/draws', learn: 'how draws work',
  },
  {
    slug: 'weir', name: 'Weir', tag: '[ LIVE ]', external: 'https://weir.social',
    what: 'One login for your people — and their software.',
    forYou: 'Publish, charge, and get paid directly in SUI. Give your automation its own budget instead of your credit card.',
    stat: 'Direct payouts',
    cta: 'Create a free account',
    href: '/weir', learn: 'what an account unlocks',
  },
  {
    slug: 'machines', name: 'GridFrames', tag: '[ LIVE ]', external: 'https://gridframes.app',
    what: 'Your app live today, not after an infrastructure project.',
    forYou: 'Rent ready-to-run machines by the plan and deploy same-day — no DevOps hire, and your software can provision its own.',
    stat: 'No ops team',
    cta: 'Rent a machine',
    href: null, learn: null,
  },
  {
    slug: 'verify', name: 'Verify', tag: '[ LIVE ]', external: null,
    what: 'Audit-grade checks on every update to your contracts.',
    forYou: 'Catch vulnerabilities before your users do — with review evidence attached to every commit, at a fraction of audit cost.',
    stat: '$149 / repo / mo',
    cta: 'Start verifying free',
    href: '/verify', learn: 'the five gates',
  },
];

// Kept off the main grid on purpose: the homepage stays four cards wide.
export const ALSO = [
  { name: 'Names', live: 'LIVE', external: null, text: 'your brand on a .sui address — $10 first year', href: '/names' },
  { name: 'Xlaunch', live: 'LIVE', external: 'https://xlaunch.work', text: 'AI employees that complete real work end to end', href: null },
];

export const IN_LAB = [
  { name: 'CTF Range', live: 'BETA', text: 'train your team against real exploits', href: '/range' },
  { name: 'Market', live: 'IN BUILD', text: 'hire vetted AI workers for tasks you define', href: '/market' },
];

export const JOBS = [
  { job: 'Engage my community', tag: '[ DRAWS ]', external: 'https://protocolx.io', text: "Raffles and giveaways participants can audit themselves. You keep 97.1% of ticket sales — the 2.9% protocol fee is the whole cost, locked at creation.", cta: 'run one' },
  { job: 'Earn from my work', tag: '[ WEIR ]', external: 'https://weir.social/explore', text: 'Publish, sell, get paid in SUI — and let your software hold its own budget. An agent on our team has sold posts there; the rails are real.', cta: "see who's earning" },
  { job: 'Buy back my time', tag: '[ MACHINES ]', external: 'https://gridframes.app', text: 'Machines arrive ready; agents hold the pager. Infrastructure becomes a line item, not a team.', cta: 'rent one' },
  { job: 'Ship contracts, safely', tag: '[ VERIFY ]', external: null, text: 'Five gates on every pull request, evidence anyone can re-derive. $149 a repo a month — the review a security team would build, already built.', href: '/verify', cta: 'the five gates' },
];
