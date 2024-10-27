import React from 'react';
import { FaHome, FaUserMd, FaSpa, FaInfoCircle } from 'react-icons/fa'; 
import { FaPersonCircleCheck } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navbar = ({ token, setToken, isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
          const token = sessionStorage.getItem('access_token');
          const tokenType = sessionStorage.getItem('token_type');
          await axios.post('http://127.0.0.1:8000/api/logout', {}, {
              headers: {
                  'Authorization': `${tokenType} ${token}`
              }
          });
          // Brišemo podatke iz sessionStorage
          sessionStorage.clear();

          // Resetujemo state
          setToken(null);
          setIsAdmin(false);

          console.log(`Logout successful. User has been logged out.`);
          navigate('/');
      } catch (error) {
          console.error('Logout failed:', error);
      }
  };

  return (
      <nav className="navbar">
          <ul className="navbar-nav">
              
              {/* Zajedničke stranice dostupne svim korisnicima */}
              <li className="nav-item">
              <Link to="/" className="nav-link">
              <FaHome className="nav-icon" />
               Home
              </Link>
              </li>

              {/* Stranice dostupne samo kada korisnik NIJE prijavljen */}
              {!token && (
                  <>
                      <li className="nav-item">
                      <Link to="/about-us" className="nav-link">
                      <FaInfoCircle className="nav-icon" />
                      About Us
                      </Link>
                      </li>
                      
                      <li className="nav-item">
                          <Link to="/login" className="nav-link"> 
                          <FaPersonCircleCheck className="nav-icon"> </FaPersonCircleCheck>
                          Login</Link>
                      </li>

                      <li className="nav-item">
                          <Link to="/register" className="nav-link"> Register</Link>
                      </li>
                  </>
              )}

              {/* Stranice dostupne samo prijavljenim korisnicima */}
              {token && (
                  <>
                   <li className="nav-item">
                              <Link to="/spa-services" className="nav-link">
                             <FaSpa className="nav-icon" />
                              Spa Services
                              </Link>
                              
                          </li>
                      
                      {/* Prikaz stranica prema ulozi korisnika */}
                      {isAdmin ? (
                          <li className="nav-item">
                              <Link to="/kor" className="nav-link">Korisnici</Link>
                          </li>
                      ) : (
                          <li className="nav-item">
                            <Link to="/spa-specialists" className="nav-link">
                            <FaUserMd className="nav-icon" />
                            Spa Specialists
                            </Link>
                          </li>
                      )}

                      {/* Logout dugme za prijavljene korisnike */}
                      <li>
                          <button onClick={handleLogout}>Logout</button>
                      </li>
                  </>
              )}
          </ul>
      </nav>
  );
};

export default Navbar;