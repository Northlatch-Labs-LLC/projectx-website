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
