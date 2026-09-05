// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Button } from '@/components/ui/Button';
import { RAFFLE_URL } from '@/lib/links';

/**
 * The organiser-facing block.
 *
 * CLAIMS CONSTRAINT: the copy here must claim no regulatory status of any kind. It states what
 * the mechanism does and leaves the conclusion to the reader's own counsel — "our software makes
 * you compliant" is both untrue and the kind of sentence that ends up in front of a regulator.
 */

const GUARANTEES = [
  {
    k: '01',
    t: 'The draw runs once.',
    d: 'A second attempt is rejected by the contract, not by a policy.',
  },
  {
    k: '02',
    t: 'Retrying is impossible.',
    d: 'Sui refuses any command placed after one that consumed randomness, so "draw, and cancel it if I lose" cannot execute.',
  },
  {
    k: '03',
    t: 'Free entries weigh what paid tickets weigh.',
    d: 'Enforced by the contract rather than promised by the promoter.',
  },
  {
    k: '04',
    t: 'Under the minimum, everyone is refunded.',
    d: 'The contract holds the money. Taking the float early is not available to you.',
  },
  {
    k: '05',
    t: 'You cannot stall a result.',
    d: 'After the draw time anyone may trigger it. An absent organiser delays a result; they cannot withhold one.',
  },
];

export function Organisers() {
  return (
    <section id="organisers" className="border-y border-white/[0.07] bg-white/[0.015]">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <p className="label">For competition organisers</p>
          <h2 className="text-section">Your competition. Your licence. Sui Mainnet Draw.</h2>
          <p className="lead">
            You already run the competition and own the customer. The part that costs you
            arguments — proving the draw was fair — is the part we replace. Entries are sealed the
            moment sales close, the winning number comes from Sui itself, and the result is
            re-derivable by anyone afterwards from a digest you can print in your own terms.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            {/*
              Points at /organiser/apply, not /organiser.

              /organiser is the creation console, and the contract behind it refuses any address
              that is not on the platform allowlist — `create_raffle_v2` aborts with
              `EOrganiserNotAllowed`. Worse, with no wallet connected that page renders the whole
              eighteen-field creation form and says only "Connect a wallet to create", so a
              stranger who follows this button fills the form in, connects, and is told
              "Admission required" by a page that had every chance to say so first.

              /organiser/apply is the one organiser route an unapproved wallet can actually
              complete. A button reading "Start a competition" has to land somewhere that accepts
              a start.
            */}
            <Button href={`${RAFFLE_URL}/organiser/apply`} variant="primary" showExternalIcon={false}>
              Start a competition
            </Button>
            <Button href={`${RAFFLE_URL}/rules`} variant="secondary" showExternalIcon={false}>
              Read the draw rules
            </Button>
          </div>
        </div>

        <ul className="grid content-start gap-0 border-t border-white/[0.08]">
          {GUARANTEES.map((g) => (
            <li
              key={g.k}
              className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/[0.08] py-5"
            >
              <span className="font-mono text-xs text-px-accent">{g.k}</span>
              <span>
                <b className="font-semibold text-white">{g.t}</b>{' '}
                <span className="text-px-muted">{g.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
