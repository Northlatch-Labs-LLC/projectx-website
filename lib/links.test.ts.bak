/**
 * A link is a promise that something is there.
 *
 * On 25 August 2026 the vault's interface was retired and the draws took `protocolx.io`. Every
 * "Open the vault" control on this site kept pointing at that address, so each one resolved,
 * returned 200, and sent the reader to a different product. A link that resolves is not a link
 * that is correct, and no build, type check or uptime monitor can tell those apart.
 *
 * `DAPP_URL` is therefore nullable, and every consumer must render nothing rather than a dead
 * control. These tests hold that: the nav entry and the footer entry must disappear when no
 * interface is configured, and must come back when one is.
 *
 * The module reads `process.env` at import time, which is deliberate — Next substitutes
 * `process.env.NEXT_PUBLIC_*` literally at build time and a dynamic lookup would be `undefined` in
 * every client bundle. So each case imports a fresh copy with a cache-busting query rather than
 * mutating an already-evaluated module.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const HERE = pathToFileURL(new URL('./links.ts', import.meta.url).pathname).href;

// Required by the module's own guard, and not what is under test here.
process.env.NEXT_PUBLIC_SITE_URL ??= 'https://projectxprotocol.dev';

let n = 0;
async function loadWithDapp(value: string | undefined) {
  if (value === undefined) delete process.env.NEXT_PUBLIC_DAPP_URL;
  else process.env.NEXT_PUBLIC_DAPP_URL = value;
  return import(`${HERE}?case=${n++}`);
}

function labels(links: readonly { label: string }[]) {
  return links.map((l) => l.label);
}

test('with no vault interface configured, DAPP_URL is null', async () => {
  const m = await loadWithDapp(undefined);
  assert.equal(m.DAPP_URL, null);
});

test('the top nav drops the Vault entry when nothing serves it', async () => {
  // The failure this prevents is not a broken link — it is a working link to the wrong product.
  const m = await loadWithDapp(undefined);
  assert.ok(!labels(m.NAV_LINKS).includes('Vault'), 'Vault must not appear in the top nav');
});

test('the footer drops the Prize vault entry when nothing serves it', async () => {
  const m = await loadWithDapp(undefined);
  const products = m.FOOTER_SECTIONS.find((s: { title: string }) => s.title === 'Products');
  assert.ok(products, 'the Products section must exist');
  assert.ok(!labels(products.links).includes('Prize vault'));
});

test('both entries return the moment an interface is configured', async () => {
  // Retirement is a configuration state, not a deletion. Setting the variable again must restore
  // the site without a code change, or the next person edits markup to bring a product back.
  const m = await loadWithDapp('https://vault.example');
  assert.equal(m.DAPP_URL, 'https://vault.example');
  assert.ok(labels(m.NAV_LINKS).includes('Vault'));
  const products = m.FOOTER_SECTIONS.find((s: { title: string }) => s.title === 'Products');
  assert.ok(labels(products.links).includes('Prize vault'));
});

test('the draws link points at the apex, not at a host that redirects to it', async () => {
  // `raffle.protocolx.io` still 308s to the apex. Advertising it anyway makes every link depend
  // on a redirect we control and may one day drop — the reasoning already applied to the retired
  // registrar subdomain.
  delete process.env.NEXT_PUBLIC_RAFFLE_URL;
  const m = await loadWithDapp(undefined);
  assert.equal(m.RAFFLE_URL, 'https://protocolx.io');
  assert.ok(!m.RAFFLE_URL.includes('raffle.protocolx.io'));
});

test('no nav or footer link advertises a retired host', async () => {
  const m = await loadWithDapp(undefined);
  const hrefs = [
    ...m.NAV_LINKS.map((l: { href: string }) => l.href),
    ...m.FOOTER_SECTIONS.flatMap((s: { links: { href: string }[] }) => s.links.map((l) => l.href)),
  ];
  for (const dead of ['raffle.protocolx.io', 'suins.protocolx.io', 'social.protocolx.io']) {
    const offenders = hrefs.filter((h) => typeof h === 'string' && h.includes(dead));
    assert.deepEqual(offenders, [], `${dead} is retired and must not be linked`);
  }
});
