
export function LadderDiagram({ depth = 6 }: { depth?: number }) {
  const tranches = Array.from({ length: depth }, (_, index) => index);

  return (
    <div className="panel p-6 md:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <span className="label">Stake ladder · depth {depth}</span>
        <span className="font-mono text-xs text-px-faint">
          captures {Math.round((depth / (depth + 1)) * 1000) / 10}% of available yield
        </span>
      </div>

      <ul className="mt-6 flex flex-col gap-2.5">
        {tranches.map((index) => {
          const maturity = ((index + 1) / depth) * 100;
          const mature = index === depth - 1;
          return (
            <li key={index} className="flex items-center gap-3">
              <span className="w-20 shrink-0 font-mono text-[0.8125rem] text-px-faint">
                tranche {index + 1}
              </span>
              <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-black/40">
                <span
                  className={`absolute inset-y-0 left-0 rounded-full ${
                    mature ? 'bg-px-prize' : 'bg-px-accent/70'
                  }`}
                  style={{ width: `${maturity}%` }}
                />
              </span>
              <span
                className={`w-28 shrink-0 text-right font-mono text-[0.8125rem] ${
                  mature ? 'text-px-prize' : 'text-px-faint'
                }`}
              >
                {mature ? 'rotates' : `${index + 1}/${depth} epochs`}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-[1rem] leading-[1.65] text-px-muted">
        Each epoch the oldest mature tranche is unstaked, its yield harvested, and its
        principal restaked at the back of the ladder. Withdrawals are served from the liquid
        buffer first; only a withdrawal larger than the buffer reaches the ladder, and it
        takes from the head regardless of maturity — which resets that tranche&rsquo;s clock.
      </p>
    </div>
  );
}
