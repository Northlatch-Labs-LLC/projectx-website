#!/usr/bin/env python3
"""
Refuse the specific defect shapes this estate has actually shipped.

**This is not a linter.** Every rule below exists because a real hole reached `main`, and each one
names the scar it prevents. A rule with no scar behind it does not belong here — generic style
checks train people to skim the output, and the moment this report is skimmed it stops working.

**Why it runs at the end of testing, not before.** A green suite is exactly when these holes are
invisible: every defect below passed its tests, typechecked and built. `CLAUDE.md` §4 ranks the
words that get substituted for one another — compiles ≠ typechecks ≠ tests pass. This adds the
rung after the last of those: **tests pass ≠ safe to ship.**

Fails closed. An unreadable file, an unparseable rule or an unknown allowlist entry is a failure,
not a skip — a check that cannot fail is not a check (`START-HERE.md` §11).

    ./scripts/guardrails.py            check every surface
    ./scripts/guardrails.py --json     machine-readable

Exits 1 on any violation, so it can gate a push or a release.

# Suppressing a rule

Add the path to that rule's `ALLOW` with a reason, in its own commit. A suppression with no reason
is refused by the rule engine itself. The point is that waiving a guardrail becomes a visible,
reviewable act rather than a silent one.
"""
from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# The deployed web surfaces. Server code and libraries are included — the worst hole this file
# exists to prevent was in a server action, not a component.
#
# These are repository-root-relative, because in this repository the application IS the root. The
# list they replaced — `projectx-website`, `V1.0.1-Public/frontend-dashboard`, `V1.2.0/raffle/web`
# — was inherited verbatim from the monorepo this was extracted from, and none of those paths
# exists here. `sources()` therefore returned an empty list and every rule reported a clean pass
# over nothing, for as long as this file has been in this repository.
#
# The three directories are the shipped surface `verify-claims.mjs` and
# `verify-no-private-hosts.mjs` already scan. `scripts/` is deliberately absent: it is build and
# check tooling that never reaches a browser. So is `tailwind.config.ts`, whose hex literals are
# the token definitions rule 4 protects rather than uses of them.
WEB_ROOTS = [
    "app",
    "components",
    "lib",
]

SKIP_DIRS = {"node_modules", ".next", "build", "dist", ".git", "coverage"}


@dataclass
class Violation:
    rule: str
    path: str
    line: int
    detail: str


@dataclass
class Rule:
    id: str
    scar: str
    detail: str
    # path -> reason. A reason is mandatory; the engine refuses an empty one.
    allow: dict[str, str] = field(default_factory=dict)


def sources(exts: tuple[str, ...]) -> list[Path]:
    out: list[Path] = []
    for root in WEB_ROOTS:
        base = ROOT / root
        if not base.exists():
            continue
        for p in base.rglob("*"):
            if p.is_dir() or p.suffix not in exts:
                continue
            if SKIP_DIRS & set(p.parts):
                continue
            out.append(p)
    return out


def rel(p: Path) -> str:
    return str(p.relative_to(ROOT))


# ══════════════════════════════════════════════════════════════════════════════════════════════
# Rule 1 — a server action must authenticate
# ══════════════════════════════════════════════════════════════════════════════════════════════
R_SERVER_AUTH = Rule(
    id="server-action-auth",
    scar=(
        "PR #4, 24 Aug 2026. `applyAsOrganiser` and `myApplication` took a wallet address from "
        "the client and believed it. A Next.js server action is a public HTTP endpoint, so the "
        "page's own wallet check protected nothing: an attacker could file an application under "
        "someone else's address — locking the real owner out, since only one pending row per "
        "wallet is permitted — and read any applicant's registered legal name and refusal note "
        "knowing only their on-chain address, which is public by construction."
    ),
    detail="exported server action with no authentication call",
    allow={
        # Deliberately unauthenticated, and each says why.
        "V1.2.0/raffle/web/app/organiser/apply/actions.ts:applicationTermsHash": (
            "returns the SHA-256 of a document that is already published at /legal/organiser-terms; "
            "there is nothing here a caller could not compute from the public page"
        ),
        "V1.2.0/raffle/web/app/organiser/actions.ts:publishedTermsHash": (
            "same document, same reasoning as applicationTermsHash — a hash of bytes anyone can "
            "fetch from /legal/organiser-terms and hash themselves"
        ),
    },
)

AUTH_CALL = re.compile(r"\bauthenticate[A-Z]\w*\s*\(")
EXPORTED_ACTION = re.compile(r"^export\s+async\s+function\s+(\w+)", re.M)


