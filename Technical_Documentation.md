# Garden View Resort — Technical Documentation

This document provides a technical overview of the Garden View Resort website for the purpose of developer handover.

## 1. Technology Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS, Lucide React (Icons)
- **State/Routing**: React Router DOM
- **Deployment**: Configured for local Port 5173 (Vite)

### Backend
- **Framework**: Spring Boot (Java 17)
- **Database**: H2 (In-memory for Dev), MySQL (Production ready)
- **Security**: Spring Security + JWT (JSON Web Tokens)
- **Infrastructure**: Maven

## 2. Key API Endpoints

### Public Access
- `GET /api/menu`: Fetch all restaurant menu items.
- `GET /api/rooms`: Fetch room details and availability.
- `POST /api/inquiries`: Submit contact/event inquiries.

### Admin Access (Requires JWT)
- `POST /api/auth/login`: Administrative login.
- `PUT /api/rooms/admin/{id}`: Update room pricing/info.
- `POST /api/menu/admin`: Manage restaurant menu items.

## 3. SEO & Connectivity
- **Sitemap**: Located at `/public/sitemap.xml`.
- **Search Console**: Google and Bing Webmaster Tools connected.
- **Favicon**: Official logo integrated via `/public/logo.png`.

## 4. Handover Checklist
- [ ] Database Migration to Production MySQL.
- [ ] Configuration of SMTP credentials for email inquiries.
- [ ] Updating site URLs in `application.properties` and `index.html`.
- [ ] Issuance of NOC by Arjun Rajawat.

---
**Prepared for:** Arjun Rajawat
**Date:** March 13, 2026
