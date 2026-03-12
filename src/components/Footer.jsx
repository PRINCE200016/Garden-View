import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Leaf } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="logo footer-logo">
                        <Leaf className="logo-icon" />
                        <span>Garden View</span>
                    </Link>
                    <p className="footer-desc">
                        Experience peace and tranquility at Garden View Resort. Surrounded by lush greenery, we offer comfortable stays and exquisite dining.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link"><Facebook size={20} /></a>
                        <a href="#" className="social-link"><Instagram size={20} /></a>
                        <a href="#" className="social-link"><Twitter size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/rooms">Rooms & Rates</Link></li>
                        <li><Link to="/restaurant">Restaurant</Link></li>
                        <li><Link to="/events">Events & Weddings</Link></li>
                        <li><Link to="/amenities">Amenities</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/booking">Book a Stay</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service">Terms of Service</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <ul className="contact-info">
                        <li>
                            <MapPin size={20} className="icon" />
                            <span>Near Khajuraho Railway Station, Tikuri , Khajuraho,Madhya Pradesh, India</span>
                        </li>
                        <li>
                            <Phone size={20} className="icon" />
                            <span>+91 7460005296</span>
                        </li>
                        <li>
                            <Mail size={20} className="icon" />
                            <span>gardenviewresort2026@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Garden View Resort. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
