// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Menu, ArrowUpRight } from '@/components/ui/Icons';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NAMES_URL, NAV_LINKS } from '@/lib/links';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const lifted = scrolled || menuOpen;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-all duration-500 ${
          lifted ? 'bg-px-bg/72 backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent'
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 -z-10 h-px transition-opacity duration-500 ${
          lifted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(77,162,255,0.45) 22%, rgba(140,190,255,0.55) 50%, rgba(77,162,255,0.45) 78%, transparent)',
        }}
      />

      <div className="mx-auto grid h-16 max-w-content grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 sm:px-8 md:h-[4.5rem]">
        <Link
          href="/"
          aria-label="ProjectX — home"
          className="group col-start-1 w-fit shrink-0 rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
        >
          <Logo ns="header" />
        </Link>

        <nav
          className="hidden items-center gap-0.5 justify-self-center rounded-2xl border border-white/[0.06] bg-white/[0.025] p-1 backdrop-blur-sm lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            // Most of the nav now points at the other three surfaces, which are separate
            // deployments on their own domains. next/link would client-side route them and lose
            // the new tab, so an external entry renders as a plain anchor.
            if ('external' in link && link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link nav-link-idle"
                >
                  {link.label}
                </a>
              );
            }
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`nav-link ${active ? 'nav-link-active' : 'nav-link-idle'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="col-start-3 flex items-center justify-end gap-2">
          <ThemeToggle />

          {/* The one button in the header used to send everyone to the vault — the slowest of the
              four products to produce a penny, and the one that asks for a deposit before it gives
              anything back. A name is the only thing on the estate a stranger can buy in the same
              session they arrive in, so that is what the button now offers. */}
          {/* whitespace-nowrap is the fix, not the padding. At 375px the label wrapped to two lines
              inside the button, which made it 80px tall inside a 64px bar — it hung out of the
              header rather than sitting in it. Keeping the label on one line and trimming the
              horizontal padding on small screens leaves it comfortably between the logo and the
              menu button. */}
          <a
            href={NAMES_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary whitespace-nowrap px-3 py-2.5 text-sm sm:px-5"
          >
            Claim a name
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2 text-px-muted transition-colors duration-300 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

    </header>
  );
}
