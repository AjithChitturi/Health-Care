import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC<{ isLoggedIn: boolean; onLogout?: () => void }> = ({ isLoggedIn, onLogout }) => (
  <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/">Health Risk Platform</Link>
    </div>
    <div className="navbar-links">
      <Link to="/about">About</Link>
      {isLoggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/questionnaire">Questionnaire</Link>
          <button className="navbar-btn" onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  </nav>
);

export default Navbar;
