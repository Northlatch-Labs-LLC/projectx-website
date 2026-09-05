// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { FaqArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { FaqList } from '@/components/ui/Faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Straight answers about ProtocolX Verify: what the five gates measure, what it costs, why it is not an audit, what your repository needs, what the evidence bundle contains, and what we will not claim. Plus how to enter a draw for free.',
};

/**
 * INVARIANT: every answer on this page restates something already published on /verification or
 * /verification/install — the five gates, the neutral conditions, the qualifying config, the
 * bundle and its digest, the two prices, the independence clause. No answer here may state a
 * claim that is not already published on one of those pages; where the published material does
 * not settle a question, the answer says "ask us" rather than guessing.
 *
 * The AMOE block below is legal text and carries its own DO-NOT-EDIT note. See it before
 * touching anything in that section.
 */
export default function FaqPage() {
  const product = [
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
            The First Report is from $1,000: one Move package, all five gates, returned as an
            evidence bundle whose digest you can re-derive without us, paid in USDC on Sui.
            Turnaround is agreed in writing when you order; none has been delivered yet. Public
            repositories only, no remediation, and no claim of independence.
          </p>
          <p className="mt-3">
            The App is $149 per repository per month, or $1,490 a year, and one public repository
            is free permanently — no expiry. Sprints sit above both and are quoted flat,
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

  const running = [
    {
      question: 'What does my repository actually need?',
      answer: (
        <>
          <p>
            A Sui Move package — a directory holding a <code>Move.toml</code> that{' '}
            <code>sui move build</code> and <code>sui move test</code> can run in — and one file at
            the repository root. <code>.protocolx-verify.json</code> has a single required key,{' '}
            <code>package</code>, naming the path to that directory. There is no dashboard to
            configure and no account to create.
          </p>
          <p className="mt-3">
            Two optional files each turn one more gate from neutral into live: a{' '}
            <code>ci-expected-digest</code> beside your Move.toml, and an executable{' '}
            <code>scripts/check-framework-pin.sh</code> inside the package.{' '}
            <Link
              href="/verification/install"
              className="text-px-accent underline underline-offset-4"
            >
              The full requirement, with the config
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      question: 'What happens if I install it before I have configured anything?',
      answer: (
        <>
          All five checks complete neutral, each carrying its own setup instructions. A repository
          that has not opted in gets an explanation, never a red cross. This is deliberate: a
          failing check on a repository that never asked to be measured is a false accusation, and
          the first thing a new user would learn from it is to distrust the next verdict too.
        </>
      ),
    },
    {
      question: 'What do I actually receive?',
      answer: (
        <>
          An evidence bundle: a manifest and a report, with a digest over them, written on every
          run and uploaded with it. A check run is five coloured rows that live as long as GitHub
          keeps the page. The bundle is the file someone else can hold — a funder, a counterparty
          or an auditor — and check against a later commit.
        </>
      ),
    },
    {
      question: 'Can I re-derive the digest without you?',
      answer: (
        <>
          Yes, and that is the whole design. A measurement you can only confirm by asking us again
          is not evidence, it is a reference. The digest reproduces from the bundle&rsquo;s own
          contents, so the artifact keeps its meaning if we are unreachable, uninterested, or gone.
        </>
      ),
    },
    {
      question: 'Can you measure a private repository?',
      answer: (
        <>
          The First Report is public repositories only, and its terms say so. For anything beyond
          that, ask us rather than reading an answer off this page — it is not something published
          material settles, and this page will not guess at a commercial term.
        </>
      ),
    },
    {
      question: 'How long does a First Report take, and how is it paid?',
      answer: (
        <>
          Inside 24 hours, in USDC on Sui. It covers one Move package and all five gates. It comes
          with no remediation and no claim of independence — both are stated up front rather than
          discovered afterwards, because a scope a buyer learns late is a scope they were sold
          badly.
        </>
      ),
    },
  ];

  const honesty = [
    {
      question: 'Has any of this been independently audited?',
      answer: (
        <>
          No. No third party has reviewed this code, and we will not imply one has. On this
          laptop&rsquo;s last run (3 September 2026) the protocol package passed 75 Move tests and
          the vault package 170, and the vault&rsquo;s no-loss invariant is enforced by the Move
          type system rather than by runtime checks, which is a real guarantee and not the same
          thing as a review. The complete threat model, including where it stops, is on the{' '}
          <Link href="/security" className="text-px-accent underline underline-offset-4">
            security page
          </Link>
          .
        </>
      ),
    },
    {
      question: 'Can I read your source?',
      answer: (
        <>
          <p>
            Some of it. github.com/Northlatch-Labs-LLC/weir-protocol carries the Weir contracts
            (BUSL-1.1) and six libraries (Apache-2.0). The vault, draws, names and the
            verification engine are not published; their bytecode is readable on any explorer.
          </p>
          <p className="mt-3">
            What you can read instead is the chain. Every package we have deployed is listed with
            its identifier on{' '}
            <Link href="/chain" className="text-px-accent underline underline-offset-4">
              the on-chain record
            </Link>
            , and published Move bytecode is readable on any explorer without our permission.
          </p>
        </>
      ),
    },
    {
      question: 'Who can change your contracts after they are deployed?',
      answer: (
        <>
          The holder of each package&rsquo;s UpgradeCap, and every one of those holders is
          published by name and identifier on{' '}
          <Link href="/chain" className="text-px-accent underline underline-offset-4">
            the on-chain record
          </Link>
          . On Sui an upgrade cannot change the types of existing objects or remove public
          functions, but it can add functions and change non-public behaviour. It is the largest
          trust assumption in the system, which is exactly why it is on a page rather than in a
          paragraph.
        </>
      ),
    },
    {
      question: 'What happens to any of this if you disappear?',
      answer: (
        <>
          The contracts keep working. They are objects on Sui with public entry points, and none of
          them depends on our daemon, our API or this website. An evidence bundle keeps its meaning
          for the same reason — its digest reproduces from the bundle, not from a server of ours.
        </>
      ),
    },
    {
      question: 'I found something. How do I report it?',
      answer: (
        <>
          Privately, to{' '}
          <a
            href="mailto:security@projectxprotocol.dev"
            className="text-px-accent underline underline-offset-4"
          >
            security@projectxprotocol.dev
          </a>
          , rather than as a public issue. We aim to acknowledge within 72 hours. A report that arrives
          before an exploit is worth considerably more to us than one that arrives after, and we
          would rather hear it early and imperfectly than late.
        </>
      ),
    },
    {
      question: 'You keep mentioning a vault. What is it, and can I use it?',
      answer: (
        <>
          <p>
            A prize pool on Sui mainnet: principal is delegated to a validator and returned 1:1,
            and the staking yield it earns is awarded to one depositor per epoch instead of split
            into pennies. The contract is live. Its interface was retired on 25 August 2026, so
            there is no door to walk through today — the mechanism is real and it is unreachable,
            and those are different sentences.
          </p>
          <p className="mt-3">
            It is documented in full on{' '}
            <Link href="/protocol" className="text-px-accent underline underline-offset-4">
              the mechanism page
            </Link>
            , and it is the subject of{' '}
            <Link href="/ctf" className="text-px-accent underline underline-offset-4">
              the capture-the-flag range
            </Link>
            , where the retired v1.0 deployment is something to attack rather than something to
            buy.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="The questions worth asking first"
        lead="Including the ones a company would usually rather you asked after. Verification is what we sell — five gates on a Sui Move package, measured and never called an audit."
        art={<FaqArt className="w-full" />}
      />

      <Section>
        <SectionHeader eyebrow="Verification" title="What we sell, and what it is not" />
        <div className="mt-8">
          <FaqList items={product} />
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="In practice"
          title="Putting it on your repository"
          lead="What it needs, what it does before you have configured anything, and what you are left holding when the run finishes."
        />
        <div className="mt-8">
          <FaqList items={running} />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="What we will not claim"
          title="The answers that cost us something"
          lead="A company selling measurement has to be measurable itself. These are the questions where the true answer is the weaker one."
        />
        <div className="mt-8">
          <FaqList items={honesty} />
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────────────────────────────
          DO NOT EDIT THIS SECTION.

          Legal text, carried verbatim. Two known defects are recorded here rather than fixed,
          because either fix changes a legal obligation: it promises official rules, a sponsor's
          address and an entry weighting at /legal/terms that are not published there, and its
          closing sentence routes free entry "from the DApp" — an interface retired on
          25 August 2026.
          ─────────────────────────────────────────────────────────────────────────────────────── */}
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
        <Callout
          title="Still deciding?"
          actions={
            <>
              <Button href="/verification" variant="primary" className="px-5">
                What the five gates measure
              </Button>
              <Button href="/verification/install" variant="secondary">
                Install it
              </Button>
            </>
          }
        >
          The measurement is the argument. Read what each gate refuses to accept, then decide
          whether an evidence bundle you can re-derive without us is worth a thousand dollars.
        </Callout>
      </Section>
    </>
  );
}
