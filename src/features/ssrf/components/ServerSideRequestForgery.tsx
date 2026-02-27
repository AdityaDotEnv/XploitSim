import React, { useState } from 'react';
import ServerSideRequestForgeryDemo from './ServerSideRequestForgeryDemo';
import '../../vulnerable-components/assets/VulnerabilityPage.css';

const ServerSideRequestForgery: React.FC = () => {
    const [showDemo, setShowDemo] = useState<boolean>(false);

    return (
        <div className="vulnerability-page">
            <section className="vp-hero">
                <div className="vp-hero-content">
                    <div className="vp-hero-text">
                        <div className="vp-badge">A10:2021</div>
                        <h1 className="vp-title">Server-Side Request Forgery (SSRF)</h1>
                        <p className="vp-subtitle">
                            SSRF vulnerabilities occur when an attacker can cause a server-side application to make HTTP requests to an arbitrary domain of the attacker's choosing.
                        </p>
                        <div className="vp-stats">
                            <div className="vp-stat">
                                <span className="vp-stat-number">#10</span>
                                <span className="vp-stat-label">OWASP Rank</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">High</span>
                                <span className="vp-stat-label">Impact</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">Dangerous</span>
                                <span className="vp-stat-label">Risk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-overview">
                <div className="vp-container">
                    <h2>Understanding SSRF</h2>
                    <div className="vp-overview-grid">
                        <div className="vp-overview-content">
                            <p>
                                Server-Side Request Forgery (SSRF) is a security vulnerability where an attacker can trick a server into making unauthorized requests to internal or external resources. The server effectively becomes a proxy for the attacker.
                            </p>
                            <p>
                                SSRF can be used to scan internal networks, access sensitive data on internal services (like metadata APIs), or perform actions on behalf of the server.
                            </p>
                            <div className="vp-impact-box">
                                <h4>🚨 Major Impacts</h4>
                                <ul>
                                    <li>Scanning of internal network services and ports</li>
                                    <li>Reading sensitive files from the local server</li>
                                    <li>Exposing internal infrastructure (e.g., AWS Metadata)</li>
                                    <li>Bypassing firewalls and network segmentation</li>
                                    <li>Potential remote code execution on internal systems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-vectors">
                <div className="vp-container">
                    <h2>Common SSRF Vectors</h2>
                    <div className="vp-vectors-grid">
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">🌐</div>
                            <h3>URL Manipulation</h3>
                            <p>Providing a malicious URL to a feature that fetches or displays content from external sources.</p>
                            <div className="vp-vector-example">
                                <code>?url=http://169.254.169.254/latest/meta-data/</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">🔑</div>
                            <h3>Metadata Access</h3>
                            <p>Targeting cloud metadata services to extract sensitive credentials or instance information.</p>
                            <div className="vp-vector-example">
                                <code>Accessing AWS, GCP, or Azure metadata endpoints</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-medium">
                            <div className="vp-vector-icon">📁</div>
                            <h3>Local File Access</h3>
                            <p>Using the <code>file://</code> protocol to read sensitive configuration files from the server's filesystem.</p>
                            <div className="vp-vector-example">
                                <code>?url=file:///etc/passwd</code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real World Examples */}
            <section className="vp-section vp-examples">
                <div className="vp-container">
                    <h2>Real-World SSRF Incidents</h2>
                    <div className="vp-examples-timeline">
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2019</div>
                            <div className="vp-timeline-content">
                                <h4>Capital One Breach</h4>
                                <p>An attacker exploited an SSRF vulnerability in a web application firewall to access AWS metadata and steal 100 million customer records.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">100M Records</span>
                                    <span className="vp-impact-badge">$190M Fine</span>
                                </div>
                            </div>
                        </div>
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2021</div>
                            <div className="vp-timeline-content">
                                <h4>MS Exchange (Proxylogon)</h4>
                                <p>Exploited SSRF to gain administrative access and execute code on thousands of vulnerable Microsoft Exchange servers.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">Critical RCE</span>
                                    <span className="vp-impact-badge">Global Impact</span>
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
                            <h3>🛡️ Input Validation</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Allowlisting</h4>
                                    <p>Only allow requests to a predefined list of trusted domains and protocols (HTTP/HTTPS).</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>URL Parsing</h4>
                                    <p>Parse URLs properly and validate the domain, port, and scheme against an allowlist.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Don't Follow Redirects</h4>
                                    <p>Disable or strictly control the ability of the server to follow HTTP redirects.</p>
                                </div>
                            </div>
                        </div>
                        <div className="vp-prevention-category">
                            <h3>🔒 Network Controls</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Network Segmentation</h4>
                                    <p>Isolate the application server from internal management networks and metadata services.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Egress Filtering</h4>
                                    <p>Restrict the server's ability to make outgoing requests only to necessary external services.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Examples */}
            <section className="vp-section vp-code">
                <div className="vp-container">
                    <h2>Secure Implementation Examples</h2>
                    <div className="vp-code-comparison">
                        <div className="vp-code-block vp-vulnerable">
                            <h4>❌ Vulnerable SSRF Code</h4>
                            <pre>{`// UNSAFE: Direct request to user-supplied URL
async function fetchPreview(userUrl) {
  const response = await axios.get(userUrl);
  return response.data;
}

// Result of ?url=http://internal-admin:8080/stats:
// "Sensitive internal admin statistics revealed..."`}</pre>
                        </div>
                        <div className="vp-code-block vp-secure">
                            <h4>✅ Secure Implementation</h4>
                            <pre>{`// SAFE: Validated allowlist approach
const ALLOWED_DOMAINS = ['trusted.com', 'api.trusted.com'];

async function fetchPreview(userUrl) {
  const url = new URL(userUrl);
  if (url.protocol !== 'https:') throw new Error('Invalid protocol');
  if (!ALLOWED_DOMAINS.includes(url.hostname)) throw new Error('Untrusted domain');

  const response = await axios.get(url.href);
  return response.data;
}`}</pre>
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
                        <ServerSideRequestForgeryDemo />
                    </div>
                )}
            </section>

            {/* Resources */}
            <section className="vp-section vp-resources">
                <div className="vp-container">
                    <h2>Additional Resources</h2>
                    <div className="vp-resources-grid">
                        <a href="https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/" className="vp-resource-card">
                            <div className="vp-resource-icon">📚</div>
                            <h3>OWASP Guide</h3>
                            <p>Complete documentation for SSRF prevention</p>
                        </a>
                        <a href="https://portswigger.net/web-security/ssrf" className="vp-resource-card">
                            <div className="vp-resource-icon">🛡️</div>
                            <h3>PortSwigger Academy</h3>
                            <p>Interactive labs and theory for learning SSRF attacks</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServerSideRequestForgery;
