// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * shadcn/ui's class helper, adopted as the foundation for className composition.
 *
 * Why it earns its place, beyond convention. Every component here builds its class string with a
 * template literal — `` `${VARIANTS[variant]} ${className}` `` — which concatenates rather than
 * resolves. Both classes reach the DOM and the winner is whichever rule Tailwind emitted last,
 * not whichever the caller wrote last. That is invisible while every call site agrees on one
 * size. It becomes a bug the moment a type scale exists and a caller passes `text-meta` to
 * something whose default is `text-body`.
 *
 * `twMerge` resolves by group, so the caller's value wins. It has to be told about this site's
 * own fontSize keys, which are not Tailwind's: without `extend.classGroups` it reads `text-hero`
 * as an unknown class and lets it sit beside `text-body` instead of replacing it — exactly the
 * silent failure it was added to prevent.
 *
 * Pinned to the tailwind-merge v2 line. Upstream states v3 supports Tailwind v4.0-v4.3 and that
 * Tailwind v3 projects take v2.6; this project is Tailwind 3.4.15.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Mirrors theme.extend.fontSize in tailwind.config.ts. A key added there and forgotten
      // here does not error — it silently stops overriding, so the two lists are kept adjacent
      // in review by this comment naming the file.
      'font-size': [
        {
          text: [
            'hero',
            'display',
            'title',
            'heading',
            'subhead',
            'lead',
            'body',
            'meta',
            'label',
            'stat',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
