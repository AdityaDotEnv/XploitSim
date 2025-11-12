import React, { useState } from "react";
import "./BrokenAccessControlSandbox.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4000";

const BrokenAccessControlSandbox = () => {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState(null);
  const [token, setToken] = useState("");
  const [logs, setLogs] = useState([]);

  const addLog = (title, result, explanation) => {
    setLogs((prev) => [
      ...prev,
      {
        title,
        result: JSON.stringify(result, null, 2),
        explanation,
      },
    ]);
  };

  const login = async (username, password) => {
    setActiveUser(null);
    setToken("");
    setLogs([]);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        setActiveUser(username);
        addLog(
          `Login as ${username}`,
          data,
          `${username} successfully authenticated and received a token.`
        );
      } else {
        addLog(`Login as ${username}`, data, "Login failed.");
      }
    } catch (err) {
      addLog(`Login as ${username}`, { error: err.message }, "Network error.");
    }
  };

  const accessDoc = async (targetDocId) => {
    try {
      const res = await fetch(`${API_URL}/documents/${targetDocId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      addLog(
        `${activeUser} tries to access /documents/${targetDocId}`,
        data,
        data.error
          ? `${activeUser} was blocked from accessing document #${targetDocId}. Proper access control in action.`
          : `${activeUser} successfully accessed document #${targetDocId} — this demonstrates Broken Access Control vulnerability.`
      );
    } catch (err) {
      addLog(
        `${activeUser} tries /documents/${targetDocId}`,
        { error: err.message },
        "Network or request failed."
      );
    }
  };

  const clearConsole = () => setLogs([]);
  const restartDemo = () => {
    setLogs([]);
    setActiveUser(null);
    setToken("");
  };

  return (
    <div className="vulnerability-page">
      <div className="vulnerability-header">
        <h1>Broken Access Control — Interactive Demo</h1>
        <p>
          Login as different users and try accessing restricted data. Observe how improper access control can let attackers bypass permissions.
        </p>
      </div>

      <div className="sandbox-controls">
        <h2>🔧 Actions</h2>

        <div className="sandbox-buttons">
          <button
            className={`frontend-btn ${
              activeUser === "alice" ? "active" : ""
            }`}
            onClick={() => login("alice", "password1")}
          >
            🔐 Login as Alice
          </button>

          <button
            className={`frontend-btn ${
              activeUser === "bob" ? "active" : ""
            }`}
            onClick={() => login("bob", "password2")}
          >
            🔐 Login as Bob
          </button>

          <button
            className="frontend-btn"
            disabled={!activeUser}
            onClick={() =>
              accessDoc(activeUser === "alice" ? 2 : 1)
            }
          >
            📄 Try accessing another user’s document
          </button>

          <button className="frontend-btn secondary" onClick={clearConsole}>
            🧹 Clear Console
          </button>

          <button className="frontend-btn danger" onClick={restartDemo}>
            🔁 Restart Demo
          </button>
        </div>
      </div>

      <div className="sandbox-results">
        <h2>🧪 Results & Explanations</h2>
        {logs.length === 0 ? (
          <p className="no-logs">No actions yet. Start by logging in.</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="log-row">
              <div className="log-left">
                <h3>{log.title}</h3>
                <pre>{log.result}</pre>
              </div>
              <div className="log-right">
                <p>{log.explanation}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="vulnerability-footer">
        <button className="frontend-btn secondary" onClick={() => navigate(-1)}>
          ⬅️ Back to Overview
        </button>
      </div>
    </div>
  );
};

export default BrokenAccessControlSandbox;
