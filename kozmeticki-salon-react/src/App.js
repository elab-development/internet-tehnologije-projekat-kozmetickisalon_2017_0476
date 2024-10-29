import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SpaSpecialists from './components/SpaSpecialists';
import KozmetickeUsluge from './components/KozmetickeUsluge';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import About from './components/About';
import Korisnici from './components/Korisnici';
import UslugeRezervacija from './components/UslugeRezervacija';
import ZakazaniTermini from './components/ZakazaniTermini';


function App() {

  const [token, setToken] = useState(sessionStorage.getItem('access_token'));
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('is_admin') === 'true');

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setIsAdmin={setIsAdmin} />} />
          <Route path="/register" element={<RegisterForm />} />
  
          {/* Routes available only when the user is logged in */}
          {token && (
            <>
              {isAdmin ? (
                <>
                  <Route path="/kor" element={<Korisnici />} />
                  <Route path="/spa-services" element={<KozmetickeUsluge />} />
                </>
              ) : (
                <>
                  <Route path="/spa-specialists" element={<SpaSpecialists />} />
                  <Route path="/spa-services-termin" element={<UslugeRezervacija/>} />
                  <Route path="/termini" element={<ZakazaniTermini/>} />
                </>
              )}
            </>
          )}
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
