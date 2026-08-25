// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight, ArrowRight } from './Icons';

export function Card({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  return <Tag className={`panel p-6 md:p-7 ${className}`}>{children}</Tag>;
}

export function LinkCard({
  href,
  eyebrow,
  title,
  children,
  icon,
  className = '',
}: {
  href: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  const isExternal = /^https?:\/\//.test(href);
  const classes = `panel panel-hover group flex flex-col gap-3 p-6 md:p-7 ${className}`;

  const body = (
    <>
      {icon ? (
        <span className="mb-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-px-accent/20 to-px-accent/5 text-px-accent transition-transform duration-500 group-hover:scale-110">
          {icon}
        </span>
      ) : null}
      {eyebrow ? <span className="label text-px-faint">{eyebrow}</span> : null}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      {children ? <div className="text-[1rem] leading-[1.65] text-px-muted">{children}</div> : null}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.9375rem] font-medium text-px-cyan">
        {isExternal ? 'Open' : 'Read more'}
        {isExternal ? (
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        )}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {body}
    </Link>
  );
}
