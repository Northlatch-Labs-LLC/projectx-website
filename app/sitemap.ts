// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/links';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /**
   * Every route this site serves, or the ones that are missing are invisible.
   *
   * `/verification` shipped without an entry here and stayed that way — the one page on the site
   * that quotes a price and asks for an engagement was the one page absent from the document
   * search engines read to find pages. Nothing was broken and nothing complained, which is how it
   * survived: the page rendered, the links worked, and the only symptom was traffic that never
   * arrived. It is listed now, above the developer pages, because it is the page most likely to
   * turn a reader into revenue.
   *
   * `/verification/install` is listed beside it at the same priority. It is the conversion page
   * for the GitHub App and it is not linked from the navigation, so a crawler reaches it through
   * exactly two routes: this file, and the call to action on /verification.
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
    ['/sponsor', 0.6, 'monthly'],
    ['/security', 0.7, 'monthly'],
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
