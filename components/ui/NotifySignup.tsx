// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
'use client';

import { useState } from 'react';

/**
 * The email capture, stated honestly: you are asking to be told, and nothing arrives until the
 * double-opt-in confirmation — which itself only goes out once campaigns are switched on. The
 * consent line under the field is the contract, in the visitor's language, one sentence long.
 *
 * Four visible states, no spinner-forever: idle, sending, done (two flavours — new and
 * already-on-it, because "your second signup failed" reads as "you are not on it"), and a
 * failure that says whether retrying is worth it. A 503 from the route means this deployment
 * has no list wired; the form says so instead of pretending.
 *
 * `cta` is optional and changes the label alone. /verification/install sits beside a second
 * control — an email that gets a repository installed — and on that page the form has to say
 * which of the two it is, or a reader presses the wrong one and waits for a reply that this
 * component never promised to send. Everything else is deliberately fixed: same route, same list,
 * same consent line, same double-opt-in. A second capture path would be a second place for
 * consent to be got wrong, and the sentence under the field is the only promise this site makes
 * to every address it holds.
 */

type Phase =
  | { at: 'idle' }
  | { at: 'sending' }
  | { at: 'done'; already: boolean }
  | { at: 'failed'; message: string };

export function NotifySignup({
  source,
  cta = 'Tell me what ships',
}: {
  source: 'home' | 'verification' | 'install';
  cta?: string;
}) {
  const [email, setEmail] = useState('');
  const [phase, setPhase] = useState<Phase>({ at: 'idle' });

  const plausible = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!plausible || phase.at === 'sending') return;
    setPhase({ at: 'sending' });
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      if (response.ok) {
        const body = (await response.json()) as { already?: boolean };
        setPhase({ at: 'done', already: body.already === true });
        return;
      }
      setPhase({
        at: 'failed',
        message:
          response.status === 503
            ? 'Signups are not wired up on this deployment.'
            : 'The list did not take that — worth one retry.',
      });
    } catch {
      setPhase({ at: 'failed', message: 'Could not reach the list — worth one retry.' });
    }
  }

  if (phase.at === 'done') {
    return (
      <p className="text-[0.9375rem] leading-[1.6] text-px-muted">
        {phase.already
          ? 'You are already on the list — nothing more to do.'
          : 'On the list. A confirmation email will ask for your yes before anything else ever arrives.'}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (phase.at === 'failed') setPhase({ at: 'idle' });
          }}
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-[0.9375rem] text-white placeholder:text-px-faint focus:border-px-cyan/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!plausible || phase.at === 'sending'}
          className="btn-primary shrink-0 px-5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {phase.at === 'sending' ? 'Adding…' : cta}
        </button>
      </div>
      <p className="mt-2 text-xs text-px-faint">
        Announcements only, confirmed by double opt-in before anything is sent, unsubscribe in
        one click. Nothing else, ever.
      </p>
      {phase.at === 'failed' && (
        <p className="mt-2 text-xs text-px-gold">{phase.message}</p>
      )}
    </form>
  );
}
