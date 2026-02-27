import React, { useState } from 'react';
import { getApiUrl } from "@/config/api";

export default function SecurityLoggingFailuresDemo() {
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function triggerEvents() {
        setIsLoading(true);
        try {
            // Simulate multiple failed login attempts
            const events = [
                { username: 'admin', ip: '192.168.1.100', success: false },
                { username: 'admin', ip: '192.168.1.100', success: false },
                { username: 'root', ip: '45.33.22.11', success: false },
                { username: 'user1', ip: '192.168.1.105', success: true }
            ];

            const res = await fetch(getApiUrl(5100, "/vulnerable/log-events"), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ events })
            });
            const data = await res.json();
            setLogs(data.logs || []);
        } catch (error) {
            console.error("Error triggering events:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ color: '#f4d03f', marginBottom: '1rem' }}>📜 Security Event Logging Demo</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Simulate a series of security events and see how they are (or aren't) captured and analyzed.
            </p>
            <button 
                className="btn btn-warning" 
                onClick={triggerEvents}
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Trigger Events"}
            </button>
            <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                {logs.length > 0 ? (
                    <table className="table table-dark table-hover" style={{ fontSize: '0.85rem' }}>
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Event</th>
                                <th>User</th>
                                <th>IP</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => (
                                <tr key={index}>
                                    <td>{new Date(log.timestamp).toLocaleTimeString()}</td>
                                    <td>{log.event}</td>
                                    <td>{log.username}</td>
                                    <td>{log.ip}</td>
                                    <td style={{ color: log.success ? '#00ff00' : '#ff6b6b' }}>
                                        {log.success ? 'SUCCESS' : 'FAILURE'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ color: '#666', fontStyle: 'italic' }}>No logs to display. Trigger events to see activity.</p>
                )}
            </div>
        </div>
    );
}
