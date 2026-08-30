// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { CommunityArt } from '@/components/ui/PageArt';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card, LinkCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Book, Chart } from '@/components/ui/Icons';
import { DAPP_URL } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Where ProjectX is discussed, watched and verified — and how to reach the people running it.',
};

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Watch it, question it, verify it"
        lead="A protocol that settles real money in public is best held to account in public. These are the places to do it."
        art={<CommunityArt className="w-full" />}
      />

      <Section>
        <SectionHeader
          eyebrow="Channels"
          title="Where to find us"
          lead="Announcements, incident notes and settlement records. If a channel is not listed here, it is not ours."
        />

        <Callout tone="lit" className="mt-10">
          <p>
            <strong>These three X accounts are ours, and nothing else is.</strong>{' '}
            <a href="https://x.com/protocolx_io" className="underline decoration-white/30 underline-offset-2 hover:decoration-white" rel="noopener noreferrer" target="_blank">@protocolx_io</a>{' '}
            (the draws — launched 29 August 2026),{' '}
            <a href="https://x.com/ProjectX_Sui" className="underline decoration-white/30 underline-offset-2 hover:decoration-white" rel="noopener noreferrer" target="_blank">@ProjectX_Sui</a>{' '}
            (the estate) and{' '}
            <a href="https://x.com/weirsocial" className="underline decoration-white/30 underline-offset-2 hover:decoration-white" rel="noopener noreferrer" target="_blank">@weirsocial</a>{' '}
            (Weir, in its own voice). There is no Discord and no Telegram. Any account not named
            on this page is not ours, and nobody from ProjectX will ever contact you first, ask
            for a seed phrase, or ask you to sign a transaction.
          </p>
          <p className="mt-3">
            The channels announce; the chain proves. Every figure on this site still resolves to
            an object you can open yourself, and nothing said in a channel outranks what the
            contract shows.
          </p>
        </Callout>

        <Card className="mt-6 border-px-gold/25">
          <h3 className="text-base font-semibold text-white">On impersonation</h3>
          <p className="mt-3 text-[1rem] leading-[1.65] text-px-muted">
            ProjectX will never DM you first, never ask for a seed phrase, and never run a
            giveaway that requires you to send funds anywhere. Any account doing those things
            is not us regardless of how convincing it looks. When in doubt, come back to this
            page — the links here are the canonical set.
          </p>
        </Card>
      </Section>

      <Section tone="panel">
        <SectionHeader
          eyebrow="Verify instead"
          title="You do not have to trust a community either"
          lead="Everything discussed in a channel resolves to state on chain, and that state is readable without asking anyone."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <LinkCard
            href="/interfaces"
            title="Live protocol state"
            eyebrow="Proof"
            icon={<Chart className="h-5 w-5" />}
          >
            Every interface reads the pool directly — the invariant, the ledger, the oracle
            and every settled epoch, straight from the chain.
          </LinkCard>
          <LinkCard
            href="/builders"
            title="Read it yourself"
            eyebrow="API"
            icon={<Book className="h-5 w-5" />}
          >
            The read API and the on-chain events, so you can index the protocol without
            depending on us at all.
          </LinkCard>
        </div>

        <Callout
          className="mt-10"
          title="Found something? Tell us first"
          actions={
            <>
              <Button href="/security" variant="primary" className="px-5">
                Report a vulnerability
              </Button>
              {DAPP_URL && (
                <Button href={DAPP_URL} variant="secondary">
                  Open the Vault
                </Button>
              )}
            </>
          }
        >
          A report that arrives before an exploit is worth far more to everyone than one that
          arrives after.
        </Callout>
      </Section>
    </>
  );
}
