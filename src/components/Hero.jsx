import React from 'react';
import GaugePanel from './GaugePanel';

/**
 * Hero — main hero section with headline, lead copy, CTAs, stats, and gauge.
 *
 * Props (all optional for easy customization):
 *  - eyebrow:     string
 *  - headline:    string  (supports <em> for accent)
 *  - lead:        string
 *  - ctaPrimary:  { label, href }
 *  - ctaSecondary:{ label, href }
 *  - stats:       Array<{ value, label }>
 */
export default function Hero({
  eyebrow = 'Endpoint analytics, instrumented',
  headline = <><span>Measured. </span><em>Not monitored.</em></>,
  lead = 'Chronos is a native Rust agent that shows you where the workday goes — without the bloat, the blind spots, or the surveillance-state feeling of the tool you\'re replacing.',
  ctaPrimary = { label: 'Request a demo', href: '#cta' },
  ctaSecondary = { label: 'Read the architecture ↓', href: '#architecture' },
  stats = [
    { value: '<30 MB', label: 'idle memory' },
    { value: '<0.5%', label: 'idle CPU' },
    { value: '3', label: 'platforms, one binary' },
  ],
}) {
  return (
    <section className="hero" style={styles.section}>
      <div className="ticks" />
      <div style={styles.grid}>
        {/* Left column — copy */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 0 }}>{eyebrow}</div>
          <h1 style={styles.h1}>{headline}</h1>
          <p className="lead" style={styles.lead}>{lead}</p>
          <div style={styles.ctas}>
            <a href={ctaPrimary.href} className="btn btn-primary">
              {ctaPrimary.label}
            </a>
            <a href={ctaSecondary.href} className="btn btn-ghost">
              {ctaSecondary.label}
            </a>
            <a href="#features" className="btn btn-ghost">
              See feature animations ↓
            </a>
          </div>
          <div style={styles.statRow}>
            {stats.map((s, i) => (
              <div key={i} className="stat-chip" style={styles.statChip}>
                <b>{s.value}</b>
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — gauge instrument */}
        <GaugePanel />
      </div>

      <style>{`
        .hero {
          position: relative;
          padding: 96px 32px 80px;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
        }
        .hero h1 {
          font-size: clamp(38px, 5vw, 60px);
          font-weight: 600;
          line-height: 1.05;
          margin-bottom: 22px;
        }
        .hero h1 em {
          font-style: normal;
          color: var(--brass);
        }
        .hero p.lead {
          font-size: 17px;
          color: var(--muted);
          max-width: 480px;
          margin-bottom: 34px;
        }
        .stat-row { display: flex; gap: 28px; flex-wrap: wrap; }
        .stat-chip {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: var(--muted);
          border-left: 2px solid var(--line);
          padding-left: 12px;
        }
        .stat-chip b {
          color: var(--ink);
          display: block;
          font-size: 16px;
          margin-bottom: 2px;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {},
  grid: {
    maxWidth: 1180,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr',
    gap: 56,
    alignItems: 'center',
  },
  h1: {},
  lead: {},
  ctas: {
    display: 'flex',
    gap: 14,
    marginBottom: 40,
    flexWrap: 'wrap',
  },
  statRow: {
    display: 'flex',
    gap: 28,
    flexWrap: 'wrap',
  },
  statChip: {},
};
