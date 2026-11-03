import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

/**
 * Shared 1200×630 social preview card in the JAQYI look:
 * black background, violet glow, light display type.
 */
export function ogCard({ eyebrow, title, subtitle, footer = 'jaqyi.com' }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(124,58,237,0.35) 0%, rgba(0,0,0,0) 55%), #000',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 34, letterSpacing: -1, fontWeight: 300 }}>JAQYI</div>
          {eyebrow ? (
            <div
              style={{
                fontSize: 20,
                padding: '6px 16px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              {eyebrow}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, fontWeight: 300, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 30, lineHeight: 1.4, color: 'rgba(255,255,255,0.65)', maxWidth: 980 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>{footer}</div>
      </div>
    ),
    ogSize
  );
}
