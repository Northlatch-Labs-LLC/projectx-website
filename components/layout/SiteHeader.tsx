// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Menu } from '@/components/ui/Icons';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NAV_LINKS } from '@/lib/links';

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

      {/* The three-column grid is a desktop layout and is now only applied on desktop. Below `lg`
          the centre nav is hidden, so the middle track collapses to zero — but the two `gap-3`
          gutters either side of it did not, and a `1fr` track's automatic minimum is its own
          min-content, not zero. The bar therefore had a floor it could never go under: the logo
          (110px) plus the right-hand cluster (222px) plus 24px of gutters around an empty column
          plus 40px of padding, 396px in total, on a phone 320px wide. A viewport narrower than that
          could not lay the bar out at device width, so the browser fell back to rendering the page
          zoomed out or horizontally scrollable, and the menu button — last in the row — sat outside
          the 320px viewport rather than inside it. It stayed hit-testable, so this was a layout
          defect and not a dead control; the page simply could not be laid out as designed.

          Flex below `lg` is the fix rather than a smaller `1fr`, because the defect is not that the
          columns were the wrong size. It is that a symmetric three-column grid is the wrong shape
          for a bar that has two clusters and an empty middle: it reserves space for a centre that
          is not rendered and then refuses to give it back. Two items and `justify-between` describe
          the mobile bar exactly, and no gutter is spent on a column that is not there. The grid
          returns intact at `lg`, where the nav it was built to centre actually exists. */}
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8 md:h-[4.5rem] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-3">
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
          {/* The accent switch is a preference, not navigation, and on a phone it was the third
              control competing for a strip that could not seat three. It moves into the drawer
              below `lg` and keeps its place in the bar above `lg`, which returns 44px — the button
              and its gutter — to the two controls that have to be reachable without opening
              anything.

              Unmounting it is safe because it has never been what applies the theme. `app/layout.tsx`
              stamps the saved accent on `<html>` in a pre-paint script precisely so the page does
              not flash blue before this component mounts; the button only writes the choice. A
              visitor who chose green still gets green on every phone page, drawer opened or not.

              `lg:contents` rather than `lg:block` so that at `lg` the button is once again the direct
              flex child of this cluster, with no wrapper box of its own between it and the gap —
              the desktop bar is meant to be untouched by this change, down to the pixel. */}
          <span className="hidden lg:contents">
            <ThemeToggle />
          </span>

          {/* The bar's one button. It targets an internal route, so it is a next/link rather
              than an anchor with a target, and it carries no external-link arrow.

              The label must state what the click does and must stay true at all times — a label
              tied to a transient state ("See draws", true only mid-window) or to a capability the
              site does not have (self-serve install) goes stale without anything reporting it.

              MEASURED, not estimated, at the three widths this bar has historically broken at.
              "Verify a repo" renders on one line at 40px inside a 64px bar at every one: 102px at
              320px, 126px at 375px, 142px at 1024px alongside the six-label nav — bar overflow 0
              and document overflow 0 in all three. The narrowest case keeps ~200px of slack.
              Re-measure at all three before changing this label. */}
          <Link
            href="/verification"
            className="btn-primary whitespace-nowrap px-3 py-2.5 text-meta sm:px-5"
          >
            Verify a repo
          </Link>

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
