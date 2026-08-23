import React from 'react';

/**
 * ProblemCard — a single card in the problem grid.
 *
 * Props:
 *  - index: string (e.g. "01", "02")
 *  - title: string
 *  - description: string
 */
export default function ProblemCard({ index, title, description }) {
  return (
    <div className="p-card">
      <div className="ico" style={styles.ico}>
        {index}
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.desc}>{description}</p>

      <style>{`
        .p-card {
          background: var(--surface);
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .p-card .ico {
          width: 34px;
          height: 34px;
          border: 1px solid var(--line);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brass);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}

const styles = {
  ico: {},
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  desc: {
    fontSize: '13.8px',
    color: 'var(--muted)',
    margin: 0,
  },
};
