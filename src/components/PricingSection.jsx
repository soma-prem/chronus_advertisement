import React from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';

const plans = [
  {
    name: 'Signal',
    description: 'Core visibility for focused teams.',
    price: '$8',
    suffix: 'per user / month',
    features: ['Application and website activity', 'Team-level productivity trends', '30-day data retention'],
    action: 'Start with Signal',
  },
  {
    name: 'Control',
    description: 'The complete operating picture for growing teams.',
    price: '$14',
    suffix: 'per user / month',
    features: ['Everything in Signal', 'Department policies and alerts', 'Unlimited historical insights'],
    action: 'Choose Control',
    featured: true,
  },
  {
    name: 'Command',
    description: 'Governance and scale for distributed organizations.',
    price: 'Custom',
    suffix: 'tailored to your estate',
    features: ['Everything in Control', 'SSO, SCIM, and audit exports', 'Dedicated rollout support'],
    action: 'Talk to sales',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="pricing-section" style={styles.section}>
      <div className="wrap" style={styles.wrap}>
        <div className="section-head" style={styles.sectionHead}>
          <div className="eyebrow">Pricing that scales with signal</div>
          <h2 style={styles.heading}>Choose the level of visibility your team needs.</h2>
          <p style={styles.intro}>
            Start with the essentials, add operational control when you need it, and keep privacy at the center of every plan.
          </p>
        </div>

        <div className="pricing-grid" style={styles.grid}>
          {plans.map((plan) => (
            <article key={plan.name} className={`pricing-card${plan.featured ? ' pricing-card-featured' : ''}`} style={styles.card}>
              {plan.featured && <div style={styles.recommended}>Recommended</div>}
              <div style={styles.cardTop}>
                <div>
                  <p style={styles.planLabel}>{plan.name}</p>
                  <p style={styles.description}>{plan.description}</p>
                </div>
                {plan.featured && <ShieldCheck size={22} color="var(--teal)" aria-label="Privacy-first plan" />}
              </div>
              <div style={styles.priceRow}>
                <strong style={styles.price}>{plan.price}</strong>
                <span style={styles.suffix}>{plan.suffix}</span>
              </div>
              <ul style={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature} style={styles.feature}>
                    <Check size={15} color="var(--teal)" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#cta" className={plan.featured ? 'btn btn-primary' : 'btn btn-ghost'} style={styles.action}>
                {plan.action}
                <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .pricing-card { transition: transform 0.2s ease, border-color 0.2s ease; }
        .pricing-card:hover { transform: translateY(-4px); border-color: var(--brass-dim) !important; }
        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr 1fr !important; } .pricing-card-featured { grid-row: auto; } }
        @media (max-width: 620px) {
          .pricing-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .pricing-card { min-width: 0; padding: 24px !important; }
          .pricing-card .price-row { margin-top: 28px !important; }
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: { paddingTop: '112px', paddingBottom: '120px' },
  wrap: { maxWidth: '1180px' },
  sectionHead: { maxWidth: '700px' },
  heading: { fontSize: 'clamp(30px, 4vw, 46px)', lineHeight: 1.12 },
  intro: { color: 'var(--muted)', fontSize: '16px', maxWidth: '590px', marginTop: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'stretch' },
  card: { position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '390px', padding: '28px', border: '1px solid var(--line)', borderRadius: '8px', background: 'var(--surface)', overflow: 'hidden' },
  cardTop: { display: 'flex', justifyContent: 'space-between', gap: '16px' },
  recommended: { position: 'absolute', top: 0, right: 0, padding: '7px 14px', background: 'var(--teal)', color: '#071211', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' },
  planLabel: { margin: 0, color: 'var(--brass)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' },
  description: { color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5, margin: '10px 0 0', maxWidth: '230px', overflowWrap: 'anywhere' },
  priceRow: { display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', columnGap: '9px', rowGap: '7px', margin: '36px 0 26px', minWidth: 0 },
  price: { fontFamily: "'Space Grotesk', sans-serif", fontSize: '42px', lineHeight: 1, maxWidth: '100%', overflowWrap: 'anywhere' },
  suffix: { color: 'var(--muted)', fontSize: '11px', lineHeight: 1.35, maxWidth: '100px', overflowWrap: 'anywhere' },
  features: { display: 'grid', gap: '14px', listStyle: 'none', padding: 0, margin: 0, color: 'var(--ink)', fontSize: '13px' },
  feature: { display: 'flex', alignItems: 'center', gap: '10px' },
  action: { justifyContent: 'center', marginTop: 'auto' },
};
