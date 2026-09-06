# PROJECTX HUB — projectxprotocol.dev — UPDATE

**READ THIS FILE FROM THE TOP. Newest first.** The entry below the title is the current state;
everything under it is history, in reverse. Stop reading when you know enough.

**This is the governing document.** Where it disagrees with a plan, an audit, a code comment or
anything a desk told you, **this wins** — and the newer entry wins over the older one. An older
entry that contradicts a newer one is not a conflict to resolve; it was already superseded.

Never edit an old entry to agree with a new one. Never delete one. Add, and say what you
superseded. Append with `operations/watcher/note-update.sh hub "<summary>"`.
Law: `operations/company/UPDATE-FILE-LAW.md`.

---

## 2026-09-05 · The `/|\` glyph removed from every file header; main is `7b52502`, pushed

On the owner's ruling of 2026-09-05 the three-character glyph after `@projectx.sui` in every `Built-by` header line is gone; the attribution stays. Scraped copies of these files rendered it as runs of escaped backslashes. One sed over every tracked text file, only header lines changed, `git grep` for the glyph returns nothing tracked. Landed on main by fast-forward from `chore/drop-the-mark` and pushed to GitHub; no deploy, because no rendered byte changed. The commit trailer is now `Built-by: @projectx.sui` then `Co-authored-by: Kaela <kaela@projectxprotocol.dev>`.

  /*
## 2026-09-04 · BRANCH fix/advisories-and-csp STAGED, UNCOMMITTED, UNMERGED, NOT PUSHED (main checkout `/Users/admin/WORK.CLAUDE/projectx-website`, from main `165d4e2`). Engineering dispatch under the chief technology officer, ref `work/reports/2026-09-04-engineering-hub-advisories-and-csp.md`: resolve the four high npm advisories named in `work/reports/2026-09-03-security-estate-sweep.md` §3.3, and add a CSP.

**Advisories.** `next` `15.5.22` → `16.3.4` in `package.json` (`^15.1.0` → `^16.3.4`); this is a major bump taken deliberately, not blindly — the internal `postcss` Next bundles at `node_modules/next/node_modules/postcss` stayed pinned at the vulnerable `8.4.31` through every `15.5.x` patch and every `16.0`–`16.2` release, and only becomes `8.5.23` (patched) starting at `16.3.0`; `16.3.4` was taken over the minimal `16.3.0` because it carries three more months of the same line's own bug fixes with no further breaking changes between them (`postcss`/`sharp` versions identical across `16.3.0`–`16.3.4`, confirmed by `npm view next@<version> dependencies.postcss optionalDependencies.sharp` for each). `sharp` (optional, image-optimisation) resolved `0.34.5` → `0.35.4` as a consequence — Next's own `optionalDependencies` range widened from `^0.34.3` to `^0.35.4`. `nanoid` (transitive, via `postcss`'s own dependency) `3.3.17` → `3.3.18` via `npm audit fix` (no `--force`; already inside `postcss`'s declared `^3.3.16`). `npm audit`: 4 high → **0**. The Next 16 upgrade guide (fetched from `nextjs.org/docs/app/guides/upgrading/version-16`) was read in full against this codebase before taking the bump: no `middleware`/`proxy` file, no parallel-route `@slot` directories, no dynamic `[param]` routes (so the removed synchronous `params`/`searchParams`/`cookies()`/`headers()` compatibility shim never applied here), no `next lint`, no `experimental.*` flags, no `next/image` usage, no custom Webpack config — the breaking-change surface for this specific app was empty. `next build` (Turbopack, now default) auto-updated `tsconfig.json` (`jsx: preserve` → `react-jsx`, a *mandatory* Next 16 change; `include` gained `.next/dev/types/**/*.ts`) and regenerated `next-env.d.ts` (the old `/// <reference path=".next/types/routes.d.ts">` triple-slash directive became an `import` statement, plus a new `root-params.d.ts` import) — both are Next's own required output, staged as part of this upgrade, not hand-edited.

