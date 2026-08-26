// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
'use client';

import { useEffect, useState } from 'react';

type Accent = 'blue' | 'green';
const KEY = 'projectx.accent';

/**
 * Switches the accent between the brand blue and green.
 *
 * It swaps CSS variables, not classes: every `px-accent` utility on the site resolves through
 * `--px-accent-*`, so redefining nine variables re-themes the whole page without a rebuild and
 * without touching a single component.
 *
 * The choice is stamped on `<html>` and remembered. Read after mount rather than during render,
 * so the static prerender and the first client render cannot disagree about which theme is on.
 */
export function ThemeToggle() {
  const [accent, setAccent] = useState<Accent>('blue');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(KEY);
    } catch {
      // Private browsing and blocked storage both throw. The toggle still works for this
      // session; only the remembering is lost, and there is nothing to recover from.
    }
    if (saved === 'green' || saved === 'blue') setAccent(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    if (accent === 'green') root.setAttribute('data-theme', 'green');
    else root.removeAttribute('data-theme');
    try {
      window.localStorage.setItem(KEY, accent);
    } catch {
      // As above.
    }
  }, [accent, ready]);

  const next: Accent = accent === 'blue' ? 'green' : 'blue';

  return (
    <button
      type="button"
      onClick={() => setAccent(next)}
      aria-label={`Switch accent to ${next}`}
      title={`Accent: ${accent}. Click for ${next}.`}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-px-accent/40"
    >
      <span
        aria-hidden="true"
        className="h-3.5 w-3.5 rounded-full bg-px-accent-400 transition-colors"
      />
    </button>
  );
}
