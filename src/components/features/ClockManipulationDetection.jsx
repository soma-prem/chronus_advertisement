import React from 'react';

/**
 * ClockManipulationDetection — Two clocks side by side:
 *   Left:  wall/system clock — hands jump backward (tampered)
 *   Right: hardware monotonic clock — keeps ticking steadily
 *   A red "SKEW DETECTED" stamp snaps onto the wall clock.
 *
 * Props:
 *  - title / subtitle : string
 *  - wallLabel / monoLabel : string
 *  - stampText : string
 */
export default function ClockManipulationDetection({
  title = 'System Clock Manipulation Detection',
  subtitle = 'Dual-clock architecture: tamper with the system clock all you want — the monotonic hardware clock keeps the real timeline.',
  wallLabel = 'System Clock (CLOCK_REALTIME)',
  monoLabel = 'Monotonic Clock (CLOCK_MONOTONIC)',
  stampText = 'SKEW DETECTED',
}) {
  /* Generate 12 hour markers */
  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30;
    const rad = (angle - 90) * (Math.PI / 180);
    const x1 = 80 + 62 * Math.cos(rad);
    const y1 = 80 + 62 * Math.sin(rad);
    const x2 = 80 + 72 * Math.cos(rad);
    const y2 = 80 + 72 * Math.sin(rad);
    return { x1, y1, x2, y2 };
  });

  const renderClock = (type) => {
    const isSystem = type === 'system';
    return (
      <div className={`clock-unit ${isSystem ? 'clock-system' : 'clock-mono'}`}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Face */}
          <circle cx="80" cy="80" r="76" stroke="var(--line)" strokeWidth="1.5" fill="var(--surface-2)" />
          <circle cx="80" cy="80" r="76" stroke={isSystem ? 'var(--danger)' : 'var(--teal)'} strokeWidth="0.5" fill="none" opacity="0.4" />
          <circle className="clock-signal-ring" cx="80" cy="80" r="70" stroke={isSystem ? 'var(--danger)' : 'var(--teal)'} strokeWidth="1" fill="none" opacity="0.35" />

          {/* Hour markers */}
          {markers.map((m, i) => (
            <line key={i} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} stroke="var(--muted)" strokeWidth={i % 3 === 0 ? 2 : 1} strokeLinecap="round" />
          ))}

          {/* Center dot */}
          <circle cx="80" cy="80" r="3" fill={isSystem ? 'var(--danger)' : 'var(--brass)'} />

          {/* Hour hand */}
          <line
            className={isSystem ? 'sys-hour' : 'mono-hour'}
            x1="80" y1="80" x2="80" y2="38"
            stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round"
            style={{ transformOrigin: '80px 80px' }}
          />

          {/* Minute hand */}
          <line
            className={isSystem ? 'sys-min' : 'mono-min'}
            x1="80" y1="80" x2="80" y2="22"
            stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"
            style={{ transformOrigin: '80px 80px' }}
          />

          {/* Second hand (thin) */}
          <line
            className={isSystem ? 'sys-sec' : 'mono-sec'}
            x1="80" y1="90" x2="80" y2="18"
            stroke={isSystem ? 'var(--danger)' : 'var(--teal)'} strokeWidth="1" strokeLinecap="round"
            style={{ transformOrigin: '80px 80px' }}
          />
        </svg>

        {/* Stamp overlay (system clock only) */}
        {isSystem && (
          <div className="skew-stamp">
            <span>{stampText}</span>
          </div>
        )}

        <div className="mono" style={styles.clockLabel}>
          {isSystem ? wallLabel : monoLabel}
        </div>
      </div>
    );
  };

  return (
    <div className="feature-panel">
      <div className="feature-header">
        <span className="mono" style={styles.tag}>Security Layer</span>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      <div className="clocks-row">
        {renderClock('system')}
        <div className="clock-vs">vs</div>
        {renderClock('mono')}
      </div>

      <div className="clock-legend mono" style={styles.legend}>
        <span><span style={styles.dotDanger} /> wall-clock tampering detected</span>
        <span><span style={styles.dotTeal} /> monotonic reference — untamperable</span>
      </div>

      <style>{`
        .feature-panel {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 28px 24px;
        }
        .feature-header { margin-bottom: 24px; }
        .feature-header h3 { font-size: 18px; font-weight: 600; margin-top: 8px; }
        .feature-header p { font-size: 13px; color: var(--muted); margin-top: 6px; max-width: 520px; }

        .clocks-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          padding: 20px 0;
        }
        .clock-unit {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .clock-signal-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: clock-signal 2.2s ease-in-out infinite;
        }
        .clock-system .clock-signal-ring { animation-delay: -1.1s; }
        @keyframes clock-signal {
          0%, 100% { opacity: 0.18; transform: scale(0.92); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
        .clock-vs {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: var(--line);
          font-weight: 600;
          padding-bottom: 28px;
        }

        /* --- System clock animations (backward tamper loop) --- */
        .sys-hour { animation: sys-hour-tick 8s ease-in-out infinite; }
        .sys-min  { animation: sys-min-tick  8s ease-in-out infinite; }
        .sys-sec  { animation: sys-sec-tick  8s linear infinite; }

        @keyframes sys-hour-tick {
          0%, 20%   { transform: rotate(30deg); }
          25%, 45%  { transform: rotate(-60deg); }
          50%       { transform: rotate(30deg); }
          100%      { transform: rotate(30deg); }
        }
        @keyframes sys-min-tick {
          0%, 20%   { transform: rotate(180deg); }
          25%, 45%  { transform: rotate(40deg); }
          50%       { transform: rotate(180deg); }
          100%      { transform: rotate(180deg); }
        }
        @keyframes sys-sec-tick {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* --- Monotonic clock animations (steady tick) --- */
        .mono-hour { animation: mono-tick-slow 16s linear infinite; }
        .mono-min  { animation: mono-tick-med  6s linear infinite; }
        .mono-sec  { animation: mono-tick-fast 2s linear infinite; }

        @keyframes mono-tick-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes mono-tick-med  { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes mono-tick-fast { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* --- Skew stamp --- */
        .skew-stamp {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-18deg) scale(0);
          animation: stamp-snap 8s ease-out infinite;
          pointer-events: none;
        }
        .clock-system::after {
          content: 'LIVE CHECK';
          position: absolute;
          top: 12px;
          right: -8px;
          color: var(--danger);
          font: 10px 'IBM Plex Mono', monospace;
          letter-spacing: 0.08em;
          animation: live-check 2.2s ease-in-out infinite;
        }
        @keyframes live-check {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; text-shadow: 0 0 8px var(--danger); }
        }
        .skew-stamp span {
          display: inline-block;
          padding: 6px 16px;
          border: 3px solid var(--danger);
          color: var(--danger);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          border-radius: 4px;
          background: rgba(201, 122, 106, 0.12);
          white-space: nowrap;
        }
        @keyframes stamp-snap {
          0%, 22%   { transform: translate(-50%, -50%) rotate(-18deg) scale(0); opacity: 0; }
          26%       { transform: translate(-50%, -50%) rotate(-18deg) scale(1.15); opacity: 1; }
          30%, 48%  { transform: translate(-50%, -50%) rotate(-18deg) scale(1); opacity: 1; }
          52%       { transform: translate(-50%, -50%) rotate(-18deg) scale(0); opacity: 0; }
          100%      { transform: translate(-50%, -50%) rotate(-18deg) scale(0); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sys-hour, .sys-min, .sys-sec,
          .mono-hour, .mono-min, .mono-sec,
          .skew-stamp, .clock-signal-ring, .clock-system::after { animation: none !important; }
          .sys-hour { transform: rotate(30deg); }
          .sys-min  { transform: rotate(180deg); }
          .mono-hour { transform: rotate(60deg); }
          .mono-min  { transform: rotate(120deg); }
          .skew-stamp { display: none; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  tag: {
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--brass)',
  },
  title: {},
  subtitle: {},
  clockLabel: {
    fontSize: 10,
    color: 'var(--muted)',
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: '0.03em',
  },
  legend: {
    display: 'flex',
    gap: 24,
    fontSize: 11,
    color: 'var(--muted)',
    marginTop: 16,
    paddingTop: 14,
    borderTop: '1px solid var(--line)',
    justifyContent: 'center',
  },
  dotDanger: {
    display: 'inline-block',
    width: 8, height: 8,
    borderRadius: '50%',
    background: 'var(--danger)',
    marginRight: 6,
    verticalAlign: 'middle',
  },
  dotTeal: {
    display: 'inline-block',
    width: 8, height: 8,
    borderRadius: '50%',
    background: 'var(--teal)',
    marginRight: 6,
    verticalAlign: 'middle',
  },
};
