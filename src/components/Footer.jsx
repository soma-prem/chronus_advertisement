import React from 'react';
import { ArrowUpRight, ShieldCheck, Activity} from 'lucide-react';

export default function Footer({
  logoText = 'Chronos',
  links = [
    { label: 'Why replace it', href: '#problem' },
    { label: 'How it runs', href: '#modes' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Architecture', href: '#architecture' },
  ],
 
}) {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        
        <div style={styles.topSection}>
          <div style={styles.brandBlock}>
            <div style={styles.logo}>
              <span style={styles.logoMark} />
              <span>{logoText}</span>
            </div>

            <p style={styles.description}>
              Privacy-first workforce intelligence for modern organizations.
              Understand application usage, productivity patterns and endpoint
              health without unnecessary surveillance overhead.
            </p>

            
          </div>

          <div style={styles.enterpriseBlock}>
            <div style={styles.enterpriseLabel}>
              ENTERPRISE ENDPOINT
            </div>

            <div style={styles.enterpriseText}>
              Built for secure, observable and privacy-conscious operations.
            </div>

            <a href="#explore" style={styles.exploreLink}>
              Explore platform
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        
        <div style={styles.divider} />

        
        <div style={styles.navigation}>
          
          <div style={styles.navColumn}>
            <div style={styles.columnTitle}>PRODUCT</div>

            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={styles.navLink}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={styles.navColumn}>
            <div style={styles.columnTitle}>PLATFORM</div>

            <a href="#explore" style={styles.navLink}>
              Activity Intelligence
            </a>

            <a href="#explore" style={styles.navLink}>
              Application Usage
            </a>

            <a href="#explore" style={styles.navLink}>
              Device Health
            </a>

            <a href="#explore" style={styles.navLink}>
              Analytics
            </a>
          </div>

          <div style={styles.navColumn}>
            <div style={styles.columnTitle}>TRUST</div>

            <a href="#privacy" style={styles.navLink}>
              Privacy
            </a>

            <a href="#architecture" style={styles.navLink}>
              Architecture
            </a>

            <a href="#privacy" style={styles.navLink}>
              Data Protection
            </a>

            <a href="#architecture" style={styles.navLink}>
              Security Model
            </a>
          </div>

          <div style={styles.navColumn}>
            <div style={styles.columnTitle}>SYSTEM</div>

            <div style={styles.systemItem}>
              <Activity size={14} />
              <span>Live Monitoring</span>
            </div>

            <div style={styles.systemItem}>
              <ShieldCheck size={14} />
              <span>Privacy Processing</span>
            </div>

            <div style={styles.systemVersion}>
              Build 1.0.0
            </div>
          </div>
        </div>

        
        <div style={styles.bottomSection}>
          <div style={styles.bottomLeft}>
            <span>© 2026 Chronos.</span>
            <span>All rights reserved.</span>
          </div>

          <div style={styles.bottomCenter}>
            <span style={styles.securityDot} />
            Secure endpoint infrastructure
          </div>

         
        </div>

      </div>

      <style>{`
        .chronos-footer-link {
          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }

        .chronos-footer-link:hover {
          color: var(--ink) !important;
          transform: translateX(2px);
        }

        .chronos-footer-explore:hover {
          color: var(--ink) !important;
        }

        .chronos-footer-icon:hover {
          color: var(--ink) !important;
          border-color: var(--line) !important;
          background: var(--surface-2) !important;
        }

        @media (max-width: 800px) {
          .chronos-footer-top {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .chronos-footer-enterprise {
            max-width: 100% !important;
          }

          .chronos-footer-nav {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .chronos-footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }

        @media (max-width: 480px) {
          .chronos-footer-nav {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

const styles = {
  footer: {
    position: 'relative',
    background: 'linear-gradient( to bottom, rgba(255,255,255,0.015), rgba(0,0,0,0.12) )',
    borderTop: '1px solid var(--line)',
    marginTop: '40px',
  },

  container: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '72px 32px 28px',
  },

  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '60px',
  },

  brandBlock: {
    maxWidth: '480px',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '19px',
    fontWeight: 600,
    color: 'var(--ink)',
    marginBottom: '18px',
  },

  logoMark: {
    width: '24px',
    height: '24px',
    borderRadius: '5px',
    background:
      'linear-gradient(135deg, var(--brass), var(--brass-dim))',
    boxShadow: '0 0 24px rgba(198, 161, 92, 0.12)',
  },

  description: {
    margin: 0,
    maxWidth: '460px',
    color: 'var(--muted)',
    fontSize: '13px',
    lineHeight: 1.7,
  },

  status: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '22px',
    padding: '7px 11px',
    borderRadius: '20px',
    border: '1px solid rgba(52, 211, 153, 0.18)',
    background: 'rgba(52, 211, 153, 0.05)',
    color: 'var(--success)',
    fontSize: '11px',
    fontFamily: "'IBM Plex Mono', monospace",
  },

  enterpriseBlock: {
    maxWidth: '300px',
    paddingTop: '4px',
  },

  enterpriseLabel: {
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: 'var(--brass)',
    fontFamily: "'IBM Plex Mono', monospace",
    marginBottom: '10px',
  },

  enterpriseText: {
    color: 'var(--muted)',
    fontSize: '12px',
    lineHeight: 1.6,
    marginBottom: '16px',
  },

  exploreLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--brass)',
    fontSize: '12px',
    fontWeight: 500,
    textDecoration: 'none',
  },

  divider: {
    height: '1px',
    background: 'var(--line)',
    margin: '56px 0 40px',
  },

  navigation: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
    gap: '40px',
  },

  navColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
  },

  columnTitle: {
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: 'var(--ink)',
    fontFamily: "'IBM Plex Mono', monospace",
    marginBottom: '5px',
  },

  navLink: {
    color: 'var(--muted)',
    fontSize: '12px',
    textDecoration: 'none',
    lineHeight: 1.5,
  },

  systemItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--muted)',
    fontSize: '12px',
  },

  systemVersion: {
    marginTop: '5px',
    color: '#5B6474',
    fontSize: '11px',
    fontFamily: "'IBM Plex Mono', monospace",
  },

  bottomSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '52px',
    paddingTop: '22px',
    borderTop: '1px solid var(--line)',
    color: '#5B6474',
    fontSize: '10px',
    fontFamily: "'IBM Plex Mono', monospace",
  },

  bottomLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  bottomCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  },

  securityDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--teal)',
  },

  bottomRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },

  iconLink: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--line)',
    borderRadius: '6px',
    color: 'var(--muted)',
    background: 'transparent',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
};