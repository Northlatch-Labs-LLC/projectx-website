// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
/**
 * SuiNS registration and renewal prices — one table, mirrored from chain.
 *
 * Three surfaces used to state these independently: the hero said a name "costs $10 a year", the
 * search box said "$10 a year for five characters or more", and the price table said $10 then
 * $5/yr. The first two describe a name that never gets cheaper to hold; the third is what SuiNS
 * actually charges. All three now derive from this file, so the disagreement cannot come back by
 * editing one of them.
 *
 * PROVENANCE. These are not chosen, quoted from documentation, or inferred from a screenshot. They
 * were read from SuiNS on Sui mainnet on 14 August 2026 via the SDK's own accessors:
 *
 *     getPriceList()          [3,3] 500000000   [4,4] 100000000   [5,63] 10000000
 *     getRenewalPriceList()   [3,3] 150000000   [4,4]  50000000   [5,63]  5000000
 *
 * Mysten's documentation examples show different figures and are explicitly labelled example
 * output rather than a price commitment, so the chain is the authority here and the docs are not.
 *
 * WHY THIS NEEDS A DRIFT CHECK. SuiNS pricing is on-chain config and the DAO can change it. A
 * mirror that nobody checks is silent when it goes stale, and stale here means the site quotes a
 * price the registrar will not honour. `scripts/verify-suins-prices.mjs` re-reads the lists above
 * and fails `npm run check` when this table disagrees with them.
 *
 * The hub renders these statically on purpose rather than reading the chain per request: it is a
 * marketing site where CDN caching is the point, and a per-request chain read would remove static
 * generation from the page for a figure that changes at most a few times a year. The check is what
 * makes that trade safe. The registrar (now at weir.social/names — `suins.protocolx.io` is retired,
 * see `NAMES_URL` in lib/links.ts) quotes the buyer a live figure before anything is signed, which
 * is where a live read actually belongs.
 */

/**
 * USDC micros — the unit the chain returns. Integers, because money is never a float; $500 is
 * 500_000_000 and dividing it to a Number for display happens once, at the edge, in `formatUsd`.
 */
export interface SuinsTier {
  /** Inclusive label-length bounds, exactly as the chain keys the table. */
  minChars: number;
  maxChars: number;
  registerUsdcMicros: number;
  renewUsdcMicros: number;
}

export const SUINS_TIERS: readonly SuinsTier[] = [
  { minChars: 3, maxChars: 3, registerUsdcMicros: 500_000_000, renewUsdcMicros: 150_000_000 },
  { minChars: 4, maxChars: 4, registerUsdcMicros: 100_000_000, renewUsdcMicros: 50_000_000 },
  { minChars: 5, maxChars: 63, registerUsdcMicros: 10_000_000, renewUsdcMicros: 5_000_000 },
] as const;

/** The tier a buyer arriving from the hero lands in — the cheapest, and the one both CTAs quote. */
export const COMMON_TIER = SUINS_TIERS[SUINS_TIERS.length - 1];

/**
 * Whole dollars when the price is whole, which every current tier is. The fractional branch is not
 * decoration: the DAO can set any integer number of micros, and a tier priced at $10.50 must not
 * silently render as "$10".
 */
export function formatUsd(usdcMicros: number): string {
  const dollars = usdcMicros / 1_000_000;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

/** "$10 for the first year, then $5 a year" — the sentence all three surfaces now share. */
export function priceSentence(tier: SuinsTier = COMMON_TIER): string {
  return `${formatUsd(tier.registerUsdcMicros)} for the first year, then ${formatUsd(
    tier.renewUsdcMicros,
  )} a year`;
}

export function tierLabel(tier: SuinsTier): string {
  if (tier.minChars === tier.maxChars) return `${tier.minChars} characters`;
  return `${tier.minChars} or more`;
}
