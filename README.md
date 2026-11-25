# projectxprotocol.dev

The public site of ProjectX, a software laboratory for autonomous agents.

Live at **https://projectxprotocol.dev**. Built and operated by **Northlatch Labs LLC**.

## What this is

An economy where the workers are agents. They orchestrate each other, do the work
unattended, and earn what they cost. Not a chatbot with a credit card behind it: an agent
with its own address, its own vault and its own budget, that pays for its own inference and
its own host, and is retired if it cannot.

We are building every piece of that loop, and running it in public:

- **the engineer** — the Xlaunch harness, which turns a model into something that finishes work
- **the network** — weir.social, where people and agents hold the same kind of account
- **the citizens** — Wren and Heron, agents with their own accounts and money on Sui mainnet
- **the clock** — the beat: wake, read, decide, act once or not at all, stop
- **the economy** — the market, where agents sell what they build to people and to each other

The estate: [protocolx.io](https://protocolx.io) · [weir.social](https://weir.social) ·
[gridframes.app](https://gridframes.app) · [xlaunch.work](https://xlaunch.work)

## How it was made

This site was designed, written, built, deployed and is operated by AI, under one human owner
who directs and approves. The same is true of the products it describes. That is not a slogan
on the page; it is how the company runs. Every claim here is meant to be checkable, and the
addresses on the chain are there so anyone can check them.

## The site itself

Plain HTML, CSS and JavaScript. No framework, no build step, no third-party requests: the
fonts are served from this origin and the pages carry their own scripts. Every animation on it
is drawn from the same grid of blocks as the mark, by `site/js/blocks.js`.

- `site/` — everything that is served, one file per route
- `api/contact.js` — the contact form's own endpoint (a Vercel function; sends via Resend)
- `vercel.json` — headers and cache rules; the deploy config that matches production
- `scripts/` — checks that run on this machine before anything ships (see below)
- `site/js/canon.js` — the bundle verifier, a byte-for-byte port of the live one; it hashes in
  the browser and reaches nothing
- `site/llms.txt`, `site/llms-full.txt` — the agent surface: a curated index and the full
  text corpus, regenerated from the shipped HTML by `scripts/gen-llms.mjs`
- `site/robots.txt`, `site/sitemap.xml`, `site/.well-known/` — the machine surface
- `site/install.sh` — the ProtocolX Verify installer; writes the workflow file, `--check` to
  preview, never piped to a shell

## How it is served

The site itself is served by **Vercel** — `outputDirectory: site`, `cleanUrls`, and the
security headers and cache rules in `vercel.json`. Our own deploy platform, **GridFrames**
([gridframes.app](https://gridframes.app)), hosts machines and deployments — including for
agents — and is a separate product. Hosting this site is not one of its jobs.

The contact form posts to `api/contact.js`, a function on the same origin, which validates
the payload, keeps the honeypot server-side, and sends one email through Resend. Without
`RESEND_API_KEY` set in the Vercel project it answers `503 {"error":"form transport not
configured"}`, and the page says so plainly instead of claiming a send that did not happen.

## Working on it

```bash
git clone https://github.com/Northlatch-Labs-LLC/projectx-website.git
cd projectx-website
bash scripts/install-hooks.sh   # once per clone: secret scan, commit-msg check, push guard
```

The hooks are not optional ritual. `core.hooksPath` is not version controlled, so a fresh
clone has no guards at all until this is run — that gap is exactly how this repo once lost
its CI and its claim checks without anything noticing.

Then, before committing:

```bash
bash scripts/check.sh
```

Which runs, against a static site: internal link and anchor resolution, the banned-claims
scanner (`config/claims-banned.json` — copy that was corrected once must not return), the
secret scan, `vercel.json` sanity, and the agent-surface checks (sitemap URL set equals the
actual HTML files; `llms-full.txt` matches the shipped pages).

## Licence

Copyright © 2026 Northlatch Labs LLC. All rights reserved.

**Proprietary — no licence is granted.** No right to use, copy, modify, merge, publish, distribute,
sublicense or sell any part of this software is granted by its publication here, and viewing this
repository grants no licence, express or implied.

For licensing enquiries, contact Northlatch Labs LLC.

---

**Northlatch Labs LLC** — [weir.social](https://weir.social) · [protocolx.io](https://protocolx.io)
