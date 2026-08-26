
'use client';

import { useEffect, useRef, useState } from 'react';

export function AnimatedNumber({
  value,
  className = '',
  durationMs = 1100,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const match = /^(-?)([\d,]+)(?:\.(\d+))?$/.exec(value.trim());
    if (!match) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const sign = match[1];
    const decimals = match[3]?.length ?? 0;
    const target = Number(`${match[2].replace(/,/g, '')}.${match[3] ?? '0'}`);
    if (!Number.isFinite(target) || target === 0) return;

    const render = (n: number) =>
      `${sign}${n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}`;

    let frame = 0;
    let watchdog = 0;
    let start = 0;

    const settle = () => {
      cancelAnimationFrame(frame);
      setDisplay(value);
    };

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / durationMs);
      if (progress >= 1) {
        settle();
        return;
      }
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(render(target * eased));
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            setDisplay(render(0));
            frame = requestAnimationFrame(step);

            watchdog = window.setTimeout(settle, durationMs + 400);
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(watchdog);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
