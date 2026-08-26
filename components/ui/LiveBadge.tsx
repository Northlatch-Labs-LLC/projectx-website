
import { Badge, LiveDot } from '@/components/ui/Badge';
import { NETWORK } from '@/lib/chain';
import { getStats } from '@/lib/stats';

export async function LiveBadge({ className = '' }: { className?: string }) {
  const stats = await getStats();

  if (!stats.live) {
    return (
      <Badge tone="gold" className={className}>
        <LiveDot tone="gold" pulsing={false} />
        Last verified {stats.capturedOn}
      </Badge>
    );
  }

  return (
    <Badge tone="prize" className={className}>
      <LiveDot tone="prize" pulsing />
      Live on {NETWORK}
    </Badge>
  );
}
