// src/App.jsx
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import ExamViewer from './components/ExamViewer';

export default function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="App">
      {view === 'landing' && (
                <LandingPage onBrowse={() => setView('exam')} />
      )}
      {view === 'exam' && (
        <ExamViewer
          examFile="./public/pdf/compito_20120613.pdf"
          solutionFile="./public/pdf/soluzioni_20120613.pdf"
          onBack={() => setView('landing')}
        />
      )}
      <Footer />
    </div>
  );
}