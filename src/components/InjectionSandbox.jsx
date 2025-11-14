import React, { useState } from "react";
import styles from "./InjectionSandbox.module.css";

export default function InjectionSandbox() {
  const [q, setQ] = useState("");
  const [vulnerableRes, setVulnerableRes] = useState(null);
  const [safeRes, setSafeRes] = useState(null);
  const [echoRes, setEchoRes] = useState(null);

  const API_BASE = "http://localhost:5100";

  async function testVulnerable() {
    try {
      const res = await fetch(
        `${API_BASE}/vulnerable/users?q=${encodeURIComponent(q)}`
      );
      const json = await res.json();
      setVulnerableRes(json);
    } catch (err) {
      console.error("Vulnerable error:", err);
      setVulnerableRes({ error: err.message });
    }
  }

  async function testSafe() {
    try {
      const res = await fetch(
        `${API_BASE}/safe/users?q=${encodeURIComponent(q)}`
      );
      const json = await res.json();
      setSafeRes(json);
    } catch (err) {
      console.error("Safe error:", err);
      setSafeRes({ error: err.message });
    }
  }

  async function testEcho() {
    try {
      const res = await fetch(`${API_BASE}/vulnerable/echo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: q }),
      });
      const json = await res.json();
      setEchoRes(json);
    } catch (err) {
      console.error("Echo error:", err);
      setEchoRes({ error: err.message });
    }
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.badge}>Injection Vulnerability</div>
        <h1 className={styles.title}>Injection Sandbox</h1>
        <p className={styles.lead}>
          Experiment with SQL injection and input reflection. Compare vulnerable 
          and secure endpoints to understand injection prevention techniques.
        </p>
      </div>

      {/* Controls Section */}
      <div className={styles.controlsContainer}>
        <div className={styles.controls}>
          <input
            className={styles.input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter SQL injection payload (e.g., %' OR '1'='1) or XSS payload..."
          />
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={testVulnerable}>
              🚨 Test Vulnerable
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={testSafe}>
              🛡️ Test Safe
            </button>
            <button className={`${styles.btn} ${styles.btnDanger}`} onClick={testEcho}>
              🔄 Test Echo
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className={styles.results}>
        <section className={styles.card}>
          <h3>
            📉 Vulnerable Endpoint
            <span className={`${styles.status} ${styles.statusVulnerable}`}>Unsafe</span>
          </h3>
          <pre className={styles.pre}>
            {vulnerableRes
              ? JSON.stringify(vulnerableRes, null, 2)
              : "No result yet. Test the vulnerable endpoint to see SQL injection in action."}
          </pre>
        </section>

        <section className={styles.card}>
          <h3>
            📈 Safe Endpoint
            <span className={`${styles.status} ${styles.statusSafe}`}>Protected</span>
          </h3>
          <pre className={styles.pre}>
            {safeRes
              ? JSON.stringify(safeRes, null, 2)
              : "No result yet. Compare with vulnerable endpoint to see security differences."}
          </pre>
        </section>

        <section className={styles.card}>
          <h3>
            🔍 Echo (Reflected Input)
            <span className={`${styles.status} ${styles.statusReflection}`}>XSS Vector</span>
          </h3>
          <pre className={styles.pre}>
            {echoRes
              ? JSON.stringify(echoRes, null, 2)
              : "No result yet. Test input reflection that could lead to XSS vulnerabilities."}
          </pre>
        </section>
      </div>

      {/* Tips Section */}
      <div className={styles.tips}>
        <h4>🎓 Learning Tips & Examples</h4>
        <ul>
          <li>
            Try SQL injection payloads like <code>%' OR '1'='1</code> or 
            <code>' UNION SELECT username, password FROM users--</code> to see database exposure.
          </li>
          <li>
            The safe endpoint uses parameterized queries that prevent SQL injection 
            by separating data from commands.
          </li>
          <li>
            The Echo endpoint demonstrates reflected input that could enable XSS attacks 
            if not properly sanitized.
          </li>
          <li>
            Experiment with XSS payloads like <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code> 
            in the echo endpoint to understand reflection risks.
          </li>
        </ul>
      </div>
    </div>
  );
}