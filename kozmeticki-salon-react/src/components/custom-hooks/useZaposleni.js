import { useState, useEffect } from 'react';
import axios from 'axios';

const useZaposleni = (urlAdresa) => {

  const [zaposleni, setZaposleni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsluge = async () => {
      try {

        const response = await axios.get(urlAdresa);

        setZaposleni(response.data.data);

        setLoading(false);

      } catch (error) {

        setError(error);

        setLoading(false);

      }
    };

    fetchUsluge();

  }, [urlAdresa]); 

  //sta sve vracamo
  return { zaposleni, loading, error };
};

export default useZaposleni;