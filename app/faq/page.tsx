// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { FaqArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { FaqList } from '@/components/ui/Faq';
import { SNAPSHOT } from '@/lib/snapshot';
import { formatBps, formatDuration, formatSui } from '@/lib/format';
import { DAPP_URL, RAFFLE_URL } from '@/lib/links';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Straight answers: what ProtocolX Verify measures and what it costs, why it is not an audit, what no-loss means, how winners are chosen, how to enter for free, and what can go wrong. The vault contract is live on Sui mainnet; no interface serves it at present.',
};

export default function FaqPage() {
  const { config } = SNAPSHOT.pool;

  const verification = [
    {
      question: 'What is ProtocolX Verify?',
      answer: (
        <>
          A GitHub App. Installed on a Sui Move repository, it puts five check runs from the
          ProtocolX Verification Standard on every pull request — build, digest, tests, pin and
          mutation-smoke — run by the same engine that measures our own mainnet contracts. The
          five are described one by one on the{' '}
          <Link href="/verification" className="text-px-accent underline underline-offset-4">
            verification page
          </Link>
          .
        </>
      ),
    },
    {
      question: 'Is that an audit?',
      answer: (
        <>
          No, and it is never called one. An audit is an independent engagement by a third party.
          What the App produces is measured evidence — verdicts, survivor counts and an evidence
          bundle whose digest reproduces. Where we verify our own contracts, that is an internal
          review by the party that wrote the code. Where we verify yours, we are still not your
          auditors: we are the measured layer below the audit.
        </>
      ),
    },
    {
      question: 'What does it cost?',
      answer: (
        <>
          <p>
            The First Report is from $1,000: one Move package, all five gates, delivered inside
            24 hours as an evidence bundle whose digest you can re-derive without us, paid in
            USDC on Sui. Public repositories only, no remediation, and no claim of independence.
          </p>
          <p className="mt-3">
            The App is $149 per repository per month, or $1,490 a year, and one public repository
            is free permanently — no card, no expiry. Sprints sit above both and are quoted flat,
            in writing, before work begins.{' '}
            <Link
              href="/verification/install"
              className="text-px-accent underline underline-offset-4"
            >
              How to install it
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      question: 'Do all five checks run on every repository?',
      answer: (
        <>
          Three always do. PVS · digest needs a recorded digest beside your Move.toml and PVS ·
          pin needs an executable framework-pin script; without those files each reports neutral
          and says which file it looked for, rather than claiming to have measured something it
          did not. A gate that never reported at all is swept to an explicit failure at the end
          of the run — never ran must not read as passed.
        </>
      ),
    },
    {
      question: 'A mutation survived. Is my contract broken?',
      answer: (
        <>
          No. A survivor names an assertion that no test exercises — a gap in your suite, not a
          defect found in your contract. The report is checked against a word list so it cannot
          be promoted into one. That distinction is the whole point of the measurement: a passing
          suite tells you nothing you wrote a test for is broken, and says nothing about what you
          never tested.
        </>
      ),
    },
    {
      question: 'Can I install it today?',
      answer: (
        <>
          Not by yourself yet. The App is installable on one account and is not listed for
          self-serve installation, so early access is arranged with us by email and costs nothing
          until self-serve billing opens. That is a statement about the listing, not about the
          software — it already runs on repositories today.
        </>
      ),
    },
  ];

  const general = [
    {
      question: 'So I really can’t lose my money?',
      answer: (
        <>
          <p>
            Your principal is never spent. It is delegated to a validator and returned to you
            1:1 whenever you withdraw. The prize is designed to come from the staking yield
            that principal earns while it sits in the pool — so what a depositor gives up is
            that staking yield, which they would otherwise have earned themselves. In Alpha the
            harvester has not yet covered a prize, and every draw so far has been funded by a
            sponsor instead.
          </p>
          <p className="mt-3">
            It does not mean risk-free. Smart contracts can contain defects, and this one has
            not been independently audited. See the{' '}
            <Link href="/security" className="text-px-accent underline underline-offset-4">
              security model
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      question: 'Who decides who wins?',
      answer: (
        <>
          One depositor per epoch, selected with weight proportional to their share of
          the pool, using Sui&rsquo;s native on-chain randomness. Twice the principal is twice
          the weight. Deposits become eligible two epochs after they are made, so a deposit
          placed immediately before a draw cannot win it.
        </>
      ),
    },
    {
      question: 'How big is the prize?',
      answer: (
        <>
          The entire pool&rsquo;s staking yield for that day, converted to USDC and paid to
          one depositor. It is real yield rather than an emission or a subsidy, so the prize
          grows directly with the pool. Every prize ever paid is listed across the{' '}
          <Link href="/interfaces" className="text-px-accent underline underline-offset-4">
            interfaces
          </Link>
          , each with the transaction that paid it.
        </>
      ),
    },
    {
      question: 'When can I withdraw?',
      answer: (
        <>
          At any time. There is no lock-up, no cooldown and no pause on withdrawals — the
          contract has no mechanism to prevent one. A{' '}
          {formatBps(config.liquidityBufferBps)} buffer is kept unstaked so ordinary
          withdrawals settle immediately; a withdrawal larger than the buffer pulls stake off
          the ladder to serve you, at the pool&rsquo;s expense rather than yours.
        </>
      ),
    },
    {
      question: 'What does it cost?',
      answer: (
        <>
          <p>
            Nothing on deposit, and nothing on withdrawing your principal. The protocol takes{' '}
            {formatBps(config.stakingFeeBps)} of the gross staking yield, and{' '}
            {formatBps(config.spreadBps)} as a spread on the conversion that pays a prize.
          </p>
          <p className="mt-3">
            Leaving mid-epoch forfeits {formatBps(config.earlyExitFeeBps)} of your pro-rata
            share of the accrued prize pot. That fee is charged against the pot, never
            against your principal, which always returns in full.
          </p>
        </>
      ),
    },
    {
      question: 'Do I need SUI to pay for gas?',
      answer: (
        <>
          Usually not. Deposits and withdrawals can be sponsored, so a first deposit does not
          require you to already hold SUI for fees. Whether sponsorship is currently
          available is shown in the vault itself, next to your position.
        </>
      ),
    },
    {
      question: 'What is the minimum deposit?',
      answer: <>{formatSui(config.minDepositMist, 2)} SUI. There is no maximum.</>,
    },
    {
      question: 'Can I put money into the prize itself?',
      answer: (
        <>
          <p>
            Yes. The pot can be topped up by anyone, permissionlessly, in a single
            transaction — and several people already have. It is how a young pool gets past
            the point where its own staking yield can fund a prize worth entering.
          </p>
          <p className="mt-3">
            Be clear about what it is: a donation, not an investment. A contribution cannot be
            withdrawn, buys no position in the pool, and goes to a depositor drawn the same
            way as any other epoch.{' '}
            <Link href="/sponsor" className="text-px-accent underline underline-offset-4">
              How boosting works
            </Link>
            .
          </p>
        </>
      ),
    },
  ];

  const risk = [
    {
      question: 'Has the contract been audited?',
      answer: (
        <>
          No. No third party has reviewed this code, and we will not imply one has. The
          contract suite passes 75 tests on every build and the no-loss invariant is enforced
          by the Move type system rather than by runtime checks, which is a real guarantee but
          not the same thing as a review. The complete threat model, including where the
          guarantee stops, is on the security page and you can read all of it today.
        </>
      ),
    },
    {
      question: 'Could you run off with it?',
      answer: (
        <>
          No. No function that accepts the admin capability can reach principal, the liquid
          balance or any deposit receipt — those types are unreachable from that code path,
          and that is a compile-time property, not a policy. Admins can pause deposits and
          adjust parameters within compiled ceilings. They cannot pause withdrawals, and they
          cannot move your principal.
        </>
      ),
    },
    {
      question: 'What if a draw doesn’t happen?',
      answer: (
        <>
          The pot rolls into the next epoch. An epoch with no yield, no eligible depositor or
          an unusable price feed does not settle: it rolls over rather than aborting, so the
          pool stays in a phase the harvest can run from. A delayed prize is the failure mode;
          a lost deposit is not.
        </>
      ),
    },
    {
      question: 'What happens if the price oracle is wrong?',
      answer: (
        <>
          The reading is validated before it is trusted: a non-positive price, a zero mean,
          a sample older than the freshness window, excessive dispersion between responders
          or a value outside the permitted band each abort the settlement. A swap that would
          execute worse than {formatBps(config.maxSlippageBps)} from oracle fair value
          reverts. There is currently one feed, not several — a known limitation, published
          on the security page.
        </>
      ),
    },
    {
      question: 'Can someone steal my spot in the pool?',
      answer: (
        <>
          No, and that is a feature. The deposit receipt cannot be transferred, sold, lent or
          wrapped by any external transaction. Nobody can take your position from you —
          including through a signature you were tricked into giving.
        </>
      ),
    },
  ];

  return (
    <>
      {/* The title asked what to ask "before you deposit" — a question addressed to a visitor of
          a vault whose interface was retired in August, on the domain the Master has ruled the
          verification hub. This page also had no question at all about the thing the company
          sells: every flagship word on it came from the footer. Both fixed below; not one vault
          question was removed to do it. */}
      <PageHeader
        eyebrow="FAQ"
        title="The questions worth asking first"
        lead="Including the ones a company would usually rather you asked after. Verification is what we sell; the vault, the draws and the names are what we built, and the vault's contract is live on Sui mainnet with no interface serving it at present."
        art={<FaqArt className="w-full" />}
      />

      {/* Verification leads, by operator order of 30 August 2026. Every answer below restates
          something already published on /verification or /verification/install — the five gates,
          the neutral conditions, the bundle digest, the two prices, the independence clause.
          Nothing here is a claim this estate had not already made in writing. */}
      <Section>
        <SectionHeader
          eyebrow="Verification"
          title="What we sell, and what it is not"
        />
        <div className="mt-8">
          <FaqList items={verification} />
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeader eyebrow="Using the vault" title="How it works in practice" />
        <div className="mt-8">
          <FaqList items={general} />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Risk and control"
          title="What can go wrong, and who holds what"
        />
        <div className="mt-8">
          <FaqList items={risk} />
        </div>
      </Section>

      <Section id="amoe">
        <SectionHeader
          eyebrow="Free entry"
          title="No deposit is necessary to enter or win"
          lead="A prize draw that can only be entered by paying is a different kind of promotion, with a different legal character. ProjectX therefore has a free entry route, and it carries the same weight per entry."
        />

        <Card className="mt-10">
          <h3 className="text-base font-semibold text-white">
            Alternative Method of Entry (AMOE)
          </h3>
          <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5 text-[1rem] leading-[1.65] text-px-muted">
            <li>
              Hand-print your name, date of birth, postal address, email address and the Sui
              address you wish any prize sent to, on a plain 3&quot; × 5&quot; card.
            </li>
            <li>
              Mail it in a hand-addressed envelope with first-class postage to the sponsor
              address published in the official rules.
            </li>
            <li>
              One entry per envelope. Mechanically reproduced or bulk-submitted entries are
              void.
            </li>
            <li>
              An entry is allocated to the first draw whose epoch begins at least twenty-four
              hours after it is received and verified.
            </li>
          </ol>
          <p className="mt-5 text-[1rem] leading-[1.65] text-px-muted">
            The full procedure, the sponsor&rsquo;s address and the entry weighting are in the{' '}
            <Link href="/legal/terms" className="text-px-accent underline underline-offset-4">
              official rules
            </Link>
            , and the entry page is reachable from the DApp in every jurisdiction, including
            those where deposits are restricted.
          </p>
        </Card>
      </Section>

      <Section tone="edge">
        {/* This closed by inviting a deposit from 1 SUI. The button beside it is conditional on an
            interface existing, so with the vault's front end retired the invitation stood on its
            own with nothing to act on — a call to action is worse than a dead link, because a dead
            link at least announces itself. */}
        <Callout
          title={DAPP_URL ? 'Ready when you are' : 'Where this stands'}
          actions={
            <>
              {DAPP_URL ? (
                <Button href={DAPP_URL} variant="primary" className="px-5">
                  Open the vault
                </Button>
              ) : (
                <Button href={RAFFLE_URL} variant="primary" className="px-5">
                  See the live draws
                </Button>
              )}
              <Button href="/protocol" variant="secondary">
                How it works
              </Button>
            </>
          }
        >
          {DAPP_URL
            ? 'Deposit from 1 SUI, withdraw whenever you like, and enter every draw from the moment your deposit becomes eligible.'
            : 'The vault contract is live on Sui mainnet and everything above describes it accurately. No interface serves it at present, so there is nothing here to deposit into today. The draws are live and open to anyone.'}
        </Callout>
      </Section>
    </>
  );
}
