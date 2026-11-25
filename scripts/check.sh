#!/usr/bin/env bash
# Local check for a static site. No build, no npm, no Next.js: this repository serves
# hand-written HTML from site/ through Vercel, so the checks are the ones a static site
# can actually fail — links, claims, secrets, deploy config, and the machine surface.
#
#   bash scripts/check.sh
#
# Exit 1 on the first red gate; every gate prints its own verdict.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

NODE="${NODE:-node}"
command -v "$NODE" >/dev/null 2>&1 || NODE="$(command -v /usr/local/bin/node || true)"
if [ -z "$NODE" ]; then
  printf '\033[31mnode not found; put it on PATH or set NODE=\033[0m\n'
  exit 1
fi

hr() { printf '\n\033[1m== %s\033[0m\n' "$1"; }
fail() { printf '\033[31m%s FAILED\033[0m\n' "$1"; exit 1; }

hr "Deploy config"
if "$NODE" -e 'JSON.parse(require("fs").readFileSync("vercel.json","utf8"))' 2>/dev/null; then
  printf '\033[32mvercel.json parses\033[0m\n'
else
  fail "vercel.json"
fi
# The rules the site depends on, present in the file it will ship with:
for pattern in '"outputDirectory": "site"' 'Content-Security-Policy' 'woff2' 'css|js|svg|png'; do
  grep -q "$pattern" vercel.json || { printf 'missing in vercel.json: %s\n' "$pattern"; fail "deploy config"; }
done
# The form is first-party: the readdy allowance must never return.
if grep -q 'readdy' vercel.json; then
  printf 'the readdy CSP allowance is back in vercel.json\n'
  fail "deploy config"
fi
printf '\033[32mrequired rules present\033[0m\n'

hr "Claims"
# Copy that was wrong once must not return — denylist in config/claims-banned.json.
# Source-only; no network, so it cannot pass for the wrong reason.
"$NODE" --no-warnings scripts/verify-claims.mjs || fail "claims check"

hr "Secrets"
# The scanner reads staged files inside a commit; outside one it takes explicit paths.
if git diff --cached --name-only 2>/dev/null | grep -q .; then
  python3 scripts/scan-secrets.py || fail "secret scan"
else
  printf 'nothing staged — scanning the working tree instead\n'
  python3 scripts/scan-secrets.py site api scripts config README.md || fail "secret scan"
fi

hr "Links"
# Every internal href/src resolves to a file in site/, every fragment to an id in its page.
"$NODE" --no-warnings scripts/check-links.mjs || fail "link check"

hr "Machine surface"
# robots, sitemap, llms: the URL set must equal the pages that actually exist.
if [ ! -f site/robots.txt ]; then printf 'site/robots.txt missing\n'; fail "robots.txt"; fi
grep -q 'Sitemap: https://projectxprotocol.dev/sitemap.xml' site/robots.txt \
  || { printf 'robots.txt does not name the sitemap\n'; fail "robots.txt"; }
if [ ! -f site/sitemap.xml ]; then printf 'site/sitemap.xml missing\n'; fail "sitemap.xml"; fi
if [ ! -f site/.well-known/security.txt ] || [ ! -f site/.well-known/agent-card.json ]; then
  printf '.well-known surface incomplete\n'; fail ".well-known"
fi
"$NODE" -e 'JSON.parse(require("fs").readFileSync("site/.well-known/agent-card.json","utf8"))' \
  || { printf 'agent-card.json does not parse\n'; fail "agent-card.json"; }
"$NODE" -e '
const { readFileSync, readdirSync } = require("fs");
const pages = readdirSync("site").filter(f=>f.endsWith(".html")).map(f=>f==="index.html"?"/":"/"+f.replace(/\.html$/,"")).filter(r=>r!=="/404").sort();
const xml = readFileSync("site/sitemap.xml","utf8");
const inSitemap = [...xml.matchAll(/<loc>https:\/\/projectxprotocol\.dev(\/[a-z0-9-]*)?<\/loc>/g)].map(m=>m[1]||"/").sort();
const a = pages.join(","), b = inSitemap.join(",");
if (a !== b) { console.error("sitemap set differs from pages:\n  pages:   "+a+"\n  sitemap: "+b); process.exit(1); }
console.log("sitemap == pages ("+pages.length+" routes)");
' || fail "sitemap URL set"
# llms-full.txt is generated from the HTML; regenerating must produce no diff.
"$NODE" --no-warnings scripts/gen-llms.mjs || fail "llms generation"
if ! git diff --quiet -- site/llms-full.txt site/llms.txt 2>/dev/null; then
  printf '\033[31mllms-full.txt or llms.txt is stale — regen produced a diff; commit the regenerated files\033[0m\n'
  git diff --stat -- site/llms-full.txt site/llms.txt
  fail "llms surface"
fi
printf '\033[32mmachine surface consistent\033[0m\n'

hr "Installer"
bash -n site/install.sh || fail "install.sh syntax"
printf '\033[32minstall.sh: syntax ok\033[0m\n'

hr "Contrast"
if [ -f config/contrast-pairs.json ] && [ -f site/css/xl.css ]; then
  "$NODE" --no-warnings scripts/verify-contrast.mjs || fail "contrast check"
else
  printf 'skipped (contrast fixtures are from the previous build)\n'
fi

printf '\n\033[32mcheck.sh: all gates green\033[0m\n'
