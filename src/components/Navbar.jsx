import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  const [moreOpen, setMoreOpen] = useState(false);

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
          <div className="more-menu">
            <button
              type="button"
              className="more-trigger"
              aria-expanded={moreOpen}
              aria-controls="more-menu-items"
              onClick={() => setMoreOpen((open) => !open)}
            >
              More <ChevronDown size={14} />
            </button>
            {moreOpen && (
              <div id="more-menu-items" className="more-items">
                <a href="#pricing" onClick={() => setMoreOpen(false)}>Pricing</a>
              </div>
            )}
          </div>
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
        .more-menu { position: relative; }
        .more-trigger {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--muted);
          font: inherit;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
        .more-trigger:hover { color: var(--ink); }
        .more-items {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          min-width: 140px;
          padding: 8px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: #16191f;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
        }
        .more-items a { display: block; padding: 9px 10px; color: var(--ink); }
        .more-items a:hover { color: var(--brass); }
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
