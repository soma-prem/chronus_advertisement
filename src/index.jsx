import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * index.jsx — entry point.
 *
 * Assumes Google Fonts are loaded via <link> in your index.html:
 *   Space Grotesk (400/500/600/700)
 *   Inter         (400/500/600)
 *   IBM Plex Mono (400/500)
 */
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
