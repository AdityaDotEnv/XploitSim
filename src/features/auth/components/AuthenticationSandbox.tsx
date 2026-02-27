import React, { useState, useRef, useEffect, FormEvent } from 'react';
import '../../../index.css';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import '../../broken-access-control/assets/BrokenAccessControl.css';
import '../assets/AuthenticationSandbox.css';

const API_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:5000";
const LOCAL_LOG_KEY = 'xploitsim_attacklog_v1';

interface LogEntry {
  ts: string;
  text: string;
}

interface LoginResponse {
  user: {
    username: string;
  };
  token: string;
  error?: string;
}

interface RegisterResponse {
  error?: string;
}

export default function AuthenticationSandbox() {
  const [attackLog, setAttackLog] = useState<LogEntry[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_LOG_KEY);
      if (raw) return JSON.parse(raw);
    } catch { }
    return [];
  });

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('Try logging in. Hint: bob / qwerty or admin / admin123');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const simCancelRef = useRef<boolean>(false);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Persist logs
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_LOG_KEY, JSON.stringify(attackLog));
    } catch { }
  }, [attackLog]);

  // Auto-scroll console 
  useEffect(() => {
    const el = consoleRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    if (isNearBottom) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [attackLog]);

  function pushLog(text: string) {
    const ts = new Date().toLocaleTimeString();
    setAttackLog(prev => [...prev, { ts, text }]);
  }

  async function handleLogin(e?: FormEvent) {
    e?.preventDefault?.();
    const uname = username.trim();
    if (!uname || !password) {
      setMessage('Enter username and password.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: uname, password }),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || 'Login failed'}`);
        pushLog(`Failed login attempt: ${uname} (${data.error || 'Invalid credentials'})`);
      } else {
        setMessage(`✅ Welcome, ${data.user.username}!`);
        pushLog(`Successful login: ${uname}`);
        localStorage.setItem('xploitsim_token', data.token);
      }
    } catch (err: any) {
      setMessage('❌ Connection error.');
      pushLog(`Error contacting auth server: ${err.message}`);
    }
  }

  async function handleRegister() {
    const uname = username.trim();
    if (!uname || !password) {
      setMessage('Enter username and password to register.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: uname, password }),
      });

      const data: RegisterResponse = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || 'Registration failed'}`);
      } else {
        setMessage(`✅ Registered ${uname}! You can now login.`);
        pushLog(`Registered new user: ${uname} via Backend`);
      }
    } catch (err) {
      setMessage('❌ Connection error.');
    }
  }

  function resetDemo() {
    setAttackLog([]);
    setMessage('Log cleared. (DB remains persistent on backend)');
    pushLog('Log cleared.');
  }

  async function runCredentialStuffingAsync() {
    const common = ['123456', 'password', 'qwerty', 'admin', 'admin123'];
    const targets = ['alice', 'bob', 'admin', 'carol'];

    setIsSimulating(true);
    simCancelRef.current = false;
    pushLog('--- Credential Stuffing Simulation started ---');

    for (const t of targets) {
      if (simCancelRef.current) break;

      for (const pw of common) {
        if (simCancelRef.current) break;
        await new Promise(r => setTimeout(r, 400));

        try {
          const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: t, password: pw }),
          });

          if (res.ok) {
            pushLog(`${t}:${pw} -> SUCCESS`);
            break;
          } else {
            const data: LoginResponse = await res.json();
            pushLog(`${t}:${pw} -> FAIL (${data.error})`);
          }
        } catch (err) {
          pushLog(`${t}:${pw} -> ERR`);
        }
      }
    }

    pushLog('--- Credential Stuffing Simulation completed ---');
    setIsSimulating(false);
  }

  return (
    <div className="broken-access-page">
      <section className="bac-hero">
        <div className="bac-hero-content">
          <div className="bac-hero-text">
            <div className="bac-badge">A02:2021</div>
            <h1 className="bac-title">Authentication Failures Sandbox</h1>
            <p className="bac-subtitle">
              Explore login attempt tracking, credential stuffing, and account lockouts — interacting directly with a Node.js backend.
            </p>
          </div>
        </div>
      </section>

      <main className="vp-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="vp-grid" style={{ maxWidth: 1100, gap: 16 }}>
          {/* LEFT PANEL */}
          <div className="vp-card" style={{ textAlign: 'center' }}>
            <h3>Login / Register</h3>

            <form onSubmit={handleLogin} className="vp-form" style={{ marginTop: 8 }}>
              <label>Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="vp-input"
                style={{ marginBottom: 10 }}
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="vp-input"
                style={{ marginBottom: 15 }}
              />

              <div style={{ marginTop: 12 }}>
                <button className="vp-btn" type="submit">Login</button>
                <button
                  type="button"
                  className="vp-btn vp-btn-secondary"
                  onClick={handleRegister}
                  style={{ marginLeft: 8 }}
                >
                  Register
                </button>
                <button
                  type="button"
                  className="vp-btn vp-btn-secondary"
                  onClick={resetDemo}
                  style={{ marginLeft: 8 }}
                >
                  Clear Logs
                </button>
              </div>
            </form>

            <p className="vp-note" style={{ marginTop: 10 }}>{message}</p>

            <div style={{ marginTop: 12 }}>
              {!isSimulating ? (
                <button className="vp-btn vp-btn-danger" onClick={runCredentialStuffingAsync}>Start Credential Stuffing</button>
              ) : (
                <button className="vp-btn vp-btn-secondary" onClick={() => { simCancelRef.current = true; setIsSimulating(false); }}>
                  Stop Simulation
                </button>
              )}
            </div>

            <div style={{ marginTop: 20, padding: 15, background: 'rgba(255,165,0,0.05)', borderRadius: 10, fontSize: 13, color: '#aaa' }}>
              ℹ️ Note: This sandbox now interacts with a <strong>live backend</strong>.
              User accounts are persisted in a centralized SQLite database.
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="vp-card" style={{ flex: 1 }}>
            <h3>Attack Log</h3>
            <div
              ref={consoleRef}
              className="vp-log"
              style={{
                background: '#0b1020',
                color: '#d1d5db',
                fontFamily: 'ui-monospace, Menlo, Monaco, monospace',
                padding: 12,
                borderRadius: 8,
                minHeight: 260,
                maxHeight: 360,
                overflowY: 'auto',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              {attackLog.length === 0 ? (
                <div style={{ opacity: 0.7 }}>Console empty — perform logins or start simulation.</div>
              ) : (
                attackLog.map((entry, i) => (
                  <div key={i} style={{ marginBottom: 6 }}>
                    <span style={{ color: '#9ca3af' }}>[{entry.ts}] </span>
                    <span>{entry.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
