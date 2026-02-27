import React from 'react';
import '../assets/VulnerabilityPage.css';
import { useNavigate } from 'react-router-dom';

const VulnerableComponents: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="vulnerability-page">
            <section className="vp-hero">
                <div className="vp-hero-content">
                    <div className="vp-hero-text">
                        <div className="vp-badge">A06:2021</div>
                        <h1 className="vp-title">Vulnerable and Outdated Components</h1>
                        <p className="vp-subtitle">
                            Using components with known vulnerabilities can lead to significant security risks, including data breaches and system compromise.
                        </p>
                        <div className="vp-stats">
                            <div className="vp-stat">
                                <span className="vp-stat-number">#6</span>
                                <span className="vp-stat-label">OWASP Rank</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">High</span>
                                <span className="vp-stat-label">Impact</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">Common</span>
                                <span className="vp-stat-label">Occurrence</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-overview">
                <div className="vp-container">
                    <h2>Understanding the Risk</h2>
                    <div className="vp-overview-grid">
                        <div className="vp-overview-content">
                            <p>
                                Modern applications rely on numerous third-party libraries, frameworks, and modules. If any of these components are outdated or contain known vulnerabilities, they become weak links that attackers can exploit to gain unauthorized access.
                            </p>
                            <p>
                                Vulnerabilities in components can range from minor issues to critical flaws that allow remote code execution or complete system takeover.
                            </p>
                            <div className="vp-impact-box">
                                <h4>🚨 Potential Impacts</h4>
                                <ul>
                                    <li>Execution of malicious code</li>
                                    <li>Theft of sensitive user information</li>
                                    <li>Bypassing encryption or authentication</li>
                                    <li>Compromise of the entire host system</li>
                                    <li>Long-term undetected persistence</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-vectors">
                <div className="vp-container">
                    <h2>Common Vulnerability Vectors</h2>
                    <div className="vp-vectors-grid">
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">📦</div>
                            <h3>Third-Party Packages</h3>
                            <p>Using npm, Maven, or NuGet packages that have unpatched vulnerabilities listed in databases like CVE or NVD.</p>
                            <div className="vp-vector-example">
                                <code>lodas@4.17.4 (CVE-2018-16487)</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">🌐</div>
                            <h3>Outdated Frameworks</h3>
                            <p>Running on old versions of React, Express, or Django that no longer receive security updates.</p>
                            <div className="vp-vector-example">
                                <code>Apache Struts 2.x (Log4Shell vulnerability)</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-medium">
                            <div className="vp-vector-icon">🛠️</div>
                            <h3>Unmanaged Dependencies</h3>
                            <p>Libraries manually added to a project without tracking or a clear update process.</p>
                            <div className="vp-vector-example">
                                <code>jquery-1.12.js directly in a script tag</code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real World Examples */}
            <section className="vp-section vp-examples">
                <div className="vp-container">
                    <h2>Real-World Breach Examples</h2>
                    <div className="vp-examples-timeline">
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2021</div>
                            <div className="vp-timeline-content">
                                <h4>Log4Shell (CVE-2021-44228)</h4>
                                <p>A critical flaw in the widely used Apache Log4j logging library allowed for remote code execution on millions of systems worldwide.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">Massive Scale</span>
                                    <span className="vp-impact-badge">RCE Vulnerability</span>
                                </div>
                            </div>
                        </div>
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2017</div>
                            <div className="vp-timeline-content">
                                <h4>Equifax Breach</h4>
                                <p>Failure to update an Apache Struts component led to one of the largest data breaches in history, exposing data of 147 million people.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">147M Records</span>
                                    <span className="vp-impact-badge">$700M Settlement</span>
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
                            <h3>🛡️ Management</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Inventory Tracking</h4>
                                    <p>Maintain a complete inventory of all components and their versions.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Regular Auditing</h4>
                                    <p>Use tools like <code>npm audit</code> to identify vulnerabilities in your dependency tree.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Prompt Updating</h4>
                                    <p>Apply security patches and updates immediately when they are released.</p>
                                </div>
                            </div>
                        </div>
                        <div className="vp-prevention-category">
                            <h3>🔍 Automated Scanning</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>SCA Tools</h4>
                                    <p>Implement Software Composition Analysis (SCA) tools in your CI/CD pipeline.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Dependency Monitoring</h4>
                                    <p>Use services like Snyk or GitHub Dependabot to receive alerts about new vulnerabilities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Examples */}
            <section className="vp-section vp-code">
                <div className="vp-container">
                    <h2>Secure Environment Examples</h2>
                    <div className="vp-code-comparison">
                        <div className="vp-code-block vp-vulnerable">
                            <h4>❌ Vulnerable Dependency Management</h4>
                            <pre>{`// package.json with outdated and wide ranges
{
  "dependencies": {
    "lodash": "4.17.4",
    "express": "*"
  }
}

// Result of npm audit:
// 12 vulnerabilities found (2 critical)`}</pre>
                        </div>
                        <div className="vp-code-block vp-secure">
                            <h4>✅ Secure Dependency Management</h4>
                            <pre>{`// package.json with specific, updated versions
{
  "dependencies": {
    "lodash": "^4.17.21",
    "express": "^4.18.2"
  }
}

// Regular audit checks:
// 0 vulnerabilities found`}</pre>
                        </div>
                    </div>
                </div>

                {/* Updated Button → Link to Vulnerable Components Demo */}
                <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => navigate('/vulnerable-components/demo')}
                >
                    Launch Demo
                </button>
            </section>

            {/* Resources */}
            <section className="vp-section vp-resources">
                <div className="vp-container">
                    <h2>Additional Resources</h2>
                    <div className="vp-resources-grid">
                        <a href="https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/" className="vp-resource-card">
                            <div className="vp-resource-icon">📚</div>
                            <h3>OWASP Page</h3>
                            <p>Complete documentation for this vulnerability category</p>
                        </a>
                        <a href="https://cve.mitre.org/" className="vp-resource-card">
                            <div className="vp-resource-icon">📋</div>
                            <h3>CVE Database</h3>
                            <p>The industry standard database of Common Vulnerabilities and Exposures</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VulnerableComponents;
