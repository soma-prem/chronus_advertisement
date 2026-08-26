import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function CircularProgress({ value, color }) {
  const [offset, setOffset] = useState(283);
  const strokeDasharray = 283;

  useEffect(() => {
    const progressOffset = strokeDasharray - (strokeDasharray * value) / 100;
    const timer = setTimeout(() => setOffset(progressOffset), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div style={styles.circleContainer}>
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div style={styles.circleText}>
        <span style={styles.scoreValue}>{value}%</span>
        <span style={styles.scoreLabel}>Score</span>
      </div>
    </div>
  );
}

export default function ProductivityAnalytics() {
  const chartData = [40, 60, 80, 50, 90, 75, 85, 60, 45, 70, 80, 95];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Productivity Analytics</h3>
      </div>
      
      <div style={styles.contentGrid}>
        
        {/* Score Column */}
        <div style={styles.scoreCol}>
          <CircularProgress value={84} color="var(--teal)" />
          
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <span style={{...styles.dot, background: 'var(--teal)'}} /> Productive — 68%
            </div>
            <div style={styles.legendItem}>
              <span style={{...styles.dot, background: 'var(--muted)'}} /> Neutral — 22%
            </div>
            <div style={styles.legendItem}>
              <span style={{...styles.dot, background: 'var(--danger)'}} /> Unproductive — 10%
            </div>
          </div>
        </div>

        {/* Chart Column */}
        <div style={styles.chartCol}>
          <div style={styles.chartHeader}>
            <span style={styles.chartTitle}>Focus Time (08:00 → 18:00)</span>
          </div>
          <div style={styles.chartWrapper}>
            {chartData.map((val, i) => (
              <motion.div
                key={i}
                style={styles.barContainer}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <motion.div
                  style={styles.bar}
                  variants={{
                    initial: { height: 0 },
                    animate: { height: `${val}%`, transition: { duration: 1, delay: i * 0.05 } },
                    hover: { filter: 'brightness(1.2)' }
                  }}
                />
                <motion.div 
                  className="tooltip"
                  style={styles.tooltip}
                  variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                >
                  {val}%
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <div style={styles.metricsGrid}>
            <div style={styles.miniMetric}>
              <div style={styles.miniLabel}>Avg Session</div>
              <div style={styles.miniValue}>47m</div>
            </div>
            <div style={styles.miniMetric}>
              <div style={styles.miniLabel}>Longest Focus</div>
              <div style={styles.miniValue}>2h 14m</div>
            </div>
            <div style={styles.miniMetric}>
              <div style={styles.miniLabel}>Idle Time</div>
              <div style={styles.miniValue}>6.2%</div>
            </div>
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
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    flex: 1,
  },
  header: {
    borderBottom: '1px solid var(--line)',
    paddingBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '32px',
  },
  scoreCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    padding: '16px',
    background: 'var(--surface-2)',
    borderRadius: 'var(--radius)',
  },
  circleContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
  },
  circleText: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1,
  },
  scoreLabel: {
    fontSize: '12px',
    color: 'var(--muted)',
    marginTop: '4px',
  },
  legend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--muted)',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  chartCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  chartHeader: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--muted)',
  },
  chartWrapper: {
    height: '160px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    borderBottom: '1px solid var(--line)',
    paddingBottom: '8px',
  },
  barContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    cursor: 'crosshair',
  },
  bar: {
    width: '100%',
    background: 'linear-gradient(to top, var(--teal), rgba(95, 207, 192, 0.4))',
    borderRadius: '4px 4px 0 0',
  },
  tooltip: {
    position: 'absolute',
    top: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--ink)',
    color: 'var(--bg)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    pointerEvents: 'none',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginTop: '8px',
  },
  miniMetric: {
    background: 'var(--surface-2)',
    padding: '12px',
    borderRadius: 'var(--radius)',
  },
  miniLabel: {
    fontSize: '12px',
    color: 'var(--muted)',
    marginBottom: '4px',
  },
  miniValue: {
    fontSize: '16px',
    fontWeight: 600,
  }
};