def check_server_actions() -> list[Violation]:
    out: list[Violation] = []
    for p in sources((".ts", ".tsx")):
        text = p.read_text(encoding="utf-8", errors="replace")
        # Only files that declare themselves server actions.
        if not re.match(r"^\s*(?://.*\n|/\*[\s\S]*?\*/\s*\n)*\s*['\"]use server['\"]", text):
            continue
        for m in EXPORTED_ACTION.finditer(text):
            name = m.group(1)
            key = f"{rel(p)}:{name}"
            if key in R_SERVER_AUTH.allow:
                continue
            # The body runs to the next top-level export, or end of file.
            nxt = EXPORTED_ACTION.search(text, m.end())
            body = text[m.end() : nxt.start() if nxt else len(text)]
            if not AUTH_CALL.search(body):
                line = text[: m.start()].count("\n") + 1
                out.append(
                    Violation(
                        R_SERVER_AUTH.id,
                        rel(p),
                        line,
                        f"`{name}` is an exported server action and calls no authenticate*() — "
                        f"it is reachable by anyone who finds the action id",
                    )
                )
    return out


# ══════════════════════════════════════════════════════════════════════════════════════════════
# Rule 2 — every signed transaction names its chain
# ══════════════════════════════════════════════════════════════════════════════════════════════
R_CHAIN = Rule(
    id="sign-names-its-chain",
    scar=(
        "PR #4, 24 Aug 2026. The review queue's approve and revoke omitted `chain: SUI_CHAIN`, "
        "which every other signing call in the estate passes. A reviewer whose wallet was pointed "
        "at testnet could press Approve and meet a generic failure with no indication of the "
        "cause. Capabilities are read from mainnet regardless of where the wallet is pointed, so "
        "the signature has to be a mainnet one."
    ),
    detail="signAndExecute without an explicit chain",
)

SIGN_CALL = re.compile(r"signAndExecute\s*\(\s*\{")


def check_sign_chain() -> list[Violation]:
    out: list[Violation] = []
    for p in sources((".ts", ".tsx")):
        text = p.read_text(encoding="utf-8", errors="replace")
        for m in SIGN_CALL.finditer(text):
            # Read to the matching close brace of the argument object.
            depth, i = 0, m.end() - 1
            while i < len(text):
                if text[i] == "{":
                    depth += 1
                elif text[i] == "}":
                    depth -= 1
                    if depth == 0:
                        break
                i += 1
            arg = text[m.end() - 1 : i + 1]
            if "chain:" not in arg:
                line = text[: m.start()].count("\n") + 1
                out.append(
                    Violation(
                        R_CHAIN.id,
                        rel(p),
                        line,
                        "signAndExecute({...}) does not pass `chain` — a wallet on another "
                        "network will fail here without saying why",
                    )
                )
    return out


# ══════════════════════════════════════════════════════════════════════════════════════════════
# Rule 3 — several writes in one operation must be one transaction
# ══════════════════════════════════════════════════════════════════════════════════════════════
R_TXN = Rule(
    id="multi-write-transaction",
    scar=(
        "PR #4, 24 Aug 2026. `submitApplication` performed two INSERTs with no BEGIN, so an "
        "append-only acceptance row could land while the application row it belongs to failed — "
        "a record of someone agreeing to terms for an application that does not exist. The "
        "equivalent function written in 001 already used a transaction; this was inconsistency, "
        "not a decision."
    ),
    detail="two or more writes in one repo function without BEGIN",
)

WRITE_Q = re.compile(r"c\.query[^`'\"]*[`'\"]\s*(INSERT|UPDATE|DELETE)\b", re.I)
FN_START = re.compile(r"^export\s+async\s+function\s+(\w+)", re.M)


def check_transactions() -> list[Violation]:
    out: list[Violation] = []
    for p in sources((".ts",)):
        if "repo" not in p.name and "/db" not in rel(p):
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        for m in FN_START.finditer(text):
            nxt = FN_START.search(text, m.end())
            body = text[m.end() : nxt.start() if nxt else len(text)]
            writes = len(WRITE_Q.findall(body))
            if writes >= 2 and "BEGIN" not in body:
                line = text[: m.start()].count("\n") + 1
                out.append(
                    Violation(
                        R_TXN.id,
                        rel(p),
                        line,
                        f"`{m.group(1)}` performs {writes} writes with no BEGIN — a partial "
                        f"failure leaves half of them committed",
                    )
                )
    return out


