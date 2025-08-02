import React, { useState } from 'react';
import { Questionnaire } from './components/Questionnaire';
import { UserDashboard } from './components/UserDashboard';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';

type Page = 'dashboard' | 'questionnaire' | 'login' | 'register';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(() => {
    return localStorage.getItem('token') ? 'dashboard' : 'login';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setPage('login');
  };

  if (!isLoggedIn) {
    if (page === 'register') {
      return (
        <div>
          <RegisterForm onRegister={() => setPage('login')} />
          <button onClick={() => setPage('login')}>Back to Login</button>
        </div>
      );
    }
    return (
      <div>
        <LoginForm onLogin={() => { setIsLoggedIn(true); setPage('dashboard'); }} />
        <button onClick={() => setPage('register')}>Register</button>
      </div>
    );
  }

  return (
    <div>
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setPage('dashboard')}>Dashboard</button>
        <button onClick={() => setPage('questionnaire')}>Questionnaire</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {page === 'dashboard' && <UserDashboard />}
      {page === 'questionnaire' && <Questionnaire />}
    </div>
  );
};

export default App;
