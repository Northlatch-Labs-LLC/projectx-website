#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Kaela <kaela@projectxprotocol.dev>
/**
 * Fail when the two pages that quote ProtocolX Verify's price stop agreeing.
 *
 * `/verification` and `/verification/install` both print the App price. A comment in the source
 * has asked for years that they stay word-for-word — "two pages that paraphrase the same price
 * eventually quote two different ones" — and nothing enforced it. A prospect reading one page and
 * being invoiced from the other is the cheapest possible way to lose a product whose entire pitch
 * is that our numbers can be checked.
 *
 *     node scripts/verify-verify-pricing.mjs
 *
 * This compares the pages against each other AND against the single figures below, so a careful
 * edit to both pages that changes the price still has to change this file deliberately.
 */
import { readFileSync } from 'node:fs';

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

/*
  The prices, stated once.

  FOUNDING is 149 because 149 is what these pages published before a list price was set. It does
  not expire and there is no review date: raising a printed number on the people who read it is
  how a verification product loses the only thing it sells. If it is ever withdrawn, it is
  withdrawn for NEW repositories only.
*/
const LIST_MONTHLY = 249;
const LIST_YEARLY = 2490;
const FOUNDING_MONTHLY = 149;

const PAGES = ['app/verification/page.tsx', 'app/verification/install/page.tsx'];

/** Source with JSX comments stripped, so a price discussed in a comment is never read as a quote. */
const quotedText = (src) => src.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

const failures = [];

/** Every dollar figure the page actually shows a reader, in order. */
const pricesOn = (path) => {
  const text = quotedText(readFileSync(path, 'utf8'));
  return (text.match(/\$[\d,]+/g) ?? []).map((s) => Number(s.slice(1).replace(/,/g, '')));
};

const shown = PAGES.map((p) => ({ path: p, prices: pricesOn(p) }));

for (const { path, prices } of shown) {
  for (const [label, value] of [
    ['list monthly', LIST_MONTHLY],
    ['list yearly', LIST_YEARLY],
    ['founding monthly', FOUNDING_MONTHLY],
  ]) {
    if (!prices.includes(value)) failures.push(`${path} does not show the ${label} price $${value}`);
  }
  // The superseded price must not survive anywhere a reader can see it.
  if (prices.includes(1490)) failures.push(`${path} still shows the superseded yearly price $1,490`);
}

// And the two pages must agree with each other, not merely with this file.
const [a, b] = shown;
const setOf = (x) => JSON.stringify([...new Set(x.prices)].sort((m, n) => m - n));
if (setOf(a) !== setOf(b)) {
  failures.push(
    `the two pages quote different price sets:\n    ${a.path}: ${setOf(a)}\n    ${b.path}: ${setOf(b)}`,
  );
}

if (failures.length > 0) {
  console.error(red('verify pricing: FAIL'));
  for (const f of failures) console.error(`  · ${f}`);
  process.exit(1);
}

console.log(green(`verify pricing: OK`), `— both pages agree: $${LIST_MONTHLY}/mo, $${LIST_YEARLY}/yr, founding $${FOUNDING_MONTHLY}`);
