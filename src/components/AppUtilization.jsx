import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const APPS_DATA = [
  { id: 1, name: 'VS Code', duration: '3h 42m', category: 'Productive', percentage: 31, color: 'var(--teal)' },
  { id: 2, name: 'Slack', duration: '1h 15m', category: 'Neutral', percentage: 12, color: 'var(--muted)' },
  { id: 3, name: 'Chrome', duration: '2h 10m', category: 'Neutral', percentage: 18, color: 'var(--muted)' },
  { id: 4, name: 'Figma', duration: '1h 45m', category: 'Productive', percentage: 15, color: 'var(--teal)' },
  { id: 5, name: 'Terminal', duration: '55m', category: 'Productive', percentage: 8, color: 'var(--teal)' },
  { id: 6, name: 'Notion', duration: '40m', category: 'Productive', percentage: 6, color: 'var(--teal)' },
  { id: 7, name: 'YouTube', duration: '25m', category: 'Unproductive', percentage: 4, color: 'var(--danger)' },
];

export default function AppUtilization() {
  const [filter, setFilter] = useState('All');
  
  const filters = ['All', 'Productive', 'Neutral', 'Unproductive'];
  
  const filteredApps = APPS_DATA.filter(
    app => filter === 'All' || app.category === filter
  ).sort((a, b) => b.percentage - a.percentage);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Application Utilization</h3>
        
        <div style={styles.filterGroup}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? 'var(--surface-2)' : 'transparent',
                borderColor: filter === f ? 'var(--line)' : 'transparent',
                color: filter === f ? 'var(--ink)' : 'var(--muted)',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div style={styles.listContainer}>
        <AnimatePresence>
          {filteredApps.map((app, index) => (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={styles.card}
              whileHover={{ scale: 1.01, backgroundColor: 'var(--surface-2)' }}
            >
              <div style={styles.cardMain}>
                <div style={styles.rank}>{index + 1}</div>
                <div style={styles.appInfo}>
                  <div style={styles.appName}>{app.name}</div>
                  <div style={{...styles.appCategory, color: app.color}}>{app.category}</div>
                </div>
              </div>
              
              <div style={styles.metrics}>
                <div style={styles.duration}>{app.duration}</div>
                <div style={styles.percentageContainer}>
                  <div style={styles.percentageText}>{app.percentage}%</div>
                  <div style={styles.barBackground}>
                    <motion.div 
                      style={{...styles.barFill, background: app.color}} 
                      initial={{ width: 0 }}
                      animate={{ width: `${app.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredApps.length === 0 && (
          <div style={styles.emptyState}>No applications match this filter.</div>
        )}
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
    borderBottom: '1px solid var(--line)',
    paddingBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  filterGroup: {
    display: 'flex',
    gap: '4px',
    background: 'rgba(0,0,0,0.2)',
    padding: '4px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--line)',
  },
  filterBtn: {
    border: '1px solid transparent',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minHeight: '400px',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    cursor: 'default',
  },
  cardMain: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    width: '40%',
  },
  rank: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    background: 'var(--surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: 'var(--muted)',
    fontFamily: "'IBM Plex Mono', monospace",
  },
  appInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  appName: {
    fontSize: '15px',
    fontWeight: 500,
  },
  appCategory: {
    fontSize: '12px',
    fontFamily: "'IBM Plex Mono', monospace",
  },
  metrics: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '32px',
    flex: 1,
  },
  duration: {
    fontSize: '14px',
    fontWeight: 500,
    width: '60px',
    textAlign: 'right',
  },
  percentageContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '120px',
  },
  percentageText: {
    fontSize: '13px',
    color: 'var(--muted)',
    width: '32px',
    textAlign: 'right',
  },
  barBackground: {
    flex: 1,
    height: '6px',
    background: 'var(--surface-2)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '3px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: 'var(--muted)',
    fontStyle: 'italic',
  }
};
