// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Github, XSocial } from '@/components/ui/Icons';
import { CHANNELS } from '@/lib/links';

/**
 * The estate's channels, rendered from the single list in lib/links.ts.
 *
 * One component rather than a row hand-written into the footer and a second into the drawer. The
 * failure mode of two copies is not a visual bug: it is one page listing two accounts beside
 * another listing three, on a site that tells visitors any account not on its list is not ours.
 *
 * `aria-label` carries the full label; the visible text is the short form, so the row stays a row
 * on a phone without a screen reader hearing "X" twice with no way to tell the two apart.
 */
export function ChannelLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {CHANNELS.map((channel) => {
        const Icon = channel.icon === 'github' ? Github : XSocial;
        return (
          <li key={channel.href}>
            <a
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              aria-label={channel.label}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[0.8125rem] text-px-muted transition-colors duration-300 hover:border-white/[0.14] hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {channel.short}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
