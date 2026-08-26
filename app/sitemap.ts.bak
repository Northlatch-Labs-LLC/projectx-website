// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/links';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
    ['', 1, 'daily'],
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
