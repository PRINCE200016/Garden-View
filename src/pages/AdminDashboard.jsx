import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, CalendarCheck, MessageSquare, TrendingUp,
    CheckCircle, XCircle, Utensils, Bed, Save, Plus, Trash2, Loader2
} from 'lucide-react';
import { API, ADMIN_API } from '../config/api';
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
const getAuthHeader = () => ({ 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`, 'Content-Type': 'application/json' });

// --- Tab Components ---

const OverviewTab = () => {
    const [stats, setStats] = useState({ revenue: 0, bookings: 0, inquiries: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app, these would be separate calls or one aggregate
                const revRes = await fetch(`${ADMIN_API}/revenue/monthly`, { headers: getAuthHeader() });
                const revData = await revRes.json();

                const bookRes = await fetch(`${ADMIN_API}/bookings`, { headers: getAuthHeader() });
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
            const res = await fetch(`${ADMIN_API}/bookings`, { headers: getAuthHeader() });
            const data = await res.json();
            setBookings(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { fetchBookings(); }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`${ADMIN_API}/bookings/${id}/${status}`, { method: 'PUT', headers: getAuthHeader() });
            if (res.ok) fetchBookings();
            else alert('Failed to update status');
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="data-section">
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Guest Info</th>
                            <th>Stay Details</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b.id}>
                                <td>#{b.id}</td>
                                <td>
                                    <div className="guest-info">
                                        <strong>{b.userName}</strong>
                                        <span>{b.userEmail}</span>
                                        <span>{b.userPhone}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="stay-info">
                                        <strong>{b.roomType}</strong>
                                        <span>{b.checkIn} to {b.checkOut}</span>
                                        <small>{b.nights} nights</small>
                                    </div>
                                </td>
                                <td>₹{b.totalAmount.toLocaleString()}</td>
                                <td><span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span></td>
                                <td>
                                    <div className="action-btns">
                                        {b.status === 'PENDING' && (
                                            <>
                                                <button className="confirm-btn" onClick={() => updateStatus(b.id, 'confirm')}>Confirm</button>
                                                <button className="cancel-link" onClick={() => updateStatus(b.id, 'cancel')}>Cancel</button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
    const [editingItem, setEditingItem] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', category: 'Starters', price: '', description: '', available: true });

    const categories = ['Starters', 'Main Course', 'Desserts', 'Drinks', 'Tandoor', 'Mutton', 'Eggs', 'Sizzler', 'Chicken', 'Veggies', 'Rice/Roti', 'Salads'];

    const fetchMenu = async () => {
        try {
            const res = await fetch(`${API_BASE}/menu`, { headers: getAuthHeader() });
            const data = await res.json();
            setMenu(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { fetchMenu(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingItem ? `${API_BASE}/menu/admin/${editingItem.id}` : `${API_BASE}/menu/admin`;
        const method = editingItem ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: getAuthHeader(),
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setShowForm(false);
                setEditingItem(null);
                setFormData({ name: '', category: 'Starters', price: '', description: '', available: true });
                fetchMenu();
            } else {
                alert('Action failed');
            }
        } catch (err) { console.error(err); }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ ...item });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const res = await fetch(`${API_BASE}/menu/admin/${id}`, { method: 'DELETE', headers: getAuthHeader() });
            if (res.ok) fetchMenu();
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="data-section">
            <div className="section-header">
                <h2>Restaurant Menu</h2>
                <button className="add-btn" onClick={() => { setShowForm(!showForm); if(!showForm) setEditingItem(null); }}>
                    <Plus size={18} /> {showForm ? 'Close Form' : 'Add New Item'}
                </button>
            </div>

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h3>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Item Name</label>
                            <input type="text" placeholder="e.g. Butter Chicken" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Price (₹)</label>
                            <input type="number" placeholder="250" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Availability</label>
                            <select value={formData.available} onChange={e => setFormData({ ...formData, available: e.target.value === 'true' })}>
                                <option value="true">In Stock</option>
                                <option value="false">Out of Stock</option>
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label>Description</label>
                            <textarea placeholder="Brief description of the item..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="save-btn">{editingItem ? 'Update Item' : 'Create Item'}</button>
                            {editingItem && <button type="button" className="cancel-btn" onClick={() => { setShowForm(false); setEditingItem(null); }}>Cancel</button>}
                        </div>
                    </div>
                </form>
            )}

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map(m => (
                            <tr key={m.id}>
                                <td>{m.name}</td>
                                <td><span className="category-tag">{m.category}</span></td>
                                <td>₹{m.price}</td>
                                <td>
                                    <span className={`status-pill ${m.available ? 'confirmed' : 'cancelled'}`}>
                                        {m.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-btns">
                                        <button className="edit-link" onClick={() => handleEdit(m)}>Edit</button>
                                        <button className="delete-link" onClick={() => handleDelete(m.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const EventsTab = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${ADMIN_API}/events`, { headers: getAuthHeader() });
            const data = await res.json();
            setEvents(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { fetchEvents(); }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`${ADMIN_API}/events/${id}/${status}`, { method: 'PUT', headers: getAuthHeader() });
            if (res.ok) fetchEvents();
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="data-section">
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name/Type</th>
                            <th>Contact</th>
                            <th>Date</th>
                            <th>Guests</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(e => (
                            <tr key={e.id}>
                                <td>
                                    <div className="event-info">
                                        <strong>{e.name}</strong>
                                        <span className="type-tag">{e.eventType}</span>
                                    </div>
                                </td>
                                <td>{e.phone}</td>
                                <td>{new Date(e.eventDate).toLocaleDateString()}</td>
                                <td>{e.guestsCount}</td>
                                <td><span className={`status-pill ${e.status.toLowerCase()}`}>{e.status}</span></td>
                                <td>
                                    <div className="action-btns">
                                        {e.status === 'PENDING' && (
                                            <button className="confirm-btn" onClick={() => updateStatus(e.id, 'reviewed')}>Mark Reviewed</button>
                                        )}
                                        {e.status === 'REVIEWED' && (
                                            <button className="confirm-btn" onClick={() => updateStatus(e.id, 'confirmed')}>Confirm</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
