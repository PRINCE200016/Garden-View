import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Loader, CheckCircle } from 'lucide-react';
import { API } from '../config/api';
import './Common.css';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '', // Stored in phone for Event model
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Using Event controller as a generic inquiry handler
            await fetch(`${API}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone || formData.email, // Use phone or email as identifier
                    eventType: 'OTHER',
                    eventDate: new Date().toISOString(),
                    message: `[Contact Form] Email: ${formData.email} | Message: ${formData.message}`
                }),
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <section className="page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We are here to help you plan your perfect stay or event.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }}>
                        <div className="contact-info-panel">
                            <h2 style={{ marginBottom: '30px' }}>Get In Touch</h2>
                            <div className="contact-methods">
                                <div className="contact-method" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                    <div className="card-icon" style={{ margin: '0', width: '50px', height: '50px' }}><Phone size={24} /></div>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>Phone</h4>
                                        <p>+91 7460005296</p>
                                    </div>
                                </div>
                                <div className="contact-method" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                    <div className="card-icon" style={{ margin: '0', width: '50px', height: '50px' }}><Mail size={24} /></div>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>Email</h4>
                                        <p>gardenviewresort2026@gmail.com</p>
                                    </div>
                                </div>
                                <div className="contact-method" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                    <div className="card-icon" style={{ margin: '0', width: '50px', height: '50px' }}><MapPin size={24} /></div>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>Location</h4>
                                        <p>Near Khajuraho Railway Station,Tikuri </p>
                                        <p>Khajuraho, Madhya Pradesh ,India - 471606</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <a href="https://wa.me/917460005296" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#25D366', border: 'none' }}>
                                    <MessageCircle size={20} /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="contact-form-panel" style={{ background: '#f9f9f9', padding: '40px', borderRadius: '12px' }}>
                            {submitted ? (
                                <div className="text-center fade-in" style={{ padding: '40px 0' }}>
                                    <CheckCircle size={64} color="green" style={{ marginBottom: '20px' }} />
                                    <h3>Message Sent!</h3>
                                    <p>We'll get back to you shortly. Thank you!</p>
                                    <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setSubmitted(false)}>Send Another</button>
                                </div>
                            ) : (
                                <>
                                    <h3 style={{ marginBottom: '25px' }}>Send us a Message</h3>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                            <div className="booking-field">
                                                <label>Full Name</label>
                                                <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                            </div>
                                            <div className="booking-field">
                                                <label>Email Address</label>
                                                <input type="email" required placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="booking-field">
                                            <label>Phone Number</label>
                                            <input type="tel" placeholder="+91 00000 00000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                        </div>
                                        <div className="booking-field">
                                            <label>Message</label>
                                            <textarea required placeholder="How can we help you?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ minHeight: '150px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                            {loading ? <Loader className="spin" size={18} /> : <><Send size={18} /> Send Message</>}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div style={{ width: '100%', height: '450px', marginBottom: '-10px' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.195048123456!2d79.8870940!3d24.8480940!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3982e0e0e0e0e0e1%3A0x0!2zVGlrdXJpLCBLaGFanVyYWhvLCBNYWRoeWEgUHJhZGVzaA!5e0!3m2!1sen!2sin!4v1710300000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Resort Location"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default Contact;
