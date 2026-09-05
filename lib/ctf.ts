// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
export type Difficulty = 'Warm-up' | 'Standard' | 'Hard' | 'Capstone';
export type Category = 'Access control' | 'Economic' | 'Oracle & MEV' | 'Resource' | 'Invariant';

export interface Challenge {
  id: string;
  finding: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  points: number;
  premise: string;
  objective: string;
  lesson: string;
}

export const TARGET = {
  configured: true,
  network: 'Sui mainnet',
  label: 'ProjectX v1.0 · retired in-situ deployment',
  packageId: '0xe338cb78badd67607b64c62661534572248a23500503c7e65f56bdba68e71952',
  poolId: '0x88cb9ac81e1ead1cc5cba24c69732044c835af2a8b4733f24180b50534b0fcd2',
  treasuryId: '0x5db548b3616d43833cdecf7a91b8f78e820182aaac1ffa512589c715207624af',
  rpcUrl: 'https://fullnode.mainnet.sui.io',
  explorerBaseUrl: 'https://suiscan.xyz/mainnet',
  submissionUrl: '',
} as const;

export function isCtfConfigured(): boolean {
  return TARGET.configured && TARGET.packageId.length > 0 && TARGET.poolId.length > 0;
}

export const OUT_OF_SCOPE_LIVE_POOL =
  '0x0742576b87852b237ac688dd25ad7e390a30d8ff0c6a34666afa8d0d374766c9';

export const SCOPE = {
  inScope: [
    'The retired v1.0 package and pool listed above, and the objects they own.',
    'The v1.0 Move logic: deposits, withdrawals, the draw, settlement, the oracle breaker.',
    'Anything you can make true on chain by calling those contracts from your own wallet.',
  ],
  outOfScope: [
    'The live v1.0.1 pool and its treasury. Findings there are real — disclose, do not exploit.',
    'Any wallet or address that is not yours, on any network.',
    'Any deployment other than the retired v1.0 range named on this page.',
    'The daemon, the read API, this website, and any RPC provider — infrastructure, not protocol.',
    'Social engineering, phishing, and denial-of-service against shared services.',
  ],
} as const;

