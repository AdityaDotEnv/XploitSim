import React from "react";
import "./BrokenAccessControl.css";
import { useNavigate } from "react-router-dom";

const BrokenAccessControl = () => {
  const navigate = useNavigate();

  return (
    <div className="broken-access-page">
      {/* Hero Section */}
      <section className="bac-hero">
        <div className="bac-hero-content">
          <div className="bac-hero-text">
            <div className="bac-badge">A01:2021</div>
            <h1 className="bac-title">Broken Access Control</h1>
            <p className="bac-subtitle">
              The #1 most critical web application security risk. Access control enforces policy so users cannot act outside of their intended permissions.
            </p>
            <div className="bac-stats">
              <div className="stat">
                <span className="stat-number">94%</span>
                <span className="stat-label">of applications</span>
              </div>
              <div className="stat">
                <span className="stat-number">#1</span>
                <span className="stat-label">OWASP Rank</span>
              </div>
              <div className="stat">
                <span className="stat-number">High</span>
                <span className="stat-label">Impact</span>
              </div>
            </div>
          </div>
          <div className="bac-hero-visual">
            <div className="security-shield">
              <div className="shield-icon">🛡️</div>
              <div className="shield-text">Access Control</div>
            </div>
          </div>
        </div>
        <div className="bac-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Overview Section, Vectors, Examples, and Prevention remain unchanged */}
      {/* ... */}

      {/* Code Examples */}
      <section className="bac-section bac-code">
        <div className="bac-container">
          <h2>Secure Code Examples</h2>
          <div className="code-comparison">
            <div className="code-block vulnerable">
              <h4>❌ Vulnerable Code</h4>
              <pre>{`// UNSAFE: No access control check
app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  res.json(user);
});

// UNSAFE: Client-side control only
function deleteUser(userId) {
  if (currentUser.role === 'admin') {
    // Client-side check can be bypassed
    api.deleteUser(userId);
  }
}`}</pre>
            </div>
            <div className="code-block secure">
              <h4>✅ Secure Code</h4>
              <pre>{`// SAFE: Server-side access control
app.get('/api/users/:id', (req, res) => {
  if (req.user.id !== req.params.id && 
      !req.user.roles.includes('admin')) {
    return res.status(403).json({error: 'Forbidden'});
  }
  const user = getUserById(req.params.id);
  res.json(user);
});

// SAFE: Comprehensive server validation
function deleteUser(userId) {
  if (!hasPermission(req.user, 'delete_user', userId)) {
    throw new Error('Insufficient permissions');
  }
  api.deleteUser(userId);
}`}</pre>
            </div>
          </div>
        </div>

        {/* Interactive Button and Sandbox */}
        <div className="bac-try-section">
          <div className="try-btn-container">
            <button
              type="button"
              className="try-it-btn"
              onClick={() => navigate("/broken-access-control/demo")}
            >
              🚀 Try it Yourself
            </button>
          </div>
        </div>


      </section>

      {/* Resources Section */}
      <section className="bac-section bac-resources">
        <div className="bac-container">
          <h2>Additional Resources</h2>
          <div className="resources-grid">
            <a
              href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
              className="resource-card"
            >
              <div className="resource-icon">📚</div>
              <h3>OWASP Official Documentation</h3>
              <p>Complete technical details and mitigation strategies</p>
            </a>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html"
              className="resource-card"
            >
              <div className="resource-icon">🛡️</div>
              <h3>Access Control Cheat Sheet</h3>
              <p>Quick reference for secure implementation</p>
            </a>
            <a
              href="https://portswigger.net/web-security/access-control"
              className="resource-card"
            >
              <div className="resource-icon">🔍</div>
              <h3>PortSwigger Academy</h3>
              <p>Interactive labs and learning materials</p>
            </a>
            <a
              href="https://cwe.mitre.org/data/definitions/639.html"
              className="resource-card"
            >
              <div className="resource-icon">📋</div>
              <h3>CWE-639: Authorization Bypass</h3>
              <p>Common Weakness Enumeration details</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrokenAccessControl;