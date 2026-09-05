// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
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
        ],
      },
    ];
  },
};

export default nextConfig;
