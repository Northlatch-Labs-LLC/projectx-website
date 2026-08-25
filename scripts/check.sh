#!/usr/bin/env bash
# npm run check — versions, outdated, advisories, typecheck.
# Not a build: `next build` breaks a running `npm run dev` on the same directory.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

hr() { printf '\n\033[1m== %s\033[0m\n' "$1"; }

hr "Versions"
printf 'node        %s\n' "$(node -v)"
printf '@types/node %s\n' "$(node -p "require('@types/node/package.json').version" 2>/dev/null || echo '?')"

hr "Outdated"
npm outdated || true

hr "Advisories (high and above)"
npm audit --audit-level=high || true

hr "Typecheck"
# .next/types churns while the dev server runs; TS6053 from it is noise, not a code error.
if npx tsc --noEmit 2>&1 | grep -v -e 'TS6053' -e '\.next/types' -e 'The file is in the program' -e 'Matched by include' | grep .; then
  printf '\033[31mtypecheck FAILED\033[0m\n'
  exit 1
fi
printf '\033[32mtypecheck clean\033[0m\n'

hr "Contrast"
# Palette pairs against WCAG 2.2 AA, in both themes. Green is opt-in and would otherwise never be
# measured at all.
if ! node --no-warnings scripts/verify-contrast.mjs; then
  printf '\033[31mcontrast check FAILED\033[0m\n'
  exit 1
fi

hr "Corrected claims"
# Copy that was wrong once must not return through a design plate, a draft or an audit's wording.
# Run this against an external file BEFORE porting it: node scripts/verify-claims.mjs <file>
if ! node --no-warnings scripts/verify-claims.mjs; then
  printf '\033[31mclaims check FAILED\033[0m\n'
  exit 1
fi

hr "Private and pre-production addresses"
# Catches a stale address in the source before an environment variable can mask it in production.
if ! node --no-warnings scripts/verify-no-private-hosts.mjs; then
  printf '\033[31mprivate-host check FAILED\033[0m\n'
  exit 1
fi

hr "Retired hosts"
# A retired host must stay unlinked, and middleware.ts must still be the thing serving its 410.
# Source-only, so there is no SKIP branch — a failure here is always this repository's.
if ! node --no-warnings scripts/verify-retired-hosts.mjs; then
  printf '\033[31mretired-host check FAILED\033[0m\n'
  exit 1
fi

hr "SuiNS price mirror"
# lib/suins-pricing.ts mirrors on-chain config the SuiNS DAO can change. Drift exits 1 and fails
# this script; an unreachable node exits 0 with a SKIP, because a rate-limited public endpoint is
# the observer failing, not the site.
if ! node --no-warnings scripts/verify-suins-prices.mjs; then
  printf '\033[31mSuiNS price mirror FAILED\033[0m\n'
  exit 1
fi
