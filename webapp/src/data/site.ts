// Single source of truth for Northlatch Labs commercial copy, pricing, and links.
// Every product, price, repo, and URL reflects verified public surfaces and GitHub repositories
// under github.com/Northlatch-Labs-LLC and github.com/0xda7 as of 2026-11-26.

export const SITE = {
  name: 'Northlatch Labs',
  legalName: 'Northlatch Labs LLC',
  tagline: 'Commercial AI Workforces, Local Inference & Verifiable Software',
  description:
    'Northlatch Labs builds and operates commercial software across AI collaboration (Synappse), autonomous engineering (Xlaunch), local macOS inference (Kestrel), agent governance (Hivex), cloud hosting (GridFrames), smart contract CI verification (Verify), fair promotions (ProtocolX), and creator/agent accounts (Weir).',
  origin: 'https://northlatch.tech',
  legacyOrigin: 'https://projectxprotocol.dev',
  contactEmail: 'hello@projectxprotocol.dev',
  securityEmail: 'security@projectxprotocol.dev',
  privacyEmail: 'privacy@projectxprotocol.dev',
  legalEmail: 'legal@projectxprotocol.dev',
  primaryCta: { label: 'Start a Project', href: '/contact' },
  secondaryCta: { label: 'Explore Solutions', href: '/#solutions' },
  family: [
    { label: 'synappse.work', url: 'https://synappse.work' },
    { label: 'xlaunch.work', url: 'https://xlaunch.work' },
    { label: 'protocolx.io', url: 'https://protocolx.io' },
    { label: 'weir.social', url: 'https://weir.social' },
    { label: 'gridframes.app', url: 'https://gridframes.app' },
  ],
};

