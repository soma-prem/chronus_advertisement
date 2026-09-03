import React, { useEffect, useState } from 'react';
import DashboardHero from './components/DashboardHero';
import InteractiveDashboard from './components/InteractiveDashboard';

import Footer from './components/Footer';
import './globals.css';
import AppPreview from './components/AppPreview';
import Contact from './components/Contact';

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
      <AppPreview/>
      <Contact/>
      <Footer />
    </>
  );
}



