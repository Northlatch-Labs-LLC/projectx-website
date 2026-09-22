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
    'Straight answers about ProtocolX Verify: what the five gates measure, what it costs, why running it yourself is free, why it is not an audit, what your repository needs, what the evidence bundle contains, and what Northlatch Labs will not claim. Plus how to enter a draw for free.',
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
          A published GitHub Action and a hosted GitHub App. Added to a Sui Move repository,
          either puts five check runs from the ProtocolX Verification Standard on every pull
          request — build, digest, tests, pin and mutation-smoke — run by the same engine that
          measures Northlatch Labs&rsquo; own mainnet contracts. The five are described one by one
          on the{' '}
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
          What the App produces is measured evidence: verdicts, survivor counts and a bundle whose
          digest reproduces. Northlatch Labs wrote the contracts it verifies here, and where it
          verifies yours it is the layer below your audit, not your auditor.
        </>
      ),
    },
    {
      question: 'What does it cost?',
      answer: (
        <>
          <p>
            Running the Action yourself costs nothing. The licence grants production use in your
            own CI against your own code, on public and private repositories alike, with nothing
            to sign, nothing metered and nothing transmitted to Northlatch Labs — and it does not
            expire. The two hosted things are priced.
          </p>
          <p className="mt-3">
            The First Report is from $1,000: one Move package, all five gates, returned as an
            evidence bundle whose digest you can re-derive without us, paid in USDC on Sui.
            Turnaround is agreed in writing when you order; none has been delivered yet. Public
            repositories only, no remediation, and no claim of independence.
          </p>
          <p className="mt-3">
            The App is $249 per repository per month, or $2,490 a year, and one public repository
            is free permanently — no expiry. The first three repositories are $149 and keep that
            price for as long as the app runs on them. Sprints sit above both and are quoted flat,
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
          and names the file it looked for. A gate that never reported at all is swept to an
          explicit failure at the end of the run: never ran must not read as passed.
        </>
      ),
    },
    {
      question: 'A mutation survived. Is my contract broken?',
      answer: (
        <>
          No. A survivor names an assertion that no test exercises: a gap in your suite, not a
          defect in your contract. The report is checked against a word list so it cannot be
          promoted into one. A passing suite says nothing about what you never tested.
        </>
      ),
    },
    {
      question: 'Can I use it today?',
      answer: (
        <>
          Yes. The Action is published: add it to your own CI and it runs today, free, on public
          and private repositories alike, with nothing to sign and no expiry. The hosted App,
          where Northlatch Labs runs the gates for you, is not listed for self-serve installation,
          so that one is installed by arrangement over email.
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
          that has not opted in gets an explanation, never a red cross.
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
          Yes. The digest reproduces from the bundle&rsquo;s own contents, so the artifact keeps
          its meaning without Northlatch Labs.
        </>
      ),
    },
    {
      question: 'Can you measure a private repository?',
      answer: (
        <>
          The First Report is public repositories only. For anything beyond that, ask: no
          published term covers it.
        </>
      ),
    },
    {
      question: 'How long does a First Report take, and how is it paid?',
      answer: (
        <>
          Inside 24 hours, in USDC on Sui. It covers one Move package and all five gates. It comes
          with no remediation and no claim of independence.
        </>
      ),
    },
  ];

  const honesty = [
    {
      question: 'Has any of this been independently audited?',
      answer: (
        <>
          No third party has reviewed this code. The protocol package carries 75 Move tests and
          the vault package 170, and the vault&rsquo;s no-loss invariant is enforced by the Move
          type system rather than by runtime checks. Neither of those is a review. The threat
          model, including where it stops, is on the{' '}
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
            What you can read instead is the chain. Every deployed package is listed with its
            identifier on{' '}
            <Link href="/chain" className="text-px-accent underline underline-offset-4">
              the on-chain record
            </Link>
            .
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
          trust assumption in the system.
        </>
      ),
    },
    {
      question: 'What happens to any of this if you disappear?',
      answer: (
        <>
          The contracts keep working. They are objects on Sui with public entry points and depend
          on no daemon, no API and no website. An evidence bundle keeps its meaning for the same
          reason: its digest reproduces from the bundle, not from a server.
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
          , rather than as a public issue. We aim to acknowledge within 72 hours. A report that
          arrives before an exploit is worth more than one that arrives after. Early and imperfect
          beats late.
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
            there is no door to walk through.
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
        lead="Verification is the product: five gates on a Sui Move package, measured and never called an audit."
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
          lead="These are the questions where the true answer is the weaker one."
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
          <h3 className="text-subhead font-semibold text-white">
            Alternative Method of Entry (AMOE)
          </h3>
          <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5 text-body text-px-muted">
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
          <p className="mt-5 text-body text-px-muted">
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
