import React, { useState, useEffect, useRef } from 'react';

/**
 * GaugePanel — animated gauge SVG that counts down from 800 MB → target.
 *
 * Props:
 *  - startVal:    number  (default 800)
 *  - endVal:      number  (default 30)
 *  - label:       string  (default "Idle memory footprint")
 *  - statusText:  string  (default "chronos, idle")
 *  - liveTag:     string  (default "live instrument")
 *  - runtime:     string  (default "Tauri + Rust")
 *  - target:      string  (default "< 30 MB")
 *  - duration:    number  (default 2400) ms
 */
export default function GaugePanel({
  startVal = 800,
  endVal = 30,
  label = 'Idle memory footprint',
  statusText = 'chronos, idle',
  liveTag = 'live instrument',
  runtime = 'Tauri + Rust',
  target = '< 30 MB',
  duration = 2400,
}) {
  const [playing, setPlaying] = useState(false);
  const [currentVal, setCurrentVal] = useState(startVal);
  const [caption, setCaption] = useState('legacy electron agent');
  const panelRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setCurrentVal(endVal);
      setCaption(statusText);
      return;
    }

    const timer = setTimeout(() => {
      setPlaying(true);
      const startTime = performance.now();

      function step(now) {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(startVal - (startVal - endVal) * eased);
        setCurrentVal(val < endVal + 2 ? endVal : val);

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          setCaption(statusText);
        }
      }

      requestAnimationFrame(step);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prefix = currentVal > 100 ? '~' : '<';

  return (
    <div
      ref={panelRef}
      className={`gauge-panel${playing ? ' play' : ''}`}
      style={styles.panel}
    >
      <div style={styles.panelLabel}>
        <span>{label}</span>
        <span style={{ color: 'var(--teal)' }}>● {liveTag}</span>
      </div>

      <div style={styles.gaugeWrap}>
        <svg width="220" height="130" viewBox="0 0 200 120">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#2B303B"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 68 26"
            fill="none"
            stroke="#8A6B4A"
            strokeWidth="10"
            strokeLinecap="round"
            opacity={0.55}
          />\n          <path
            d="M 132 26 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#3E6B63"
            strokeWidth="10"
            strokeLinecap="round"
            opacity={0.55}
          />
          <g className="needle">
            <line
              x1="100" y1="100" x2="100" y2="34"
              stroke="#C6A15C" strokeWidth="3" strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill="#C6A15C" />
          </g>
        </svg>
      </div>

      <div style={styles.readout}>
        <div className="mono" style={styles.num}>
          {prefix}
          {currentVal}{' '}
          <span style={styles.unit}>MB</span>
        </div>
        <div className="mono" style={styles.cap}>
          {caption}
        </div>
      </div>

      <div style={styles.foot}>
        <div className="mono">
          runtime: <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{runtime}</b>
        </div>
        <div className="mono">
          target: <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{target}</b>
        </div>
      </div>

      <style>{`
        .gauge-panel {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 32px 28px 26px;
          position: relative;
        }
      `}</style>
    </div>
  );
}

const styles = {
  panel: {},
  panelLabel: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  gaugeWrap: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 0 4px',
  },
  readout: {
    textAlign: 'center',
    marginTop: '2px',
  },
  num: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '44px',
    fontWeight: 600,
    color: 'var(--ink)',
  },
  unit: {
    fontSize: '20px',
    color: 'var(--muted)',
    fontWeight: 500,
  },
  cap: {
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    marginTop: '4px',
  },
  foot: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '22px',
    paddingTop: '18px',
    borderTop: '1px solid var(--line)',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    color: 'var(--muted)',
  },
};
