import React, { useState } from 'react';

/**
 * CtaSection — call-to-action with email input.
 *
 * Props:
 *  - eyebrow:  string
 *  - title:    string
 *  - subtitle: string
 *  - buttonText:string
 *  - finePrint:string
 *  - placeholder: string
 */
export default function CtaSection({
  eyebrow = 'Request access',
  title = 'See it idle at 30MB on your own fleet',
  subtitle = 'Fifteen minutes, your OS mix, your compliance questions. We\'ll bring the instrument.',
  buttonText = 'Request a demo',
  finePrint = 'No install required for the demo. We\'ll show you the numbers first.',
  placeholder = 'you@company.com',
}) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your own submission logic
    console.log('CTA submitted:', email);
  };

  return (
    <section className="cta-section" id="cta" style={styles.section}>
      <div className="eyebrow" style={{ ...styles.eyebrow, justifyContent: 'center' }}>
        {eyebrow}
      </div>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.subtitle}>{subtitle}</p>
      <form className="cta-form" style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={placeholder}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
      </form>
      <div style={styles.fine}>{finePrint}</div>

      <style>{`
        .cta-section {
          padding: 100px 32px;
          text-align: center;
          border-bottom: none;
        }
        .cta-section h2 {
          font-size: clamp(30px, 4vw, 44px);
          margin-bottom: 16px;
        }
        .cta-form {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cta-form input {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 12px 16px;
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          width: 280px;
          max-width: 80vw;
        }
        .cta-form input::placeholder { color: #5B6474; }
        .cta-form input:focus { border-color: var(--brass); outline: none; }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    borderBottom: 'none',
  },
  eyebrow: {},
  title: {
    marginBottom: 16,
  },
  subtitle: {
    color: 'var(--muted)',
    maxWidth: 460,
    margin: '0 auto 34px',
    fontSize: '15.5px',
  },
  form: {},
  input: {},
  fine: {
    marginTop: 16,
    fontSize: 12,
    color: '#5B6474',
  },
};
