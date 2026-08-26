#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

const SHIPPED_DIRS = ['app', 'components', 'lib', 'middleware.ts', 'proxy.ts'];
const EXT = /\.(tsx?|mjs|js)$/;
const EXEMPT = /(^|\/)(__tests__|__fixtures__)\/|\.(test|spec)\.[tj]sx?$/;

const PRIVATE_HOST = new RegExp(
  [
    String.raw`[a-z0-9-]+\.ts\.net`,

    String.raw`(?<![\w.-])(?!env\.local)[a-z0-9-]+\.local\b`,
    String.raw`\b10(\.\d{1,3}){3}\b`,
    String.raw`\b192\.168(\.\d{1,3}){2}\b`,
    String.raw`\b172\.(1[6-9]|2\d|3[01])(\.\d{1,3}){2}\b`,
    String.raw`\b100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])(\.\d{1,3}){2}\b`,
  ].join('|'),
  'i',
);

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
