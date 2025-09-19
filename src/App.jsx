import React, { useState } from "react";
import Header from './Header'
import Hero from './Hero'
import RoomListing from './Roomlisting'
import Gallery from './Gallery'
import Testimonials from './Testimonials'
import Footer from './Footer'
import BookingForm from './BookingForm'
// import ImageTrail from './ImageTrail' // Keep for later use


function App() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleBookNow = () => {
    setShowBookingForm(true);
    setSelectedRoom('Grand Ballroom'); // Default room or you can customize
  };

  const handleBookRoom = (roomName) => {
    setSelectedRoom(roomName);
    setShowBookingForm(true);
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
    setSelectedRoom('');
  };

  return (
    <div className="App">
      <Header />
      <Hero onBookNow={handleBookNow} />
      <RoomListing onBookRoom={handleBookRoom} />
      <Gallery />
      <Testimonials />
      <Footer />
      
      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm 
          selectedRoom={selectedRoom}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
}

export default App;
