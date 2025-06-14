import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfMap from '../data/pdfmap';
import './ExamBrowser.css';

// Use the official CDN for the worker (works everywhere, including GitHub Pages)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function ExamBrowser({ onBack }) {
  // Remove duplicate Compito (Compito 9 and 9b, only keep one if both exist)
  const stems = Object.keys(pdfMap);
  const [selected, setSelected] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    setError(`Errore nel caricamento del PDF: ${error.message}`);
  };

  const handleSelect = (index) => {
    setSelected(index);
    setShowSolution(false);
    setNumPages(null);
    setError(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const { exam, solution } = pdfMap[stems[selected]] || { exam: '', solution: '' };
  const currentPdf = showSolution ? solution : exam;

  return (
    <div className="exam-browser">
      <header className="viewer-header">
        <div className="header-left">
          {onBack && (
            <button className="back-btn" onClick={onBack}>Torna Indietro</button>
          )}
          <h2 style={{fontWeight:600, color:'#222'}}>{showSolution ? `Soluzione ${stems[selected]}` : `${stems[selected]}`}</h2>
        </div>
        <div className="viewer-actions">
          <button onClick={() => setScale(Math.max(0.5, scale - 0.25))}>-</button>
          <button onClick={() => setScale(scale + 0.25)}>+</button>
          <button onClick={() => setShowSolution((v) => !v)}>
            {showSolution ? 'Mostra Compito' : 'Mostra Soluzione'}
          </button>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? 'Chiudi' : 'Seleziona Compito'}
          </button>
        </div>
      </header>
      <div className="viewer-body">
        <div className="pdf-wrapper">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <Document
              file={currentPdf}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<div className="loading">Caricamento...</div>}
            >
              {Array.from({ length: numPages || 0 }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          )}
        </div>
        <aside className={`file-list ${isMobileMenuOpen ? 'open' : ''}`}>
          {stems.map((stem, idx) => (
            <button key={idx} className={idx === selected ? 'active' : ''} onClick={() => handleSelect(idx)}>
              {stem}
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}