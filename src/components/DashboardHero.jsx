import React from 'react';
import { motion } from 'framer-motion';
import { Play, Monitor, Laptop, Server, Lock, Database } from 'lucide-react';

export default function DashboardHero() {
  return (
    <section className="hero-section" style={styles.section}>
      <div className="hero-content" style={styles.content}>
        
        {/* Animated Abstract Visualization Background */}
        <div style={styles.vizContainer}>
          <svg style={styles.svgViz} width="100%" height="400">
            {/* Simple abstract paths for data flow */}
            <motion.path
              d="M 50,200 C 150,200 200,100 300,100 C 400,100 450,200 550,200 C 650,200 700,300 800,300"
              stroke="var(--line)"
              strokeWidth="2"
              fill="none"
              style={{ strokeDasharray: "10, 10" }}
            />
          </svg>

          {/* Floating Nodes */}
          <div style={styles.nodesOverlay}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} style={{...styles.node, top: '20%', left: '10%'}}>
              <Monitor size={16} color="var(--muted)" /> Windows
            </motion.div>
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }} style={{...styles.node, top: '50%', left: '15%'}}>
              <Laptop size={16} color="var(--muted)" /> macOS
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity }} style={{...styles.node, top: '75%', left: '25%'}}>
              <Server size={16} color="var(--muted)" /> Linux
            </motion.div>

            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{...styles.node, top: '40%', left: '45%', border: '1px solid var(--teal)', color: 'var(--teal)'}}>
              <Lock size={16} /> Privacy Processing
            </motion.div>
            <motion.div style={{...styles.node, top: '40%', right: '15%'}}>
              <Database size={16} color="var(--brass)" /> Analytics
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={styles.textBlock}
        >
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowLine} />
            CHRONOS PLATFORM
          </div>
          <h1 style={styles.headline}>Work intelligence without the surveillance overhead.</h1>
          <p style={styles.subtext}>
            Chronos gives organizations real-time visibility into application usage, active time, productivity patterns, software utilization and operational bottlenecks — while minimizing employee friction and protecting sensitive information.
          </p>
          <div style={styles.actions}>
            <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href="#explore" className="btn btn-primary" style={styles.btnPrimary}>
              Explore Chronos
            </motion.a>
            <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href="#how-it-works" className="btn btn-ghost" style={styles.btnGhost}>
              <Play size={16} /> See How It Works
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '120px 32px',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    maxWidth: '1180px',
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  vizContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.6,
  },
  svgViz: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  nodesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  node: {
    position: 'absolute',
    background: 'var(--surface-2)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'blur(10px)',
    padding: '8px 12px',
    borderRadius: 'var(--radius)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--ink)',
    fontFamily: "'IBM Plex Mono', monospace",
  },
  textBlock: {
    maxWidth: '720px',
    margin: '0 auto',
    textAlign: 'center',
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '12px',
    letterSpacing: '0.1em',
    color: 'var(--brass)',
    marginBottom: '24px',
  },
  eyebrowLine: {
    width: '32px',
    height: '1px',
    background: 'var(--brass)',
  },
  headline: {
    fontSize: 'clamp(40px, 5vw, 64px)',
    lineHeight: 1.1,
    fontWeight: 600,
    marginBottom: '24px',
    background: 'linear-gradient(to right, #FFFFFF, #8B93A3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtext: {
    fontSize: '18px',
    color: 'var(--muted)',
    lineHeight: 1.6,
    marginBottom: '40px',
    maxWidth: '640px',
    margin: '0 auto 40px auto',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  btnPrimary: {
    background: 'var(--brass)',
    color: '#000',
    border: 'none',
    padding: '12px 24px',
    borderRadius: 'var(--radius)',
    fontSize: '15px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none'
  },
  btnGhost: {
    background: 'var(--glass)',
    border: '1px solid var(--glass-border)',
    color: 'var(--ink)',
    padding: '12px 24px',
    borderRadius: 'var(--radius)',
    fontSize: '15px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none'
  },
};
