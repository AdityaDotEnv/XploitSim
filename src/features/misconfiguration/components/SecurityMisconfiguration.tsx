import React from 'react';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import { useNavigate } from 'react-router-dom';

const SecurityMisconfiguration: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="vulnerability-page">
            <section className="vp-hero">
                <div className="vp-hero-content">
                    <div className="vp-hero-text">
                        <div className="vp-badge">A05:2021</div>
                        <h1 className="vp-title">Security Misconfiguration</h1>
                        <p className="vp-subtitle">
                            Security misconfiguration happens when security settings are not defined, implemented, or maintained properly, or when they are left at their default values.
                        </p>
                        <div className="vp-stats">
                            <div className="vp-stat">
                                <span className="vp-stat-number">#5</span>
                                <span className="vp-stat-label">OWASP Rank</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">Severe</span>
                                <span className="vp-stat-label">Impact</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">Common</span>
                                <span className="vp-stat-label">Occurrence</span>
                            </div>
                        </div>
                    </div>
                    <div className="vp-hero-visual">
                        <div className="vp-security-icon">
                            <div className="vp-icon">⚙️</div>
                            <div className="vp-icon-text">Config Errors</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-overview">
                <div className="vp-container">
                    <h2>Overview of Security Misconfiguration</h2>
                    <div className="vp-overview-grid">
                        <div className="vp-overview-content">
                            <p>
                                Security misconfiguration is one of the most common security issues. It can occur at any level of an application stack, including the network services, platform, web server, application server, database, frameworks, custom code, and pre-installed virtual machines, containers, or storage.
                            </p>
                            <p>
                                Attackers often look for default settings, unnecessary features, open storage, and unpatched flaws to gain unauthorized access to the system.
                            </p>
                            <div className="vp-impact-box">
                                <h4>🚨 Common Consequences</h4>
                                <ul>
                                    <li>Unauthorized access to sensitive data</li>
                                    <li>Complete system compromise</li>
                                    <li>Execution of arbitrary commands</li>
                                    <li>Disclosure of system internal details</li>
                                    <li>Financial and reputational damage</li>
                                </ul>
                            </div>
                        </div>
                        <div className="vp-overview-visual">
                            <div className="vp-data-flow">
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">1</div>
                                    <div className="vp-step-content">
                                        <strong>Default Setup</strong>
                                        <span>System uses out-of-the-box settings</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">2</div>
                                    <div className="vp-step-content">
                                        <strong>Open Exposure</strong>
                                        <span>Unnecessary services/ports left open</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step vp-vulnerable">
                                    <div className="vp-step-number">3</div>
                                    <div className="vp-step-content">
                                        <strong>Attacker Probe</strong>
                                        <span>Attacker finds unpatched vulnerabilities</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">4</div>
                                    <div className="vp-step-content">
                                        <strong>System Breach</strong>
                                        <span>Attacker gains control via config flaw</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-vectors">
                <div className="vp-container">
                    <h2>Common Misconfiguration Types</h2>
                    <div className="vp-vectors-grid">
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">🔑</div>
                            <h3>Default Passwords</h3>
                            <p>Using factory-set usernames and passwords for administrative interfaces or databases.</p>
                            <div className="vp-vector-example">
                                <code>admin / admin</code>
                            </div>
                            <div className="vp-vector-example">
                                <code>root / password</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">📂</div>
                            <h3>Directory Browsing</h3>
                            <p>Allowing users to list the contents of directories on the server, potentially exposing sensitive files.</p>
                            <div className="vp-vector-example">
                                <code>Index of /config/</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-medium">
                            <div className="vp-vector-icon">✉️</div>
                            <h3>Verbose Errors</h3>
                            <p>Displaying detailed error messages that reveal database schema, software versions, or stack traces.</p>
                            <div className="vp-vector-example">
                                <code>SQL syntax error at line 42...</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">🔌</div>
                            <h3>Open Ports</h3>
                            <p>Leaving unnecessary network ports open that provide additional entry points for attackers.</p>
                            <div className="vp-vector-example">
                                <code>SSH (22) or Telnet (23) exposed</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-medium">
                            <div className="vp-vector-icon">🏷️</div>
                            <h3>Unnecessary Features</h3>
                            <p>Keeping debug modes, sample applications, or documentation enabled in production environments.</p>
                            <div className="vp-vector-example">
                                <code>DEBUG=True in production</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">🛡️</div>
                            <h3>Missing Headers</h3>
                            <p>Failing to implement security headers like CSP, X-Frame-Options, or HSTS.</p>
                            <div className="vp-vector-example">
                                <code>Missing Content-Security-Policy</code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real World Examples */}
            <section className="vp-section vp-examples">
                <div className="vp-container">
                    <h2>Real-World Misconfiguration Incidents</h2>
                    <div className="vp-examples-timeline">
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2021</div>
                            <div className="vp-timeline-content">
                                <h4>Twitch Source Code Leak</h4>
                                <p>Misconfigured server allowed an attacker to download the company's entire source code repository and creator payout data.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">125GB Data</span>
                                    <span className="vp-impact-badge">Source Code</span>
                                </div>
                            </div>
                        </div>
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2020</div>
                            <div className="vp-timeline-content">
                                <h4>Elasticsearch Misconfigurations</h4>
                                <p>Thousands of Elasticsearch databases left exposed on the internet without password protection, leading to massive data leaks.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">Billions of Records</span>
                                    <span className="vp-impact-badge">No Auth</span>
                                </div>
                            </div>
                        </div>
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2019</div>
                            <div className="vp-timeline-content">
                                <h4>Capital One S3 Leak</h4>
                                <p>A misconfigured WAF allowed an attacker to access AWS S3 buckets containingpersonal data of 100 million customers.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">100M Customers</span>
                                    <span className="vp-impact-badge">$190M Fine</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prevention Section */}
            <section className="vp-section vp-prevention">
                <div className="vp-container">
                    <h2>Prevention & Mitigation Strategies</h2>
                    <div className="vp-prevention-grid">
                        <div className="vp-prevention-category">
                            <h3>🛡️ Hardening</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Disable Unused Features</h4>
                                    <p>Remove unnecessary services, ports, and features from all environments.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Change Default Passwords</h4>
                                    <p>Enforce strong, unique passwords and disable default accounts immediately.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Secure Error Handling</h4>
                                    <p>Implement generic error messages for users while logging details internally.</p>
                                </div>
                            </div>
                        </div>
                        <div className="vp-prevention-category">
                            <h3>🔒 Automation</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Infrastructure as Code</h4>
                                    <p>Use tools like Terraform or Ansible to maintain consistent, secure configurations.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Automated Scans</h4>
                                    <p>Regularly run automated configuration audits and vulnerability scans.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Patch Management</h4>
                                    <p>Establish a process for timely application of security updates and patches.</p>
                                </div>
                            </div>
                        </div>
                        <div className="vp-prevention-category">
                            <h3>🔍 Architecture</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Segmentation</h4>
                                    <p>Isolate application components and use firewalls to restrict traffic.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Security Headers</h4>
                                    <p>Implement and verify all relevant HTTP security headers.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Least Privilege</h4>
                                    <p>Run services with the minimum permissions required for their function.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Examples */}
            <section className="vp-section vp-code">
                <div className="vp-container">
                    <h2>Secure Configuration Examples</h2>
                    <div className="vp-code-comparison">
                        <div className="vp-code-block vp-vulnerable">
                            <h4>❌ Vulnerable Express Config</h4>
                            <pre>{`// UNSAFE: Default headers and stack traces
const app = express();
app.use(express.static('public')); // Directory listing enabled?

// UNSAFE: Displaying full errors to user
app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
});

// UNSAFE: Sensitive info in headers
res.setHeader('X-Powered-By', 'Express');`}</pre>
                        </div>
                        <div className="vp-code-block vp-secure">
                            <h4>✅ Secure Express Config</h4>
                            <pre>{`// SAFE: Use Helmet for security headers
const app = express();
app.use(helmet());
app.disable('x-powered-by');

// SAFE: Generic error messages
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Internal Server Error');
});

// SAFE: Restricted static files
app.use(express.static('public', {
  index: false,
  redirect: false
}));`}</pre>
                        </div>
                    </div>
                </div>

                {/* Updated Button → Link to Misconfiguration Sandbox */}
                <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => navigate('/misconfiguration-sandbox')}
                >
                    Try it Yourself
                </button>
            </section>

            {/* Resources */}
            <section className="vp-section vp-resources">
                <div className="vp-container">
                    <h2>Additional Resources</h2>
                    <div className="vp-resources-grid">
                        <a href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/" className="vp-resource-card">
                            <div className="vp-resource-icon">📚</div>
                            <h3>OWASP Guide</h3>
                            <p>Complete documentation for Security Misconfiguration prevention</p>
                        </a>
                        <a href="https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html" className="vp-resource-card">
                            <div className="vp-resource-icon">🛡️</div>
                            <h3>Container Security</h3>
                            <p>Best practices for secure container and platform configuration</p>
                        </a>
                        <a href="https://portswigger.net/web-security/information-disclosure" className="vp-resource-card">
                            <div className="vp-resource-icon">🔍</div>
                            <h3>Information Disclosure</h3>
                            <p>Learning labs for identifying configuration-based information leaks</p>
                        </a>
                        <a href="https://cwe.mitre.org/data/definitions/16.html" className="vp-resource-card">
                            <div className="vp-resource-icon">📋</div>
                            <h3>CWE-16: Configuration</h3>
                            <p>Common Weakness Enumeration definition for configuration flaws</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SecurityMisconfiguration;
