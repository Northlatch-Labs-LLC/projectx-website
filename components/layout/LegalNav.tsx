
import Link from 'next/link';

const LEGAL_ROUTES = [
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Security', href: '/security' },
  { label: 'Trademarks', href: '/legal/trademarks' },
  { label: 'Disclaimer', href: '/disclaimer' },
] as const;

export function LegalNav({ current }: { current: string }) {
  return (
    <nav
      aria-label="Legal pages"
      className="mx-auto mb-10 flex w-full max-w-prose flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] pb-5 text-[0.875rem]"
    >
      {LEGAL_ROUTES.map((route) =>
        route.href === current ? (
          <span key={route.href} aria-current="page" className="font-semibold text-white">
            {route.label}
          </span>
        ) : (
          <Link
            key={route.href}
            href={route.href}
            className="text-px-muted underline underline-offset-4 transition-colors hover:text-px-cyan"
          >
            {route.label}
          </Link>
        ),
      )}
    </nav>
  );
}
