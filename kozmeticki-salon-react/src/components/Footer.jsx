import React from 'react';

const Footer = () => {
  
  const handleMapClick = () => {
    alert('Hvala što koristite našu uslugu!');
  };

  return (
    <footer className="footer">
      <p>© 2024 Kozmetički salon LADY</p>
      <p>Adresa: West 65 </p>
      <p>Telefon: 064-456-7890</p>
      <a href="https://www.google.com/maps/place/Salon+lepote+Lady+(West+65)/@44.8120743,20.400832,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipOOgJPOlZjtv7pwm1yppmZY0IOEipOwvQ3cxpRh!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOOgJPOlZjtv7pwm1yppmZY0IOEipOwvQ3cxpRh%3Dw129-h86-k-no!7i2048!8i1365!4m11!1m2!2m1!1skozmeticki+salon+lady!3m7!1s0x475a6f25dfc4a2e5:0xcb34093fa26f21!8m2!3d44.8121241!4d20.400713!10e5!15sChVrb3ptZXRpY2tpIHNhbG9uIGxhZHlaFyIVa296bWV0aWNraSBzYWxvbiBsYWR5kgEMYmVhdXR5X3NhbG9umgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5IWHpoMmJ5MTNSUkFC4AEA!16s%2Fg%2F11ndw8171l?entry=ttu"
       target="_blank" rel="noopener noreferrer" 
       onClick={handleMapClick}>Pronađi nas na Google mapi</a>
    </footer>
  );
}

export default Footer;