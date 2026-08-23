import React from 'react';
import ModeCard from './ModeCard';

/**
 * ModesSection — "One agent, three calibrations" grid.
 *
 * Props:
 *  - eyebrow:  string
 *  - title:    string
 *  - subtitle: string
 *  - modes:    Array<ModeCard props>
 */
export default function ModesSection({
  eyebrow = 'One agent, three calibrations',
  title = 'Set the instrument to the role, not the other way around',
  subtitle = 'Security teams, hybrid employees, and contractors need different levels of tracking. Chronos ships three built-in modes — no separate installers.',
  modes = [
    {
      tag: 'Strict compliance',
      title: 'Managed endpoint',
      audience: 'Security · Audit · HR',
      featured: false,
      stats: [
        { label: 'Memory', value: '< 35 MB' },
        { label: 'Sync interval', value: '30s · WebSocket' },
        { label: 'Local toggle', value: 'none' },
      ],
      description: 'Continuous background tracking with mandatory offline sync and an automatic lock on clock-out. No employee-facing override.',
    },
    {
      tag: 'Privacy-first',
      title: 'Hybrid work',
      audience: 'Standard employee · Team lead',
      featured: true,
      stats: [
        { label: 'Memory', value: '< 45 MB' },
        { label: 'Sync interval', value: '120s · REST batch' },
        { label: 'Local toggle', value: 'manual pause' },
      ],
      description: 'Opt-in tracking outside working hours, blur enforced on every screenshot, and a pause button that actually pauses.',
    },
    {
      tag: 'Lightweight',
      title: 'Contractor mode',
      audience: 'Freelancer · Contractor',
      featured: false,
      stats: [
        { label: 'Memory', value: '< 25 MB' },
        { label: 'Sync interval', value: '300s · periodic push' },
        { label: 'Local toggle', value: 'start / stop' },
      ],
      description: 'Session bound to an explicit start and stop. Nothing runs, nothing is recorded, when the window is closed.',
    },
  ],
}) {
  return (
    <section id="modes">
      <div className="section-head wrap" style={{ padding: 0 }}>
        <div className="eyebrow" style={{ marginBottom: 0 }}>{eyebrow}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="mode-grid">
        {modes.map((mode, i) => (
          <ModeCard key={i} {...mode} />
        ))}
      </div>

      <style>{`
        .mode-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) { .mode-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
