import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserMd, FaSpa, FaInfoCircle } from 'react-icons/fa'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <FaHome className="nav-icon" />
             Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/spa-specialists" className="nav-link">
            <FaUserMd className="nav-icon" />
             Spa Specialists
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/spa-services" className="nav-link">
            <FaSpa className="nav-icon" />
             Spa Services
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about-us" className="nav-link">
            <FaInfoCircle className="nav-icon" />
             About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;