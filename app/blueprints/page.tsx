
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { BlueprintsArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { Warning } from '@/components/ui/Icons';
import { BLUEPRINTS } from '@/lib/blueprints';

export const metadata: Metadata = {
  title: 'Blueprints',
  description:
    'One buildable system on top of ProjectX every week — with the mathematics worked through, a revenue model, and the failure modes named.',
};

export default function BlueprintsPage() {
  const published = BLUEPRINTS.filter((b) => b.status === 'Published');
  const upcoming = BLUEPRINTS.filter((b) => b.status !== 'Published');

  return (
    <>
      <PageHeader
        eyebrow="Blueprints"
        title="One system worth building, every week"
        lead="Not app ideas. Complete designs — the mechanism, the mathematics, what it earns, and what breaks it."
        proof="Every figure below is derived from the protocol's published parameters. If governance moves one, the arithmetic moves with it and the blueprint says which."
        art={<BlueprintsArt className="w-full" />}
      >
        <Badge tone="prize">{published.length} published</Badge>
        <Badge tone="neutral">{upcoming.length} in the pipeline</Badge>
      </PageHeader>

      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-5xl font-semibold text-px-accent/30">01</span>
          <div className="flex flex-col gap-1">
            <span className="label text-px-accent-300">Blueprint · published</span>
            <h2 className="text-title text-white">The liquidity underwriter</h2>
          </div>
        </div>

        <p className="lead mt-6">
          Serve large withdrawals instantly out of your own SUI, reclaim from the pool at the
          next natural tranche rotation, and get paid for the difference. The pool stops
          having its yield engine reset by exit traffic; you earn a fee for holding inventory.
        </p>

        <div className="mt-12 flex flex-col gap-10">
          <Block
            step="The problem"
            title="Exits reset the thing that earns the prize"
          >
            <p>
              Principal is staked in six tranches of staggered age. A tranche has to sit for
              six complete Sui epochs before it is rotated and its rewards realised — that is
              where the prize comes from.
            </p>
            <p>
              A <strong>10% liquidity buffer</strong> stays unstaked so ordinary withdrawals
              never touch the ladder. But a withdrawal larger than the buffer pulls tranches
              off the ladder head <em>regardless of maturity</em>, and a tranche pulled at age
              four realises nothing. Its clock starts again from zero.
            </p>
            <p>
              This is not hypothetical. It is the documented reason this pool ran with zero
              realised yield through its early epochs: continuous withdrawal traffic kept the
              ladder permanently immature. <strong>Exit traffic is the yield engine&rsquo;s
              main adversary</strong>, and nothing in the protocol currently absorbs it.
            </p>
          </Block>

          <Block step="The mechanism" title="Stand between the exit and the ladder">
            <ol>
              <li>
                A depositor wants out with an amount larger than the remaining buffer.
              </li>
              <li>
                You pay them immediately, in full, from your own SUI. They are done — same
                block, no wait, no ladder touched.
              </li>
              <li>
                You take their exit position and reclaim from the pool at the{' '}
                <em>next natural rotation</em>, when a mature tranche comes off the ladder
                anyway.
              </li>
              <li>You keep a fee for having carried the timing risk.</li>
            </ol>
            <p>
              The user is never worse off — they were leaving anyway and they leave sooner.
              The pool is strictly better off: a rotation that would have been forced early
              now happens on schedule. You are paid for inventory and patience.
            </p>
          </Block>

          <Block step="The mathematics" title="Sizing capital against the exit tail">
            <p>
              Two numbers decide whether this is a business. Both are estimable from the
              public event stream before you commit a single SUI.
            </p>

            <Formula
              label="When the ladder gets hit"
              body="P(disturbance) = P(W − D > b)"
              note="W is withdrawals in an epoch, D is deposits, b is the remaining buffer. Netting deposits against withdrawals is free and already removes most events — you only underwrite the residual tail."
            />

            <Formula
              label="What the fee has to clear"
              body="fee ≥ r · E[T] · amount + σ-premium"
              note="r is your cost of capital per epoch, E[T] the expected hold time to the next rotation — bounded above by the six-epoch ladder depth — and the premium covers the variance in T, not its mean."
            />

            <p>
              Because <strong>T is bounded</strong>, this is a genuinely well-behaved
              inventory problem rather than an open-ended loan book. Your worst case is
              knowable: you hold for at most one full ladder cycle. Size your float against
              the <em>tail</em> of the exit-size distribution, not its mean — the mean exit
              never touches the buffer, and the whole business lives in the tail.
            </p>
            <p>
              Estimate all of it from <code>WithdrawalMade</code> and{' '}
              <code>DepositMade</code> events over the pool&rsquo;s history. The distribution
              you need is already public.
            </p>
          </Block>

          <Block step="The build" title="Non-custodial, off-chain, no Move required">
            <ul>
              <li>
                Watch the event stream for exits approaching the buffer edge.
              </li>
              <li>
                Quote a fee from your inventory model and the current ladder ages.
              </li>
              <li>
                Settle with the user directly; reclaim from the pool on rotation.
              </li>
              <li>
                Publish your fills. An underwriter whose quotes are public is one people
                route to.
              </li>
            </ul>
            <p>
              You never hold user funds — you pay them <em>out</em>. That single property is
              what keeps this a service rather than a custody business, and it is worth
              designing around from the first line.
            </p>
          </Block>

          <Block step="What breaks it" title="Read this before you fund the float" tone="warn">
            <ul>
              <li>
                <strong>Correlated exits.</strong> Withdrawals cluster. Size for the day
                everyone leaves at once, not the average day.
              </li>
              <li>
                <strong>Parameter risk.</strong> Governance can move the buffer and the ladder
                depth within compiled ceilings. Both are inputs to your pricing — watch{' '}
                <code>ConfigUpdated</code> and reprice, or you are quoting yesterday&rsquo;s
                protocol.
              </li>
              <li>
                <strong>You are taking real risk.</strong> The no-loss guarantee protects
                depositors&rsquo; principal. It does not protect yours. This is a business
                with a balance sheet, and it can lose money.
              </li>
              <li>
                <strong>Regulatory shape.</strong> Fronting capital against a future claim
                looks like credit in some jurisdictions. Get advice before you scale it.
              </li>
            </ul>
          </Block>
        </div>

        <Callout
          className="mt-12"
          title="Everything this needs is already public"
          actions={
            <>
              <Button href="/builders#api" variant="primary" className="px-5">
                The events you need
              </Button>
              <Button href="/protocol" variant="secondary">
                How the ladder works
              </Button>
            </>
          }
        >
          The exit-size distribution, the ladder ages and the buffer state all come off the
          public event stream — you can size the model before committing a single SUI.
        </Callout>
      </Section>

      <Section tone="panel" id="pipeline">
        <SectionHeader
          eyebrow="The pipeline"
          title="What’s coming, and in what order"
          lead="Published in advance so you can take one before we write it. If you build a blueprint, it becomes yours — we will link to it rather than compete with it."
        />

        <ul className="mt-12 flex flex-col gap-4">
          {upcoming.map((blueprint, index) => (
            <Reveal as="li" key={blueprint.no} delay={index * 60}>
              <div className="panel panel-hover flex flex-col gap-5 p-6 md:flex-row md:gap-8 md:p-7">
                <div className="flex shrink-0 items-start gap-4 md:w-64">
                  <span className="font-mono text-3xl font-semibold text-px-accent/30">
                    {blueprint.no}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-white">{blueprint.title}</h3>
                    <Badge
                      tone={blueprint.status === 'Next' ? 'accent' : 'neutral'}
                      className="w-fit"
                    >
                      {blueprint.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  <p className="text-[1.0625rem] leading-[1.65] text-px-muted">{blueprint.summary}</p>
                  <dl className="grid gap-x-8 gap-y-3 text-[0.9375rem] sm:grid-cols-2">
                    <div className="flex flex-col gap-0.5">
                      <dt className="label">Earns</dt>
                      <dd className="text-px-faint">{blueprint.revenue}</dd>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <dt className="label">Maths</dt>
                      <dd className="text-px-faint">{blueprint.maths}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-px-muted">
                      {blueprint.difficulty}
                    </span>
                    {blueprint.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-px-faint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Card className="mt-8">
          <h3 className="text-base font-semibold text-white">Want one sooner?</h3>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            The order is not fixed. A builder who is actually blocked on one moves it to the
            front faster than any roadmap does — say so in the{' '}
            <Link href="/community" className="text-px-accent underline underline-offset-4">
              community channels
            </Link>
            .
          </p>
        </Card>
      </Section>
    </>
  );
}

function Block({
  step,
  title,
  children,
  tone = 'default',
}: {
  step: string;
  title: string;
  children: React.ReactNode;
  tone?: 'default' | 'warn';
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[14rem_1fr] lg:gap-10">
      <div className="flex flex-col gap-2">
        <span className="label text-px-accent-300">{step}</span>
        <h3
          className={`text-xl font-semibold ${tone === 'warn' ? 'text-px-gold' : 'text-white'}`}
        >
          {title}
        </h3>
        {tone === 'warn' ? <Warning className="h-5 w-5 text-px-gold" /> : null}
      </div>
      <div className="prose-px max-w-3xl">{children}</div>
    </div>
  );
}

function Formula({ label, body, note }: { label: string; body: string; note: string }) {
  return (
    <div className="my-6 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-black/30 p-5">
      <span className="label">{label}</span>
      <code className="overflow-x-auto font-mono text-base text-px-accent-200">{body}</code>
      <p className="text-[0.875rem] leading-[1.6] text-px-faint">{note}</p>
    </div>
  );
}
