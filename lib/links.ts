
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

export const DAPP_URL = process.env.NEXT_PUBLIC_DAPP_URL ?? null;

export const SITE_URL = requireOrigin('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL);

export const LAUNCHER_URL = process.env.NEXT_PUBLIC_LAUNCHER_URL ?? null;

export const RAFFLE_URL = process.env.NEXT_PUBLIC_RAFFLE_URL ?? 'https://protocolx.io';

export const NAMES_URL = process.env.NEXT_PUBLIC_NAMES_URL ?? 'https://weir.social/names';

export const SOCIAL_URL = process.env.NEXT_PUBLIC_SOCIAL_URL ?? 'https://weir.social';

export const NAV_LINKS = [

  { href: SOCIAL_URL, label: 'Social', external: true },
  { href: NAMES_URL, label: 'Names', external: true },
  { href: RAFFLE_URL, label: 'Draws', external: true },

  ...(DAPP_URL ? ([{ href: DAPP_URL, label: 'Vault', external: true }] as const) : []),
  { href: `${RAFFLE_URL}/organiser`, label: 'For organisers', external: true },
  { href: '/builders', label: 'Developers' },
] as const;

export const FOOTER_SECTIONS: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [

  {
    title: 'Products',
    links: [
      { label: 'Support a creator', href: SOCIAL_URL, external: true },
      { label: 'Register a .sui name', href: NAMES_URL, external: true },
      { label: 'Live competitions', href: RAFFLE_URL, external: true },
      { label: 'Run a competition', href: `${RAFFLE_URL}/organiser`, external: true },

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
