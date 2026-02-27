import React, { useState } from 'react';
import { getApiUrl } from "@/config/api";

export default function ServerSideRequestForgeryDemo() {
    const [targetUrl, setTargetUrl] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleFetch() {
        if (!targetUrl) return;
        setIsLoading(true);
        setResponse("Fetching...");
        try {
            const res = await fetch(getApiUrl(5100, "/vulnerable/fetch-url"), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: targetUrl })
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse("Error connecting to the SSRF service.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ color: '#f4d03f', marginBottom: '1rem' }}>🌐 SSRF Simulator</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Enter a URL and see if you can access internal resources like <code>http://127.0.0.1:5100/vulnerable/internal</code> or <code>http://metadata.google.internal</code>.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="http://example.com"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    style={{ flex: 1, backgroundColor: '#2d2d2d', color: '#fff', border: '1px solid #444' }}
                />
                <button 
                    className="btn btn-warning" 
                    onClick={handleFetch}
                    disabled={isLoading}
                >
                    {isLoading ? "Fetching..." : "Fetch content"}
                </button>
            </div>
            {response && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#000', borderRadius: '8px', overflowX: 'auto' }}>
                    <pre style={{ color: '#00ff00', margin: 0 }}><code>{response}</code></pre>
                </div>
            )}
        </div>
    );
}
