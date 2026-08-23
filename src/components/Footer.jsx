import React from 'react';

/**
 * Footer — bottom bar with logo, nav links, and copyright.
 *
 * Props:
 *  - logoText:  string
 *  - links:     Array<{ label, href }>
 *  - copyright: string
 */
export default function Footer({
  logoText = 'Chronos',
  links = [
    { label: 'Why replace it', href: '#problem' },
    { label: 'How it runs', href: '#modes' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Architecture', href: '#architecture' },
  ],
  copyright = 'CHRONOS ENTERPRISE ENDPOINT · v1.0.0',
}) {
  return (
    <footer style={styles.footer}>
      <div className="foot-wrap" style={styles.wrap}>
        <div className="logo" style={{ fontSize: 16 }}>
          <span className="mark" style={styles.mark} />
          {logoText}
        </div>
        <div className="foot-links" style={styles.links}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="foot-copy mono" style={styles.copy}>
          {copyright}
        </div>
      </div>

      <style>{`
        footer { padding: 44px 32px; }
        .foot-wrap {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .foot-links { display: flex; gap: 26px; }
        .foot-links a { font-size: 13px; color: var(--muted); }
        .foot-links a:hover { color: var(--ink); }
        .foot-copy { font-size: 12px; color: #5B6474; font-family: 'IBM Plex Mono', monospace; }
      `}</style>
    </footer>
  );
}

const styles = {
  footer: {},
  wrap: {},
  mark: {},
  links: {},
  copy: {},
};
