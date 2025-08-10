// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// 1. DEFINE AN INTERFACE FOR THE COMPONENT'S PROPS
// This explicitly tells TypeScript what to expect, fixing the error.
interface NavbarProps {
  isLoggedIn: boolean;
  userRole: 'patient' | 'admin' | null;
  onLogout?: () => void;
}

// 2. USE THE NEW INTERFACE AND DESTRUCTURE THE NEW 'userRole' PROP
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, userRole, onLogout }) => (
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
          
          {/* 3. ADDED: CONDITIONALLY RENDER THE ADMIN LINK */}
          {/* This link will only appear if the logged-in user is an admin. */}
          {userRole === 'admin' && (
            <Link to="/admin/dashboard" style={{ fontWeight: 'bold', color: '#f8ffae' }}>
                Admin Tools
            </Link>
          )}

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