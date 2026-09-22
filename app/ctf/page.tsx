// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Capstone } from '@/components/ctf/Capstone';
import { Finale } from '@/components/ctf/Finale';
import { CtfArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { Signature } from '@/components/ui/Signature';
import { AddressChip } from '@/components/ui/AddressChip';
import { Warning, ShieldCheck, Code, Sparkle } from '@/components/ui/Icons';
import {
  CHALLENGES,
  DIFFICULTY_ORDER,
  OUT_OF_SCOPE_LIVE_POOL,
  SCOPE,
  TARGET,
  isCtfConfigured,
  totalPoints,
  type Difficulty,
} from '@/lib/ctf';
import { EXPLORER } from '@/lib/chain';
import { getStats } from '@/lib/stats';

export const metadata: Metadata = {
  title: 'Capture the flag',
  description:
    'Eight challenges built from ProjectX’s own internal review findings, running against a retired mainnet deployment. Real vulnerabilities, real chain, no depositor funds exposed.',
};

const TONE: Record<Difficulty, { badge: 'prize' | 'accent' | 'gold' | 'danger'; ring: string }> = {
  'Warm-up': { badge: 'prize', ring: 'border-px-prize/25' },
  Standard: { badge: 'accent', ring: 'border-px-accent/25' },
  Hard: { badge: 'gold', ring: 'border-px-gold/25' },
  Capstone: { badge: 'danger', ring: 'border-px-danger/30' },
};

export default async function CtfPage() {
  const configured = isCtfConfigured();
  const STATS = await getStats();

  return (
    <>
      <PageHeader
        eyebrow="Capture the flag"
        title="Break the old one. Learn the new one."
        lead="Eight challenges, built from ProjectX’s own internal review findings and running against a retired mainnet deployment."
        proof="These are not invented puzzles. Each one is a vulnerability that existed in v1.0, was found in review, and was fixed in v1.0.1 — you are reproducing real findings on the real chain."
        art={<CtfArt className="w-full" />}
      >
        <Badge tone="accent">{CHALLENGES.length} challenges</Badge>
        <Badge tone="neutral">{totalPoints().toLocaleString('en-US')} points</Badge>
        <Badge tone="prize">
          <ShieldCheck className="h-3.5 w-3.5" />
          No depositor funds exposed
        </Badge>
      </PageHeader>

      <Section id="scope">
        <div className="panel border-px-gold/40 p-6 md:p-8">
          <div className="flex gap-4">
            <Warning className="mt-0.5 h-6 w-6 shrink-0 text-px-gold" />
            <div className="flex w-full flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-title font-semibold text-white">Read the scope first</h2>
                <p className="body-copy">
                  The range is a retired v1.0 deployment, taken out of service when v1.0.1
                  shipped. Its balances were migrated at that point, so no depositor funds are
                  exposed here. The live pool is not a target and never will be.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <span className="label text-px-prize">In scope</span>
                  <ul className="flex flex-col gap-2.5">
                    {SCOPE.inScope.map((item) => (
                      <li key={item} className="flex gap-2.5 text-body text-px-muted">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-px-prize" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="label text-px-danger">Out of scope</span>
                  <ul className="flex flex-col gap-2.5">
                    {SCOPE.outOfScope.map((item) => (
                      <li key={item} className="flex gap-2.5 text-body text-px-muted">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-px-danger" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-px-danger/25 bg-px-danger/[0.04] p-5">
                <span className="label text-px-danger">Never a target</span>
                <p className="text-body text-px-muted">
                  {STATS.live
                    ? 'The live v1.0.1 pool holds real deposits.'
                    : `The live v1.0.1 pool is out of scope. It holds no deposits today (read ${STATS.capturedOn}) and a small prize balance.`}{' '}
                  If you find something there, it is
                  a real vulnerability all the same — report it privately through{' '}
                  <Link href="/security" className="text-px-accent underline underline-offset-4">
                    the disclosure route
                  </Link>
                  . It is worth more to everyone as a report than as a flag.
                </p>
                <AddressChip
                  id={OUT_OF_SCOPE_LIVE_POOL}
                  label="live pool · off limits"
                  href={`${EXPLORER}/object/${OUT_OF_SCOPE_LIVE_POOL}`}
                  className="w-fit"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <span className="label">The range</span>
            <h3 className="mt-3 text-subhead font-semibold text-white">{TARGET.label}</h3>
            <p className="mt-3 text-body text-px-muted">
              A real deployment on {TARGET.network}: real gas, real shared objects and real
              failure modes, which a local sandbox gets wrong. Drained and migrated when v1.0.1
              shipped, then left standing so the code that made these mistakes can still be run
              against.
            </p>

            {configured ? (
              <div className="mt-5 flex flex-col items-start gap-2.5">
                <AddressChip id={TARGET.packageId} label="package" href={`${TARGET.explorerBaseUrl}/object/${TARGET.packageId}`} />
                <AddressChip id={TARGET.poolId} label="pool" href={`${TARGET.explorerBaseUrl}/object/${TARGET.poolId}`} />
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-px-gold/30 bg-px-gold/[0.04] p-4">
                <p className="text-body text-px-muted">
                  <span className="font-semibold text-px-gold">Being finalised.</span> The
                  retired deployment&rsquo;s identifiers are not published. They will be listed
                  here with explorer links.
                </p>
              </div>
            )}
          </Card>

          <Card>
            <span className="label">House rules</span>
            <ol className="mt-4 flex list-decimal flex-col gap-2.5 pl-5 text-body text-px-muted">
              <li>Use your own wallet and your own gas. Nothing here is sponsored.</li>
              <li>
                A flag is a transaction digest: the state you made true, and the call that
                made it.
              </li>
              <li>Do not grief other players. The range is shared.</li>
              <li>
                Found something outside scope? Stop and disclose. That is worth more than the
                points.
              </li>
            </ol>
          </Card>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────────────────────────────
          The board teaches v1.0 and its fixes in v1.0.1, so it states the mechanism under test:
          a player cannot reproduce a finding without knowing what the contract was trying to do.

          Deliberately a briefing and not a duplicate. Four paragraphs of mechanism, then the two
          links that carry the detail: /protocol for the full record and /chain for the
          identifiers. Parameters must be read from the page that owns them rather than copied
          here, where the copy can drift.
          ─────────────────────────────────────────────────────────────────────────────────────── */}
      <Section id="target-contract" tone="panel">
        <SectionHeader
          eyebrow="Know the target"
          title="What the contract was trying to do"
          lead="Every finding on the board is a way the v1.0 package failed at something specific. Here is what it was attempting, in four moves."
          proof="The mechanism below is v1.0.1's, the fixed version. v1.0 attempted the same four moves and got three of the eight things on this board wrong while doing it."
        />

        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            {
              step: '1 · Take',
              title: 'Principal in, receipt out',
              body: 'A deposit pays SUI into a shared pool object and receives a receipt: a Move object with key and no store, so nothing can transfer or wrap it. The principal total has exactly two writers, deposit and withdraw, and no admin function reaches it.',
            },
            {
              step: '2 · Stake',
              title: 'A ladder, so a harvest is not a liquidation',
              body: 'Sui only realises staking rewards when a stake is withdrawn, so the pool stakes in tranches of staggered age and rotates one at a time. A liquidity buffer keeps ordinary withdrawals off the ladder; a larger one pulls from the ladder head. Leaving outranks earning.',
            },
            {
              step: '3 · Draw',
              title: 'One winner, weighted by stake',
              body: 'Each epoch selects one depositor with weight proportional to share, using Sui native randomness inside a non-public entry function, so the value cannot be read and acted on in the same transaction. Ineligible slots are resampled. Eligibility begins two epochs after a deposit.',
            },
            {
              step: '4 · Settle',
              title: 'A price checked before a swap is trusted',
              body: 'The prize is converted to USDC through a DEX pool, floored by an oracle reading with a positive mean, a freshness window and a dispersion bound. The minimum output is pinned into a ticket object Move cannot drop or copy, so the transaction cannot complete unless the settlement consumes it.',
            },
          ].map((item) => (
            <li key={item.step} className="panel flex flex-col gap-3 p-6">
              <p className="font-mono text-meta font-semibold uppercase tracking-wide text-px-cyan">
                {item.step}
              </p>
              <h3 className="text-subhead font-semibold text-white">{item.title}</h3>
              <p className="text-body text-px-muted">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="text-subhead font-semibold text-white">v1.0 and v1.0.1</h3>
            <p className="mt-3 text-body text-px-muted">
              v1.0 is the retired deployment this board runs against, drained and migrated when
              v1.0.1 shipped. v1.0.1 is the live pool and is out of scope on every challenge. The
              fixes are published, so the spoiler under each card is checkable.
            </p>
          </Card>
          <Card>
            <h3 className="text-subhead font-semibold text-white">Read before you send</h3>
            <p className="mt-3 text-body text-px-muted">
              The full mechanism — every parameter, the four epoch phases, the settlement bounds and
              the six type-system properties the package relies on — is on{' '}
              <Link href="/protocol" className="text-px-accent underline underline-offset-4">
                the mechanism page
              </Link>
              . Every identifier you need, including the objects behind the live pool you must not
              touch, is on{' '}
              <Link href="/chain" className="text-px-accent underline underline-offset-4">
                the on-chain record
              </Link>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/protocol" variant="secondary">
                The mechanism in full
              </Button>
              <Button href="/chain" variant="ghost">
                Identifiers
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Signature />
      </div>

      <Section id="challenges" tone="panel">
        <SectionHeader
          eyebrow="The board"
          title="Eight findings, hardest last"
          lead="Each challenge names the internal review finding it reproduces, so you can read the fix after you land it — or before, if you would rather learn than score."
        />

        <div className="mt-12 flex flex-col gap-12">
          {DIFFICULTY_ORDER.filter((d) => d !== 'Capstone').map((difficulty) => {
            const group = CHALLENGES.filter((c) => c.difficulty === difficulty);
            if (group.length === 0) return null;

            return (
              <div key={difficulty} className="flex flex-col gap-5">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-subhead font-semibold text-white">{difficulty}</h3>
                  <span className="text-meta text-px-faint">
                    {group.length} challenge{group.length === 1 ? '' : 's'} ·{' '}
                    {group.reduce((s, c) => s + c.points, 0)} points
                  </span>
                  <span aria-hidden="true" className="hairline hidden flex-1 sm:block" />
                </div>

                <ul className="grid gap-4 lg:grid-cols-2">
                  {group.map((challenge, index) => (
                    <Reveal as="li" key={challenge.id} delay={index * 70}>
                      <article
                        className={`panel flex h-full flex-col gap-4 border p-6 md:p-7 ${TONE[challenge.difficulty].ring}`}
                      >
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Badge tone={TONE[challenge.difficulty].badge}>
                            {challenge.points} pts
                          </Badge>
                          <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-meta text-px-muted">
                            {challenge.finding}
                          </span>
                          <span className="text-meta text-px-faint">{challenge.category}</span>
                        </div>

                        <h4 className="text-heading font-semibold text-white">{challenge.title}</h4>

                        <p className="text-body text-px-muted">
                          {challenge.premise}
                        </p>

                        <div className="rounded-2xl border border-white/[0.06] bg-black/25 p-4">
                          <span className="label">Capture</span>
                          <p className="mt-2 text-meta text-px-text">
                            {challenge.objective}
                          </p>
                        </div>

                        <details className="group mt-auto [&_summary::-webkit-details-marker]:hidden">
                          <summary className="flex cursor-pointer list-none items-center gap-2 text-meta font-medium text-px-accent">
                            <span className="grid h-5 w-5 place-items-center rounded-full border border-px-accent/30 transition group-open:rotate-45">
                              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </span>
                            Spoiler — what v1.0.1 did
                          </summary>
                          <p className="proof mt-4">{challenge.lesson}</p>
                        </details>
                      </article>
                    </Reveal>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Capstone />

      <Section id="agents">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeader
            eyebrow="For agents"
            title="Machine-readable, on purpose"
            lead="This range is built for coding agents to run: same rules, same scope, same chain."
            proof="The manifest is stable JSON: challenge ids, categories, points, objectives, the target identifiers and the scope boundary, so a harness can enumerate the board without scraping this page."
          />

          <div className="flex flex-col gap-5">
            <Card>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
                  <Code className="h-5 w-5" />
                </span>
                <h3 className="text-subhead font-semibold text-white">The manifest</h3>
              </div>
              <code className="mt-4 block overflow-x-auto rounded-xl border border-white/[0.07] bg-black/40 p-4 font-mono text-meta text-px-cyan">
                GET /ctf/manifest.json
              </code>
              <p className="mt-4 text-body text-px-muted">
                Includes the scope boundary as data, not prose — an agent that reads{' '}
                <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-[0.85em] text-px-accent-200">
                  outOfScope
                </code>{' '}
                has no excuse for touching the live pool.
              </p>
              <div className="mt-5">
                <Button href="/ctf/manifest.json" variant="secondary" className="px-5">
                  Open the manifest
                </Button>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-prize/20 to-px-prize/5 text-px-prize">
                  <Sparkle className="h-5 w-5" />
                </span>
                <h3 className="text-subhead font-semibold text-white">If you are running an agent</h3>
              </div>
              <ul className="mt-4 flex flex-col gap-2.5 text-body text-px-muted">
                <li>
                  Dry-run everything first. Sui simulates for free, and a blind send does not.
                </li>
                <li>
                  Bisect with A/B transactions that differ in exactly one way. A wrong theory
                  on chain costs a redeploy; a dry-run costs nothing.
                </li>
                <li>
                  You are responsible for what your agent sends. Scope violations are yours,
                  not its.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      <Finale />
    </>
  );
}
