// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { SNAPSHOT } from './snapshot';
import { largestPrize, totalPaidToWinners, uniqueWinners } from './derive';
import { formatCount, formatSui, formatUsdc } from './format';
import type { PoolState, SettlementRecord } from './types';

const REVALIDATE_SECONDS = 60;

const TIMEOUT_MS = 4_000;

// Never rename either to NEXT_PUBLIC_: that ships the daemon's hostname and the API key in the
// client bundle.
//
// Required, with no loopback fallback. Unconfigured and unreachable are different conditions and
// this file must not collapse them: a daemon that is *down* is a runtime fact the page handles
// honestly, falling back to the snapshot and rendering "Last verified …" through LiveBadge. A
// daemon whose address was never supplied is a deployment mistake, and defaulting it to loopback
// turned that mistake into the same quiet outcome — an environment missing this variable would
// serve the baked snapshot forever, correctly badged, with nothing anywhere reporting that no
// daemon had ever been configured. The build stops instead.
if (!process.env.PROTOCOL_API_URL) {
  throw new Error(
    'PROTOCOL_API_URL is not set. The site refuses to build without it rather than defaulting to ' +
      'loopback, which would render the baked snapshot indefinitely — see lib/stats.ts.',
  );
}
const API_BASE = process.env.PROTOCOL_API_URL.replace(/\/$/, '');
const API_KEY = process.env.PROTOCOL_API_KEY ?? '';

/**
 * Cloudflare Access service token.
 *
 * When the daemon is published through a Cloudflare Tunnel, Access rejects anything without
 * this pair at the edge — before the request reaches the host at all. Sent only when both
 * halves are present, so the same code keeps working against a daemon on loopback.
 *
 * Getting this wrong is quiet rather than loud: `get()` returns null on any non-OK response
 * and the page falls back to the baked snapshot, so the site renders successfully with stale
 * figures. Worth checking `live` on the rendered page rather than trusting that it loaded.
 */
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
  /**
   * The same two figures as numbers, for code that has to compare rather than print.
   *
   * `principal` and `depositors` above are display strings — `formatSui` and `formatCount` have
   * already applied grouping separators and rounding to them. Comparing one of those against a
   * threshold compares text, which typechecks as string vs number and fails, or silently does the
   * wrong thing wherever the types are looser. A formatted value is not a measurement.
   */
  principalSui: number;
  depositorCount: number;
}

function shape(pool: PoolState, settlements: SettlementRecord[], live: boolean): SiteStats {
  return {
    principal: formatSui(pool.totalPrincipalMist, 0),
    paidToWinners: formatUsdc(totalPaidToWinners(settlements), 2),
    biggestPrize: formatUsdc(largestPrize(settlements), 2),
    depositors: formatCount(pool.activeDepositors),
    // Both arrive from the API as strings — u64 does not survive JSON as a number. NaN is floored
    // to 0 so an unreadable figure withholds the tile rather than displaying one; a threshold that
    // opens on unparseable input is the wrong way round.
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
