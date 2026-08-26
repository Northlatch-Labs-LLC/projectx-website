
'use client';

import { useState } from 'react';
import { ArrowUpRight } from '@/components/ui/Icons';
import { NAMES_URL } from '@/lib/links';
import { priceSentence } from '@/lib/suins-pricing';

function formatProblem(label: string): string | null {
  if (label.length === 0) return null;
  if (label.length < 3) return 'Three characters minimum.';
  if (label.length > 63) return 'Sixty-three characters maximum.';
  if (!/^[a-z0-9-]+$/.test(label)) return 'Letters, numbers and hyphens only.';
  if (label.startsWith('-') || label.endsWith('-')) return 'Cannot start or end with a hyphen.';
  return null;
}

export function NameSearch() {
  const [value, setValue] = useState('');

  const label = value.trim().toLowerCase().replace(/\.sui$/, '');
  const problem = formatProblem(label);
  const ready = label.length >= 3 && problem === null;

  const href = ready ? `${NAMES_URL}?name=${encodeURIComponent(label)}` : NAMES_URL;

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={(e) => {
          if (!ready) e.preventDefault();
        }}
        action={NAMES_URL}
        className="flex flex-col gap-2 sm:flex-row"
      >
        {}
        <label className="flex min-w-0 flex-1 items-center gap-1 rounded-2xl border border-white/[0.09] bg-white/[0.03] px-4 py-3.5 focus-within:border-px-accent/60">
          <span className="sr-only">Search for a .sui name</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="yourname"
            spellCheck={false}
            autoComplete="off"
            inputMode="text"
            className="min-w-0 flex-1 bg-transparent font-mono text-lg text-white outline-none placeholder:text-px-faint"
          />
          <span className="font-mono text-lg text-px-faint">.sui</span>
        </label>

        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!ready}
          className={`btn-primary shrink-0 justify-center px-6 py-3 ${
            ready ? '' : 'pointer-events-none opacity-45'
          }`}
        >
          Check it
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </form>

      {}
      <p className="mt-2 min-h-[1.25rem] text-sm">
        {problem ? (
          <span className="text-px-gold">{problem}</span>
        ) : ready ? (
          <span className="text-px-muted">
            <code className="text-px-cyan">{label}.sui</code> — we check it against SuiNS on the
            next page, before anything is signed.
          </span>
        ) : (
          <span className="text-px-faint">
            {priceSentence()} for five characters or more. Delivered to your wallet, never held by
            us.
          </span>
        )}
      </p>
    </div>
  );
}
