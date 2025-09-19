import React from 'react';
import { Star, ArrowDown } from 'lucide-react';

const Hero = ({ onBookNow }) => {
  const scrollToRooms = () => {
    const element = document.getElementById('rooms');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{
        backgroundImage: 'url("/src/images/image1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fadeInUp">
          <div className="flex justify-center items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-white ml-2 text-sm sm:text-lg">5.0 Rating</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Perfect Venue for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Every Occasion
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Experience luxury and elegance in our premium rooms and event spaces. 
            From intimate gatherings to grand celebrations, we make every moment unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <button 
              onClick={onBookNow}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Book Your Event Now
            </button>
            <button 
              onClick={scrollToRooms}
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-slate-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300"
            >
              Explore Rooms
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToRooms} className="text-white hover:text-amber-400 transition-colors">
            <ArrowDown size={32} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;