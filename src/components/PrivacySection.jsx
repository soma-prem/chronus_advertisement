import React from 'react';
import ScreenshotDemo from './ScreenshotDemo';

/**
 * PrivacySection — blurred screenshot demo + privacy feature list.
 *
 * Props:
 *  - eyebrow:  string
 *  - title:    string
 *  - items:    Array<{ title, description }>
 */
export default function PrivacySection({
  eyebrow = 'Built to disappear',
  title = 'The agent that redacts before it remembers',
  items = [
    {
      title: 'Screenshot captured',
      description: 'The screen is captured locally on your device.',
    },
    {
      title: 'Content blurred for privacy',
      description: 'Sensitive data and personal information are automatically blurred.',
    },
    {
      title: 'Storing in database',
      description: 'Only the privacy-safe, blurred images are securely stored in the database.',
    },
  ],
}) {
  return (
    <section id="privacy">
      <div className="privacy-grid wrap" style={{ padding: 0 }}>
        {/* Left — screenshot demo */}
        <ScreenshotDemo />

        {/* Right — feature list */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 0 }}>{eyebrow}</div>
          <h2 style={styles.title}>{title}</h2>
          <div style={styles.list}>
            {items.map((item, i) => (
              <div key={i} style={styles.item}>
                <span className="mono" style={styles.arrow}>
                  →
                </span>
                <div>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <p style={styles.itemDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .privacy-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 900px) { .privacy-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

const styles = {
  title: {
    fontSize: 34,
    marginBottom: 16,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
    marginTop: 32,
  },
  item: {
    display: 'flex',
    gap: 18,
  },
  arrow: {
    color: 'var(--brass)',
    fontSize: 13,
    paddingTop: 2,
    flexShrink: 0,
    width: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 6,
  },
  itemDesc: {
    fontSize: 14,
    color: 'var(--muted)',
    margin: 0,
    maxWidth: 440,
  },
};
