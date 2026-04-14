-- ================================================
-- Garden View Resort - MySQL Database Setup Script
-- Run this once before starting the application
-- ================================================

CREATE DATABASE IF NOT EXISTS gardenview_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gardenview_db;

-- Create a dedicated MySQL user (change password before using in production!)
-- CREATE USER IF NOT EXISTS 'gardenview_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
-- GRANT ALL PRIVILEGES ON gardenview_db.* TO 'gardenview_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Tables are auto-created by Spring Boot (ddl-auto=update)
-- This script just ensures the database exists

SELECT 'Garden View Resort database is ready!' AS message;
