// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { LegalNav } from '@/components/layout/LegalNav';
import { LegalArt } from '@/components/ui/PageArt';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Trademarks',
  description:
    'The Weir and ProjectX names and marks, and how they may and may not be used. Northlatch Labs LLC.',
};

export default function LegalTrademarksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Trademarks"
        lead="The Weir and ProjectX names are marks of Northlatch Labs LLC. Here is how they may, and may not, be used."
        art={<LegalArt className="w-full" />}
      />

      <Section width="prose">
        <LegalNav current="/legal/trademarks" />

        <div className="prose-px">
          <p>
            Weir, the Weir logo, ProjectX, ProjectX Protocol and ProjectX Vaults Protocol are names
            and marks of Northlatch Labs LLC, used in connection with software and services first
            offered in 2026. No trademark registration has been applied for as of the effective date
            of this page; rights are claimed at common law.
          </p>

          <p>
            Northlatch Labs LLC has no affiliation with any other product, token, exchange, trading
            platform or competition service using the name &ldquo;ProjectX&rdquo;, &ldquo;Project
            X&rdquo; or &ldquo;PRJX&rdquo;. Any such product is not ours.
          </p>

          <p>
            You may refer to our products by name in commentary, reviews and documentation. You may
            not use our names or logos in a way that suggests endorsement, sponsorship or
            affiliation, as part of a product name, or in a domain name or social-media handle.
            Requests: <a href="mailto:legal@projectxprotocol.dev">legal@projectxprotocol.dev</a>.
          </p>

          <p>Sui, Walrus, Seal, SuiNS and Move are marks of their respective owners.</p>
        </div>
      </Section>
    </>
  );
}
