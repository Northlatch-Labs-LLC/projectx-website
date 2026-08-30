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
import { NAV_LINKS, RAFFLE_URL } from '@/lib/links';

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

          {/* This button points at whichever door is actually open, and that has now moved twice.
              It sent everyone to the vault first — the slowest product to produce a penny, and the
              one that asks for a deposit before it gives anything back. It was then pointed at a
              name, on the reasoning that a name was the only thing a stranger could buy in the
              session they arrived in. That reasoning was sound and is no longer true: the
              registrar moved into Weir, Weir is in closed alpha, and lib/links.ts records
              weir.social/names answering 307 to a waiting list. The premise expired without the
              button noticing, which is how the estate's most-clicked control came to walk every
              visitor on every page into a wall.

              The draws are the door that is open tonight. They are live on mainnet, they take an
              entry from someone who arrived a minute ago, and they are where the launch thread is
              already sending people. So the header offers that, and the label says what the click
              does rather than what we would like it to do — "See draws" stays true whether or not
              a particular competition is mid-window, where "Enter a draw" would not.

              Names is not hidden: it keeps its place in the nav beside Social, where a label is a
              destination rather than a promise. This button returns to it the day the alpha opens,
              and the test for that day is this comment's own premise — can a stranger who arrived
              in this session actually get a name. */}
          {/* whitespace-nowrap is the fix, not the padding. At 375px the label wrapped to two lines
              inside the button, which made it 80px tall inside a 64px bar — it hung out of the
              header rather than sitting in it. Keeping the label on one line and trimming the
              horizontal padding on small screens leaves it comfortably between the logo and the
              menu button. */}
          {/* That earlier note is still true and still load-bearing: `whitespace-nowrap` is what
              keeps this label on one line, and removing it would bring the vertical overflow back.
              What it got wrong was the closing claim. The label was never left "comfortably between
              the logo and the menu button" — it was left overflowing them horizontally instead, and
              the padding trim it credits bought about eight pixels against a shortfall of seventy.
              The two bugs are the same bug seen on two axes: a bar asked to carry more than it has
              room for. The vertical half was fixed here in the button; the horizontal half could
              only ever be fixed in the layout above, and now has been. The padding on this button
              is no longer holding anything up. */}
          <a
            href={RAFFLE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary whitespace-nowrap px-3 py-2.5 text-sm sm:px-5"
          >
            See draws
            {/* The arrow says "this opens elsewhere", and it costs 24px — the glyph and its gutter.
                With the layout above fixed, that 24px is the difference at exactly one class of
                screen: at 320px the bar needs 328px to seat the logo, this button and the menu
                button, so the arrow is what has to give. The label is what the control is; the arrow
                is only what it hints, and nothing the arrow carries is lost, because `target`
                and the opens-elsewhere behaviour do not depend on it.

                328px was measured, not chosen — it was the exact floor of this bar with the arrow in
                it, for the label it was measured against. That label was "Claim a name"; this bar now
                reads "See draws", which is 24px narrower, so the exact floor with the arrow has moved
                to 288px and this rule is deliberately left 40px conservative rather than retuned. It
                is a merged guarantee, the only screens affected are 289–328px, and no device the
                estate sees is in that band — a verified threshold is not worth re-cutting to reclaim
                an arrow nobody is looking at. It is also deliberately not a named breakpoint: `sm`
                would strip the arrow from every phone to serve the few that need it.

                Re-measured after the rebase, with this label: with the arrow hidden the bar stops
                overflowing at 264px and carries its full 20px of padding from 284px up; with the arrow
                shown its floor is 288px, which leaves 72px of slack at 360px and 87px at 375px. No
                current phone comes near any of these numbers. */}
            <ArrowUpRight className="h-4 w-4 shrink-0 max-[328px]:hidden" />
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
