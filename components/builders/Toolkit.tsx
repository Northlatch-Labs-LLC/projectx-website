
import { Section, SectionHeader } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { Reveal } from '@/components/ui/Reveal';
import { Code, Layers, Book, Chart, Wallet, Sparkle } from '@/components/ui/Icons';

const SHIPPING = [
  {
    icon: <Chart className="h-5 w-5" />,
    name: 'Read API',
    body: 'Pool state, settlements, treasury and events over plain HTTP. No key, no allowlist.',
  },
  {
    icon: <Code className="h-5 w-5" />,
    name: 'On-chain events',
    body: 'Every deposit, draw, fee and payout is emitted. Index it and depend on nothing of ours.',
  },
  {
    icon: <Book className="h-5 w-5" />,
    name: 'Published addresses',
    body: 'Package, pool, treasury, adapter, price feed and validator — all listed below.',
  },
];

const PLANNED = [
  {
    icon: <Code className="h-5 w-5" />,
    name: 'TypeScript client',
    body: 'A typed library that builds the deposit, withdrawal and funding transactions for you, so an interface is a UI problem rather than a PTB problem.',
  },
  {
    icon: <Wallet className="h-5 w-5" />,
    name: 'Interface starter',
    body: 'A working Next.js front end with wallet connection, sponsored gas and the whole deposit flow already wired. Fork it and change the paint.',
  },
  {
    icon: <Layers className="h-5 w-5" />,
    name: 'Adapter SDK',
    body: 'The seam the DEX sits behind, documented and templated, so a new settlement venue is a separate package rather than a fork of the pool.',
  },
  {
    icon: <Sparkle className="h-5 w-5" />,
    name: 'Pool factory',
    body: 'The pool is generic over its prize coin. The factory turns that into a product: launch a pool that pays in the coin your community actually uses.',
  },
  {
    icon: <Chart className="h-5 w-5" />,
    name: 'Indexer',
    body: 'A drop-in indexer for the event stream, so an analytics site or a leaderboard does not start with three days of plumbing.',
  },
  {
    icon: <Book className="h-5 w-5" />,
    name: 'Brand kit',
    body: 'Marks, colours and the interface design system, licensed for anyone building on the protocol.',
  },
];

export function Toolkit() {
  return (
    <Section tone="panel" id="toolkit">
      <SectionHeader
        eyebrow="Toolkit"
        title="What you get, and what’s coming"
        lead="Enough exists today to build a complete interface. The rest is about making it take an afternoon instead of a fortnight."
        proof="Planned items are labelled planned. Nothing on this page is available unless it says it is."
      />

      <div className="mt-12 flex flex-col gap-3">
        <span className="label">Available now</span>
        <ul className="grid gap-4 md:grid-cols-3">
          {SHIPPING.map((tool, index) => (
            <Reveal as="li" key={tool.name} delay={index * 70}>
              <div className="panel panel-hover flex h-full flex-col gap-3 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-prize/20 to-px-prize/5 text-px-prize">
                    {tool.icon}
                  </span>
                  <Badge tone="prize" className="ml-auto">
                    Live
                  </Badge>
                </div>
                <h3 className="text-base font-semibold text-white">{tool.name}</h3>
                <p className="text-[1rem] leading-[1.65] text-px-muted">{tool.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <span className="label">Planned</span>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PLANNED.map((tool, index) => (
            <Reveal as="li" key={tool.name} delay={index * 60}>
              <div className="panel flex h-full flex-col gap-3 border-dashed p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] text-px-faint">
                    {tool.icon}
                  </span>
                  <Badge tone="neutral" className="ml-auto">
                    Planned
                  </Badge>
                </div>
                <h3 className="text-base font-semibold text-white">{tool.name}</h3>
                <p className="text-[1rem] leading-[1.65] text-px-muted">{tool.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <Callout
        className="mt-12"
        title="Need one of these sooner?"
        actions={
          <>
            <Button href="/community" variant="primary" className="px-5">
              Tell us what you need
            </Button>
            <Button href="/blueprints" variant="secondary">
              See the blueprints
            </Button>
          </>
        }
      >
        The order is not fixed. A builder who is actually blocked on something moves it up
        the list faster than any roadmap does.
      </Callout>
    </Section>
  );
}
