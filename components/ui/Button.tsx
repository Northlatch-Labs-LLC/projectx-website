// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from './Icons';

type Variant = 'primary' | 'secondary' | 'ghost';

const VARIANTS: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

export function Button({
  href,
  children,
  variant = 'primary',
  external,
  className = '',
  showExternalIcon = true,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  showExternalIcon?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const classes = `${VARIANTS[variant]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} {...rest}>
        {children}
        {showExternalIcon ? <ArrowUpRight className="h-4 w-4 opacity-70" /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
