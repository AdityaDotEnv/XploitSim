import React, { useEffect, useState } from "react";

export default function VulnerableComponentsDemo() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/data")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setError(false);
      })
      .catch(() => {
        setMessage("Failed to connect to vulnerable backend server.");
        setError(true);
      });
  }, []);

  return (
    <div
      className="vp-demo-box"
      style={{
        background: "#1a1a1a",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        border: error ? "1px solid #ff6b6b" : "1px solid #444",
      }}
    >
      <h3 style={{ marginBottom: "10px", color: "#f4d03f" }}>
        🔧 Vulnerable Components Demo
      </h3>

      <p
        style={{
          fontSize: "1rem",
          color: error ? "#ff6b6b" : "#d1d1d1",
          marginBottom: "10px",
        }}
      >
        <strong>Backend Response:</strong> {message}
      </p>

      <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
        This demo simulates an API running outdated dependencies such as:
      </p>
      <ul style={{ fontSize: "0.9rem", color: "#ddd", marginTop: "8px" }}>
        <li>express@4.16.0</li>
        <li>body-parser@1.18.3</li>
        <li>cors@2.8.1</li>
      </ul>

      <p style={{ marginTop: "12px", color: "#aaa", fontSize: "0.9rem" }}>
        These outdated packages are intentionally used to demonstrate OWASP
        A06:2021 — Vulnerable and Outdated Components.
      </p>
    </div>
  );
}
