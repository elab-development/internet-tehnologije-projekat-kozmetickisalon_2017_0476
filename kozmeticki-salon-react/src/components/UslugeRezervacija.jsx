import React, { useState } from 'react';
import useKozmetickeUsluge from './custom-hooks/useKozmetickeUsluge';
import useZaposleni from './custom-hooks/useZaposleni';
import axios from 'axios';

const UslugeRezervacija = () => {
  const { usluge, loading: loadingUsluge, error: errorUsluge } = useKozmetickeUsluge('http://127.0.0.1:8000/api/usluge');
  const { zaposleni, loading: loadingZaposleni, error: errorZaposleni } = useZaposleni('http://127.0.0.1:8000/api/zaposleni');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedZaposlen, setSelectedZaposlen] = useState('');
  const [datum, setDatum] = useState('');
  const [vreme, setVreme] = useState('');

  const filteredUsluge = usluge.filter((usluga) =>
    usluga.naziv.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsluge = filteredUsluge.slice(indexOfFirstItem, indexOfLastItem);

  const sortUsluge = (usluge) => {
    const sortedUsluge = [...usluge].sort((a, b) => {
      return sortType === 'asc' ? a.cena - b.cena : b.cena - a.cena;
    });
    return sortedUsluge;
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReserve = async (uslugaId) => {
    try {
      const userId = sessionStorage.getItem('user_id'); // user_id is stored in session
      const token = sessionStorage.getItem('access_token'); // authorization token
  
      if (!token) {
        console.error("No token found. Please log in again.");
        alert("Niste autorizovani. Prijavite se ponovo.");
        return;
      }
  
      const response = await axios.post(
        'http://127.0.0.1:8000/api/termini',
        {
          datum,
          vreme,
          usluga_id: uslugaId,
          zaposleni_id: selectedZaposlen,
          user_id: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        }
      );
  
      console.log("Reservation successful:", response.data.Poruka);
      alert("Uspesno ste zakazali termin!");
    } catch (error) {
      console.error("Error reserving appointment:", error);
      alert("Greska prilikom zakazivanja termina.");
    }
  };

  if (loadingUsluge || loadingZaposleni) return <p>Loading...</p>;
  if (errorUsluge) return <p>Error loading services: {errorUsluge.message}</p>;
  if (errorZaposleni) return <p>Error loading employees: {errorZaposleni.message}</p>;

  return (
    <div className="usluge">
      <input
        type="text"
        placeholder="Pretraga po nazivu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="asc">Sortiraj po ceni: Od najniže</option>
        <option value="desc">Sortiraj po ceni: Od najviše</option>
      </select>

      {/* Dropdown to select employee */}
      <div className='zaposleni'>
        <label htmlFor="zaposleni-dropdown" className="dropdown-label">Izaberite zaposlenog kod kog zelite da zakazete termin:</label>
        <select
          id="zaposleni-dropdown"
          value={selectedZaposlen}
          onChange={(e) => setSelectedZaposlen(e.target.value)}
        >
          <option value="">Izaberite zaposlenog za termin</option>
          {zaposleni.map((zaposlen) => (
            <option key={zaposlen.id} value={zaposlen.id}>
              {zaposlen.naziv}
            </option>
          ))}
        </select>
      </div>

      <ul className="usluge-lista">
        {sortUsluge(currentUsluge).map((usluga) => (
          <li key={usluga.id}>
            <h3>{usluga.naziv}</h3>
            <p>Opis kozmeticke usluge: {usluga.opis}</p>
            <p>Cena: {usluga.cena} din</p>
            
            {/* Date and time input for reservation */}
            <label>Datum:</label>
            <input
              type="date"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
            />

            <label>Vreme:</label>
            <input
              type="time"
              value={vreme}
              onChange={(e) => setVreme(e.target.value)}
            />

            <button onClick={() => handleReserve(usluga.id)}>Rezervisi</button>
          </li>
        ))}
      </ul>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredUsluge.length / itemsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
        ))}
      </div>

    </div>
  );
};

export default UslugeRezervacija;
