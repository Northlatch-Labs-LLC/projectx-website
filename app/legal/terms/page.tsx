
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { LegalNav } from '@/components/layout/LegalNav';
import { LegalArt } from '@/components/ui/PageArt';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Terms of use',
  description:
    'Website Terms of Use for projectxprotocol.dev, published by Northlatch Labs LLC.',
};

export default function LegalTermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Website Terms of Use"
        lead="Effective 24 August 2026. Published by Northlatch Labs LLC, a Wyoming limited liability company."
        art={<LegalArt className="w-full" />}
      />

      <Section width="prose">
        <LegalNav current="/legal/terms" />

        <div className="prose-px">
          <p>
            <strong>Effective date:</strong> 24 August 2026
            <br />
            <strong>Publisher:</strong> Northlatch Labs LLC, a Wyoming limited liability company
            (Wyoming Filing ID 2026-002064040)
            <br />
            <strong>Address:</strong> 5830 E 2nd St, Ste 7000 #38326, Casper, Wyoming 82609,
            United States
            <br />
            <strong>Contact:</strong>{' '}
            <a href="mailto:legal@projectxprotocol.dev">legal@projectxprotocol.dev</a>
          </p>

          <p>
            These Terms govern your use of projectxprotocol.dev (the &ldquo;Site&rdquo;), published
            by Northlatch Labs LLC (&ldquo;Northlatch&rdquo;, &ldquo;we&rdquo;). By using the Site
            you agree to them.
          </p>

          <h2>1. What this Site is</h2>
          <p>
            The Site is documentation and information about the ProjectX protocol software and
            related products. It does not connect to a wallet, does not execute transactions, and
            does not hold funds. Products described on the Site are available at other domains, each
            under its own terms:
          </p>
          <ul>
            <li>Weir (weir.social) — operated by Northlatch Labs LLC under the Weir Terms of Service.</li>
            <li>
              Draws (protocolx.io) — draw software developed and licensed by Northlatch; each
              competition is run by its organiser under the organiser&rsquo;s own terms.
            </li>
            <li>
              Prize Vault — software developed and licensed by Northlatch. The vault contract
              remains live on Sui mainnet; its interface was retired on 25 August 2026 and it is
              not currently available at a domain.
            </li>
          </ul>

          <h2>2. Northlatch&rsquo;s role</h2>
          <p>
            Northlatch Labs LLC develops, owns and licenses the ProjectX protocol software and
            publishes this Site. Northlatch does not operate the prize vault, does not sponsor or run
            any prize draw or competition, does not take custody of any user funds, and is not a
            bank, exchange, broker, payment institution or investment adviser. Nothing on the Site is
            an offer, a solicitation, financial advice, or a representation that any product is
            lawful in any jurisdiction.
          </p>

          <h2>3. Accuracy</h2>
          <p>
            The Site describes experimental, unaudited software. Figures shown are read from public
            blockchains and may be delayed or cached; the chain is authoritative. Statements about
            what the software can or cannot do describe the code as deployed at the stated version
            and are not guarantees against defects in that code, in the Sui network, or in
            third-party infrastructure. Roadmap items are intentions, not commitments.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            The Site, its text and design, and the Weir and ProjectX names and logos are owned by
            Northlatch Labs LLC. Protocol source code is licensed under the licence stated in each
            repository. You may quote the Site for commentary with attribution. You may not use the
            Weir or ProjectX names to imply endorsement or affiliation. See{' '}
            <Link href="/legal/trademarks">/legal/trademarks</Link>.
          </p>

          <h2>5. Acceptable use</h2>
          <p>
            You may not use the Site to attack, scrape at volume, or interfere with the Site or its
            infrastructure, or to impersonate Northlatch.
          </p>

          <h2>6. Third-party links</h2>
          <p>
            The Site links to products and services that are not operated by Northlatch or that are
            governed by their own terms. Northlatch is not responsible for them.
          </p>

          <h2>7. Disclaimer and limitation of liability</h2>
          <p>
            THE SITE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. TO THE FULLEST
            EXTENT PERMITTED BY LAW, NORTHLATCH LABS LLC SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, DATA
            OR DIGITAL ASSETS, ARISING FROM YOUR USE OF THE SITE OR RELIANCE ON ITS CONTENT, AND ITS
            TOTAL LIABILITY SHALL NOT EXCEED ONE HUNDRED U.S. DOLLARS. Nothing in these Terms
            excludes liability that cannot be excluded by law; consumers in the EU and UK retain the
            mandatory protections of their country of residence.
          </p>

          <h2>8. Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of Wyoming, USA. Disputes shall be
            brought in the state or federal courts in Natrona County, Wyoming, except that EU and UK
            consumers may bring proceedings in the courts of their country of residence.
          </p>

          <h2>9. Changes</h2>
          <p>
            We may amend these Terms by posting a new version with a new effective date. Material
            changes take effect fifteen (15) days after posting.
          </p>

          <h2>10. Contact</h2>
          <p>
            Northlatch Labs LLC · 5830 E 2nd St, Ste 7000 #38326, Casper, Wyoming 82609, United
            States · <a href="mailto:legal@projectxprotocol.dev">legal@projectxprotocol.dev</a>
          </p>
        </div>
      </Section>
    </>
  );
}
