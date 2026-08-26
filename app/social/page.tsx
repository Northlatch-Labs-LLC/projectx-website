
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { SocialArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';
import { SOCIAL_URL } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Support a creator',
  description:
    'The social platform where supporting a creator never spends your money: park SUI in a creator’s vault, the staking yield goes to them, and your deposit stays withdrawable in full — enforced by contract, not policy.',
};

const LOOP = [
  {
    step: '1 · Park',
    title: 'Deposit into a creator’s vault',
    body: 'You pick a creator and park SUI in their vault — an object on Sui mainnet, not an account with the platform. The deposit is recorded against your address, and from that moment there are exactly two things the contract lets happen to it: it earns, or you take it back.',
  },
  {
    step: '2 · Stake',
    title: 'The vault delegates it',
    body: 'The vault delegates the pooled deposits to a validator as a ladder of staggered stakes, one rung maturing each epoch. Yield therefore arrives continuously rather than in bursts — and a withdrawal is met from the rung that just matured instead of by breaking one that had not.',
  },
  {
    step: '3 · Yield',
    title: 'The creator earns the yield',
    body: 'Each epoch, matured rungs realise their staking rewards and the yield goes to the creator. The principal restakes and keeps working. Creators can also set a share of the yield to flow back to their supporters, and the harvest itself is permissionless — anyone may trigger it, so nobody has to trust the platform to keep the machine turning.',
  },
  {
    step: '4 · Leave',
    title: 'Withdraw whenever you like',
    body: 'Withdrawal returns your principal in full — no lock-up, no notice period, no approval from the creator or the platform. This is not a policy anyone promises to honour; it is what the contract permits. No function exists by which the platform or the creator can touch a supporter’s deposit.',
  },
];

const NOVELTIES = [
  {
    title: 'Support without spending',
    body: 'Every other creator platform moves money from the audience to the creator. Here the money never moves — only its yield does. The entire price of supporting someone is the staking yield you would have earned holding that SUI yourself. That converts the people who would never pay monthly — which is most people — into supporters who cost themselves nothing.',
  },
  {
    title: 'Custody by contract, not by company',
    body: 'Supporter principal sits in the creator’s vault contract; what a creator is owed from memberships and paid posts is held by a contract as well. The platform holds neither. If it vanished tomorrow, deposits would still be withdrawable and owed balances would still be owed — the contracts do not need the company to exist.',
  },
  {
    title: 'A paywall that fails locked',
    body: 'A paid post’s body is released only against a Subscription or Unlock object held on chain — one predicate, checked in one place. If that read fails, the post stays locked. A paywall bug on this platform fails closed, never open: the failure mode is a subscriber briefly inconvenienced, not a creator’s paid work leaked.',
  },
  {
    title: 'Support that does not churn',
    body: 'A subscription asks its buyer to re-decide every month, and most months the answer eventually becomes no. A parked deposit asks nothing: it keeps supporting until its owner actively takes it back. A thousand small supporters is not a bigger asset than a hundred subscribers — it is a broader one, and it does not expire on a renewal date.',
  },
];

export default function SocialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Weir · weir.social"
        title="Support a creator without spending anything"
        lead="Park SUI in a creator’s vault. It is delegated to a validator, the staking yield goes to the creator, and the deposit stays yours — withdrawable in full, any time, with no lock-up and no approval to ask for. The only thing you give up is the yield you would have earned staking it yourself."
        proof="Live on Sui mainnet. Every guarantee on this page is the contract’s behaviour, not the platform’s policy — which is exactly why it can be stated this plainly."
        art={<SocialArt className="w-full" />}
      >
        <Badge tone="neutral">Sui mainnet</Badge>
        <Badge tone="prize">Live</Badge>
      </PageHeader>

      <Section>
        <SectionHeader
          eyebrow="The idea"
          title="Lend a creator your money’s idle time"
          lead="Most SUI sits in wallets earning nothing. This platform routes that idle time to somebody: the deposit works, the creator keeps what the work produces, and the deposit itself never stops being yours."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          <Card>
            <h3 className="text-base font-semibold text-white">If you support</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              Nothing leaves your wallet for good. You park SUI, the creator earns its yield while
              it sits there, and you take all of it back whenever you like. Losing your deposit is
              not a risk the contract makes available to anyone.
            </p>
          </Card>
          <Card>
            <h3 className="text-base font-semibold text-white">If you create</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              Two incomes, side by side: a stream of staking yield from parked support that costs
              your audience nothing, and real revenue from memberships and paid posts — which
              settle on chain, so what you are owed is held by a contract rather than by the
              platform.
            </p>
          </Card>
          <Card>
            <h3 className="text-base font-semibold text-white">What holds it together</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              No trust in the platform is required for the part that matters. Principal is
              withdrawable by its owner and by nobody else, harvests are permissionless, and paid
              content unlocks only against an object on chain. The company is the interface, not
              the custodian.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="How it works"
          title="One loop, four steps, no exit fee"
          lead="The supporter’s money travels in a circle: parked, staked, harvested, and — whenever its owner says so — returned. The creator keeps only what the circle throws off."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {LOOP.map((item) => (
            <Card key={item.step}>
              <p className="font-mono text-sm font-semibold uppercase tracking-wide text-px-cyan">
                {item.step}
              </p>
              <h3 className="mt-2 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-px-faint">
          Sui floors a single stake at 1 SUI, so very small vaults build fewer rungs and their
          yield arrives in bursts rather than continuously — the platform says so itself rather
          than letting a small vault discover it.
        </p>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="What is new here"
          title="Four things no ordinary creator platform can say"
          lead="None of these are features layered on top. Each one falls out of where the money actually sits — in contracts on Sui mainnet, rather than in the platform’s accounts."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {NOVELTIES.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="The honest arithmetic"
          title="What it costs, and what it does not pretend to be"
          lead="The platform publishes its own limits on its own feed, which is rarer than it should be. This page repeats them rather than rounding them up."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          <Card>
            <h3 className="text-base font-semibold text-white">For supporters: free means free</h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              The cost of parking SUI with a creator is the yield you would have earned staking it
              yourself — that is the entire price. Your principal is never spent, never staked
              past your reach, and never subject to anyone’s approval to return.
            </p>
          </Card>
          <Card>
            <h3 className="text-base font-semibold text-white">
              For creators: yield is reach, sales are revenue
            </h3>
            <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
              Staking yield is small — generating a given monthly amount takes parked principal
              several hundred times that amount, and the platform says exactly that on its own
              feed. Free support is what converts the people who will never pay into a broad base
              that does not churn. The living comes from memberships and paid posts, where the
              platform’s cut is 2.9% today.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <Callout
          title="See it running"
          actions={
            <>
              <Button href={SOCIAL_URL} variant="primary" showExternalIcon={false}>
                Explore creators
              </Button>
              <Button href={SOCIAL_URL} variant="secondary">
                Become a creator
              </Button>
            </>
          }
        >
          Creators are live on the platform now, each with a vault on chain. Read their feeds,
          park something small, take it back out — the withdraw button is the fastest way to
          believe the rest of this page.
        </Callout>
      </Section>
    </>
  );
}
