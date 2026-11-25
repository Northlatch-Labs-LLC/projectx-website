#!/usr/bin/env bash
# Install ProtocolX Verify into a repository: write the workflow file that runs the
# five-gate action on every pull request.
#
# This is not a binary installer, because ProtocolX Verify is not a binary. It is a
# GitHub Action (Northlatch-Labs-LLC/protocolx-verify), published as source and run
# inside your own CI. There is nothing to pipe to a shell here and nothing executed
# from this page: the script writes one YAML file into .github/workflows/ and pins
# the action ref you choose.
#
#   bash install.sh [options] [TARGET_REPO_DIR]
#
# Options:
#   --ref REF    action ref to pin (default: v1)
#   --check      dry run: print what would be written and exit; writes nothing
#   --force      overwrite an existing workflow file
#   -h, --help   this text
#
# The action itself is free to run in your own CI — see the licence at
# https://github.com/Northlatch-Labs-LLC/protocolx-verify (BUSL-1.1, production use
# in your own CI against your own code granted in the licence text).
set -euo pipefail

REF="v1"
CHECK=0
FORCE=0
TARGET=""

usage() { sed -n '2,24p' "$0"; exit 0; }

while [ $# -gt 0 ]; do
  case "$1" in
    --ref)   REF="${2:?--ref needs a value}"; shift 2 ;;
    --check) CHECK=1; shift ;;
    --force) FORCE=1; shift ;;
    -h|--help) usage ;;
    --*) printf 'install.sh: unknown option %s\n' "$1" >&2; exit 2 ;;
    *)  TARGET="$1"; shift ;;
  esac
done

if [ -z "$TARGET" ]; then
  TARGET="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  if [ ! -d "$TARGET/.git" ]; then
    printf 'install.sh: not inside a git repository (%s)\n' "$TARGET" >&2
    printf 'pass the target repository as an argument: bash install.sh /path/to/repo\n' >&2
    exit 2
  fi
fi

WORKFLOWS="$TARGET/.github/workflows"
FILE="$WORKFLOWS/protocolx-verify.yml"

if [ -e "$FILE" ] && [ "$FORCE" -ne 1 ]; then
  printf 'install.sh: %s already exists (use --force to overwrite)\n' "$FILE" >&2
  exit 1
fi

WORKFLOW="# ProtocolX Verify — five gates on every pull request: build, digest, tests,
# pin, mutation-smoke. Installed by projectxprotocol.dev/install.sh on 2026-11-25.
name: ProtocolX Verify
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Northlatch-Labs-LLC/protocolx-verify@${REF}"

if [ "$CHECK" -eq 1 ]; then
  printf 'install.sh: --check (dry run)\n'
  printf '  target    : %s\n' "$FILE"
  printf '  action    : Northlatch-Labs-LLC/protocolx-verify@%s\n' "$REF"
  printf '  state     : %s\n' "$([ -e "$FILE" ] && printf 'a workflow file already exists there' || printf 'nothing exists at that path yet')"
  printf '  would write:\n\n%s\n' "$WORKFLOW"
  exit 0
fi

mkdir -p "$WORKFLOWS"
printf '%s' "$WORKFLOW" > "$FILE"

printf 'install.sh: wrote %s\n' "$FILE"
printf '  the action runs on your next pull request; no secrets are passed to it\n'
printf '  gate docs: https://github.com/Northlatch-Labs-LLC/protocolx-verify\n'
