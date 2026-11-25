#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
/**
 * Generate site/llms-full.txt from the shipped HTML, and check site/llms.txt against it.
 *
 * llms.txt is the curated index (hand-written, short, honest). llms-full.txt is the whole
 * corpus: every page's headings and text, tag-stripped, generated — never hand-maintained,
 * because a hand-maintained copy of seventeen pages is a second source of truth that drifts.
 *
 *     node scripts/gen-llms.mjs            # regenerate llms-full.txt, verify llms.txt
 *
 * Source of truth: the HTML in site/. If a page's copy changes, run this again before
 * committing; check.sh fails when the file is stale.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');

const PAGES = readdirSync(SITE).filter((f) => f.endsWith('.html')).sort();

/** Strip script/style blocks, then tags, then collapse whitespace. */
function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi, (m, tag, body) => '\n\n' + '#'.repeat(Number(tag[1])) + ' ' + plain(body) + '\n\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<(p|div|section|article|tr|table|ul|ol|blockquote|dl|dt|dd|figure|figcaption)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;|&#39;/g, "'")
    .replace(/&middot;/g, '·')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&#8599;/g, '↗')
    .replace(/&rarr;/g, '→')
    .replace(/&#9656;/g, '▸')
    .replace(/&[a-z]+;/gi, ' ')
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function plain(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function route(file) {
  return file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, '');
}

let out = '';
for (const file of PAGES) {
  const html = readFileSync(join(SITE, file), 'utf8');
  const title = plain((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || file);
  const body = textOf(html);
  out += `\n\n<!-- ${route(file)} -->\n\n# ${title}\n\n${body}\n`;
}

const header =
`# projectxprotocol.dev — full text

The complete text of https://projectxprotocol.dev, one section per page, generated from
the shipped HTML on 2026-11-25 by scripts/gen-llms.mjs. The curated index is llms.txt.
Addresses, prices and status labels here are the ones the pages themselves carry;
nothing in this file overrides the page it came from.
`;

writeFileSync(join(SITE, 'llms-full.txt'), header + out);
console.log(`llms-full.txt written: ${PAGES.length} pages, ${header.length + out.length} bytes`);

// llms.txt must name a route for every page that exists, and none that doesn't.
// File URLs (llms-full.txt, sitemap.xml, .well-known/*.json|txt) are files, not page
// routes: they are verified by the sitemap/link checks, not by this page-set comparison.
const llms = readFileSync(join(SITE, 'llms.txt'), 'utf8');
const isFileUrl = (r) => /^\/(llms-full\.txt|sitemap\.xml|robots\.txt|llms\.txt|install\.sh)$/.test(r) || r.startsWith('/.well-known/');
const listed = [...llms.matchAll(/\bhttps:\/\/projectxprotocol\.dev(\/[a-z0-9.\-/]*)?\b/g)]
  .map((m) => m[1] || '/')
  .map((r) => r.replace(/\/$/, '') || '/');
const actual = new Set(PAGES.map(route));
const missing = [...actual].filter((r) => !listed.includes(r) && r !== '/404');
const phantom = listed.filter((r) => !isFileUrl(r) && !actual.has(r) && r !== '/');
if (missing.length > 0) console.error(`llms.txt missing routes: ${missing.join(', ')}`);
if (phantom.length > 0) console.error(`llms.txt lists routes that do not exist: ${phantom.join(', ')}`);
if (missing.length || phantom.length) process.exit(1);
console.log('llms.txt route check: ok');
