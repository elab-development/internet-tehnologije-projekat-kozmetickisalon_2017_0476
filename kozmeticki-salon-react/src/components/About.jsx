import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
      }, []);
    
      const fetchImages = async () => {
        try {
          const response = await axios.get('https://api.pexels.com/v1/search?query=spa%20pink&per_page=5', {
            headers: {
              Authorization: 'wuhSEjGr9Ic6P6cdnleyLniY8pPH7reJzUNKVoM7R9tWyjxoqspr2PZb' 
            }
          });
          setImages(response.data.photos);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const extraDetails = (
        <div>
            <p>Ova aplikacija je razvijena za pružanje informacija o našem salonu lepote.</p>
            <p>Naš cilj je da omogućimo korisnicima da saznaju više o uslugama koje nudimo i našem timu.</p>
        </div>
    );

    return (
        <div className="about">
            <div className='about-tekst'>
            <h2>O Aplikaciji</h2>
            <p>Dobrodošli u našu aplikaciju za upravljanje salonima lepote!</p>
            <button onClick={toggleDetails}>
                {showDetails ? 'Sakrij detalje' : 'Prikaži više detalja'}
            </button>
            {showDetails && extraDetails}
            </div>
            <div className="image-container-about">
                {images.map((image, index) => (
                    <img key={index} src={image.src.medium} alt={`Spa ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default About;