import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Proactive Health Risk Assessment</h1>
        <p className="landing-motive">
          Empowering you to take charge of your health. Our platform helps you assess your health risks early, providing personalized insights and recommendations.
        </p>
      </header>
      <section className="landing-about">
        <h2>About the Questionnaire</h2>
        <p>
          The health risk questionnaire is designed by experts to evaluate your lifestyle, medical history, and preventive care. It takes just a few minutes and can help you understand your health risks and what you can do to improve your well-being.
        </p>
      </section>
      <div className="landing-actions">
        <Link to="/questionnaire" className="landing-btn">Start Assessment</Link>
      </div>
      <footer className="landing-footer">
        <Link to="/about" className="footer-link">About Us</Link>
      </footer>
    </div>
  );
};

export default LandingPage;
