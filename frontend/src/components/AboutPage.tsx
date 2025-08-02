import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => (
  <div className="about-container">
    <h1>About Us</h1>
    <p>
      We are a passionate team of healthcare professionals, technologists, and designers dedicated to making preventive health accessible to everyone. Our mission is to empower individuals with the knowledge and tools to assess and manage their health risks proactively.
    </p>
    <h2>Our Vision</h2>
    <p>
      To create a healthier world by enabling early detection and personalized health guidance for all.
    </p>
    <h2>Contact</h2>
    <p>
      For questions or feedback, please email us at <a href="mailto:info@healthriskplatform.com">info@healthriskplatform.com</a>.
    </p>
  </div>
);

export default AboutPage;
