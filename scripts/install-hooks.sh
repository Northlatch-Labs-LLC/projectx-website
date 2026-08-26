#!/usr/bin/env bash

set -euo pipefail
cd "$(dirname "$0")/.."
git config core.hooksPath scripts/git-hooks
chmod +x scripts/git-hooks/*
printf 'core.hooksPath -> %s\n' "$(git config core.hooksPath)"
for h in scripts/git-hooks/*; do printf '  %s\n' "$(basename "$h")"; done
