import React, { useState } from 'react';
import { getApiUrl } from "@/config/api";

export default function SoftwareIntegrityDemo() {
    const [status, setStatus] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function checkIntegrity() {
        setIsLoading(true);
        setStatus("Verifying software packages...");
        try {
            const res = await fetch(getApiUrl(5100, "/vulnerable/integrity-check"));
            const data = await res.json();
            setStatus(data.message || "Audit complete.");
        } catch (error) {
            setStatus("Error connecting to integrity service.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ color: '#f4d03f', marginBottom: '1rem' }}>🏁 Software Integrity Audit</h3>
            <p style={{ color: '#ccc', fontSize: '0.95rem' }}>
                Simulate a check for tampered files or unsigned updates.
            </p>
            <button 
                className="btn btn-warning" 
                onClick={checkIntegrity}
                disabled={isLoading}
            >
                {isLoading ? "Auditing..." : "Start Integrity Check"}
            </button>
            {status && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#2d2d2d', borderRadius: '8px', borderLeft: '4px solid #f4d03f' }}>
                    <code style={{ color: '#00ff00' }}>{status}</code>
                </div>
            )}
        </div>
    );
}
