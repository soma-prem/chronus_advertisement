import React from 'react';

/**
 * OfflineCacheOverflow — A bucket filling with water (data). As it nears
 * the top, water droplets compress into ice cubes (high-density time
 * compression). When the bucket overflows, the oldest/lightest cubes tip
 * out first (LRU drop), while a labeled "PRODUCTIVE" block stays locked
 * at the bottom.
 *
 * Props:
 *  - title / subtitle : string
 *  - capacity / currentUsage : string
 */
export default function OfflineCacheOverflow({
  title = 'Offline Cache & Storage Overflow Handling',
  subtitle = 'Encrypted WAL queue with LRU eviction. When the local buffer fills, the oldest low-priority entries drop first — productive session data stays locked.',
  capacity = '256 MB',
  currentUsage = '231 MB',
}) {
  return (
    <div className="feature-panel">
      <div className="feature-header">
        <span className="mono" style={styles.tag}>Resilience Layer</span>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      <div className="oco-scene">
        <div className="oco-bucket-area">
          {/* Bucket shape */}
          <div className="oco-bucket">
            {/* PRODUCTIVE block — stays at bottom */}
            <div className="oco-productive">
              <span className="mono" style={styles.prodLabel}>PRODUCTIVE</span>
              <span className="mono" style={styles.prodSub}>priority lock</span>
            </div>

            {/* Data blocks — these stack up and can overflow */}
            <div className="oco-blocks">
              <div className="oco-block oco-block-1" style={styles.block1}><span className="mono">A</span></div>
              <div className="oco-block oco-block-2" style={styles.block2}><span className="mono">B</span></div>
              <div className="oco-block oco-block-3" style={styles.block3}><span className="mono">C</span></div>
              <div className="oco-block oco-block-4" style={styles.block4}><span className="mono">D</span></div>
              <div className="oco-block oco-block-5 oco-ice" style={styles.block5}><span className="mono">E</span></div>
              <div className="oco-block oco-block-6 oco-ice" style={styles.block6}><span className="mono">F</span></div>
            </div>

            {/* Water fill level */}
            <div className="oco-water" />

            {/* Overflow indicator */}
            <div className="oco-overflow-tag mono">OVERFLOW</div>

            {/* LRU drop animation — oldest block tips out */}
            <div className="oco-lru-drop oco-block-1" style={{ ...styles.block1, position: 'absolute' }}>
              <span className="mono">A</span>
              <span className="oco-lru-badge mono">LRU</span>
            </div>
          </div>

          {/* Compression arrow */}
          <div className="oco-compress-indicator">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v16M8 16l4 4 4-4M8 8l4-4 4 4" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="mono" style={styles.compressLabel}>compress</span>
          </div>

          {/* Ice cube legend */}
          <div className="oco-ice-legend mono" style={styles.iceLegend}>
            <span style={styles.iceCube} /> = high-density compression
          </div>
        </div>

        {/* Usage meter */}
        <div className="oco-meter">
          <div className="oco-meter-label mono" style={styles.meterLabel}>
            <span>Local buffer</span>
            <span><b style={{ color: 'var(--danger)' }}>{currentUsage}</b> / {capacity}</span>
          </div>
          <div className="oco-meter-bar">
            <div className="oco-meter-fill" />
            <div className="oco-meter-mark" style={{ left: '90%' }}><span className="mono" style={{ fontSize: 9 }}>cap</span></div>
          </div>
        </div>
      </div>

      <div className="oco-steps mono" style={styles.steps}>
        <span><span style={styles.stepNum}>1</span> Data streams into encrypted WAL buffer</span>
        <span><span style={styles.stepNum}>2</span> Near capacity: high-density time compression</span>
        <span><span style={styles.stepNum}>3</span> Overflow: LRU eviction (oldest, lowest priority first)</span>
        <span><span style={styles.stepNum}>&#x1F512;</span> PRODUCTIVE sessions: priority-locked, never evicted</span>
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

        .oco-scene {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          padding: 20px 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Bucket */
        .oco-bucket-area { position: relative; }
        .oco-bucket {
          width: 140px;
          height: 200px;
          position: relative;
          /* Trapezoid using clip-path */
          clip-path: polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%);
          background: var(--surface-2);
          border: none;
          overflow: visible;
        }
        /* Bucket border outline */
        .oco-bucket::before {
          content: '';
          position: absolute;
          inset: 0;
          clip-path: polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%);
          border: 1px solid var(--line);
          border-radius: 0 0 4px 4px;
          pointer-events: none;
          z-index: 5;
        }

        /* PRODUCTIVE block */
        .oco-productive {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 28px;
          background: var(--brass);
          color: #181A1F;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 3;
          box-shadow: 0 0 8px rgba(198, 161, 92, 0.3);
        }

        /* Data blocks */
        .oco-blocks {
          position: absolute;
          bottom: 42px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          gap: 3px;
          z-index: 2;
        }
        .oco-block {
          width: 60px;
          height: 18px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 600;
        }
        .oco-block span { z-index: 1; }
        .oco-ice {
          background: linear-gradient(135deg, rgba(95,207,192,0.2), rgba(95,207,192,0.1)) !important;
          border: 1px solid rgba(95,207,192,0.3);
          color: var(--teal) !important;
          animation: ice-form 7s ease infinite;
        }
        @keyframes ice-form {
          0%, 30%  { transform: scale(1); opacity: 0.7; }
          45%      { transform: scale(0.85); opacity: 1; }
          100%     { transform: scale(0.85); opacity: 1; }
        }

        /* Water fill */
        .oco-water {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 0%;
          background: linear-gradient(180deg,
            rgba(95, 207, 192, 0.08),
            rgba(95, 207, 192, 0.18)
          );
          animation: water-rise 7s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes water-rise {
          0%   { height: 15%; }
          40%  { height: 75%; }
          60%  { height: 92%; }
          70%  { height: 92%; }
          80%  { height: 65%; }
          100% { height: 15%; }
        }

        /* Overflow tag */
        .oco-overflow-tag {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 9px;
          color: var(--danger);
          background: rgba(201, 122, 106, 0.15);
          padding: 2px 8px;
          border-radius: 3px;
          border: 1px solid rgba(201, 122, 106, 0.3);
          animation: overflow-flash 7s ease infinite;
          opacity: 0;
          z-index: 6;
        }
        @keyframes overflow-flash {
          0%, 55%  { opacity: 0; }
          62%      { opacity: 1; }
          72%      { opacity: 1; }
          80%, 100%{ opacity: 0; }
        }

        /* LRU drop */
        .oco-lru-drop {
          top: auto;
          bottom: 42px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          animation: lru-tip 7s ease infinite;
          opacity: 0;
          pointer-events: none;
        }
        .oco-lru-badge {
          position: absolute;
          top: -6px; right: -16px;
          font-size: 7px;
          color: var(--danger);
          background: rgba(201,122,106,0.15);
          padding: 1px 4px;
          border-radius: 2px;
        }
        @keyframes lru-tip {
          0%, 58%  { opacity: 0; transform: translateX(-50%) rotate(0deg); }
          66%      { opacity: 1; transform: translateX(-50%) rotate(0deg); }
          78%      { opacity: 1; transform: translateX(-50%) rotate(25deg) translateX(40px) translateY(-20px); }
          88%      { opacity: 0; transform: translateX(-50%) rotate(25deg) translateX(60px) translateY(-40px); }
          100%     { opacity: 0; }
        }

        /* Compression indicator */
        .oco-compress-indicator {
          position: absolute;
          right: -50px;
          top: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          animation: compress-pulse 7s ease infinite;
          opacity: 0;
        }
        @keyframes compress-pulse {
          0%, 30%  { opacity: 0; }
          40%, 60%{ opacity: 1; }
          70%, 100%{ opacity: 0; }
        }

        /* Ice legend */
        .oco-ice-legend {
          position: absolute;
          right: -50px;
          top: 80px;
          font-size: 9px;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        /* Meter */
        .oco-meter {
          flex: 1;
          max-width: 300px;
          min-width: 200px;
        }
        .oco-meter-label {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .oco-meter-bar {
          height: 8px;
          background: var(--surface-2);
          border-radius: 4px;
          border: 1px solid var(--line);
          position: relative;
          overflow: visible;
        }
        .oco-meter-fill {
          height: 100%;
          width: 90%;
          background: linear-gradient(90deg, var(--teal), var(--brass), var(--danger));
          border-radius: 4px;
          animation: meter-pulse 7s ease-in-out infinite;
        }
        @keyframes meter-pulse {
          0%, 40%  { width: 45%; }
          60%      { width: 92%; }
          75%      { width: 65%; }
          100%     { width: 45%; }
        }
        .oco-meter-mark {
          position: absolute;
          top: -16px;
          transform: translateX(-50%);
          color: var(--danger);
          font-size: 9px;
        }

        /* Steps */
        .oco-steps {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11px;
          color: var(--muted);
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }

        @media (prefers-reduced-motion: reduce) {
          .oco-water, .oco-block-5, .oco-block-6, .oco-overflow-tag,
          .oco-lru-drop, .oco-compress-indicator, .oco-meter-fill {
            animation: none !important;
          }
          .oco-water { height: 70%; }
          .oco-meter-fill { width: 70%; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  tag: { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brass)' },
  title: {},
  subtitle: {},
  prodLabel: { fontSize: 9, fontWeight: 700, letterSpacing: '0.1em' },
  prodSub: { fontSize: 7, opacity: 0.7 },
  block1: { background: 'rgba(139,147,163,0.15)', color: 'var(--muted)', border: '1px solid var(--line)' },
  block2: { background: 'rgba(139,147,163,0.15)', color: 'var(--muted)', border: '1px solid var(--line)' },
  block3: { background: 'rgba(139,147,163,0.15)', color: 'var(--muted)', border: '1px solid var(--line)' },
  block4: { background: 'rgba(139,147,163,0.15)', color: 'var(--muted)', border: '1px solid var(--line)' },
  block5: { background: 'rgba(95,207,192,0.1)', color: 'var(--teal)', border: '1px solid rgba(95,207,192,0.2)' },
  block6: { background: 'rgba(95,207,192,0.1)', color: 'var(--teal)', border: '1px solid rgba(95,207,192,0.2)' },
  compressLabel: { fontSize: 9, color: 'var(--teal)' },
  iceLegend: {},
  iceCube: {
    display: 'inline-block',
    width: 10, height: 10,
    background: 'rgba(95,207,192,0.2)',
    border: '1px solid rgba(95,207,192,0.3)',
    borderRadius: 2,
  },
  meterLabel: {},
  steps: {},
  stepNum: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 16, height: 16, borderRadius: '50%',
    background: 'var(--brass)', color: '#181A1F',
    fontSize: 10, fontWeight: 600, marginRight: 6, flexShrink: 0,
  },
};
