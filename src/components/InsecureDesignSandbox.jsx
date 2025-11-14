import React, { useState } from 'react';
import styles from './InsecureDesignSandbox.module.css';

const API_BASE = "http://localhost:5200";

export default function InsecureDesignSandbox() {
  const [configVuln, setConfigVuln] = useState(null);
  const [configSafe, setConfigSafe] = useState(null);
  const [toggleRes, setToggleRes] = useState(null);
  const [errorRes, setErrorRes] = useState(null);
  const [featureName, setFeatureName] = useState("");
  const [featureValue, setFeatureValue] = useState(true);

  async function fetchVulnerableConfig() {
    const res = await fetch(`${API_BASE}/vulnerable/config`);
    setConfigVuln(await res.json());
  }

  async function fetchSafeConfig() {
    const res = await fetch(`${API_BASE}/safe/config`);
    setConfigSafe(await res.json());
  }

  async function toggleVuln() {
    const res = await fetch(`${API_BASE}/vulnerable/toggle-feature`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feature: featureName, enabled: featureValue })
    });
    setToggleRes(await res.json());
  }

  async function toggleSafe() {
    const res = await fetch(`${API_BASE}/safe/toggle-feature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': 'let-me-admin'
      },
      body: JSON.stringify({ feature: featureName, enabled: featureValue })
    });
    setToggleRes(await res.json());
  }

  async function triggerError() {
    const res = await fetch(`${API_BASE}/vulnerable/error`);
    setErrorRes(await res.json());
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.badge}>Insecure Design</div>
        <h1 className={styles.title}>Insecure Design Sandbox</h1>
        <p className={styles.lead}>
          Explore insecure design patterns: exposed configuration, unauthenticated feature toggles,
          and verbose error leaks.
        </p>
      </div>

      {/* Controls Section */}
      <div className={styles.controls}>
        <div className={styles.row}>
          <button className={styles.btn} onClick={fetchVulnerableConfig}>
            🔓 Fetch Vulnerable Config
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={fetchSafeConfig}>
            🛡️ Fetch Safe Config
          </button>
        </div>

        <div className={styles.row}>
          <input
            className={styles.input}
            value={featureName}
            onChange={e => setFeatureName(e.target.value)}
            placeholder="Feature name (e.g., debug)"
          />

          <select
            className={styles.select}
            value={featureValue}
            onChange={e => setFeatureValue(e.target.value === 'true')}
          >
            <option value="true">Enable</option>
            <option value="false">Disable</option>
          </select>

          <button className={styles.btn} onClick={toggleVuln}>
            ⚡ Toggle (Vulnerable)
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={toggleSafe}>
            🔒 Toggle (Safe)
          </button>
        </div>

        <div className={styles.row}>
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={triggerError}>
            🚨 Trigger Vulnerable Error
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className={styles.results}>
        <section className={styles.card}>
          <h3>📉 Vulnerable Config</h3>
          <pre className={styles.pre}>
            {configVuln ? JSON.stringify(configVuln, null, 2) : "No result yet. Fetch vulnerable config to see exposed secrets."}
          </pre>
        </section>

        <section className={styles.card}>
          <h3>📈 Safe Config</h3>
          <pre className={styles.pre}>
            {configSafe ? JSON.stringify(configSafe, null, 2) : "No result yet. Compare with vulnerable config to see security differences."}
          </pre>
        </section>

        <section className={styles.card}>
          <h3>⚡ Toggle Result / Errors</h3>
          <pre className={styles.pre}>
            {toggleRes
              ? JSON.stringify(toggleRes, null, 2)
              : errorRes
              ? JSON.stringify(errorRes, null, 2)
              : "No result yet. Toggle features or trigger errors to see results."}
          </pre>
        </section>
      </div>

      {/* Tips Section */}
      <div className={styles.tips}>
        <h4>🎓 How to Use This Sandbox</h4>
        <ul>
          <li>
            <b>Fetch Vulnerable Config:</b> Shows full system config including secrets,
            simulating an insecure design flaw.
          </li>
          <li>
            <b>Fetch Safe Config:</b> Shows only safe, non-sensitive values like flags.
          </li>
          <li>
            <b>Toggle Features:</b>  
            Enter a feature name (e.g. <code>debug</code> or <code>featureXEnabled</code>)  
            then click:
            <ul>
              <li><b>Toggle (Vulnerable):</b> No authentication — anyone can modify system settings.</li>
              <li><b>Toggle (Safe):</b> Requires an admin token.</li>
            </ul>
          </li>
          <li>
            <b>Trigger Vulnerable Error:</b> Generates an internal error and intentionally leaks the full
            stack trace to demonstrate insecure error handling.
          </li>
        </ul>
      </div>

      <div className={styles.tips}>
        <h4>💡 Learning Tips</h4>
        <ul>
          <li>Never expose secrets or config values in public endpoints.</li>
          <li>Protect feature toggles with authentication and authorization.</li>
          <li>Do not leak stack traces in production. Use internal logging only.</li>
        </ul>
      </div>
    </div>
  );
}