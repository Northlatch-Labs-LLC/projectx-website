#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
/**
 * Resolve every internal href/src in site/*.html to a real file, and every in-page
 * fragment to a real id. External URLs are checked for syntax, not fetched — a link
 * that resolves today can rot tomorrow, and that class is caught by the review pass,
 * not by a checker that pretends the network is static.
 *
 *     node scripts/check-links.mjs
 *
 * Source-only. Exits 1 listing every dead reference.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');

const pages = readdirSync(SITE).filter((f) => f.endsWith('.html'));

function routeToFile(route) {
  let r = route.split('#')[0].split('?')[0];
  if (r === '') r = '/';
  const candidates = r === '/' ? ['index.html'] : [r.replace(/^\//, '') + '.html', r.replace(/^\//, '')];
  for (const c of candidates) {
    const full = join(SITE, c);
    if (existsSync(full) && statSync(full).isFile()) return full;
  }
  return null;
}

const ids = new Map();
for (const page of pages) {
  const html = readFileSync(join(SITE, page), 'utf8');
  const set = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  ids.set(page, set);
}

const dead = [];
const checked = new Set();

for (const page of pages) {
  const html = readFileSync(join(SITE, page), 'utf8');
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('data:')) continue;
    if (/^https?:\/\//.test(ref)) continue; // external: syntax only
    if (ref.startsWith('javascript:')) { dead.push(`${page}: javascript: URL "${ref}"`); continue; }
    const key = page + '|' + ref;
    if (checked.has(key)) continue;
    checked.add(key);

    if (ref.startsWith('#')) {
      const frag = ref.slice(1);
      if (!ids.get(page).has(frag)) dead.push(`${page}: fragment "${ref}" has no matching id`);
      continue;
    }

    if (ref.startsWith('/')) {
      const [path, frag] = ref.split('#');
      const file = routeToFile(path || '/');
      if (!file) { dead.push(`${page}: "${ref}" resolves to nothing in site/`); continue; }
      if (frag) {
        const targetPage = file.split(sep).pop();
        if (!ids.has(targetPage) || !ids.get(targetPage).has(frag)) {
          dead.push(`${page}: "${ref}" — id "${frag}" not found in ${targetPage}`);
        }
      }
      continue;
    }

    // relative: resolve against the page's own directory (site/ itself)
    const [path, frag] = ref.split('#');
    const resolved = normalize(join(SITE, path));
    if (!resolved.startsWith(normalize(SITE) + sep)) { dead.push(`${page}: "${ref}" escapes site/`); continue; }
    if (!existsSync(resolved)) { dead.push(`${page}: "${ref}" resolves to nothing (${path})`); continue; }
    if (frag && statSync(resolved).isFile()) {
      const targetPage = resolved.split(sep).pop();
      if (targetPage.endsWith('.html') && !ids.get(targetPage)?.has(frag)) {
        dead.push(`${page}: "${ref}" — id "${frag}" not found in ${targetPage}`);
      }
    }
  }
}

if (dead.length > 0) {
  console.error(`check-links: FAIL — ${dead.length} dead reference(s)`);
  for (const d of dead) console.error('  · ' + d);
  process.exit(1);
}
console.log(`check-links: ok — ${checked.size} internal references across ${pages.length} pages resolve`);
