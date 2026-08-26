
export const NETWORK = 'Sui mainnet' as const;

export const EXPLORER = 'https://suiscan.xyz/mainnet' as const;

export interface ChainObject {
  label: string;
  note: string;
  id: string;
  kind: 'object' | 'package' | 'address';
}

export const CHAIN_OBJECTS: ChainObject[] = [
  {
    label: 'Package',
    note: 'The published Move package. Every protocol function a depositor can call lives here.',
    id: '0x9e54a04deb431f9ef790f6e41f69733b083d0d879329e8770b3141eae8db972d',
    kind: 'package',
  },
  {
    label: 'Pool',
    note: 'The shared pool object. Holds principal, the stake ladder and the prize balance.',
    id: '0x0742576b87852b237ac688dd25ad7e390a30d8ff0c6a34666afa8d0d374766c9',
    kind: 'object',
  },
  {
    label: 'Treasury',
    note: 'Protocol revenue. Structurally separate from the pool — it cannot reach principal.',
    id: '0x590d6b9d748452940daf33a346f01c17723e8cc22fcbf7e7b7d61b2c0da08f53',
    kind: 'object',
  },
  {
    label: 'DEX adapter',
    note: 'Cetus CLMM adapter, deployed separately so it can be re-pinned without touching the pool.',
    id: '0x9b63717b1264e83f79a6ea34175d1b2a838b2f9fcf8b5efe97dd80015a1c4007',
    kind: 'package',
  },
  {
    label: 'Price feed',
    note: 'Switchboard on-demand aggregator. Bounds the conversion rate at settlement.',
    id: '0x1fa7566f40f93cdbafd5a029a231e06664219444debb59beec2fe3f19ca08b7e',
    kind: 'object',
  },
  {
    label: 'Cetus pool',
    note: 'The SUI/USDC liquidity pool the prize is converted through.',
    id: '0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105',
    kind: 'object',
  },
  {
    label: 'Validator',
    note: 'OKXEarn, 0% commission. Principal is delegated here and returned 1:1 on withdrawal.',
    id: '0x00ae78d3e5ba5d6b8de32455474f52811b95617cbad39ebf4f9e2daf67187407',
    kind: 'address',
  },
];

export const ADDRESSES = Object.fromEntries(
  CHAIN_OBJECTS.map((object) => [object.label, object.id]),
) as Record<string, string>;

export const PRIZE_COIN = {
  symbol: 'USDC',
  decimals: 6,
  type: '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC',
} as const;

export const SUI_DECIMALS = 9;

export function explorerUrl(object: Pick<ChainObject, 'id' | 'kind'>): string {

  const segment = object.kind === 'address' ? 'account' : 'object';
  return `${EXPLORER}/${segment}/${object.id}`;
}

export function explorerTxUrl(digest: string): string {
  return `${EXPLORER}/tx/${digest}`;
}

export function explorerAccountUrl(address: string): string {
  return `${EXPLORER}/account/${address}`;
}

export function shortId(id: string, lead = 6, tail = 4): string {
  if (id.length <= lead + tail + 2) return id;
  return `${id.slice(0, lead)}…${id.slice(-tail)}`;
}
