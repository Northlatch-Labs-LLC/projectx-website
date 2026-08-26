
'use client';

import { useEffect, useState } from 'react';

type Accent = 'blue' | 'green';
const KEY = 'projectx.accent';

export function ThemeToggle() {
  const [accent, setAccent] = useState<Accent>('blue');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(KEY);
    } catch {

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
