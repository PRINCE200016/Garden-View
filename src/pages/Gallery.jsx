import React, { useState } from 'react';
import { X, Search, Filter } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState('All');

    const galleryImages = [
        {
            id: 1,
            url: '/images/hero-banner.jpg',
            category: 'Exterior',
            title: 'Resort Entrance'
        },
        {
            id: 2,
            url: '/images/event-night.jpg',
            category: 'Exterior',
            title: 'Garden at Night'
        },
        {
            id: 3,
            url: '/images/room-orange.jpg',
            category: 'Rooms',
            title: 'Deluxe AC Room (Orange)'
        },
        {
            id: 4,
            url: '/images/room-red-brick.jpg',
            category: 'Rooms',
            title: 'Executive Room (Brick)'
        },
        {
            id: 5,
            url: '/images/room-blue-hallway.jpg',
            category: 'Rooms',
            title: 'Superior Room (Blue)'
        },
        {
            id: 6,
            url: '/images/room-green-light.jpg',
            category: 'Rooms',
            title: 'Premium Room (Green)'
        },
        {
            id: 7,
            url: '/images/restaurant-interior.jpg',
            category: 'Dining',
            title: 'Multi-cuisine Restaurant'
        },
        {
            id: 8,
            url: '/images/event-dining.jpg',
            category: 'Dining',
            title: 'Outdoor Dining'
        },
        {
            id: 9,
            url: '/images/garden-view.jpg',
            category: 'Amenities',
            title: 'Lush Green Lawn'
        },
        {
            id: 10,
            url: '/images/event-bonfire.jpg',
            category: 'Amenities',
            title: 'Evening Bonfire'
        }
    ];


    const categories = ['All', 'Exterior', 'Rooms', 'Dining', 'Amenities'];


    const filteredImages = activeTab === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === activeTab);

    return (
        <div className="gallery-page">
            <header className="gallery-header">
                <div className="container">
                    <h1>Resort Gallery</h1>
                    <p>Immerse yourself in the tranquility and luxury of Garden View Resort</p>
                </div>
            </header>

            <div className="container gallery-content">
                <div className="gallery-filters">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            className={`filter-btn ${activeTab === cat ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="gallery-grid">
                    {filteredImages.map(image => (
                        <div 
                            key={image.id} 
                            className="gallery-item"
                            onClick={() => setSelectedImage(image)}
                        >
                            <img src={image.url} alt={image.title} loading="lazy" />
                            <div className="gallery-overlay">
                                <span className="category-tag">{image.category}</span>
                                <h3>{image.title}</h3>
                                <Search className="zoom-icon" size={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <button className="close-btn" onClick={() => setSelectedImage(null)}>
                        <X size={32} />
                    </button>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage.url} alt={selectedImage.title} />
                        <div className="lightbox-caption">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
