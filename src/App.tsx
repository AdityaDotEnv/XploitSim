import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ScrollToTop from './components/ScrollToTop.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

// Feature Components
import AuthenticationFailures from './features/auth/components/AuthenticationFailures.tsx';
import AuthenticationSandbox from './features/auth/components/AuthenticationSandbox.tsx';

import BrokenAccessControl from './features/broken-access-control/components/BrokenAccessControl.tsx';
import BrokenAccessControlSandbox from './features/broken-access-control/components/BrokenAccessControlSandbox.tsx';

import CryptographicFailures from './features/crypto/components/CryptographicFailures.tsx';
import CryptographicFailuresSandbox from './features/crypto/components/CryptographicFailuresSandbox.tsx';

import Injection from './features/injection/components/Injection.tsx';
import InjectionSandbox from './features/injection/components/InjectionSandbox.tsx';

import InsecureDesign from './features/insecure-design/components/InsecureDesign.tsx';
import InsecureDesignSandbox from './features/insecure-design/components/InsecureDesignSandbox.tsx';

import SecurityMisconfiguration from './features/misconfiguration/components/SecurityMisconfiguration.tsx';
import SecurityMisconfigurationSandbox from './features/misconfiguration/components/SecurityMisconfigurationSandbox.tsx';

import VulnerableComponents from './features/vulnerable-components/components/VulnerableComponents.tsx';

import SoftwareDataIntegrity from './features/software-integrity/components/SoftwareDataIntegrity.tsx';
import SecurityLoggingFailures from './features/logging/components/SecurityLoggingFailures.tsx';
import ServerSideRequestForgery from './features/ssrf/components/ServerSideRequestForgery.tsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Vulnerability Pages */}
          <Route path="/broken-access-control" element={<BrokenAccessControl />} />
          <Route path="/broken-access-control/demo" element={<BrokenAccessControlSandbox key={Date.now()} />} />
          <Route path="/broken-access-control/sandbox" element={<BrokenAccessControlSandbox key={Date.now()} />} />

          <Route path="/cryptographic-failures" element={<CryptographicFailures />} />
          <Route path="/cryptographic-failures/demo" element={<CryptographicFailuresSandbox />} />

          <Route path="/injection" element={<Injection />} />
          <Route path="/injection-sandbox" element={<InjectionSandbox />} />

          <Route path="/insecure-design" element={<InsecureDesign />} />
          <Route path="/insecure-design/sandbox" element={<InsecureDesignSandbox />} />

          <Route path="/security-misconfiguration" element={<SecurityMisconfiguration />} />
          <Route path="/security-misconfiguration/sandbox" element={<SecurityMisconfigurationSandbox />} />

          <Route path="/vulnerable-components" element={<VulnerableComponents />} />
          <Route path="/authentication-failures" element={<AuthenticationFailures />} />
          <Route path="/software-data-integrity" element={<SoftwareDataIntegrity />} />
          <Route path="/security-logging-failures" element={<SecurityLoggingFailures />} />
          <Route path="/server-side-request-forgery" element={<ServerSideRequestForgery />} />

          {/* Other Sandbox Routes */}
          <Route path="/sandbox/authentication-failures" element={<AuthenticationSandbox />} />
          <Route path="/sandbox/broken-access-control" element={<BrokenAccessControlSandbox key={Date.now()} />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
