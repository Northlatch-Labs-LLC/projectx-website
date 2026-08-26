#!/usr/bin/env bash

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

if npx tsc --noEmit 2>&1 | grep -v -e 'TS6053' -e '\.next/types' -e 'The file is in the program' -e 'Matched by include' | grep .; then
  printf '\033[31mtypecheck FAILED\033[0m\n'
  exit 1
fi
printf '\033[32mtypecheck clean\033[0m\n'

hr "Contrast"

if ! node --no-warnings scripts/verify-contrast.mjs; then
  printf '\033[31mcontrast check FAILED\033[0m\n'
  exit 1
fi

hr "Corrected claims"

if ! node --no-warnings scripts/verify-claims.mjs; then
  printf '\033[31mclaims check FAILED\033[0m\n'
  exit 1
fi

hr "Private and pre-production addresses"

if ! node --no-warnings scripts/verify-no-private-hosts.mjs; then
  printf '\033[31mprivate-host check FAILED\033[0m\n'
  exit 1
fi

hr "Retired hosts"

if ! node --no-warnings scripts/verify-retired-hosts.mjs; then
  printf '\033[31mretired-host check FAILED\033[0m\n'
  exit 1
fi

hr "SuiNS price mirror"

if ! node --no-warnings scripts/verify-suins-prices.mjs; then
  printf '\033[31mSuiNS price mirror FAILED\033[0m\n'
  exit 1
fi
