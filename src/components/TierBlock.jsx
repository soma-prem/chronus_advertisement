import React from 'react';

/**
 * TierBlock — a single tier in the architecture diagram.
 *
 * Props:
 *  - label:  string   (e.g. "Desktop client — Tauri shell (Rust)")
 *  - badges: Array<string>  — text for each badge
 *  - accent: boolean — if true, badges get the brass accent style
 */
export default function TierBlock({ label, badges = [], accent = false }) {
  return (
    <div className="tier">
      <div className="tier-label" style={styles.tierLabel}>
        {label}
      </div>
      <div className="badge-row" style={styles.badgeRow}>
        {badges.map((text, i) => (
          <span
            key={i}
            className={`badge${accent ? ' accent' : ''}`}
          >
            {text}
          </span>
        ))}
      </div>

      <style>{`
        .tier {
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          padding: 20px 24px;
          margin-bottom: 0;
        }
        .tier-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 14px;
        }
        .badge-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--ink);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 6px 14px;
          background: var(--surface-2);
        }
        .badge.accent {
          border-color: var(--brass-dim);
          color: var(--brass);
        }
      `}</style>
    </div>
  );
}

const styles = {
  tierLabel: {},
  badgeRow: {},
};
