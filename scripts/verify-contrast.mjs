#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
/**
 * Fail when a text/background pair drops below its WCAG contrast requirement.
 *
 * Measured in a browser on 14 August 2026, every pair on the home page met AA and almost all met
 * AAA. Nothing was holding it there. The palette is themed — green is opt-in via `data-theme` and
 * had never been measured at all — and a single token nudged for aesthetic reasons moves every pair
 * built on it at once. Contrast is the accessibility property most easily lost to a change that
 * looks like an improvement, and it fails silently for the people it fails.
 *
 *     node scripts/verify-contrast.mjs           # both themes
 *     node scripts/verify-contrast.mjs --verbose # print every pair and its ratio
 *
 * Reads the palette from the two places that define it: hex literals in `tailwind.config.ts` and
 * the themed `--px-*` triples in `app/globals.css`. Source-only, no browser, no network — so it has
 * no SKIP branch and cannot pass for the wrong reason. What it cannot see is stated in
 * `config/contrast-pairs.json`: gradient-filled text has no computed colour, so those pairs are
 * pinned to the darkest gradient stop instead.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const verbose = process.argv.includes('--verbose');

const CONFIG = JSON.parse(readFileSync(join(ROOT, 'config', 'contrast-pairs.json'), 'utf8'));
const tailwind = readFileSync(join(ROOT, 'tailwind.config.ts'), 'utf8');
const globals = readFileSync(join(ROOT, 'app', 'globals.css'), 'utf8');

/**
 * Hex tokens from tailwind.config.ts, in the two shapes it uses.
 *
 * Flat — `bg: '#05080f'` — and nested with a DEFAULT — `prize: { light: …, DEFAULT: '#3ddc97', … }`.
 * The nested form is read first: scanning flat pairs alone binds `light` and `dark` as if they were
 * top-level tokens and leaves `prize` and `gold` undefined, which is what the first run reported.
 */
function hexTokens() {
  const out = new Map();
  for (const m of tailwind.matchAll(
    /['"]?([a-z][a-z0-9-]*)['"]?\s*:\s*\{([^}]*?)\bDEFAULT\s*:\s*['"](#[0-9a-fA-F]{6})['"]/g,
  )) {
    out.set(m[1], m[3]);
  }
  for (const m of tailwind.matchAll(/['"]?([a-z][a-z0-9-]*)['"]?\s*:\s*['"](#[0-9a-fA-F]{6})['"]/g)) {
    if (!out.has(m[1])) out.set(m[1], m[2]);
  }
  return out;
}

/**
 * Themed triples from globals.css. `:root { --px-accent-400: 77 162 255 }` is the default and
 * `:root[data-theme='green'] { … }` overrides it. Parsed per block rather than globally, because a
 * global scan would let the green values silently win for both themes — which would report the
 * default theme as passing on numbers nobody sees.
 */
function themedVars() {
  const blocks = { default: new Map(), green: new Map() };
  const re = /:root(\[data-theme=['"]green['"]\])?\s*\{([^}]*)\}/g;
  for (const m of globals.matchAll(re)) {
    const target = m[1] ? blocks.green : blocks.default;
    for (const v of m[2].matchAll(/--([a-z0-9-]+)\s*:\s*(\d+)\s+(\d+)\s+(\d+)\s*;/g)) {
      target.set(v[1], [Number(v[2]), Number(v[3]), Number(v[4])]);
    }
  }
  return blocks;
}

const HEX = hexTokens();
const VARS = themedVars();

/** Named tokens that resolve through a CSS variable rather than a literal. */
const VAR_ALIAS = {
  'px-accent-400': 'px-accent-400',
  'px-accent-200': 'px-accent-200',
  'px-cyan': 'px-hue-3',
  'px-violet': 'px-hue-5',
};

const HEX_ALIAS = {
  'px-bg': 'bg',
  'px-panel': 'panel',
  'px-elevated': 'elevated',
  'px-text': 'text',
  'px-muted': 'muted',
  'px-faint': 'faint',
  'px-prize': 'prize',
  'px-gold': 'gold',
  'px-danger': 'danger',
};

function toRgb(token, theme) {
  if (/^#[0-9a-fA-F]{6}$/.test(token)) {
    return [1, 3, 5].map((i) => parseInt(token.slice(i, i + 2), 16));
  }
  if (VAR_ALIAS[token]) {
    const v = VARS[theme].get(VAR_ALIAS[token]) ?? VARS.default.get(VAR_ALIAS[token]);
    if (v) return v;
  }
  if (HEX_ALIAS[token] && HEX.has(HEX_ALIAS[token])) {
    return toRgb(HEX.get(HEX_ALIAS[token]));
  }
  return null;
}

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrast = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

if (!Array.isArray(CONFIG.pairs) || CONFIG.pairs.length === 0) {
  console.log(red('  FAIL  contrast-pairs.json declares no pairs'));
  process.exit(1);
}
if (VARS.default.size === 0 || VARS.green.size === 0) {
  console.log(red('  FAIL  could not read the themed palette from app/globals.css'));
  console.log(`        default:${VARS.default.size} vars, green:${VARS.green.size} vars`);
  console.log('        Refusing to report contrast against a palette that did not parse.');
  process.exit(1);
}

const failures = [];
const unresolved = [];
let checked = 0;

for (const theme of CONFIG.themes) {
  for (const pair of CONFIG.pairs) {
    const fg = toRgb(pair.fg, theme);
    const bg = toRgb(pair.bg, theme);
    if (!fg || !bg) {
      unresolved.push(`${theme}/${pair.id}: ${!fg ? pair.fg : pair.bg}`);
      continue;
    }
    checked += 1;
    const ratio = contrast(fg, bg);
    const rounded = Math.round(ratio * 100) / 100;
    const large = pair.min <= 3;
    const aaa = ratio >= (large ? 4.5 : 7);
    if (ratio < pair.min) {
      failures.push({ theme, pair, ratio: rounded });
    } else if (verbose) {
      console.log(
        `  ${green('ok')}  ${theme.padEnd(7)} ${pair.id.padEnd(30)} ${String(rounded).padStart(6)}  ` +
          `${dim(`min ${pair.min}`)} ${aaa ? green('AAA') : dim('AA')}`,
      );
    }
  }
}

// An unresolvable token is a silent hole: the pair is skipped and the run still reports clean.
if (unresolved.length > 0) {
  console.log(red(`  FAIL  ${unresolved.length} pair(s) name a colour that could not be resolved`));
  for (const u of unresolved) console.log(`        ${u}`);
  console.log('        A pair that cannot be resolved is not a pair that passed.');
  process.exit(1);
}

if (failures.length > 0) {
  console.log(red(`  FAIL  ${failures.length} contrast failure(s)`));
  for (const f of failures) {
    console.log(
      `        ${f.theme}/${f.pair.id}: ${f.ratio}:1, needs ${f.pair.min}:1  (${f.pair.fg} on ${f.pair.bg})`,
    );
    if (f.pair.note) console.log(`          ${dim(f.pair.note)}`);
  }
  process.exit(1);
}

console.log(
  green(`  ok    ${checked} contrast pair(s) meet WCAG across ${CONFIG.themes.length} theme(s)`),
);
