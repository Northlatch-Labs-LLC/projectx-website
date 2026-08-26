
export interface SuinsTier {

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

export const COMMON_TIER = SUINS_TIERS[SUINS_TIERS.length - 1];

export function formatUsd(usdcMicros: number): string {
  const dollars = usdcMicros / 1_000_000;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

export function priceSentence(tier: SuinsTier = COMMON_TIER): string {
  return `${formatUsd(tier.registerUsdcMicros)} for the first year, then ${formatUsd(
    tier.renewUsdcMicros,
  )} a year`;
}

export function tierLabel(tier: SuinsTier): string {
  if (tier.minChars === tier.maxChars) return `${tier.minChars} characters`;
  return `${tier.minChars} or more`;
}