export interface Product {
  slug: string;
  category: string;
  name: string;
  status: string;
  audience: string;
  headline: string;
  summary: string;
  bullets: string[];
  priceLabel: string;
  priceDetail: string;
  primaryCta: string;
  primaryHref: string;
  external: boolean;
  secondaryCta: string | null;
  secondaryHref: string | null;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'synappse',
    category: 'AI Team Runtime',
    name: 'Synappse',
    status: 'Live',
    audience: 'Teams, operators & enterprises',
    headline: 'Turn AI into a governed digital team',
    summary:
      'Move beyond isolated chat windows. Synappse gives your organization shareable AI teammates with defined roles, shared memory, workspace plugin/MCP permissions, local execution bridges, and event-driven triggers.',
    bullets: [
      'Multi-role threads with persistent shared team memory',
      'Workspace-governed plugins, MCP access & audit trails',
      'Self-hostable open runtime or managed cloud workspace',
    ],
    priceLabel: 'Free / $25 mo',
    priceDetail: '$0 Free (3 agents) · $25/mo Pro · $25/seat/mo Team',
    primaryCta: 'Launch Synappse',
    primaryHref: 'https://synappse.work',
    external: true,
    secondaryCta: 'Self-hosting & GitHub',
    secondaryHref: 'https://github.com/Northlatch-Labs-LLC/synapse',
  },
  {
    slug: 'xlaunch',
    category: 'Autonomous Engineering',
    name: 'Xlaunch',
    status: 'Live',
    audience: 'Engineering teams & technical operators',
    headline: 'Autonomous AI engineer & 44-provider gateway',
    summary:
      'Deploy an AI engineering harness equipped with 21 tools, a persistent shell, live shared browser workbench, and replayable sessions — backed by a unified API gateway routing 111 models across 44 providers.',
    bullets: [
      '21 tools, persistent shell, LSP lookups & replayable JSONL sessions',
      'OpenAI- & Anthropic-compatible gateway across 44 providers',
      'Live shared browser workbench & subagent swarm execution',
    ],
    priceLabel: 'Free tier / Metered',
    priceDetail: 'Free starter tier · pay-per-use card or SUI credits',
    primaryCta: 'Explore Xlaunch',
    primaryHref: 'https://xlaunch.work',
    external: true,
    secondaryCta: 'Gateway source',
    secondaryHref: 'https://github.com/Northlatch-Labs-LLC/xlaunch-gateway',
  },
  {
    slug: 'kestrel',
    category: 'Local AI Engine',
    name: 'Kestrel AI Engine',
    status: 'Open + Commercial',
    audience: 'macOS teams, regulated orgs & Intel/AMD Mac users',
    headline: 'Private on-device LLMs, speech & image studio',
    summary:
      'Run modern open LLMs, Whisper GPU dictation, and Stable Diffusion locally on macOS with AMD-patched Metal acceleration — zero cloud dependency, zero per-token fees, and full MCP/agent tool support.',
    bullets: [
      '~61 t/s Qwen3-8B on AMD dGPUs via patched llama.cpp & KestrelGEMM',
      'Local Whisper speech/subtitles, vision & image generation',
      'GPL-3.0 open source with commercial dual-licensing available',
    ],
    priceLabel: 'Free / Dual-License',
    priceDetail: 'Free open-source app · commercial licensing & support available',
    primaryCta: 'View Kestrel on GitHub',
    primaryHref: 'https://github.com/0xda7/kestrel',
    external: true,
    secondaryCta: 'Commercial licensing',
    secondaryHref: '/contact#topic-kestrel',
  },
  {
    slug: 'verify',
    category: 'Contract Security CI',
    name: 'ProtocolX Verify',
    status: 'Live',
    audience: 'Engineering teams shipping Sui Move',
    headline: 'Automated CI checks with verifiable proof',
    summary:
      'Run five automated security gates — including mutation smoke testing — on every pull request. Ship a cryptographic SHA-256 evidence bundle customers and auditors can re-derive.',
    bullets: [
      '5 gates: build, digest, tests, pin, mutation-smoke',
      'Re-derivable SHA-256 bundle.json on every PR',
      'Free GitHub Action or hosted runners with retention',
    ],
    priceLabel: 'Free / $149 mo',
    priceDetail: 'Free in your CI · $149/repo/mo hosted App · $1,000 First Report',
    primaryCta: 'Explore Verify & Demo',
    primaryHref: '/verify',
    external: false,
    secondaryCta: 'Request First Report',
    secondaryHref: '/contact#topic-verify',
  },
  {
    slug: 'draws',
    category: 'Customer Promotions',
    name: 'ProtocolX',
    status: 'Live',
    audience: 'Brands, marketplaces & communities',
    headline: 'Provably fair raffles and giveaways',
    summary:
      'Run ticketed promotions and giveaways where Sui mainnet randomness picks the winner. Participants audit every draw themselves — eliminating rigged-outcome disputes.',
    bullets: [
      'On-chain ticket lock and settlement via Sui randomness',
      'Public audit trail for every participant',
      '5+ competitions settled on mainnet',
    ],
    priceLabel: '2.9% per draw',
    priceDetail: 'All-in fee locked at creation; you keep 97.1% of ticket sales',
    primaryCta: 'Launch a Draw',
    primaryHref: 'https://protocolx.io',
    external: true,
    secondaryCta: 'View contract proof',
    secondaryHref: '/on-chain',
  },
  {
    slug: 'weir',
    category: 'Accounts & Payouts',
    name: 'Weir',
    status: 'Live',
    audience: 'Creators, platforms & AI agents',
    headline: 'Direct SUI payouts & agent-safe accounts',
    summary:
      'One login for people and automated software. Creators earn from posts or withdrawable supporter staking yield, while software holds policy-bounded accounts without touching your main treasury.',
    bullets: [
      'Supporters park withdrawable SUI; 95% of yield goes to creators',
      'Google or Sui wallet sign-in with zero email friction',
      'Agent-ready via portal, read-only MCP & machine manifest',
    ],
    priceLabel: 'Free / 5% yield fee',
    priceDetail: 'Free creator account · 5% fee on staking yield only (0% on deposits)',
    primaryCta: 'See How Weir Works',
    primaryHref: '/weir',
    external: false,
    secondaryCta: 'Create Free Account',
    secondaryHref: 'https://weir.social/join',
  },
];

