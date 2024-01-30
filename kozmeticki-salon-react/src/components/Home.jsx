import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [images, setImages] = useState([]);
  const [displayedIndexes, setDisplayedIndexes] = useState([0, 1]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search?query=spa&per_page=10', {
        headers: {
          Authorization: 'wuhSEjGr9Ic6P6cdnleyLniY8pPH7reJzUNKVoM7R9tWyjxoqspr2PZb' 
        }
      });
      setImages(response.data.photos);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const reloadImages = () => {
    const randomIndexes = new Set();
    while (randomIndexes.size < 2) {
      const index = Math.floor(Math.random() * images.length);
      randomIndexes.add(index);
    }
    setDisplayedIndexes([...randomIndexes]); 
  };

  return (
    <div className="home">
        <div className='home-tekst'>
      <h1>Dobrodošli u naš salon lepote</h1>
      <div className="image-container">
        {images.length > 0 && displayedIndexes.map(index => (
        <img key={images[index].id} src={images[index].src.medium} alt="Spa" />
        ))}
        </div>
      <p>
      U našem salonu lepote, svaki tretman je pažljivo osmišljen kako bi vam pružio osećaj luksuza i revitalizacije.
      </p>
      <p>
      Neka naš salon lepote bude vaša oaza mira i lepote, gde se možete opustiti i prepustiti uživanju u vrhunskoj nezi.
      </p>
      <button onClick={reloadImages}>Generiši nove slike</button>
      </div>
    </div>
  );
}

export default Home;
