import React, { useState } from 'react';
import useKozmetickeUsluge from './custom-hooks/useKozmetickeUsluge';

const KozmetickeUsluge = () => {
  const { usluge, loading, error } = useKozmetickeUsluge('http://127.0.0.1:8000/api/usluge');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Broj usluga po stranici

  const filteredUsluge = usluge.filter((usluga) =>
    usluga.naziv.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsluge = filteredUsluge.slice(indexOfFirstItem, indexOfLastItem);

  const sortUsluge = (usluge) => {
    const sortedUsluge = [...usluge].sort((a, b) => {
      if (sortType === 'asc') {
        return a.cena - b.cena;
      } else {
        return b.cena - a.cena;
      }
    });
    return sortedUsluge;
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
      <ul className="usluge-lista">
        {sortUsluge(currentUsluge).map((usluga) => (
          <li key={usluga.id}>
            <h3>{usluga.naziv}</h3>
            <p>Opis kozmeticke usluge: {usluga.opis}</p>
            <p>Cena: {usluga.cena} din</p>
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

export default KozmetickeUsluge;
