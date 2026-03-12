import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, Utensils, Bed, PartyPopper, Phone, MessageCircle } from 'lucide-react';
import { IMAGES } from '../constants/images';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [bookingState, setBookingState] = useState({
        checkIn: '',
        checkOut: '',
        guests: 2
    });

    const handleVisitBooking = () => {
        // We can pass state to the booking page via navigate
        navigate('/booking', { state: bookingState });
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero" style={{ backgroundImage: `url(${IMAGES.hero.banner})` }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="fade-in">A Peaceful Stay Surrounded by Nature</h1>
                    <p className="hero-subtitle fade-in" style={{ animationDelay: '0.2s' }}>
                        Experience the harmony of luxury and garden ambiance at Garden View Resort.
                    </p>

                    <div className="booking-bar fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="booking-field">
                            <label><Calendar size={16} /> Check-in</label>
                            <input 
                                type="date" 
                                value={bookingState.checkIn} 
                                onChange={(e) => setBookingState({ ...bookingState, checkIn: e.target.value })}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="booking-field">
                            <label><Calendar size={16} /> Check-out</label>
                            <input 
                                type="date" 
                                value={bookingState.checkOut} 
                                onChange={(e) => setBookingState({ ...bookingState, checkOut: e.target.value })}
                                min={bookingState.checkIn || new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="booking-field">
                            <label><Users size={16} /> Guests</label>
                            <select 
                                value={bookingState.guests} 
                                onChange={(e) => setBookingState({ ...bookingState, guests: e.target.value })}
                            >
                                <option value={1}>1 Guest</option>
                                <option value={2}>2 Guests</option>
                                <option value={3}>3 Guests</option>
                                <option value={4}>4+ Guests</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" onClick={handleVisitBooking}>
                            Check Availability
                        </button>
                    </div>

                    <div className="hero-cta fade-in" style={{ animationDelay: '0.6s' }}>
                        <a href="tel:+917460005296" className="btn btn-primary">
                            <Phone size={18} /> Call Now
                        </a>
                        <a href="https://wa.me/917460005296" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ background: 'white' }}>
                            WhatsApp Inquiry
                        </a>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="highlights section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Our Highlights</h2>
                        <p>Everything you need for a perfect getaway</p>
                    </div>

                    <div className="highlight-grid">
                        <div className="highlight-card">
                            <div className="card-icon"><MapPin size={32} /></div>
                            <h3>Garden Ambiance</h3>
                            <p>Lush green gardens with evening lights, perfect for peaceful walks and relaxation.</p>
                        </div>
                        <div className="highlight-card">
                            <div className="card-icon"><Utensils size={32} /></div>
                            <h3>In-house Restaurant</h3>
                            <p>Delicious Veg and Non-Veg multi-cuisine menu for a satisfying family dining experience.</p>
                        </div>
                        <div className="highlight-card">
                            <div className="card-icon"><Bed size={32} /></div>
                            <h3>Comfortable Rooms</h3>
                            <p>Spacious, well-ventilated AC rooms designed for your ultimate comfort.</p>
                        </div>
                        <div className="highlight-card">
                            <div className="card-icon"><PartyPopper size={32} /></div>
                            <h3>Event Venue</h3>
                            <p>The perfect setting for weddings, birthdays, and corporate events with large lawns.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
