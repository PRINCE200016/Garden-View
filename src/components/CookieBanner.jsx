import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '20px 30px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10000,
            animation: 'slideUp 0.5s ease'
        }}>
            <div style={{ color: '#333', fontSize: '14px', maxWidth: '70%', lineHeight: '1.5' }}>
                <p>We use cookies to ensure you get the best experience on our website. 
                   By continuing, you agree to our <Link to="/privacy-policy" style={{ color: 'var(--primary)', fontWeight: '600' }}>Privacy Policy</Link>.</p>
            </div>
            <button 
                onClick={handleAccept}
                className="btn btn-primary"
                style={{ padding: '8px 25px' }}
            >
                Got it
            </button>
        </div>
    );
};

export default CookieBanner;
