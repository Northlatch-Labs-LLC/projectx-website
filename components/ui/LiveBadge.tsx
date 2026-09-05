// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { Badge, LiveDot } from '@/components/ui/Badge';
import { NETWORK } from '@/lib/chain';
import { getStats } from '@/lib/stats';

/**
 * The network badge, reporting whether the figures beside it are actually live.
 *
 * When the protocol API is unreachable the page falls back to the baked snapshot. This badge must
 * report which of the two the figures beside it came from — a badge hardcoded to "Live on mainnet"
 * leaves a reader unable to tell an outage from an observation.
 *
 * Live: green, pulsing, named network. Not live: gold, still, and dated. The motion is the signal
 * — a dot that has stopped means the reading behind it has stopped too.
 *
 * A server component, so the fetch happens once per render rather than in the browser. Next
 * deduplicates `getStats` across the tree, so rendering this in several places costs one request.
 */
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
