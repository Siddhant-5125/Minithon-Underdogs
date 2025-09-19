import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';

const Header = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-slate-800 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>123 Venue Street, City Center</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone size={14} />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <span>info@grandvenue.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GV</span>
              </div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-slate-800' : 'text-white'
              }`}>
                निवास
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`font-medium transition-colors hover:text-amber-500 ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('rooms')}
                className={`font-medium transition-colors hover:text-amber-500 ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                Rooms
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className={`font-medium transition-colors hover:text-amber-500 ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('maps')}
                className={`font-medium transition-colors hover:text-amber-500 ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                Maps
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className={`font-medium transition-colors hover:text-amber-500 ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                Reviews
              </button>
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Book Now
              </button>
              {onLogout && (
                <button 
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                  Logout
                </button>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-slate-700' : 'text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg animate-fadeInDown">
            <nav className="container mx-auto px-4 py-4 space-y-1">
              <button 
                onClick={() => {
                  scrollToSection('home');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-2 text-slate-700 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all duration-200 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  scrollToSection('rooms');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-2 text-slate-700 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all duration-200 font-medium"
              >
                Rooms
              </button>
              <button 
                onClick={() => {
                  scrollToSection('gallery');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-2 text-slate-700 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all duration-200 font-medium"
              >
                Gallery
              </button>
              <button 
                onClick={() => {
                  scrollToSection('maps');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-2 text-slate-700 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all duration-200 font-medium"
              >
                Maps
              </button>
              <button 
                onClick={() => {
                  scrollToSection('testimonials');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-2 text-slate-700 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all duration-200 font-medium"
              >
                Reviews
              </button>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition-colors mt-3"
              >
                Book Now
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;