export const PLATFORM_PRODUCTS: Product[] = [
  {
    slug: 'machines',
    category: 'Managed Compute',
    name: 'GridFrames',
    status: 'Live',
    audience: 'Product teams & autonomous software',
    headline: 'Zero-ops servers provisioned on demand',
    summary:
      'Rent pre-configured machines by the plan and deploy apps, databases, or agent services the same day — funded via SUI credits with no DevOps hire.',
    bullets: [
      'Ready-to-run instances billed by the plan',
      'Credit-funded via SUI — no card bottleneck',
      'Programmatic provisioning for autonomous agents',
    ],
    priceLabel: 'Pay by plan',
    priceDetail: 'SUI credit top-ups · self-serve provisioning',
    primaryCta: 'Provision a Machine',
    primaryHref: 'https://gridframes.app',
    external: true,
    secondaryCta: 'Custom infra inquiry',
    secondaryHref: '/contact#topic-sales',
  },
  {
    slug: 'hivex',
    category: 'Agent Control Plane',
    name: 'Hivex',
    status: 'Open Source',
    audience: 'Founders & operators running AI fleets',
    headline: 'One-human control plane for agent companies',
    summary:
      'Single loopback Go binary combining an embedded React Office UI, provider-neutral inference router, T0–T3 Gridframe approval gates, and 8 append-only audit ledgers.',
    bullets: [
      'Loopback-only security (127.0.0.1:7891) & single binary deploy',
      'T0–T3 human approval gates & cost/token metering',
      'Supports Claude Code, Codex, Opencode & local HTTP runtimes',
    ],
    priceLabel: 'MIT Open Source',
    priceDetail: 'Free open source · enterprise deployment & support available',
    primaryCta: 'View Hivex on GitHub',
    primaryHref: 'https://github.com/Northlatch-Labs-LLC/hivex',
    external: true,
    secondaryCta: 'Request enterprise setup',
    secondaryHref: '/contact#topic-hivex',
  },
  {
    slug: 'kestrel-surgical',
    category: 'Healthcare AI (Local)',
    name: 'Kestrel Surgical',
    status: 'Design Pilot',
    audience: 'Surgeons & clinical practices',
    headline: 'Local-only operative notes that never leave your Mac',
    summary:
      'Dictation-first operative note drafting, CPT modifier suggestions, and bilingual patient instructions across 50 built-in procedures — AES-GCM Keychain-sealed with zero cloud upload.',
    bullets: [
      '100% on-device speech & drafting; refuses rather than invents details',
      'AES-GCM Keychain encryption & hash-chained export audit trail',
      'Free design-partner pilot with founding-customer terms',
    ],
    priceLabel: 'Free Pilot',
    priceDetail: 'Design-partner practices · macOS Apple Silicon & Intel',
    primaryCta: 'Inspect Pilot Spec',
    primaryHref: 'https://github.com/0xda7/kestrel-surgical-site',
    external: true,
    secondaryCta: 'Join pilot program',
    secondaryHref: '/contact#topic-kestrel',
  },
  {
    slug: 'move-skills',
    category: 'Developer Security',
    name: 'Sui Move Security Skills',
    status: 'Open Source',
    audience: 'Sui Move developers & AI coding agents',
    headline: '9 Sui-native vulnerability detectors for AI agents',
    summary:
      'Actionable security skills for Claude Code and agentskills.io clients covering real Sui Move failure classes: checked_shlw overflow, shared-object access control, hot-potato leaks, and upgrade cap discipline.',
    bullets: [
      'Purpose-built for Sui Move (no false EVM reentrancy theatre)',
      'Covers Cetus-class arithmetic shifts, capability leaks & OTWs',
      'Published under CC BY-SA 4.0',
    ],
    priceLabel: 'Free / CC BY-SA 4.0',
    priceDetail: 'Open standard for Claude Code & agentskills.io',
    primaryCta: 'Get Skills on GitHub',
    primaryHref: 'https://github.com/Northlatch-Labs-LLC/sui-move-security-skills',
    external: true,
    secondaryCta: 'Pair with Verify CI',
    secondaryHref: '/verify',
  },
];

export interface SolutionMatch {
  id: string;
  tabLabel: string;
  goal: string;
  recommended: string;
  badge: string;
  problem: string;
  solution: string;
  pricing: string;
  timeToLive: string;
  highlights: string[];
  primaryLabel: string;
  primaryHref: string;
  primaryExternal: boolean;
  secondaryLabel: string;
  secondaryHref: string;
}

