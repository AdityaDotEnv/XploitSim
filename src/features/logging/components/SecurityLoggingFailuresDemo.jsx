import React, { useState } from "react";

export default function SecurityLoggingFailuresDemo() {
  const [result, setResult] = useState(null);

  async function call(route, method = "POST", body = {}) {
    const res = await fetch(`http://127.0.0.1:5600/api/${route}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "POST" ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      {/* Title */}
      <h2
        style={{
          color: "#ffcd58",
          fontSize: "36px",
          marginBottom: "20px",
        }}
      >
        Logging Failures Simulator
      </h2>

      {/* INTERNAL 2-COLUMN LAYOUT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          width: "95%",
          maxWidth: "1300px",
          padding: "20px",
          background: "#111",
          borderRadius: "14px",
          border: "1px solid #444",
        }}
      >
        {/* LEFT SIDE → LOG PANEL */}
        <div
          style={{
            background: "#0d0d0d",
            borderRadius: "12px",
            border: "1px solid #555",
            padding: "18px",
            minHeight: "450px",
            maxHeight: "550px",
            overflowY: "auto",
            fontFamily: "Consolas, Menlo, monospace",
            fontSize: "15px",
            whiteSpace: "pre-wrap",
            lineHeight: "1.45",
          }}
        >
          {result
            ? typeof result.logs === "string"
              ? result.logs.replace(/\\n/g, "\n").replace(/\\t/g, "    ")
              : JSON.stringify(result, null, 2)
            : "Awaiting action..."}
        </div>

        {/* RIGHT SIDE → BUTTONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            justifyContent: "flex-start",
          }}
        >
          <button
            className="btn btn-outline-warning"
            onClick={() =>
              call("no-logging-login", "POST", {
                username: "admin",
                password: "admin123",
              })
            }
          >
            Login (No Logging)
          </button>

          <button
            className="btn btn-outline-warning"
            onClick={() =>
              call("weak-logging", "POST", {
                username: "test",
                password: "123456",
              })
            }
          >
            Weak Logging (Logs Sensitive Data)
          </button>

          <button
            className="btn btn-outline-warning"
            onClick={() => call("log-no-context", "GET")}
          >
            Log With No Context
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => call("delete-logs")}
          >
            Delete Logs (Log Tampering)
          </button>

          <button
            className="btn btn-outline-info"
            onClick={() => call("view-logs", "GET")}
          >
            View Log File
          </button>
        </div>
      </div>
    </div>
  );
}
