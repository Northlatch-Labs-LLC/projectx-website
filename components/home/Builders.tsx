// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Book, Code, Chart } from '@/components/ui/Icons';

export function Builders() {
  const items = [
    {
      icon: <Code className="h-5 w-5" />,
      title: 'Read API',
      body: 'Pool state, settlements and revenue over plain HTTP. No key required.',
    },
    {
      icon: <Chart className="h-5 w-5" />,
      title: 'On-chain events',
      body: 'Index the protocol yourself and depend on nothing we operate.',
    },
    {
      icon: <Book className="h-5 w-5" />,
      title: 'Every address',
      body: 'Package, pool, adapter, price feed and validator — all published.',
    },
  ];

  return (
    <Section>
      <div className="flex flex-col items-center gap-12">
        <SectionHeader
          eyebrow="For developers"
          title="Integrate ProjectX"
          lead="Tools and infrastructure for teams building prize-linked products. Everything this site shows comes from public endpoints — rebuild it, or build something better."
          proof="No API keys, no allowlist, no partnership call. The pool is a shared object and your integration is permissionless."
        />

        <ul className="grid w-full gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="panel flex flex-col gap-3 p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent">
                {item.icon}
              </span>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-[1rem] leading-[1.65] text-px-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <Callout
        className="mt-12"
        title="Start building today"
        actions={
          <>
            <Button href="/builders" variant="primary" className="px-5">
              Developer docs
            </Button>
            <Button href="/interfaces" variant="secondary">
              Ship an interface
            </Button>
          </>
        }
      >
        A public read API, a full on-chain event stream and every deployed address —
        documented, permissionless, and live on mainnet now.
      </Callout>
    </Section>
  );
}
