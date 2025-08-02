import React, { useState } from 'react';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { Questionnaire } from './Questionnaire';

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  if (!isLoggedIn) {
    return (
      <div>
        {showRegister ? (
          <>
            <RegisterForm onRegister={() => { setShowRegister(false); }} />
            <button onClick={() => setShowRegister(false)}>Back to Login</button>
          </>
        ) : (
          <>
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
            <button onClick={() => setShowRegister(true)}>Register</button>
          </>
        )}
      </div>
    );
  }

  return <Questionnaire />;
};
