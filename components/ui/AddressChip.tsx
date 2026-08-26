
'use client';

import { useState } from 'react';
import { Check, Copy, ArrowUpRight } from './Icons';
import { shortId } from '@/lib/chain';

export function AddressChip({
  id,
  href,
  label,
  className = '',
}: {
  id: string;
  href?: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
    }
  }

  return (
    <span className={`chip-mono ${className}`} title={id}>
      {label ? <span className="text-px-faint">{label}</span> : null}
      <span className="text-px-text">{shortId(id, 10, 6)}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : `Copy ${label ?? 'identifier'} in full`}
        className="rounded p-2 text-px-faint transition hover:text-px-accent"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-px-prize" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${label ?? 'this'} on the explorer`}
          className="rounded p-2 text-px-faint transition hover:text-px-accent"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </span>
  );
}
