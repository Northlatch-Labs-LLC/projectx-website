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
 * One product per block, in the order a visitor can act on them.
 *
 * The page used to interleave them. The hero introduced all three, the grid below introduced all
 * three again in nearly the same words, and then three consecutive sections about the vault ran
 * under headlines that read as the raffle. Someone who arrived wanting a name found it named twice
 * and explained nowhere; someone who arrived for the vault read its pitch three times without ever
 * being told which product they were reading about.
 *
 *   Hero         the offer — the First Report — and the name search kept below it
 *   Verification ─ the flagship, stated immediately after the hero promises it
 *   Provenance   ── the security practice and the on-chain record, with the vault's figures
 *   Interfaces   the router — the other products, and where each one lives
 *   Social       ── supporting a creator without spending anything, explained on /social
 *   Organisers   ── everything about draws, aimed at who actually pays for them
 *   CtaBand      close
 *
 * Verification moved from last to second on the Master's order of 30 August 2026: "Verification is
 * now the main service promoted on the .dev hub .... Names is not the flagship product."
 *
 * It sat last for a defensible reason, recorded here so the move is not mistaken for a correction
 * of a mistake: on 27 August this page's job was to route a buyer between three products, and the
 * buyer's last question is "why should I trust any of it", so the answer went where that question
 * is asked. What changed is not the reasoning but the page's job. Verification is no longer the
 * reassurance under the products — it is the product, and a section that answers a closing
 * objection is in the wrong place when it is the thing being sold.
 *
 * The developer section is no longer on this page. It sat between the vault and the close —
 * prime space addressed to an audience that does not pay — on a homepage whose job is to route a
 * buyer. /builders still exists, is still linked from the nav and the footer, and lost nothing.
 *
 * `HowItWorks` — the vault block, "Your deposit is never the prize" — came off this page on
 * 30 August 2026, in the sweep the Master ordered. It was the last thing on the front door selling
 * a product whose interface was retired on 25 August: three steps written as an invitation, and a
 * call to action pointing at /sponsor, which the same sweep retired. Archived complete at
 * operations/archive/2026-08-30-hub-vault-sweep/components/home/HowItWorks.tsx.
 *
 * `Provenance` takes its slot and its figures. It is not a replacement in kind — it answers two of
 * the four things the Master named that day ("our security steps", "ProtocolX data"), both of
 * which the front door had no block for at all. The vault's three real figures move into it
 * unchanged, under a heading that says what they measure and with no button beside them: a record
 * rather than an invitation. `Mission`, the vault's argument, left /protocol in the same sweep and
 * is archived beside HowItWorks.
 *
 * All four of the Master's asks now have a block on this page: verification (Hero and
 * VerificationPractice), security and on-chain data (Provenance), social (Social).
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
