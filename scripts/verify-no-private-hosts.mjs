#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
/**
 * Fail when shipped source carries an address that only worked before this went to the cloud.
 *
 * The defect this exists for: `lib/links.ts` defaulted `DAPP_URL` to a `.ts.net` tailnet hostname —
 * the dashboard's address before cloud hosting. Production overrode the variable, so the live site
 * was clean and nothing ever complained. The stale value sat in the repository for weeks, one unset
 * environment variable away from publishing a private machine name in the client bundle, and it
 * would have shipped silently on a page that rendered perfectly.
 *
 * Fixing that downstream — setting the variable in each environment — leaves the source wrong and
 * makes every new environment a fresh chance to leak it. This checks the artefact instead.
 *
 *     node scripts/verify-no-private-hosts.mjs
 *
 * Source-only. No network, so there is no SKIP branch and it cannot pass for the wrong reason.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

/**
 * What ships to a browser. Deliberately not `scripts/` or any `test`/`spec` file: a build script
 * talking to loopback is correct, and a fixture asserting `127.0.0.1` is the test doing its job.
 * Widening this to the whole repository would produce noise, and a check that cries wolf is one
 * people learn to skip.
 */
const SHIPPED_DIRS = ['app', 'components', 'lib', 'middleware.ts', 'proxy.ts'];
const EXT = /\.(tsx?|mjs|js)$/;
const EXEMPT = /(^|\/)(__tests__|__fixtures__)\/|\.(test|spec)\.[tj]sx?$/;

/**
 * Addresses that identify a machine or a private network. Any of these in shipped source is a
 * defect regardless of whether a variable currently masks it.
 *
 * 100.64.0.0/10 is carrier-grade NAT, which is the range Tailscale assigns — the numeric form of
 * exactly the hostname that caused this.
 */
const PRIVATE_HOST = new RegExp(
  [
    String.raw`[a-z0-9-]+\.ts\.net`,
    // `(?<![\w.-])` keeps this off `.env.local`, which is a filename this repository names in
    // prose and in error messages. Matching it reported a private host inside the very sentence
    // telling someone which file to set the variable in.
    String.raw`(?<![\w.-])(?!env\.local)[a-z0-9-]+\.local\b`,
    String.raw`\b10(\.\d{1,3}){3}\b`,
    String.raw`\b192\.168(\.\d{1,3}){2}\b`,
    String.raw`\b172\.(1[6-9]|2\d|3[01])(\.\d{1,3}){2}\b`,
    String.raw`\b100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])(\.\d{1,3}){2}\b`,
  ].join('|'),
  'i',
);

/**
 * A loopback address reached by falling back — `?? 'http://localhost:8080'`, `|| "127.0.0.1"`.
 *
 * Loopback is not secret, so it is not the same defect as a private hostname; it is the same
 * *mechanism*. An unset variable in production silently degrades to a read that can never succeed,
 * which is how a page ends up showing a stale snapshot instead of saying it could not measure
 * anything. Writing `http://localhost:4000` in a comment or a docstring is fine and is not matched.
 */
const LOOPBACK_FALLBACK =
  /(\?\?|\|\|)\s*['"`]https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?[^'"`]*['"`]/i;

function* walk(target) {
  if (!existsSync(target)) return;
  if (statSync(target).isFile()) {
    if (EXT.test(target)) yield target;
    return;
  }
  for (const entry of readdirSync(target)) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const full = join(target, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (EXT.test(entry)) yield full;
  }
}

const problems = [];
let filesScanned = 0;

for (const dir of SHIPPED_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file);
    if (EXEMPT.test(rel)) continue;
    filesScanned += 1;
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        const trimmed = line.trim();
        // Prose explaining why an address is absent must not be read as the address being present.
        const isComment =
          trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*');
        if (isComment) return;

        const priv = line.match(PRIVATE_HOST);
        if (priv) {
          problems.push({
            kind: 'private host',
            where: `${rel}:${i + 1}`,
            detail: priv[0],
          });
        }
        const loop = line.match(LOOPBACK_FALLBACK);
        if (loop) {
          problems.push({
            kind: 'loopback fallback',
            where: `${rel}:${i + 1}`,
            detail: loop[0].replace(/\s+/g, ' '),
          });
        }
      });
  }
}

if (problems.length > 0) {
  console.log(red(`  FAIL  shipped source carries ${problems.length} pre-production address(es)`));
  for (const p of problems) {
    console.log(`        ${p.kind.padEnd(18)} ${p.where}`);
    console.log(`        ${''.padEnd(18)} ${p.detail}`);
  }
  console.log('');
  console.log('        Take the value out of the source. If it is required, throw naming the');
  console.log('        variable; if it is optional, default to null and render nothing.');
  process.exit(1);
}

console.log(green(`  ok    no private or loopback addresses in ${filesScanned} shipped file(s)`));
