import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Laptop, Server, CheckCircle2, Circle, Wifi, WifiOff, RefreshCw } from 'lucide-react';

const OS_ICONS = {
  windows: <Monitor size={14} />,
  macos: <Laptop size={14} />,
  linux: <Server size={14} />,
};

// Generate some demo devices
const DEMO_DEVICES = Array.from({ length: 12 }).map((_, i) => {
  const os = ['windows', 'macos', 'linux'][Math.floor(Math.random() * 3)];
  const status = Math.random() > 0.1 ? 'online' : (Math.random() > 0.5 ? 'offline' : 'syncing');
  return {
    id: `dev-${i}`,
    name: `workstation-${i + 100}`,
    os,
    status,
    agent: 'v1.4.2',
    cpu: (Math.random() * 0.4 + 0.1).toFixed(2),
    ram: (Math.random() * 15 + 10).toFixed(1),
  };
});

function LoadingState({ onComplete }) {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Step 0: Discovering
      setStep(0);
      await new Promise(r => setTimeout(r, 600));
      setCount(24);
      
      // Step 1: Heartbeat
      setStep(1);
      await new Promise(r => setTimeout(r, 500));
      setCount(51);
      
      await new Promise(r => setTimeout(r, 400));
      setCount(78);
      
      // Step 2: Sync Status
      setStep(2);
      await new Promise(r => setTimeout(r, 500));
      setCount(96);
      
      await new Promise(r => setTimeout(r, 600));
      setCount(146);
      setStep(3); // All complete
      
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
        <h3 style={styles.loadingTitle}>Synchronizing device fleet…</h3>
        <p style={styles.loadingSubtitle}>Discovering registered endpoints</p>
      </div>

      <div style={styles.vizArea}>
        {/* Central Node */}
        <div style={styles.centerNode}>
          <div style={styles.logoMark} />
        </div>

        {/* Orbiting Device Nodes & Lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <React.Fragment key={i}>
              <svg style={styles.svgLines}>
                <line 
                  x1="50%" y1="50%" 
                  x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} 
                  stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4" 
                />
                <motion.circle 
                  r="2" fill="var(--teal)"
                  animate={{
                    cx: ["50%", `calc(50% + ${x}px)`, "50%"],
                    cy: ["50%", `calc(50% + ${y}px)`, "50%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              </svg>
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  ...styles.satelliteNode,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
              >
                {i % 3 === 0 ? <Monitor size={14}/> : i % 3 === 1 ? <Laptop size={14}/> : <Server size={14}/>}
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      <div style={styles.loadingProgress}>
        <div style={styles.countText}>
          <span style={styles.countNumber}>{count}</span> / 146
        </div>
        <div style={styles.statusText}>Checking endpoint health</div>
      </div>

      <div style={styles.checklist}>
        <div style={styles.checkItem}>
          {step > 0 ? <CheckCircle2 size={14} color="var(--teal)"/> : step === 0 ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><RefreshCw size={14} color="var(--brass)"/></motion.div> : <Circle size={14} color="var(--muted)"/>}
          <span style={{ color: step >= 0 ? 'var(--ink)' : 'var(--muted)' }}>Discovering endpoints</span>
        </div>
        <div style={styles.checkItem}>
          {step > 1 ? <CheckCircle2 size={14} color="var(--teal)"/> : step === 1 ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><RefreshCw size={14} color="var(--brass)"/></motion.div> : <Circle size={14} color="var(--muted)"/>}
          <span style={{ color: step >= 1 ? 'var(--ink)' : 'var(--muted)' }}>Checking agent heartbeat</span>
        </div>
        <div style={styles.checkItem}>
          {step > 2 ? <CheckCircle2 size={14} color="var(--teal)"/> : step === 2 ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><RefreshCw size={14} color="var(--brass)"/></motion.div> : <Circle size={14} color="var(--muted)"/>}
          <span style={{ color: step >= 2 ? 'var(--ink)' : 'var(--muted)' }}>Verifying sync status</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DeviceHealth() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <LoadingState key="loading" onComplete={() => setIsLoaded(true)} />
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.dashboard}
          >
            <div style={styles.dashHeader}>
              <div style={styles.dashHeaderLeft}>
                <h3 style={styles.dashTitle}>Device fleet synchronized</h3>
                <p style={styles.dashSubtitle}>146 registered · 139 online · 5 offline · 2 syncing</p>
              </div>
              <div style={styles.dashActions}>
                <div style={styles.statusPill}>
                  <div style={styles.statusDot} />
                  All systems operational
                </div>
              </div>
            </div>

            <div style={styles.deviceGrid}>
              {DEMO_DEVICES.map((dev) => (
                <motion.div 
                  key={dev.id} 
                  style={styles.deviceCard}
                  whileHover={{ scale: 1.02, backgroundColor: 'var(--surface-2)' }}
                >
                  <div style={styles.devCardHeader}>
                    <div style={styles.devNameWrap}>
                      <span style={styles.osIcon}>{OS_ICONS[dev.os]}</span>
                      <span style={styles.devName}>{dev.name}</span>
                    </div>
                    <div style={styles.devStatusWrap}>
                      {dev.status === 'online' && <Wifi size={14} color="var(--teal)" />}
                      {dev.status === 'offline' && <WifiOff size={14} color="var(--danger)" />}
                      {dev.status === 'syncing' && <RefreshCw size={14} color="var(--brass)" />}
                    </div>
                  </div>
                  
                  <div style={styles.devMetrics}>
                    <div style={styles.devMetricBlock}>
                      <div style={styles.devMetricLabel}>Agent</div>
                      <div style={styles.devMetricVal}>{dev.agent}</div>
                    </div>
                    <div style={styles.devMetricBlock}>
                      <div style={styles.devMetricLabel}>CPU</div>
                      <div style={styles.devMetricVal}>{dev.cpu}%</div>
                    </div>
                    <div style={styles.devMetricBlock}>
                      <div style={styles.devMetricLabel}>RAM</div>
                      <div style={styles.devMetricVal}>{dev.ram} MB</div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
    flex: 1,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: '32px',
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
  vizArea: {
    position: 'relative',
    width: '300px',
    height: '300px',
  },
  centerNode: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    background: 'var(--surface-2)',
    border: '1px solid var(--line)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoMark: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    background: 'linear-gradient(135deg, var(--brass), var(--brass-dim))',
  },
  svgLines: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  satelliteNode: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'var(--bg)',
    border: '1px solid var(--line)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--muted)',
    zIndex: 2,
  },
  loadingProgress: {
    textAlign: 'center',
  },
  countText: {
    fontSize: '14px',
    color: 'var(--muted)',
    fontFamily: "'IBM Plex Mono', monospace",
    marginBottom: '4px',
  },
  countNumber: {
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--ink)',
  },
  statusText: {
    fontSize: '13px',
    color: 'var(--brass)',
  },
  checklist: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    background: 'rgba(0,0,0,0.2)',
    padding: '16px 24px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--line)',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13px',
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
  statusPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    fontWeight: 500,
    background: 'rgba(52, 211, 153, 0.1)',
    color: 'var(--success)',
    padding: '6px 12px',
    borderRadius: '16px',
    border: '1px solid rgba(52, 211, 153, 0.2)',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--success)',
  },
  deviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
  },
  deviceCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    padding: '16px',
    cursor: 'pointer',
  },
  devCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  devNameWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  osIcon: {
    color: 'var(--muted)',
    display: 'flex',
  },
  devName: {
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: "'IBM Plex Mono', monospace",
  },
  devMetrics: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'rgba(0,0,0,0.2)',
    padding: '8px 12px',
    borderRadius: '4px',
  },
  devMetricBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  devMetricLabel: {
    fontSize: '10px',
    color: 'var(--muted)',
    textTransform: 'uppercase',
  },
  devMetricVal: {
    fontSize: '12px',
    fontWeight: 500,
  },
};
