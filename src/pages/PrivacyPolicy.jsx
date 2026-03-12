import React from 'react';
import './Common.css';

const PrivacyPolicy = () => {
    return (
        <div className="page-container">
            <section className="page-header">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: March 12, 2026</p>
                </div>
            </section>
            
            <section className="section-padding">
                <div className="container" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
                    <h3>1. Information We Collect</h3>
                    <p>We collect information you provide directly to us when booking a room, signing up for our newsletter, or contacting us through our website. This may include your name, email address, phone number, and payment details.</p>
                    
                    <h3>2. How We Use Your Information</h3>
                    <p>We use the information we collect to process your bookings, communicate with you about your stay, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.</p>
                    
                    <h3>3. Data Protection</h3>
                    <p>We implement security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.</p>
                    
                    <h3>4. Cookies</h3>
                    <p>Our website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings.</p>
                    
                    <h3>5. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us at gardenviewresort2026@gmail.com.</p>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