export const CHALLENGES: Challenge[] = [
  {
    id: 'late-ticket',
    finding: 'F-02',
    title: 'The late ticket',
    category: 'Access control',
    difficulty: 'Warm-up',
    points: 100,
    premise:
      'v1.0 gated draw eligibility on a wall-clock timestamp. A deposit made in the closing seconds of an epoch was eligible for that epoch’s draw — a prize it contributed nothing to funding.',
    objective:
      'Win an epoch with principal that entered after that epoch’s yield was already earned.',
    lesson:
      'v1.0.1 indexes eligibility by epoch number, not by clock: a deposit in epoch N cannot win until N+2. Time-based gates are manipulable; the epoch counter is not.',
  },
  {
    id: 'missing-gate',
    finding: 'F-04',
    title: 'The missing gate',
    category: 'Access control',
    difficulty: 'Warm-up',
    points: 100,
    premise:
      'Every governance entry point checked an object version before acting — except one. The treasury sweep path shipped without the guard the others all had.',
    objective:
      'Reach the sweep path on a treasury whose version the other entry points would have rejected.',
    lesson:
      'v1.0.1 gives the treasury a version and asserts it first in the sweep, closing the single entry point that lacked one. A guard that is on every function but one is on no function that matters.',
  },
  {
    id: 'second-address',
    finding: 'F-07',
    title: 'The second address',
    category: 'Access control',
    difficulty: 'Warm-up',
    points: 100,
    premise:
      'The permissionless draw removed its own caller from the winner set, and the comment above it claimed that this removed the incentive to grind entirely. The filter compares the caller against each slot’s beneficiary — and a depositor chooses their own beneficiary.',
    objective:
      'Win a permissionless draw that you triggered yourself, from a pool where the exclusion was supposed to make that impossible.',
    lesson:
      'v1.0.1 deletes the exclusion rather than repairing it. What actually stops grinding is that the draw is an `entry` function: Sui will not compose it, so a caller cannot read the outcome and abort on a loss. The exclusion was decoration on a defence that was already sound — and a filter keyed on a field the attacker sets was never filtering anything.',
  },
  {
    id: 'one-mist',
    finding: 'F-16',
    title: 'One MIST',
    category: 'Economic',
    difficulty: 'Standard',
    points: 250,
    premise:
      'Prize funding is permissionless and unbounded below. The rollover safety valve only triggers when the prize is exactly zero — so a single MIST of funding commits the pool to a full settlement cycle it may be unable to complete.',
    objective:
      'Drive the pool into its settlement phase for a prize too small to clear the circuit breaker’s floor.',
    lesson:
      'The fix replaces the zero-check with a minimum drawable prize: dust accumulates harmlessly until it is worth drawing. A safety valve keyed on exact zero is a safety valve one MIST defeats.',
  },
  {
    id: 'long-loop',
    finding: 'F-06',
    title: 'The long loop',
    category: 'Resource',
    difficulty: 'Standard',
    points: 250,
    premise:
      'The harvest iterates every stake object the pool holds. v1.0 placed no ceiling on how many there could be, so the loop’s gas cost was attacker-influenced and unbounded.',
    objective:
      'Make the pool hold enough stake objects that a harvest cannot complete within a block’s gas.',
    lesson:
      'v1.0.1 caps the object count and has the harvest restake *skip* at the cap rather than abort — bounding the loop without ever bricking the very path the bound protects.',
  },
  {
    id: 'settlers-spread',
    finding: 'F-03',
    title: 'The settler’s spread',
    category: 'Oracle & MEV',
    difficulty: 'Hard',
    points: 500,
    premise:
      'Settlement was permissionless. Whoever ran it could swap the prize at market, hand the contract only the oracle floor, and keep the difference — up to the full slippage bound, taken from the winner, every epoch.',
    objective:
      'Settle an epoch you did not win and end the transaction holding value that should have gone to the winner.',
    lesson:
      'v1.0.1 gates settlement behind an operator capability, with a permissionless fallback that opens only after a grace window. Liveness stays open; routine extraction is closed.',
  },
  {
    id: 'zero-means-zero',
    finding: 'F-09',
    title: 'Zero means zero',
    category: 'Oracle & MEV',
    difficulty: 'Hard',
    points: 500,
    premise:
      'The circuit breaker checked variance as a ratio to the mean. With a mean of zero, both volatility checks divided into zero and passed trivially — a reading that should have been rejected sailed through.',
    objective:
      'Settle against an oracle attestation that the breaker was supposed to refuse.',
    lesson:
      'v1.0.1 asserts a positive mean before any ratio is computed. A validity check that is itself undefined at the boundary is not a check at the boundary.',
  },
  {
    id: 'the-invariant',
    finding: '—',
    title: 'The invariant',
    category: 'Invariant',
    difficulty: 'Capstone',
    points: 1000,
    premise:
      'One equation holds across the whole protocol: liquid + staked == total principal. It is enforced by the Move type system — no function taking an admin capability can reach principal at all. This challenge is not a known bug. It is the wall.',
    objective:
      'Make the invariant false by any path. Withdraw more than you put in, or leave the books unable to return everyone’s principal.',
    lesson:
      'If you solve this on any deployment, including the retired one, stop and disclose it privately. It would be the most important finding in the protocol’s history, and it is worth far more as a report than as a flag.',
  },
];

export function totalPoints(): number {
  return CHALLENGES.reduce((sum, challenge) => sum + challenge.points, 0);
}

export const DIFFICULTY_ORDER: Difficulty[] = ['Warm-up', 'Standard', 'Hard', 'Capstone'];
