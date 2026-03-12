import React from 'react';
import './Common.css';

const TermsOfService = () => {
    return (
        <div className="page-container">
            <section className="page-header">
                <div className="container">
                    <h1>Terms of Service</h1>
                    <p>Last updated: March 12, 2026</p>
                </div>
            </section>
            
            <section className="section-padding">
                <div className="container" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
                    <h3>1. Reservation and Booking</h3>
                    <p>All bookings made through our website are subject to availability. A valid ID is required at the time of check-in.</p>
                    
                    <h3>2. Cancellation and Refund</h3>
                    <p>Cancellations must be made at least 48 hours prior to the check-in date for a full refund. Late cancellations may be subject to a penalty fee.</p>
                    
                    <h3>3. Guest Responsibilities</h3>
                    <p>Guests are expected to follow resort rules and respect other guests. Any damage to resort property will be charged to the guest responsible.</p>
                    
                    <h3>4. Limitation of Liability</h3>
                    <p>Garden View Resort is not liable for any loss or damage to personal belongings during your stay. We recommend keeping valuables in the provided safes.</p>
                    
                    <h3>5. Governing Law</h3>
                    <p>These terms are governed by the laws of Madhya Pradesh, India. Any disputes will be settled in the local courts of Chhatarpur.</p>

                    <h3>6. Website Ownership and Handover</h3>
                    <p>
                        Intellectual property, design, and source code of this website belong exclusively to <strong>Arjun Rajawat</strong>. 
                        Ownership and administrative rights will only be transferred to the buyer or resort entity upon a documented <strong>Full Handover</strong> 
                        and the issuance of a formal <strong>No Objection Certificate (NOC)</strong> signed by Arjun Rajawat. 
                        Until such time, all rights are reserved by the original owner.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
