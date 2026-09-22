// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Button } from '@/components/ui/Button';
import { SOCIAL_URL } from '@/lib/links';

/**
 * The social platform, given the first product block on the page.
 *
 * CLAIMS CONSTRAINT: every claim in this section restates what the platform itself states and
 * what its contract permits, read from the live site on 18 August 2026. Where the platform is
 * blunt about its own limits (staking yield is small; free support is reach, not a salary), this
 * section stays blunt too. The full account is on /social.
 *
 * "No loss" is used the way this site's claims discipline requires (claims-banned.json): it
 * describes what happens to the supporter's principal — it is never spent — not how anything is
 * funded.
 */

const STEPS = [
  {
    step: 'Park',
    detail: 'Deposit SUI into a creator’s vault. It stays yours, in a contract, not with us.',
  },
  {
    step: 'Stake',
    detail: 'The vault delegates it to a validator as a ladder of staggered stakes.',
  },
  {
    step: 'Yield',
    detail: 'The staking yield goes to the creator. The deposit itself never does.',
  },
  {
    step: 'Leave',
    detail: 'Withdraw in full, any time. No lock-up, no notice, no approval from anyone.',
  },
];

export function Social() {
  return (
    <section id="social" className="border-t border-white/[0.07]">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <p className="label">Weir · weir.social</p>
          <h2 className="text-section">
            Support a creator without spending anything.
          </h2>
          <p className="lead">
            Every other platform asks you to give a creator money. This one asks you to lend them
            your money&rsquo;s idle time. Park SUI in a creator&rsquo;s vault: it is delegated to a
            validator, the staking yield goes to them, and the deposit stays yours — withdrawable
            in full, whenever you like.
          </p>
          <p className="text-meta text-px-muted">
            That is what the contract permits, not a policy the platform promises to honour: the
            withdrawal path answers to the supporter&rsquo;s own address, and to that address
            alone. Creators who need real revenue sell memberships and paid posts — those
            settle on chain too, and what a creator is owed is held by a contract rather than by
            the platform.
          </p>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {SOCIAL_URL && (
              <Button href={SOCIAL_URL} variant="primary" showExternalIcon={false}>
                Support a creator
              </Button>
            )}
            <Button href="/social" variant="ghost">
              How it works
            </Button>
          </div>
          <p className="text-meta text-px-muted">
            Weir is open — a Google account or a wallet is all it takes to get in.
          </p>
        </div>

        <div className="self-start">
          <p className="label mb-4">The whole loop</p>
          <ul className="grid gap-0 border-t border-white/[0.08]">
            {STEPS.map((s) => (
              <li
                key={s.step}
                className="flex items-baseline gap-4 border-b border-white/[0.08] py-4"
              >
                <span className="w-16 shrink-0 font-mono text-meta font-semibold uppercase tracking-wide text-px-cyan">
                  {s.step}
                </span>
                <span className="text-meta text-px-muted">{s.detail}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-meta text-px-faint">
            The entire price of supporting someone is the yield you would have earned staking that
            SUI yourself. Nothing leaves your wallet for good.
          </p>
        </div>
      </div>
    </section>
  );
}
