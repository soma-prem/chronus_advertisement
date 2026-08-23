import React from 'react';
import HeartbeatNTPSync from './features/HeartbeatNTPSync';
import ClockManipulationDetection from './features/ClockManipulationDetection';
import DepartmentPolicyOverrides from './features/DepartmentPolicyOverrides';
import IPWhitelisting from './features/IPWhitelisting';
import WaylandFallback from './features/WaylandFallback';
import PIIRedaction from './features/PIIRedaction';
import OfflineCacheOverflow from './features/OfflineCacheOverflow';

/**
 * FeaturesShowcase — assembles all 7 animated feature panels into a
 * two-column grid section. Drop this into App.jsx wherever you want
 * the features to appear.
 *
 * Props:
 *  - eyebrow  : string
 *  - title    : string
 *  - subtitle : string
 */
export default function FeaturesShowcase({
  eyebrow = 'Under the surface',
  title = 'Seven instruments that make it work',
  subtitle = 'Each animation below maps to a real subsystem inside the Chronos agent. No fluff — every visual is a working architectural decision.',
}) {
  return (
    <section id="features">
      <div className="section-head wrap" style={{ padding: 0, marginBottom: 56 }}>
        <div className="eyebrow" style={{ marginBottom: 0 }}>{eyebrow}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="features-grid wrap" style={styles.grid}>
        <div className="feature-card feature-card-lead" style={styles.full}>
          <PIIRedaction />
        </div>

        <div className="feature-card" style={styles.half}>
          <HeartbeatNTPSync />
        </div>
        <div className="feature-card" style={styles.half}>
          <ClockManipulationDetection />
        </div>

        <div className="feature-card feature-card-wide" style={styles.full}>
          <DepartmentPolicyOverrides />
        </div>

        <div className="feature-card" style={styles.half}>
          <IPWhitelisting />
        </div>
        <div className="feature-card" style={styles.half}>
          <WaylandFallback />
        </div>

        <div className="feature-card feature-card-wide" style={styles.full}>
          <OfflineCacheOverflow />
        </div>
      </div>

      <style>{`
        .features-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }
        .feature-card {
          min-width: 0;
          display: flex;
        }
        .feature-card > .feature-panel {
          width: 100%;
        }
        .feature-card-lead,
        .feature-card-wide {
          min-height: 380px;
        }
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .features-grid > div {
            grid-column: 1 !important;
          }
          .feature-card-lead,
          .feature-card-wide {
            min-height: 0;
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  grid: {},
  full: { gridColumn: '1 / -1' },
  half: {},
};
