import React, { useState, useEffect } from 'react';
import { Wifi, Wind, Coffee, Tv, Eye, BedDouble, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants/images';
import { API } from '../config/api';
import './Common.css';

const Rooms = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`${API}/rooms`);
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    // Helper to get image based on room name or fallback
    const getRoomImage = (name) => {
        if (!name) return IMAGES.rooms.deluxe;
        const lowerName = name.toLowerCase();
        if (lowerName.includes('orange')) return IMAGES.rooms.orange;
        if (lowerName.includes('brick') || lowerName.includes('executive')) return IMAGES.rooms.redBrick;
        if (lowerName.includes('blue') || lowerName.includes('superior')) return IMAGES.rooms.blueHallway;
        if (lowerName.includes('green') || lowerName.includes('premium')) return IMAGES.rooms.greenLight;
        
        // Default mappings
        if (lowerName.includes('deluxe')) return IMAGES.rooms.deluxe;
        if (lowerName.includes('family')) return IMAGES.rooms.family;
        
        return IMAGES.rooms.deluxe; // absolute fallback
    };



    return (
        <div className="page-container">
            <section className="page-header">
                <div className="container">
                    <h1>Our Comfortable Rooms</h1>
                    <p>Elegant AC rooms designed for a peaceful and refreshing stay.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    {loading ? (
                        <div className="text-center" style={{ padding: '40px' }}>
                            <Loader className="spin" size={40} color="var(--primary)" />
                            <p>Loading our beautiful rooms...</p>
                        </div>
                    ) : (
                        <div className="room-grid">
                            {rooms.map((room) => (
                                <div key={room.id} className="room-card fade-in">
                                    <div style={{ position: 'relative' }}>
                                        <img src={getRoomImage(room.name)} alt={room.name} className="room-img" />
                                        {!room.available && (
                                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
                                                SOLDOUT
                                            </div>
                                        )}
                                    </div>
                                    <div className="room-info">
                                        <h2 className="room-name">{room.name}</h2>
                                        <div className="room-price">
                                            ₹{room.basePrice} <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 400 }}>/ Night</span>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '5px' }}>
                                                Weekend: ₹{room.weekendPrice}
                                            </div>
                                        </div>
                                        <div className="room-amenities">
                                            <div className="amenity-item"><Wind size={16} /> AC</div>
                                            <div className="amenity-item"><Wifi size={16} /> Free WiFi</div>
                                            <div className="amenity-item"><Tv size={16} /> LED TV</div>
                                            <div className="amenity-item"><Eye size={16} /> Garden View</div>
                                        </div>
                                        <button 
                                            className={`btn ${room.available ? 'btn-primary' : 'btn-outline'}`} 
                                            style={{ width: '100%' }} 
                                            onClick={() => navigate('/booking', { state: { roomId: room.id } })}
                                            disabled={!room.available}
                                        >
                                            {room.available ? 'Book Now' : 'Sold Out'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: '#f0f4f0' }}>
                <div className="container text-center">
                    <h2>Special Weekend Offers</h2>
                    <p style={{ maxWidth: '600px', margin: '20px auto' }}>
                        Planning a weekend getaway? Check out our special weekend pricing and packages for families.
                    </p>
                    <a href="tel:+917460005296" className="btn btn-outline">Call for Weekend Packages</a>
                </div>
            </section>
        </div>
    );
};

export default Rooms;
