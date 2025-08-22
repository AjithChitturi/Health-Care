import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

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

// Helper function to decode JWT
const decodeToken = (token: string): { user_id: number; username: string; exp: number } | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check if the token has a 'username' claim
    return 'username' in payload ? payload : null;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

// Placeholder component for admin's detailed review page
const AdminReviewPage = () => {
  const { id } = useParams();
  return <h1>Reviewing Submission ID: {id}</h1>;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState<'patient' | 'admin' | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUsername(decoded.username);
        setUserRole(decoded.username === 'admin' ? 'admin' : 'patient');
      } else {
        setUsername(null);
        setUserRole(null);
      }
    } else {
      setUsername(null);
      setUserRole(null);
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);
    setUsername(null);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} username={username} onLogout={handleLogout} />
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
          element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" replace />}
        />
        <Route 
          path="/questionnaire"
          element={isLoggedIn ? <Questionnaire /> : <Navigate to="/login" replace />}
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