import React from 'react';

/**
 * PIIRedaction — A screenshot develops like Polaroid film; a black marker
 * sweeps across sensitive lines, redacting them in real time. Then the whole
 * image passes through a frosted-glass blur filter before landing in a vault.
 *
 * Props:
 *  - title / subtitle : string
 *  - sensitiveLines    : Array<string>  (text shown before redaction)
 *  - safeLines         : Array<string>  (text that stays visible)
 */
export default function PIIRedaction({
  title = 'PII Redaction & Screenshot Blurring',
  subtitle = 'Raw frames never exist on disk or on the wire. Gaussian blur in Rust, regex-based PII scrubbing, and HMAC-SHA256 integrity — all before a single byte leaves the device.',
  sensitiveLines = ['ssn: 432-11-7890', 'card: 4532 •••• •••• 9012', 'email: j.smith@acme.com'],
  safeLines = ['Window: Invoice Manager', 'Process: Chrome Renderer', 'Timestamp: 14:22:07 UTC'],
}) {
  return (
    <div className="feature-panel">
      <div className="feature-header">
        <span className="mono" style={styles.tag}>Privacy Engine</span>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      <div className="pii-scene">
        {/* Stage 1: Polaroid develops */}
        <div className="pii-stage pii-stage-1">
          <div className="pii-polaroid">
            <div className="pii-polaroid-inner">
              {/* Fake screen content */}
              <div className="pii-lines">
                {safeLines.map((line, i) => (
                  <div key={`safe-${i}`} className="pii-line pii-line-safe mono" style={styles.safeLine}>{line}</div>
                ))}
                {sensitiveLines.map((line, i) => (
                  <div key={`sens-${i}`} className="pii-line pii-line-sensitive mono" style={styles.sensLine}>{line}</div>
                ))}
                {safeLines.slice(0, 2).map((line, i) => (
                  <div key={`safe2-${i}`} className="pii-line pii-line-safe mono" style={{ ...styles.safeLine, opacity: 0.6 }}>{line}</div>
                ))}
              </div>

              {/* Marker sweep overlay */}
              <div className="pii-marker">
                <div className="pii-marker-head" />
                <div className="pii-marker-body" />
              </div>
            </div>

            {/* Polaroid label */}
            <div className="pii-polaroid-label mono">CAPTURE 14:22:07</div>
          </div>
          <div className="pii-stage-label mono" style={styles.stageLabel}>1. Raw capture</div>
        </div>

        {/* Arrow */}
        <div className="pii-arrow">
          <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
            <path d="M2 10h24m0 0l-6-6m6 6l-6 6" stroke="var(--brass)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Stage 2: Redacted + blurred */}
        <div className="pii-stage pii-stage-2">
          <div className="pii-polaroid">
            <div className="pii-polaroid-inner pii-blurred">
              <div className="pii-lines">
                {safeLines.map((line, i) => (
                  <div key={`safe-${i}`} className="pii-line pii-line-safe mono" style={{ ...styles.safeLine, opacity: 0.5 }}>{line}</div>
                ))}
                {sensitiveLines.map((line, i) => (
                  <div key={`redacted-${i}`} className="pii-redacted mono">[REDACTED]</div>
                ))}
                {safeLines.slice(0, 2).map((line, i) => (
                  <div key={`safe2-${i}`} className="pii-line pii-line-safe mono" style={{ ...styles.safeLine, opacity: 0.3 }}>{line}</div>
                ))}
              </div>
            </div>
            <div className="pii-polaroid-label mono">BLURRED + REDACTED</div>
          </div>
          <div className="pii-stage-label mono" style={styles.stageLabel}>2. Redacted & blurred</div>
        </div>

        {/* Arrow */}
        <div className="pii-arrow">
          <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
            <path d="M2 10h24m0 0l-6-6m6 6l-6 6" stroke="var(--brass)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Stage 3: Vault */}
        <div className="pii-stage pii-stage-3">
          <div className="pii-vault">
            <div className="pii-vault-body">
              <div className="pii-vault-door">
                <div className="pii-vault-handle" />
              </div>
              {/* Mini blurred image inside */}
              <div className="pii-vault-content">
                <div className="pii-vault-mini-img" />
              </div>
            </div>
            <div className="pii-vault-base" />
          </div>
          <div className="pii-stage-label mono" style={styles.stageLabel}>3. Secure storage (S3)</div>
        </div>
      </div>

      {/* Pipeline labels */}
      <div className="pii-pipeline mono" style={styles.pipeline}>
        <span>Gaussian Blur (Rust)</span>
        <span style={{ color: 'var(--brass)' }}>→</span>
        <span>Regex PII Scrub</span>
        <span style={{ color: 'var(--brass)' }}>→</span>
        <span>HMAC-SHA256</span>
        <span style={{ color: 'var(--brass)' }}>→</span>
        <span style={{ color: 'var(--teal)' }}>Encrypted Upload</span>
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

        .pii-scene {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          padding: 20px 0;
          flex-wrap: wrap;
        }
        .pii-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .pii-stage-label {
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .pii-arrow {
          padding-top: 50px;
          opacity: 0.5;
        }

        /* Polaroid frame */
        .pii-polaroid {
          background: #F5F2EB;
          padding: 8px 8px 28px;
          border-radius: 3px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
          position: relative;
        }
        .pii-polaroid-inner {
          width: 160px;
          height: 100px;
          background: #282E39;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }
        .pii-polaroid-label {
          position: absolute;
          bottom: 6px;
          left: 0; right: 0;
          text-align: center;
          font-size: 8px;
          color: #666;
          letter-spacing: 0.1em;
        }

        /* Content lines */
        .pii-lines {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pii-line {
          height: 10px;
          border-radius: 2px;
          font-size: 7px;
          display: flex;
          align-items: center;
          padding: 0 4px;
          white-space: nowrap;
          overflow: hidden;
        }
        .pii-line-safe { background: rgba(255,255,255,0.06); color: var(--muted); }
        .pii-line-sensitive { background: rgba(255,255,255,0.06); color: var(--danger); }

        /* Marker sweep */
        .pii-marker {
          position: absolute;
          top: 0; bottom: 0;
          width: 24px;
          animation: marker-sweep 5s ease-in-out infinite;
          z-index: 3;
        }
        .pii-marker-head {
          width: 24px; height: 12px;
          background: #1a1a1a;
          border-radius: 2px 2px 0 0;
          position: relative;
        }
        .pii-marker-head::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 16px; height: 4px;
          background: #333;
          border-radius: 0 0 2px 2px;
        }
        .pii-marker-body {
          flex: 1;
          background: #1a1a1a;
          width: 8px;
          margin: 0 auto;
          border-radius: 0 0 1px 1px;
        }
        @keyframes marker-sweep {
          0%   { left: -30px; opacity: 0; }
          8%   { opacity: 1; }
          35%  { left: 140px; }
          45%  { left: 140px; opacity: 1; }
          55%  { left: 140px; opacity: 0; }
          100% { left: 140px; opacity: 0; }
        }

        /* Redacted lines */
        .pii-redacted {
          height: 10px;
          background: var(--brass);
          color: #181A1F;
          font-size: 7px;
          display: flex;
          align-items: center;
          padding: 0 4px;
          border-radius: 2px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        /* Blurred stage */
        .pii-blurred {
          animation: blur-in 5s ease infinite;
        }
        @keyframes blur-in {
          0%, 38%  { filter: blur(0px); }
          48%, 80%{ filter: blur(3px); }
          90%, 100%{ filter: blur(0px); }
        }

        /* Vault */
        .pii-vault {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pii-vault-body {
          width: 100px;
          height: 90px;
          background: linear-gradient(135deg, #2A3040, #1E2430);
          border: 1.5px solid var(--line);
          border-radius: 4px 4px 0 0;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pii-vault-door {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #2A3040, #252B38);
          border-right: 1px solid var(--line);
          animation: vault-door 5s ease infinite;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 12px;
        }
        @keyframes vault-door {
          0%, 65%  { transform: translateX(0); }
          75%, 90%{ transform: translateX(-60%); }
          100%     { transform: translateX(0); }
        }
        .pii-vault-handle {
          width: 6px; height: 20px;
          border: 1.5px solid var(--brass);
          border-radius: 3px;
        }
        .pii-vault-content {
          z-index: 1;
          animation: vault-content-appear 5s ease infinite;
          opacity: 0;
        }
        @keyframes vault-content-appear {
          0%, 68%  { opacity: 0; }
          78%, 92%{ opacity: 1; }
          100%     { opacity: 0; }
        }
        .pii-vault-mini-img {
          width: 48px;
          height: 32px;
          background: var(--surface-2);
          border: 1px solid var(--line);
          border-radius: 2px;
          filter: blur(2px);
        }
        .pii-vault-base {
          width: 108px;
          height: 8px;
          background: linear-gradient(180deg, #2A3040, #1E2430);
          border: 1.5px solid var(--line);
          border-top: none;
          border-radius: 0 0 4px 4px;
        }

        /* Pipeline */
        .pii-pipeline {
          display: flex;
          gap: 10px;
          font-size: 10px;
          color: var(--muted);
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .pii-marker, .pii-blurred, .pii-vault-door,
          .pii-vault-content { animation: none !important; }
          .pii-marker { display: none; }
          .pii-blurred { filter: blur(3px); }
          .pii-vault-door { transform: translateX(-60%); }
          .pii-vault-content { opacity: 1; }
        }
        @media (max-width: 700px) {
          .pii-scene { flex-direction: column; align-items: center; }
          .pii-arrow { transform: rotate(90deg); padding-top: 0; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  tag: { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brass)' },
  title: {},
  subtitle: {},
  safeLine: { color: 'var(--muted)' },
  sensLine: { color: 'var(--ink)' },
  stageLabel: {},
  pipeline: {},
};
