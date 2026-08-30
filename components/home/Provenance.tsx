// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { ShieldCheck, Code } from '@/components/ui/Icons';
import { getStats } from '@/lib/stats';
import { CHAIN_OBJECTS, NETWORK } from '@/lib/chain';
import { SECURITY_PACKAGES, SECURITY_READ_AT } from '@/lib/security-chain-read';

/**
 * The home page's block for the security practice and the on-chain record, linking to /security
 * and /chain.
 *
 * THE FIGURES COME FROM `getStats()`, the same call the block this replaced used, with the same
 * meaning.
 *
 * The two DISPLAY_FLOOR tiles that call carries — principal held and depositor count — are
 * deliberately NOT rendered here. The floor logic exists to withhold a small figure from a page
 * inviting a deposit; this block makes no such invitation and renders no call to action beside
 * the figures, so the tiles are omitted rather than floored.
 */
export async function Provenance() {
  const STATS = await getStats();

  const figures = [
    { label: 'Lost to date', value: STATS.lossesEver, tone: 'prize' as const },
    { label: 'Paid to winners', value: STATS.paidToWinners, unit: 'USDC', tone: 'prize' as const },
    { label: 'Draws settled', value: String(STATS.draws) },
  ];

  return (
    <Section tone="panel">
      <SectionHeader
        eyebrow="Provenance"
        title="Everything above resolves to something you can open"
        lead="A company that sells measurement has to be measurable. Two pages carry that: what we do to our own code before it holds anyone's money, and every package we have deployed with the identifier to check it."
        proof={`${SECURITY_PACKAGES.length} product lineages and ${CHAIN_OBJECTS.length} vault objects on ${NETWORK}, each one resolvable on a block explorer. Upgrade authority last read from chain ${SECURITY_READ_AT}.`}
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal>
          <Card className="flex h-full flex-col">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-prize/20 to-px-prize/5 text-px-prize">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-semibold text-white">Our security steps</h3>
            <p className="mt-3 text-[1.0625rem] leading-[1.65] text-px-muted">
              Six things that happen before a contract sees mainnet — five of them check runs that
              fail a pull request, and one a private network of 60,000 funded wallets whose escrow
              has to come out at exactly zero. Alongside them: who holds the upgrade authority over
              every package, how to report a defect, and where the guarantees stop.
            </p>
            <p className="mt-4 text-[0.875rem] leading-[1.6] text-px-faint">
              No third party has reviewed any of this code, and the page says so in its own words
              rather than leaving you to notice.
            </p>
            <div className="mt-6">
              <Button href="/security" variant="secondary" className="px-5">
                The practice, and its perimeter
              </Button>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={90}>
          <Card className="flex h-full flex-col">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
              <Code className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-semibold text-white">ProtocolX on chain</h3>
            <p className="mt-3 text-[1.0625rem] leading-[1.65] text-px-muted">
              Weir, Names, Draws and the Prize Vault, each a published Move package on{' '}
              {NETWORK} with its identifier, its upgrade count and the current holder of its
              upgrade capability — plus the {CHAIN_OBJECTS.length} objects the vault pool is made
              of, down to the validator and the price feed.
            </p>
            <p className="mt-4 text-[0.875rem] leading-[1.6] text-px-faint">
              Every one of them opens on a block explorer. Reading them does not depend on this
              website being up, on our API answering, or on us existing.
            </p>
            <div className="mt-6">
              <Button href="/chain" variant="secondary" className="px-5">
                The deployment record
              </Button>
            </div>
          </Card>
        </Reveal>
      </div>

      {/* Under a heading that says what they measure. No call to action beside them: the vault's
          interface was retired on 25 August 2026 and there is nothing to press. */}
      <div className="mt-12">
        <p className="label mb-5 text-center">The vault&rsquo;s record so far</p>
        <dl className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-x-6 gap-y-7 border-y border-white/[0.07] py-8 sm:grid-cols-3">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1.5 text-center">
              <dt className="label">{f.label}</dt>
              <dd className="flex items-baseline gap-1">
                <AnimatedNumber
                  value={f.value}
                  className={`font-mono text-2xl font-semibold tabular-nums ${
                    f.tone === 'prize' ? 'text-px-prize' : 'text-white'
                  }`}
                />
                {f.unit ? <span className="text-xs text-px-faint">{f.unit}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[0.9375rem] leading-[1.6] text-px-faint">
          The vault&rsquo;s contract is live on Sui mainnet and no interface serves it at present.
          Every draw settled so far was funded by a sponsor rather than by pooled yield, and each
          funding transaction is on chain.{' '}
          <Link href="/protocol" className="text-px-accent underline underline-offset-4">
            How the mechanism works
          </Link>
          {' · '}
          <Link href="/ctf" className="text-px-accent underline underline-offset-4">
            Attack the retired version
          </Link>
        </p>
      </div>
    </Section>
  );
}
