import React, { useState } from "react";
import Header from './Header'
import Hero from './Hero'
import RoomListing from './Roomlisting'
import MapComponentFixed from './MapComponentFixed'
import Gallery from './Gallery'
import Testimonials from './Testimonials'
import Footer from './Footer'
import BookingForm from './BookingForm'
import DormitoryLanding from './Dormitory'
// import ImageTrail from './ImageTrail' // Keep for later use


function App() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowBookingForm(false);
    setSelectedRoom('');
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <DormitoryLanding onLogin={handleLogin} />;
  }

  // Show main application if logged in
  return (
    <div className="App">
      <Header onLogout={handleLogout} />
      <Hero onBookNow={handleBookNow} />
      <RoomListing onBookRoom={handleBookRoom} />
      <MapComponentFixed />
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
