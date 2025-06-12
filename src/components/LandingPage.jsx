// src/components/LandingPage.jsx
import React from 'react';
// Import component specific styles
import './LandingPage.css'

export default function LandingPage({ onBrowse }) {
  const topics = [
    'La legge di Coulomb ed il principio di sovrapposizione.',
    'campo elettrostatico di una distribuzione lineare',
    'Definire cosè un dipolo è cacolarne',
    'Dimostrare che la forza di Coulomb è una forza conservativa ',
    'Definire potenziale, energia potenziale e lavoro del campo elettrico',
    'Condensatore piano',
    'Spiegazione del comportamento di resistori in serie ed in parallelo',
    'Spiegazione del comportamento di condensatori in serie ed in parallelo',
    'Circuiti RC',
    'Leggi di Ohm microscopica e derivazione della legge macroscopica a partire da quella microscopica',
    'Descrivere le equazioni del moto di una carica elettrica in un campo magnetico uniforme',
    'Determinare la forza tra due fili rettilinei paralleli percorsi da correnti stazionarie e discutere la relazione con la terza legge di Newton',
    ' Enunciare la legge di Biot-Savart ed usarla per il calcolo del campo magnetico prodotto da una spira circolare percorsa da corrente stazionaria sull asse della spira',
    "Enunciare la legge di Ampere ed usarla per il calcolo del campo magnetico all'interno di un solenoide rettilineo percorso da corrente stazionaria",
    "Enunciare la legge di Faraday-Lenz",
    " Descrivere la struttura di un dispositivo NMOS, il suo funzionamento come interruttore controllato",
  ];

  return (
    <section className="landing-page">
      {/* Hero section with intro text */}
      <header className="page-header">
        <h1>Benvenuto in Fisica</h1>
        <p>Trova qui i testi d'esame con soluzioni!</p>
        <button onClick={onBrowse} className="browse-btn">Sfoglia Esami</button>
      </header>

      {/* Lista Argomenti Esame */}
      <div className="topics">
        <h2>Lista Argomenti Esame</h2>
        <ul> 
          {topics.map((topic, idx) => (
            <li key={idx}>{topic}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
