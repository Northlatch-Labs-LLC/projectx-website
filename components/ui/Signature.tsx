
export function Signature({
  className = '',
  width = 'full',
}: {
  className?: string;
  width?: 'full' | 'short';
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex items-center gap-5 ${
        width === 'short' ? 'mx-auto w-56' : 'w-full'
      } ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-px-accent/25 to-px-accent/45" />

      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
        <path
          d="M6 6 18 18"
          stroke="currentColor"
          className="text-px-accent"
          strokeOpacity="0.85"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18 6 6 18"
          stroke="currentColor"
          className="text-px-prize"
          strokeOpacity="0.85"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3.5 2.5"
        />
      </svg>

      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-px-prize/20 to-px-prize/35" />
    </div>
  );
}
