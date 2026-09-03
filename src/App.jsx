import React, { useEffect, useState } from 'react';
import DashboardHero from './components/DashboardHero';
import InteractiveDashboard from './components/InteractiveDashboard';
import './globals.css';

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-theme', isLightTheme);
  }, [isLightTheme]);

  return (
    <>
      <DashboardHero />
      <div id="explore" style={{ padding: '0 32px 120px 32px' }}>
        <InteractiveDashboard
          isLightTheme={isLightTheme}
          onToggleTheme={() => setIsLightTheme((theme) => !theme)}
        />
      </div>
    </>
  );
}