export const SOLUTION_MATCHES: SolutionMatch[] = [
  {
    id: 'ai-teams',
    tabLabel: 'AI Teams (Synappse)',
    goal: 'Turn AI into a collaborative, role-based team',
    recommended: 'Synappse',
    badge: 'Live SaaS & Self-Hosted',
    problem: 'Single-user chat threads lose institutional memory, lack role permissions, and cannot safely connect to internal tools or local devices.',
    solution: 'Synappse gives your team shared AI coworkers with distinct roles, shared memory, centrally governed plugins/MCP tools, and event-driven triggers.',
    pricing: '$0 Free · $25/mo Pro · $25/seat/mo Team',
    timeToLive: 'Under 3 minutes',
    highlights: [
      'Humans, shared AI actors, and remote agents collaborate in one thread',
      'Explicit session approval & audit trail for browser, DB, and intranet access',
      'Start in the cloud at synappse.work or self-host via GitHub',
    ],
    primaryLabel: 'Start Free on Synappse',
    primaryHref: 'https://synappse.work',
    primaryExternal: true,
    secondaryLabel: 'Ask About Team / Self-Hosted',
    secondaryHref: '/contact#topic-synappse',
  },
  {
    id: 'engineering',
    tabLabel: 'AI Engineering (Xlaunch)',
    goal: 'Ship code and automate workflows with autonomous agents',
    recommended: 'Xlaunch + Hivex',
    badge: 'Live Platform',
    problem: 'Prompting raw LLMs for multi-file engineering or operations tasks breaks without shell access, test loops, failover routing, and human supervision.',
    solution: 'Xlaunch pairs a 21-tool autonomous engineering harness and live shared browser workbench with a 44-provider / 111-model gateway (plus Hivex for local fleet governance).',
    pricing: 'Free starter tier · metered usage (card or SUI)',
    timeToLive: 'Same-day setup',
    highlights: [
      '21 tools, persistent shell, LSP code intelligence & replayable sessions',
      'Single OpenAI/Anthropic-compatible gateway across 44 model providers',
      'Optional Hivex loopback control plane with T0–T3 approval gates',
    ],
    primaryLabel: 'Explore Xlaunch Platform',
    primaryHref: 'https://xlaunch.work',
    primaryExternal: true,
    secondaryLabel: 'Scope Custom Agent Fleet',
    secondaryHref: '/contact#topic-xlaunch',
  },
  {
    id: 'local-ai',
    tabLabel: 'Local AI (Kestrel)',
    goal: 'Run private LLMs, speech & clinical notes offline on Mac',
    recommended: 'Kestrel AI Engine & Kestrel Surgical',
    badge: 'macOS Native · Local',
    problem: 'Cloud AI APIs send sensitive documents off-device, rack up per-token bills, and most local Mac tools fail or crawl on Intel Macs with AMD GPUs.',
    solution: 'Kestrel delivers hardware-accelerated local LLMs (~61 t/s on AMD dGPUs), Whisper dictation, and image generation completely offline — plus Kestrel Surgical for local operative notes.',
    pricing: 'GPL-3.0 Open Source · Commercial Dual-License / Free Surgical Pilot',
    timeToLive: 'Download DMG or build in minutes',
    highlights: [
      'Zero data leaves the machine — no cloud accounts or token meters',
      'Built-in MCP tool use, Whisper subtitles & stable-diffusion.cpp studio',
      'Commercial dual-licensing, custom builds & Kestrel Surgical pilot available',
    ],
    primaryLabel: 'Get Kestrel on GitHub',
    primaryHref: 'https://github.com/0xda7/kestrel',
    primaryExternal: true,
    secondaryLabel: 'Inquire on Licensing / Pilot',
    secondaryHref: '/contact#topic-kestrel',
  },
  {
    id: 'security',
    tabLabel: 'Contract Security (Verify)',
    goal: 'Ship Sui Move contracts with audit-grade CI proof',
    recommended: 'ProtocolX Verify + Move Security Skills',
    badge: 'GitHub Action & SaaS',
    problem: 'Passing unit tests leaves assertion gaps untested, and external audits cost thousands per cycle without covering every subsequent PR.',
    solution: 'Verify runs 5 automated gates (build, digest, tests, pin, mutation-smoke) on every PR and outputs a re-derivable SHA-256 evidence bundle.',
    pricing: 'Free Action · $149/repo/mo Hosted App · $1,000 First Report',
    timeToLive: '2 minutes via GitHub Action',
    highlights: [
      'Deletes assertions in mutation-smoke to prove your tests catch real bugs',
      'Produces a portable bundle.json auditors, exchanges, and partners can verify',
      'Includes 9 open-source Sui Move Security Skills for AI coding agents',
    ],
    primaryLabel: 'Try Live Bundle Verifier & Docs',
    primaryHref: '/verify',
    primaryExternal: false,
    secondaryLabel: 'Order a $1,000 First Report',
    secondaryHref: '/contact#topic-verify',
  },
  {
    id: 'promotions',
    tabLabel: 'Promotions & Payouts',
    goal: 'Run fair giveaways or direct SUI monetization & agent budgets',
    recommended: 'ProtocolX + Weir + GridFrames',
    badge: 'Live on Sui Mainnet',
    problem: 'Customers question giveaway fairness, platforms take steep payout cuts, and giving software raw keys or cards creates treasury risk.',
    solution: 'ProtocolX settles verifiable raffles with Sui randomness (2.9% fee), Weir provides direct creator/agent accounts (95% yield to creators), and GridFrames hosts the compute.',
    pricing: 'ProtocolX 2.9% · Weir Free / 5% yield · GridFrames plan credits',
    timeToLive: 'Under 5 minutes',
    highlights: [
      '5+ ProtocolX draws settled publicly on Sui mainnet',
      'Weir accounts support Google/wallet login & policy-gated agent keys',
      'Pair with GridFrames so software provisions and pays its own hosting',
    ],
    primaryLabel: 'Launch a Draw on ProtocolX',
    primaryHref: 'https://protocolx.io',
    primaryExternal: true,
    secondaryLabel: 'Explore Weir Platform',
    secondaryHref: '/weir',
  },
  {
    id: 'custom',
    tabLabel: 'Custom Engineering',
    goal: 'Commission a bespoke AI system, runtime, or on-chain solution',
    recommended: 'Northlatch Custom Build',
    badge: '1-Day Scoping',
    problem: 'Off-the-shelf SaaS rarely fits specialized security rules, local hardware constraints, or multi-agent operational pipelines.',
    solution: 'Northlatch Labs designs, builds, and deploys bespoke systems across our full stack — from private Synappse/Hivex deployments to custom Kestrel licensing and Sui protocols.',
    pricing: 'Fixed-scope proposal delivered within 1 business day',
    timeToLive: 'Scoped in 24 hours',
    highlights: [
      'Direct communication with the engineering operator — no middlemen',
      'Honest scoping: if an off-the-shelf product solves it, we tell you',
      'Backed by verifiable contracts, automated tests, and full documentation',
    ],
    primaryLabel: 'Request a Scoped Proposal',
    primaryHref: '/contact#topic-sales',
    primaryExternal: false,
    secondaryLabel: 'Review Onboarding Process',
    secondaryHref: '/start',
  },
];

