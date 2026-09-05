// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
export interface PoolConfig {
  stakingFeeBps: number;
  spreadBps: number;
  earlyExitFeeBps: number;
  epochDurationMs: string;
  maturityPeriodMs: string;
  maxSlippageBps: number;
  minDepositMist: string;
  liquidityBufferBps: number;
  validator: string;
}

export interface PoolState {
  poolId: string;
  epochId: string;
  epochEndsAtMs: string;
  phase: number;
  phaseName: string;
  depositsPaused: boolean;
  activeDepositors: string;
  totalPrincipalMist: string;
  stakedPrincipalMist: string;
  liquidMist: string;
  prizeSuiMist: string;
  prizeCoinType: string;
  prizeDecimals: number;
  priceFeedId: string;
  yieldHealth: {
    suiEpochsSinceYield: number | null;
    thresholdSuiEpochs: number;
    consecutiveZeroYieldHarvests: number;
    status: 'normal' | 'anomalous' | 'unknown';
  };
  config: PoolConfig;
}

export interface Treasury {
  treasuryId: string;
  streamA: { availableMist: string; lifetimeMist: string };
  streamB: {
    availableBaseUnits: string;
    lifetimeBaseUnits: string;
    coinType: string;
    decimals: number;
  };
}

export interface SettlementRecord {
  epochId: string;
  winner: string;
  suiConvertedMist: string;
  grossOut: string;
  streamBFee: string;
  winnerPayout: string;
  realisedSlippageBps: number;
  settledAt: string;
  txDigest: string;
}

export interface YieldBreakdown {
  oracle: {
    feedId: string;
    spotPrice: string;
    priceScaled1e18: string;
    sampleAgeMs: string;
    dispersionBps: number;
    bandBps: number;
    isFresh: boolean;
    isWithinVariance: boolean;
    observedAtMs: string;
  };
  conversion: {
    prizeSuiMist: string;
    oracleFairValue: string;
    spreadBps: number;
    effectiveRate: string;
    streamBFeeEstimate: string;
    winnerPayoutEstimate: string;
    prizeDecimals: number;
  };
  revenue: { stakingFeeBps: number; note?: string };
}

export interface ActivityEvent {
  kind: string;
  txDigest: string;
  eventSeq: string;
  timestampMs: string;
  sender: string;
  epochId: string | null;
  fields: Record<string, string>;
}

export interface PrizeContribution {
  contributor: string;
  amountMist: string;
  epochId: string;
  timestampMs: string;
  txDigest: string;
}

export interface ProtocolSnapshot {
  live: boolean;
  capturedAt: string;
  pool: PoolState;
  treasury: Treasury;
  settlements: SettlementRecord[];
}
