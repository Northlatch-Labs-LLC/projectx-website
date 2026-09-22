// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';

const GROUPS = [
  {
    title: 'A weekend',
    note: 'Read-only. The public API and the event stream are all you need.',
    tone: 'prize' as const,
    ideas: [
      {
        name: 'A pool for one community',
        body: 'Your country, your DAO, your group chat. Same pool underneath, an interface that speaks their language and shows their currency.',
      },
      {
        name: 'Weighting and analytics',
        body: 'Show people what their real weight is, how it changed, and what the pool has paid. Nobody has built this yet.',
      },
      {
        name: 'A draw bot',
        body: 'Announce every settlement to Telegram, Discord or Farcaster the moment the transaction lands.',
      },
    ],
  },
  {
    title: 'A bigger build',
    note: 'A wallet connection and the transaction-building calls.',
    tone: 'accent' as const,
    ideas: [
      {
        name: 'A mini app',
        body: 'Deposit from inside a social feed. The whole flow is two calls and, with sponsored gas, a first-timer would need no SUI.',
      },
      {
        name: 'A savings goal app',
        body: 'Round-ups, recurring deposits, a target. The prize becomes the reason people keep going rather than the product itself.',
      },
      {
        name: 'A team pool',
        body: 'A group deposits together and agrees up front how a win is split. All the coordination is yours; the weighting is the protocol’s.',
      },
    ],
  },
  {
    title: 'A protocol',
    note: 'Move. You are extending the system, not consuming it.',
    tone: 'gold' as const,
    ideas: [
      {
        name: 'A pool in another coin',
        body: 'The pool is generic over its prize coin. Launch one that pays in whatever your users actually hold.',
      },
      {
        name: 'A second settlement venue',
        body: 'The DEX sits behind an adapter in its own package. Write another and the pool gains a route it did not have.',
      },
      {
        name: 'A charity pool',
        body: 'Same no-loss guarantee, prize routed to a cause instead of a winner. Depositors give up staking yield, never principal.',
      },
    ],
  },
];

export function Ideas() {
  return (
    <Section id="ideas">
      <SectionHeader
        eyebrow="Ideas"
        title="Nine things nobody has built yet"
        lead="A prize pool is a primitive, not a product. Here is what that actually means — none of these is the vault we run, and all of them are possible with what is published today."
        proof="Want one of these designed properly rather than named? That is what the blueprint series is for — complete designs, mathematics included."
      />

      <div className="mt-12 flex flex-col gap-10">
        {GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-5">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3
                className={`text-subhead font-semibold ${
 group.tone === 'prize'
                    ? 'text-px-prize'
                    : group.tone === 'gold'
                      ? 'text-px-gold'
                      : 'text-px-accent-200'
                }`}
              >
                {group.title}
              </h3>
              <span className="text-meta text-px-faint">{group.note}</span>
              <span aria-hidden="true" className="hairline hidden flex-1 sm:block" />
            </div>

            <ul className="grid gap-4 md:grid-cols-3">
              {group.ideas.map((idea) => (
                <li key={idea.name} className="panel panel-hover flex flex-col gap-2.5 p-6">
                  <h4 className="text-subhead font-semibold text-white">{idea.name}</h4>
                  <p className="text-body text-px-muted">{idea.body}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Callout
        className="mt-12"
        title="Building one of these?"
        actions={
          <>
            <Button href="/blueprints" variant="primary" className="px-5">
              Read the blueprints
            </Button>
            <Button href="/interfaces#build" variant="secondary">
              How to ship one
            </Button>
          </>
        }
      >
        Tell us and it goes on the interfaces page under your name. Want the mechanism and
        the mathematics worked through first? That is what the blueprint series is for.
      </Callout>
    </Section>
  );
}
