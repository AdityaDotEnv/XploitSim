import React, { useState } from 'react';
import SoftwareIntegrityDemo from './SoftwareIntegrityDemo';
import '../../vulnerable-components/assets/VulnerabilityPage.css';

const SoftwareDataIntegrity: React.FC = () => {
    const [showDemo, setShowDemo] = useState<boolean>(false);

    return (
        <div className="vulnerability-page">
            <section className="vp-hero">
                <div className="vp-hero-content">
                    <div className="vp-hero-text">
                        <div className="vp-badge">A08:2021</div>
                        <h1 className="vp-title">Software and Data Integrity Failures</h1>
                        <p className="vp-subtitle">
                            Failures happen when code and data are not protected against unauthorized changes, leading to the execution of malicious code or the processing of tampered data.
                        </p>
                        <div className="vp-stats">
                            <div className="vp-stat">
                                <span className="vp-stat-number">#8</span>
                                <span className="vp-stat-label">OWASP Rank</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">Severe</span>
                                <span className="vp-stat-label">Impact</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">High</span>
                                <span className="vp-stat-label">Criticality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-overview">
                <div className="vp-container">
                    <h2>Understanding Integrity Failures</h2>
                    <div className="vp-overview-grid">
                        <div className="vp-overview-content">
                            <p>
                                Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. This includes software updates, critical data, and CI/CD pipelines being insecurely handled.
                            </p>
                            <p>
                                When an application relies on plugins, libraries, or modules from untrusted sources, or if it doesn't verify the integrity of these components, it becomes vulnerable to supply chain attacks.
                            </p>
                            <div className="vp-impact-box">
                                <h4>🚨 Major Risks</h4>
                                <ul>
                                    <li>Execution of unauthorized malicious code</li>
                                    <li>Tampering with critical business data</li>
                                    <li>Compromise of the software update process</li>
                                    <li>Insecure deserialization leading to RCE</li>
                                    <li>Unauthorized modification of system configurations</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-vectors">
                <div className="vp-container">
                    <h2>Common Integrity Vectors</h2>
                    <div className="vp-vectors-grid">
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">📦</div>
                            <h3>Insecure CI/CD Pipelines</h3>
                            <p>Attackers gaining access to the build process and injecting malicious code into the software before it's deployed.</p>
                            <div className="vp-vector-example">
                                <code>SolarWinds Orion breach (2020)</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">🔄</div>
                            <h3>Unsigned Updates</h3>
                            <p>Software that downloads and installs updates without verifying their digital signatures or authenticity.</p>
                            <div className="vp-vector-example">
                                <code>Malicious firmware updates</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-medium">
                            <div className="vp-vector-icon">🧪</div>
                            <h3>Untrusted Serialized Data</h3>
                            <p>Deserializing data from an untrusted source without proper validation, leading to remote code execution.</p>
                            <div className="vp-vector-example">
                                <code>Java or Node.js deserialization attacks</code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real World Examples */}
            <section className="vp-section vp-examples">
                <div className="vp-container">
                    <h2>Real-World Integrity Breaches</h2>
                    <div className="vp-examples-timeline">
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2020</div>
                            <div className="vp-timeline-content">
                                <h4>SolarWinds Supply Chain Attack</h4>
                                <p>Hackers injected a backdoor into SolarWinds' software updates, affecting thousands of customers including government agencies.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">18K Organizations</span>
                                    <span className="vp-impact-badge">Nation State</span>
                                </div>
                            </div>
                        </div>
                        <div className="vp-timeline-item">
                            <div className="vp-timeline-year">2017</div>
                            <div className="vp-timeline-content">
                                <h4>NotPetya Ransomware</h4>
                                <p>Propagated through a compromised update mechanism of a popular Ukrainian accounting software, causing billions in global damage.</p>
                                <div className="vp-breach-impact">
                                    <span className="vp-impact-badge">$10B Damage</span>
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
                            <h3>🛡️ Code & Build</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Digital Signatures</h4>
                                    <p>Sign all software updates and verify signatures before installation.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Secured CI/CD</h4>
                                    <p>Implement strict access controls and auditing for all build and deployment pipelines.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Repository Security</h4>
                                    <p>Use signed commits and multi-factor authentication for code repositories.</p>
                                </div>
                            </div>
                        </div>
                        <div className="vp-prevention-category">
                            <h3>🔍 Data Integrity</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Checksum Verification</h4>
                                    <p>Use cryptographic hashes (SHA-256) to verify the integrity of downloaded files and data.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Secure Deserialization</h4>
                                    <p>Avoid deserializing untrusted data or use safe alternatives like JSON.parse().</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Examples */}
            <section className="vp-section vp-code">
                <div className="vp-container">
                    <h2>Secure Integrity Examples</h2>
                    <div className="vp-code-comparison">
                        <div className="vp-code-block vp-vulnerable">
                            <h4>❌ Insecure Deserialization</h4>
                            <pre>{`// UNSAFE: Deserializing untrusted object
const untrustedData = req.body.config;
const config = eval("(" + untrustedData + ")"); // EXECUTES CODE

// UNSAFE: Node.js serialize-javascript
const serialized = req.query.data;
const obj = require('node-serialize').unserialize(serialized);`}</pre>
                        </div>
                        <div className="vp-code-block vp-secure">
                            <h4>✅ Secure Data Handling</h4>
                            <pre>{`// SAFE: Use standard JSON parsing
const untrustedData = req.body.config;
const config = JSON.parse(untrustedData);

// SAFE: Integrity check before processing
if (verifyHash(data, expectedHash)) {
  processData(data);
} else {
  throw new Error("Integrity violation!");
}

// SAFE: Verified updates
await updater.verifySignature(updateFile, publicKey);`}</pre>
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
                        <SoftwareIntegrityDemo />
                    </div>
                )}
            </section>

            {/* Resources */}
            <section className="vp-section vp-resources">
                <div className="vp-container">
                    <h2>Additional Resources</h2>
                    <div className="vp-resources-grid">
                        <a href="https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/" className="vp-resource-card">
                            <div className="vp-resource-icon">📚</div>
                            <h3>OWASP Guide</h3>
                            <p>Full documentation for Software and Data Integrity Failures</p>
                        </a>
                        <a href="https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html" className="vp-resource-card">
                            <div className="vp-resource-icon">🛡️</div>
                            <h3>Deserialization Sheet</h3>
                            <p>Best practices for preventing insecure deserialization</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SoftwareDataIntegrity;
