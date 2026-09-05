// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { ReactNode } from 'react';

export function FaqList({
  items,
}: {
  items: { question: string; answer: ReactNode; id?: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          id={item.id}
          className="panel panel-hover group scroll-mt-28 p-0 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 p-6 text-left">
            <h3 className="font-display text-[1.0625rem] font-medium text-white sm:text-[1.15rem]">
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-px-muted transition-all duration-300 group-open:rotate-45 group-open:border-px-cyan/50 group-open:bg-px-cyan/10 group-open:text-px-cyan"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="border-t border-white/[0.06] px-6 pb-6 pt-5 text-[1.0625rem] leading-[1.68] text-px-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
