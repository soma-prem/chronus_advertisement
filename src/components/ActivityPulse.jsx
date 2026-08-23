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
        <h3 style={styles.title}>Chronos Activity Pulse</h3>
        <p style={styles.subtitle}>Flowing timeline showing workforce activity throughout the day.</p>
      </div>
      
      <div style={styles.timelineContainer}>
        {/* Animated particles background */}
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

        {/* Timeline blocks */}
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
              whileHover={{ scaleY: 1.2, zIndex: 10 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Hover Info Panel */}
      <div style={styles.infoPanel}>
        <AnimatePresence mode="wait">
          {hoveredNode ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={styles.infoCard}
            >
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Application</span>
                <span style={styles.infoValue}>{hoveredNode.app}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Duration</span>
                <span style={styles.infoValue}>{hoveredNode.duration}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Category</span>
                <span style={{...styles.infoValue, color: hoveredNode.color}}>{hoveredNode.category}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>State</span>
                <span style={styles.infoValue}>{hoveredNode.state}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Privacy</span>
                <span style={styles.infoValuePill}>{hoveredNode.privacy}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.emptyState}
            >
              Hover over the timeline to view activity details.
              <br/>
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px', display: 'block' }}>
                * No real personal information is exposed.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
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
    gap: '32px',
  },
  header: {
    textAlign: 'left',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--muted)',
    fontSize: '14px',
    margin: 0,
  },
  timelineContainer: {
    position: 'relative',
    height: '64px',
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
    height: '16px',
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
  },
  infoPanel: {
    minHeight: '220px',
    background: 'var(--surface-2)',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--line)',
    padding: '20px',
  },
  emptyState: {
    color: 'var(--muted)',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
  },
  infoCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '8px',
    borderBottom: '1px dashed var(--line)',
  },
  infoLabel: {
    color: 'var(--muted)',
    fontSize: '13px',
    fontFamily: "'IBM Plex Mono', monospace",
  },
  infoValue: {
    fontWeight: 500,
    fontSize: '14px',
  },
  infoValuePill: {
    background: 'rgba(198, 161, 92, 0.15)',
    color: 'var(--brass)',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    border: '1px solid rgba(198, 161, 92, 0.3)',
  },
};
