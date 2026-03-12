import React from 'react';
import { Wind, ParkingCircle, Clock, ShieldCheck, Eye, Utensils, Wifi, Droplets } from 'lucide-react';
import './Common.css';

const Amenities = () => {
    const amenityList = [
        { title: 'AC Rooms', desc: 'Modern air conditioning in all rooms for a comfortable temperature year-round.', icon: <Wind size={40} /> },
        { title: 'Free Parking', desc: 'Spacious and secure parking area for all our guests at no extra cost.', icon: <ParkingCircle size={40} /> },
        { title: '24x7 Reception', desc: 'Our dedicated staff is available around the clock to assist you with any needs.', icon: <Clock size={40} /> },
        { title: 'CCTV Security', desc: 'Electronic surveillance throughout the resort to ensure your safety and peace of mind.', icon: <ShieldCheck size={40} /> },
        { title: 'Garden View', desc: 'Beautifully landscaped gardens visible from most rooms and common areas.', icon: <Eye size={40} /> },
        { title: 'In-house Restaurant', desc: 'Expert chefs serving a variety of delicious vegetarian and non-vegetarian dishes.', icon: <Utensils size={40} /> },
        { title: 'Free WiFi', desc: 'High-speed internet access available throughout the resort premises.', icon: <Wifi size={40} /> },
        { title: '24x7 Water Supply', desc: 'Uninterrupted hot and cold water supply in all rooms.', icon: <Droplets size={40} /> },
    ];

    return (
        <div className="page-container">
            <section className="page-header">
                <div className="container">
                    <h1>Resort Amenities</h1>
                    <p>Thoughtfully curated amenities to make your stay pleasant and hassle-free.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="amenity-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        {amenityList.map((item, index) => (
                            <div key={index} className="highlight-card fade-in" style={{ padding: '30px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary-dark)' }}>
                <div className="container text-center">
                    <h2>Experience Peace & Luxury</h2>
                    <p style={{ maxWidth: '600px', margin: '20px auto' }}>
                        Ready to enjoy these amenities in person? Book your stay today and experience the tranquility of Garden View Resort.
                    </p>
                    <button className="btn btn-primary" onClick={() => window.location.href = '/booking'}>Book Your stay Now</button>
                    <div style={{ marginTop: '15px' }}>
                        <a href="tel:+917509245769" style={{ color: 'var(--primary-dark)', fontWeight: '600' }}>Or Call Us: +91 7509245769</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Amenities;
