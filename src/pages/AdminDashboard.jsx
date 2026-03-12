import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, CalendarCheck, MessageSquare, TrendingUp,
    CheckCircle, XCircle, Utensils, Bed, Save, Plus, Trash2, Loader2
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) navigate('/admin/login');
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminName');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Garden View</h2>
                    <span>Admin Panel</span>
                </div>
                <nav className="admin-nav">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
                        <LayoutDashboard size={20} /> Overview
                    </button>
                    <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
                        <CalendarCheck size={20} /> Bookings
                    </button>
                    <button className={activeTab === 'rooms' ? 'active' : ''} onClick={() => setActiveTab('rooms')}>
                        <Bed size={20} /> Room Management
                    </button>
                    <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>
                        <Utensils size={20} /> Restaurant Menu
                    </button>
                    <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>
                        <MessageSquare size={20} /> Inquiries
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </nav>
            </div>

            <div className="admin-main">
                <header className="admin-header">
                    <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}</h1>
                    <div className="admin-user">
                        <span>Welcome, {localStorage.getItem('adminName') || 'Admin'}</span>
                        <div className="avatar">A</div>
                    </div>
                </header>

                <div className="tab-content">
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'bookings' && <BookingsTab />}
                    {activeTab === 'rooms' && <RoomsTab />}
                    {activeTab === 'menu' && <MenuTab />}
                    {activeTab === 'events' && <EventsTab />}
                </div>
            </div>
        </div>
    );
};