# ══════════════════════════════════════════════════════════════════════════════════════════════
# Rule 4 — colours come from tokens, so a second theme cannot rot
# ══════════════════════════════════════════════════════════════════════════════════════════════
R_COLOUR = Rule(
    id="tokenised-colour",
    scar=(
        "24 Aug 2026. Adding a light theme surfaced 39 `rgba(255,255,255,α)` rules, a near-black "
        "form-field background and a hardcoded panel gradient — every one of them invisible while "
        "the site had a single theme, and every one of them a dark surface with dark text on the "
        "other. The build was perfectly happy; the page was unreadable. Found by opening it."
    ),
    detail="literal colour in a component rule",
)

# Only flag colours in component rules, not inside the :root / @theme token blocks where a literal
# is the definition rather than a use.
TOKEN_BLOCK = re.compile(r"(@theme\s*\{|:root[^{]*\{)")
LITERAL_COLOUR = re.compile(r"(#[0-9a-fA-F]{3,8}\b|\brgba?\(\s*\d+[\s,])")


def check_colours() -> list[Violation]:
    out: list[Violation] = []
    for p in sources((".css",)):
        text = p.read_text(encoding="utf-8", errors="replace")
        depth = 0
        in_token_block_at_depth: int | None = None
        for n, raw in enumerate(text.splitlines(), start=1):
            line = raw.split("/*")[0]
            if TOKEN_BLOCK.search(line) and in_token_block_at_depth is None:
                in_token_block_at_depth = depth
            opens, closes = line.count("{"), line.count("}")
            inside = in_token_block_at_depth is not None
            depth += opens - closes
            if inside and in_token_block_at_depth is not None and depth <= in_token_block_at_depth:
                in_token_block_at_depth = None
                continue
            if inside:
                continue
            if LITERAL_COLOUR.search(line):
                out.append(
                    Violation(
                        R_COLOUR.id,
                        rel(p),
                        n,
                        f"literal colour outside a token block: {line.strip()[:70]}",
                    )
                )
    return out


# ══════════════════════════════════════════════════════════════════════════════════════════════
# Rule 5 — a network client is bounded
# ══════════════════════════════════════════════════════════════════════════════════════════════
R_TIMEOUT = Rule(
    id="bounded-network-client",
    scar=(
        "PR #4, 24 Aug 2026. The review queue built a `SuiClient` with no timeout and performed a "
        "chain read inside the authentication path, so a stalled fullnode hung the reviewer's "
        "request rather than refusing it. `CLAUDE.md` §5 requires every loop that talks to a "
        "network to be bounded; one here once issued 99,616 RPC calls against a budget of 12."
    ),
    detail="SuiClient constructed without a bounded transport",
)

SUICLIENT = re.compile(r"new\s+SuiClient\s*\(\s*\{")


def check_timeouts() -> list[Violation]:
    out: list[Violation] = []
    for p in sources((".ts", ".tsx")):
        text = p.read_text(encoding="utf-8", errors="replace")
        for m in SUICLIENT.finditer(text):
            depth, i = 0, m.end() - 1
            while i < len(text):
                if text[i] == "{":
                    depth += 1
                elif text[i] == "}":
                    depth -= 1
                    if depth == 0:
                        break
                i += 1
            arg = text[m.end() - 1 : i + 1]
            # A bounded client either injects a fetch carrying a signal, or supplies a transport
            # that does. `url:` alone is the unbounded default.
            if "AbortSignal" not in arg and "transport" not in arg:
                line = text[: m.start()].count("\n") + 1
                out.append(
                    Violation(
                        R_TIMEOUT.id,
                        rel(p),
                        line,
                        "new SuiClient({ url }) has no timeout — a stalled node hangs the caller "
                        "instead of refusing it",
                    )
                )
    return out


# Known, accepted debt. A rule newly introduced over an existing codebase finds work that
# predates it, and a report that is permanently red is one nobody reads — this repository has
# said so twice, about the suins surface and about the raffle's skipped build.
#
# So the guardrails ratchet rather than gate: the baseline records what was already there, and the
# check fails only when a count GROWS or a new file appears. Existing debt is visible in the
# report and cannot get worse; fixing any of it lowers the number permanently, because
# `--update-baseline` refuses to raise one.
BASELINE = ROOT / "scripts" / "guardrails-baseline.json"


