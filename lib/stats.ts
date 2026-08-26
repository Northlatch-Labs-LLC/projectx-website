
import { SNAPSHOT } from './snapshot';
import { largestPrize, totalPaidToWinners, uniqueWinners } from './derive';
import { formatCount, formatSui, formatUsdc } from './format';
import type { PoolState, SettlementRecord } from './types';

const REVALIDATE_SECONDS = 60;

const TIMEOUT_MS = 4_000;

if (!process.env.PROTOCOL_API_URL) {
  throw new Error(
    'PROTOCOL_API_URL is not set. The site refuses to build without it rather than defaulting to ' +
      'loopback, which would render the baked snapshot indefinitely — see lib/stats.ts.',
  );
}
const API_BASE = process.env.PROTOCOL_API_URL.replace(/\/$/, '');
const API_KEY = process.env.PROTOCOL_API_KEY ?? '';

const CF_ACCESS_CLIENT_ID = process.env.CF_ACCESS_CLIENT_ID ?? '';
const CF_ACCESS_CLIENT_SECRET = process.env.CF_ACCESS_CLIENT_SECRET ?? '';

const accessHeaders: Record<string, string> =
  CF_ACCESS_CLIENT_ID && CF_ACCESS_CLIENT_SECRET
    ? {
        'cf-access-client-id': CF_ACCESS_CLIENT_ID,
        'cf-access-client-secret': CF_ACCESS_CLIENT_SECRET,
      }
    : {};

async function get<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        accept: 'application/json',
        ...(API_KEY ? { authorization: `Bearer ${API_KEY}` } : {}),
        ...accessHeaders,
      },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export interface SiteStats {
  principal: string;
  paidToWinners: string;
  biggestPrize: string;
  depositors: string;
  draws: number;
  winners: number;
  lossesEver: string;
  live: boolean;
  capturedOn: string;

  principalSui: number;
  depositorCount: number;
}

function shape(pool: PoolState, settlements: SettlementRecord[], live: boolean): SiteStats {
  return {
    principal: formatSui(pool.totalPrincipalMist, 0),
    paidToWinners: formatUsdc(totalPaidToWinners(settlements), 2),
    biggestPrize: formatUsdc(largestPrize(settlements), 2),
    depositors: formatCount(pool.activeDepositors),

    principalSui: Number(pool.totalPrincipalMist) / 1e9 || 0,
    depositorCount: Number(pool.activeDepositors) || 0,
    draws: settlements.length,
    winners: uniqueWinners(settlements),
    lossesEver: '0',
    live,
    capturedOn: new Date(SNAPSHOT.capturedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  };
}

export async function getStats(): Promise<SiteStats> {
  const [pool, history] = await Promise.all([
    get<PoolState>('/pool'),
    get<{ epochs: SettlementRecord[] }>('/pool/history?limit=100'),
  ]);

  if (!pool) return shape(SNAPSHOT.pool, SNAPSHOT.settlements, false);

  return shape(pool, history?.epochs ?? SNAPSHOT.settlements, true);
}
