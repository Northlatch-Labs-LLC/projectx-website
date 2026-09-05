// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { NextResponse } from 'next/server';

/**
 * The site's one capture point: an email address, taken with consent, sent nowhere yet.
 *
 * # What this deliberately does NOT do
 *
 * It sends no mail of any kind, the double-opt-in confirmation included. It records the address
 * into the contact platform with `CONSENT` set to `pending-doi` — a state the campaign machinery
 * treats as unsendable — and nothing on this route can transition it. A list built this way is
 * slower to become sendable and impossible to have mailed anyone by accident.
 *
 * # Failure discipline
 *
 * Unconfigured (no BREVO_API_KEY in this deployment) is a calm, permanent 503 the form can
 * explain — never a silent success that swallows an address into nowhere. An upstream refusal is
 * a 424 worth retrying. A duplicate is its own calm outcome ("already on the list"), not an
 * error, because telling somebody their second signup failed reads as "you are not on it".
 */

export const dynamic = 'force-dynamic';

/** The pragmatic shape check. Real validation is the DOI confirmation, which only a real inbox passes. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Brevo list #3 — "ProtocolX — launch announcements (DOI only)", created 2026-08-30. */
const LIST_ID = 3;

/**
 * Which page an address came from, recorded as the `SOURCE` attribute on the contact.
 *
 * It is an allowlist rather than a passthrough because `SOURCE` is written into the contact
 * platform unvalidated otherwise, and a segment built on a free-text field is a segment that
 * silently splits the day a page ships with a typo in its prop.
 *
 * `install` is /verification/install — a reader asking for the GitHub App on a named repository,
 * which is a different intent from `verification` (a reader who wants to hear when it opens) and
 * a different one again from `home`. Same route, same list, same double-opt-in: a second endpoint
 * would be a second place for the consent discipline in the header to be got wrong, and this one
 * only ever needed one more allowed string.
 */
const SOURCES = new Set(['home', 'verification', 'install']);

export async function POST(request: Request) {
  const key = (process.env['BREVO_API_KEY'] ?? '').trim();
  if (key === '') {
    return NextResponse.json(
      { error: 'signups are not configured on this deployment' },
      { status: 503 },
    );
  }

  let body: { email?: unknown; source?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'that request was not JSON' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'that is not an email address' }, { status: 400 });
  }
  const source = typeof body.source === 'string' && SOURCES.has(body.source) ? body.source : 'home';

  let response: Response;
  try {
    response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': key, 'content-type': 'application/json' },
      body: JSON.stringify({
        email,
        listIds: [LIST_ID],
        updateEnabled: false,
        attributes: { CONSENT: 'pending-doi', SOURCE: source, SIGNED_UP_AT: new Date().toISOString() },
      }),
    });
  } catch {
    return NextResponse.json({ error: 'the list is unreachable right now' }, { status: 424 });
  }

  if (response.status === 201 || response.status === 204) {
    return NextResponse.json({ ok: true });
  }

  const detail = (await response.json().catch(() => ({}))) as { code?: string };
  if (detail.code === 'duplicate_parameter') {
    // A distinct, calm outcome — see the header.
    return NextResponse.json({ ok: true, already: true });
  }
  return NextResponse.json({ error: 'the list refused that address' }, { status: 424 });
}
