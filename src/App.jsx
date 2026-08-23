import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import ModesSection from './components/ModesSection';
import PrivacySection from './components/PrivacySection';
import ArchitectureSection from './components/ArchitectureSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import './styles/globals.css';

/**
 * App — assembles all Chronos landing page sections.
 *
 * Every section accepts props so you can override content
 * without touching the component internals.
 *
 * To customize:
 *   1. Edit the default props passed to each section below, OR
 *   2. Replace a section component entirely with your own.
 */
export default function App() {
  return (
    <>
      {/* ---------- NAVIGATION ---------- */}
      <Navbar />

      {/* ---------- HERO + GAUGE ---------- */}
      <Hero />

      {/* ---------- PROBLEM CARDS ---------- */}
      <ProblemSection />

      {/* ---------- MODES / COMPLICATIONS ---------- */}
      <ModesSection />

      {/* ---------- PRIVACY ---------- */}
      <PrivacySection />

      {/* ---------- ARCHITECTURE ---------- */}
      <ArchitectureSection />

      {/* ---------- FEATURE ANIMATIONS ---------- */}
      <FeaturesShowcase />

      {/* ---------- CALL TO ACTION ---------- */}
      <CtaSection />

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </>
  );
}
