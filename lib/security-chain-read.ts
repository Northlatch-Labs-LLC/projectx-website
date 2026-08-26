
export const SECURITY_READ_AT = '2026-08-22' as const;
export const SECURITY_NETWORK = 'Sui mainnet' as const;

export interface PackageControl {
  product: string;

  packageId: string;

  packageOrigin: string | null;

  version: string | null;

  upgradeCapId: string | null;

  upgradeCapHolder: string;

  other: string;

  source: 'chain' | 'spec';
}

export const SECURITY_PACKAGES: PackageControl[] = [
  {
    product: 'Weir (projectx_social)',
    packageId: '0xc5c8…d404d (original) / 0xa7fd…1214d (v2)',
    packageOrigin: null,
    version: '2',
    upgradeCapId: null,
    upgradeCapHolder: '2-of-3 multisig 0x00e734d5…11605',
    other: 'PlatformCap, Publisher, Display — not yet published',
    source: 'spec',
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
    packageId: '0xf7475c7c2161c1eadf364f9e0d2212476dc20a235736e14c0aab02128aca448f',
    packageOrigin: '0x44a9e92e005b9375750045304268ea57e86f8a16a68dfac41f593d771cf40a6a',
    version: '4',
    upgradeCapId: '0xe6ed11ed42f1edd23366e5f0832a7874665624dc91bfd0008d5e5c3259a4fed7',
    upgradeCapHolder: '0x00e734d54be45c002579f36698823eaf2410b59eb30a398fd6c8af9e1b111605',
    other: 'not yet published',
    source: 'chain',
  },
];

export const SALT_SERVICE_PROVIDER: string | null = null;