// --- API Helper ---
const API_BASE = 'http://localhost:8081/api';
const ADMIN_API_BASE = 'http://localhost:8081/admin';
const getAuthHeader = () => ({ 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`, 'Content-Type': 'application/json' });

// --- Tab Components ---

const OverviewTab = () => {
    const [stats, setStats] = useState({ revenue: 0, bookings: 0, inquiries: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app, these would be separate calls or one aggregate
                const revRes = await fetch(`${ADMIN_API_BASE}/revenue/monthly`, { headers: getAuthHeader() });
                const revData = await revRes.json();

                const bookRes = await fetch(`${ADMIN_API_BASE}/bookings`, { headers: getAuthHeader() });
                const bookData = await bookRes.json();

                const eveRes = await fetch(`${ADMIN_API_BASE}/events`, { headers: getAuthHeader() });
                const eveData = await eveRes.json();

                setStats({
                    revenue: revData.totalRevenue || 0,
                    bookings: bookData.length || 0,
                    inquiries: eveData.length || 0
                });
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#10b98120', color: '#10b981' }}><TrendingUp size={24} /></div>
                <div className="stat-info"><h3>Monthly Revenue</h3><p>₹{stats.revenue.toLocaleString()}</p></div>
            </div>
            <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}><CalendarCheck size={24} /></div>
                <div className="stat-info"><h3>Total Bookings</h3><p>{stats.bookings}</p></div>
            </div>
            <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}><MessageSquare size={24} /></div>
                <div className="stat-info"><h3>New Inquiries</h3><p>{stats.inquiries}</p></div>
            </div>
        </div>
    );
};

const BookingsTab = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const res = await fetch(`${ADMIN_API_BASE}/bookings`, { headers: getAuthHeader() });
            const data = await res.json();
            setBookings(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { fetchBookings(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await fetch(`${ADMIN_API_BASE}/bookings/${id}/${status}`, { method: 'PUT', headers: getAuthHeader() });
            fetchBookings();
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="data-section">
            <table className="admin-table">
                <thead>
                    <tr><th>ID</th><th>Guest</th><th>Room</th><th>Date</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b.id}>
                            <td>#{b.id}</td><td>{b.userName}</td><td>{b.roomType}</td><td>{b.checkIn}</td><td>₹{b.totalAmount.toLocaleString()}</td>
                            <td><span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span></td>
                            <td>
                                <div className="action-btns">
                                    {b.status === 'PENDING' && (
                                        <>
                                            <button className="btn-icon confirm" onClick={() => updateStatus(b.id, 'confirm')}><CheckCircle size={18} /></button>
                                            <button className="btn-icon cancel" onClick={() => updateStatus(b.id, 'cancel')}><XCircle size={18} /></button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RoomsTab = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        try {
            const res = await fetch(`${API_BASE}/rooms`, { headers: getAuthHeader() });
            const data = await res.json();
            setRooms(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { fetchRooms(); }, []);

    const handleUpdate = async (room) => {
        try {
            await fetch(`${API_BASE}/rooms/admin/${room.id}`, {
                method: 'PUT',
                headers: getAuthHeader(),
                body: JSON.stringify(room)
            });
            alert('Room updated successfully!');
            fetchRooms();
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="data-section">
            <table className="admin-table">
                <thead>
                    <tr><th>Room Type</th><th>Base Price (₹)</th><th>Weekend Price (₹)</th><th>Total Rooms</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {rooms.map(r => (
                        <tr key={r.id}>
                            <td>{r.roomType}</td>
                            <td><input type="number" value={r.basePrice} onChange={(e) => setRooms(rooms.map(x => x.id === r.id ? { ...x, basePrice: e.target.value } : x))} /></td>
                            <td><input type="number" value={r.weekendPrice} onChange={(e) => setRooms(rooms.map(x => x.id === r.id ? { ...x, weekendPrice: e.target.value } : x))} /></td>
                            <td><input type="number" value={r.totalRooms} onChange={(e) => setRooms(rooms.map(x => x.id === r.id ? { ...x, totalRooms: e.target.value } : x))} /></td>
                            <td><button className="save-btn" onClick={() => handleUpdate(r)}><Save size={18} /> Update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const MenuTab = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', category: 'Main Course', price: '', description: '', available: true });

    const fetchMenu = async () => {
        try {
            const res = await fetch(`${API_BASE}/menu`, { headers: getAuthHeader() });
            const data = await res.json();
            setMenu(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { fetchMenu(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_BASE}/menu/admin`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: JSON.stringify(newItem)
            });
            setShowAdd(false);
            setNewItem({ name: '', category: 'Main Course', price: '', description: '', available: true });
            fetchMenu();
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await fetch(`${API_BASE}/menu/admin/${id}`, { method: 'DELETE', headers: getAuthHeader() });
            fetchMenu();
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="data-section">
            <div className="section-header">
                <h2>Restaurant Menu</h2>
                <button className="add-btn" onClick={() => setShowAdd(!showAdd)}>
                    <Plus size={18} /> {showAdd ? 'Cancel' : 'Add Item'}
                </button>
            </div>

            {showAdd && (
                <form className="admin-form" onSubmit={handleAdd}>
                    <div className="form-grid">
                        <input type="text" placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
                        <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                            <option>Starters</option><option>Main Course</option><option>Desserts</option><option>Drinks</option>
                        </select>
                        <input type="number" placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} required />
                        <button type="submit" className="save-btn">Save Item</button>
                    </div>
                </form>
            )}

            <table className="admin-table">
                <thead>
                    <tr><th>Name</th><th>Category</th><th>Price (₹)</th><th>Available</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {menu.map(m => (
                        <tr key={m.id}>
                            <td>{m.name}</td><td>{m.category}</td><td>{m.price}</td>
                            <td><input type="checkbox" checked={m.available} readOnly /></td>
                            <td>
                                <div className="action-btns">
                                    <button className="btn-icon cancel" onClick={() => handleDelete(m.id)}><Trash2 size={18} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const EventsTab = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${ADMIN_API_BASE}/events`, { headers: getAuthHeader() });
                const data = await res.json();
                setEvents(data);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        fetchEvents();
    }, []);

    if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="data-section">
            <table className="admin-table">
                <thead>
                    <tr><th>Name</th><th>Type</th><th>Date</th><th>Guests</th><th>Status</th></tr>
                </thead>
                <tbody>
                    {events.map(e => (
                        <tr key={e.id}>
                            <td>{e.name}</td><td>{e.eventType}</td><td>{new Date(e.eventDate).toLocaleDateString()}</td><td>{e.guestsCount}</td>
                            <td><span className={`status-pill ${e.status.toLowerCase()}`}>{e.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
