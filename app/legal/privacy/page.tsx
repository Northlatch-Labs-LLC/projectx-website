// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { LegalNav } from '@/components/layout/LegalNav';
import { LegalArt } from '@/components/ui/PageArt';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Privacy Policy for projectxprotocol.dev, the documentation site published by Northlatch Labs LLC.',
};

export default function LegalPrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lead="Effective 30 August 2026. This policy covers the documentation site projectxprotocol.dev only."
        art={<LegalArt className="w-full" />}
      />

      {/* WHY THIS SECTION MOVED, 30 August 2026.
          Until this date the policy below said the Site "does not collect names, emails or wallet
          addresses unless you send us one by email". That stopped being true the moment the
          announcement capture shipped on 2026-08-30: components/ui/NotifySignup.tsx renders on the
          home page (components/home/CtaBand.tsx) and on /verification, and posts to
          app/api/notify/route.ts, which writes the address to a Brevo contact list. A policy that
          denies a collection the site is running is the one defect a regulator can screenshot, so
          section 1 now describes that route field by field, from the code.

          THE RULE THIS ESTABLISHES: the capture and this policy move together. If
          app/api/notify/route.ts changes what it stores, where it sends it, or the consent state it
          writes, section 1, section 2 (basis), section 3 (processors) and section 5 (retention)
          change in the same commit — not the next one. Adding a second capture point anywhere on
          the Site is the same obligation.

          Written strictly from the code as it stands: email, source page and timestamp, consent
          recorded as `pending-doi`, nothing mailed before a double opt-in. Nothing here describes a
          practice the estate does not have. */}

      <Section width="prose">
        <LegalNav current="/legal/privacy" />

        <div className="prose-px">
          <p>
            <strong>Effective date:</strong> 30 August 2026
            <br />
            <strong>Controller:</strong> Northlatch Labs LLC, a Wyoming limited liability company
            (Wyoming Filing ID 2026-002064040), 5830 E 2nd St, Ste 7000 #38326, Casper, Wyoming
            82609, United States
            <br />
            <strong>Privacy contact:</strong>{' '}
            <a href="mailto:privacy@projectxprotocol.dev">privacy@projectxprotocol.dev</a>
          </p>

          <p>
            This policy covers projectxprotocol.dev (the &ldquo;Site&rdquo;) only. Weir, the Prize
            Vault and the Draw service have their own privacy policies on their own domains.
          </p>

          <h2>1. What we collect</h2>
          <p>
            The Site has no accounts and does not connect to wallets. It collects no names and no
            wallet addresses. It asks you for one piece of personal data and only one: an email
            address, and only if you choose to type it into the announcement form.
          </p>
          <p>
            <strong>The announcement list.</strong> The form appears in two places — the home page
            and <a href="/verification">/verification</a>. Submitting it sends your address to an
            endpoint on this Site, which records it in a contact list we hold with{' '}
            <strong>Brevo</strong> (Sendinblue SAS, France). What is stored is your email address,
            which of the two pages you submitted it from, the time you submitted it, and a consent
            flag set to <em>pending</em>. Nothing else — no name, no IP address, no wallet address
            is attached to it.
          </p>
          <p>
            Your address stays in that pending state until you confirm it. The only message that can
            reach you before you confirm is a single double opt-in email asking you to; if you do
            not answer it, nothing further is ever sent. Every message we do send carries a
            one-click unsubscribe link, and unsubscribing or emailing the address in section 10
            removes you from the list. We use the list for announcements about what ships. We do not
            use it for anything else, and we do not pass it to anyone other than Brevo, who process
            it on our instructions.
          </p>
          <p>
            We also process: <strong>technical data</strong> — IP address, approximate location
            derived from it, browser and device type, referring page, pages viewed, timestamps —
            collected by our hosting and network providers (Vercel, Cloudflare) and by
            privacy-preserving analytics that does not use cookies and does not track you across
            sites; and <strong>correspondence</strong> — anything you send to our email addresses.
          </p>
          <p>
            We do not use advertising cookies, do not sell personal data, and do not share it for
            cross-context behavioural advertising.
          </p>

          <h2>2. Why, and on what basis</h2>
          <p>
            Operating and securing the Site, preventing abuse, and understanding aggregate usage:
            legitimate interests (Art. 6(1)(f) GDPR). Sending you the announcements you asked for:
            your consent (Art. 6(1)(a) GDPR), given by submitting the form and confirmed by the
            double opt-in, and withdrawable at any time without affecting anything sent before you
            withdrew it. Responding to your messages: legitimate interests and, where relevant,
            contract. Complying with law: legal obligation.
          </p>

          <h2>3. Sharing</h2>
          <p>
            Our infrastructure providers (Vercel, Cloudflare, analytics provider) and our email
            provider (Brevo — Sendinblue SAS, France) process data on our instructions under
            data-processing agreements. We do not sell the announcement list, rent it, or share it
            with anyone else. We disclose data to authorities where
            legally required. If the Site or the ProjectX intellectual property is transferred to a
            successor entity, correspondence and logs may transfer with it under this policy.
          </p>

          <h2>4. International transfers</h2>
          <p>
            Northlatch is a US company. Data may be processed in the United States. For EU/UK
            personal data we rely on Standard Contractual Clauses and the UK Addendum with our
            providers, or an adequacy decision where one applies.
          </p>

          <h2>5. Retention</h2>
          <p>
            Server and security logs: 90 days. Aggregated analytics: 14 months. Correspondence: 3
            years. Announcement list: until you unsubscribe or ask us to remove you, after which the
            address is deleted from the list; an address left in the pending state without
            confirmation is deleted after 12 months.
          </p>

          <h2>6. Your rights</h2>
          <p>
            Depending on where you live you may have rights to access, correct, delete, restrict,
            port, and object, and to complain to a supervisory authority. Email{' '}
            <a href="mailto:privacy@projectxprotocol.dev">privacy@projectxprotocol.dev</a>. We
            respond within 30 days (45 for California requests). California residents: we do not sell
            or share personal information as defined in the CCPA.
          </p>

          <h2>7. Cookies</h2>
          <p>Strictly necessary only (security, preference). No analytics or advertising cookies.</p>

          <h2>8. Children</h2>
          <p>The Site is not directed at anyone under 18.</p>

          <h2>9. Changes</h2>
          <p>
            We post changes here with a new effective date; material changes take effect 15 days
            after posting. <strong>30 August 2026:</strong> section 1 was rewritten to describe the
            announcement email list, which the previous version of this policy did not mention.
            Sections 2, 3 and 5 were updated to match. That change takes effect immediately, because
            it corrects a description of processing that was already happening rather than
            authorising anything new.
          </p>

          <h2>10. Contact</h2>
          <p>
            privacy@weir.social is not for this Site. Use{' '}
            <a href="mailto:privacy@projectxprotocol.dev">privacy@projectxprotocol.dev</a>. Postal:
            Northlatch Labs LLC, 5830 E 2nd St, Ste 7000 #38326, Casper, Wyoming 82609, United
            States. Northlatch has not appointed an EU/UK representative under Art. 27 GDPR.
          </p>
        </div>
      </Section>
    </>
  );
}
