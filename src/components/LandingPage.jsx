// src/components/LandingPage.jsx
import React from 'react';

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
    <section className="min-h-screen flex flex-col items-center justify-center p-8 space-y-10 bg-gray-50">
      
      {/* Hero */}
      <div className="text-center max-w-xl space-y-4">
        <h1 className="text-4xl font-extrabold">Benvenuto in Fisica</h1>
        <p className="text-lg text-gray-700">
          Trova qui i testi d'esame con soluzioni!
        </p>
        <button
          onClick={onBrowse}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sfoglia Esami ↓
        </button>
      </div>

      {/* Lista Argomenti Esame */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Lista Argomenti Esame
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
