
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

const SITE_DESCRIPTION =
  'Software on Sui mainnet where the rules live in a contract, not a policy page: a social platform where supporting a creator never spends your money, .sui names delivered straight to your wallet, and prize draws anyone can re-derive from the chain. Every promise is kept by a contract, not by us.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  alternates: { canonical: './' },
  title: {
    default: 'ProjectX — Protocol built on Sui',
    template: '%s · ProjectX Protocol',
  },
  description:
    SITE_DESCRIPTION,
  applicationName: 'ProjectX Protocol',
  keywords: [
    'no-loss creator support',
    'creator platform',
    'no-loss prize vault',
      'prize vault',
    'prize-linked savings',
      'Sui raffle',
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

      suppressHydrationWarning
    >
      <head>
        {}
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
        {}
        <Analytics />
      </body>
    </html>
  );
}
