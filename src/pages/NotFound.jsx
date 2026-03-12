import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MoveLeft } from 'lucide-react';
import './Common.css';

const NotFound = () => {
    return (
        <div className="page-container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container text-center" style={{ maxWidth: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                    <Leaf size={80} color="var(--primary)" style={{ opacity: 0.5 }} />
                </div>
                <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: 'var(--primary)' }}>404</h1>
                <h2 style={{ marginBottom: '20px' }}>Oops! Page Not Found</h2>
                <p style={{ marginBottom: '40px', color: '#666', fontSize: '1.1rem' }}>
                    It seems like the page you are looking for has been tucked away in our secret gardens. 
                    Let's get you back on the right path.
                </p>
                <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <MoveLeft size={20} /> Back to Garden View
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
