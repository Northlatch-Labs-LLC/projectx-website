// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { SettlementRecord } from './types';

export const SUGGESTED_MIN_CONTRIBUTION_SUI = 0.1;

/**
 * Depth of the stake ladder — the number of tranches of staggered age the pool stakes in.
 *
 * This was typed as the word "six" into prose on /blueprints and separately as a default argument
 * in LadderDiagram, two copies neither of which knew about the other. Both now read from here.
 *
 * It is a constant rather than a config read because the pool config carries no tranche count.
 * Tranche MATURITY does come from config — `maturityPeriodMs`, rendered through
 * `formatDuration` — and every surface quoting it must read it from there rather than restating
 * it in epochs, which is how /protocol and /blueprints came to say "six complete Sui epochs"
 * beside a parameter tile rendering the same field as seven days.
 */
export const LADDER_DEPTH = 6;

export function totalPaidToWinners(settlements: SettlementRecord[]): bigint {
  return settlements.reduce((sum, record) => sum + BigInt(record.winnerPayout || '0'), 0n);
}

export function largestPrize(settlements: SettlementRecord[]): bigint {
  return settlements.reduce((max, record) => {
    const payout = BigInt(record.winnerPayout || '0');
    return payout > max ? payout : max;
  }, 0n);
}

export function uniqueWinners(settlements: SettlementRecord[]): number {
  return new Set(settlements.map((record) => record.winner)).size;
}

export const PHASES = [
  {
    id: 0,
    name: 'OPEN',
    title: 'Open',
    detail: 'Deposits and withdrawals are accepted. Yield accrues on the stake ladder.',
  },
  {
    id: 1,
    name: 'AWAITING_DRAW',
    title: 'Draw',
    detail: 'The epoch has closed. A winner is selected, weighted by stake.',
  },
  {
    id: 2,
    name: 'AWAITING_SWAP',
    title: 'Price check',
    detail: 'The oracle is read and the conversion rate is bounded before any swap.',
  },
  {
    id: 3,
    name: 'SWAP_IN_FLIGHT',
    title: 'Settle',
    detail: 'The prize is converted through the DEX and paid to the winner in USDC.',
  },
] as const;