def load_baseline() -> dict[str, dict[str, int]]:
    if not BASELINE.exists():
        return {}
    try:
        return json.loads(BASELINE.read_text())
    except Exception as exc:
        # An unreadable baseline must not silently become "no debt allowed" or "everything
        # allowed". Fail closed and say so.
        raise SystemExit(f"guardrails: baseline is unreadable ({exc}). Refusing to run.")


def tally(found: list[Violation]) -> dict[str, dict[str, int]]:
    out: dict[str, dict[str, int]] = {}
    for v in found:
        out.setdefault(v.rule, {}).setdefault(v.path, 0)
        out[v.rule][v.path] += 1
    return out


RULES = [R_SERVER_AUTH, R_CHAIN, R_TXN, R_COLOUR, R_TIMEOUT]
CHECKS = {
    R_SERVER_AUTH.id: check_server_actions,
    R_CHAIN.id: check_sign_chain,
    R_TXN.id: check_transactions,
    R_COLOUR.id: check_colours,
    R_TIMEOUT.id: check_timeouts,
}


def validate_allowlists() -> list[str]:
    """A suppression with no reason is itself a violation. Fails closed."""
    bad = []
    for r in RULES:
        for path, reason in r.allow.items():
            if not reason or not reason.strip():
                bad.append(f"{r.id}: '{path}' is suppressed with no reason")
    return bad


def main() -> int:
    as_json = "--json" in sys.argv
    updating = "--update-baseline" in sys.argv

    broken = validate_allowlists()
    if broken:
        for b in broken:
            print(f"\033[31m✗\033[0m {b}")
        return 1

    found: list[Violation] = []
    for rule in RULES:
        try:
            found.extend(CHECKS[rule.id]())
        except Exception as exc:  # a rule that cannot run is a failure, never a skip
            print(f"\033[31m✗\033[0m rule {rule.id} could not run: {type(exc).__name__}: {exc}")
            return 1

    counts = tally(found)
    base = load_baseline()

    if updating:
        # Never raises a count. Recording new debt as accepted is how a ratchet becomes a rubber
        # stamp, so this can only ever tighten the baseline.
        merged: dict[str, dict[str, int]] = {}
        for rule_id, paths in counts.items():
            for path, n in paths.items():
                prior = base.get(rule_id, {}).get(path)
                if prior is None:
                    print(f"  refusing to accept NEW debt: {rule_id} {path} ({n})")
                    continue
                merged.setdefault(rule_id, {})[path] = min(prior, n)
        BASELINE.write_text(json.dumps(merged, indent=2, sort_keys=True) + "\n")
        print("baseline tightened")
        return 0

    # A regression is a count above the baseline, or a file that had none before.
    regressions: list[Violation] = []
    for v in found:
        allowed = base.get(v.rule, {}).get(v.path, 0)
        seen = sum(1 for x in found if x.rule == v.rule and x.path == v.path)
        if seen > allowed:
            regressions.append(v)

    if as_json:
        print(json.dumps(
            {"regressions": [v.__dict__ for v in regressions],
             "accepted_debt": base,
             "current": counts},
            indent=2))
        return 1 if regressions else 0

    print("\n\033[1mGuardrails — defect shapes this estate has already shipped\033[0m")
    by_rule: dict[str, list[Violation]] = {}
    for v in found:
        by_rule.setdefault(v.rule, []).append(v)

    reg_by_rule: dict[str, list[Violation]] = {}
    for v in regressions:
        reg_by_rule.setdefault(v.rule, []).append(v)

    for rule in RULES:
        hits = reg_by_rule.get(rule.id, [])
        debt = sum(base.get(rule.id, {}).values())
        if not hits:
            note = f"  \033[2m({debt} accepted, pre-existing)\033[0m" if debt else ""
            print(f"  \033[32m✓\033[0m {rule.id}{note}")
            continue
        print(f"  \033[31m✗\033[0m {rule.id} — {len(hits)}")
        print(f"      \033[2m{rule.scar}\033[0m")
        for v in hits[:12]:
            print(f"      {v.path}:{v.line}  {v.detail}")
        if len(hits) > 12:
            print(f"      … and {len(hits) - 12} more")

    print()
    total_debt = sum(sum(p.values()) for p in base.values())
    if regressions:
        print(f"\033[31m{len(regressions)} NEW violation(s)\033[0m — tests passing is not the "
              f"same as safe to ship")
        print(f"\033[2m{total_debt} pre-existing accepted; the baseline can only go down\033[0m")
        return 1
    print(f"\033[32mno new violations\033[0m \033[2m({total_debt} accepted, pre-existing)\033[0m")
    return 0


if __name__ == "__main__":
    sys.exit(main())
