import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="disclaimer">
        Questo sito non è una scorciatoia per superare l'esame: raccoglie semplicemente i vecchi compiti.
      </p>
      <p className="github-link">
        <a
          href="https://github.com/Vizz77/Physic_Exam"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visita il progetto su GitHub
        </a>
      </p>
    </footer>
  )
}