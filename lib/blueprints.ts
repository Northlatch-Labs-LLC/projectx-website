// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
export interface Blueprint {
  no: string;
  title: string;
  summary: string;
  revenue: string;
  maths: string;
  difficulty: 'Weekend' | 'Serious build' | 'Protocol work';
  status: 'Published' | 'Next' | 'Queued';
  tags: string[];
}

export const BLUEPRINTS: Blueprint[] = [
  {
    no: '01',
    title: 'The liquidity underwriter',
    summary:
      'Front your own SUI to serve large withdrawals instantly, reclaim at the next tranche rotation, and stop the pool’s yield engine from being reset by exit traffic.',
    revenue: 'A fee on each underwritten exit, earned against your cost of capital and hold time.',
    maths: 'Inventory queueing, hold-time distribution, capital sizing against the exit-size tail.',
    difficulty: 'Serious build',
    status: 'Published',
    tags: ['Yield', 'Non-custodial', 'Off-chain agent'],
  },
  {
    no: '02',
    title: 'Honest odds',
    summary:
      'The calculator nobody has built: what a depositor’s real distribution of outcomes looks like over a year, including the part where the expected value is slightly negative.',
    revenue: 'None directly — it is the trust asset that makes every interface above it credible.',
    maths: 'Geometric waiting time, binomial win counts, expected value net of both protocol fees.',
    difficulty: 'Weekend',
    status: 'Next',
    tags: ['Analytics', 'Read-only'],
  },
  {
    no: '03',
    title: 'Sponsored epochs as acquisition',
    summary:
      'A model for protocols and DAOs buying depositors by funding a prize, with cost per acquired depositor measured on chain instead of guessed.',
    revenue: 'For the sponsor: TVL and attention, priced per SUI spent, with a public receipt.',
    maths: 'Elasticity estimation from settlement history, CAC and payback under decay.',
    difficulty: 'Weekend',
    status: 'Queued',
    tags: ['Growth', 'Analytics'],
  },
  {
    no: '04',
    title: 'The multi-validator ladder',
    summary:
      'Spread the stake ladder across validators to raise realised yield and remove the single-validator dependency the protocol currently has.',
    revenue: 'A share of the yield uplift, or a service fee from the pool that gains it.',
    maths: 'Constrained optimisation over commission, performance and liquidity; rebalancing cost.',
    difficulty: 'Protocol work',
    status: 'Queued',
    tags: ['Move', 'Yield', 'Resilience'],
  },
  {
    no: '05',
    title: 'Syndicates',
    summary:
      'Let a group save together and agree in advance how a win is split, with the split provable rather than promised.',
    revenue: 'A fee on syndicate formation, or on the win it distributes.',
    maths: 'Time-weighted fair division; proving a split is envy-free when deposits arrive at different times.',
    difficulty: 'Serious build',
    status: 'Queued',
    tags: ['Social', 'Accounting'],
  },
  {
    no: '06',
    title: 'The charity pool',
    summary:
      'A pool whose prize routes to a cause instead of a winner. Depositors give up staking yield, never principal — the most honest form of giving there is.',
    revenue: 'Nothing for you. Everything for the argument that this primitive is worth having.',
    maths: 'Straightforward — the difficulty here is legal structure, not arithmetic.',
    difficulty: 'Protocol work',
    status: 'Queued',
    tags: ['Move', 'Social'],
  },
];
