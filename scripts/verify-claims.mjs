#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
/**
 * Fail when a corrected claim comes back.
 *
 * Copy that was wrong once tends to return, and it returns through the front door: a design plate,
 * a draft, an audit's suggested wording. Each is written against whatever the site said on the day
 * it was made, so porting one later reinstates every claim fixed in between — and it arrives inside
 * work that is otherwise wanted, which is exactly when nobody re-reads the sentences.
 *
 *     node scripts/verify-claims.mjs                    # scan shipped source
 *     node scripts/verify-claims.mjs path/to/file.html  # scan an external file before porting it
 *
 * The second form is the point: run a plate through this BEFORE adopting it, and the regressions
 * are a list rather than a discovery three weeks later.
 *
 * Source-only. No network, so there is no SKIP branch and it cannot pass for the wrong reason.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

const CONFIG = JSON.parse(readFileSync(join(ROOT, 'config', 'claims-banned.json'), 'utf8'));

if (!Array.isArray(CONFIG.rules) || CONFIG.rules.length === 0) {
  console.log(red('  FAIL  claims-banned.json declares no rules'));
  console.log('        An empty ruleset would pass every file and prove nothing.');
  process.exit(1);
}

/**
 * Collapse the differences that are not differences.
 *
 * JSX splits a sentence over as many lines as prettier decides, so a literal substring search finds
 * nothing while the rendered page reads exactly as before. Apostrophes matter for the same reason:
 * source carries U+2019 in some files and U+0027 in others, and a rule written with one silently
 * stops matching the other. Both are normalised on each side of the comparison.
 */
/**
 * Remove comments before matching.
 *
 * The files that fix a claim are the files that quote it. `lib/suins-pricing.ts` documents why
 * "$10 a year" was wrong, and `lib/links.ts` records that the launcher host was purged — both in
 * prose that never reaches a browser. Matching those reports the correction as the defect, which is
 * the same mistake as reading a plate's README instead of its markup.
 *
 * Only block comments and whole-line `//` are stripped. A trailing `//` is left alone because URLs
 * contain one, and cutting there would delete the code being checked.
 */
function stripComments(text, file) {
  if (/\.html?$/.test(file)) return text.replace(/<!--[\s\S]*?-->/g, '');
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n');
}

function normalise(text) {
  return (
    text
      // Decode before folding. The same sentence reaches this function as a literal U+2019 from a
      // .tsx file, as `&rsquo;` or `&#8217;` from a plate's markup, and as `’` from a string
      // in a script — and a rule written against one form silently stops matching the other two.
      // A ported design plate is precisely where the encoding changes underfoot.
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
      .replace(/&(rsquo|lsquo|apos);/g, "'")
      .replace(/&(ldquo|rdquo|quot);/g, '"')
      .replace(/&(mdash|ndash);/g, '-')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/[‘’ʼ]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, '-')
      .replace(/\s+/g, ' ')
      .toLowerCase()
  );
}

const SHIPPED = ['app', 'components', 'lib'];
const EXT = /\.(tsx?|mjs|js|html|json)$/;
const EXEMPT = /(^|\/)(__tests__|__fixtures__)\/|\.(test|spec)\.[tj]sx?$/;

function* walk(target) {
  if (!existsSync(target)) return;
  if (statSync(target).isFile()) {
    yield target;
    return;
  }
  for (const entry of readdirSync(target)) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const full = join(target, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (EXT.test(entry)) yield full;
  }
}

const explicit = process.argv.slice(2);
const targets = explicit.length > 0 ? explicit : SHIPPED.map((d) => join(ROOT, d));

// The config file names every banned string by definition; scanning it would report itself.
const SELF = [join(ROOT, 'config', 'claims-banned.json'), join(ROOT, 'scripts', 'verify-claims.mjs')];

const hits = [];
let filesScanned = 0;

for (const target of targets) {
  for (const file of walk(target)) {
    if (SELF.includes(file) || EXEMPT.test(relative(ROOT, file))) continue;
    filesScanned += 1;
    const haystack = normalise(stripComments(readFileSync(file, 'utf8'), file));
    for (const rule of CONFIG.rules) {
      for (const pattern of rule.patterns) {
        if (haystack.includes(normalise(pattern))) {
          hits.push({ file, rule, pattern });
        }
      }
    }
  }
}

if (filesScanned === 0) {
  console.log(red('  FAIL  no files were scanned'));
  console.log('        Refusing to report a clean result against nothing.');
  process.exit(1);
}

if (hits.length > 0) {
  const byRule = new Map();
  for (const h of hits) {
    if (!byRule.has(h.rule.id)) byRule.set(h.rule.id, []);
    byRule.get(h.rule.id).push(h);
  }
  console.log(red(`  FAIL  ${hits.length} banned claim(s) across ${byRule.size} rule(s)`));
  for (const [id, group] of byRule) {
    const rule = group[0].rule;
    console.log('');
    console.log(`        ${red(id)}  — removed in ${rule.fixedIn}`);
    console.log(`        why:     ${rule.why}`);
    console.log(`        instead: ${rule.instead}`);
    for (const h of group) {
      const where = h.file.startsWith(ROOT) ? relative(ROOT, h.file) : h.file;
      console.log(`        ${dim('·')} ${where}`);
      console.log(`          ${dim(`"${h.pattern}"`)}`);
    }
  }
  console.log('');
  console.log('        A rule tripping is not a reason to delete it. Check whether the claim');
  console.log('        became true; if it did, say so in the entry and remove it deliberately.');
  process.exit(1);
}

console.log(
  green(`  ok    ${CONFIG.rules.length} claim rule(s) clean across ${filesScanned} file(s)`),
);
