import React from 'react';
import DashboardHero from './components/DashboardHero';
import InteractiveDashboard from './components/InteractiveDashboard';
import './globals.css';

export default function App() {
  return (
    <>
      <DashboardHero />
      <div id="explore" style={{ padding: '0 32px 120px 32px' }}>
        <InteractiveDashboard />
      </div>
    </>
  );
}
