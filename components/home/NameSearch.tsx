// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
'use client';

import { useState } from 'react';
import { ArrowUpRight } from '@/components/ui/Icons';
import { NAMES_URL } from '@/lib/links';
import { priceSentence } from '@/lib/suins-pricing';

/**
 * A .sui name in one transaction, handed straight to the registrar.
 *
 * The registrar is behind Weir's closed alpha, so this is not the fastest purchase on the estate
 * and this component must not be written or placed as if it were — see lib/links.ts, where the
 * navigation records the same ordering.
 *
 * What it does NOT do is claim availability. That needs a read from SuiNS, and this site has no
 * chain client — inventing an "available!" here would be a lie that costs the buyer a signature
 * and a fee to discover. The field validates format against the published SuiNS rules, which are
 * knowable without asking anyone, and then hands the name to the registrar, which does the real
 * read. The handoff carries the typed name so the buyer does not type it twice.
 */

/** SuiNS's own published rules: 3–63 characters, lowercase alphanumeric and hyphens, no edge hyphen. */
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

  /*
    `?name=` is passed straight onto the path rather than onto a site root: with NAMES_URL now a
    path, the old `${NAMES_URL}/?name=` produced `/names/?name=`, which answers 308 before the page
    is reached.

    Worth knowing: weir.social/names does not currently read this parameter, so the typed name is
    carried and then dropped. That was already true through the redirect and is not made worse here.
  */
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
        {/* py-3.5 rather than py-3: the input itself measured 28px tall on a phone, and a control
            this page depends on should not be under the 44px a thumb expects. The label is the tap
            target, so the padding is what raises it. */}
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

      {/* Three states, and none of them asserts availability. */}
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