export const ALSO = [
  {
    name: 'SuiNS Brand Names',
    live: 'LIVE',
    external: null,
    text: 'Human-readable .sui brand addresses in one transaction — $10 first year (plus standard SuiNS renewal schedule).',
    href: '/more',
  },
  {
    name: 'Weir MCP & Agent SDK',
    live: 'LIVE',
    external: 'https://github.com/Northlatch-Labs-LLC/weir-protocol',
    text: 'Open MCP server (@projectx-social/mcp) and Go citizen harnesses (labs, labs-sibling) on GitHub.',
    href: null,
  },
];

export const IN_LAB = [
  {
    name: 'CTF Security Range',
    live: 'BETA',
    text: 'Hands-on Sui Move exploit training with 8 real-world challenges on retired mainnet deployments.',
    href: '/more',
  },
  {
    name: 'Autonomous Work Market',
    live: 'IN BUILD',
    text: 'Commission vetted AI workers for defined tasks and settle payment strictly on verified delivery.',
    href: '/more',
  },
];

export const ONBOARDING_PATHS = [
  {
    step: '01',
    track: 'Self-Serve SaaS & Open Source',
    title: 'Start immediately without talking to sales',
    time: '3–5 minutes',
    description:
      'Best for adopting Synappse teams, Xlaunch agents, Kestrel local AI, ProtocolX draws, Weir accounts, or the free Verify GitHub Action.',
    steps: [
      'Launch Synappse, Xlaunch, ProtocolX, GridFrames, or Weir online — or download Kestrel / Hivex from GitHub.',
      'Start on free tiers or open-source licenses with transparent upgrade paths.',
      'Deploy to production immediately with published per-seat, per-repo, or flat draw pricing.',
    ],
    ctaLabel: 'Follow the Onboarding Guide',
    ctaHref: '/start',
  },
  {
    step: '02',
    track: 'Guided Launch & Pilots',
    title: 'Start with a $1,000 Verify Report or Design Pilot',
    time: 'Turnkey delivery',
    description:
      'Best for Move security leads wanting a First Report, or surgical practices joining the Kestrel Surgical local-AI pilot.',
    steps: [
      'Share your Sui Move repository scope or practice workflow via our contact form.',
      'Our team runs the 5-gate verification suite or provisions a 10-minute Kestrel Surgical walkthrough.',
      'Receive signed SHA-256 evidence bundles or a local, Keychain-encrypted pilot installation.',
    ],
    ctaLabel: 'Request First Report / Pilot',
    ctaHref: '/contact#topic-verify',
  },
  {
    step: '03',
    track: 'Enterprise & Custom Builds',
    title: 'Commercial licensing, self-hosting & custom systems',
    time: 'Proposal in 1 business day',
    description:
      'Best for organizations needing Kestrel dual-licensing, private Synappse/Hivex/Gateway deployments, or custom AI & Sui engineering.',
    steps: [
      'Describe your business objective and constraints in plain English (no formal spec required).',
      'Receive fixed scope, transparent pricing, and delivery milestones within 1 business day.',
      'Ship with verifiable contracts, automated tests, and full operational handoff.',
    ],
    ctaLabel: 'Talk to Northlatch Labs',
    ctaHref: '/contact#topic-sales',
  },
];

