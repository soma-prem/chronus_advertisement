import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_DATA = [
  { id: 1, app: 'VS Code', duration: '2h 14m', category: 'Productive', state: 'Active', privacy: 'PII Redacted', width: '35%', color: 'var(--teal)' },
  { id: 2, app: 'Slack', duration: '48m', category: 'Neutral', state: 'Active', privacy: 'Blur Applied', width: '15%', color: 'var(--muted)' },
  { id: 3, app: 'YouTube', duration: '21m', category: 'Unproductive', state: 'Active', privacy: 'Private', width: '10%', color: 'var(--danger)' },
  { id: 4, app: 'Terminal', duration: '1h 10m', category: 'Productive', state: 'Active', privacy: 'Encrypted', width: '25%', color: 'var(--teal)' },
  { id: 5, app: 'Notion', duration: '30m', category: 'Productive', state: 'Idle', privacy: 'PII Redacted', width: '15%', color: 'var(--brass)' },
];

export default function ActivityPulse() {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h3 style={styles.title}>Chronos Activity Pulse</h3>
          <p style={styles.subtitle}>Flowing timeline showing workforce activity.</p>
        </div>
        
        {/* Compact Horizontal Hover Info */}
        <div style={styles.infoArea}>
          <AnimatePresence mode="wait">
            {hoveredNode ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                style={styles.horizontalInfo}
              >
                <div style={styles.miniStat}><span style={styles.miniLabel}>App</span> {hoveredNode.app}</div>
                <div style={styles.miniStat}><span style={styles.miniLabel}>Duration</span> {hoveredNode.duration}</div>
                <div style={styles.miniStat}><span style={styles.miniLabel}>Category</span> <span style={{color: hoveredNode.color}}>{hoveredNode.category}</span></div>
                <div style={styles.miniStat}><span style={styles.miniLabel}> Privacy</span> <span style={styles.infoValuePill}>{hoveredNode.privacy}</span></div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={styles.emptyState}
              >
                Hover timeline for details
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div style={styles.timelineContainer}>
        <div style={styles.particleLayer}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                ...styles.particle,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                left: ['-5%', '105%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div style={styles.track}>
          {MOCK_DATA.map((item) => (
            <motion.div
              key={item.id}
              style={{
                ...styles.segment,
                width: item.width,
                backgroundColor: item.color,
                opacity: hoveredNode && hoveredNode.id !== item.id ? 0.3 : 1
              }}
              onHoverStart={() => setHoveredNode(item)}
              onHoverEnd={() => setHoveredNode(null)}
              whileHover={{ scaleY: 1.4, zIndex: 10 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
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
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '42px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '2px',
  },
  subtitle: {
    color: 'var(--muted)',
    fontSize: '12px',
    margin: 0,
  },
  infoArea: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--surface-2)',
    border: '1px solid var(--line)',
    borderRadius: '24px',
    padding: '6px 16px',
    minWidth: '340px',
    height: '38px',
    justifyContent: 'flex-end',
  },
  horizontalInfo: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: 500,
  },
  miniStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  miniLabel: {
    color: 'var(--muted)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  emptyState: {
    color: 'var(--muted)',
    fontSize: '12px',
    fontStyle: 'italic',
    width: '100%',
    textAlign: 'center',
  },
  infoValuePill: {
    background: 'rgba(198, 161, 92, 0.15)',
    color: 'var(--brass)',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
    border: '1px solid rgba(198, 161, 92, 0.3)',
  },
  timelineContainer: {
    position: 'relative',
    height: '48px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  particleLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    width: '4px',
    height: '2px',
    background: 'var(--glass-border)',
    borderRadius: '2px',
  },
  track: {
    width: '100%',
    height: '12px',
    display: 'flex',
    gap: '2px',
    padding: '0 4px',
    position: 'relative',
    zIndex: 2,
  },
  segment: {
    height: '100%',
    borderRadius: '2px',
    cursor: 'pointer',
    position: 'relative',
  }
};
