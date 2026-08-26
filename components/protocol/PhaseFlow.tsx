
import { PHASES } from '@/lib/derive';

export function PhaseFlow() {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {PHASES.map((phase, index) => {
        return (
          <li
            key={phase.id}
            className="panel relative flex flex-col gap-3 p-5"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-px-cyan/30 bg-px-cyan/10 font-mono text-[0.8125rem] font-medium text-px-cyan"
              >
                {index + 1}
              </span>
              <span className="font-display text-[1.0625rem] font-medium text-white">{phase.title}</span>
            </div>
            <p className="text-[1rem] leading-[1.65] text-px-muted">{phase.detail}</p>
            <code className="mt-auto font-mono text-[0.7rem] text-px-faint">{phase.name}</code>

            {index < PHASES.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-2.5 top-1/2 hidden h-px w-5 bg-px-border md:block"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
