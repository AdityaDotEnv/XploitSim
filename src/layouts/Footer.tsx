import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo & Brief */}
        <div className="footer-logo-section">
          <img src="/logo32.png" alt="Logo" className="footer-logo" />
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#9ca3af', maxWidth: '250px' }}>
            Empowering developers through interactive security education and practical vulnerability simulations.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Platform</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener noreferrer">OWASP Top 10</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Support</h4>
          <p>Email: security@xploitsim.dev</p>
          <p>Location: Worldwide / Remote</p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} XploitSim Project. All rights reserved.</p>
      </div>
    </footer>
  );
}
