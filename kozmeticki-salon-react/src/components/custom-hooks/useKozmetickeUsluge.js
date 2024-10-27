import { useState, useEffect } from 'react';
import axios from 'axios';

const useKozmetickeUsluge = (url) => {
  const [usluge, setUsluge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('access_token'); // Retrieve the token

  useEffect(() => {
    const fetchUsluge = async () => {
      try {
        // Include the Authorization header with the token
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUsluge(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsluge();
  }, [url, token]); // Include token as a dependency to refetch if it changes

  return { usluge, loading, error };
};

export default useKozmetickeUsluge;