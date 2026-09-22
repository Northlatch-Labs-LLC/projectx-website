// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/lib/links';
import { cn } from '@/lib/utils';
import './globals.css';

/*
 * Three faces, three variables, and the variable NAMES are fixed.
 *
 * `--font-roboto` in particular no longer describes what is behind it, and it is deliberately
 * not renamed: `font-sans` resolves through it in tailwind.config.ts and it is referenced from
 * well over a hundred classNames. Renaming it would be a rename with no reader-visible benefit
 * and a large blast radius, in a tree two other agents are editing.
 *
 * Why these three, given a type scale is only as good as the faces carrying it:
 *
 *   Roboto -> Inter. Roboto's apertures close up and its x-height is modest, which is what made
 *   17px body text on a near-black canvas feel tight. Inter was drawn for screens at exactly
 *   this size, has a taller x-height and open apertures, and — the reason it matters here —
 *   ships as a variable font across 100-900, so the scale can use weight as a signal at every
 *   level instead of only at the four static weights Roboto was loaded with.
 *
 *   Space Grotesk -> Plus Jakarta Sans. Space Grotesk tops out at 700 and its quirks (the
 *   single-storey g, the flat-sided o) are charming at 24px and distracting at 96px. Plus Jakarta
 *   Sans runs 200-800, so `hero` can sit at 800 and `subhead` at 600 and read as the same voice;
 *   its tighter, more even colour is what lets the -0.042em tracking on the headline hold
 *   together rather than collide.
 *
 *   Roboto Mono -> JetBrains Mono. This site sets Sui object addresses in mono. JetBrains Mono
 *   has a taller x-height at the same point size and, more to the point, disambiguates 0/O and
 *   1/l/I — which is the difference between an address a reader can check and one they cannot.
 *
 * No `weight` is passed: all three are variable on Google Fonts, so omitting it loads the full
 * axis. That is what "a wide weight range so the hierarchy can breathe" requires. `display:
 * swap` is kept, and tailwind.config.ts carries fallback stacks chosen to sit near these metrics
 * so the swap does not reflow a headline.
 *
 * Still three families. Nothing self-hosted.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

/**
 * One sentence, one place — the page description, the Open Graph description and the Twitter
 * card all read from this constant. Written out three times, a change has to be made in
 * triplicate and a missed copy shows up on exactly one platform, which is the hardest place to
 * notice it.
 *
 * It carries no product count, so it does not go stale when a surface is added or retired. The
 * prize vault is not named because its interface was retired on 25 August 2026 and there is
 * nothing to click; add it back when an interface serves it again.
 */
const SITE_DESCRIPTION =
  'Verification for Sui Move: five PR checks, free to run in your own CI, plus a measured report. Also: Weir, an open Sui creator network, and re-derivable draw software.';

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
  // Deduplicated. Keep this list free of retired product names — every entry must match a name
  // a visitor-facing surface still uses.
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
      className={cn(inter.variable, plusJakarta.variable, jetbrainsMono.variable)}
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-px-accent focus:px-4 focus:py-2 focus:text-meta focus:font-semibold focus:text-[#04101f]"
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
