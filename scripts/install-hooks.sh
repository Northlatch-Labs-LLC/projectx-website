#!/usr/bin/env bash
# Point git at the tracked hooks. Run once per clone, and after any `git init`.
#
# .git/hooks is not version controlled, so the three guards this repository relies on — the secret
# scanner, the private-remote check and the commit-message check — do not exist in a fresh clone or
# in another session's worktree. They were installed by hand on one machine, which meant every
# other checkout committed with no guard at all and nothing said so.
#
#   bash scripts/install-hooks.sh
set -euo pipefail
cd "$(dirname "$0")/.."
git config core.hooksPath scripts/git-hooks
chmod +x scripts/git-hooks/*
printf 'core.hooksPath -> %s\n' "$(git config core.hooksPath)"
for h in scripts/git-hooks/*; do printf '  %s\n' "$(basename "$h")"; done
