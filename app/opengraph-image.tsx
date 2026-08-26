
import { ImageResponse } from 'next/og';

export const alt = 'ProjectX — Protocol built on Sui. A prize vault, verifiable prize draws, and .sui names.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #060a12 0%, #0b1524 55%, #0e2038 100%)',
          color: '#e8edf5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#0b1220',
              border: '2px solid rgba(77,162,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
              color: '#4da2ff',
            }}
          >
            X
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>ProjectX Protocol</div>
          <div
            style={{
              marginLeft: 12,
              padding: '6px 16px',
              borderRadius: 999,
              border: '1px solid rgba(61,220,151,0.4)',
              background: 'rgba(61,220,151,0.1)',
              color: '#3ddc97',
              fontSize: 20,
            }}
          >
            Live on Sui mainnet
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            Your SUI is never
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: '#4da2ff',
            }}
          >
            what&apos;s at stake.
          </div>
          <div style={{ fontSize: 30, color: '#8896b0', maxWidth: 900, lineHeight: 1.4 }}>
            Software on Sui mainnet where the rules live in a contract, not a policy page.
            Public, permanent, and checkable by anyone — including you.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 40,
            paddingTop: 28,
            borderTop: '1px solid rgba(28,39,64,0.9)',
            fontSize: 24,
            color: '#5a6880',
          }}
        >
          <div style={{ display: 'flex' }}>liquid + staked == total principal</div>
          <div style={{ display: 'flex', marginLeft: 'auto', color: '#3ddc97' }}>
            0 principal lost
          </div>
        </div>
      </div>
    ),
    size,
  );
}
