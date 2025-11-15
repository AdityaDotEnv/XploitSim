import React, { useEffect, useState } from "react";

export default function SoftwareIntegrityDemo() {
  const [unsafeUpdate, setUnsafeUpdate] = useState(null);
  const [safeUpdate, setSafeUpdate] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5400/api/update")
      .then((res) => res.json())
      .then((data) => setUnsafeUpdate(data));

    fetch("http://127.0.0.1:5400/api/update/signed")
      .then((res) => res.json())
      .then((data) => setSafeUpdate(data));
  }, []);

  return (
    <div
      style={{
        background: "#1a1a1a",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #333",
      }}
    >
      <h3 style={{ color: "#f4d03f" }}>Unsigned vs Signed Update Packages</h3>

      <div style={{ marginTop: "10px" }}>
        <h4 style={{ color: "#ff6b6b" }}>❌ UNSAFE UPDATE (Tampered)</h4>
        <pre style={{ color: "#ddd" }}>
          {unsafeUpdate ? JSON.stringify(unsafeUpdate, null, 2) : "Loading..."}
        </pre>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4 style={{ color: "#7dff7d" }}>✅ SAFE UPDATE (Signed)</h4>
        <pre style={{ color: "#ddd" }}>
          {safeUpdate ? JSON.stringify(safeUpdate, null, 2) : "Loading..."}
        </pre>
      </div>
    </div>
  );
}
