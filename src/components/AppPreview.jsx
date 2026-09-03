import React, { useEffect, useState } from 'react';

const previews = [
  {
    role: 'Employee App',
    title: 'Employee Workspace',
    image: '/ss1.png',
  },
  {
    role: 'Employee App',
    title: 'Employee Activity',
    image: '/ss2.png',
  },
  {
    role: 'Manager Dashboard',
    title: 'Manager Overview',
    image: '/ss3.png',
  },
  {
    role: 'Manager Dashboard',
    title: 'People Performance',
    image: '/ss4.png',
  },
  {
    role: 'Manager Dashboard',
    title: 'Teams & Departments',
    image: '/ss5.png',
  },
  {
    role: 'Company Head',
    title: 'Executive Overview',
    image: '/ss6.png',
  },
];

export default function AppPreview() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % previews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const item = previews[current];

  return (
    <section style={styles.section}>
      <div style={styles.container}>

        <div style={styles.header}>
          <div>
            <div style={styles.label}>CHRONOS EXPERIENCE</div>

            <h2 style={styles.title}>
              {item.role}
            </h2>

            <p style={styles.subtitle}>
              {item.title}
            </p>
          </div>

          <div style={styles.counter}>
            {current + 1} / {previews.length}
          </div>
        </div>

        <div style={styles.card}>
          <img
            src={item.image}
            alt={item.title}
            style={styles.image}
          />
        </div>

        <div style={styles.dots}>
          {previews.map((preview, index) => (
            <button
              key={preview.image}
              onClick={() => setCurrent(index)}
              style={{
                ...styles.dot,
                ...(current === index ? styles.activeDot : {}),
              }}
              aria-label={`Show ${preview.title}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '70px 32px',
  },

  container: {
    maxWidth: '1180px',
    margin: '0 auto',
  },

  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },

  label: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: 'var(--brass)',
    fontFamily: "'IBM Plex Mono', monospace",
    marginBottom: '8px',
  },

  title: {
    margin: 0,
    fontSize: '30px',
    fontWeight: 600,
  },

  subtitle: {
    margin: '7px 0 0',
    color: 'var(--muted)',
    fontSize: '14px',
  },

  counter: {
    color: 'var(--muted)',
    fontSize: '12px',
    fontFamily: "'IBM Plex Mono', monospace",
  },

  card: {
    border: '1px solid var(--line)',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'var(--surface)',
  },

  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },

  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '7px',
    marginTop: '16px',
  },

  dot: {
    width: '7px',
    height: '7px',
    padding: 0,
    border: 'none',
    borderRadius: '50%',
    background: 'var(--surface-2)',
    cursor: 'pointer',
  },

  activeDot: {
    background: 'var(--brass)',
    width: '22px',
    borderRadius: '5px',
  },
};