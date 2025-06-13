// src/App.jsx
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import ExamBrowser from './components/ExamBrowser';

export default function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="App">
      {view === 'landing' && (<LandingPage onBrowse={() => setView('exam')} />)}
      {view === 'exam' && <ExamBrowser onBack={() => setView('landing')} />}
      <Footer />
    </div>
  );
}