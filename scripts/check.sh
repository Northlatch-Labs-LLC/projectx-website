#!/usr/bin/env bash
# Local check for the site. The site is the Astro app in webapp/, built to
# webapp/dist and served by Vercel from northlatch.tech (projectxprotocol.dev
# 308-redirects to it). The build is the first gate: Astro fails on dead
# internal links, and its postbuild regenerates llms.txt/llms-full.txt with a
# route-set check that fails on missing or phantom pages. Everything after the
# build checks the artifact that actually ships.
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
for pattern in '"outputDirectory": "webapp/dist"' 'Content-Security-Policy' 'woff2' 'css|js|svg|png' 'northlatch.tech'; do
  grep -q "$pattern" vercel.json || { printf 'missing in vercel.json: %s\n' "$pattern"; fail "deploy config"; }
done
# The legacy domain must redirect to the apex, at the host level (previews exempt):
grep -q '"type": "host"' vercel.json && grep -q 'projectxprotocol' vercel.json \
  || { printf 'missing the .dev host-conditioned redirect\n'; fail "deploy config"; }
# The form is first-party: the readdy allowance must never return.
if grep -q 'readdy' vercel.json; then
  printf 'the readdy CSP allowance is back in vercel.json\n'
  fail "deploy config"
fi
printf '\033[32mrequired rules present\033[0m\n'

hr "Build"
# Astro fails on dead internal links; postbuild regenerates the llms surface
# and fails on a route set that does not match the built pages.
( cd webapp && npm run build ) || fail "astro build"
printf '\033[32mbuild green (dead links would have failed it)\033[0m\n'

# The desktop header stays short: products live in the grid and footer, not the menu.
"$NODE" -e '
const src = require("fs").readFileSync("webapp/src/layouts/Layout.astro","utf8");
const nav = src.match(/<nav class="nav-links"[^>]*>([\s\S]*?)<\/nav>/);
const n = nav ? (nav[1].match(/<a /g) || []).length : -1;
if (n < 0 || n > 5) { console.error("desktop nav has " + n + " links; keep it at 5 or fewer"); process.exit(1); }
console.log("desktop nav: " + n + " links");
' || fail "nav budget"

hr "Claims"
# Copy that was wrong once must not return — denylist in config/claims-banned.json.
"$NODE" --no-warnings scripts/verify-claims.mjs || fail "claims check (baseline)"
"$NODE" --no-warnings scripts/verify-claims.mjs webapp/src/data/*.ts webapp/src/layouts/*.astro webapp/src/pages/*.astro || fail "claims check (sources)"
"$NODE" --no-warnings scripts/verify-claims.mjs webapp/dist/*.html || fail "claims check (dist)"

hr "Secrets"
# The scanner reads staged files inside a commit; outside one it takes explicit paths.
if git diff --cached --name-only 2>/dev/null | grep -q .; then
  python3 scripts/scan-secrets.py || fail "secret scan"
else
  printf 'nothing staged — scanning the working tree instead\n'
  python3 scripts/scan-secrets.py site webapp/src webapp/scripts webapp/public api scripts config README.md || fail "secret scan"
fi

hr "Links (dist)"
# The build already fails on dead links; this re-checks the artifact, not the sources.
"$NODE" -e '
const { readFileSync, readdirSync, existsSync } = require("fs");
const dir = "webapp/dist";
const bad = [];
for (const f of readdirSync(dir).filter(f=>f.endsWith(".html"))) {
  const html = readFileSync(dir+"/"+f,"utf8");
  const route = f==="index.html" ? "/" : "/"+f.replace(/\.html$/,"");
  const refs = [...html.matchAll(/(?:href|src)="(\/[^"#]*)(#[^"]*)?"/g)];
  for (const [, path, frag] of refs) {
    let rel;
    if (path === "/") rel = "/index.html";
    else if (path.endsWith(".html") || path.endsWith(".xml") || path.endsWith(".txt") || path.endsWith(".json") || path.includes(".well-known") || path.endsWith(".sh") || path.endsWith(".webmanifest")) rel = path;
    else rel = path + ".html";
    let ok = existsSync(dir + rel) || existsSync(dir + path);
    if (!ok) { bad.push(route+" -> "+path); continue; }
    const targetPath = existsSync(dir + rel) ? rel : path;
    if (frag && frag.length > 1 && targetPath.endsWith(".html")) {
      const target = readFileSync(dir + targetPath, "utf8");
      if (!target.includes(`id="${frag.slice(1)}"`)) bad.push(route+" -> "+path+frag+" (no such id)");
    }
  }
}
if (bad.length) { console.error(bad.join("\n")); process.exit(1); }
console.log("dist link check: ok (every internal href/src + fragment resolves)");
' || fail "dist link check"

hr "Machine surface (dist)"
# robots names the sitemap; the sitemap exists; the well-known surface is complete.
grep -q 'Sitemap: https://northlatch.tech/sitemap-index.xml' webapp/dist/robots.txt \
  || { printf 'robots.txt does not name the sitemap-index\n'; fail "robots.txt"; }
[ -f webapp/dist/sitemap-index.xml ] || { printf 'sitemap-index.xml missing\n'; fail "sitemap.xml"; }
"$NODE" -e '
const { readdirSync } = require("fs");
// The route floor derives from the pages that exist in src/pages — a fold or
// an addition updates this automatically; the sitemap must simply match it.
const srcPages = readdirSync("webapp/src/pages").filter(f=>f.endsWith(".astro"));
const expect = srcPages.filter(f=>f!=="404.astro").length;
const n = (require("fs").readFileSync("webapp/dist/sitemap-0.xml","utf8").match(/<loc>/g)||[]).length;
if (n !== expect) { console.error("sitemap has "+n+" routes, src/pages implies "+expect); process.exit(1); }
console.log("sitemap: "+n+" routes == src/pages count");
' || fail "sitemap"
[ -f webapp/dist/.well-known/security.txt ] && [ -f webapp/dist/.well-known/agent-card.json ] \
  || { printf '.well-known surface incomplete\n'; fail ".well-known"; }
"$NODE" -e 'JSON.parse(require("fs").readFileSync("webapp/dist/.well-known/agent-card.json","utf8"))' \
  || { printf 'agent-card.json does not parse\n'; fail "agent-card.json"; }
# The generated llms surface must name the canonical origin, and its route check ran in the build.
grep -q '# Northlatch Labs' webapp/dist/llms.txt || { printf 'llms.txt brand line wrong\n'; fail "llms surface"; }
grep -q 'https://northlatch.tech/llms-full.txt' webapp/dist/llms.txt || { printf 'llms.txt origin wrong\n'; fail "llms surface"; }
printf '\033[32mmachine surface consistent\033[0m\n'

hr "Installer"
bash -n webapp/public/install.sh || fail "install.sh syntax"
printf '\033[32minstall.sh: syntax ok\033[0m\n'

hr "Contrast"
if [ -f config/contrast-pairs.json ] && [ -f webapp/public/css/xl.css ]; then
  "$NODE" --no-warnings scripts/verify-contrast.mjs || fail "contrast check"
else
  printf 'skipped (contrast fixtures are from the previous build)\n'
fi

printf '\n\033[32mcheck.sh: all gates green\033[0m\n'
