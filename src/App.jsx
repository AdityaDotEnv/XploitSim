import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Understand from './components/Understand';
import Securesection from './components/Securesection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OWASPTop10 from './components/OWASPTop10';
import BrokenAccessControl from './components/BrokenAccessControl';
import BrokenAccessControlSandbox from './components/BrokenAccessControlSandbox';
import CryptographicFailures from './components/CryptographicFailures';
import CryptographicFailuresSandbox from "./components/CryptographicFailuresSandbox";
import Injection from './components/Injection';
import InjectionSandbox from './components/InjectionSandbox';   // ⭐ ADDED
import InsecureDesign from './components/InsecureDesign';
import SecurityMisconfiguration from './components/SecurityMisconfiguration';
import VulnerableComponents from './components/VulnerableComponents';
import AuthenticationFailures from './components/AuthenticationFailures';
import SoftwareDataIntegrity from './components/SoftwareDataIntegrity';
import SecurityLoggingFailures from './components/SecurityLoggingFailures';
import ServerSideRequestForgery from './components/ServerSideRequestForgery';
import AuthenticationSandbox from './components/AuthenticationSandbox';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <div className="hero-container">
        <img src="herophoto.jpg" alt="Hero" />
        <div className="hero-text">
          <h1>Discover the OWASP Top 10 Vulnerabilities</h1>
          <h4>
            Welcome to our platform, where we illuminate the critical OWASP Top 10
            security vulnerabilities that every developer should know. Stay informed
            and protect your applications with our comprehensive insights and
            resources.
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
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* OWASP Vulnerability Pages */}
            <Route path="/broken-access-control" element={<BrokenAccessControl />} />
            <Route path="/broken-access-control/demo" element={<BrokenAccessControlSandbox key={Date.now()} />} />
            {/* Added missing sandbox route */}
            <Route path="/broken-access-control/sandbox" element={<BrokenAccessControlSandbox key={Date.now()} />} />
            <Route path="/cryptographic-failures" element={<CryptographicFailures />} />
            <Route path="/cryptographic-failures/demo" element={<CryptographicFailuresSandbox />} />
            <Route path="/injection" element={<Injection />} />

            {/* ⭐ Added NEW Injection Sandbox Route */}
            <Route path="/injection-sandbox" element={<InjectionSandbox />} />

            <Route path="/insecure-design" element={<InsecureDesign />} />
            <Route path="/security-misconfiguration" element={<SecurityMisconfiguration />} />
            <Route path="/vulnerable-components" element={<VulnerableComponents />} />
            <Route path="/authentication-failures" element={<AuthenticationFailures />} />
            <Route path="/software-data-integrity" element={<SoftwareDataIntegrity />} />
            <Route path="/security-logging-failures" element={<SecurityLoggingFailures />} />
            <Route path="/server-side-request-forgery" element={<ServerSideRequestForgery />} />

            {/* Sandbox Routes */}
            <Route path="/sandbox/authentication-failures" element={<AuthenticationSandbox />} />
            <Route path="/sandbox/broken-access-control" element={<BrokenAccessControlSandbox key={Date.now()} />} />

            {/* Fallback Route */}
            <Route
              path="*"
              element={
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '100px',
                    fontFamily: 'sans-serif',
                  }}
                >
                  <h2>404 - Page Not Found</h2>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
