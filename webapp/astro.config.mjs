// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Durability contract: the build fails on dead internal links and emits the
// sitemap itself — nothing hand-maintained, nothing silently stale.
export default defineConfig({
  site: 'https://northlatch.tech',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
