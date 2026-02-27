import React, { useState } from 'react';
import styles from '../assets/SecurityMisconfigurationSandbox.module.css';
import { getApiUrl } from "@/config/api";

export default function SecurityMisconfigurationSandbox() {
    const [infoRes, setInfoRes] = useState<any>(null);
    const [debugRes, setDebugRes] = useState<any>(null);
    const [headerRes, setHeaderRes] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    async function fetchInfo() {
        const res = await fetch(getApiUrl(5100, "/vulnerable/server-info"));
        setInfoRes(await res.json());
    }

    async function fetchDebug() {
        const res = await fetch(getApiUrl(5100, "/vulnerable/debug-logs"));
        setDebugRes(await res.json());
    }

    async function checkHeaders() {
        const res = await fetch(getApiUrl(5100, "/vulnerable/headers"));
        setHeaderRes(await res.json());
    }

    async function tryAdmin() {
        const res = await fetch(getApiUrl(5100, "/vulnerable/admin"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: 'guest' })
        });
        const json = await res.json();
        if (json.message === "Admin access granted") setIsAdmin(true);
        else setIsAdmin(false);
    }

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.badge}>Security Misconfiguration</div>
                <h1 className={styles.title}>Security Misconfiguration Sandbox</h1>
                <p className={styles.lead}>
                    Analyze and exploit common configuration flaws. Discover how default settings, exposed debug information, and missing security headers put systems at risk.
                </p>
            </div>

            {/* Controls Section */}
            <div className={styles.controls}>
                <div className={styles.row}>
                    <button className={styles.btn} onClick={fetchInfo}>
                        🔍 Reveal Server Info
                    </button>
                    <button className={styles.btn} onClick={fetchDebug}>
                        🐞 Leak Debug Logs
                    </button>
                </div>

                <div className={styles.row}>
                    <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={checkHeaders}>
                        🏴󠁡󠁦󠁩󠁮󠁿 Inspect Security Headers
                    </button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={tryAdmin}>
                        🔓 Test Default Auth
                    </button>
                </div>
            </div>

            {/* Results Grid */}
            <div className={styles.results}>
                <section className={styles.card}>
                    <h3>⚙️ Server & Environment</h3>
                    <pre className={styles.pre}>
                        {infoRes ? JSON.stringify(infoRes, null, 2) : "Click to reveal sensitive server information often exposed by misconfigured headers or meta files."}
                    </pre>
                </section>

                <section className={styles.card}>
                    <h3>📋 Debug Output</h3>
                    <pre className={styles.pre}>
                        {debugRes ? JSON.stringify(debugRes, null, 2) : "Check for exposed developer logs and stack traces that should never be public."}
                    </pre>
                </section>

                <section className={styles.card}>
                    <h3>🛡️ Headers & Access</h3>
                    <pre className={styles.pre}>
                        {headerRes ? JSON.stringify(headerRes, null, 2) : isAdmin ? "Access Level: ADMIN" : "Click to check for missing security headers or test default credentials."}
                        {isAdmin && <div className={styles.adminSuccess}>Success: Administrative Access Granted via Default Credentials!</div>}
                    </pre>
                </section>
            </div>

            {/* Tips Section */}
            <div className={styles.tips}>
                <h4>🎓 Learning Scenarios</h4>
                <ul>
                    <li>
                        <b>Server Info Leak:</b> See how <code>X-Powered-By</code> and <code>Server</code> headers reveal specific versions, making it easier for attackers to find targeted exploits.
                    </li>
                    <li>
                        <b>Exposed Debugging:</b> Access internal application state and developer comments that reveal system logic and potential entry points.
                    </li>
                    <li>
                        <b>Missing Security Headers:</b> Identify the absence of <code>CSP</code>, <code>HSTS</code>, and <code>X-Content-Type-Options</code> which protect users from cross-site attacks.
                    </li>
                    <li>
                        <b>Default Credentials:</b> Understand how failing to change factory-set credentials leads to immediate system takeover.
                    </li>
                </ul>
            </div>

            <div className={styles.tips}>
                <h4>🛡️ Hardening Checklist</h4>
                <ul>
                    <li>Use <code>helmet</code> middleware in Node.js to automatically set secure headers.</li>
                    <li>Always change default passwords immediately after installation.</li>
                    <li>Disable directory indexing and verbose error reporting in production.</li>
                    <li>Remove unnecessary services, sample files, and documentation from production servers.</li>
                </ul>
            </div>
        </div>
    );
}
