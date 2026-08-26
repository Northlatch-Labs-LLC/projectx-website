
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Badge, LiveDot } from '@/components/ui/Badge';
import { ArrowUpRight, Close } from '@/components/ui/Icons';
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
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="ml-auto rounded-xl border border-white/[0.07] bg-white/[0.03] p-2 text-px-muted transition hover:text-white"
          >
            <Close className="h-5 w-5" />
          </button>
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

          {}
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
