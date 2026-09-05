#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
/**
 * Regenerate the baked fallback snapshot from the live daemon API.
 *
 * The website renders this when the daemon is unreachable, so it must be real data taken
 * from mainnet rather than plausible-looking placeholders — a fallback that invents numbers
 * is worse than an empty tile. Run it before a deploy:
 *
 *     PROTOCOL_API_URL=http://localhost:8080/api/v1 node scripts/refresh-snapshot.mjs
 *
 * Reads PROTOCOL_API_KEY from the environment when set, so a .env.local already holding the
 * key works with `node --env-file=.env.local scripts/refresh-snapshot.mjs`.
 *
 * Writes `lib/snapshot.json`. Read-only against the protocol: three GETs, nothing else.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const API = (process.env.PROTOCOL_API_URL ?? 'http://localhost:8080/api/v1').replace(/\/$/, '');
const KEY = process.env.PROTOCOL_API_KEY ?? '';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'lib', 'snapshot.json');

async function get(path) {
  const response = await fetch(`${API}${path}`, {
    signal: AbortSignal.timeout(10_000),
    headers: KEY ? { authorization: `Bearer ${KEY}` } : {},
  });
  if (!response.ok) throw new Error(`GET ${path} → ${response.status}`);
  return response.json();
}

const [pool, treasury, history] = await Promise.all([
  get('/pool'),
  get('/pool/treasury'),
  get('/pool/history?limit=25'),
]);

const snapshot = {
  live: false,
  capturedAt: new Date().toISOString(),
  pool,
  treasury,
  settlements: history.epochs ?? [],
};

await writeFile(OUT, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

console.log(
  `snapshot written: epoch ${pool.epochId}, ${pool.activeDepositors} depositors, ` +
    `${snapshot.settlements.length} settlements → ${OUT}`,
);
