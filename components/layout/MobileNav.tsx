// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Badge, LiveDot } from '@/components/ui/Badge';
import { ArrowUpRight, Close } from '@/components/ui/Icons';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { DAPP_URL, FOOTER_SECTIONS } from '@/lib/links';
import { NETWORK } from '@/lib/chain';

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    // The header's toggle carries aria-controls="mobile-nav"; without this id that reference
    // resolved to nothing, so assistive tech was told a control governs an element it could not
    // find. The drawer rendered correctly throughout — only the association was broken.
    <div
      id="mobile-nav"
      className="fixed inset-0 z-[60] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/65 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto border-l border-white/[0.07] bg-px-bg shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
          <Logo ns="drawer" />
          {/* The accent switch lives here below `lg`, because the header bar it used to sit in has
              no room for it on a phone — see the note in SiteHeader. It is placed top-right of this
              row, immediately before Close, so it keeps the position it holds on desktop: the same
              small control in the same corner, reached through the menu rather than beside it.

              Exactly one of these is ever *rendered* — the header's copy is `hidden` below `lg` and
              this drawer is `lg:hidden` — but both are mounted, and each carries its own local
              state. They cannot fight over the theme, because each only writes when its own state
              changes and both read the same stored value when they mount. The one thing that can go
              stale is the hidden header instance's label, if a visitor toggles in the drawer and
              then widens past `lg` without a page load; its dot still shows the right colour, since
              that resolves through the CSS variable rather than through state. Narrow enough to
              leave alone rather than grow this change to chase it. */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2 text-px-muted transition hover:text-white"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 px-5 py-6">
          {DAPP_URL && (
            <a
              href={DAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full py-3.5 text-base"
            >
              Open the vault
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}

          {/* No pulse here. This drawer is a client component with no access to the protocol feed,
              so it cannot know whether anything is live — and a dot that pulses on a guess is worse
              than no dot, because it looks exactly like one that knows. The network is a fact about
              the deployment and is stated plainly instead. */}
          <Badge tone="neutral" className="w-fit">
            Deployed on {NETWORK}
          </Badge>

          {FOOTER_SECTIONS.map((section) => (
            <nav key={section.title} aria-label={section.title} className="flex flex-col gap-1">
              <h2 className="label mb-1.5 text-px-accent-300">{section.title}</h2>
              {section.links.map((link) => (
                <Link
                  key={`${section.title}-${link.label}`}
                  href={link.href}
                  onClick={onClose}
                  className="-mx-2 rounded-xl px-3 py-3 text-[1.0625rem] text-px-text transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

        </div>
      </div>
    </div>
  );
}
