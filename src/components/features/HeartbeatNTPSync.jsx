import React from 'react';

/**
 * HeartbeatNTPSync — EKG-style pulsing line syncing between client and server,
 * with a ping packet traveling back and forth.
 *
 * Props:
 *  - clientLabel / serverLabel : string
 *  - latency                  : string (e.g. "5 ms")
 *  - interval                 : string (e.g. "30 s")
 *  - title / subtitle         : string
 */
export default function HeartbeatNTPSync({
  clientLabel = 'Client Agent',
  serverLabel = 'Ingestion Gateway',
  latency = '5 ms',
  interval = '30 s',
  title = 'Heartbeat / NTP Sync',
  subtitle = 'Continuous EKG-style pulse keeps client and server clocks in lockstep.',
}) {
  /* EKG waveform points — one full period of a heartbeat cycle */
  const ekgPoints = [
    '0,30 40,30 50,28 55,30 65,22 70,30 80,30',
    '80,30 110,30 120,28 125,30 130,10 135,50 140,18 145,30 155,30',
    '155,30 175,30 185,26 190,30 210,30',
    '210,30 240,30 250,28 255,30 260,10 265,50 270,18 275,30 285,30',
    '285,30 310,30 320,28 325,30 340,30',
    '340,30 370,30 380,28 385,30 390,10 395,50 400,18 405,30 415,30',
    '415,30 440,30 450,28 455,30 470,30',
  ].join(' ');

  return (
    <div className="feature-panel">
      <div className="feature-header">
        <span className="mono" style={styles.tag}>Live Instrument</span>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      <div className="hb-scene">
        {/* Client device */}
        <div className="hb-device">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="2" width="32" height="24" rx="3" stroke="var(--ink)" strokeWidth="1.5" fill="var(--surface-2)" />
            <line x1="14" y1="26" x2="14" y2="32" stroke="var(--muted)" strokeWidth="1.5" />
            <line x1="26" y1="26" x2="26" y2="32" stroke="var(--muted)" strokeWidth="1.5" />
            <line x1="10" y1="32" x2="30" y2="32" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="10" y="6" width="20" height="12" rx="1" fill="var(--teal)" opacity="0.25" />
            <circle cx="20" cy="12" r="3" fill="var(--teal)" opacity="0.7" className="hb-screen-pulse" />
          </svg>
          <span className="mono" style={styles.deviceLabel}>{clientLabel}</span>
        </div>

        {/* EKG waveform area */}
        <div className="hb-ekg-wrap">
          <div className="hb-grid-lines" />
          <svg className="hb-ekg-line" viewBox="0 0 470 60" preserveAspectRatio="none">
            <polyline
              points={ekgPoints}
              fill="none"
              stroke="var(--teal)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          {/* Traveling ping packets */}
          <div className="hb-packet hb-packet-right">
            <span className="mono" style={styles.packetLabel}>ping</span>
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="var(--brass)" /></svg>
          </div>
          <div className="hb-packet hb-packet-left">
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="var(--teal)" /></svg>
            <span className="mono" style={styles.packetLabel}>ack</span>
          </div>
        </div>

        {/* Server device */}
        <div className="hb-device">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="2" width="24" height="10" rx="2" stroke="var(--ink)" strokeWidth="1.5" fill="var(--surface-2)" />
            <circle cx="14" cy="7" r="1.5" fill="var(--teal)" className="hb-server-light" />
            <circle cx="20" cy="7" r="1.5" fill="var(--teal)" opacity="0.5" className="hb-server-light" style={{ animationDelay: '0.3s' }} />
            <circle cx="26" cy="7" r="1.5" fill="var(--brass)" opacity="0.4" />
            <rect x="8" y="14" width="24" height="10" rx="2" stroke="var(--ink)" strokeWidth="1.5" fill="var(--surface-2)" />
            <circle cx="14" cy="19" r="1.5" fill="var(--teal)" opacity="0.5" />
            <circle cx="20" cy="19" r="1.5" fill="var(--teal)" className="hb-server-light" style={{ animationDelay: '0.6s' }} />
            <circle cx="26" cy="19" r="1.5" fill="var(--teal)" opacity="0.4" className="hb-server-light" style={{ animationDelay: '0.9s' }} />
            <rect x="8" y="26" width="24" height="10" rx="2" stroke="var(--ink)" strokeWidth="1.5" fill="var(--surface-2)" />
            <circle cx="14" cy="31" r="1.5" fill="var(--brass)" opacity="0.3" />
            <circle cx="20" cy="31" r="1.5" fill="var(--teal)" opacity="0.4" />
            <circle cx="26" cy="31" r="1.5" fill="var(--teal)" className="hb-server-light" style={{ animationDelay: '1.2s' }} />
          </svg>
          <span className="mono" style={styles.deviceLabel}>{serverLabel}</span>
        </div>
      </div>

      {/* Metrics bar */}
      <div className="hb-metrics mono">
        <span>latency: <b style={{ color: 'var(--teal)' }}>{latency}</b></span>
        <span>interval: <b style={{ color: 'var(--ink)' }}>{interval}</b></span>
        <span className="hb-status-dot" /> <span style={{ color: 'var(--teal)' }}>synced</span>
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
        .feature-header p { font-size: 13px; color: var(--muted); margin-top: 6px; max-width: 480px; }

        .hb-scene {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 0;
        }
        .hb-device {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .hb-ekg-wrap {
          flex: 1;
          position: relative;
          height: 60px;
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 0 4px;
          animation: heartbeat-frame 2s ease-in-out infinite;
        }
        .hb-ekg-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: -20%;
          width: 18%;
          background: linear-gradient(90deg, transparent, rgba(95, 207, 192, 0.28), transparent);
          animation: ekg-scan 2.4s linear infinite;
          pointer-events: none;
        }
        @keyframes ekg-scan {
          from { left: -20%; }
          to { left: 105%; }
        }
        .hb-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 30px 15px;
          pointer-events: none;
        }
        .hb-ekg-line {
          width: 200%;
          height: 100%;
          animation: ekg-scroll 4s linear infinite;
        }
        @keyframes ekg-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hb-packet {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 2;
        }
        .hb-packet-right {
          animation: packet-right 2s ease-in-out infinite;
        }
        .hb-packet-left {
          animation: packet-left 2s ease-in-out infinite;
          animation-delay: 1s;
        }
        @keyframes packet-right {
          0%   { left: 5%;  opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 90%; opacity: 0; }
        }
        @keyframes packet-left {
          0%   { right: 5%;  opacity: 0; left: auto; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { right: 90%; opacity: 0; left: auto; }
        }
        .hb-screen-pulse {
          animation: screen-beat 1.2s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
          filter: drop-shadow(0 0 4px var(--teal));
        }
        @keyframes screen-beat {
          0%, 100% { opacity: 0.35; transform: scale(0.75); }
          45% { opacity: 1; transform: scale(1.35); }
        }
        @keyframes heartbeat-frame {
          0%, 100% { box-shadow: 0 0 0 rgba(95, 207, 192, 0); }
          42% { box-shadow: 0 0 16px rgba(95, 207, 192, 0.22); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; r: 2; }
          50% { opacity: 0.9; r: 4; }
        }
        .hb-server-light {
          animation: blink-light 3s ease-in-out infinite;
        }
        @keyframes blink-light {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .hb-metrics {
          display: flex;
          gap: 24px;
          font-size: 11px;
          color: var(--muted);
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          align-items: center;
        }
        .hb-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--teal);
          animation: status-beat 1.2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes status-beat {
          0%, 100% { transform: scale(0.8); box-shadow: 0 0 0 rgba(95, 207, 192, 0); }
          45% { transform: scale(1.5); box-shadow: 0 0 8px rgba(95, 207, 192, 0.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hb-ekg-line, .hb-packet-right, .hb-packet-left,
          .hb-screen-pulse, .hb-server-light, .hb-status-dot, .hb-ekg-wrap {
            animation: none !important;
          }
          .hb-ekg-wrap::after { display: none; }
          .hb-packet { display: none; }
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
  deviceLabel: {
    fontSize: 10,
    color: 'var(--muted)',
    textAlign: 'center',
    letterSpacing: '0.04em',
  },
  packetLabel: {
    fontSize: 9,
    color: 'var(--brass)',
    fontWeight: 500,
  },
};
