import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './ExamViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ExamViewer({ examFile, solutionFile, onBack }) {
  const [numPages, setNumPages] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="exam-viewer">
      <div className="pdf-container">
        <Document
          file={showSolution ? solutionFile : examFile}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="loading">Caricamento...</div>}
        >
          {Array.from({ length: numPages || 0 }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={600}
            />
          ))}
        </Document>
      </div>
      <div className="actions">
        {!showSolution && (
          <button className="solution-btn" onClick={() => setShowSolution(true)}>
            Mostra Soluzione
          </button>
        )}
        {onBack && (
          <button className="back-btn" onClick={onBack}>Torna Indietro</button>
        )}
      </div>
    </div>
  );
}