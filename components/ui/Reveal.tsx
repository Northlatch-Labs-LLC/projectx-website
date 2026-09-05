// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

// Renders visible and only hides after mount. Starting at opacity 0 would blank the page for
// anyone whose script was blocked or has not run yet.
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (element.getBoundingClientRect().top > window.innerHeight) setHidden(true);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !hidden) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHidden(false);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hidden]);

  return (
    <Tag
      // @ts-expect-error — one ref type across the four permitted tags
      ref={ref}
      className={`reveal transition-[opacity,transform] duration-700 ease-[var(--ease-expo)] ${
        hidden ? 'translate-y-5 opacity-0' : 'translate-y-0 opacity-100'
      } ${className}`}
      style={{ transitionDelay: hidden ? '0ms' : `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
