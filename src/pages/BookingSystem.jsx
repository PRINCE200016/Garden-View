import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Users, Bed, CheckCircle, CreditCard, ChevronRight, Layout, User, Loader } from 'lucide-react';
import './Common.css';

const BookingSystem = () => {
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');
    
    // Check for initial state from navigation (e.g. from Home page)
    const initialState = location.state || {};

    const [bookingData, setBookingData] = useState({
        roomId: '',
        roomType: '',
        price: 0,
        checkIn: initialState.checkIn || '',
        checkOut: initialState.checkOut || '',
        guests: initialState.guests || 2,
        userName: '',
        email: '',
        phone: '',
        userId: null,
        bookingId: null
    });

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/rooms');
            const data = await response.json();
            setRooms(data);
            
            // If we have an incoming roomId from navigation, use it
            const targetRoomId = initialState.roomId;
            const selectedRoom = targetRoomId 
                ? data.find(r => r.id === targetRoomId) 
                : (data.length > 0 ? data[0] : null);

            if (selectedRoom) {
                setBookingData(prev => ({ 
                    ...prev, 
                    roomId: selectedRoom.id, 
                    roomType: selectedRoom.roomType,
                    price: selectedRoom.basePrice 
                }));
            }
        } catch (err) {
            console.error('Error fetching rooms:', err);
            setError('Failed to load rooms. Please try again later.');
        }
    };

    const handleRoomSelect = (room) => {
        setBookingData({ 
            ...bookingData, 
            roomId: room.id, 
            roomType: room.roomType,
            price: room.basePrice 
        });
    };

    const handleGuestSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8081/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: bookingData.userName,
                    email: bookingData.email,
                    phone: bookingData.phone
                }),
            });
            const user = await response.json();
            setBookingData({ ...bookingData, userId: user.id });
            setStep(3);
        } catch (err) {
            setError('Guest registration failed. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    const createBooking = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8081/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: bookingData.userId,
                    roomId: bookingData.roomId,
                    checkIn: bookingData.checkIn,
                    checkOut: bookingData.checkOut,
                    guests: bookingData.guests
                }),
            });
            const booking = await response.json();
            setBookingData({ ...bookingData, bookingId: booking.id, totalAmount: booking.totalAmount });
            setStep(4);
        } catch (err) {
            setError('Booking creation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (status) => {
        setLoading(true);
        try {
            await fetch('http://localhost:8081/api/payments/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: bookingData.bookingId,
                    status: status
                }),
            });
            if (status === 'SUCCESS') {
                setStep(5); // Success step
            } else {
                alert('Payment failed. Your booking has been cancelled.');
                setStep(1);
            }
        } catch (err) {
            setError('Payment processing error.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (step === 1 && (!bookingData.checkIn || !bookingData.checkOut)) {
            alert('Please select check-in and check-out dates.');
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    return (
        <div className="page-container">
            <section className="page-header">
                <div className="container">
                    <h1>Online Booking</h1>
                    <p>Secure your stay at Garden View Resort in just a few clicks.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="booking-steps-nav" style={{ maxWidth: '900px', margin: '0 auto 40px auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', left: '0', width: '100%', height: '2px', background: '#eee', zIndex: '1' }}></div>
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} className={`step-dot ${step >= s ? 'active' : ''}`} style={{
                                    zIndex: '2', width: '32px', height: '32px', borderRadius: '50%',
                                    background: step >= s ? 'var(--primary)' : '#eee', color: step >= s ? 'white' : '#888',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                }}>
                                    {step > s ? <CheckCircle size={18} /> : s}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="booking-card" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '15px', boxShadow: 'var(--shadow)' }}>
                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

                        {step === 1 && (
                            <div className="fade-in">
                                <h2 style={{ marginBottom: '25px' }}><Calendar size={24} /> Dates & Room Preference</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                    <div className="booking-field">
                                        <label>Check-in</label>
                                        <input type="date" value={bookingData.checkIn} onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })} min={new Date().toISOString().split('T')[0]} />
                                    </div>
                                    <div className="booking-field">
                                        <label>Check-out</label>
                                        <input type="date" value={bookingData.checkOut} onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })} min={bookingData.checkIn || new Date().toISOString().split('T')[0]} />
                                    </div>
                                </div>
                                
                                <h3 style={{ marginBottom: '15px' }}>Choose Room</h3>
                                <div className="room-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                                    {rooms.map((room) => (
                                        <div key={room.id} 
                                            className={`room-option ${bookingData.roomId === room.id ? 'active' : ''}`}
                                            onClick={() => handleRoomSelect(room)}
                                            style={{ 
                                                padding: '15px 20px', border: `2px solid ${bookingData.roomId === room.id ? 'var(--primary)' : '#eee'}`,
                                                borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                            }}>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{room.roomType}</div>
                                                <div style={{ color: 'var(--primary)', size: '0.9rem' }}>₹{room.basePrice}/night</div>
                                            </div>
                                            {bookingData.roomId === room.id && <CheckCircle size={20} color="var(--primary)" />}
                                        </div>
                                    ))}
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%' }} onClick={nextStep}>
                                    Next: Your Details <ChevronRight size={18} />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="fade-in">
                                <h2 style={{ marginBottom: '25px' }}><User size={24} /> Guest Information</h2>
                                <form onSubmit={handleGuestSubmit}>
                                    <div className="booking-field" style={{ marginBottom: '15px' }}>
                                        <label>Full Name</label>
                                        <input type="text" required value={bookingData.userName} onChange={(e) => setBookingData({ ...bookingData, userName: e.target.value })} placeholder="John Doe" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                                        <div className="booking-field">
                                            <label>Email Address</label>
                                            <input type="email" required value={bookingData.email} onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })} placeholder="john@example.com" />
                                        </div>
                                        <div className="booking-field">
                                            <label>Phone Number</label>
                                            <input type="tel" required value={bookingData.phone} onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })} placeholder="+91 9876543210" />
                                        </div>
                                    </div>
                                    <div className="booking-field" style={{ marginBottom: '25px' }}>
                                        <label><Users size={16} /> Number of Guests</label>
                                        <select value={bookingData.guests} onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}>
                                            <option value={1}>1 Guest</option>
                                            <option value={2}>2 Guests</option>
                                            <option value={3}>3 Guests</option>
                                            <option value={4}>4+ Guests</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>Back</button>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={loading}>
                                            {loading ? <Loader className="spin" size={18} /> : 'Continue to Summary'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="fade-in">
                                <h2 style={{ marginBottom: '25px' }}><Layout size={24} /> Review Summary</h2>
                                <div style={{ background: '#f8fdf8', border: '1px solid #e1f0e1', padding: '25px', borderRadius: '12px', marginBottom: '30px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <p style={{ color: '#666', marginBottom: '5px' }}>Reserved Room</p>
                                            <p style={{ fontWeight: '600', fontSize: '1.2rem' }}>{bookingData.roomType}</p>
                                        </div>
                                        <div>
                                            <p style={{ color: '#666', marginBottom: '5px' }}>Guest</p>
                                            <p style={{ fontWeight: '600' }}>{bookingData.userName} ({bookingData.guests} Guests)</p>
                                        </div>
                                        <div style={{ gridColumn: 'span 2', borderTop: '1px solid #eee', pt: '15px', marginTop: '10px' }}>
                                            <p style={{ color: '#666' }}>Stay Period</p>
                                            <p style={{ fontWeight: '600' }}>{bookingData.checkIn} to {bookingData.checkOut}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <button className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>Edit Details</button>
                                    <button className="btn btn-primary" style={{ flex: 2 }} onClick={createBooking} disabled={loading}>
                                        {loading ? <Loader className="spin" size={18} /> : 'Proceed to Payment'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="fade-in text-center">
                                <CreditCard size={64} color="var(--primary)" style={{ marginBottom: '20px' }} />
                                <h2>Complete Payment</h2>
                                <p style={{ color: '#666', marginBottom: '30px' }}>Secure your booking by processing the payment. (Simulated Gateway)</p>
                                
                                <div style={{ background: '#eee', padding: '20px', borderRadius: '10px', marginBottom: '30px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    Total Amount: ₹{bookingData.totalAmount}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <button className="btn btn-primary" style={{ height: '50px', fontSize: '1.1rem' }} onClick={() => handlePayment('SUCCESS')} disabled={loading}>
                                        Pay & Confirm
                                    </button>
                                    <button className="btn btn-outline" style={{ color: 'red', border: '1px solid red' }} onClick={() => handlePayment('FAILED')} disabled={loading}>
                                        Cancel Transaction
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="fade-in text-center" style={{ padding: '40px 0' }}>
                                <div style={{ width: '80px', height: '80px', background: '#e1f0e1', color: 'green', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px auto' }}>
                                    <CheckCircle size={48} />
                                </div>
                                <h1 style={{ color: 'var(--text-dark)', marginBottom: '15px' }}>Booking Confirmed!</h1>
                                <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '35px' }}>
                                    A confirmation email has been sent to <strong>{bookingData.email}</strong>. 
                                    We look forward to welcoming you to Garden View Resort!
                                </p>
                                <button className="btn btn-primary" onClick={() => (window.location.href = '/')}>Back to Home</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookingSystem;
