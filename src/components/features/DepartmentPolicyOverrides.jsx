import React from 'react';

/**
 * DepartmentPolicyOverrides — Org-chart tree where each department node
 * contains a rotary dial/knob. Hovering a department visibly turns its knob
 * to a different setting, showing granular per-department control.
 *
 * Props:
 *  - title / subtitle : string
 *  - departments      : Array<{ name, setting, angle }>
 *    angle = knob rotation in degrees (0 = off, 270 = max)
 */
export default function DepartmentPolicyOverrides({
  title = 'Department-Level Policy Overrides',
  subtitle = 'Adjust tracking level, screenshot frequency, and sync interval per department — like individual thermostat zones in a building.',
  departments = [
    { name: 'Engineering', setting: 'Standard', hoverSetting: 'Strict', angle: 180, hoverAngle: 270, color: 'var(--teal)' },
    { name: 'Sales', setting: 'Minimal', hoverSetting: 'Moderate', angle: 90, hoverAngle: 180, color: 'var(--brass)' },
    { name: 'HR', setting: 'Strict', hoverSetting: 'Strict', angle: 270, hoverAngle: 270, color: 'var(--danger)' },
    { name: 'Finance', setting: 'Standard', hoverSetting: 'Audited', angle: 180, hoverAngle: 250, color: 'var(--ink)' },
  ],
}) {
  return (
    <div className="feature-panel">
      <div className="feature-header">
        <span className="mono" style={styles.tag}>Policy Engine</span>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      {/* Org tree */}
      <div className="dept-tree">
        {/* Root node */}
        <div className="dept-root">
          <div className="dept-node dept-node-root">
            <Knob angle={135} size={28} color="var(--brass)" />
            <span className="dept-name">Organization</span>
            <span className="dept-setting mono">Global default</span>
          </div>
        </div>

        {/* Connector lines */}
        <div className="dept-connector-v" />
        <div className="dept-connector-h" />

        {/* Department nodes */}
        <div className="dept-branches">
          {departments.map((dept, i) => (
            <React.Fragment key={dept.name}>
              <div className="dept-connector-v-short" />
              <div className="dept-node" data-dept={i}>
                <Knob angle={dept.angle} hoverAngle={dept.hoverAngle} size={24} color={dept.color} />
                <span className="dept-name">{dept.name}</span>
                <span className="dept-setting dept-setting-base mono">{dept.setting}</span>
                <span className="dept-setting dept-setting-hover mono">{dept.hoverSetting}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Example overrides bar */}
      <div className="dept-examples mono" style={styles.examples}>
        <span>screenshot_freq:</span>
        <span style={{ color: 'var(--teal)' }}>Engineering 5 min</span>
        <span style={{ color: 'var(--brass)' }}>Sales 30 min</span>
        <span style={{ color: 'var(--danger)' }}>HR 1 min</span>
      </div>

      <style>{`
        .feature-panel {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 28px 24px;
        }
        .feature-header { margin-bottom: 24px; }
        .feature-header h3 { font-size: 18px; font-weight: 600; margin-top: 8px; }
        .feature-header p { font-size: 13px; color: var(--muted); margin-top: 6px; max-width: 520px; }

        .dept-tree {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 0 8px;
        }
        .dept-root { display: flex; justify-content: center; }
        .dept-branches {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Connector lines */
        .dept-connector-v {
          width: 1px; height: 20px;
          background: var(--line);
        }
        .dept-connector-h {
          width: 70%; height: 1px;
          background: var(--line);
          max-width: 500px;
          margin-bottom: 0;
        }
        .dept-connector-v-short {
          width: 1px; height: 16px;
          background: var(--line);
        }

        /* Node card */
        .dept-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 16px 18px 12px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface-2);
          min-width: 120px;
          transition: border-color 0.25s ease, background 0.25s ease;
          cursor: default;
        }
        .dept-node:hover {
          border-color: var(--brass-dim);
          background: rgba(198, 161, 92, 0.04);
        }
        .dept-node-root {
          border-color: var(--brass-dim);
        }
        .dept-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          text-align: center;
        }
        .dept-setting {
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .dept-setting-base {
          color: var(--muted);
        }
        .dept-setting-hover {
          color: var(--brass);
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease;
        }
        .dept-node:hover .dept-setting-base {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.2s ease, opacity 0.2s ease;
        }
        .dept-node:hover .dept-setting-hover {
          max-height: 20px;
          opacity: 1;
          margin-top: -2px;
        }

        /* Knob hover transition */
        .dept-node .knob-indicator {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dept-node:hover .knob-indicator {
          transform: rotate(var(--hover-angle));
        }

        .dept-examples {
          display: flex;
          gap: 16px;
          font-size: 11px;
          color: var(--muted);
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          flex-wrap: wrap;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .dept-branches { gap: 8px; }
          .dept-node { min-width: 100px; padding: 12px 12px 10px; }
        }
      `}</style>
    </div>
  );
}

/* ---- Knob sub-component ---- */
function Knob({ angle = 0, hoverAngle, size = 24, color = 'var(--brass)' }) {
  const r = size / 2;
  const ha = hoverAngle !== undefined ? hoverAngle : angle;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block' }}
    >
      {/* Track ring */}
      <circle
        cx={r} cy={r} r={r - 3}
        fill="none"
        stroke="var(--line)"
        strokeWidth="2"
        strokeDasharray={`${(r - 3) * 1.2} ${(r - 3) * 5}`}
        strokeLinecap="round"
      />
      {/* Indicator line */}
      <line
        className="knob-indicator"
        x1={r} y1={r}
        x2={r} y2={3}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          transformOrigin: `${r}px ${r}px`,
          transform: `rotate(${angle}deg)`,
          '--hover-angle': `${ha}deg`,
        }}
      />
      {/* Center dot */}
      <circle cx={r} cy={r} r="2" fill={color} />
    </svg>
  );
}

const styles = {
  tag: {
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--brass)',
  },
  title: {},
  subtitle: {},
  examples: {},
};
