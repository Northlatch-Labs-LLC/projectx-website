// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import {
  AptosMark,
  CetusMark,
  MovementMark,
  ProjectXApiMark,
  SuiMark,
  SwitchboardMark,
  UsdcMark,
  ValidatorMark,
} from './BrandMarks';

const STACK = [
  { name: 'Sui', role: 'Settlement layer', href: 'https://sui.io', Mark: SuiMark },
  {
    name: 'Switchboard',
    role: 'Price oracle',
    href: 'https://switchboard.xyz',
    Mark: SwitchboardMark,
  },
  { name: 'Cetus', role: 'Prize conversion', href: 'https://www.cetus.zone', Mark: CetusMark },
  { name: 'USDC', role: 'Prizes paid in', href: 'https://www.circle.com/usdc', Mark: UsdcMark },
  {
    name: 'OKXEarn',
    role: 'Validator · 0% commission',
    href: 'https://suiscan.xyz/mainnet/validators',
    Mark: ValidatorMark,
  },
  {
    name: 'ProjectX API',
    role: 'Protocol data · ours',
    href: '/builders#api',
    Mark: ProjectXApiMark,
  },
] as const;

const NEXT_NETWORKS = [
  {
    name: 'Aptos',
    Mark: AptosMark,
    note: 'Move VM. The pool, the stake ladder and the draw port across without a rewrite.',
    stack: [
      { name: 'Switchboard', role: 'Oracle', confirmed: true },
      { name: 'USDC', role: 'Prize coin', confirmed: true },
      { name: 'Venue', role: 'In selection', confirmed: false },
    ],
  },
  {
    name: 'Movement',
    Mark: MovementMark,
    note: 'Move execution with its own settlement and liquidity landscape.',
    stack: [
      { name: 'Oracle', role: 'In selection', confirmed: false },
      { name: 'USDC', role: 'Prize coin', confirmed: true },
      { name: 'Venue', role: 'In selection', confirmed: false },
    ],
  },
] as const;

export function StackStrip({
  className = '',
  showRoadmap = true,
}: {
  className?: string;
  showRoadmap?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-12 ${className}`}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="hairline flex-1" />
          <span className="label whitespace-nowrap">Built on</span>
          <span aria-hidden="true" className="hairline flex-1" />
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STACK.map(({ name, role, href, Mark }) => {
            const internal = href.startsWith('/');
            return (
            <li key={name}>
              <a
                href={href}
                target={internal ? undefined : '_blank'}
                rel={internal ? undefined : 'noreferrer'}
                className="ring-gradient group flex h-full items-center gap-3 rounded-2xl bg-white/[0.025] px-4 py-4 transition-all duration-300 ease-[var(--ease-expo)] hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-neon"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-black/40 transition-transform duration-500 group-hover:scale-110">
                  <Mark className="h-6 w-6" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-display text-[0.9375rem] font-medium text-px-text">
                    {name}
                  </span>
                  <span className="truncate text-xs text-px-faint">{role}</span>
                </span>
              </a>
            </li>
            );
          })}
        </ul>
      </div>

      {showRoadmap ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="hairline flex-1" />
            <span className="label whitespace-nowrap">Shipping next</span>
            <span aria-hidden="true" className="hairline flex-1" />
          </div>

          <ul className="grid gap-3 md:grid-cols-2">
            {NEXT_NETWORKS.map(({ name, Mark, note, stack }) => (
              <li
                key={name}
                className="ring-gradient flex flex-col gap-4 rounded-2xl bg-white/[0.02] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-black/40">
                    <Mark className="h-6 w-6" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-[0.9375rem] font-medium text-px-text">
                      {name}
                    </span>
                    <span className="text-xs text-px-cyan">Vault in development</span>
                  </span>
                </div>

                <p className="text-[1rem] leading-[1.65] text-px-muted">{note}</p>

                <ul className="flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
                  {stack.map((item) => (
                    <li
                      key={item.name}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs ${
                        item.confirmed
                          ? 'border-px-cyan/25 bg-px-cyan/[0.07] text-px-text'
                          : 'border-white/[0.08] bg-white/[0.02] text-px-faint'
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="ml-1.5 opacity-70">{item.role}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="text-[0.8125rem] leading-[1.55] text-px-faint">
            Roadmap, not a commitment. No yield or prize figure is projected.
          </p>
        </div>
      ) : null}
    </div>
  );
}
