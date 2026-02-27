import React, { useState } from 'react';
import { getApiUrl } from "@/config/api";

export default function VulnerableComponentsDemo() {
    const [libData, setLibData] = useState<any>(null);

    async function checkLibs() {
        const res = await fetch(getApiUrl(5100, "/vulnerable/libraries"));
        setLibData(await res.json());
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Dependency Audit Demo</h2>
            <p>Check the system libraries for known vulnerabilities.</p>
            <button className="btn btn-primary" onClick={checkLibs}>Run Audit</button>
            {libData && (
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                    <pre>{JSON.stringify(libData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
