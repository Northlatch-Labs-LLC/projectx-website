#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

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
