import React from 'react';

/**
 * IPWhitelisting — A padlocked gate with a scanning laser checking incoming
 * "car" icons (IP addresses). Green light / gate-lift for whitelisted IPs,
 * red barrier for non-whitelisted.
 *
 * Props:
 *  - title / subtitle : string
 *  - vehicles : Array<{ ip, whitelisted }>
 */
export default function IPWhitelisting({
  title = 'IP Whitelisting',
  subtitle = 'Only pre-approved source IPs reach the ingestion gateway. Everything else hits the barrier — no exceptions, no fallback.',
  vehicles = [
    { ip: '10.0.1.42', whitelisted: true },
    { ip: '192.168.3.7', whitelisted: false },
    { ip: '10.0.2.18', whitelisted: true },
    { ip: '203.0.113.5', whitelisted: false },
  ],
}) {
  return (
    <div className="feature-panel">
      <div className="feature-header">
        <span className="mono" style={styles.tag}>Network Layer</span>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      <div className="ipw-scene">
        {/* Road / lane */}
        <div className="ipw-road">
          <div className="ipw-lane-line" />
          <div className="ipw-lane-line" style={{ top: '75%' }} />
        </div>

        {/* Incoming vehicles */}
        {vehicles.map((v, i) => (
          <div
            key={i}
            className={`ipw-vehicle ${v.whitelisted ? 'ipw-pass' : 'ipw-block'}`}
            style={{ animationDelay: `${i * 3}s` }}
          >
            {/* Car body */}
            <svg width="44" height="22" viewBox="0 0 44 22" fill="none">
              <rect x="2" y="6" width="32" height="12" rx="4" fill={v.whitelisted ? 'var(--teal)' : 'var(--danger)'} opacity="0.2" stroke={v.whitelisted ? 'var(--teal)' : 'var(--danger)'} strokeWidth="1" />
              <rect x="26" y="3" width="16" height="15" rx="3" fill={v.whitelisted ? 'var(--teal)' : 'var(--danger)'} opacity="0.15" stroke={v.whitelisted ? 'var(--teal)' : 'var(--danger)'} strokeWidth="1" />
              <circle cx="10" cy="19" r="2.5" fill="var(--muted)" />
              <circle cx="30" cy="19" r="2.5" fill="var(--muted)" />
            </svg>
            <span className="ipw-vehicle-ip mono" style={{ color: v.whitelisted ? 'var(--teal)' : 'var(--danger)' }}>{v.ip}</span>
          </div>
        ))}

        {/* Gate structure */}
        <div className="ipw-gate-frame">
          <div className="ipw-gate-post ipw-gate-post-l" />
          <div className="ipw-gate-post ipw-gate-post-r" />
          <div className="ipw-gate-bar" />
          <div className="ipw-gate-arm" />
        </div>

        {/* Scanning laser */}
        <div className="ipw-laser">
          <div className="ipw-laser-beam" />
        </div>

        {/* Traffic light */}
        <div className="ipw-traffic-light">
          <div className="ipw-tl-red" /><div className="ipw-tl-yellow" /><div className="ipw-tl-green" />
        </div>

        {/* Gateway label */}
        <div className="ipw-gateway-label mono" style={styles.gwLabel}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="8" rx="2" stroke="var(--brass)" strokeWidth="1.2" />
            <path d="M4 13h6M7 9v4" stroke="var(--brass)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          GATEWAY
        </div>
      </div>

      {/* Legend */}
      <div className="ipw-legend mono" style={styles.legend}>
        <span><span style={styles.dotGreen} /> whitelisted — gate opens</span>
        <span><span style={styles.dotRed} /> unknown — barrier locked</span>
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

        .ipw-scene {
          position: relative;
          height: 160px;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 6px;
          background: var(--surface-2);
        }

        /* Road markings */
        .ipw-road { position: absolute; inset: 0; pointer-events: none; }
        .ipw-lane-line {
          position: absolute; top: 50%; left: 0; right: 0;
          height: 1px;
          background: repeating-linear-gradient(90deg, var(--line) 0 20px, transparent 20px 40px);
        }

        /* Gate frame */
        .ipw-gate-frame {
          position: absolute;
          left: 55%; top: 0; bottom: 0;
          width: 86px;
          transform: translateX(-50%);
          z-index: 10;
        }
        .ipw-gate-post-l, .ipw-gate-post-r {
          position: absolute; width: 6px; height: 100%;
          background: var(--line);
          border-radius: 1px;
        }
        .ipw-gate-post-l { left: 0; }
        .ipw-gate-post-r { right: 0; }
        .ipw-gate-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--muted);
        }
        .ipw-gate-arm {
          position: absolute; top: 3px; left: 8px; width: 70px; height: 7px;
          background: repeating-linear-gradient(90deg, var(--danger) 0 16px, transparent 16px 24px);
          animation: gate-cycle 3s ease-in-out infinite;
          transform-origin: left center;
          box-shadow: 0 0 8px rgba(201, 122, 106, 0.3);
        }
        @keyframes gate-cycle {
          0%, 10%   { transform: rotate(0deg); }      /* closed */
          30%, 50%  { transform: rotate(-82deg); background-color: var(--teal); box-shadow: 0 0 12px rgba(95, 207, 192, 0.7); }     /* open */
          60%, 75%  { transform: rotate(-82deg); background-color: var(--teal); box-shadow: 0 0 12px rgba(95, 207, 192, 0.7); }     /* stay open */
          85%, 100% { transform: rotate(0deg); }      /* close */
        }

        /* Scanning laser */
        .ipw-laser {
          position: absolute; left: 54%; top: 0; bottom: 0;
          width: 40px; z-index: 8; pointer-events: none;
        }
        .ipw-laser-beam {
          position: absolute; left: 50%; width: 1px; height: 30px;
          background: linear-gradient(180deg, transparent, var(--brass), transparent);
          animation: laser-sweep 1.5s ease-in-out infinite;
          opacity: 0.7;
        }
        @keyframes laser-sweep {
          0%, 100% { top: 10%; }
          50% { top: 70%; }
        }

        /* Traffic light */
        .ipw-traffic-light {
          position: absolute; right: 16px; top: 16px;
          display: flex; flex-direction: column; gap: 5px;
          padding: 6px 5px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 4px;
          z-index: 12;
        }
        .ipw-tl-red, .ipw-tl-yellow, .ipw-tl-green {
          width: 10px; height: 10px; border-radius: 50%;
          border: 1px solid var(--line);
        }
        .ipw-tl-red { animation: tl-red 3s infinite; }
        .ipw-tl-yellow { animation: tl-yellow 3s infinite; }
        .ipw-tl-green { animation: tl-green 3s infinite; }
        @keyframes tl-red {
          0%, 25%  { background: var(--danger); box-shadow: 0 0 6px var(--danger); }
          30%, 100% { background: #3A2020; box-shadow: none; }
        }
        @keyframes tl-yellow {
          0%, 20%  { background: #3A3020; box-shadow: none; }
          25%, 35% { background: var(--brass); box-shadow: 0 0 6px var(--brass); }
          40%, 100%{ background: #3A3020; box-shadow: none; }
        }
        @keyframes tl-green {
          0%, 28%  { background: #1A2A28; box-shadow: none; }
          33%, 65%{ background: var(--teal); box-shadow: 0 0 6px var(--teal); }
          70%, 100%{ background: #1A2A28; box-shadow: none; }
        }

        /* Vehicles */
        .ipw-vehicle {
          position: absolute;
          top: 50%;
          left: -80px;
          display: flex;
          align-items: center;
          gap: 8px;
          transform: translateY(-50%);
          animation: vehicle-approach 3s ease-in-out infinite;
          z-index: 5;
        }
        .ipw-vehicle-ip {
          font-size: 10px;
          white-space: nowrap;
          background: var(--surface);
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid var(--line);
        }
        .ipw-pass { animation-name: vehicle-pass; }
        .ipw-block { animation-name: vehicle-block; top: 30%; }
        @keyframes vehicle-approach {
          0%   { left: -80px; opacity: 0; }
          10%  { opacity: 1; }
          100% { left: 90%; opacity: 1; }
        }
        @keyframes vehicle-pass {
          0%   { left: -80px; opacity: 0; }
          8%   { opacity: 1; }
          35%  { left: 52%; }
          60%  { left: 85%; opacity: 1; }
          75%  { left: 92%; opacity: 0; }
          100% { left: 92%; opacity: 0; }
        }
        @keyframes vehicle-block {
          0%   { left: -80px; opacity: 0; }
          8%   { opacity: 1; }
          30%  { left: 48%; }
          40%  { left: 47%; }
          65%  { left: 47%; opacity: 1; }
          80%  { left: 47%; opacity: 0; }
          100% { left: 47%; opacity: 0; }
        }

        /* Gateway label */
        .ipw-gateway-label {
          position: absolute; left: 54%; bottom: 10px;
          transform: translateX(-50%);
          font-size: 10px;
          color: var(--brass);
          display: flex; align-items: center; gap: 6px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          z-index: 12;
          animation: gateway-pulse 3s ease-in-out infinite;
        }
        @keyframes gateway-pulse {
          0%, 10%, 85%, 100% { opacity: 0.65; transform: translateX(-50%) scale(1); }
          30%, 75% { opacity: 1; transform: translateX(-50%) scale(1.06); }
        }

        /* Legend */
        .ipw-legend {
          display: flex; gap: 24px; font-size: 11px; color: var(--muted);
          margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line);
        }

        @media (prefers-reduced-motion: reduce) {
          .ipw-gate-arm, .ipw-laser-beam,
          .ipw-tl-red, .ipw-tl-yellow, .ipw-tl-green,
          .ipw-vehicle, .ipw-gateway-label { animation: none !important; }
          .ipw-scene { display: flex; align-items: center; justify-content: center; color: var(--muted); font-size: 13px; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  tag: { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brass)' },
  title: {},
  subtitle: {},
  gwLabel: {},
  legend: {},
  dotGreen: { display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', marginRight: 6, verticalAlign: 'middle' },
  dotRed:   { display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)', marginRight: 6, verticalAlign: 'middle' },
};
