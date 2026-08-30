// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Roboto, Roboto_Mono, Space_Grotesk } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/lib/links';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

/**
 * One sentence, one place.
 *
 * It was written out three times — once for the page description, once for Open Graph and once for
 * the Twitter card — so a change had to be made in triplicate and any missed copy would show up on
 * exactly one platform, which is the hardest place to notice it.
 *
 * Verification leads, by operator order of 30 August 2026 — "Verification is now the main service
 * promoted on the .dev hub". It superseded the 18 August decision that put the social platform
 * first, which is recorded here rather than erased: this sentence is the company's one-line
 * answer to "what do you sell", and it named three products that are sold elsewhere while
 * omitting the one sold here.
 *
 * No product count, and the prize vault is not listed. A description is what a visitor can go and
 * do; the vault's contract is live on mainnet but its interface was retired on 25 August 2026, so
 * naming it here would sell something with nowhere to click. It returns to this sentence when an
 * interface serves it again.
 */
const SITE_DESCRIPTION =
  'Verification for Sui Move: five check runs on every pull request, and a measured report on one package from $1,000 — evidence with a digest you can re-derive without us, never called an audit. Also from Northlatch Labs: a social platform where supporting a creator never spends your money, .sui names, and prize draws anyone can re-derive from the chain.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Every page declares itself canonical. './' resolves against the page's own path — a literal
  // '/' would be inherited by every route and mark them all duplicates of the home page.
  // The root is the one exception: Next resolves './' there to '/index', a URL that does not
  // exist, so app/page.tsx overrides with an absolute '/'. Every other route keeps './'.
  alternates: { canonical: './' },
  title: {
    default: 'ProjectX — Protocol built on Sui',
    template: '%s · ProjectX Protocol',
  },
  description:
    SITE_DESCRIPTION,
  applicationName: 'ProjectX Protocol',
  // Ordered flagship first, indentation regularised, duplicates removed. 'Sui raffle' is gone:
  // the product has been called Draws since 25 August 2026 and every visitor-facing surface says
  // so, which made this the one place on the estate still advertising the old name. 'prize vault'
  // and 'no-loss prize vault' were the same entry written twice.
  keywords: [
    'Sui Move verification',
    'Move mutation testing',
    'Sui smart contract review',
    'Move formal verification',
    'GitHub App Sui Move',
    'no-loss creator support',
    'creator platform',
    'no-loss prize vault',
    'prize-linked savings',
    'verifiable draw',
    'sui names',
    'SuiNS registrar',
    'Sui',
    'SUI staking',
    'DeFi',
    'USDC prize',
    'ProjectX Protocol',
  ],
  authors: [{ name: 'Northlatch Labs LLC' }],
  openGraph: {
    type: 'website',
    siteName: 'ProjectX Protocol',
    title: 'ProjectX — Protocol built on Sui',
    description:
      SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProjectX — Protocol built on Sui',
    description:
      SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#060a12',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${roboto.variable} ${spaceGrotesk.variable} ${robotoMono.variable}`}
      // The pre-paint script below sets data-theme here, so this element legitimately differs
      // from the server HTML. Scoped to <html>'s own attributes, not its subtree.
      suppressHydrationWarning
    >
      <head>
        {/*
         * Stamps the saved accent before first paint. Without it every load of a themed page
         * paints blue and then swaps, because the toggle can only read storage after mount.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('projectx.accent');if(t==='green')document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-px-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#04101f]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex w-full flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        {/* Page-view counting only, and only on this site — not on the dashboard, the raffle or
            the registrar, which stay script-free. It sets no cookies and cannot follow a visitor
            to another site; Vercel derives a per-request hash and discards the session after 24
            hours. What it records is listed in full on /privacy, which was rewritten in the same
            commit that added this. Neither ships without the other. */}
        <Analytics />
      </body>
    </html>
  );
}
