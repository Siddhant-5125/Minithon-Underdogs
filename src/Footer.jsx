import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GV</span>
              </div>
              <h3 className="text-2xl font-bold">Grand Venue</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating unforgettable experiences in our premium event spaces. 
              From intimate gatherings to grand celebrations, we make every moment special.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 hover:bg-amber-500 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-slate-800 hover:bg-amber-500 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-slate-800 hover:bg-amber-500 p-2 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-slate-800 hover:bg-amber-500 p-2 rounded-full transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('rooms')}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Our Venues
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Event Planning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Catering Services
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">Wedding Receptions</li>
              <li className="text-gray-300">Corporate Events</li>
              <li className="text-gray-300">Conference Facilities</li>
              <li className="text-gray-300">Private Dining</li>
              <li className="text-gray-300">Outdoor Ceremonies</li>
              <li className="text-gray-300">Gala Dinners</li>
              <li className="text-gray-300">Product Launches</li>
              <li className="text-gray-300">Team Building Events</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Venue Street</p>
                  <p className="text-gray-300">City Center, State 12345</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">24/7 Support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">info@grandvenue.com</p>
                  <p className="text-gray-400 text-sm">bookings@grandvenue.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Monday - Friday: 9AM - 8PM</p>
                  <p className="text-gray-300">Saturday - Sunday: 10AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Grand Venue. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Premium Event Spaces</span>
              <span>•</span>
              <span>Professional Service</span>
              <span>•</span>
              <span>Unforgettable Moments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;