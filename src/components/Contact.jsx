import React from 'react';
import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>CONTACT</div>
          <h2 style={styles.title}>Talk to the Chronos team</h2>
          <p style={styles.subtitle}>
            Have questions or want to see how Chronos can help your organization?
          </p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.infoCard}>
          <div style={styles.icon}>
            <Mail size={18} />
          </div>
          <div>
            <div style={styles.label}>Email</div>
            <div style={styles.value}>chronos@gmail.com</div>
          </div>
        </div>

        <div style={styles.infoCard}>
          <div style={styles.icon}>
            <Phone size={18} />
          </div>
          <div>
            <div style={styles.label}>Sales</div>
            <div style={styles.value}>+91 00000 00000</div>
          </div>
        </div>

        <div style={styles.infoCard}>
          <div style={styles.icon}>
            <MessageSquare size={18} />
          </div>
          <div>
            <div style={styles.label}>Enterprise Support</div>
            <div style={styles.value}>Talk to our team</div>
          </div>
        </div>
      </div>

      <div style={styles.action}>
        <button style={styles.button}>
         Explore Chronos
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    padding: '24px',
  },

  header: {
    paddingBottom: '20px',
    borderBottom: '1px solid var(--line)',
  },

  eyebrow: {
    fontSize: '11px',
    color: 'var(--brass)',
    letterSpacing: '0.12em',
    fontFamily: "'IBM Plex Mono', monospace",
    marginBottom: '8px',
  },

  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 600,
  },

  subtitle: {
    margin: '8px 0 0',
    color: 'var(--muted)',
    fontSize: '13px',
    lineHeight: 1.5,
  },

  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginTop: '20px',
  },

  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
  },

  icon: {
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    background: 'var(--surface-2)',
    color: 'var(--teal)',
  },

  label: {
    fontSize: '11px',
    color: 'var(--muted)',
    marginBottom: '4px',
  },

  value: {
    fontSize: '13px',
    fontWeight: 500,
  },

  action: {
    marginTop: '20px',
  },

  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'var(--brass)',
    color: '#000',
    border: 'none',
    borderRadius: 'var(--radius)',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};