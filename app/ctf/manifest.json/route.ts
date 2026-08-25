// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
import { NextResponse } from 'next/server';
import {
  CHALLENGES,
  OUT_OF_SCOPE_LIVE_POOL,
  SCOPE,
  TARGET,
  isCtfConfigured,
  totalPoints,
} from '@/lib/ctf';
import { SITE_URL } from '@/lib/links';

export const dynamic = 'force-static';

export function GET() {
  const configured = isCtfConfigured();

  return NextResponse.json(
    {
      $schema: 'https://projectx.invalid/schemas/ctf-manifest-v1.json',
      version: 1,
      name: 'ProjectX Capture the Flag',
      description:
        'Challenges reproducing real audit findings from ProjectX v1.0, against a retired mainnet deployment holding no user funds.',
      website: `${SITE_URL}/ctf`,

      scope: {
        inScope: SCOPE.inScope,
        outOfScope: SCOPE.outOfScope,
        outOfScopeAddresses: [
          {
            id: OUT_OF_SCOPE_LIVE_POOL,
            label: 'Live v1.0.1 pool',
            reason:
              'Holds real user deposits. Findings here are real vulnerabilities — disclose privately, do not exploit.',
          },
        ],
        disclosure: `${SITE_URL}/security`,
      },

      target: {
        configured,
        network: TARGET.network,
        label: TARGET.label,
        packageId: TARGET.packageId || null,
        poolId: TARGET.poolId || null,
        rpcUrl: TARGET.rpcUrl,
        explorerBaseUrl: TARGET.explorerBaseUrl,
      },

      scoring: {
        totalPoints: totalPoints(),
        challengeCount: CHALLENGES.length,
        flagFormat:
          'A transaction digest on the target network demonstrating the objective, plus a one-paragraph explanation of the mechanism.',
        submission: TARGET.submissionUrl || `${SITE_URL}/community`,
      },

      challenges: CHALLENGES.map((challenge) => ({
        id: challenge.id,
        title: challenge.title,
        finding: challenge.finding,
        category: challenge.category,
        difficulty: challenge.difficulty,
        points: challenge.points,
        premise: challenge.premise,
        objective: challenge.objective,
      })),

      guidance: [
        'Dry-run every state-changing transaction before sending it. Simulation is free and catches most mistakes.',
        'Isolate failures by building two transactions that differ in exactly one way and comparing the results.',
        'The operator of an agent is responsible for what it sends, including scope violations.',
      ],
    },
    {
      headers: {
        'cache-control': 'public, max-age=300, s-maxage=3600',
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
}
