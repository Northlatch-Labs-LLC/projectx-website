#!/usr/bin/env node

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
