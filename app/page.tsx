// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import { Signature } from '@/components/ui/Signature';
import { Hero } from '@/components/home/Hero';
import { InterfacesPreview } from '@/components/home/InterfacesPreview';
import { Social } from '@/components/home/Social';
import { Organisers } from '@/components/home/Organisers';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Mission } from '@/components/home/Mission';
import { CtaBand } from '@/components/home/CtaBand';

/**
 * One product per block, in the order a visitor can act on them.
 *
 * The page used to interleave them. The hero introduced all three, the grid below introduced all
 * three again in nearly the same words, and then three consecutive sections about the vault ran
 * under headlines that read as the raffle. Someone who arrived wanting a name found it named twice
 * and explained nowhere; someone who arrived for the vault read its pitch three times without ever
 * being told which product they were reading about.
 *
 *   Hero        the offer, and the one action that completes in this session
 *   Interfaces  the router — four products, four destinations
 *   Social      ── the flagship, first by operator decision (18 Aug 2026): supporting a
 *                  creator without spending anything, explained in full on /social
 *   Names       ── everything about names, including what it costs
 *   Organisers  ── everything about draws, aimed at who actually pays for them
 *   HowItWorks  ── the vault mechanism
 *   Mission     ── the vault argument
 *   CtaBand     close
 *
 * The developer section is no longer on this page. It sat between the vault and the close —
 * prime space addressed to an audience that does not pay — on a homepage whose job is to route a
 * buyer. /builders still exists, is still linked from the nav and the footer, and lost nothing.
 *
 * Names before draws before vault is deliberate: it is the order of how quickly each can turn a
 * stranger into revenue, not the order in which they were built.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <InterfacesPreview />

      <Social />
      <Organisers />
      <HowItWorks />
      <Mission />

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Signature />
      </div>

      <CtaBand />
    </>
  );
}
