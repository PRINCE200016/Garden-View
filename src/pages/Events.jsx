import React, { useState } from 'react';
import { Heart, Gift, Briefcase, Users, Loader, CheckCircle } from 'lucide-react';
import { IMAGES } from '../constants/images';
import './Common.css';

const Events = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        eventType: 'Wedding',
        eventDate: '',
        guestsCount: 0,
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('http://localhost:8081/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            alert('Failed to send inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const events = [
        {
            title: 'Grand Weddings',
            desc: 'Celebrate your special day in our lush gardens. We provide full wedding packages including catering, decor, and accommodation for guests.',
            icon: <Heart size={32} />,
            capacity: 'Up to 500 guests',
            image: IMAGES.events.wedding
        },
        {
            title: 'Birthday Parties',
            desc: 'Make birthdays memorable with themed decorations, fun activities, and delicious food packages in our garden venue or restaurant.',
            icon: <Gift size={32} />,
            capacity: 'Up to 100 guests',
            image: IMAGES.events.party
        },
        {
            title: 'Corporate Events',
            desc: 'Professional setting for team building, conferences, and corporate parties. We offer high-speed internet and catering services.',
            icon: <Briefcase size={32} />,
            capacity: 'Up to 150 guests',
            image: IMAGES.events.corporate
        }
    ];

    return (
        <div className="page-container">
            <section className="page-header">
                <div className="container">
                    <h1>Events & Garden Venues</h1>
                    <p>The perfect backdrop for your most cherished moments.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="event-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {events.map((event, index) => (
                            <div key={index} className="room-card fade-in" style={{ textAlign: 'center' }}>
                                <img src={event.image} alt={event.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ padding: '30px' }}>
                                    <div className="card-icon" style={{ margin: '-50px auto 20px', position: 'relative', background: 'white' }}>{event.icon}</div>
                                    <h3>{event.title}</h3>
                                    <p style={{ margin: '15px 0' }}>{event.desc}</p>
                                    <div style={{ fontWeight: '600', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <Users size={18} /> {event.capacity}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: '#f9f9f9' }}>
                <div className="container">
                    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
                        {submitted ? (
                            <div className="text-center fade-in">
                                <CheckCircle size={64} color="green" style={{ marginBottom: '20px' }} />
                                <h2>Inquiry Sent!</h2>
                                <p>Thank you for reaching out. Our events team will contact you shortly.</p>
                                <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setSubmitted(false)}>Send Another</button>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Event Inquiry</h2>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="booking-field">
                                        <label>Name</label>
                                        <input type="text" required placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="booking-field">
                                        <label>Phone Number</label>
                                        <input type="tel" required placeholder="Your Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                    </div>
                                    <div className="booking-field">
                                        <label>Event Type</label>
                                        <select value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}>
                                            <option value="WEDDING">Wedding</option>
                                            <option value="BIRTHDAY">Birthday Party</option>
                                            <option value="CORPORATE">Corporate Event</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>
                                    <div className="booking-field">
                                        <label>Estimated Guests</label>
                                        <input type="number" placeholder="Number of guests" value={formData.guestsCount} onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })} />
                                    </div>
                                    <div className="booking-field">
                                        <label>Date of Event</label>
                                        <input type="date" required value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} />
                                    </div>
                                    <div className="booking-field">
                                        <label>Special Requirements</label>
                                        <textarea placeholder="Tell us more about your event..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? <Loader className="spin" size={18} /> : 'Send Inquiry'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
