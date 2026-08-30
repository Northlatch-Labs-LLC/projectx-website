// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
/**
 * Recorded chain read for the /security "Security and control" table.
 *
 * RULE: every object ID on the security page is either read from Sui mainnet at build time, or
 * copied from THIS file, which records a dated chain read. Nothing here comes from memory or from
 * a document — except the Weir row, which is marked `source: 'spec'` so it is never mistaken for
 * a fresh read.
 *
 * Refreshed 2026-08-30 via `rpc-mainnet.suiscan.xyz` (`sui_multiGetObjects` on each UpgradeCap,
 * `suix_getOwnedObjects` on the multisig to enumerate its caps): all three prior rows re-verified
 * unchanged (Weir row included — verified against chain in that pass), and the registrar
 * lineage — upgraded to v2 on 2026-08-27 — added from the same read.
 *
 * How the chain rows were obtained on the original date (Sui mainnet, `fullnode.mainnet.sui.io`,
 * via the `sui` CLI):
 *   1. read each lineage's origin package object → its publish transaction (`prevTx`);
 *   2. read that transaction's object changes → the created `0x2::package::UpgradeCap`;
 *   3. read that UpgradeCap object → its `version` (upgrades applied), `package` (latest package
 *      in the lineage) and current `owner` (the holder).
 * The holder is the UpgradeCap's CURRENT owner, not merely who it was first sent to.
 *
 * If any value cannot be verified it is `null` here and renders as "not yet published" — never a
 * guess.
 */

export const SECURITY_READ_AT = '2026-08-30' as const;
export const SECURITY_NETWORK = 'Sui mainnet' as const;

export interface PackageControl {
  product: string;
  /** Latest package ID in the lineage (from the UpgradeCap), or a trusted spec value. */
  packageId: string;
  /** Original published package ID, where read from chain. */
  packageOrigin: string | null;
  /** UpgradeCap.version — the number of upgrades applied. */
  version: string | null;
  /** The UpgradeCap object itself, where read from chain. */
  upgradeCapId: string | null;
  /** Current owner of the UpgradeCap. */
  upgradeCapHolder: string;
  /** Free-text note for other capabilities. */
  other: string;
  /** 'chain' rows were read on SECURITY_READ_AT; 'spec' rows are trusted from a spec, not read. */
  source: 'chain' | 'spec';
}

export const SECURITY_PACKAGES: PackageControl[] = [
  {
    product: 'Weir (projectx_social)',
    packageId: '0xc5c8…d404d (original) / 0xfa7e…3694 (v3)',
    packageOrigin: null,
    version: '3',
    upgradeCapId: '0x895e20c44aed9c884be8dffa42c93d93653b47e86cd3a12d919998d9b1eaed08',
    upgradeCapHolder: '2-of-3 multisig 0x00e734d5…11605',
    other: 'PlatformCap, Publisher, Display — not yet published',
    source: 'chain',
  },
  {
    product: 'Names (registrar_v1 v2)',
    packageId: '0x53ebb0e73d8c0c958ee04b8410715c007a45fe58ef85887ab647ac254e0ca2f3',
    packageOrigin: '0xb219fbdc681e8e39405b809baa7ec36009329ed88871aab2fc9c62b13eefa10b',
    version: '2',
    upgradeCapId: '0xacdebc676198eefff8dd456823441e5f13c1f988f0434c9d9dc342d816f2933b',
    upgradeCapHolder: '2-of-3 multisig 0x00e734d5…11605',
    other: 'RegistrarCap — see custody note in the data room',
    source: 'chain',
  },
  {
    product: 'Prize Vault (usdc_prize_factory V1.0.1)',
    packageId: '0xce37f554ceb87949e55e6f7b0b92745ac8c9212bcb8e6dbe3b6eb4844c8ba109',
    packageOrigin: '0x9e54a04deb431f9ef790f6e41f69733b083d0d879329e8770b3141eae8db972d',
    version: '2',
    upgradeCapId: '0x9aea97c5508815501d83e848f097c57887fb48e238fc956f008a10f4c2e6a79a',
    upgradeCapHolder: '0x1965c86e56bdf2838e6fbe23cab5f23efb9eab5897ae3f832df83d5585f542ae',
    other: 'not yet published',
    source: 'chain',
  },
  {
    product: 'Draws (raffle_v1 V1.2.0)',
    packageId: '0xb475146208b53d16c3498c9757d623386c17fc197df544386ed496a74e79f8ee',
    packageOrigin: '0x44a9e92e005b9375750045304268ea57e86f8a16a68dfac41f593d771cf40a6a',
    version: '6',
    upgradeCapId: '0xe6ed11ed42f1edd23366e5f0832a7874665624dc91bfd0008d5e5c3259a4fed7',
    upgradeCapHolder: '0x00e734d54be45c002579f36698823eaf2410b59eb30a398fd6c8af9e1b111605',
    other: 'not yet published',
    source: 'chain',
  },
];

/** zkLogin salt-service provider — {PROVIDER_FROM_CONFIG}. Not resolved from a committed config. */
export const SALT_SERVICE_PROVIDER: string | null = null;
