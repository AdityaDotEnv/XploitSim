import React, { useState } from 'react';
import SecurityLoggingFailuresDemo from './SecurityLoggingFailuresDemo';
import '../../vulnerable-components/assets/VulnerabilityPage.css';

const SecurityLoggingFailures: React.FC = () => {
    const [showDemo, setShowDemo] = useState<boolean>(false);

    return (
        <div className="vulnerability-page">
            <section className="vp-hero">
                <div className="vp-hero-content">
                    <div className="vp-hero-text">
                        <div className="vp-badge">A09:2021</div>
                        <h1 className="vp-title">Security Logging and Monitoring Failures</h1>
                        <p className="vp-subtitle">
                            Insufficient logging and monitoring allow attackers to remain undetected for long periods, enabling them to expand their foothold and exfiltrate data.
                        </p>
                        <div className="vp-stats">
                            <div className="vp-stat">
                                <span className="vp-stat-number">#9</span>
                                <span className="vp-stat-label">OWASP Rank</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">Medium</span>
                                <span className="vp-stat-label">Impact</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">Critical</span>
                                <span className="vp-stat-label">Detection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-overview">
                <div className="vp-container">
                    <h2>Understanding Logging Failures</h2>
                    <div className="vp-overview-grid">
                        <div className="vp-overview-content">
                            <p>
                                Security logging and monitoring failures occur when critical security events are not logged, logs are not monitored, or alerting is inadequate. This allows attackers to perform reconnaissance, pivot to other systems, and maintain persistence without being detected.
                            </p>
                            <p>
                                Modern applications should have comprehensive logging, centralized log management, and real-time alerting to respond to security incidents promptly.
                            </p>
                            <div className="vp-impact-box">
                                <h4>🚨 Major Consequences</h4>
                                <ul>
                                    <li>Delayed detection of security breaches</li>
                                    <li>Inability to perform effective incident response</li>
                                    <li>Lack of evidence for forensic investigations</li>
                                    <li>Increased damage and data loss from prolonged attacks</li>
                                    <li>Compliance violations (e.g., GDPR, PCI DSS)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-vectors">
                <div className="vp-container">
                    <h2>Common Logging Failures</h2>
                    <div className="vp-vectors-grid">
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">🔕</div>
                            <h3>Inadequate Logging</h3>
                            <p>Failing to log sensitive events like failed login attempts, high-value transactions, or administrative actions.</p>
                            <div className="vp-vector-example">
                                <code>Brute-force attacks going unlogged</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">🕵️‍♂️</div>
                            <h3>Missing Alerting</h3>
                            <p>Logging events but failing to trigger alerts for suspicious activities in real-time.</p>
                            <div className="vp-vector-example">
                                <code>Multiple failed logins from the same IP without an alert</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-medium">
                            <div className="vp-vector-icon">📜</div>
                            <h3>Local-Only Logging</h3>
                            <p>Storing logs only on the local server where they can be easily deleted or tampered with by an attacker.</p>
                            <div className="vp-vector-example">
                                <code>Attacker wiping /var/log/auth.log to hide traces</code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real World Examples */}
            <section className="vp-section vp-examples">
                <div className="vp-container">
                    <h2>Real-World Detection Failures</h2>
                    <div className="vp-examples-timeline">
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2021</div>
                            <div className="vp-timeline-content">
                                <h4>SolarWinds (Revisited)</h4>
                                <p>Attackers remained in the network for months before being detected, partly due to the stealthy nature of the breach and inadequate monitoring of unusual activities.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">6+ Months Dwell Time</span>
                                    <span className="vp-impact-badge">Stealth Attack</span>
                                </div>
                            </div>
                        </div>
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2013</div>
                            <div className="vp-timeline-content">
                                <h4>Target Data Breach</h4>
                                <p>Security warnings were triggered but ignored by the security team, allowing attackers to exfiltrate data for weeks.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">40M Credit Cards</span>
                                    <span className="vp-impact-badge">Ignored Alerts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prevention Section */}
            <section className="vp-section vp-prevention">
                <div className="vp-container">
                    <h2>Best Practices & Strategies</h2>
                    <div className="vp-prevention-grid">
                        <div className="vp-prevention-category">
                            <h3>🛡️ Logging Strategy</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Log Sensitive Events</h4>
                                    <p>Log all authentication, authorization, and data access attempts.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Centralized Logging</h4>
                                    <p>Send all logs to a central, secure server or SIEM for analysis and storage.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Append-Only Logs</h4>
                                    <p>Ensure that logs are stored in an append-only format to prevent tampering.</p>
                                </div>
                            </div>
                        </div>
                        <div className="vp-prevention-category">
                            <h3>🔍 Monitoring & Alerting</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Real-Time Alerting</h4>
                                    <p>Configure alerts for suspicious patterns like rapid multiple failed logins or unauthorized access attempts.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Regular Auditing</h4>
                                    <p>Periodically review logs and security events to identify previously undetected threats.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Examples */}
            <section className="vp-section vp-code">
                <div className="vp-container">
                    <h2>Secure Logging Implementation</h2>
                    <div className="vp-code-comparison">
                        <div className="vp-code-block vp-vulnerable">
                            <h4>❌ Inadequate Logging</h4>
                            <pre>{`// UNSAFE: No logging of failed attempts
app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  if (!authenticate(user, pass)) {
    return res.status(401).send('Invalid');
  }
  // ... success logic
});`}</pre>
                        </div>
                        <div className="vp-code-block vp-secure">
                            <h4>✅ Robust Security Logging</h4>
                            <pre>{`// SAFE: Detailed security logging
app.post('/login', async (req, res) => {
  const { user, pass } = req.body;
  const ip = req.ip;

  if (!authenticate(user, pass)) {
    logger.warn({
      event: 'LOGIN_FAILURE',
      userId: user,
      ipAddress: ip,
      timestamp: new Date().toISOString()
    });
    
    // Check for brute force
    if (await checkBruteForce(ip)) {
      alertAdmin('Brute force attempt detected from IP: ' + ip);
    }
    
    return res.status(401).send('Invalid credentials');
  }
  
  logger.info({ event: 'LOGIN_SUCCESS', userId: user });
});`}</pre>
                        </div>
                    </div>
                </div>

                {/* Updated Button → Toggle Demo */}
                <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => setShowDemo(!showDemo)}
                >
                    {showDemo ? "Hide Demo" : "Try it Yourself"}
                </button>

                {showDemo && (
                    <div style={{ marginTop: '20px' }}>
                        <SecurityLoggingFailuresDemo />
                    </div>
                )}
            </section>

            {/* Resources */}
            <section className="vp-section vp-resources">
                <div className="vp-container">
                    <h2>Additional Resources</h2>
                    <div className="vp-resources-grid">
                        <a href="https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/" className="vp-resource-card">
                            <div className="vp-resource-icon">📚</div>
                            <h3>OWASP Guide</h3>
                            <p>Complete documentation for Logging and Monitoring failures</p>
                        </a>
                        <a href="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html" className="vp-resource-card">
                            <div className="vp-resource-icon">🛡️</div>
                            <h3>Logging Vocabulary</h3>
                            <p>Standardized terms and practices for security logging</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SecurityLoggingFailures;
