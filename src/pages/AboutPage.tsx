import React from 'react';
import '../index.css';
import '../App.css';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page" style={{ padding: '100px 20px', minHeight: '80vh', backgroundColor: '#fafafa' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#1e1b4b' }}>About XploitSim</h1>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '40px' }}>
                    XploitSim is an interactive educational platform designed to help developers and security enthusiasts understand the OWASP Top 10 vulnerabilities through practical simulations and sandboxed environments.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', textAlign: 'left' }}>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ color: '#5b4bff', marginBottom: '15px' }}>Our Mission</h3>
                        <p style={{ color: '#6b7280' }}>
                            To bridge the gap between theoretical security knowledge and practical implementation by providing a safe space to explore and exploit common web vulnerabilities.
                        </p>
                    </div>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ color: '#5b4bff', marginBottom: '15px' }}>Interactive Learning</h3>
                        <p style={{ color: '#6b7280' }}>
                            Each vulnerability comes with a detailed explanation, real-world examples, and a dedicated sandbox where you can see the vulnerability in action.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '60px', padding: '40px', background: '#1e1b4b', color: 'white', borderRadius: '20px' }}>
                    <h2>Contribute to Security</h2>
                    <p style={{ marginTop: '15px', opacity: '0.9' }}>
                        Education is the first step towards writing secure code. By understanding how attacks work, we can build more resilient applications.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
