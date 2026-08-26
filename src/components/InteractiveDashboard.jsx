import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Monitor, Shield, BarChart3, Users, Clock, Zap, Loader } from 'lucide-react';

import ActivityPulse from './ActivityPulse';
import ProductivityAnalytics from './ProductivityAnalytics';
import AppUtilization from './AppUtilization';
import PrivacyPipeline from './PrivacyPipeline';
// import PerformanceSection from './PerformanceSection';
// import OfflineQueue from './OfflineQueue';
// import CrossPlatform from './CrossPlatform';
import DeviceHealth from './DeviceHealth';
// import ArchitectureViz from './ArchitectureViz';
// import AgentFsm from './AgentFsm';
// import PrivacyControls from './PrivacyControls';
import EnterpriseInsights from './EnterpriseInsights';

function Counter({ from, to, duration = 1 }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * (to - from) + from));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [from, to, duration]);

  return <span>{count}</span>;
}

export default function InteractiveDashboard() {
  const navItems = [
    { name: 'Activity', icon: <Zap size={16} /> },
    { name: 'Productivity', icon: <PieChart size={16} /> },
    { name: 'Devices', icon: <Monitor size={16} /> },
    { name: 'Privacy', icon: <Shield size={16} /> },
    { name: 'Analytics', icon: <BarChart3 size={16} /> },
  ];

  const [activeNav, setActiveNav] = useState('Activity');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingNav, setPendingNav] = useState(null);

  const handleNavClick = (name) => {
    if (name === activeNav || isTransitioning) return;
    setPendingNav(name);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveNav(name);
      setIsTransitioning(false);
      setPendingNav(null);
    }, 2000);
  };

  return (
    <div style={styles.dashboardWrapper}>
      {/* Top Navigation / Branding */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logoMark} />
          <span style={styles.brandText}>Chronos</span>
        </div>
        
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button 
              key={item.name} 
              style={{
                ...styles.navItem, 
                color: (pendingNav || activeNav) === item.name ? 'var(--ink)' : 'var(--muted)',
                background: (pendingNav || activeNav) === item.name ? 'var(--surface-2)' : 'transparent',
                opacity: isTransitioning && pendingNav !== item.name ? 0.5 : 1,
                cursor: isTransitioning ? 'wait' : 'pointer'
              }}
              onClick={() => handleNavClick(item.name)}
              disabled={isTransitioning}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div style={styles.headerRight}>
          <div style={styles.liveStatus}>
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              style={styles.statusDot} 
            />
            Live Status
          </div>
          <div style={styles.orgSelector}>
            Organization Name ↓
          </div>
          <div style={styles.profileAvatar}>J</div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main style={styles.mainContent}>
        
        {/* Left/Main Column - Will hold the interactive visualizations */}
        <div style={styles.centerCol}>

          <div style={styles.visualizationsPlaceholder}>
             <AnimatePresence mode="wait">
               {isTransitioning ? (
                 <motion.div 
                   key="transition"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   style={styles.transitionContainer}
                 >
                   <motion.div 
                     animate={{ opacity: [0.5, 1, 0.5] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                     style={styles.skeletonHeader} 
                   />
                   <div style={styles.skeletonBody}>
                     <motion.div 
                       animate={{ opacity: [0.5, 1, 0.5] }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                       style={styles.skeletonBlockLarge} 
                     />
                     <div style={styles.skeletonRow}>
                       {[1, 2, 3].map(i => (
                         <motion.div 
                           key={i}
                           animate={{ opacity: [0.5, 1, 0.5] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                           style={styles.skeletonBlockSmall} 
                         />
                       ))}
                     </div>
                   </div>
                 </motion.div>
               ) : (
                 <motion.div
                   key="content"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                 >
                   {activeNav === 'Activity' && (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
                       <AppUtilization />
                     </div>
                   )}
                   {activeNav === 'Productivity' && <ProductivityAnalytics />}
                   {activeNav === 'Privacy' && <PrivacyPipeline />}
                   {activeNav === 'Devices' && <DeviceHealth />}
                   {activeNav === 'Analytics' && <EnterpriseInsights />}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
          
        </div>

        {/* Right Sidebar - Active Workforce Metrics */}
        <aside style={styles.rightSidebar}>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            style={styles.metricsCard}
          >
            <h3 style={styles.metricsTitle}>Organization Health</h3>
            
            <div style={styles.metricRow}>
              <div style={styles.metricIcon}><Users size={16} /></div>
              <div style={styles.metricDetails}>
                <div style={styles.metricLabel}>Active Workforce</div>
                <div style={styles.metricValue}>
                  <Counter from={0} to={128} /> / 146
                </div>
              </div>
            </div>

            <div style={styles.metricRow}>
              <div style={styles.metricIcon}><Clock size={16} /></div>
              <div style={styles.metricDetails}>
                <div style={styles.metricLabel}>Avg Focus Time</div>
                <div style={styles.metricValue}>6h 42m</div>
              </div>
            </div>

            <div style={styles.metricRow}>
              <div style={styles.metricIcon}><PieChart size={16} /></div>
              <div style={styles.metricDetails}>
                <div style={styles.metricLabel}>Productivity Score</div>
                <div style={styles.metricValue}>
                  <Counter from={0} to={84} />%
                </div>
              </div>
            </div>

            <div style={styles.metricRow}>
              <div style={styles.metricIcon}><Monitor size={16} /></div>
              <div style={styles.metricDetails}>
                <div style={styles.metricLabel}>Devices Online</div>
                <div style={styles.metricValue}>
                  <Counter from={0} to={139} /> / 146
                </div>
              </div>
            </div>

            <div style={styles.metricRow}>
              <div style={styles.metricIcon}><Shield size={16} /></div>
              <div style={styles.metricDetails}>
                <div style={styles.metricLabel}>Sync Health</div>
                <div style={styles.metricValue}>
                  99.<Counter from={0} to={8} />%
                </div>
              </div>
            </div>

          </motion.div>
        </aside>

      </main>
    </div>
  );
}

const styles = {
  dashboardWrapper: {
    maxWidth: '1440px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    borderBottom: '1px solid var(--line)',
    background: 'rgba(10, 10, 11, 0.8)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoMark: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    background: 'linear-gradient(135deg, var(--brass), var(--brass-dim))',
  },
  brandText: {
    fontWeight: 600,
    fontSize: '18px',
    letterSpacing: '-0.02em',
    color: 'var(--ink)',
  },
  nav: {
    display: 'flex',
    gap: '4px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: 'var(--radius)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  liveStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--success)',
    fontWeight: 500,
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--success)',
    boxShadow: '0 0 8px var(--success)',
  },
  orgSelector: {
    fontSize: '13px',
    color: 'var(--ink)',
    padding: '6px 12px',
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
  },
  profileAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'var(--surface-2)',
    border: '1px solid var(--line)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '7fr 3fr',
    gap: '32px',
    padding: '32px',
    flex: 1,
  },
  centerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  sectionHeader: {
    marginBottom: '8px',
  },
  visualizationsPlaceholder: {
    minHeight: '400px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  emptyNavState: {
    padding: '60px',
    textAlign: 'center',
    color: 'var(--muted)',
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
  },
  rightSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  metricsCard: {
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius)',
    padding: '24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  metricsTitle: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--muted)',
    marginBottom: '20px',
  },
  metricRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '16px',
  },
  metricIcon: {
    color: 'var(--brass)',
    marginTop: '0px',
  },
  metricDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  metricLabel: {
    fontSize: '11px',
    color: 'var(--muted)',
  },
  metricValue: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--ink)',
    letterSpacing: '-0.02em',
  },
  transitionContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  skeletonHeader: {
    width: '40%',
    height: '24px',
    borderRadius: '4px',
    background: 'var(--surface-2)',
  },
  skeletonBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1,
  },
  skeletonBlockLarge: {
    width: '100%',
    height: '200px',
    borderRadius: 'var(--radius)',
    background: 'var(--surface-2)',
  },
  skeletonRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  skeletonBlockSmall: {
    width: '100%',
    height: '120px',
    borderRadius: 'var(--radius)',
    background: 'var(--surface-2)',
  }
};
