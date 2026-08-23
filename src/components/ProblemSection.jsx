import React from 'react';
import ProblemCard from './ProblemCard';

/**
 * ProblemSection — "Four ways legacy agents fail you" grid.
 *
 * Props:
 *  - eyebrow: string
 *  - title:   string
 *  - subtitle:string
 *  - cards:   Array<{ index, title, description }>
 */
export default function ProblemSection({
  eyebrow = 'Why teams replace their current tool',
  title = 'Four ways legacy agents fail you',
  subtitle = 'Every one of these is a reason procurement gets stuck. Chronos was built to remove all four at once, not trade one for another.',
  cards = [
    {
      index: '01',
      title: 'Resource bloat',
      description: 'Electron-based agents idle at 300–800MB RAM and spike CPU under load, until IT starts fielding complaints. Chronos idles under 30MB.',
    },
    {
      index: '02',
      title: 'Privacy friction',
      description: 'Unblurred screen scraping and keylogging erode trust fast, and put you on the wrong side of GDPR and CCPA. Chronos redacts before anything leaves the device.',
    },
    {
      index: '03',
      title: 'Fragile cross-platform support',
      description: 'Most agents break the moment IT rolls out Wayland on Ubuntu or RHEL. Chronos speaks X11, Wayland, Win32, and Quartz natively, with graceful fallbacks.',
    },
    {
      index: '04',
      title: 'Data loss offline',
      description: 'Naive local buffering drops logs or corrupts the database on a bad network day. Chronos writes to an encrypted, write-ahead-logged queue built to survive it.',
    },
  ],
}) {
  return (
    <section id="problem">
      <div className="section-head wrap" style={{ padding: 0 }}>
        <div className="eyebrow" style={{ marginBottom: 0 }}>{eyebrow}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <ProblemCard
            key={card.index}
            index={card.index}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      <style>{`
        .card-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }
        @media (max-width: 900px) { .card-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .card-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
