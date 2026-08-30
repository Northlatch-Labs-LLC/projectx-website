// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import { Signature } from '@/components/ui/Signature';
import { Hero } from '@/components/home/Hero';
import { InterfacesPreview } from '@/components/home/InterfacesPreview';
import { Social } from '@/components/home/Social';
import { Organisers } from '@/components/home/Organisers';
import { Provenance } from '@/components/home/Provenance';
import { VerificationPractice } from '@/components/home/VerificationPractice';
import { CtaBand } from '@/components/home/CtaBand';

// The one route that overrides the layout's './' canonical: at the root, Next resolves './'
// to '/index' — a URL this site does not serve — and the live page shipped that way. Every
// other route inherits './' and stays self-canonical; see layout.tsx.
export const metadata: Metadata = { alternates: { canonical: '/' } };

/**
 * One block per subject, in the order the page presents them:
 *
 *   Hero         the offer — the First Report — and the name search below it
 *   Verification ─ stated immediately after the hero promises it
 *   Provenance   ── the security practice and the on-chain record, with the vault's figures
 *   Interfaces   the router — the other products, and where each one lives
 *   Social       ── supporting a creator without spending anything, explained on /social
 *   Organisers   ── the draws
 *   CtaBand      close
 *
 * `Provenance` renders the vault figures from the same `getStats()` call the block it replaced
 * used, under a heading that says what they measure and with no call to action beside them.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <VerificationPractice />
      <Provenance />

      <InterfacesPreview />
      <Social />
      <Organisers />

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Signature />
      </div>

      <CtaBand />
    </>
  );
}
