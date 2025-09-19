import React, { useState } from 'react';
import { X, Calendar, Users, Clock, MapPin, Mail, Phone, User } from 'lucide-react';

const BookingForm = ({ selectedRoom, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    guestCount: '',
    room: selectedRoom,
    requirements: '',
    catering: false,
    audioVisual: false,
    parking: false,
    decorations: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.eventType.trim()) newErrors.eventType = 'Event type is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.guestCount) newErrors.guestCount = 'Guest count is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Booking request submitted successfully! We will contact you within 24 hours to confirm your reservation.');
      onClose();
    } catch (error) {
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-95vh overflow-y-auto">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-3xl font-bold mb-2">Book Your Event</h2>
          <p className="text-amber-100">Fill out the form below and we'll get back to you within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company/Organization
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="Company name (optional)"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.eventType ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
              >
                <option value="">Select event type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="conference">Conference/Meeting</option>
                <option value="birthday">Birthday Party</option>
                <option value="anniversary">Anniversary</option>
                <option value="gala">Gala/Fundraiser</option>
                <option value="other">Other</option>
              </select>
              {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Preferred Room
              </label>
              <select
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              >
                <option value="">Select a room</option>
                <option value="Grand Ballroom">Grand Ballroom</option>
                <option value="Executive Boardroom">Executive Boardroom</option>
                <option value="Garden Pavilion">Garden Pavilion</option>
                <option value="Private Dining Room">Private Dining Room</option>
                <option value="Rooftop Terrace">Rooftop Terrace</option>
                <option value="Conference Center">Conference Center</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Event Date *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.eventDate ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
              />
              {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-1" />
                Start Time *
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.startTime ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
              />
              {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time *
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.endTime ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
              />
              {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users size={16} className="inline mr-1" />
              Expected Number of Guests *
            </label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.guestCount ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
              placeholder="Number of guests"
            />
            {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}
          </div>

          {/* Additional Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Additional Services
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'catering', label: 'Catering Services' },
                { name: 'audioVisual', label: 'Audio/Visual Equipment' },
                { name: 'parking', label: 'Valet Parking' },
                { name: 'decorations', label: 'Event Decorations' }
              ].map(service => (
                <label key={service.name} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={service.name}
                    checked={formData[service.name]}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{service.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requirements or Notes
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
              placeholder="Please share any specific requirements, dietary restrictions, or special requests for your event..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .max-h-95vh {
          max-height: 95vh;
        }
      `}</style>
    </div>
  );
};

export default BookingForm;