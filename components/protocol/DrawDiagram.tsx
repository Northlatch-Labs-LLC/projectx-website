// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
export function DrawDiagram() {
  const slices = [
    { label: 'A', weight: 34 },
    { label: 'B', weight: 21 },
    { label: 'C', weight: 17 },
    { label: 'D', weight: 12 },
    { label: 'E', weight: 9 },
    { label: 'rest', weight: 7 },
  ];

  const pick = 46;

  let offset = 0;

  return (
    <div className="panel p-6 md:p-7">
      <span className="label">Selection · weighted by stake</span>

      <div className="relative mt-6">
        <div className="flex h-12 w-full overflow-hidden rounded-xl border border-white/[0.08]">
          {slices.map((slice, index) => {
            const start = offset;
            offset += slice.weight;
            const winning = pick >= start && pick < offset;
            return (
              <span
                key={slice.label}
                style={{ width: `${slice.weight}%` }}
                className={`flex items-center justify-center border-r border-px-bg/60 text-meta font-medium last:border-r-0 ${
 winning
                    ? 'bg-px-prize/25 text-px-prize'
                    : index % 2 === 0
                      ? 'bg-px-accent/12 text-px-muted'
                      : 'bg-px-accent/[0.07] text-px-muted'
                }`}
              >
                {slice.label}
              </span>
            );
          })}
        </div>

        <div className="absolute -top-3 h-[4.5rem]" style={{ left: `${pick}%` }}>
          <span className="block h-full w-px bg-px-gold" />
          <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-px-gold" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-meta text-px-muted">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-px-gold" />
          random point
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-px-prize" />
          winning slice
        </span>
        <span className="font-mono text-meta text-px-faint">O(log n) lookup</span>
      </div>

      <p className="mt-6 text-body text-px-muted">
        Randomness comes from Sui&rsquo;s native on-chain source, consumed inside a
        non-public <code className="font-mono text-[0.85em] text-px-accent-200">entry</code>{' '}
        function so the drawn value cannot be read and acted on within the same transaction.
        Ineligible slots are resampled rather than skipped, which keeps the remaining
        distribution exactly proportional to principal.
      </p>
      <p className="mt-3 text-body text-px-muted">
        A deposit made in epoch <em>N</em> becomes eligible to win in epoch{' '}
        <em>N&nbsp;+&nbsp;2</em>. That waiting period is deliberate: without it, depositing
        immediately before a draw and withdrawing immediately after would be a way to buy a
        ticket without ever putting principal at work.
      </p>
    </div>
  );
}
