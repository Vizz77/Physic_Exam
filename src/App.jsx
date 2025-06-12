// src/App.jsx
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';

export default function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="App">
      {view === 'landing' && (
        <LandingPage onBrowse={() => setView('grid')} />
      )}
    </div>
  );
}