import React, { useState } from "react";

export default function ServerSideRequestForgeryDemo() {
  const [targetUrl, setTargetUrl] = useState("");
  const [response, setResponse] = useState(null);

  async function sendRequest() {
    try {
      const res = await fetch("http://127.0.0.1:5500/api/ssrf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setResponse({ error: String(err) });
    }
  }

  return (
    <div
      style={{
        background: "#1d1d1d",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #333",
      }}
    >
      <h3 style={{ color: "#f5b041" }}>SSRF Attack Simulator</h3>

      {/* Examples Card */}
      <div
        style={{
          background: "#2b2b2b",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #444",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ color: "#ffca58", marginBottom: "10px" }}>
          Example URLs to Try:
        </h4>

        <ul style={{ listStyle: "none", paddingLeft: "0", color: "#ddd" }}>
          <li style={{ marginBottom: "8px" }}>
            <code style={{ color: "#7dff7d" }}>http://127.0.0.1:4000</code>
          </li>
          <li style={{ marginBottom: "8px" }}>
            <code style={{ color: "#7dff7d" }}>http://localhost:5001</code>
          </li>
          <li style={{ marginBottom: "8px" }}>
            <code style={{ color: "#ff7d7d" }}>
              http://169.254.169.254/latest/meta-data/
            </code>{" "}
            <span style={{ color: "#b3b3b3" }}>(Cloud metadata endpoint)</span>
          </li>
        </ul>
      </div>

      <input
        type="text"
        placeholder="Enter URL to fetch (e.g., http://127.0.0.1:4000)"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #555",
          marginTop: "10px",
        }}
      />

      <button
        className="btn btn-outline-warning"
        style={{ marginTop: "15px" }}
        onClick={sendRequest}
      >
        Send Request (Vulnerable)
      </button>

      <pre style={{ color: "#ddd", marginTop: "20px" }}>
        {response ? JSON.stringify(response, null, 2) : "Awaiting request..."}
      </pre>
    </div>
  );
}
