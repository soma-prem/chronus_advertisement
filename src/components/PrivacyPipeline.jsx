import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, EyeOff, Lock } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 'capture', icon: <Camera size={20} />, label: 'Screen captured' },
  { id: 'blur', icon: <EyeOff size={20} />, label: 'Private data detected screen gets blured' },
  { id: 'storage', icon: <Lock size={20} />, label: 'Screen record stored securly' },
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


        {/* Visualizer Area */}
        <div style={styles.visualizer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--teal)',
                textAlign: 'center',
                marginBottom: '16px'
              }}
            >
              {PIPELINE_STEPS[activeStep].label}
            </motion.div>
          </AnimatePresence>

          <div style={styles.screenMockup}>
            <div style={styles.fakeHeader}>
              <div style={styles.fakeDots} />
              <div style={styles.fakeSearch} />
            </div>
            <div style={styles.fakeBody}>
              <div style={styles.fakeTextLine} />
              <div style={{...styles.fakeTextLine, width: '80%'}} />
              
              <motion.div 
                animate={{
                  filter: activeStep >= 1 ? 'blur(4px)' : 'none',
                  background: activeStep >= 1 ? 'var(--danger)' : 'var(--surface-2)',
                }}
                transition={{ duration: 0.5 }}
                style={styles.sensitiveData}
              >
                john.doe@example.com - SSN: 000-00-0000
              </motion.div>

              <AnimatePresence>
                {activeStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8 }}
                    style={styles.flashOverlay}
                  />
                )}
                {activeStep >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={styles.encryptionOverlay}
                  >
                    <Lock size={48} color="var(--teal)" />
                    <div style={{ marginTop: '12px', color: 'var(--teal)', fontWeight: 'bold', fontFamily: "'IBM Plex Mono', monospace" }}>
                      SECURELY STORED
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

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
    flex: 1,
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
    background: 'var(--header-bg)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
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
