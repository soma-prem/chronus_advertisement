import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Cpu, EyeOff, ShieldCheck, Lock, Cloud } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 'capture', icon: <Camera size={20} />, label: 'Screen Capture' },
  { id: 'processing', icon: <Cpu size={20} />, label: 'Local Processing' },
  { id: 'pii', icon: <EyeOff size={20} />, label: 'PII Redaction' },
  { id: 'blur', icon: <ShieldCheck size={20} />, label: 'Client-Side Blur' },
  { id: 'storage', icon: <Lock size={20} />, label: 'Encrypted Storage' },
  { id: 'sync', icon: <Cloud size={20} />, label: 'Secure Sync' },
];

export default function PrivacyPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Privacy is processed before data leaves the device.</h3>
        <p style={styles.subtitle}>Sensitive information is processed locally before transmission.</p>
      </div>

      <div style={styles.pipelineArea}>
        {/* The Pipeline Nodes */}
        <div style={styles.nodesContainer}>
          {PIPELINE_STEPS.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            
            return (
              <div key={step.id} style={styles.nodeWrapper}>
                <motion.div
                  style={{
                    ...styles.node,
                    borderColor: isActive ? 'var(--teal)' : isPast ? 'var(--brass)' : 'var(--line)',
                    color: isActive ? 'var(--teal)' : isPast ? 'var(--ink)' : 'var(--muted)',
                    background: isActive ? 'rgba(95, 207, 192, 0.1)' : 'var(--surface-2)',
                  }}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -5 : 0
                  }}
                >
                  {step.icon}
                </motion.div>
                <div style={{
                  ...styles.nodeLabel,
                  color: isActive ? 'var(--teal)' : isPast ? 'var(--ink)' : 'var(--muted)'
                }}>
                  {step.label}
                </div>
                
                {/* Connector Line */}
                {index < PIPELINE_STEPS.length - 1 && (
                  <div style={styles.connector}>
                    <motion.div 
                      style={styles.connectorFill}
                      initial={{ width: '0%' }}
                      animate={{ width: isPast ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Visualizer Area */}
        <div style={styles.visualizer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              style={styles.screenMockup}
            >
              {/* Fake UI to represent the screen */}
              <div style={styles.fakeHeader}>
                <div style={styles.fakeDots} />
                <div style={styles.fakeSearch} />
              </div>
              <div style={styles.fakeBody}>
                {/* Content changes based on step */}
                <div style={styles.fakeTextLine} />
                <div style={{...styles.fakeTextLine, width: '80%'}} />
                
                <motion.div 
                  style={{
                    ...styles.sensitiveData,
                    filter: activeStep >= 3 ? 'blur(4px)' : 'none',
                    background: activeStep >= 2 ? 'var(--danger)' : 'var(--surface-2)',
                  }}
                >
                  {activeStep >= 2 ? '[REDACTED_PII]' : 'john.doe@example.com - SSN: 000-00-0000'}
                </motion.div>

                {activeStep >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    style={styles.encryptionOverlay}
                  >
                    <Lock size={48} color="var(--brass)" opacity={0.5} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={styles.badges}>
            <span style={styles.badge}>PII REDACTED</span>
            <span style={styles.badge}>CLIENT-SIDE BLUR</span>
            <span style={styles.badge}>AES-256-GCM</span>
            <span style={styles.badge}>HMAC-SHA256</span>
          </div>
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
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--muted)',
    fontSize: '15px',
    margin: 0,
  },
  pipelineArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    alignItems: 'center',
  },
  nodesContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    padding: '0 20px',
  },
  nodeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  node: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: 'var(--bg)',
  },
  nodeLabel: {
    marginTop: '12px',
    fontSize: '12px',
    fontWeight: 600,
    textAlign: 'center',
    fontFamily: "'IBM Plex Mono', monospace",
    maxWidth: '80px',
  },
  connector: {
    position: 'absolute',
    top: '24px',
    left: '50%',
    width: '100%',
    height: '2px',
    background: 'var(--line)',
    zIndex: 1,
  },
  connectorFill: {
    height: '100%',
    background: 'var(--brass)',
  },
  visualizer: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  screenMockup: {
    width: '100%',
    height: '240px',
    background: '#1A1E26',
    border: '1px solid var(--line)',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  fakeHeader: {
    height: '24px',
    background: '#12151A',
    borderBottom: '1px solid var(--line)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    gap: '8px',
  },
  fakeDots: {
    width: '36px',
    height: '8px',
    background: 'var(--line)',
    borderRadius: '4px',
  },
  fakeSearch: {
    flex: 1,
    height: '12px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '4px',
    marginLeft: '12px',
  },
  fakeBody: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
    position: 'relative',
  },
  fakeTextLine: {
    height: '12px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '2px',
  },
  sensitiveData: {
    marginTop: '8px',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: "'IBM Plex Mono', monospace",
    transition: 'all 0.5s ease',
  },
  encryptionOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(10, 10, 11, 0.8)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
  badge: {
    fontSize: '11px',
    fontFamily: "'IBM Plex Mono', monospace",
    padding: '4px 8px',
    border: '1px solid var(--brass-dim)',
    color: 'var(--brass)',
    borderRadius: '4px',
    background: 'rgba(198, 161, 92, 0.05)',
  }
};
