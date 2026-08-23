import React from 'react';

/**
 * WaylandFallback — A door (Wayland security) slams shut on a window icon,
 * blurring its title, but a side window (DBus portal / shell extension) creaks
 * open instead, letting a silhouette of the app icon still get through.
 *
 * Props:
 *  - title / subtitle : string
 *  - doorLabel / portalLabel / windowTitle : string
 */
export default function WaylandFallback({
  title = 'Wayland / Linux Fallback Handling',
  subtitle = 'When Wayland blocks direct screen capture, Chronos falls back to DBus portals and shell extensions — graceful degradation, not total failure.',
  doorLabel = 'Wayland Security',
  portalLabel = 'DBus Portal',
  windowTitle = 'Invoice #1042 — Acme Corp',
}) {
  return (
    <div className="feature-panel">
      <div className="feature-header">
        <span className="mono" style={styles.tag}>Platform Layer</span>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      <div className="wlf-scene">
        {/* Direct capture path (blocked) */}
        <div className="wlf-path wlf-path-direct">
          <div className="wlf-path-label mono" style={styles.pathLabel}>Direct Capture</div>
          <div className="wlf-window-frame">
            <div className="wlf-titlebar">
              <span /><span /><span />
              <span className="wlf-window-title">{windowTitle}</span>
            </div>
            <div className="wlf-window-body">
              <div className="wlf-fake-line w60" />
              <div className="wlf-fake-line w40" />
              <div className="wlf-fake-line w80" />
            </div>
          </div>

          {/* Door that slams shut */}
          <div className="wlf-door">
            <div className="wlf-door-face">
              <div className="wlf-door-lock">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="10" width="14" height="11" rx="2" stroke="var(--danger)" strokeWidth="1.5" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="var(--danger)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1.5" fill="var(--danger)" />
                </svg>
              </div>
              <span className="wlf-door-text mono">{doorLabel}</span>
            </div>
          </div>

          {/* X mark appears when blocked */}
          <div className="wlf-blocked-x">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="none" stroke="var(--danger)" strokeWidth="2.5" />
              <line x1="10" y1="10" x2="22" y2="22" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="10" x2="10" y2="22" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Arrow indicating fallback */}
        <div className="wlf-arrow">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
            <path d="M2 12h30m0 0l-8-8m8 8l-8 8" stroke="var(--brass)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="mono" style={styles.arrowLabel}>fallback</span>
        </div>

        {/* Portal path (opens) */}
        <div className="wlf-path wlf-path-portal">
          <div className="wlf-path-label mono" style={styles.pathLabel}>Portal Fallback</div>
          <div className="wlf-portal-frame">
            <div className="wlf-portal-door">
              <span className="wlf-portal-text mono">{portalLabel}</span>
            </div>
            {/* Silhouette passes through */}
            <div className="wlf-silhouette">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="8" r="5" fill="var(--teal)" opacity="0.5" />
                <path d="M6 26c0-5 3.5-9 8-9s8 4 8 9" fill="var(--teal)" opacity="0.3" />
              </svg>
            </div>
            {/* Blurred but captured data */}
            <div className="wlf-captured-data">
              <div className="wlf-fake-line w60" />
              <div className="wlf-fake-line w40" />
              <span className="wlf-blur-badge mono">[BLURRED]</span>
            </div>
          </div>
          {/* Check mark */}
          <div className="wlf-passed-check">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" fill="none" stroke="var(--teal)" strokeWidth="2" />
              <path d="M8 14l4 4 8-8" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="wlf-timeline mono" style={styles.timeline}>
        <span><span style={styles.stepNum}>1</span> Wayland blocks direct capture</span>
        <span><span style={styles.stepNum}>2</span> Falls back to DBus / shell extension</span>
        <span><span style={styles.stepNum}>3</span> Capture continues with blur applied</span>
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

        .wlf-scene {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 0;
          justify-content: center;
          flex-wrap: wrap;
        }
        .wlf-path {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .wlf-path-label {
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Window frame */
        .wlf-window-frame {
          width: 180px;
          background: var(--surface-2);
          border: 1px solid var(--line);
          border-radius: 6px;
          overflow: hidden;
          animation: window-fade 6s ease infinite;
        }
        @keyframes window-fade {
          0%, 15%  { opacity: 1; }
          30%, 70% { opacity: 0.3; filter: blur(2px); }
          85%, 100%{ opacity: 1; }
        }
        .wlf-titlebar {
          display: flex; gap: 4px; padding: 8px 10px; align-items: center;
          border-bottom: 1px solid var(--line);
        }
        .wlf-titlebar span:first-child,
        .wlf-titlebar span:nth-child(2),
        .wlf-titlebar span:nth-child(3) {
          width: 7px; height: 7px; border-radius: 50%; background: var(--line);
        }
        .wlf-window-title {
          margin-left: 6px;
          font-size: 9px;
          color: var(--muted);
          animation: title-blur 6s ease infinite;
        }
        @keyframes title-blur {
          0%, 15%  { filter: none; }
          30%, 70% { filter: blur(4px); color: transparent; }
          85%, 100%{ filter: none; }
        }
        .wlf-window-body { padding: 10px; display: flex; flex-direction: column; gap: 6px; }
        .wlf-fake-line { height: 6px; background: var(--line); border-radius: 2px; }
        .wlf-fake-line.w60 { width: 60%; }
        .wlf-fake-line.w40 { width: 40%; }
        .wlf-fake-line.w80 { width: 80%; }

        /* Door */
        .wlf-door {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          perspective: 400px;
          pointer-events: none;
          border-radius: 6px;
          overflow: hidden;
        }
        .wlf-door-face {
          width: 100%; height: 100%;
          background: rgba(18, 21, 26, 0.92);
          border: 1px solid var(--danger);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transform-origin: left center;
          animation: door-slam 6s ease infinite;
        }
        @keyframes door-slam {
          0%   { transform: rotateY(-90deg); opacity: 0; }
          15%  { transform: rotateY(0deg); opacity: 1; }
          70%  { transform: rotateY(0deg); opacity: 1; }
          85%  { transform: rotateY(-90deg); opacity: 0; }
          100% { transform: rotateY(-90deg); opacity: 0; }
        }
        .wlf-door-text {
          font-size: 10px;
          color: var(--danger);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Blocked X */
        .wlf-blocked-x {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0) rotate(-20deg);
          animation: x-appear 6s ease infinite;
          pointer-events: none;
        }
        @keyframes x-appear {
          0%, 18%  { transform: translate(-50%, -50%) scale(0) rotate(-20deg); opacity: 0; }
          25%      { transform: translate(-50%, -50%) scale(1.2) rotate(-20deg); opacity: 1; }
          30%, 65%{ transform: translate(-50%, -50%) scale(1) rotate(-20deg); opacity: 1; }
          72%      { transform: translate(-50%, -50%) scale(0) rotate(-20deg); opacity: 0; }
          100%     { transform: translate(-50%, -50%) scale(0) rotate(-20deg); opacity: 0; }
        }

        /* Arrow */
        .wlf-arrow {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          animation: arrow-pulse 6s ease infinite;
        }
        @keyframes arrow-pulse {
          0%, 40%  { opacity: 0.2; }
          50%, 80% { opacity: 1; }
          90%, 100%{ opacity: 0.2; }
        }

        /* Portal frame */
        .wlf-portal-frame {
          width: 180px;
          min-height: 100px;
          background: var(--surface-2);
          border: 1px solid var(--line);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        .wlf-portal-door {
          padding: 10px;
          border-bottom: 1px solid var(--line);
          transform-origin: left center;
          animation: portal-open 6s ease infinite;
        }
        @keyframes portal-open {
          0%, 45%  { transform: rotateY(80deg); opacity: 0; }
          55%      { transform: rotateY(0deg); opacity: 1; }
          80%      { transform: rotateY(0deg); opacity: 1; }
          90%, 100%{ transform: rotateY(80deg); opacity: 0; }
        }
        .wlf-portal-text {
          font-size: 10px;
          color: var(--teal);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .wlf-silhouette {
          position: absolute;
          top: 40px; left: 50%;
          transform: translateX(-50%);
          animation: silhouette-pass 6s ease infinite;
          opacity: 0;
        }
        @keyframes silhouette-pass {
          0%, 55%  { opacity: 0; transform: translateX(-50%) translateX(-30px); }
          65%      { opacity: 0.8; transform: translateX(-50%) translateX(0); }
          80%      { opacity: 0.8; }
          90%, 100%{ opacity: 0; }
        }
        .wlf-captured-data {
          padding: 10px;
          display: flex; flex-direction: column; gap: 6px;
          opacity: 0;
          animation: data-appear 6s ease infinite;
        }
        @keyframes data-appear {
          0%, 60%  { opacity: 0; }
          70%, 85% { opacity: 1; }
          95%, 100%{ opacity: 0; }
        }
        .wlf-blur-badge {
          font-size: 9px;
          color: var(--teal);
          background: rgba(95, 207, 192, 0.1);
          padding: 2px 6px;
          border-radius: 3px;
          align-self: flex-start;
        }

        /* Check mark */
        .wlf-passed-check {
          position: absolute;
          bottom: -8px; right: -8px;
          animation: check-pop 6s ease infinite;
          opacity: 0;
        }
        @keyframes check-pop {
          0%, 70%  { opacity: 0; transform: scale(0); }
          78%      { opacity: 1; transform: scale(1.2); }
          85%, 95%{ opacity: 1; transform: scale(1); }
          100%     { opacity: 0; transform: scale(0); }
        }

        /* Timeline */
        .wlf-timeline {
          display: flex; gap: 24px; font-size: 11px; color: var(--muted);
          margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line);
          flex-wrap: wrap; justify-content: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .wlf-door-face, .wlf-portal-door, .wlf-silhouette,
          .wlf-captured-data, .wlf-blocked-x, .wlf-passed-check,
          .wlf-arrow, .wlf-window-frame, .wlf-window-title {
            animation: none !important;
          }
        }
        @media (max-width: 640px) {
          .wlf-scene { flex-direction: column; }
          .wlf-arrow svg { transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  tag: { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brass)' },
  title: {},
  subtitle: {},
  pathLabel: {},
  arrowLabel: { fontSize: 10, color: 'var(--brass)' },
  timeline: {},
  stepNum: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 16, height: 16, borderRadius: '50%',
    background: 'var(--brass)', color: '#181A1F',
    fontSize: 10, fontWeight: 600, marginRight: 6,
  },
};
