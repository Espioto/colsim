import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <div className="logo-container">
            <span className="logo-title">The Cost of Living Simulation</span>
            <span className="logo-subtitle">By: Mason Smith</span>
          </div>
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/simulation" className="nav-links">
              Play
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/learn" className="nav-links">
              Learn
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/donate" className="nav-links">
              Support
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
