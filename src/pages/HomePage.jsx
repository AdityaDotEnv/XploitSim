import React from 'react';
import OWASPTop10 from '../features/landing/components/OWASPTop10';
import Securesection from '../features/landing/components/Securesection';
import Understand from '../features/landing/components/Understand';
import Contact from '../features/landing/components/Contact';

const HomePage = () => {
  return (
    <>
      <div className="hero-container">
        <img src="/herophoto.jpg" alt="Hero" />
        <div className="hero-text">
          <h1>Discover the OWASP Top 10 Vulnerabilities</h1>
          <h4>
            Welcome to our platform, where we illuminate the critical OWASP Top 10
            security vulnerabilities that every developer should know.
          </h4>
        </div>
      </div>

      <div id="owasp">
        <OWASPTop10 />
      </div>

      <div id="secure">
        <Securesection />
      </div>

      <div id="understand">
        <Understand />
      </div>

      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default HomePage;
