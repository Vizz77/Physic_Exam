import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfMap from '../data/pdfmap';
import './ExamBrowser.css';

// Use the official CDN for the worker (works everywhere, including GitHub Pages)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function useIsMobile() {
  // Simple hook to detect mobile/small screen
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 800);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

export default function ExamBrowser({ onBack }) {
  // Remove duplicate Compito (Compito 9 and 9b, only keep one if both exist)
  const stems = Object.keys(pdfMap);
  const [selected, setSelected] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(null);
  const [showNav, setShowNav] = useState(false); // for mobile nav modal
  const isMobile = useIsMobile();

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
    setShowNav(false); // close nav on mobile
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
          {/* On mobile, h2 is nav trigger */}
          <h2
            style={{fontWeight:600, color:'#222', cursor: isMobile ? 'pointer' : 'default'}}
            onClick={isMobile ? () => setShowNav(true) : undefined}
          >
            {showSolution ? `Soluzione ${stems[selected]}` : `${stems[selected]}`}
            {isMobile && <span style={{marginLeft:8, fontSize:'1.2em', color:'#888'}}>▼</span>}
          </h2>
        </div>
        {/* Hide viewer-actions on mobile */}
        {!isMobile && (
          <div className="viewer-actions">
            <button onClick={() => setScale(Math.max(0.5, scale - 0.25))}>-</button>
            <button onClick={() => setScale(scale + 0.25)}>+</button>
            <button onClick={() => setShowSolution((v) => !v)}>
              {showSolution ? 'Mostra Compito' : 'Mostra Soluzione'}
            </button>
          </div>
        )}
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
        {/* Sidebar only on desktop */}
        {!isMobile && (
          <aside className="file-list">
            {stems.map((stem, idx) => (
              <button key={idx} className={idx === selected ? 'active' : ''} onClick={() => handleSelect(idx)}>
                {stem}
              </button>
            ))}
          </aside>
        )}
      </div>
      {/* Mobile nav modal */}
      {isMobile && showNav && (
        <div style={{
          position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.25)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'
        }} onClick={() => setShowNav(false)}>
          <div style={{background:'#fff', borderRadius:12, boxShadow:'0 4px 24px rgba(0,0,0,0.15)', padding:24, minWidth:220, maxHeight:'80vh', overflowY:'auto'}} onClick={e => e.stopPropagation()}>
            <div style={{marginBottom:12, fontWeight:600, fontSize:'1.1em'}}>Seleziona Compito/Soluzione</div>
            {stems.map((stem, idx) => (
              <button
                key={idx}
                style={{
                  display:'block', width:'100%', padding:'0.7rem 1rem', marginBottom:6, borderRadius:8,
                  background: idx === selected ? '#e0e0e5' : 'transparent', color: idx === selected ? '#0071e3' : '#222', border:'none', textAlign:'left', fontWeight:500, fontSize:'1em', cursor:'pointer'
                }}
                onClick={() => handleSelect(idx)}
              >
                {stem}
              </button>
            ))}
            <button
              style={{marginTop:12, width:'100%', padding:'0.6rem', borderRadius:8, background:'#e0e0e5', border:'none', fontWeight:500, cursor:'pointer'}}
              onClick={() => setShowSolution(v => !v)}
            >
              {showSolution ? 'Mostra Compito' : 'Mostra Soluzione'}
            </button>
            <button
              style={{marginTop:8, width:'100%', padding:'0.6rem', borderRadius:8, background:'#f5f5f7', border:'none', fontWeight:500, cursor:'pointer'}}
              onClick={() => setShowNav(false)}
            >Chiudi</button>
          </div>
        </div>
      )}
    </div>
  );
}