import React from 'react';
import useZaposleni from './custom-hooks/useZaposleni';

const SpaSpecialists = () => {

  const { zaposleni, loading, error } = useZaposleni('http://127.0.0.1:8000/api/zaposleni');
  
  if (loading) return <p>Loading spa specialists...</p>;
  if (error) return <p>Error loading spa specialists: {error.message}</p>;


  return (
    <div className='specialists-page'>
          <ul className="zaposleni-lista">
            {zaposleni.map((zaposlen, index) => (
              <li key={index}>
                <h3>{zaposlen.naziv}</h3>
                <p>Strucna sprema: {zaposlen.strucna_sprema}</p>
                <p>Telefon: {zaposlen.kontakt_telefon}</p>
                <p>Email: {zaposlen.email}</p>
              </li>
            ))}
          </ul> 
     </div>
    
  );
};

export default SpaSpecialists;