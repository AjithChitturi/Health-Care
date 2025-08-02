import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import { Questionnaire } from './components/Questionnaire';
import { UserDashboard } from './components/UserDashboard';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/questionnaire" replace /> : <LoginForm onLogin={() => setIsLoggedIn(true)} />
        } />
        <Route path="/register" element={
          isLoggedIn ? <Navigate to="/questionnaire" replace /> : <RegisterForm onRegister={() => { setIsLoggedIn(false); }} />
        } />
        <Route path="/dashboard" element={
          isLoggedIn ? <UserDashboard /> : <Navigate to="/login" replace />
        } />
        <Route path="/questionnaire" element={
          isLoggedIn ? <Questionnaire /> : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;