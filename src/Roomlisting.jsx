import React, { useState } from 'react';
import { Users, DollarSign, MapPin, Star, ChevronRight } from 'lucide-react';
import { rooms } from '../data/rooms';
import ImageTrail from './ImageTrail';

const RoomListing = ({ onBookRoom }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filter, setFilter] = useState('all');
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    name: '',
    email: '',
    comment: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const filteredRooms = rooms.filter(room => {
    if (filter === 'all') return true;
    return room.type.toLowerCase().includes(filter.toLowerCase());
  });

  const handleReviewChange = (field, value) => {
    setReviewForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log('Review submitted:', {
      room: selectedRoom.name,
      ...reviewForm
    });
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
      setReviewForm({
        rating: 5,
        name: '',
        email: '',
        comment: ''
      });
    }, 2000);
  };

  const resetReviewForm = () => {
    setShowReviewForm(false);
    setReviewSubmitted(false);
    setReviewForm({
      rating: 5,
      name: '',
      email: '',
      comment: ''
    });
  };

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
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out both'
              }}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
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

                {/* ImageTrail Animation on Image Hover Only */}
                {hoveredRoom === room.id && (
                  <div 
                    className="absolute inset-0 z-10" 
                    style={{ 
                      pointerEvents: 'auto' // Allow pointer events for ImageTrail on image area only
                    }}
                  >
                    <ImageTrail 
                      items={[
                        room.image,
                        'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=400',
                        'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=400',
                        'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=400',
                        'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=400',
                        'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=400'
                      ]}
                      variant={1}
                    />
                  </div>
                )}
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
                  onClick={() => {
                    setSelectedRoom(null);
                    resetReviewForm();
                  }}
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
                      resetReviewForm();
                      onBookRoom(selectedRoom.name);
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Book This Venue
                  </button>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Write Review
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRoom(null);
                      resetReviewForm();
                    }}
                    className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Form Modal */}
        {showReviewForm && selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-90vh overflow-y-auto">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Write a Review for {selectedRoom.name}
                  </h3>
                  <button
                    onClick={resetReviewForm}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {reviewSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-6xl mb-4">✓</div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      Thank you for your review!
                    </h4>
                    <p className="text-gray-600">
                      Your feedback helps others make better decisions.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    {/* Rating Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating *
                      </label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleReviewChange('rating', star)}
                            className={`text-2xl transition-colors ${
                              star <= reviewForm.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-gray-600">
                          ({reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => handleReviewChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={reviewForm.email}
                        onChange={(e) => handleReviewChange('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Comment Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={reviewForm.comment}
                        onChange={(e) => handleReviewChange('comment', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Share your experience with this venue..."
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                      >
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={resetReviewForm}
                        className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
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