#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
/**
 * Generate webapp/dist/llms.txt and webapp/dist/llms-full.txt from the built HTML.
 *
 * Runs as the package.json postbuild step, so the corpus can never go stale: it is
 * regenerated from the exact HTML that shipped, every build.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, '..', 'dist');

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
const has = (r) => PAGES.includes(r === '/' ? 'index.html' : r.replace(/^\//, '') + '.html');

const lines = [];
lines.push('# Northlatch Labs');
lines.push('');
lines.push('> Commercial AI workforces, local macOS inference, and verifiable Web3/security software');
lines.push('> built and operated by Northlatch Labs LLC. Live products include Synappse (AI team');
lines.push('> collaboration runtime), Xlaunch (autonomous engineering harness & 44-provider gateway),');
lines.push('> Kestrel AI Engine & Kestrel Surgical (local macOS LLM/speech/image & clinical op-note');
lines.push('> workspace), Hivex (one-human agent control plane), GridFrames (managed compute),');
lines.push('> ProtocolX Verify (5-gate Move CI verification), ProtocolX (fair raffles), and Weir');
lines.push('> (direct payouts & policy-bounded agent accounts).');
lines.push('');
lines.push('Ecosystem: [synappse.work](https://synappse.work) · [xlaunch.work](https://xlaunch.work) · [protocolx.io](https://protocolx.io) · [weir.social](https://weir.social) · [gridframes.app](https://gridframes.app)');
lines.push('');
if (has('/')) lines.push('- [Home](https://northlatch.tech/): Interactive solution finder, full product portfolio, transparent pricing & fee estimator, and three onboarding paths.');
if (has('/start')) lines.push('- [How to Start](https://northlatch.tech/start): Step-by-step customer onboarding playbooks across Synappse, Xlaunch, Kestrel, Verify, ProtocolX, Weir, and GridFrames.');
lines.push('');
lines.push('## Products');
lines.push('');
lines.push('- [Synappse](https://synappse.work): AI collaboration runtime for teams — role-based teammates, shared memory, governed plugins/MCP, and event triggers ($0 Free, $25/mo Pro, $25/seat/mo Team).');
lines.push('- [Xlaunch](https://xlaunch.work): Autonomous AI engineering harness (21 tools, shared browser workbench) and 44-provider / 111-model gateway.');
lines.push('- [Kestrel AI Engine](https://github.com/0xda7/kestrel): Native macOS local LLM, Whisper speech, and image studio with AMD GPU Metal acceleration (GPL-3.0 + commercial licensing).');
lines.push('- [Kestrel Surgical](https://github.com/0xda7/kestrel-surgical-site): Local-only macOS operative note & CPT workspace for surgeons (free design-partner pilot).');
lines.push('- [Hivex](https://github.com/Northlatch-Labs-LLC/hivex): One-human loopback Go control plane with Gridframe T0–T3 governance and append-only ledgers (MIT).');
if (has('/verify')) lines.push('- [ProtocolX Verify](https://northlatch.tech/verify): Five automated CI security gates for Sui Move contracts with re-derivable SHA-256 evidence bundles. Free Action, $149/repo/mo Hosted App, $1,000 First Report.');
if (has('/weir')) lines.push('- [Weir](https://northlatch.tech/weir): Direct SUI monetization and withdrawable supporter staking yield (95% to creators, 5% fee on yield), plus programmatic agent doors.');
if (has('/more')) lines.push('- [More Solutions & Open Source](https://northlatch.tech/more): Hivex, Kestrel Surgical, Sui Move Security Skills, Xlaunch Gateway, .sui brand names ($10 first year), CTF security range (beta), and early-access work market.');
lines.push('- [GridFrames](https://gridframes.app): Zero-ops managed compute and agent machine hosting funded via SUI credits.');
lines.push('');
lines.push('## Agents & Proof');
lines.push('');
if (has('/agents')) lines.push('- [Autonomous Agents](https://northlatch.tech/agents): Live production deployments Wren and Heron demonstrating strict model/policy/signer separation on Sui mainnet.');
if (has('/on-chain')) lines.push('- [On-Chain Proof](https://northlatch.tech/on-chain): Full Sui mainnet Move package addresses and reproducible local CI verification steps.');
lines.push('- [Weir machine manifest](https://weir.social/.well-known/weir-agent.json): Machine contract for programmatic Weir account registration and usage.');
lines.push('- [Weir MCP discovery](https://mcp.weir.social/.well-known/mcp.json): Keyless, read-only hosted MCP endpoint metadata.');
lines.push('');
lines.push('## Company & Governance');
lines.push('');
if (has('/contact')) lines.push('- [Contact Sales & Engineering](https://northlatch.tech/contact): Project scoping, First Report orders, and sales inquiries (1-business-day response).');
if (has('/security')) lines.push('- [Security Policy](https://northlatch.tech/security): Vulnerability disclosure policy, scope, safe harbor, and bounty rewards.');
if (has('/privacy')) lines.push('- [Privacy Policy](https://northlatch.tech/privacy): Data handling, first-party contact form processing via Resend, and user rights.');
if (has('/terms')) lines.push('- [Terms of Service](https://northlatch.tech/terms): Terms governing hosted services, CLIs, and software libraries.');
if (has('/disclaimer')) lines.push('- [Disclaimer](https://northlatch.tech/disclaimer): Disclaimers on financial advice, automated verification, and third-party chains.');
if (has('/trademarks')) lines.push('- [Trademarks](https://northlatch.tech/trademarks): Protected marks and usage guidelines.');
lines.push('');
lines.push('## Machine Surface');
lines.push('');
lines.push('- [Full text](https://northlatch.tech/llms-full.txt): Complete plain-text corpus generated from shipped HTML.');
lines.push('- [Sitemap](https://northlatch.tech/sitemap-index.xml): XML sitemap of all routes.');
lines.push('- [Security contact](https://northlatch.tech/.well-known/security.txt): RFC 9116 security.txt.');
lines.push('- [Agent card](https://northlatch.tech/.well-known/agent-card.json): Weir MCP server metadata.');
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

if (!existsSync(join(DIST, 'market.html'))) {
  console.log('note: market.html not in dist — market intentionally absent from llms.txt index');
}
