import React from 'react';
import TierBlock from './TierBlock';

/**
 * ArchitectureSection — three-tier architecture diagram.
 *
 * Props:
 *  - eyebrow:  string
 *  - title:    string
 *  - subtitle: string
 *  - tiers:    Array<{ label, badges, accent? }>
 */
export default function ArchitectureSection({
  eyebrow = 'Under the hood',
  title = 'Three tiers, one small binary',
  subtitle = 'Nothing about Chronos is a monolith. Each tier does one job, and the desktop client stays small on purpose.',
  tiers = [
    {
      label: 'Desktop client — Tauri shell (Rust)',
      accent: true,
      badges: [
        'Win32 / Quartz / X11 / Wayland hooks',
        'Client-side blur engine',
        'Encrypted SQLite (WAL) buffer',
      ],
    },
    {
      label: 'Ingestion gateway',
      accent: false,
      badges: ['mTLS + token auth', 'REST / WebSocket cluster', 'Redis rate limiting'],
    },
    {
      label: 'Processing & storage',
      accent: false,
      badges: ['TimescaleDB hypertables', 'Redis session state', 'S3 — encrypted, blurred images only'],
    },
  ],
}) {
  return (
    <section id="architecture">
      <div className="section-head wrap" style={{ padding: 0, margin: '0 auto 56px' }}>
        <div className="eyebrow" style={{ marginBottom: 0 }}>{eyebrow}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="arch-wrap">
        {tiers.map((tier, i) => (
          <React.Fragment key={i}>
            <TierBlock label={tier.label} badges={tier.badges} accent={tier.accent} />
            {i < tiers.length - 1 && <div className="arch-connector" />}
          </React.Fragment>
        ))}
      </div>

      <style>{`
        .arch-wrap { max-width: 900px; margin: 0 auto; }
        .arch-connector {
          display: flex;
          justify-content: center;
          padding: 10px 0;
        }
        .arch-connector::before {
          content: '';
          width: 1px;
          height: 26px;
          background: var(--line);
        }
      `}</style>
    </section>
  );
}
