import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfMap from '../data/pdfmap';
import './ExamBrowser.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ExamBrowser({ onBack }) {
  const stems = Object.keys(pdfMap);
  const [selected, setSelected] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [scale, setScale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSelect = (index) => {
    setSelected(index);
    setShowSolution(false);
  };

  const { exam, solution } = pdfMap[stems[selected]];

  return (
    <div className="exam-browser">
      <header className="viewer-header">
        <div className="header-left">
          {onBack && (
            <button className="back-btn" onClick={onBack}>Torna Indietro</button>
          )}
          <h2>{showSolution ? `Soluzione ${selected + 1}` : `Compito ${selected + 1}`}</h2>
        </div>
        <div className="viewer-actions">
          <button onClick={() => setScale(Math.max(0.5, scale - 0.25))}>-</button>
          <button onClick={() => setScale(scale + 0.25)}>+</button>
          <button onClick={() => setShowSolution((v) => !v)}>
            {showSolution ? 'Mostra Compito' : 'Mostra Soluzione'}
          </button>
        </div>
      </header>
      <div className="viewer-body">
        <div className="pdf-wrapper">
          <Document file={showSolution ? solution : exam} onLoadSuccess={onDocumentLoadSuccess} loading={<div className="loading">Caricamento...</div>}>
            {Array.from({ length: numPages || 0 }, (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} />
            ))}
          </Document>
        </div>
        <aside className="file-list">
          {stems.map((_, idx) => (
            <button key={idx} className={idx === selected ? 'active' : ''} onClick={() => handleSelect(idx)}>
              {`Compito ${idx + 1}`}
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}