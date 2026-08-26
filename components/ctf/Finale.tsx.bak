// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import { Button } from '@/components/ui/Button';
import { Signature } from '@/components/ui/Signature';
import { ArrowUpRight } from '@/components/ui/Icons';

export function Finale() {
  const points = [
    {
      no: '01',
      title: 'For developers',
      body: 'Six of these are patterns, not one-offs: a time gate that should have been a counter, a guard on every function but one, a check undefined at its own boundary. You will meet them again in other people’s code.',
    },
    {
      no: '02',
      title: 'For the protocol',
      body: 'Every solver is a reviewer we did not have to hire, working on a system that looks exactly like the live one — because it used to be it.',
    },
    {
      no: '03',
      title: 'For the community',
      body: 'A protocol that publishes its own mistakes as a teaching range is making a claim about how it will handle the next one.',
    },
  ];

  return (
    <section className="relative isolate w-full overflow-hidden">
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.55]"
      >
        <defs>
          <linearGradient id="ctf-finale-crack" x1="0" y1="0" x2="1200" y2="600">
            <stop stopColor="#ffb020" stopOpacity="0" />
            <stop offset="0.45" stopColor="#ffb020" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ff8a4d" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ctf-finale-glow" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#ffb020" stopOpacity="0.14" />
            <stop offset="1" stopColor="#ffb020" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="600" cy="300" rx="520" ry="260" fill="url(#ctf-finale-glow)" />
        <path
          d="M0 470 L280 380 L360 430 L640 250 L760 300 L1010 140 L1200 190"
          stroke="url(#ctf-finale-crack)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 520 L300 440 L390 486 L660 316 L790 362 L1040 208 L1200 250"
          stroke="url(#ctf-finale-crack)"
          strokeWidth="1"
          strokeDasharray="6 10"
          fill="none"
        />
      </svg>

      <div className="mx-auto max-w-content px-5 py-24 sm:px-8 md:py-28">
        <div className="panel panel-lit overflow-hidden p-8 md:p-12 lg:p-16">
          <div className="flex flex-col items-center gap-7 text-center">
            <Signature width="short" />

            <span className="label bg-gradient-to-r from-px-gold to-px-cyan bg-clip-text text-transparent">
              Why this exists
            </span>

            <h2 className="max-w-[20ch] text-display">
              <span className="text-px-muted">Most CTFs teach you to find bugs</span>{' '}
              <span className="text-gradient-chrome">nobody ever shipped.</span>
            </h2>

            <p className="lead mx-auto">
              These were shipped. By us. Into a system holding real money — then found, written
              up, and fixed.
            </p>

            <p className="proof proof-centered mx-auto">
              Every finding, its severity and the reasoning behind each fix is published. You
              can read what a professional review actually said about this code, then go and
              exploit it yourself.
            </p>
          </div>

          <ol className="mt-14 grid gap-x-10 gap-y-10 border-t border-white/[0.07] pt-12 md:grid-cols-3">
            {points.map((point) => (
              <li key={point.no} className="flex flex-col items-center gap-3 text-center">
                <span className="font-mono text-[0.8125rem] font-medium tracking-[0.2em] text-px-gold">
                  {point.no}
                </span>
                <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                <p className="text-[0.9375rem] leading-[1.65] text-px-muted">{point.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-col items-center gap-5 border-t border-white/[0.07] pt-12">
            <h3 className="text-xl font-semibold text-white">Landed one?</h3>
            <p className="body-copy mx-auto text-center">
              Send the transaction digest and a paragraph on the mechanism you used. Every
              solver is a reviewer the protocol did not have to hire.
            </p>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
              <Button href="/community" variant="primary" className="px-6">
                Submit a flag
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button href="/security" variant="secondary">
                The security model
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
