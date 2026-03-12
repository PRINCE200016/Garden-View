import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Restaurant from './pages/Restaurant';
import Events from './pages/Events';
import Amenities from './pages/Amenities';
import Contact from './pages/Contact';
import BookingSystem from './pages/BookingSystem';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Gallery from './pages/Gallery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="app">
                <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />

                    {/* Public Routes with Navbar/Footer */}
                    <Route path="*" element={
                        <>
                            <Navbar />
                            <main>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/rooms" element={<Rooms />} />
                                    <Route path="/restaurant" element={<Restaurant />} />
                                    <Route path="/events" element={<Events />} />
                                    <Route path="/amenities" element={<Amenities />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/gallery" element={<Gallery />} />
                                    <Route path="/booking" element={<BookingSystem />} />
                                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                    <Route path="/terms-of-service" element={<TermsOfService />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                            <Footer />
                            
                            <CookieBanner />
                            
                            {/* Global Floating WhatsApp */}
                            <a 
                                href="https://wa.me/917460005296" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="floating-wa"
                                title="Chat with us on WhatsApp"
                            >
                                <MessageCircle size={32} />
                            </a>
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
