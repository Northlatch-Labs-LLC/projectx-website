#!/usr/bin/env node
// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
/**
 * Regenerates the two static OG cards that carry state a reader has to trust before they click:
 * public/og/interfaces.png and public/og/social.png.
 *
 * # Why static PNGs exist for these two pages at all
 *
 * Every other page unfurls with `app/opengraph-image.tsx`, a Next.js file-convention route that
 * renders fresh, from the same `next/og` (`ImageResponse`/Satori) pipeline, on every request. These
 * two used to be static files instead — see the commit that introduced them for why: "Master 1200x630
 * SVG in operations/brand-pack/interfaces/, manifest line appended, PNG shipped as
 * public/og/interfaces.png." `operations/` is repo-gitignored, so that master SVG never left the
 * machine that made it and does not exist on this one.
 *
 * That is the root cause of the defect this script fixes, not just its symptom. A static PNG whose
 * only source lives outside version control can drift from the page it represents with nothing to
 * catch it — which is exactly what happened: both cards baked in "Closed alpha" chips for Weir and
 * ProjectX Names months before weir.social opened registration, and nothing rendered again to say
 * otherwise. verify-claims.mjs checks prose; it does not decode PNG pixels.
 *
 * This script does not remove the two static files — the task was to regenerate them, not to
 * change how the pages unfurl, and that is a separate, larger decision for whoever owns the OG
 * pipeline next. What it does do is stop hand-authoring pixels no tool here can check: it builds
 * both cards from the exact same `next/og` renderer `app/opengraph-image.tsx` already uses, with
 * the site's own logo mark (`components/ui/Logo.tsx`, inlined below since Satori cannot import a
 * React component tree with CSS classes) and its own colour tokens (`app/globals.css`), reproduced
 * by hand because Satori's layout engine does not read Tailwind classes either.
 *
 * Run with: `node scripts/gen-static-og.mjs`. Writes both PNGs, then prints their new byte sizes so
 * the change is visible without opening an image viewer.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import React from 'react';
// The compiled, Node-runnable copy of @vercel/og that `next/og` re-exports. Importing the
// re-export (`next/og`) instead resolves against Next's module graph, which only exists inside a
// running Next process; this path is the one Next itself resolves to, callable from a plain script.
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';

const h = React.createElement;
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og');

// Exactly `app/opengraph-image.tsx`'s palette, so all OG cards on this site read as one family.
const BG = 'linear-gradient(135deg, #060a12 0%, #0b1524 55%, #0e2038 100%)';
const INK = '#e8edf5';
const MUTED = '#8896b0';
const FAINT = '#5a6880';
const ACCENT = '#4da2ff';
const GREEN = '#3ddc97';
const GOLD = '#f2b84f';

/** An inline SVG check, not the Unicode "✓": Satori has to fetch a font for any glyph the default
 *  font lacks, that fetch goes to Google Fonts, and this machine's network sandbox rejects it (400,
 *  logged and swallowed) — so the glyph silently rendered as tofu until this was inlined instead. */
function checkMark() {
  return h(
    'svg',
    { viewBox: '0 0 16 16', width: 13, height: 13 },
    h('path', {
      d: 'M2.5 8.5 L6 12 L13.5 3.5',
      stroke: GREEN,
      strokeWidth: '2.2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      fill: 'none',
    }),
  );
}

/** The site's own mark (`components/ui/LogoMark`), inlined: Satori renders raw SVG, not a component
 *  import, and cannot resolve Tailwind classes, so the gradient stops and geometry are copied by
 *  hand from that file rather than approximated. */
function logoMark() {
  return h(
    'svg',
    { viewBox: '0 0 40 40', width: 34, height: 34 },
    h(
      'defs',
      null,
      h(
        'linearGradient',
        { id: 'a', x1: '4', y1: '4', x2: '36', y2: '36', gradientUnits: 'userSpaceOnUse' },
        h('stop', { stopColor: '#7bb9ff' }),
        h('stop', { offset: '1', stopColor: '#2b87ea' }),
      ),
      h(
        'linearGradient',
        { id: 'b', x1: '36', y1: '6', x2: '8', y2: '34', gradientUnits: 'userSpaceOnUse' },
        h('stop', { stopColor: '#6ce7b4' }),
        h('stop', { offset: '1', stopColor: '#22b076' }),
      ),
    ),
    h('circle', { cx: '20', cy: '20', r: '15.5', stroke: 'url(#a)', strokeOpacity: '0.34', strokeWidth: '1.6' }),
    h('path', { d: 'M11 11 L29 29', stroke: 'url(#a)', strokeWidth: '4.2', strokeLinecap: 'round' }),
    h('path', { d: 'M29 11 L11 29', stroke: 'url(#b)', strokeWidth: '4.2', strokeLinecap: 'round' }),
    h('circle', { cx: '20', cy: '20', r: '2.6', fill: '#0a1220' }),
  );
}

