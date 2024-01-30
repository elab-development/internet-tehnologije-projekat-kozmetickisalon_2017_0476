import React, { useState } from 'react';
import useZaposleni from './custom-hooks/useZaposleni';

const SpaSpecialists = () => {
  const { zaposleni, loading, error } = useZaposleni('http://127.0.0.1:8000/api/zaposleni');
  const [selectedZaposlen, setSelectedZaposlen] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (zaposlen) => {
    setSelectedZaposlen(zaposlen);
    setShowModal(true); // Otvaramo modal kada je kliknuto na zaposlenog
  };

  const closeModal = () => {
    setSelectedZaposlen(null);
    setShowModal(false); // Zatvaramo modal kada je kliknuto na zatvaranje
  };

  if (loading) return <p>Loading spa specialists...</p>;
  if (error) return <p>Error loading spa specialists: {error.message}</p>;

  return (
    <div className='specialists-page'>
      <ul className="zaposleni-lista">
        {zaposleni.map((zaposlen, index) => (
          <li key={index}>
            <h3>{zaposlen.naziv}</h3>
            <p>Strucna sprema: {zaposlen.strucna_sprema}</p>
            <button onClick={() => openModal(zaposlen)}>Detalji o specijalisti</button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedZaposlen.naziv}</h2>
            <p>Strucna sprema: {selectedZaposlen.strucna_sprema}</p>
            <p>Telefon: {selectedZaposlen.kontakt_telefon}</p>
            <p>Email: {selectedZaposlen.email}</p>
            <p>Linkedin: {selectedZaposlen.linkedin}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaSpecialists;