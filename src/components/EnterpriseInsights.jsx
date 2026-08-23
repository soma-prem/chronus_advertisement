import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, LayoutGrid, Clock, PieChart, Lightbulb, CheckCircle2, Circle, RefreshCw } from 'lucide-react';

const PIPELINE_NODES = [
  { id: 'events', label: 'Activity Events', icon: <Activity size={16} /> },
  { id: 'classification', label: 'Classification', icon: <LayoutGrid size={16} /> },
  { id: 'time', label: 'Time Analysis', icon: <Clock size={16} /> },
  { id: 'productivity', label: 'Productivity', icon: <PieChart size={16} /> },
  { id: 'insights', label: 'Insights', icon: <Lightbulb size={16} /> },
];

function AnalyticsLoadingState({ onComplete }) {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      setStep(0); // Fetching
      await new Promise(r => setTimeout(r, 600));
      setCount(184);
      
      setStep(1); // Calculating
      await new Promise(r => setTimeout(r, 500));
      setCount(437);
      
      setStep(2); // Classifying
      await new Promise(r => setTimeout(r, 500));
      setCount(692);
      
      await new Promise(r => setTimeout(r, 400));
      setCount(941);
      
      setStep(3); // Generating metrics
      await new Promise(r => setTimeout(r, 500));
      setCount(1284);
      
      await new Promise(r => setTimeout(r, 600));
      setStep(4); // Finished
      
      await new Promise(r => setTimeout(r, 800));
      onComplete();
    };
    
    sequence();
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={styles.loadingContainer}
    >
      <div style={styles.loadingHeader}>
        <h3 style={styles.loadingTitle}>Processing workforce signals…</h3>
        <p style={styles.loadingSubtitle}>Turning activity into actionable insights</p>
      </div>

      <div style={styles.pipelineArea}>
        {PIPELINE_NODES.map((node, i) => {
          const isActive = step >= i;
          return (
            <React.Fragment key={node.id}>
              <div style={styles.pipelineNodeWrap}>
                <motion.div
                  animate={{ 
                    scale: step === i ? [1, 1.1, 1] : 1,
                    borderColor: isActive ? 'var(--brass)' : 'var(--line)',
                    color: isActive ? 'var(--brass)' : 'var(--muted)',
                  }}
                  transition={{ duration: 0.5 }}
                  style={styles.pipelineNode}
                >
                  {node.icon}
                </motion.div>
                <span style={{...styles.pipelineLabel, color: isActive ? 'var(--ink)' : 'var(--muted)'}}>
                  {node.label}
                </span>
              </div>
              
              {i < PIPELINE_NODES.length - 1 && (
                <div style={styles.pipelineConnector}>
                  <motion.div 
                    style={styles.connectorFill}
                    animate={{ width: step > i ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Particles */}
                  {step === i && (
                    <motion.div 
                      style={styles.particle}
                      animate={{ left: ['0%', '100%'] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={styles.metricsArea}>
        <div style={styles.primaryMetric}>
          <div style={styles.metricBig}>{count}</div>
          <div style={styles.metricSmall}>activity events processed</div>
        </div>
        
        <AnimatePresence>
          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={styles.classificationMetrics}
            >
              <span style={{ color: 'var(--teal)' }}>68% Productive</span>
              <span style={{ color: 'var(--muted)' }}>22% Neutral</span>
              <span style={{ color: 'var(--danger)' }}>10% Unproductive</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={styles.checklist}>
        <div style={styles.checkItem}>
          {step > 0 ? <CheckCircle2 size={14} color="var(--teal)"/> : step === 0 ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><RefreshCw size={14} color="var(--brass)"/></motion.div> : <Circle size={14} color="var(--muted)"/>}
          <span style={{ color: step >= 0 ? 'var(--ink)' : 'var(--muted)' }}>Fetching activity data</span>
        </div>
        <div style={styles.checkItem}>
          {step > 1 ? <CheckCircle2 size={14} color="var(--teal)"/> : step === 1 ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><RefreshCw size={14} color="var(--brass)"/></motion.div> : <Circle size={14} color="var(--muted)"/>}
          <span style={{ color: step >= 1 ? 'var(--ink)' : 'var(--muted)' }}>Calculating active time</span>
        </div>
        <div style={styles.checkItem}>
          {step > 2 ? <CheckCircle2 size={14} color="var(--teal)"/> : step === 2 ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><RefreshCw size={14} color="var(--brass)"/></motion.div> : <Circle size={14} color="var(--muted)"/>}
          <span style={{ color: step >= 2 ? 'var(--ink)' : 'var(--muted)' }}>Classifying applications</span>
        </div>
        <div style={styles.checkItem}>
          {step > 3 ? <CheckCircle2 size={14} color="var(--teal)"/> : step === 3 ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><RefreshCw size={14} color="var(--brass)"/></motion.div> : <Circle size={14} color="var(--muted)"/>}
          <span style={{ color: step >= 3 ? 'var(--ink)' : 'var(--muted)' }}>Generating productivity metrics</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function EnterpriseInsights() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showReady, setShowReady] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setShowReady(true);
      const t = setTimeout(() => setShowReady(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isLoaded]);

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <AnalyticsLoadingState key="loading" onComplete={() => setIsLoaded(true)} />
        ) : showReady ? (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={styles.readyScreen}
          >
            <CheckCircle2 size={48} color="var(--teal)" style={{ marginBottom: '16px' }} />
            <h3 style={styles.loadingTitle}>Analytics ready</h3>
            <p style={styles.loadingSubtitle}>Your workforce activity has been transformed into actionable insights.</p>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.dashboard}
          >
            <div style={styles.dashHeader}>
              <div style={styles.dashHeaderLeft}>
                <h3 style={styles.dashTitle}>Executive Insights</h3>
                <p style={styles.dashSubtitle}>Last 30 Days · Enterprise Wide</p>
              </div>
              <div style={styles.dashActions}>
                <button style={styles.exportBtn}>Export Report</button>
              </div>
            </div>

            <div style={styles.insightsGrid}>
              <div style={styles.heroMetricCard}>
                <div style={styles.metricTitle}>Productivity Score</div>
                <div style={styles.hugeScore}>84<span style={{fontSize: '24px'}}>%</span></div>
                <div style={styles.trend}>+2.4% vs last period</div>
              </div>

              <div style={styles.statsGrid}>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Focus Time</div>
                  <div style={styles.statVal}>6h 42m</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Active Time</div>
                  <div style={styles.statVal}>7h 15m</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Idle Time</div>
                  <div style={styles.statVal}>45m</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Context Switches</div>
                  <div style={styles.statVal}>124/day</div>
                </div>
              </div>

              <div style={styles.chartCard}>
                <div style={styles.metricTitle}>Distribution</div>
                <div style={styles.barStack}>
                  <motion.div initial={{width:0}} animate={{width:'68%'}} style={{...styles.stackSegment, background: 'var(--teal)'}}>68%</motion.div>
                  <motion.div initial={{width:0}} animate={{width:'22%'}} style={{...styles.stackSegment, background: 'var(--muted)'}}>22%</motion.div>
                  <motion.div initial={{width:0}} animate={{width:'10%'}} style={{...styles.stackSegment, background: 'var(--danger)'}}>10%</motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    padding: '32px',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: '40px',
  },
  loadingHeader: {
    textAlign: 'center',
  },
  loadingTitle: {
    fontSize: '20px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '8px',
  },
  loadingSubtitle: {
    color: 'var(--muted)',
    fontSize: '14px',
    margin: 0,
  },
  pipelineArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '800px',
  },
  pipelineNodeWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    width: '100px',
  },
  pipelineNode: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: 'var(--surface-2)',
    border: '1px solid var(--line)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  pipelineLabel: {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    textAlign: 'center',
  },
  pipelineConnector: {
    flex: 1,
    height: '2px',
    background: 'var(--line)',
    position: 'relative',
    marginBottom: '26px',
    minWidth: '40px',
  },
  connectorFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    background: 'var(--brass)',
  },
  particle: {
    position: 'absolute',
    top: '-2px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--brass)',
    boxShadow: '0 0 8px var(--brass)',
  },
  metricsArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    height: '80px',
  },
  primaryMetric: {
    textAlign: 'center',
  },
  metricBig: {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--ink)',
    fontFamily: "'IBM Plex Mono', monospace",
  },
  metricSmall: {
    fontSize: '12px',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  classificationMetrics: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: "'IBM Plex Mono', monospace",
    background: 'rgba(0,0,0,0.2)',
    padding: '8px 16px',
    borderRadius: '16px',
    border: '1px solid var(--line)',
  },
  checklist: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px 32px',
    background: 'rgba(0,0,0,0.2)',
    padding: '20px 32px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--line)',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13px',
  },
  
  // Ready Screen
  readyScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
  },

  // Dashboard Styles
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  dashHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--line)',
  },
  dashTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '4px',
  },
  dashSubtitle: {
    fontSize: '13px',
    color: 'var(--muted)',
    margin: 0,
  },
  exportBtn: {
    background: 'transparent',
    border: '1px solid var(--line)',
    color: 'var(--ink)',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '24px',
  },
  heroMetricCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  metricTitle: {
    fontSize: '13px',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
  },
  hugeScore: {
    fontSize: '64px',
    fontWeight: 700,
    color: 'var(--teal)',
    lineHeight: 1,
    marginBottom: '8px',
  },
  trend: {
    fontSize: '13px',
    color: 'var(--brass)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  statBox: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    padding: '16px',
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--muted)',
    marginBottom: '4px',
  },
  statVal: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--ink)',
  },
  chartCard: {
    gridColumn: '1 / -1',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    padding: '24px',
  },
  barStack: {
    display: 'flex',
    height: '24px',
    borderRadius: '12px',
    overflow: 'hidden',
    gap: '2px',
  },
  stackSegment: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 600,
    color: '#000',
  }
};