function brandRow() {
  return h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: 14 } },
    h(
      'div',
      {
        style: {
          width: 52,
          height: 52,
          borderRadius: 16,
          background: '#0a1220',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      logoMark(),
    ),
    h('div', { style: { fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: INK } }, 'ProtocolX'),
  );
}

const TONE = {
  green: { text: GREEN, bg: 'rgba(61,220,151,0.12)', border: 'rgba(61,220,151,0.35)' },
  gold: { text: GOLD, bg: 'rgba(242,184,79,0.12)', border: 'rgba(242,184,79,0.35)' },
  neutral: { text: '#93a0b8', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.14)' },
};

function chip(label, tone) {
  const c = TONE[tone];
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        borderRadius: 999,
        background: c.bg,
        border: `1px solid ${c.border}`,
        fontSize: 18,
        fontFamily: 'monospace',
        color: c.text,
      },
    },
    h('div', { style: { width: 7, height: 7, borderRadius: 999, background: c.text, display: 'flex' } }),
    label,
  );
}

function interfaceCard(title, tone, chipLabel, body) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flex: 1,
        padding: 24,
        borderRadius: 18,
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.09)',
      },
    },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      h('div', { style: { fontSize: 26, fontWeight: 700, color: INK } }, title),
      chip(chipLabel, tone),
    ),
    h('div', { style: { fontSize: 19, color: MUTED } }, body),
  );
}

async function renderInterfaces() {
  const image = new ImageResponse(
    h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: BG,
          fontFamily: 'sans-serif',
        },
      },
      brandRow(),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        h('div', { style: { fontSize: 56, fontWeight: 700, letterSpacing: -1.5, color: INK } }, 'Every way to use ProjectX'),
        h('div', { style: { fontSize: 24, color: MUTED } }, 'One pool on Sui mainnet. As many front doors as people care to build.'),
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
        h(
          'div',
          { style: { display: 'flex', gap: 16 } },
          // Was "Closed alpha" — weir.social/join verified serving registration directly, no
          // invitation code, 8 September 2026. See app/interfaces/page.tsx for the same fact.
          interfaceCard('Weir', 'green', 'Open', 'Support a creator without spending anything'),
          interfaceCard('ProjectX Draws', 'green', 'Live · mainnet', 'Prize competitions whose draw runs on chain'),
        ),
        h(
          'div',
          { style: { display: 'flex', gap: 16 } },
          // Was "Closed alpha" — same fact as Weir; weir.social/names verified serving
          // registration directly, no invitation code, 8 September 2026.
          interfaceCard('ProjectX Names', 'green', 'Open', 'Register a .sui name, issued by SuiNS'),
          interfaceCard('ProjectX Vault', 'neutral', 'No interface', 'Contract live on Sui mainnet'),
        ),
      ),
      h('div', { style: { fontSize: 26, fontFamily: 'monospace', color: ACCENT } }, 'projectxprotocol.dev'),
    ),
    { width: 1200, height: 630 },
  );
  return Buffer.from(await image.arrayBuffer());
}

async function renderSocial() {
  const pills = ['Deposit never spent', 'Yield to the creator', 'Withdraw any time', 'Enforced by contract'];
  const image = new ImageResponse(
    h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: BG,
          fontFamily: 'sans-serif',
        },
      },
      brandRow(),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
        h('div', { style: { fontSize: 60, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.08, color: INK } }, 'Support a creator'),
        h(
          'div',
          { style: { fontSize: 60, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.08, color: INK } },
          'without spending anything',
        ),
        h(
          'div',
          { style: { fontSize: 26, color: MUTED, maxWidth: 820 } },
          "Park SUI in a creator's vault. The staking yield goes to them.",
        ),
      ),
      h(
        'div',
        { style: { display: 'flex', gap: 14 } },
        ...pills.map((label) =>
          h(
            'div',
            {
              key: label,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: 19,
                fontFamily: 'monospace',
                color: '#c7d0e0',
              },
            },
            checkMark(),
            label,
          ),
        ),
      ),
      h(
        'div',
        { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        h('div', { style: { fontSize: 26, fontFamily: 'monospace', color: ACCENT } }, 'projectxprotocol.dev'),
        // Was "Weir · Sui mainnet · closed alpha" — see app/social/page.tsx for the same fact,
        // verified 8 September 2026.
        h('div', { style: { fontSize: 22, fontFamily: 'monospace', color: FAINT } }, 'Weir · Sui mainnet · open'),
      ),
    ),
    { width: 1200, height: 630 },
  );
  return Buffer.from(await image.arrayBuffer());
}

const [interfacesPng, socialPng] = await Promise.all([renderInterfaces(), renderSocial()]);
await writeFile(join(OUT_DIR, 'interfaces.png'), interfacesPng);
await writeFile(join(OUT_DIR, 'social.png'), socialPng);

console.log(`public/og/interfaces.png written, ${interfacesPng.length} bytes`);
console.log(`public/og/social.png written, ${socialPng.length} bytes`);
