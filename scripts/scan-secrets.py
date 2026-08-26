#!/usr/bin/env python3
"""Block a commit that would publish a secret.

Run standalone, or as .git/hooks/pre-commit. Exits non-zero if anything is found.

**Never prints a secret.** Findings are identified by a truncated SHA-256 so that two
findings can be told apart and matched against a source, without the value reaching a
terminal, a log, or a screen recording.

Two independent checks, because neither alone is sufficient:

  1. Shape  — regexes for credentials that look like credentials wherever they appear.
  2. Identity — exact containment of values read from the live .env files. This is the one
     that matters: it catches a real key copied into a comment, a README, or a test.

Only variables whose NAME marks them secret are compared by identity. Comparing every env
value produces noise that trains you to ignore the scanner: package ids, pool ids, RPC and
explorer URLs are public on-chain data and *belong* in source. On 5 Aug 2026 the broad
version produced 74 findings, of which 74 were public config and 0 were secrets.
"""
import hashlib
import re
import subprocess
import sys

SECRET_NAME = re.compile(r'PRIVATE_KEY$|PASSWORD|SECRET|API_KEY$|DATABASE_URL$|TOKEN$')

LIVE_SOURCES = [
    '.env.local',
]

SHAPES = [
    ('sui private key', re.compile(r'suiprivkey[a-z0-9]{40,}')),
    ('PEM private key', re.compile(r'-----BEGIN [A-Z ]*PRIVATE KEY-----')),
    ('AWS access key',  re.compile(r'AKIA[0-9A-Z]{16}')),
]

ENV_SHAPED = re.compile(r'(^|/)\.env($|\.)')

def h(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()[:12]

def staged_paths() -> list:
    out = subprocess.run(['git', 'diff', '--cached', '--name-only', '--diff-filter=ACMR'],
                         capture_output=True, text=True).stdout
    return [p for p in out.split('\n') if p.strip()]

def staged_blob(path: str) -> str:
    r = subprocess.run(['git', 'show', ':' + path],
                       capture_output=True, text=True, errors='ignore')
    return r.stdout if r.returncode == 0 else ''

def live_secrets() -> dict:
    """{value: 'FILE:VARNAME'} for secret-named variables only."""
    found = {}
    for src in LIVE_SOURCES:
        try:
            text = open(src).read()
        except OSError:
            continue
        for name, raw in re.findall(r'^([A-Z_][A-Z0-9_]*)=(.*)$', text, re.M):
            value = raw.strip().strip('"').strip("'")
            if len(value) >= 12 and SECRET_NAME.search(name):
                found[value] = '%s:%s' % (src, name)
    return found

def main() -> int:
    paths = staged_paths()
    if not paths:
        print('scan-secrets: nothing staged')
        return 0

    secrets = live_secrets()
    findings = []

    for path in paths:
        if ENV_SHAPED.search(path):
            findings.append((path, 'env-shaped file staged', '-'))
            continue
        blob = staged_blob(path)
        if not blob:
            continue
        for label, rx in SHAPES:
            for match in rx.findall(blob):
                findings.append((path, label, h(match)))
        for value, origin in secrets.items():
            if value in blob:
                findings.append((path, 'LIVE SECRET from ' + origin, h(value)))

    print('scan-secrets: %d staged file(s), %d live secret(s) compared'
          % (len(paths), len(secrets)))

    if not findings:
        print('scan-secrets: CLEAN')
        return 0

    print('scan-secrets: BLOCKED — %d finding(s)\n' % len(findings))
    for path, label, digest in findings:
        print('  %s\n      %s  (sha256:%s)' % (path, label, digest))
    print('\nNothing was committed. Remove the value or add the path to .gitignore.')
    return 1

if __name__ == '__main__':
    sys.exit(main())
