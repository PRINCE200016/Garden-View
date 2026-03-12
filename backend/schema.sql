-- Garden View Resort - Database Schema

CREATE DATABASE IF NOT EXISTS gardenview_db;
USE gardenview_db;

-- Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255),
    role VARCHAR(20),
    created_at DATETIME
);

-- Rooms Table
CREATE TABLE rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_type VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DOUBLE NOT NULL,
    weekend_price DOUBLE,
    total_rooms INT,
    created_at DATETIME
);

-- Bookings Table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INT,
    nights INT,
    subtotal DOUBLE,
    gst_amount DOUBLE,
    total_amount DOUBLE,
    status VARCHAR(20),
    payment_status VARCHAR(20),
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Events Table
CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    event_type VARCHAR(50),
    event_date DATETIME NOT NULL,
    guests_count INT,
    message TEXT,
    status VARCHAR(20),
    created_at DATETIME
);

-- Seed Initial Data
INSERT INTO rooms (room_type, description, base_price, weekend_price, total_rooms, created_at)
VALUES ('Deluxe Garden View Room', 'Elegant AC rooms with nature view', 2499.0, 2499.0, 10, NOW());

INSERT INTO rooms (room_type, description, base_price, weekend_price, total_rooms, created_at)
VALUES ('Executive Suite', 'Premium suite with luxury amenities', 3199.0, 3199.0, 5, NOW());
