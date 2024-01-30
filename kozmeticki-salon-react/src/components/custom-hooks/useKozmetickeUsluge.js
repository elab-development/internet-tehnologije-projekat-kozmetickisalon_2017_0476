import { useState, useEffect } from 'react';
import axios from 'axios';

const useKozmetickeUsluge = (url) => {

  const [usluge, setUsluge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUsluge = async () => {
      try {
        const response = await axios.get(url);

        setUsluge(response.data.data);

        setLoading(false);

      } catch (error) {

        setError(error);

        setLoading(false);
      }
    };

    fetchUsluge();

  }, [url]); 

  //sta sve vracamo
  return { usluge, loading, error };
};

export default useKozmetickeUsluge;