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

/*
 * `RAFFLE_URL`, `NAMES_URL` and `SOCIAL_URL` used to carry deployment addresses as source
 * defaults — `https://protocolx.io`, `https://weir.social/names`, `https://weir.social`. The
 * argument for each was that the host had been verified answering, which is an argument about the
 * VALUE while the defect is the SHAPE: a default that is only ever right because a deployment
 * replaces it is a fixture that survived, and it ships in the client bundle of the first
 * environment that forgets the variable.
 *
 * They are now nullable on the `DAPP_URL` rule, and these tests hold the two halves of it: unset
 * means the entry is absent, set means it is back with no code change.
 */
async function loadWithOrigins(env: Record<string, string | undefined>) {
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return loadWithDapp(undefined);
}

test('with no origin configured, the three product URLs are null', async () => {
  const m = await loadWithOrigins({
    NEXT_PUBLIC_RAFFLE_URL: undefined,
    NEXT_PUBLIC_NAMES_URL: undefined,
    NEXT_PUBLIC_SOCIAL_URL: undefined,
  });
  assert.equal(m.RAFFLE_URL, null);
  assert.equal(m.NAMES_URL, null);
  assert.equal(m.SOCIAL_URL, null);
});

test('the nav and footer drop every entry whose origin is unset', async () => {
  const m = await loadWithOrigins({
    NEXT_PUBLIC_RAFFLE_URL: undefined,
    NEXT_PUBLIC_NAMES_URL: undefined,
    NEXT_PUBLIC_SOCIAL_URL: undefined,
  });
  assert.ok(!labels(m.NAV_LINKS).includes('Draws'), 'Draws must not appear in the top nav');
  const products = m.FOOTER_SECTIONS.find((s: { title: string }) => s.title === 'Products');
  for (const gone of [
    'Live competitions',
    'Run a competition',
    'Register a .sui name',
    'Support a creator',
  ]) {
    assert.ok(!labels(products.links).includes(gone), `${gone} must not be linked`);
  }
});

test('every entry returns the moment its origin is configured', async () => {
  const m = await loadWithOrigins({
    NEXT_PUBLIC_RAFFLE_URL: 'https://draws.example',
    NEXT_PUBLIC_NAMES_URL: 'https://names.example/names',
    NEXT_PUBLIC_SOCIAL_URL: 'https://social.example',
  });
  assert.ok(labels(m.NAV_LINKS).includes('Draws'));
  const products = m.FOOTER_SECTIONS.find((s: { title: string }) => s.title === 'Products');
  for (const back of [
    'Live competitions',
    'Run a competition',
    'Register a .sui name',
    'Support a creator',
  ]) {
    assert.ok(labels(products.links).includes(back), `${back} must be linked`);
  }
  const apply = products.links.find((l: { label: string }) => l.label === 'Run a competition');
  assert.equal(apply.href, 'https://draws.example/organiser/apply');
});

test('no nav or footer link advertises a retired host', async () => {
  const m = await loadWithOrigins({
    NEXT_PUBLIC_RAFFLE_URL: 'https://protocolx.io',
    NEXT_PUBLIC_NAMES_URL: 'https://weir.social/names',
    NEXT_PUBLIC_SOCIAL_URL: 'https://weir.social',
  });
  const hrefs = [
    ...m.NAV_LINKS.map((l: { href: string }) => l.href),
    ...m.FOOTER_SECTIONS.flatMap((s: { links: { href: string }[] }) => s.links.map((l) => l.href)),
  ];
  for (const dead of ['raffle.protocolx.io', 'suins.protocolx.io', 'social.protocolx.io']) {
    const offenders = hrefs.filter((h) => typeof h === 'string' && h.includes(dead));
    assert.deepEqual(offenders, [], `${dead} is retired and must not be linked`);
  }
});
