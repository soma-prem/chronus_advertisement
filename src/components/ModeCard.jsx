import React from 'react';

/**
 * ModeCard — a single card in the modes/modes grid.
 *
 * Props:
 *  - tag:        string  (e.g. "Strict compliance")
 *  - title:      string  (e.g. "Managed endpoint")
 *  - audience:   string  (e.g. "Security · Audit · HR")
 *  - featured:   boolean
 *  - stats:      Array<{ label, value }>
 *  - description:string
 */
export default function ModeCard({
  tag,
  title,
  audience,
  featured = false,
  stats = [],
  description,
}) {
  return (
    <div
      className={`mode-card${featured ? ' featured' : ''}`}
      style={styles.card}
    >
      <span className="mode-tag" style={styles.modeTag}>{tag}</span>
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.who}>{audience}</div>

      <div style={styles.statsContainer}>
        {stats.map((s, i) => (
          <div key={i} className="mode-stat" style={styles.modeStat}>
            <span>{s.label}</span>
            <span>{s.value}</span>
          </div>
        ))}
      </div>

      <p style={styles.desc}>{description}</p>

      <style>{`
        .mode-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 28px 26px;
          position: relative;
        }
        .mode-card.featured { border-color: var(--brass-dim); }
        .mode-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brass);
          margin-bottom: 10px;
          display: block;
        }
        .mode-card h3 {
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .mode-stat {
          display: flex;
          justify-content: space-between;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          border-bottom: 1px dashed var(--line);
          padding-bottom: 8px;
        }
        .mode-stat span:first-child { color: var(--muted); }
      `}</style>
    </div>
  );
}

const styles = {
  card: {},
  modeTag: {},
  title: {},
  who: {
    fontSize: 13,
    color: 'var(--muted)',
    marginBottom: 22,
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 22,
  },
  modeStat: {},
  desc: {
    fontSize: '13.5px',
    color: 'var(--muted)',
    lineHeight: 1.6,
    margin: 0,
  },
};