**CSP.** `next.config.mjs` `headers()` gained a `Content-Security-Policy-Report-Only` header, Report-Only because the app has no nonce/`strict-dynamic` plumbing (no middleware, no per-request header injection) and enforcing sight-unseen on a site with no browser-side error monitoring risked a silent breakage. Built from what the app actually loads, read file by file: `default-src 'self'`; `script-src 'self' 'sha256-GMXZAA4WKc4yDaoZ47EtRUWxVa5p+uEdWX5KeStVtfM='` (that hash is the one inline `<script>` in `app/layout.tsx`, the pre-paint theme stamp — allow-listed by exact content hash rather than `'unsafe-inline'`; `next/font/google` self-hosts Roboto/Space Grotesk/Roboto Mono at build time, so no `fonts.googleapis.com`; `@vercel/analytics`'s Next integration was read at `node_modules/@vercel/analytics/dist/next/index.js` — it injects `<script src="/_vercel/insights/script.js">` and beacons to a same-origin `/insights` path, no third-party host); `style-src 'self' 'unsafe-inline'` (React's `style={{...}}` prop, used in 11 component files, sets the DOM `style` attribute directly at runtime — no hash mechanism covers that, so this is the one real exception, scoped to styles only, which cannot execute script); `img-src 'self' data:` (every image is local — `public/icon.svg`, `public/og/*.png`, no `next/image` remote patterns anywhere); `font-src 'self'`; `connect-src 'self'` (the only client-side `fetch` in the tree is `components/ui/NotifySignup.tsx` posting to same-origin `/api/notify`; `suiscan.xyz`, `fullnode.mainnet.sui.io` and `api.brevo.com` appear only as anchor `href`s and inside a server-only route handler, never fetched from the browser); `object-src 'none'`; `base-uri 'none'`; `form-action 'self'`; `frame-ancestors 'none'`; `upgrade-insecure-requests`. **HSTS was not touched.** The dispatch conditioned adding `includeSubDomains` on every subdomain of `projectxprotocol.dev` serving HTTPS, listed from DNS or the asset register — `docs/ASSETS.md` lists no subdomain inventory for this domain (only mail routing addresses), and a certificate-transparency read (`crt.sh/?q=%25.projectxprotocol.dev`) found a wildcard `*.projectxprotocol.dev` cert plus `www.` (confirmed live, HTTPS-forced by Vercel) and `launch.` (a CT-logged cert for a subdomain that currently has no A/CNAME record at all — `dig` returned nothing, so its HTTPS posture cannot be checked because it doesn't resolve). A wildcard cert existing without a subdomain inventory means an unlisted subdomain could be stood up at any time with an unknown HTTPS posture; `includeSubDomains` was left off rather than guessed at. The existing `strict-transport-security: max-age=63072000` (no `includeSubDomains`, no `preload`) is Vercel's own platform default, injected at the edge — not set anywhere in this repository, and unchanged by this branch.

**Verified on this laptop.** `npm run check` — exit 0 (`tsc --noEmit` clean under Next 16's regenerated `tsconfig.json`; `node --test lib/**/*.test.ts` 6/6; `guardrails.py` no new violations, 22 pre-existing accepted; all six `verify-*.mjs` green, pricing still agrees at $249/mo, $2490/yr, founding $149). `npm run build`: the runbook's note that CI never built this repo held — the first attempt (no env set) failed in 18s on this app's own fail-closed guards (`lib/links.ts` refuses `NEXT_PUBLIC_SITE_URL` unset, `lib/stats.ts` refuses `PROTOCOL_API_URL` unset, both by design, neither a secret); the first real build, with `NEXT_PUBLIC_SITE_URL`, `PROTOCOL_API_URL` and `NEXT_PUBLIC_DAPP_URL` passed as plain shell environment variables (the non-secret local values from `env.example`, never read from or written to any `.env` file) — **exit 0 in 10s**, 23 routes, all static except `/api/notify` and `/robots.txt`/`/sitemap.xml`. `next start -p 4321` (free port, confirmed nothing listened on it first) plus `curl -sI` on `/`, `/security`, `/verification`, `/faq`, `/chain` and `POST /api/notify`: every response — including the notify route's own `503` (Brevo key unset locally, expected, unrelated to this branch) — carries the full header set above with the CSP value exactly as written. The Browser pane's shared instance had pre-existing tabs and an open popup from other concurrent sessions (per standing rule, not touched, not closed); the home page loaded clean with **zero** `Content-Security-Policy-Report-Only` console entries, but a pane-wide navigation lock from that popup blocked loading further routes interactively, so only `/` got a live-browser console read — every other route's correctness rests on the `curl` header read plus the static-HTML build output, not a rendered check. Server killed afterward, port confirmed free.

**Undone.** Not committed, not pushed, not merged — staged with `git add` only: `package.json`, `package-lock.json`, `next.config.mjs`, `tsconfig.json`, `next-env.d.ts`, this entry. The CSP stays Report-Only; nothing in this branch enforces it.

**Needs elsewhere.** No `report-to`/`report-uri` endpoint exists to actually collect what the Report-Only header generates — without one, "a week of clean reports" means someone manually checking real users' browser consoles, not a dashboard. Security or Engineering should decide whether to stand up a collection endpoint (self-hosted `/api/csp-report`, or Vercel's own reporting) before treating a quiet week as evidence. After that week, `Content-Security-Policy-Report-Only` becomes `Content-Security-Policy` in `next.config.mjs` — same value. Someone should also decide whether `launch.projectxprotocol.dev`'s dangling CT-logged cert is a dead record worth nothing, or a host that should either be provisioned properly or have its cert revoked — it sat outside this dispatch's scope to chase further.

**A live worktree was found mid-task.** `.design-worktree/` (branch `design/pageheader-left`, another agent, see the entry immediately below) was present in this checkout's directory for the whole of this dispatch. It was not touched, not staged, not read for anything beyond confirming it wasn't this branch's concern; its own `UPDATE.md` entry below was written directly to this file's main-checkout path by that agent, not by this one.

---

## 2026-09-04 · BRANCH design/pageheader-left UNCOMMITTED, UNMERGED, NOT PUSHED (worktree `/Users/admin/WORK.CLAUDE/projectx-website/.design-worktree`, from main 21d1f8c; the main checkout was not switched, `fix/advisories-and-csp` is being worked there by another agent). Design department dispatch: the 2026-09-03 live-pages review (`work/reports/2026-09-03-design-live-pages-review.md`) measured five sub-pages — `/verification`, `/security`, `/chain`, `/social`, `/builders` — center-stacked through the one shared `PageHeader` component (`mx-auto flex … items-center … text-center`), against the ruling "left to right, not center-stacked," where the hub's own home page (`components/home/Hero.tsx`) already runs a two-column grid, headline left, panel right. SIX FILES CHANGED, no copy altered except the meta descriptions named below: (1) `components/layout/PageHeader.tsx` — every usage in the tree (checked: 15 pages) passes an `art` prop, so the header now renders `art ? 'grid … lg:grid-cols-[1fr_1fr] lg:gap-16' : 'flex flex-col items-start'` — the same two-column shape `Hero.tsx` uses, text column on the left (`items-start`, no `text-center`, no `mx-auto` on the eyebrow/h1/lead), art on the right, collapsing to a single left-aligned column below `lg` where the grid has no second track and items stack in source order (text first, art after — never centered, matching Hero's own mobile behaviour). The `proof` line's centered variant (`.proof-centered`, a divider centered with `left:50%`) is replaced with the left-border variant `components/ui/Section.tsx` already uses for its own non-centered case (`mt-1 border-l-2 border-px-accent/30 pl-4`) — no new CSS was added. (2) `app/layout.tsx` — the root `SITE_DESCRIPTION` (233 chars as read from this checkout's `main`, not the 354 the live site showed on 2026-09-03 — the two have since diverged) trimmed to 154 chars, keeping every product named: verification for Sui Move, five PR checks, early access, a report, and — separately — Weir (Sui creator network, closed alpha) and re-derivable draw software. (3–6) `app/verification/page.tsx` (187→158 chars), `app/security/page.tsx` (230→159 chars, keeping all four facts: what a contract must pass before touching money, who holds upgrade authority per package, how to report a vulnerability, where the guarantees stop), `app/chain/page.tsx` (172→141 chars), `app/social/page.tsx` (228→152 chars, keeping the vault language the page's own header comment requires — "creator's vault," never a bare "vault" — and dropping only the "not policy" contrast phrase, the one fact this trim could not keep inside 160). `app/builders/page.tsx`'s description (125 chars) was checked and left alone. The `/verification` page's body copy still reads "no card" (a fiat-word finding from the same review) — untouched here on purpose, it is a copy change outside this dispatch's scope (tagline and meta descriptions only) and the review already names it for Marketing. VERIFIED ON THIS LAPTOP: `npm ci` in the worktree (154 packages); `npm run check` — **exit 0**: `tsc --noEmit` clean, `node --test lib/**/*.test.ts` 6/6 passed, `python3 scripts/guardrails.py` no new violations (22 pre-existing accepted), and all six `verify-*.mjs` scripts green (30 contrast pairs across 2 themes, 7 claim rules across 83 files, no private hosts in 82 files, 2 purged hosts unlinked, SuiNS mirror matches chain across 3 tiers, pricing agrees at $249/mo, $2490/yr, founding $149). RENDERED: `next dev -p 4123` in the worktree — every route needs `PROTOCOL_API_URL` and `NEXT_PUBLIC_SITE_URL` set or `lib/stats.ts`/`lib/links.ts` throw by design rather than defaulting quietly; neither is a secret and neither was read from or written to any `.env` file (the guard refuses any command shaped like one, tested and confirmed refused) — both were passed as plain shell environment variables for this dev process only, `PROTOCOL_API_URL=http://127.0.0.1:9` (an address nothing answers, so the page takes its own designed fallback to the baked snapshot rather than fabricating a live figure) and `NEXT_PUBLIC_SITE_URL=http://localhost:4123`. `/security` and `/chain` opened in the Browser pane and read back at 1280×900 and 375×812 (security only, chain checked at 1280): both show the eyebrow badge, h1, lead and pills left-aligned with the art beside them at 1280 and stacked below them at 375, no centered stack at either width; server stopped afterward (`kill`, confirmed no process left on :4123). UNDONE: **nothing committed, nothing pushed, nothing merged** — per the dispatch, the six files above sit as an uncommitted working-tree change on `design/pageheader-left`; whoever lands this must commit it first. Ten other `PageHeader` callers outside the five named pages (`blueprints`, `disclaimer`, `faq`, `ctf`, `protocol`, `community`, three `legal/*`, `interfaces`) inherit the same left-to-right shape automatically since they share the one component and all pass `art` — not individually re-reviewed against their own copy, only checked that none of their descriptions needed trimming (out of scope: only the five named sub-pages' descriptions were in the dispatch). `/verification`'s two other-than-160 findings from the review (title fine, "no card" fiat wording) are unresolved and not this office's fix. NEEDS ELSEWHERE: Engineering to review and commit the branch, merge it into the next weekly release; Marketing to reword the `/verification` "no card" clause (Security's 2026-09-03 review already assigned this) and to confirm the four trimmed descriptions still read as intended. Report: work/reports/2026-09-04-design-heroes-and-tagline.md.

---
## 2026-09-04 · Security sweep: this file's convention corrected going forward

Every entry above and below this one stands as written; law here is never edited, only
superseded by a newer entry, and this is that entry. The estate's security desk swept every
repository this company holds for material meant to stay on the local machine and found, among
entries in this file, a decision quoted word for word and the paths of internal documents named
directly. Neither belongs in a file whose only job is telling the next reader what changed, why,
and what was verified.

GOING FORWARD: an entry may state that a decision was made and by whom in role terms, never quote
the decision's exact wording, and never name the path of an internal report, state file or desk
tool. Where the fact of a decision matters to the next reader, it is stated as a fact, not as a
quotation or a path. Findings sit on this repository's own `security/eyes-only` branch; the estate
sweep's own report is a desk document and is not named here on purpose.

## 2026-09-03 · MERGED, PUSHED, DEPLOYED. Main is `21d1f8c` (merge of `truth/projectxprotocol-dev` 695b53e). `npm run check` on main after the merge: exit 0 (typecheck, 6/6 tests, guardrails, six verify scripts; the pricing check reports both pages agree at $249/mo, $2490/yr, founding $149 — the "two App prices" the ledger flagged were the monthly price and the founding price, not a disagreement). Pushed to GitHub. Deployed from this laptop by `vercel pull` / `vercel build --prod` / `vercel deploy --prebuilt --prod` with the project's identifiers in the environment (the checkout is not linked), aliased to https://projectxprotocol.dev; live read afterwards: /security names `weir-protocol` twice and no longer says the company publishes no public repository. The Actions deploy path has been dead since 2026-09-02; this is the first laptop deploy of this site. The one-merge-a-week rhythm was broken tonight on the owner's explicit word to ship everything that was ready. Supersedes the "staged, unmerged" entry below.

## 2026-09-03 · Branch `truth/projectxprotocol-dev` staged, unmerged — the Master's truth-pass order

**Who:** engineering agent on the chief technology officer's dispatch, under the Master's order
2026-09-03 ("present that we are less and be more, than present more and be less") · **Where:**
branch `truth/projectxprotocol-dev`, created from `main` at `b641fd1` · **Ref:**
`work/reports/2026-09-03-product-truth-pass-claim-ledger.md` §6–§7; rows 83–220 of the CSV beside
it; full detail in `work/reports/2026-09-03-engineering-truth-branches-hub-and-readmes.md`.

21 files, staged with `git add`, not committed. In outline: the site description and the Hero
"From $1,000" line drop the unverified "delivered inside 24 hours" promise for "turnaround agreed
in writing when you order; none has been delivered yet" (rows 83, 87, 108, 121, faq); the .sui
name search now says registration through Weir is behind the waitlist and points at suins.io (row
88); the three measurement claims on the home page and `/security` are scoped to what has
actually been measured — three contracts by mutation, one lifecycle staged, one money path proven
— instead of "every suite" and "every lifecycle" (rows 89–93, 171–172); the pool record on the
home page and `/ctf` carries its read date in the heading rather than only in a badge (rows 97,
165); Weir's card and meta descriptions across the site now say "closed alpha" (rows 99, 131);
the Draws and Interfaces cards say one proving draw has settled and no competition is open today,
rather than describing draws in the present tense as though one were running (rows 102, 153);
the Read API moves from "Available now · Live" to "Documented; not served at present" on
`/builders` and `/interfaces` (rows 103, 156, 190–192); "no card" is struck from the three
pricing paragraphs that carried fiat wording, on `/verification`, `/install` and `/faq`, with no
digit changed anywhere (rows 122, 128, 198); the GitHub-organisation sentence on `/security` and
`/faq` is corrected from "publishes no public repositories" to naming `weir-protocol`, public
since 2026-09-02 (rows 179, 201); the multisig-custody sentence on `/security` is now derived by
filtering the same table it describes — three of four caps, not two — so it cannot drift from the
table again (row 174); the Weir row in `lib/security-chain-read.ts` is corrected from v3 to v5 and
marked `source: 'spec'`, citing `weir/UPDATE.md` rather than claiming a fresh chain read (row
184); and the `/blueprints`, `/builders` and home-page "one system a week" / "one complete system
per week" cadence claims are replaced with "complete designs on top of ProtocolX", since one has
been published and five are outlined (rows 158–159, 195).

**A fact-check that overturned the ledger's own suggested text.** Ledger row 162/196 said to make
`/builders` and `/blueprints` agree on event names by using `Deposited`/`Withdrawn` on both pages.
Reading the actual deployed contract (`usdc_prize_factory.move`, both the `V1.0.1-Public` and
`projectx-enterprise-core` copies on this laptop) shows the emitted events are `DepositMade` and
`WithdrawalMade` — `/blueprints` already had this right, `/builders` had it backwards. `/builders`
was corrected to match the contract, not the ledger's suggested wording.

**Not changed, and why.** No price figure was touched anywhere. `/faq` still reads $149/mo and
$1,490/yr while `/verification` and `/install` read $249/mo and $2,490/yr with $149 founding — the
same disagreement the ledger found, listed for the Master rather than resolved by this branch
(ledger open question 1). `app/faq/page.tsx:256-262` (AMOE) and `app/disclaimer/page.tsx` were not
edited — legal text, held for the Master. The stake-ladder "6 tranches / 7 days / 85.7% of
available yield" figures on `/protocol` and `/blueprints` were left alone: they are already
code-derived from `LADDER_DEPTH` and `config.maturityPeriodMs`, not hardcoded prose, and whether
that constant matches the actual on-chain ladder is the open protocol question the ledger names,
not a copy defect. The `OKXEarn · 0% commission` validator note in `components/ui/StackStrip.tsx`
was left unchanged — the ledger's "as last read" qualifier does not fit the compact strip without
a design pass. Not re-read tonight: the Names, Prize Vault and Draws UpgradeCaps in
`lib/security-chain-read.ts` (only the Weir row was corrected, from the ledger's own dated
evidence, not a fresh chain read).

**Verified.** `npm run typecheck` clean. `npm run check` (typecheck, tests, guardrails, the six
verify scripts) exit 0: 6/6 tests pass; guardrails `no new violations (22 accepted, pre-existing)`;
`verify-claims.mjs` clean across 83 files (no banned claim reintroduced); `verify-verify-pricing.mjs`
still reports `OK — both pages agree: $249/mo, $2490/yr, founding $149` (untouched by this branch).

**Claims changed: approximately 40** across the rows named above. Unmerged. Nothing pushed,
committed or deployed.

---

## 2026-09-03 · Gate run on this laptop, recorded in the estate ledger; main at `b641fd1`, clean

**Who:** engineering agent on the chief technology officer's dispatch · **Where:** `main` at `b641fd1`, 0 dirty files, `main...origin/main` per the local ref (not fetched) · **Ref:** `work/state/gate-runs.json` id `projectx-website`; report `work/reports/2026-09-03-engineering-gates-for-every-solution.md`

`npm run check` (typecheck, tests, guardrails, the six verify scripts), 7 seconds, exit 0:

- `tsc --noEmit` clean.
- `node --test "lib/**/*.test.ts"` → `tests 6 · pass 6 · fail 0`.
- `python3 scripts/guardrails.py` → `no new violations (22 accepted, pre-existing)`.
- verify → `30 contrast pair(s) meet WCAG across 2 theme(s)`; `7 claim rule(s) clean across 83 file(s)`; `no private or loopback addresses in 82 shipped file(s)`; `2 purged host(s) unlinked, LAUNCHER_URL fail-closed`; `SuiNS price mirror matches chain — 3 tier(s) compared` (the public endpoint answered, so this was a real comparison, not a SKIP); `verify pricing: OK — both pages agree: $249/mo, $2490/yr, founding $149`.

**Result: pass.** Not run: `npm ci` (node_modules already present, not refreshed) and `next build` (CI deliberately does not build either; the runtime values live in Vercel).

---

## 2026-08-31 · The vault-era sweep is MERGED and LIVE — the open-PR status below is superseded

**Who:** desk audit (read-only verification) · **Where:** main at `c30fffa` · **Ref:** PRs #19, #20, #22, #23, #24

The work the entry below tracks as open PR #21 landed on main as **PR #19** ("Take the vault era off the hub and build the four surfaces it was missing"), followed by #20 (the Weir page no longer invites readers through a shut door), #22 (flagship document headings, last vault pitch cleared off the front door), #23 (comment and file hygiene) and #24 (two lost governing-document entries recovered). PR #21 itself was closed as superseded, not lost. Verified 2026-08-31 from main history.

---

## 2026-08-30 · Hub swept of the vault era and rebuilt around the four surfaces the Master named. Rendered vault-era:flagship across all 18 routes 1.53:1 to 0.99:1 (436:285 to 297:301), measured on built HTML. /sponsor RETIRED — archived, and next.config.mjs gains this site's first redirects() export, 308 to /protocol, tested. /chain is NEW: the on-chain record, 4 product lineages and 7 vault objects, every id explorer-resolvable, and it is in the navigation. /faq rewritten around the verification buyer (vault 40 to 6, flagship 27 to 33) with the AMOE block carried VERBATIM and marked do-not-edit. /security re-registered onto our own practice and threat model (13 to 4). /protocol re-registered from pitch to record and made the CTF's technical appendix; /ctf receives the vault as subject matter, so those two RISE by design (44 to 48, 11 to 17) — that is the relocation, not a miss. Nav measured in a browser: Verification · Security · On chain · Social · Draws · Developers at 526px against a re-derived 645px ceiling; the bar WRAPS rather than overflows, so an overflow-only test gives a false 677px. FOUND AND FIXED: /verification and /verification/install had NO h1 at all — 18/18 routes now have exactly one. Nothing deleted; four files archived to operations/archive/2026-08-30-hub-vault-sweep/. All four verifications green twice. PR #21, NOT merged.

**Who:** Frontend agent, on Kaela's dispatch · **Where:** branch `hub-rebuild`, commits `ef3c617` + `c44f05a` · **Ref:** PR #21, open, not merged

The Master: *"from the hub, you need to take out every trace of the vault, the dashboard. There is no sponsor, there is no prize... We need to present our verification, our security steps... social, and... ProtocolX data... the v1.0.1 will go to the capture the flag section."*

- **Verified:** build 24 routes clean ×2 · 6/6 tests ×2 · guardrails no new violations (22 accepted, pre-existing) ×2 · verify 30 contrast pairs, 7 claim rules across 83 files, no private hosts, 2 purged hosts unlinked, SuiNS mirror matching chain ×2. Every route 200 against the production build, unknown path 404, `/sponsor` 308.
- **Two things the census does NOT mean.** `/social` barely moved, 38 to 37, and that is correct: every "vault" on it is a **Weir creator vault**, a live product whose mechanism genuinely is park–delegate–yield–withdraw. A word census cannot tell the live mechanism from the retired one. The page was already right; the bare noun was disambiguated to "creator vault" so this is not re-litigated. `/protocol` and `/ctf` rising is the vault arriving where it was sent.
- **Already clean, reported rather than invented:** zero "chatbot" matches anywhere. "Dashboard" likewise — every remaining match is legitimate ("there is no dashboard to configure" is a Verify selling point).
- **Held for the Master, untouched:** all legal text (`/disclaimer` 16 prize / 6 vault, `/legal/*`); the AMOE block, verbatim, which still promises rules and a sponsor address at `/legal/terms` that are not there and routes free entry through a DApp that does not exist; `/blueprints` weekly cadence; six tranches vs 7-day maturity.
- **Open, and it is a ranked trade rather than an oversight:** **"For organisers" is off the top nav.** It was deliberately restored there on 30 August as the raffle's highest-value customer. The seven-label set that keeps it measures 646px against a measured 645px ceiling — it wraps by one pixel. It keeps its footer Products entry. Reversing this is the Master's call.
- **⚠️ Concurrency hazard, recorded because it nearly cost the work.** Mid-task this working tree was committed to `hub-rebuild` as `ef3c617` and the repository switched back to `main` — **not by this agent**. Uncommitted work was left stranded on `main` and was recovered intact. A correct `/social` badge fix also appeared in the tree from another writer; it is kept and attributed in `c44f05a`, but its Creator Terms §3.3 citation is **not independently verified**.
- **⚠️ `ef3c617`'s message carries a census this agent did not produce and cannot reproduce** with any script in the repository (it states 645:98 to 251:239). The reproducible figures are 436:285 to 297:301, measured on built HTML across 18 routes, and are in `c44f05a`. Not amended — that would require a force-push.

---

## 2026-08-30 · The vault era comes off the hub — full sweep and reorganisation ordered

**Who:** Kaela (desk), dispatching · **Where:** measurement on `main` at `bbb00b5` · **Ref:** branch `hub-rebuild`, in progress

The Master's order, verbatim: *"take out every trace of the vault, the dashboard. There is no sponsor, there is no prize. There is no dashboard anymore... We need to present our verification, our security steps... social... and ProtocolX data. The v1.0.1 will go to the capture the flag section."*

**This supersedes the 30 Aug tightening.** That change DEMOTED the vault era (6.58:1 → 3.94:1 rendered). He wants it OFF the hub, not ranked lower.

Per-route census, measured today — `vault/deposit/depositor/yield | sponsor/prize | dashboard/DApp`:

```
/ 7|0|0 · /blueprints 8|3|0 · /builders 4|13|0 · /community 1|0|3 · /ctf 4|10|0
/disclaimer 6|16|0 · /faq 39|18|6 · /interfaces 20|12|4 · /protocol 19|11|3
/security 7|2|1 · /social 44|1|0 · /sponsor 10|36|4 · /verification 0|0|1
```

`/faq` is the worst content page. `/social` carries 44 vault mentions on a page about a creator platform. `/sponsor` sells *"Put your name on tomorrow's prize"*.

- **Verified:** `grep -ioE` per route on `bbb00b5`, 2026-08-30. **Zero "chatbot" matches exist anywhere** — that item of his order was already clean and no work was invented for it.
- **The mechanism, stated once:** the vault's interface was retired 25 Aug and `DAPP_URL` is null, so every "Open the vault" control is already suppressed. **The buttons vanished; the prose selling the vault never did.**
- **The v1.0.1 instruction is elegant and was adopted exactly.** `/ctf` is ALREADY built on the vault — it teaches v1.0 (retired deployment) and v1.0.1 (live pool), and `lib/ctf.ts` and `lib/security-chain-read.ts` already name `usdc_prize_factory V1.0.1`. The vault survives on this hub **as the CTF's subject matter and nowhere else** — it stops being a pitch and becomes the thing you are attacking.
- **Never delete, method written into the dispatch:** every retired page is archived to `operations/archive/2026-08-30-hub-vault-sweep/` preserving its path, AND gets a permanent redirect in `next.config.mjs`. There are none today, so `redirects()` is being added — **a removed route without one breaks every link anyone ever shared.**
- **The vault CONTRACT remains live on Sui mainnet.** The site must never say the vault is dead or removed. It is real and it is unreachable; those are different sentences.
- **HELD FOR THE MASTER, untouched:** all legal text (`/disclaimer` alone carries 16 prize and 6 vault mentions), the AMOE block, the `/blueprints` weekly cadence, and the six-tranches-versus-seven-days question. Legal obligations are not copy.
- **A desk error worth recording:** committing this file to branch `docs/update-file` removed it from `main`'s working tree, so for a few minutes the hub had no governing document while an agent was under instruction to read it first. Restored from the branch. **Lesson: a governing document must exist in the working tree at all times, so commit it in a way that never takes it out of the tree it governs.**
- **Open:** the before/after rendered census is the number this job is graded on and is not yet in.

---

## 2026-08-30 · Verification pages moved off a dead mailbox. Both pages selling the $1,000 First Report printed claude@protocolx.io, which forwards ONLY to protocolx@atomicmail.ai (BRAND-EMAIL-LAW line 147) — unread by the Master and currently unreachable by the desk, so every buyer reply landed in a void. Now hello@projectxprotocol.dev per the same law's line 23 (Company/verification/prospects/the hub), which forwards to the Master's inbox — verified. Three occurrences, all on /verification and /verification/install, subject parameter preserved on both. Does NOT touch the Master's 'keep claude' ruling, which governs reply-to on outbound prospect sends, not addresses printed on public sales pages; claude@protocolx.io is unchanged everywhere else. Read back out of the prerendered HTML for both routes: every mailto is hello@, no leak of the machine mailbox. All four verifications green. PR #17, second commit, still not merged.

---

## 2026-08-30 · Hub tightened to the flagship: rendered vault-era:flagship ratio 6.58:1 to 3.94:1 across all routes. Footer band on all 19 routes stopped selling the vault behind a suppressed button and now states ProtocolX Verify with two live doors; the vault keeps its conditional Products entry. /verification deepened 219 to 315 lines from material already published — neutral gate conditions, the evidence bundle and its reproducing digest, the qualifying config, and the App price ($149/repo/mo) that lived only on the install page. Mission (the vault argument) relocated from the home page to /protocol, same component unchanged. /faq gained six verification questions and lost none. Also: Logo 'Prize Protocol' to 'Protocol on Sui', 'Shipping next' to 'On the roadmap', 404 deposit assumption, footer 'either one', site description and keywords. Nothing deleted. PR #17, not merged. Held for the Master: AMOE block, /blueprints cadence, six-tranches-vs-7-days, and claude@protocolx.io vs @projectxprotocol.dev.

---

## 2026-08-30 · The hub is 6:1 vault-era against its own flagship — tightening dispatched

**Who:** Kaela (desk) · **Where:** measurement across `app/` and `components/` · **Ref:** branch `hub-tighten`, in progress

The Master: *"the hub also has history from the dashboard, from the vault, from whatever. It needs a proper tightening up."* Measured rather than assumed.

Word occurrences across the shipped site:

| era | count |
|---|---|
| prize 200 · deposit 117 · draw 101 · vault 80 · yield 77 · DApp 46 · sponsor 38 · depositor 33 | **672** |
| verification 54 · verify 32 · PVS 16 · mutation 14 | **116** |

**Roughly six to one against the flagship, on the flagship's own hub.** And `/verification` is 219 lines while `/ctf` is 310 and `/blueprints` is 315 — the flagship page is smaller than two developer toys.

The mechanism: the vault's interface was retired 25 August 2026 and `DAPP_URL` is null in production, so every "Open the vault" control is correctly suppressed — **but the prose around those suppressed controls still explains, argues for and sells the vault at length.** The buttons vanished; the pitch did not.

- **Verified:** counts taken with `grep -rioE` across `app/` and `components/` on `main` at `3444397`, 2026-08-30.
- **Constraint carried into the dispatch:** nothing is deleted. Vault, draws and sponsor material relocates or demotes; every page, route and link survives. The vault CONTRACT is live on mainnet — only its front end is gone, and the site must never say the vault is dead.
- **Open:** the before/after ratio is the headline number of that job and is not yet in.

---

## 2026-08-30 · Verification is the flagship; the internal voice is out of the copy

**Who:** Kaela (desk) + content agent · **Where:** nav, homepage, footer, `/verification`, `/security`, `/faq` · **Ref:** PRs #14 and #16, both merged, main at `3444397`

`/verification` was **not in the navigation at all** — neither the desktop pill nor the drawer,
on the domain that is the verification hub. It now leads: Verification · Draws · Social · Names ·
For organisers · Developers. A comment claimed the bar was full at six labels; re-measured in a
browser at 1024px, the real break is **637px** and these six measure **557px** — 80px of
headroom. Nothing had to be deleted.

The header's one button read "See draws" and pointed at the raffle, contradicting the nav on the
control most people press. It is now **"Verify a repo"**, an internal `next/link`. Measured at
320/375/1024px before shipping: one line, zero overflow at all three.

Hero sells the First Report, not a name. Verification moved from last on the homepage to second.
The closing band leads with the measurement. **Nothing deleted** — the name search is still on
the page, below the divider.

**Four false claims removed.** `/security` and `/faq` said our threat model was "on GitHub" and
readable today. The org publishes **zero public repos and zero gists**, and so does the personal
account — checked against the API. The FAQ now opens *"No. No third party has reviewed this code,
and we will not imply one has."*

The App is priced on the page at last: **$149/repo/month, $1,490/year, one public repo free.**
The paragraph that said it "is not priced yet" was internal reasoning printed at the customer,
and also false.

- **Verified:** build clean across 24 routes · 6/6 tests · guardrails no new violations (22
  accepted, pre-existing) · 30 contrast pairs across both themes · 7 claim rules across 84 files
  · no private hosts · no retired hosts · SuiNS price mirror matching chain.
- **Open:** `/blueprints` and `/protocol` say six tranches while the parameter tile renders
  maturity as **7 days**. An agent built the helper that would have printed "7 epochs" and backed
  it out rather than infer the ladder's shape. **Protocol question for the Master.**
- **Open, held for the Master:** the AMOE block at `app/faq/page.tsx:256-262` promises rules, a
  sponsor address and entry weighting at `/legal/terms` that are not there, and `:261` routes free
  entry through a DApp that does not exist. Legal substance — copy down, or rules up.
- **Open:** `/blueprints` promises a weekly cadence with one blueprint published.

---

## 2026-08-30 · The estate's channels render on every page

**Who:** Kaela (desk) · **Where:** `lib/links.ts`, `components/ui/ChannelLinks.tsx`, footer, drawer, `/community`

`@protocolx_io`, `@ProjectX_Sui` and `github.com/Northlatch-Labs-LLC` now render from one list in
the footer and the mobile drawer. They were on `/community` only — which states any account not
on its list is not ours and calls that list canonical. **An impersonation defence nobody can
reach is not a defence.** `/community` gained the GitHub entry in the same change so the two
lists cannot disagree.

- **Open, and it is a real constraint:** the GitHub organisation publishes **zero public
  repositories**. The link is ours and it resolves, but it opens an empty shelf until
  `protocolx-verify` is published. **No "read the source" claim may be written beside it** until
  that lands. The watcher checks this hourly.
