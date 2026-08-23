import React from 'react';

/**
 * ScreenshotDemo — fake window with blur-reveal-on-hover effect.
 *
 * Props:
 *  - captionLeft:  string
 *  - captionRight: string
 *  - redactText:   string
 */
export default function ScreenshotDemo({
  captionLeft = 'captured 14:22:07',
  captionRight = 'hover to inspect',
  redactText = '[REDACTED_PII]',
}) {
  return (
    <div className="shot-demo">
      {/* Fake titlebar dots */}
      <div className="titlebar" style={styles.titlebar}>
        <span style={styles.dot} />
        <span style={styles.dot} />
        <span style={styles.dot} />
      </div>

      <div className="shot-canvas" style={styles.canvas}>
        {/* Fake window content */}
        <div className="fake-window" style={styles.fakeWindow}>
          <div className="fake-line w60" style={styles.fakeLine} />
          <div className="fake-line w40" style={styles.fakeLine} />
          <div className="fake-line w80" style={styles.fakeLine} />
          <div className="fake-line w30" style={{ ...styles.fakeLine, marginTop: 6 }} />
          <span className="redact" style={styles.redact}>{redactText}</span>
        </div>

        {/* Hover-reveal blur layer */}
        <div className="blur-layer" />
      </div>

      <div className="shot-caption" style={styles.caption}>
        <span>{captionLeft}</span>
        <span>{captionRight}</span>
      </div>

      <style>{`
        .shot-demo {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 20px;
          position: relative;
        }
        .titlebar { display: flex; gap: 6px; margin-bottom: 14px; }
        .titlebar span { width: 8px; height: 8px; border-radius: 50%; background: var(--line); }
        .shot-canvas {
          aspect-ratio: 16/10;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          background:
            linear-gradient(135deg, #232833 25%, transparent 25%) 0 0/40px 40px,
            linear-gradient(315deg, #232833 25%, transparent 25%) 0 0/40px 40px,
            #1D222B;
        }
        .blur-layer {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(9px);
          background: rgba(26, 30, 38, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: backdrop-filter 0.4s ease, background 0.4s ease;
        }
        .shot-demo:hover .blur-layer {
          backdrop-filter: blur(0.5px);
          background: rgba(26, 30, 38, 0.05);
        }
        .fake-window {
          width: 78%;
          height: 64%;
          background: #282E39;
          border-radius: 5px;
          border: 1px solid #343B48;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .fake-line { height: 7px; background: #3B4250; border-radius: 2px; }
        .fake-line.w60 { width: 60%; }
        .fake-line.w40 { width: 40%; }
        .fake-line.w80 { width: 80%; }
        .fake-line.w30 { width: 30%; }
        .redact {
          background: var(--brass);
          color: #181A1F;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 2px;
          display: inline-block;
        }
        .shot-caption {
          margin-top: 14px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          color: var(--muted);
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}

const styles = {
  titlebar: {},
  dot: {},
  canvas: {},
  fakeWindow: {},
  fakeLine: {},
  redact: {},
  caption: {},
};
