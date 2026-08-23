import React from 'react';

/**
 * Navbar — sticky top navigation bar with logo, links, and CTA buttons.
 *
 * Props (all optional, for easy customization):
 *  - logoText: string   (default "Chronos")
 *  - links:     Array<{ label, href }>
 *  - ctaLabel / ctaHref
 */
export default function Navbar({
  logoText = 'Chronos',
  links = [
    { label: 'Why replace it', href: '#problem' },
    { label: 'How it runs', href: '#modes' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Features', href: '#features' },
  ],
  ctaLabel = 'Request a demo',
  ctaHref = '#cta',
}) {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* Logo */}
        <div className="logo">
          <span className="mark" style={styles.mark} />
          {logoText}
        </div>

        {/* Navigation links — hidden on mobile */}
        <div className="navlinks" style={styles.navlinks}>
          {links.map((link) => (
            <a key={link.href} href={link.href} style={styles.navlink}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Right-side CTAs */}
        <div style={styles.navcta}>
          <a href={ctaHref} className="btn btn-primary">
            {ctaLabel}
          </a>
        </div>
      </nav>

      <style>{`
        header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(18, 21, 26, 0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 32px;
          max-width: 1180px;
          margin: 0 auto;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 19px;
          letter-spacing: 0.01em;
        }
        .logo .mark {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid var(--brass);
          position: relative;
          flex-shrink: 0;
        }
        .logo .mark::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1.5px;
          height: 6px;
          background: var(--brass);
          transform-origin: bottom center;
          transform: translate(-50%, -100%) rotate(35deg);
        }
        .logo .mark::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 1.5px;
          background: var(--brass);
          transform-origin: left center;
          transform: translate(0, -50%) rotate(35deg);
        }
        .navlinks { display: flex; gap: 36px; }
        .navlinks a {
          font-size: 14px;
          color: var(--muted);
          font-weight: 500;
          transition: color 0.15s ease;
        }
        .navlinks a:hover { color: var(--ink); }
        .navcta { display: flex; align-items: center; gap: 20px; }
        @media (max-width: 820px) { .navlinks { display: none; } }
      `}</style>
    </header>
  );
}

const styles = {
  header: {},
  nav: {},
  mark: {},
  navlinks: {},
  navlink: {},
  navcta: {},
};
