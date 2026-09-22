// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { HeroScene } from '@/components/ui/HeroScene';

type Tag = {
  text: string;
  at: CSSProperties;
  tone: keyof typeof TONES;
  depth: number;
  tilt: string;
  delay: string;
  duration: string;
  wideOnly?: boolean;
};

const TONES = {
  accent: 'border-px-accent/30 bg-px-accent/[0.09] text-px-accent-200 shadow-[0_10px_30px_-16px_rgb(var(--px-accent-400)/0.9)]',
  cyan: 'border-px-cyan/30 bg-px-cyan/[0.08] text-px-cyan-light shadow-[0_10px_30px_-16px_rgba(63,216,245,0.9)]',
  prize: 'border-px-prize/30 bg-px-prize/[0.08] text-px-prize-light shadow-[0_10px_30px_-16px_rgba(61,220,151,0.85)]',
  gold: 'border-px-gold/30 bg-px-gold/[0.08] text-px-gold-light shadow-[0_10px_30px_-16px_rgba(255,176,32,0.85)]',
  violet:
    'border-px-violet/30 bg-px-violet/[0.09] text-px-violet-light shadow-[0_10px_30px_-16px_rgba(139,107,255,0.9)]',
} as const;

const TAGS: Tag[] = [
  {
    text: 'no loss to date',
    at: { top: '4%', left: '3%' },
    tone: 'prize',
    depth: 1,
    tilt: '-4deg',
    delay: '0s',
    duration: '7.5s',
  },
  {
    text: 'daily draw',
    at: { top: '13%', right: '2%' },
    tone: 'gold',
    depth: 0.62,
    tilt: '5deg',
    delay: '1.3s',
    duration: '6.4s',
  },
  {
    text: 'withdraw anytime',
    at: { top: '40%', left: '1%' },
    tone: 'accent',
    depth: 0.78,
    tilt: '3deg',
    delay: '2.4s',
    duration: '8.2s',
  },
  {
    text: 'your SUI stays yours',
    at: { top: '52%', right: '0%' },
    tone: 'cyan',
    depth: 0.45,
    tilt: '-3deg',
    delay: '0.7s',
    duration: '7s',
    wideOnly: true,
  },
  {
    text: 'free to enter',
    at: { bottom: '18%', left: '6%' },
    tone: 'violet',
    depth: 0.55,
    tilt: '4deg',
    delay: '3.1s',
    duration: '6.8s',
    wideOnly: true,
  },
  {
    text: 'the draw runs in public',
    at: { bottom: '9%', right: '6%' },
    tone: 'prize',
    depth: 0.9,
    tilt: '-5deg',
    delay: '1.9s',
    duration: '8.6s',
  },
];

export function HeroStage({ className = '' }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2);
      const y = (event.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2);
      setPointer({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      ref={stage}
      aria-hidden="true"
      className={`relative isolate mx-auto aspect-square w-full max-w-md lg:max-w-lg ${className}`}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2
 animate-spin-slow rounded-full opacity-70 blur-2xl"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(77,162,255,0.28), rgba(63,216,245,0.16) 25%, rgba(139,107,255,0.26) 55%, rgba(61,220,151,0.14) 78%, rgba(77,162,255,0.28))',
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 transition-transform
 duration-700 ease-[var(--ease-expo)] sm:w-[62%] lg:w-[58%]"
        style={{ transform: `translate3d(calc(-50% + ${pointer.x * 10}px), calc(-50% + ${pointer.y * 8}px), 0)` }}
      >
        {/* Keyframe, not JS state: the entrance must reach its visible frame without scripts. */}
        <div className="animate-stage-in">
          <HeroScene className="w-full" />
        </div>
      </div>

      {TAGS.map((tag, index) => (
        <div
          key={tag.text}
          className={`absolute transition-transform duration-700 ease-[var(--ease-expo)] ${
 tag.wideOnly ? 'hidden sm:block' : ''
          }`}
          style={{
            ...tag.at,
            transform: `translate3d(${pointer.x * tag.depth * -26}px, ${pointer.y * tag.depth * -20}px, 0)`,
          }}
        >
          <div
            className="animate-float-tag"
            style={
              {
                '--tag-tilt': tag.tilt,
                animationDelay: tag.delay,
                animationDuration: tag.duration,
              } as CSSProperties
            }
          >
            <div className="animate-tag-in" style={{ animationDelay: `${300 + index * 110}ms` }}>
              <span className={`hero-tag ${TONES[tag.tone]}`}>
                <span className="h-1 w-1 rounded-full bg-current opacity-70" />
                {tag.text}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
