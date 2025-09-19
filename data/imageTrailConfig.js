// ImageTrail Configuration for Different Room Types and Specific Dormitories
export const imageTrailConfig = {
  // By Room Type (fallback)
  "Event Hall": [
    "/images/imagetrail/hotel-dormitory/image1.jpeg",
    "/images/imagetrail/hotel-dormitory/image2.jpeg", 
    "/images/imagetrail/hotel-dormitory/image3.jpeg",
    "/images/imagetrail/hotel-dormitory/image4.jpeg",
    "/images/imagetrail/hotel-dormitory/image1.jpeg",
    "/images/imagetrail/hotel-dormitory/image2.jpeg"
  ],
  "Meeting Room": [
    "/images/imagetrail/executive-boardroom/image1.jpeg",
    "/images/imagetrail/executive-boardroom/image2.jpeg",
    "/images/imagetrail/executive-boardroom/image3.jpeg", 
    "/images/imagetrail/executive-boardroom/image1.jpeg",
    "/images/imagetrail/executive-boardroom/image2.jpeg",
    "/images/imagetrail/executive-boardroom/image3.jpeg"
  ],
  "Outdoor Venue": [
    "/images/imagetrail/railway-dormitory/image1.jpeg",
    "/images/imagetrail/railway-dormitory/image2.jpeg",
    "/images/imagetrail/railway-dormitory/image1.jpeg",
    "/images/imagetrail/railway-dormitory/image2.jpeg", 
    "/images/imagetrail/railway-dormitory/image1.jpeg",
    "/images/imagetrail/railway-dormitory/image2.jpeg"
  ],
  "Dining Space": [
    "/images/imagetrail/private-dining-room/restaurant1.jpg",
    "/images/imagetrail/private-dining-room/restaurant2.jpg",
    "/images/imagetrail/private-dining-room/restaurant3.jpg",
    "/images/imagetrail/private-dining-room/restaurant4.jpg",
    "/images/imagetrail/private-dining-room/restaurant5.jpg", 
    "/images/imagetrail/private-dining-room/restaurant6.jpg"
  ],
  
  // By Specific Dormitory Name
  "Hotel Dormitory": [
    "/images/imagetrail/hotel-dormitory/image1.jpeg",
    "/images/imagetrail/hotel-dormitory/image2.jpeg", 
    "/images/imagetrail/hotel-dormitory/image3.jpeg",
    "/images/imagetrail/hotel-dormitory/image4.jpeg",
    "/images/imagetrail/hotel-dormitory/image1.jpeg",
    "/images/imagetrail/hotel-dormitory/image2.jpeg"
  ],
  "Executive Boardroom": [
    "/images/imagetrail/executive-boardroom/image1.jpeg",
    "/images/imagetrail/executive-boardroom/image2.jpeg",
    "/images/imagetrail/executive-boardroom/image3.jpeg", 
    "/images/imagetrail/executive-boardroom/image1.jpeg",
    "/images/imagetrail/executive-boardroom/image2.jpeg",
    "/images/imagetrail/executive-boardroom/image3.jpeg"
  ],
  "Railway Dormitory": [
    "/images/imagetrail/railway-dormitory/image1.jpeg",
    "/images/imagetrail/railway-dormitory/image2.jpeg",
    "/images/imagetrail/railway-dormitory/image1.jpeg",
    "/images/imagetrail/railway-dormitory/image2.jpeg", 
    "/images/imagetrail/railway-dormitory/image1.jpeg",
    "/images/imagetrail/railway-dormitory/image2.jpeg"
  ],
  "Private Dining Room": [
    "/images/imagetrail/private-dining-room/dining1.jpg",
    "/images/imagetrail/private-dining-room/dining2.jpg",
    "/images/imagetrail/private-dining-room/dining3.jpg",
    "/images/imagetrail/private-dining-room/dining4.jpg",
    "/images/imagetrail/private-dining-room/dining5.jpg", 
    "/images/imagetrail/private-dining-room/dining6.jpg"
  ],
  "Andheri Dormitory": [
    "/images/imagetrail/andheri-dormitory/image1.jpeg",
    "/images/imagetrail/andheri-dormitory/image2.jpeg",
    "/images/imagetrail/andheri-dormitory/image3.jpeg", 
    "/images/imagetrail/andheri-dormitory/image1.jpeg",
    "/images/imagetrail/andheri-dormitory/image2.jpeg",
    "/images/imagetrail/andheri-dormitory/image3.jpeg"
  ],
  "Rooftop Terrace": [
    "/images/imagetrail/rooftop-terrace/image1.jpeg",
    "/images/imagetrail/rooftop-terrace/image2.jpeg",
    "/images/imagetrail/rooftop-terrace/image1.jpeg",
    "/images/imagetrail/rooftop-terrace/image2.jpeg", 
    "/images/imagetrail/rooftop-terrace/image1.jpeg",
    "/images/imagetrail/rooftop-terrace/image2.jpeg"
  ]
};

// Helper function to get images for a specific room name or type
export const getImageTrailImages = (roomName, roomType = null) => {
  // First check if there's a specific configuration for the room name
  if (imageTrailConfig[roomName]) {
    return imageTrailConfig[roomName];
  }
  
  // Fallback to room type if no specific room name found
  if (roomType && imageTrailConfig[roomType]) {
    return imageTrailConfig[roomType];
  }
  
  // Final fallback to Event Hall
  return imageTrailConfig["Event Hall"];
};