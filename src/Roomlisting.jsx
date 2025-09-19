import React, { useState } from 'react';
import { Users, DollarSign, MapPin, Star, ChevronRight } from 'lucide-react';
import { rooms } from '../data/rooms';

const RoomListing = ({ onBookRoom }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredRooms = rooms.filter(room => {
    if (filter === 'all') return true;
    return room.type.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <section id="rooms" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Our Premium Venues
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our collection of thoughtfully designed spaces, each offering unique features 
            and amenities to make your event extraordinary.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'Event Hall', 'Meeting Room', 'Outdoor Venue', 'Dining Space'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              {category === 'all' ? 'All Venues' : category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, index) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out both'
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-slate-700">{room.type}</span>
                </div>
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="fill-white" />
                    <span className="text-sm font-medium">5.0</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Users size={18} className="mr-2 text-amber-500" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={18} className="mr-2 text-amber-500" />
                    <span className="font-semibold text-slate-800">{room.price}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-700 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="flex-1 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onBookRoom(room.name)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Room Detail Modal */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-90vh overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-100 transition-all"
                >
                  ×
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">{selectedRoom.name}</h3>
                    <p className="text-xl text-gray-600">{selectedRoom.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-amber-600">{selectedRoom.price}</p>
                    <p className="text-gray-600">{selectedRoom.capacity}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-8 leading-relaxed">{selectedRoom.description}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-4 text-xl">Premium Amenities</h4>
                    <ul className="space-y-2">
                      {selectedRoom.amenities.map((amenity) => (
                        <li key={amenity} className="flex items-center text-gray-700">
                          <ChevronRight size={16} className="mr-2 text-amber-500" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 mb-4 text-xl">Special Features</h4>
                    <ul className="space-y-2">
                      {selectedRoom.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-700">
                          <ChevronRight size={16} className="mr-2 text-amber-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setSelectedRoom(null);
                      onBookRoom(selectedRoom.name);
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Book This Venue
                  </button>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .max-h-90vh {
          max-height: 90vh;
        }
      `}</style>
    </section>
  );
};

export default RoomListing;