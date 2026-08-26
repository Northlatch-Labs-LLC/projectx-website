#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
/**
 * Keep a purged host purged.
 *
 * D-114, decided by the operator and executed on 8 August 2026: the token launcher's public
 * instance is not needed and comes down. The Cloudflare record was deleted and the Vercel project
 * removed permanently, taking its domain attachment with it. The launcher's source, tests and
 * testnet deployment record were deliberately kept — only the public hosting was retired.
 *
 * This check defends that decision and does not second-guess it. It asserts one thing: no purged
 * host is advertised from this site.
 *
 * `LAUNCHER_URL` is the mechanism that holds it. It has no default — unset means the card on
 * /interfaces does not render at all — and the reasoning is written above it in `lib/links.ts`: a
 * fallback URL would advertise a host that does not resolve, and a dead link on the front door is
 * worse than no link. That property is load-bearing and was protected only by a comment, which does
 * not fail a build. One `?? 'https://launch.projectxprotocol.dev'` added by somebody tidying a null
 * check would undo it silently, on a page that still renders perfectly.
 *
 *     node scripts/verify-retired-hosts.mjs
 *
 * WHAT THIS DELIBERATELY DOES NOT CHECK. An earlier version of this file also required a
 * `middleware.ts` returning 410 for the purged host. That came from an external audit's
 * recommendation to restore the DNS record and stand up a retirement page for twelve months — which
 * is the opposite of D-114, and not a decision this repository has taken. Serving a 410 would first
 * require re-attaching the domain to a Vercel project, so the code was inert in production anyway.
 * If that decision is ever revisited, it is the operator's to make and D-114 is where it belongs.
 *
 * Source-only. No network, so there is no SKIP branch and it cannot pass for the wrong reason.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

/** Hosts purged under D-113 and D-114. Neither may be linked from this site. */
const PURGED_HOSTS = ['launch.projectxprotocol.dev', 'launch.protocolx.io'];

const SEARCH_DIRS = ['app', 'components', 'lib'];
const SEARCH_EXT = /\.(tsx?|mjs|json)$/;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (SEARCH_EXT.test(entry)) yield full;
  }
}

const problems = [];

// 1. No purged host may appear anywhere a browser could follow it. Occurrences in a comment are the
//    point of the file that records why the host is absent, so they are allowed; the test is the
//    scheme, because that is what makes a string followable.
for (const dir of SEARCH_DIRS) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) continue;
  for (const file of walk(abs)) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      const isComment =
        trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*');
      if (isComment) return;
      for (const host of PURGED_HOSTS) {
        if (line.includes(`//${host}`)) {
          problems.push(`${relative(ROOT, file)}:${i + 1} links to purged host ${host}`);
        }
      }
    });
  }
}

// 2. `LAUNCHER_URL` must stay fail-closed. A default of any kind reinstates the dead link this
//    exists to prevent, so the assertion is on the absence of a fallback, not on its value.
const linksPath = join(ROOT, 'lib', 'links.ts');
if (!existsSync(linksPath)) {
  problems.push('lib/links.ts is missing — LAUNCHER_URL fail-closed default cannot be verified');
} else {
  const source = readFileSync(linksPath, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((l) => !l.trim().startsWith('//'))
    .join('\n');
  const declaration = source.match(/export\s+const\s+LAUNCHER_URL\s*=([^;]*);/);
  if (!declaration) {
    problems.push('lib/links.ts no longer declares LAUNCHER_URL');
  } else if (!/\?\?\s*null/.test(declaration[1])) {
    problems.push(
      `LAUNCHER_URL is no longer fail-closed — expected "?? null", found:${declaration[1].replace(/\s+/g, ' ')}`,
    );
  }
}

if (problems.length > 0) {
  console.log(red(`  FAIL  purged-host check (${problems.length})`));
  for (const p of problems) console.log(`        ${p}`);
  console.log('');
  console.log('        See DECISIONS.md D-113 and D-114. These hosts were taken down deliberately.');
  process.exit(1);
}

console.log(green(`  ok    ${PURGED_HOSTS.length} purged host(s) unlinked, LAUNCHER_URL fail-closed`));