export const FAQS = [
  {
    q: 'What does Northlatch Labs do as a company?',
    a: 'Northlatch Labs LLC builds commercial AI workforce software, local inference engines, and verifiable Web3/security infrastructure. Our portfolio spans team AI collaboration (Synappse), autonomous engineering (Xlaunch), macOS local AI (Kestrel), agent fleet governance (Hivex), zero-ops hosting (GridFrames), smart-contract CI verification (ProtocolX Verify), provably fair promotions (ProtocolX), and programmable payout accounts (Weir).',
  },
  {
    q: 'How can we become a customer today?',
    a: 'You have three paths: (1) Start self-serve in minutes on Synappse ($0 free tier), Xlaunch, ProtocolX, Weir, or GridFrames, or download Kestrel and Hivex from GitHub; (2) Book a turnkey $1,000 ProtocolX Verify First Report or join the free Kestrel Surgical pilot; or (3) Contact us for Kestrel commercial dual-licensing, private deployments, or bespoke engineering scoped within one business day.',
  },
  {
    q: 'Do we need blockchain expertise to use your AI or Web3 products?',
    a: 'No. Synappse, Xlaunch, Kestrel, and Hivex require zero blockchain knowledge and accept standard SaaS billing or run 100% locally/open-source. Even on Sui-backed products like Weir and ProtocolX, users can sign in with Google and standard CI tools like GitHub Actions.',
  },
  {
    q: 'How can our engineering or security team verify your software before buying?',
    a: 'Every major component has inspectable public proof: Kestrel, Hivex, Synappse, ProtocolX Verify, Sui Move Security Skills, and Xlaunch Gateway are published on GitHub (under Northlatch-Labs-LLC and 0xda7), our Sui mainnet package addresses resolve publicly on our Proof page (/on-chain), and you can test our SHA-256 evidence bundle verifier directly in your browser on /verify.',
  },
];
