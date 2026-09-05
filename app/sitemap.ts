// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/links';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /**
   * Every route this site serves. A route missing from this list is invisible to a crawler, and
   * nothing else in the build reports the omission — the page renders, its links work, and the
   * only symptom is traffic that never arrives. `/verification` shipped absent from here and
   * stayed that way undetected.
   *
   * `/verification/install` is not linked from the navigation at all, so a crawler reaches it
   * through exactly two routes: this file, and the call to action on /verification.
   */
  const routes: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
    ['', 1, 'daily'],
    ['/verification', 0.9, 'weekly'],
    ['/verification/install', 0.9, 'weekly'],
    ['/social', 0.9, 'monthly'],
    ['/protocol', 0.9, 'monthly'],
    ['/interfaces', 0.9, 'weekly'],
    ['/blueprints', 0.8, 'weekly'],
    ['/ctf', 0.8, 'weekly'],
    // /sponsor was here. It is retired and 308s to /protocol (see next.config.mjs), and a
    // sitemap must never advertise a URL that redirects — it asks a crawler to spend a fetch
    // learning something this file already knows.
    ['/security', 0.8, 'monthly'],
    // The deployment record's own surface. Weighted with /security, not the developer pages.
    ['/chain', 0.8, 'monthly'],
    ['/builders', 0.6, 'monthly'],
    ['/faq', 0.6, 'monthly'],
    ['/community', 0.4, 'monthly'],
    ['/legal/terms', 0.3, 'yearly'],
    ['/legal/privacy', 0.3, 'yearly'],
    ['/legal/trademarks', 0.3, 'yearly'],
    ['/disclaimer', 0.3, 'yearly'],
  ];

  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
