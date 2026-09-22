// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Badge } from '@/components/ui/Badge';
import { Warning, ShieldCheck } from '@/components/ui/Icons';
import { CHALLENGES } from '@/lib/ctf';

export function Capstone() {
  const challenge = CHALLENGES.find((c) => c.difficulty === 'Capstone');
  if (!challenge) return null;

  return (
    <section className="relative isolate w-full overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-px-gold/[0.06] blur-[130px]"
      />

      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 md:py-24">
        <div className="panel panel-lit overflow-hidden">
          <div className="flex flex-wrap items-center gap-4 border-b border-white/[0.07] bg-white/[0.02] px-8 py-6 md:px-12">
            <span className="flex items-center gap-3">
              <span className="relative inline-flex h-11 w-11 items-center justify-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl bg-px-gold/25 blur-lg"
                />
                <span className="ring-gradient relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/40 text-px-gold">
                  <ShieldCheck className="h-5 w-5" />
                </span>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="label text-px-gold">Capstone</span>
                <span className="text-meta text-px-faint">No known solution</span>
              </span>
            </span>

            <span className="ml-auto flex items-baseline gap-2">
              <span className="font-mono text-heading font-semibold tabular-nums text-px-gold">
                {challenge.points.toLocaleString('en-US')}
              </span>
              <span className="text-meta text-px-faint">pts</span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-7 px-8 py-12 text-center md:px-12 md:py-16">
            <h3 className="text-gradient-chrome text-heading">{challenge.title}</h3>

            <div className="ring-gradient w-full max-w-2xl rounded-3xl bg-black/40 px-6 py-8">
              <span className="label">The claim under attack</span>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-heading font-medium tabular-nums">
                <span className="text-px-accent-200">liquid</span>
                <span className="text-px-faint">+</span>
                <span className="text-px-accent-200">staked</span>
                <span className="text-px-gold">==</span>
                <span className="text-px-prize">total principal</span>
              </p>
              <p className="mt-4 text-meta text-px-faint">
                Enforced by the Move type system, not by a runtime check.
              </p>
            </div>

            <p className="body-copy mx-auto">
              No function taking an admin capability can reach principal at all. This
              challenge is not a known bug, and there is no intended solution.{' '}
              <span className="text-px-text">It is the wall.</span>
            </p>

            <div className="w-full max-w-2xl rounded-3xl border border-white/[0.07] bg-black/25 p-6 text-left">
              <span className="label">Capture</span>
              <p className="mt-2.5 text-body text-px-text">
                {challenge.objective}
              </p>
            </div>

            <div className="flex w-full max-w-2xl gap-4 rounded-3xl border border-px-gold/40 bg-px-gold/[0.06] p-6 text-left">
              <Warning className="mt-0.5 h-6 w-6 shrink-0 text-px-gold" />
              <div className="flex flex-col gap-2">
                <span className="font-display text-body font-medium text-white">
                  If you solve this, do not submit it as a flag
                </span>
                <p className="text-meta text-px-muted">
                  Stop and disclose it privately — on any deployment, including the retired
                  one. It would be the most important finding in the protocol&rsquo;s history,
                  and it is worth far more to everyone as a report than as points.
                </p>
              </div>
            </div>

            <Badge tone="neutral" className="mt-1">
              {challenge.category}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
