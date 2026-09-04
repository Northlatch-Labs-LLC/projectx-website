// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * Permanent redirects for routes this hub has retired.
   *
   * A removed route without a redirect breaks every link anyone has ever shared, silently, from
   * the reader's side. `permanent: true` emits 308, which preserves the method and tells a
   * crawler the move is not provisional.
   *
   * Every destination below must be a page that answers the question the old URL was asked.
   * Never point one at `/`.
   */
  async redirects() {
    return [
      {
        // /protocol rather than / or /verification: a redirect should land the reader on the
        // page that answers what they clicked. `sponsor_prize` is still a public entry function
        // on a pool that is still live on Sui mainnet, and /protocol is the record of that
        // contract.
        source: '/sponsor',
        destination: '/protocol',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          // Report-Only, not enforced. Finding M in work/reports/2026-09-03-security-estate-
          // sweep.md: this hub serves no CSP at all. Enforcing sight-unseen risks a silent
          // breakage of the one inline script below or the inline `style={{}}` props used
          // throughout the component tree, on a site with no browser-side error monitoring.
          //
          // Report-Only for one week (from the date this shipped — see UPDATE.md) surfaces those
          // breaks as reports instead of outages. Only after a week of clean reports does this
          // become an enforced `Content-Security-Policy` header.
          //
          // The app has no nonce or 'strict-dynamic' plumbing (no middleware, no per-request
          // header injection) — adding one is a bigger change than this pass. Two things stand in
          // for it instead:
          //   - the one build-time-fixed inline script in app/layout.tsx (the pre-paint theme
          //     stamp) is allow-listed by its exact SHA-256 hash, not by 'unsafe-inline';
          //   - 'unsafe-inline' stays only on style-src, because React's `style={{...}}` props
          //     set the DOM `style` attribute directly and there is no per-element hash for that;
          //     style-src cannot cause script execution, so scoping the weaker exception to it
          //     alone still lets script-src stay hash-only.
          //
          // Every host below is a real page load — read from app/layout.tsx (next/font
          // self-hosts, so no fonts.googleapis.com), @vercel/analytics' Next integration (same-
          // origin /_vercel/insights/script.js and /_vercel/insights/insights, confirmed by
          // reading node_modules/@vercel/analytics/dist/next/index.js — no third-party host),
          // components/ui/NotifySignup.tsx (posts to same-origin /api/notify), and the public/
          // and public/og/ local image files. No page fetches suiscan.xyz, api.brevo.com or
          // fullnode.mainnet.sui.io client-side — those hosts appear only as anchor hrefs and
          // server-side route handlers, so they need no connect-src entry.
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              // sha256 of the exact inline script in app/layout.tsx that stamps the saved
              // accent before first paint. Recompute and update this hash if that script's
              // literal text ever changes.
              "script-src 'self' 'sha256-GMXZAA4WKc4yDaoZ47EtRUWxVa5p+uEdWX5KeStVtfM='",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'none'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
