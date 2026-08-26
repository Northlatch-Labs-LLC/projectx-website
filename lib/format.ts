
export function formatUnits(base: bigint | string, decimals: number, maxFractionDigits = 4): string {
  const value = typeof base === 'string' ? BigInt(base || '0') : base;
  const negative = value < 0n;
  const abs = negative ? -value : value;

  const divisor = 10n ** BigInt(decimals);
  const whole = abs / divisor;
  const fraction = abs % divisor;

  let fractionText = fraction.toString().padStart(decimals, '0').slice(0, maxFractionDigits);
  fractionText = fractionText.replace(/0+$/, '');

  const wholeText = whole.toLocaleString('en-US');
  return `${negative ? '-' : ''}${wholeText}${fractionText ? `.${fractionText}` : ''}`;
}

export function formatSui(mist: bigint | string, maxFractionDigits = 4): string {
  return formatUnits(mist, 9, maxFractionDigits);
}

export function formatUsdc(baseUnits: bigint | string, maxFractionDigits = 4): string {
  return formatUnits(baseUnits, 6, maxFractionDigits);
}

export function formatBps(bps: number): string {
  const percent = bps / 100;
  return `${Number.isInteger(percent) ? percent : percent.toFixed(2)}%`;
}

export function formatCount(value: number | string): string {
  const n = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(n) ? n.toLocaleString('en-US') : '—';
}

export function formatDuration(ms: number | string): string {
  const value = typeof ms === 'string' ? Number(ms) : ms;
  if (!Number.isFinite(value) || value <= 0) return '—';

  const units: [number, string][] = [
    [86_400_000, 'day'],
    [3_600_000, 'hour'],
    [60_000, 'minute'],
    [1000, 'second'],
  ];

  for (const [size, name] of units) {
    const count = value / size;
    if (count >= 2) {
      const rounded = Number.isInteger(count) ? count : Number(count.toFixed(1));
      return `${rounded} ${name}s`;
    }
  }

  const [smallest] = units[units.length - 1];
  const count = Number((value / smallest).toFixed(1));
  return `${count} second${count === 1 ? '' : 's'}`;
}
