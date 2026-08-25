# ProjectX — Protocol Website

The public presentation site for **ProjectX**, the no-loss prize pool on Sui mainnet.

It is a **marketing site and nothing else**. It has no wallet code, cannot request a
signature, cannot build a transaction, and does not call the protocol at request time. Live
state — your position, the current pot, the epoch clock, the settlement ledger — belongs in
an interface next to a connected wallet, and that is where it lives.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Claim, social-proof figures, three-card explainer, why prize savings, interfaces, builders |
| `/interfaces` | **Every way to use ProjectX.** The vault we run is one of them; anyone can build another |
| `/blueprints` | The weekly series — one complete buildable system, mathematics included |
| `/builders` | Build ideas, the toolkit, the read API, events and every deployed address |
| `/protocol` | The mechanism: parameters, the four epoch phases, the stake ladder, the draw, settlement |
| `/security` | The security model and what is explicitly out of scope — including that no audit exists |
| `/sponsor` | Community prize funding: what it is, why people do it, and why it is a gift |
| `/faq` | Plain answers, including the free-entry (AMOE) route |
| `/community` | Channels, and a warning about impersonation |
| `/terms` `/privacy` `/disclaimer` | Website terms, privacy notice, risk disclosure |

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build && npm start
```

```bash
npm run typecheck
```

**Never run `next build` while `npm run dev` is running against the same directory.** The
build replaces files the dev server holds open and the running site starts throwing `ENOENT`
on vendor chunks. This has bitten twice — once here, once against the live vault. Stop the
dev server first.

---

## Configuration

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_DAPP_URL` | client | The deployed vault interface. Every "Start saving" points here |
| `NEXT_PUBLIC_SITE_URL` | client | This site's public origin — canonical URLs, Open Graph, sitemap |

Both are inlined at build time. Rebuild when they change.

---

## Data: baked, dated, no runtime dependency

Figures come from `lib/snapshot.json`, captured from mainnet and refreshed at deploy:

```bash
PROTOCOL_API_URL=http://localhost:8080/api/v1 node scripts/refresh-snapshot.mjs
```

`lib/stats.ts` derives the handful of numbers the site quotes and carries `capturedOn`
alongside them, so a figure is never presented as live when it is not. There is no API
client in this codebase; the site cannot be taken down by the protocol's infrastructure and
the protocol cannot be load-tested by the site going viral.

---

## Design system

```
app/                   routes; one page per file, metadata co-located
components/ui/         primitives — Section, Card, Button, Badge, StatTile, Reveal,
                       Backdrop, Logo, Signature, StackStrip, HeroScene, Icons
components/layout/     SiteHeader, MobileNav, SiteFooter, PageHeader
components/home/       the home page's six sections
components/builders/   Ideas, Toolkit
components/protocol/   the explanatory diagrams
components/live/       AddressTable — the one component that renders chain identifiers
lib/                   chain constants, formatting, derivations, stats, blueprints
```

**Type.** Three families, each with one job. `font-display` is Space Grotesk for headings,
`font-sans` is Geist for everything else, `font-mono` is Geist Mono for figures and
addresses. `text-wrap: balance` on headings and `pretty` on paragraphs; tracking tightens as
size grows; measures are set in `ch` so they stay measures at every viewport.

**The two tiers.** Every section says it plainly, then proves it. `.lead` is the subtitle —
short measure, brighter, second voice. `.proof` is the technical line underneath, dimmer,
with an accent rule down its left edge tying it to what it explains.

**The house rule, in colour.** The mark is two strokes that cross without merging.
Blue and closed means principal — it comes back. Green and open means yield — it leaves, and
it is the only thing that ever does. `Signature` renders that idea as a divider. Any new
graphic should be able to say which of the two it is.

---

## Rules worth keeping

1. **Numbers come from the snapshot, never from prose.** Hard-coding "5%" into a sentence
   means the site can describe a protocol that no longer exists.
2. **`lib/chain.ts` is the only place addresses are written.**
3. **Planned things are labelled planned.** The empty interface slot, the dashed roadmap
   tiles, the "Planned" toolkit badges. An unlabelled roadmap is a claim.
4. **Third-party marks are original glyphs with the provider named beside them.** Licensed
   brand assets can replace them in `StackStrip` without touching anything else.

---

## Editorial stance

The site says the protocol has not been independently audited, that there is a single price
feed, that prizes can be small or absent, that contributing to the prize pot has negative
expected value, and that there is exactly one interface so far. These are not oversights to
tidy before launch — a protocol that custodies deposits earns trust by being first to say
what can go wrong.

---

## Deployment

`Dockerfile` builds a standalone image. The site is stateless: no database, no sessions, no
secrets.

```bash
docker build -t projectx-website --build-arg NEXT_PUBLIC_DAPP_URL=https://app.example --build-arg NEXT_PUBLIC_SITE_URL=https://example .
```
