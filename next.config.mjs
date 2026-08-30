// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * Permanent redirects for routes this hub has retired.
   *
   * There were none before 30 August 2026 — every route this site had ever served still existed,
   * so nothing needed one. The vault sweep of that date is the first change to take a route off
   * the hub, and a removed route without a redirect breaks every link anyone has ever shared,
   * silently, from the reader's side. `permanent: true` emits 308, which preserves the method and
   * tells a crawler the move is not provisional.
   *
   * Nothing here is a deletion. Each source below has its page archived under
   * operations/archive/2026-08-30-hub-vault-sweep/ with a header saying what it was and why it
   * moved, and each destination is a page that answers the question the old URL was asked.
   */
  async redirects() {
    return [
      {
        // "There is no sponsor, there is no prize." (the Master, 30 August 2026)
        //
        // /protocol rather than / or /verification, on the reasoning that a redirect should land
        // the reader on the page that answers what they clicked. `sponsor_prize` is still a public
        // entry function on a pool that is still live on Sui mainnet — the thing /sponsor
        // described was never switched off, it stopped being sold. /protocol is the record of that
        // contract, so a reader who followed a "boost the prize" link finds the mechanism they
        // were promised instead of a marketing page about something else.
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
        ],
      },
    ];
  },
};

export default nextConfig;
