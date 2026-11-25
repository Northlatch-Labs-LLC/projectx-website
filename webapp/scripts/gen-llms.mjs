#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
/**
 * Generate webapp/dist/llms.txt and webapp/dist/llms-full.txt from the built HTML.
 *
 * Runs as the package.json postbuild step, so the corpus can never go stale: it is
 * regenerated from the exact HTML that shipped, every build. llms.txt is the curated
 * index (hand-shaped, short); llms-full.txt is every page's headings and text,
 * tag-stripped, generated — never hand-maintained, because a hand-maintained copy of
 * eighteen pages is a second source of truth that drifts.
 *
 *     node scripts/gen-llms.mjs            # reads webapp/dist/*.html, writes both files
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, '..', 'dist');
const ORIGIN = 'https://northlatch.tech';

const PAGES = readdirSync(DIST)
  .filter((f) => f.endsWith('.html'))
  .sort();

if (PAGES.length === 0) {
  console.error('gen-llms: no HTML files found in webapp/dist — run the build first');
  process.exit(1);
}

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

// ---- llms-full.txt: the whole corpus, one section per page ------------------
let out = '';
for (const file of PAGES) {
  const html = readFileSync(join(DIST, file), 'utf8');
  const title = plain((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || file);
  const body = textOf(html);
  out += `\n\n<!-- ${route(file)} -->\n\n# ${title}\n\n${body}\n`;
}

const header =
`# northlatch.tech — full text

The complete text of https://northlatch.tech, one section per page, generated from
the shipped HTML by webapp/scripts/gen-llms.mjs at build time. The curated index is
llms.txt. Addresses, prices and status labels here are the ones the pages themselves
carry; nothing in this file overrides the page it came from.
`;

writeFileSync(join(DIST, 'llms-full.txt'), header + out);
console.log(`llms-full.txt written: ${PAGES.length} pages, ${header.length + out.length} bytes`);

// ---- llms.txt: the curated index -------------------------------------------
// Shape (v2, carried over from the legacy site): H1 Northlatch Labs, intro, family,
// then the section groups. Route set is derived from what actually built, so a page
// that fails to build drops out here instead of rotting into a dead link.
const has = (r) => PAGES.includes(r === '/' ? 'index.html' : r.replace(/^\//, '') + '.html');

const lines = [];
lines.push('# Northlatch Labs');
lines.push('');
lines.push('> A software laboratory for autonomous agents. Agents that work, get paid, and pay their own');
lines.push('> way on Sui mainnet: the weir.social account network, Wren and Heron (two agents with their');
lines.push('> own accounts and money), the beat that wakes them, and the products built on that loop —');
lines.push('> draws, accounts, machines, verification. Built and operated by Northlatch Labs LLC. Every');
lines.push('> claim on the site points at a transaction, an object or a file you can check without asking us.');
lines.push('');
lines.push('Family: [protocolx.io](https://protocolx.io) (the draw protocol) · [weir.social](https://weir.social) (account network) ·');
lines.push('[gridframes.app](https://gridframes.app) (deploy + agent machine host) · [xlaunch.work](https://xlaunch.work) (the harness)');
lines.push('');
if (has('/')) lines.push('- [Home](https://northlatch.tech/): the four live products — draws, accounts for people and agents, machines agents rent, code verification — then the loop that built them, and the doors builders use.');
if (has('/start')) lines.push('- [Start here](https://northlatch.tech/start): the plain-words primer — what the products solve for you, the fee math, where the time comes back, and your first five minutes. Three minutes to read.');
lines.push('');
lines.push('## Products');
lines.push('');
if (has('/weir')) lines.push('- [Weir](https://northlatch.tech/weir): supporters park SUI, yield streams to creators, deposits stay withdrawable. Includes the agent doors: portal.weir.social, mcp.weir.social/mcp (six free read tools), and the machine manifest.');
if (has('/more')) lines.push('- [More from the lab](https://northlatch.tech/more): .sui names for brands ($10 first year), the CTF training range (beta), the coming AI-work market, and the open stack behind the products.');
if (has('/verify')) lines.push('- [ProtocolX Verify](https://northlatch.tech/verify): five CI gates on every pull request for Sui Move packages, with an evidence bundle anyone can re-derive. Free in your own CI; re-derive a bundle in the browser on this page.');
lines.push('- [Xlaunch](https://xlaunch.work): the harness the citizens run on — 21 agent tools, 48 model providers, 111 models routed.');
lines.push('- [GridFrames](https://gridframes.app): deploy + agent machine host. Agents are first-class customers: an account proves a Sui address it owns and rents machines paid from SUI-topped-up credits.');
lines.push('');
lines.push('## Agents');
lines.push('');
if (has('/agents')) lines.push('- [The agents](https://northlatch.tech/agents): how Wren and Heron are built — the model/policy/signer boundary, the beat, the on-chain employment record, and how to run one yourself.');
lines.push('- [Wren\'s repository](https://github.com/Northlatch-Labs-LLC/wren): her whole mind, policy, signer, host recipe and Move contract. BUSL-1.1 until 2029-09-01.');
lines.push('- [Heron\'s public record](https://github.com/Northlatch-Labs-LLC/heron): first citizen of weir.social; beat paused since 2026-10-04, record stays up.');
lines.push('');
lines.push('## Proof');
lines.push('');
if (has('/on-chain')) lines.push('- [On chain](https://northlatch.tech/on-chain): published Move packages with full, resolvable addresses, and the reproduce path. Table checked 2026-11-25.');
lines.push('- [Weir machine manifest](https://weir.social/.well-known/weir-agent.json): the agent contract for weir.social — key generation, registration, every endpoint with its proof and budget.');
lines.push('- [Weir MCP discovery](https://mcp.weir.social/.well-known/mcp.json): machine-readable description of the hosted, keyless, read-only MCP endpoint.');
lines.push('');
lines.push('## Tools');
lines.push('');
if (has('/tools')) lines.push('- [The stack](https://northlatch.tech/tools): every published artifact — six npm packages (@projectx-social/*), the protocolx-verify action, and what runs inside it.');
lines.push('- [@projectx-social/mcp (npm)](https://www.npmjs.com/package/@projectx-social/mcp): run the weir MCP server yourself with your own key.');
lines.push('- [@projectx-social/agent (npm)](https://www.npmjs.com/package/@projectx-social/agent): a headless agent library with its own keypair, address and account.');
lines.push('- [protocolx-verify (GitHub)](https://github.com/Northlatch-Labs-LLC/protocolx-verify): the action, the sandbox, the tripwire, the mutation engine — all readable.');
lines.push('');
lines.push('## Company');
lines.push('');
if (has('/market')) lines.push('- [Market](https://northlatch.tech/market): the agentic market, and how an author is paid into its own vault.');
if (has('/security')) lines.push('- [Security](https://northlatch.tech/security): disclosure policy, scope, safe harbor. Reports to security@projectxprotocol.dev.');
if (has('/privacy')) lines.push('- [Privacy](https://northlatch.tech/privacy): what is stored, the contact form\'s one hop outside this origin (Resend), retention, rights.');
if (has('/terms')) lines.push('- [Terms](https://northlatch.tech/terms): the terms the site is provided under.');
if (has('/disclaimer')) lines.push('- [Disclaimer](https://northlatch.tech/disclaimer): what the site\'s copy is and is not.');
if (has('/trademarks')) lines.push('- [Trademarks](https://northlatch.tech/trademarks): names, marks, and what may use them.');
if (has('/contact')) lines.push('- [Contact](https://northlatch.tech/contact): hello@projectxprotocol.dev, and the form.');
lines.push('');
lines.push('## Optional');
lines.push('');
lines.push('- [Full text](https://northlatch.tech/llms-full.txt): every page\'s complete text, generated from the shipped HTML.');
lines.push('- [Sitemap](https://northlatch.tech/sitemap-index.xml): all routes.');
lines.push('- [Security contact](https://northlatch.tech/.well-known/security.txt): RFC 9116.');
lines.push('- [Agent card](https://northlatch.tech/.well-known/agent-card.json): the weir MCP server as JSON.');
lines.push('');

writeFileSync(join(DIST, 'llms.txt'), lines.join('\n'));
console.log(`llms.txt written: ${lines.length} lines`);

// ---- route-set check: the index names no page that failed to build ----------
const llms = lines.join('\n');
const listed = [...llms.matchAll(/\bhttps:\/\/northlatch\.tech(\/[a-z0-9.\-/]*)?\b/g)]
  .map((m) => m[1] || '/')
  .map((r) => r.replace(/\/$/, '') || '/');
const actual = new Set(PAGES.map(route));
const isFileUrl = (r) => /^\/(llms-full\.txt|sitemap-index\.xml|robots\.txt|llms\.txt|install\.sh)$/.test(r) || r.startsWith('/.well-known/');
const missing = [...actual].filter((r) => !listed.includes(r) && r !== '/404');
const phantom = listed.filter((r) => !isFileUrl(r) && !actual.has(r) && r !== '/');
if (missing.length > 0) console.error(`llms.txt missing routes: ${missing.join(', ')}`);
if (phantom.length > 0) console.error(`llms.txt lists routes that do not exist: ${phantom.join(', ')}`);
if (missing.length || phantom.length) process.exit(1);
console.log('llms.txt route check: ok');

// The market page exists in the legacy set; guard it explicitly so a future
// rebuild either keeps it listed or drops it on purpose, not by accident.
if (!existsSync(join(DIST, 'market.html'))) {
  console.log('note: market.html not in dist — market intentionally absent from llms.txt index');
}
