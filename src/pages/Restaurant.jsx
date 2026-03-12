import React, { useState, useEffect, useRef } from 'react';
import { Info, UtensilsCrossed, Users2, PartyPopper, Loader, ChevronRight } from 'lucide-react';
import { IMAGES } from '../constants/images';
import './Common.css';
import './Restaurant.css';

const Restaurant = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('');
    const sectionRefs = useRef({});

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/menu');
                const data = await response.json();
                setMenuItems(data);
                if (data.length > 0) {
                    const firstCat = data[0].category || 'General';
                    setActiveCategory(firstCat);
                }
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const categorizedMenu = menuItems.reduce((acc, item) => {
        const category = item.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    const scrollToSection = (category) => {
        setActiveCategory(category);
        const element = sectionRefs.current[category];
        if (element) {
            const offset = 100; // Account for sticky header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="page-container restaurant-page">
            <section className="page-header">
                <div className="container">
                    <h1>The Garden Diner</h1>
                    <p>Exquisite multi-cuisine dining experience in a peaceful garden setting.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="restaurant-intro">
                        <div className="intro-image-wrapper">
                            <img
                                src={IMAGES.restaurant.interior}
                                alt="Restaurant Interior"
                                className="intro-image"
                            />
                        </div>
                        <div className="intro-content">
                            <h2>Fresh Flavors, Quiet Moments</h2>
                            <p>
                                At Garden View Resort, we believe dining is an experience. Our chefs use the finest 
                                local ingredients to craft dishes that celebrate the rich culinary heritage of Bundelkhand 
                                alongside global favorites.
                            </p>
                            <div className="intro-stats">
                                <div className="stat-item">
                                    <UtensilsCrossed size={20} />
                                    <span>Multi-Cuisine</span>
                                </div>
                                <div className="stat-item">
                                    <Users2 size={20} />
                                    <span>Family Friendly</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loader-container">
                            <Loader className="spin" size={40} color="var(--primary)" />
                            <p>Loading our delicious menu...</p>
                        </div>
                    ) : (
                        <div className="menu-container">
                            <nav className="category-nav">
                                <div className="category-nav-inner">
                                    {Object.keys(categorizedMenu).map((category) => (
                                        <button
                                            key={category}
                                            className={`nav-btn ${activeCategory === category ? 'active' : ''}`}
                                            onClick={() => scrollToSection(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </nav>

                            <div className="menu-sections">
                                {Object.entries(categorizedMenu).map(([category, items]) => (
                                    <div 
                                        key={category} 
                                        className="menu-group fade-in"
                                        ref={el => sectionRefs.current[category] = el}
                                    >
                                        <div className="category-title">
                                            <h2>{category}</h2>
                                            <div className="title-accent"></div>
                                        </div>
                                        <div className="menu-grid">
                                            {items.map((item) => (
                                                <div key={item.id} className="menu-card">
                                                    <div className="item-info">
                                                        <h3 className="item-name">{item.name}</h3>
                                                        <p className="item-desc">{item.description}</p>
                                                    </div>
                                                    <div className="item-price">₹{item.price}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="cta-section">
                <div className="container text-center">
                    <PartyPopper size={48} className="cta-icon" />
                    <h2>Plan Your Celebration</h2>
                    <p>
                        From intimate dinners to grand celebrations, our garden restaurant 
                        provides the perfect backdrop for your most precious memories.
                    </p>
                    <button className="btn btn-accent">
                        Inquire for Party Booking
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Restaurant;

