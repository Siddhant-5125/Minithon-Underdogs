import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      url: 'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Grand Ballroom - Wedding Setup',
      description: 'Elegant wedding reception with crystal chandeliers'
    },
    {
      url: 'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Executive Boardroom',
      description: 'Professional meeting space with modern amenities'
    },
    {
      url: 'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Garden Pavilion',
      description: 'Outdoor ceremony with beautiful garden backdrop'
    },
    {
      url: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Private Dining Experience',
      description: 'Intimate dining with chef-curated menu'
    },
    {
      url: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Conference Center',
      description: 'State-of-the-art conference facilities'
    },
    {
      url: 'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Rooftop Terrace',
      description: 'Stunning city views from our rooftop venue'
    },
    {
      url: 'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Corporate Event Setup',
      description: 'Professional networking event arrangement'
    },
    {
      url: 'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Gala Dinner Arrangement',
      description: 'Sophisticated gala dinner with premium table settings'
    }
  ];

  const openLightbox = (index) => {
    setSelectedImage(index);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Event Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our stunning venues through a curated collection of memorable events 
            and celebrations we've hosted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(index)}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInScale 0.6s ease-out both'
              }}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                    <Eye size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 z-10 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 z-10 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
              >
                <ChevronRight size={24} />
              </button>

              {/* Main image */}
              <div className="relative max-w-4xl max-h-full">
                <img
                  src={galleryImages[currentIndex].url}
                  alt={galleryImages[currentIndex].title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                
                {/* Image info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white rounded-b-lg">
                  <h3 className="text-2xl font-bold mb-2">{galleryImages[currentIndex].title}</h3>
                  <p className="text-gray-200">{galleryImages[currentIndex].description}</p>
                </div>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;