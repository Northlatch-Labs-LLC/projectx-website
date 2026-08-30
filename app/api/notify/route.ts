// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import { NextResponse } from 'next/server';

/**
 * The site's one capture point: an email address, taken with consent, sent nowhere yet.
 *
 * # What this deliberately does NOT do
 *
 * It does not send the visitor an email. The estate's standing law is that nothing mails a real
 * recipient without the operator's explicit go, and a double-opt-in confirmation is a real email.
 * So this route records the address into the contact platform with `CONSENT` set to
 * `pending-doi` — a state the campaign machinery treats as unsendable — and the confirmation
 * flow fires only when campaigns are activated by the operator's word. A list built this way is
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

const SOURCES = new Set(['home', 'verification']);

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
