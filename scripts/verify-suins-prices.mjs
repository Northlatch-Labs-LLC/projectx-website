#!/usr/bin/env node

import { SuiGrpcClient } from '@mysten/sui/grpc';
import { SuinsClient } from '@mysten/suins';
import { SUINS_TIERS } from '../lib/suins-pricing.ts';

const ENDPOINT = process.env.SUI_GRPC_URL ?? 'https://fullnode.mainnet.sui.io';

const red = (s) => `[31m${s}[0m`;
const green = (s) => `[32m${s}[0m`;
const yellow = (s) => `[33m${s}[0m`;

function indexByRange(list) {
  const out = new Map();
  const entries = list instanceof Map ? [...list.entries()] : Object.entries(list ?? {});
  for (const [key, value] of entries) {
    const parts = Array.isArray(key) ? key : String(key).split(',');
    if (parts.length !== 2) continue;
    const min = Number(parts[0]);
    const max = Number(parts[1]);
    if (!Number.isFinite(min) || !Number.isFinite(max)) continue;
    out.set(`${min},${max}`, Number(value));
  }
  return out;
}

let register;
let renew;
try {
  const client = new SuiGrpcClient({ network: 'mainnet', baseUrl: ENDPOINT });
  const suins = new SuinsClient({ client, network: 'mainnet' });
  register = indexByRange(await suins.getPriceList());
  renew = indexByRange(await suins.getRenewalPriceList());
} catch (error) {
  console.log(yellow(`  SKIP  could not reach SuiNS at ${ENDPOINT} — ${error.message}`));
  console.log('        The mirror was NOT checked. This is not a pass.');
  process.exit(0);
}

if (register.size === 0 || renew.size === 0) {
  console.log(red('  FAIL  SuiNS returned no price tiers at all.'));
  console.log('        Refusing to report a clean mirror against an empty authority.');
  process.exit(1);
}

const problems = [];

for (const tier of SUINS_TIERS) {
  const key = `${tier.minChars},${tier.maxChars}`;
  const onChainRegister = register.get(key);
  const onChainRenew = renew.get(key);

  if (onChainRegister === undefined || onChainRenew === undefined) {
    problems.push(`tier ${key} is in the mirror but SuiNS has no such tier`);
    continue;
  }
  if (onChainRegister !== tier.registerUsdcMicros) {
    problems.push(
      `tier ${key} register: mirror ${tier.registerUsdcMicros}, SuiNS ${onChainRegister}`,
    );
  }
  if (onChainRenew !== tier.renewUsdcMicros) {
    problems.push(`tier ${key} renew: mirror ${tier.renewUsdcMicros}, SuiNS ${onChainRenew}`);
  }
}

for (const key of register.keys()) {
  const [min, max] = key.split(',').map(Number);
  if (!SUINS_TIERS.some((t) => t.minChars === min && t.maxChars === max)) {
    problems.push(`SuiNS has tier ${key} which the mirror does not list`);
  }
}

if (problems.length > 0) {
  console.log(red(`  FAIL  the hub's SuiNS price table no longer matches SuiNS (${problems.length})`));
  for (const p of problems) console.log(`        ${p}`);
  console.log('');
  console.log('        Update lib/suins-pricing.ts, including the PROVENANCE block, and re-run.');
  process.exit(1);
}

console.log(
  green(`  ok    SuiNS price mirror matches chain — ${SUINS_TIERS.length} tier(s) compared`),
);
for (const tier of SUINS_TIERS) {
  console.log(
    `        ${String(tier.minChars).padStart(2)}-${String(tier.maxChars).padEnd(2)} chars   ` +
      `register ${String(tier.registerUsdcMicros).padStart(10)}   ` +
      `renew ${String(tier.renewUsdcMicros).padStart(10)}`,
  );
}
