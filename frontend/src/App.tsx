// src/App.tsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Pages & Components
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import { Questionnaire } from './components/Questionnaire';
import { UserDashboard } from './components/UserDashboard';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminReviewPage } from './components/AdminReviewPage';

// HARDCODED ADMIN CREDENTIALS - Match these with your backend views.py
const ADMIN_USERNAME = "healthadmin";
const ADMIN_EMAIL = "admin@healthplatform.com";

// Helper function to decode JWT
const decodeToken = (token: string): { username?: string; email?: string; user_id: number; exp: number } | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

// Check if user is admin based on hardcoded credentials
const isAdminUser = (username?: string, email?: string): boolean => {
  return username === ADMIN_USERNAME || email === ADMIN_EMAIL;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState<'patient' | 'admin' | null>(null);
  const [, setCurrentUser] = useState<{ username?: string; email?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setCurrentUser({ username: decoded.username, email: decoded.email });
        setUserRole(isAdminUser(decoded.username, decoded.email) ? 'admin' : 'patient');
      }
    } else {
      setUserRole(null);
      setCurrentUser(null);
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // The useEffect will handle setting the role based on the new token
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUser(null);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* --- AUTHENTICATION ROUTES --- */}
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginForm onLogin={handleLoginSuccess} />} 
        />
        <Route 
          path="/register" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <RegisterForm onRegister={() => { /* can redirect to login */ }} />}
        />

        {/* --- USER PROTECTED ROUTES --- */}
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn ? (
              userRole === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <UserDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route 
          path="/questionnaire"
          element={isLoggedIn && userRole === 'patient' ? <Questionnaire /> : <Navigate to="/login" replace />}
        />

        {/* --- ADMIN PROTECTED ROUTES --- */}
        <Route 
          path="/admin/dashboard"
          element={(isLoggedIn && userRole === 'admin') ? <AdminDashboard /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/admin/review/:id"
          element={(isLoggedIn && userRole === 'admin') ? <AdminReviewPage /> : <Navigate to="/dashboard" replace />}
        />
        
        {/* --- FALLBACK ROUTE --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;