// src/MapComponent.js
import React, { useRef, useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

function MapComponent() {
  console.log('🚀 MapComponent function called!');
  
  // Create refs for the map container
  const mapRef = useRef(null);
  const [selectedDormitory, setSelectedDormitory] = useState(0);
  const [showHotels, setShowHotels] = useState(false);
  const [showLibraries, setShowLibraries] = useState(false);
  const [showTransport, setShowTransport] = useState(false);
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [markersOnMap, setMarkersOnMap] = useState([]);
  const [mapReady, setMapReady] = useState(false);
  const mapReadyRef = useRef(false);

  
  // Libraries needed for Google Maps API
  const libraries = ['places'];
  
  // Use Google Maps API loader
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });
  
  // Multiple dormitory locations around Mumbai
  const DORMITORY_OPTIONS = [
    {
      lat: 19.1334, lng: 72.9133,
      name: "IIT Bombay Student Hostel",
      address: "Powai, Mumbai, Maharashtra 400076",
      description: "Modern student accommodation near IIT Bombay with excellent connectivity",
      amenities: ["WiFi", "Laundry", "Mess Hall", "Study Rooms", "Gym", "24/7 Security", "Medical Center"],
      contact: "+91 98765 43210",
      checkin: "2:00 PM - 11:00 PM",
      facilities: { parking: true, wheelchairAccess: true, elevator: true, cafeteria: true },
      reviewsLink: "https://example.com/reviews/iit-bombay-hostel"
    },
    {
      lat: 19.0759, lng: 72.8777,
      name: "Mumbai University Hostel",
      address: "Fort, Mumbai, Maharashtra 400032",
      description: "Heritage building converted to modern student accommodation",
      amenities: ["WiFi", "Laundry", "Library", "Common Room", "Canteen", "Security"],
      contact: "+91 98765 43211",
      checkin: "1:00 PM - 10:00 PM",
      facilities: { parking: false, wheelchairAccess: true, elevator: false, cafeteria: true },
      reviewsLink: "https://example.com/reviews/mumbai-university-hostel"
    },
    {
      lat: 19.1136, lng: 72.8697,
      name: "Andheri Student Accommodation",
      address: "Andheri West, Mumbai, Maharashtra 400058",
      description: "Budget-friendly accommodation with metro connectivity",
      amenities: ["WiFi", "Laundry", "Kitchen", "Study Area", "Security"],
      contact: "+91 98765 43212",
      checkin: "3:00 PM - 9:00 PM",
      facilities: { parking: true, wheelchairAccess: false, elevator: true, cafeteria: false },
      reviewsLink: "https://example.com/reviews/andheri-student-accommodation"
    },
    {
      lat: 19.0330, lng: 72.8697,
      name: "Bandra Student Residency",
      address: "Bandra West, Mumbai, Maharashtra 400050",
      description: "Premium accommodation near Bandra-Kurla Complex",
      amenities: ["WiFi", "Laundry", "Gym", "Rooftop Garden", "Cafeteria", "24/7 Security"],
      contact: "+91 98765 43213",
      checkin: "2:00 PM - 11:00 PM",
      facilities: { parking: true, wheelchairAccess: true, elevator: true, cafeteria: true },
      reviewsLink: "https://example.com/reviews/bandra-student-residency"
    }
  ];

  // Get current dormitory
  const DORMITORY_LOCATION = DORMITORY_OPTIONS[selectedDormitory];

  // Function to clear all amenity markers
  const clearAmenityMarkers = () => {
    markersOnMap.forEach(marker => marker.setMap(null));
    setMarkersOnMap([]);
  };

  // Function to fetch real places using Google Places API (Modern)
  const fetchRealPlaces = async (placeType, callback) => {
    console.log('🔍 fetchRealPlaces called for:', placeType);
    console.log('🗺️ Map instance exists:', !!mapInstance);
    console.log('🚦 Map ready:', mapReady);
    
    if (!mapInstance || !mapReady) {
      console.log('❌ Map not ready yet, waiting...');
      // Wait a bit and retry
      setTimeout(() => {
        if (mapInstance && mapReady) {
          console.log('🔄 Retrying fetchRealPlaces...');
          fetchRealPlaces(placeType, callback);
        } else {
          console.log('❌ Map still not ready after timeout');
          callback([]);
        }
      }, 2000);
      return;
    }

    try {
      console.log('🔍 Starting place search for:', placeType);
      
      // Use modern Google Maps API structure
      const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places');
      const { spherical } = await google.maps.importLibrary('geometry');

      // Get map bounds and center like in your working example
      const center = { lat: DORMITORY_LOCATION.lat, lng: DORMITORY_LOCATION.lng };
      console.log('📍 Search center:', center);
      
      const bounds = mapInstance.getBounds();
      if (!bounds) {
        console.log('❌ Map bounds not available yet, retrying...');
        setTimeout(() => fetchRealPlaces(placeType, callback), 1000);
        return;
      }
      
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      
      // Calculate radius from bounds exactly like your working example
      const diameter = spherical.computeDistanceBetween(ne, sw);
      const radius = Math.min((diameter / 2), 50000); // Max 50km radius
      console.log('📏 Search radius:', radius);

      const request = {
        // Required parameters
        fields: ['displayName', 'location', 'formattedAddress', 'googleMapsURI', 'rating', 'userRatingCount', 'regularOpeningHours'],
        locationRestriction: {
          center,
          radius,
        },
        // Optional parameters  
        includedPrimaryTypes: [placeType],
        maxResultCount: 8,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
      };

      console.log('🔍 Modern API request:', request);
      
      // Use the modern Places API exactly like your example
      const { places } = await Place.searchNearby(request);
      
      console.log('✅ Modern API results:', places);
      callback(places || []);
      
    } catch (error) {
      console.error('❌ Places API error:', error);
      console.error('❌ Error stack:', error.stack);
      
      // Fallback to old API if modern one fails
      console.log('🔄 Trying fallback to old API...');
      try {
        const service = new window.google.maps.places.PlacesService(mapInstance);
        const center = { lat: DORMITORY_LOCATION.lat, lng: DORMITORY_LOCATION.lng };
        const request = {
          location: center,
          radius: 25000, // 25km radius
          type: placeType
        };
        
        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log('✅ Fallback API results:', results);
            // Convert old API format to new format
            const convertedPlaces = results.slice(0, 8).map(place => ({
              displayName: place.name,
              location: place.geometry.location,
              formattedAddress: place.vicinity,
              rating: place.rating,
              userRatingCount: place.user_ratings_total,
              googleMapsURI: place.place_id ? `https://maps.google.com/?place_id=${place.place_id}` : null,
              regularOpeningHours: place.opening_hours ? { openNow: place.opening_hours.open_now } : null
            }));
            callback(convertedPlaces);
          } else {
            console.error('❌ Fallback API error:', status);
            callback([]);
          }
        });
      } catch (fallbackError) {
        console.error('❌ Fallback API also failed:', fallbackError);
        callback([]);
      }
    }
  };

  // Function to add markers for a specific amenity type
  const addAmenityMarkers = (places, category, icon, color) => {
    console.log('🎯 Adding markers for:', category, 'Places:', places);
    
    if (!places || places.length === 0) {
      console.log('❌ No places to add markers for');
      return;
    }

    const newMarkers = places.map(place => {
      console.log('🔍 Processing place:', place);
      
      // Handle both old and new API response formats
      let position = null;
      
      // New Places API format
      if (place.location && place.location.lat && place.location.lng) {
        position = { lat: place.location.lat(), lng: place.location.lng() };
      }
      // Alternative new API format
      else if (place.location && typeof place.location.lat === 'number') {
        position = place.location;
      }
      // Old API format fallback
      else if (place.geometry && place.geometry.location) {
        const loc = place.geometry.location;
        position = { lat: loc.lat(), lng: loc.lng() };
      }
        
      console.log('📍 Extracted position:', position);
        
      if (!position || !position.lat || !position.lng) {
        console.log('❌ No valid position for place:', place);
        return null;
      }

      console.log('🎯 Creating marker at position:', position, 'for place:', place.displayName || place.name);
      
      const marker = new window.google.maps.Marker({
        position: position,
        map: mapInstance,
        title: place.displayName || place.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="${color}" stroke="#ffffff" stroke-width="2"/>
              <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="12">${icon}</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });

      console.log('🏷️ Marker created successfully:', marker, 'Map:', marker.getMap(), 'Visible:', marker.getVisible());

      const placeName = place.displayName || place.name || 'Unknown Place';
      const placeAddress = place.formattedAddress || place.vicinity || 'Address not available';
      const placeRating = place.rating || 'N/A';
      const placeReviews = place.userRatingCount || place.user_ratings_total || 0;
      const isOpen = place.regularOpeningHours?.openNow || place.opening_hours?.open_now;

      const infoContent = `
        <div style="max-width: 250px; font-family: Arial, sans-serif;">
          <h4 style="color: ${color}; margin: 0 0 8px 0; font-size: 16px;">
            ${icon} ${placeName}
          </h4>
          <p style="margin: 5px 0; color: #666; font-size: 13px;">
            📍 ${placeAddress}
          </p>
          <p style="margin: 8px 0; color: #444; font-size: 13px;">
            ⭐ Rating: ${placeRating} ${placeReviews ? `(${placeReviews} reviews)` : ''}
          </p>
          <p style="margin: 8px 0; color: #444; font-size: 13px;">
            ${isOpen !== undefined ? 
              (isOpen ? '🟢 Open Now' : '🔴 Closed') : 
              '⏰ Hours unknown'}
          </p>
          <div style="margin-top: 10px;">
            <span style="background: ${color}20; color: ${color}; 
              padding: 3px 8px; border-radius: 12px; font-size: 11px; text-transform: capitalize;">
              Real ${category} via Google Places
            </span>
          </div>
          ${place.googleMapsURI ? `
            <div style="margin-top: 8px;">
              <a href="${place.googleMapsURI}" target="_blank" style="
                background: ${color}; color: white; text-decoration: none; 
                padding: 4px 8px; border-radius: 4px; font-size: 11px;
              ">
                🗺️ View on Google Maps
              </a>
            </div>
          ` : ''}
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
      });

      console.log('✅ Created marker for:', placeName);
      return marker;
    }).filter(marker => marker !== null); // Remove null markers

    setMarkersOnMap(prev => [...prev, ...newMarkers]);
    console.log('✅ Added', newMarkers.length, 'markers to map');
  };

  // Functions to handle amenity toggles
  const toggleHotels = async () => {
    console.log('🏨 toggleHotels called, map ready (state):', mapReady, 'map ready (ref):', mapReadyRef.current);
    
    if (!mapReadyRef.current || !mapInstance) {
      console.log('❌ Map not ready for hotel search');
      return;
    }
    
    if (showHotels) {
      setShowHotels(false);
      clearAmenityMarkers();
    } else {
      clearAmenityMarkers();
      setShowHotels(true);
      setShowLibraries(false);
      setShowTransport(false);
      await fetchRealPlaces('lodging', (hotels) => {
        addAmenityMarkers(hotels, 'hotels', '🏨', '#f59e0b');
      });
    }
  };

  const toggleLibraries = async () => {
    console.log('📚 toggleLibraries called, map ready (state):', mapReady, 'map ready (ref):', mapReadyRef.current);
    
    if (!mapReadyRef.current || !mapInstance) {
      console.log('❌ Map not ready for library search');
      return;
    }
    
    if (showLibraries) {
      setShowLibraries(false);
      clearAmenityMarkers();
    } else {
      clearAmenityMarkers();
      setShowLibraries(true);
      setShowHotels(false);
      setShowTransport(false);
      await fetchRealPlaces('library', (libraries) => {
        addAmenityMarkers(libraries, 'libraries', '📚', '#3b82f6');
      });
    }
  };

  const toggleTransport = async () => {
    console.log('🚌 toggleTransport called, map ready (state):', mapReady, 'map ready (ref):', mapReadyRef.current);
    
    if (!mapReadyRef.current || !mapInstance) {
      console.log('❌ Map not ready for transport search');
      return;
    }
    
    if (showTransport) {
      setShowTransport(false);
      clearAmenityMarkers();
    } else {
      clearAmenityMarkers();
      setShowTransport(true);
      setShowHotels(false);
      setShowLibraries(false);
      setShowLandmarks(false);
      
      // Try transit_station first (covers most transport types)
      console.log('🚌 Searching for transport places...');
      await fetchRealPlaces('transit_station', (transportPlaces) => {
        if (transportPlaces && transportPlaces.length > 0) {
          addAmenityMarkers(transportPlaces, 'transport', '🚇', '#8b5cf6');
        } else {
          // Fallback to bus_station if no transit stations found
          console.log('🚌 No transit stations, trying bus stations...');
          fetchRealPlaces('bus_station', (busStations) => {
            addAmenityMarkers(busStations, 'transport', '🚌', '#8b5cf6');
          });
        }
      });
    }
  };

  const toggleLandmarks = async () => {
    console.log('🏛️ toggleLandmarks called, map ready (state):', mapReady, 'map ready (ref):', mapReadyRef.current);
    
    if (!mapReadyRef.current || !mapInstance) {
      console.log('❌ Map not ready for landmark search');
      return;
    }
    
    if (showLandmarks) {
      setShowLandmarks(false);
      clearAmenityMarkers();
    } else {
      clearAmenityMarkers();
      setShowLandmarks(true);
      setShowHotels(false);
      setShowLibraries(false);
      setShowTransport(false);
      
      // Search for tourist attractions and landmarks
      console.log('🏛️ Searching for landmarks...');
      await fetchRealPlaces('tourist_attraction', (landmarks) => {
        addAmenityMarkers(landmarks, 'landmarks', '🏛️', '#ef4444');
      });
    }
  };

  useEffect(() => {
    console.log('✅ useEffect triggered!');
    console.log('🗺️ Google Maps isLoaded:', isLoaded);
    console.log('🗺️ Google Maps loadError:', loadError);
    
    if (loadError) {
      console.error('❌ Error loading Google Maps:', loadError);
      return;
    }
    
    if (!isLoaded) {
      console.log('⏳ Google Maps still loading...');
      return;
    }
    
    const setupMap = () => {
      console.log('🔨 Setting up map...');
      
      const mapContainer = document.getElementById('google-map');
      if (!mapContainer) {
        console.log('❌ Map container not found, retrying...');
        setTimeout(setupMap, 1000);
        return;
      }

      try {
        console.log('🎯 Creating Google Map...');
        
        // Create a traditional Google Map centered on current dormitory
        const map = new window.google.maps.Map(mapContainer, {
          center: { lat: DORMITORY_LOCATION.lat, lng: DORMITORY_LOCATION.lng },
          zoom: 14, // Good zoom level for Mumbai area
          mapId: 'DEMO_MAP_ID',
          styles: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "on" }]
            }
          ]
        });

        console.log('✅ Google Map created successfully!', map);
        setMapInstance(map);

        // Wait for map to be fully loaded before marking as ready
        map.addListener('tilesloaded', () => {
          console.log('🎯 Map tiles loaded, marking as ready');
          setMapReady(true);
          mapReadyRef.current = true;
        });

        // Also set ready on idle event (fires earlier)
        map.addListener('idle', () => {
          console.log('🎯 Map idle, marking as ready');
          setMapReady(true);
          mapReadyRef.current = true;
        });

        // Also set ready after a shorter delay as backup
        setTimeout(() => {
          console.log('⏰ Setting map ready after timeout');
          setMapReady(true);
          mapReadyRef.current = true;
        }, 1500);

        // Create dormitory marker with custom icon
        const dormitoryMarker = new window.google.maps.Marker({
          position: { lat: DORMITORY_LOCATION.lat, lng: DORMITORY_LOCATION.lng },
          map: map,
          title: DORMITORY_LOCATION.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="22" fill="#2563eb" stroke="#ffffff" stroke-width="4"/>
                <text x="25" y="32" text-anchor="middle" fill="white" font-family="Arial" font-size="24">🏠</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(50, 50),
            anchor: new window.google.maps.Point(25, 25)
          },
          animation: window.google.maps.Animation.DROP
        });

        // Create enhanced info window for dormitory with amenity controls
        const dormitoryInfoContent = `
          <div style="max-width: 350px; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.4;">
            <div style="background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; padding: 15px; margin: -10px -10px 15px -10px; border-radius: 8px 8px 0 0;">
              <h3 style="color: white; margin: 0 0 5px 0; font-size: 18px; font-weight: bold;">
                🏠 ${DORMITORY_LOCATION.name}
              </h3>
              <p style="margin: 0; color: #e0f2fe; font-size: 13px;">
                📍 ${DORMITORY_LOCATION.address}
              </p>
            </div>
            
            <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 14px; line-height: 1.5;">
              ${DORMITORY_LOCATION.description}
            </p>
            
            <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2563eb;">
              <strong style="color: #2563eb; font-size: 14px; display: block; margin-bottom: 8px;">🎯 Available Amenities:</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${DORMITORY_LOCATION.amenities.map(amenity => 
                  `<span style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc); color: #0277bd; padding: 3px 8px; border-radius: 15px; font-size: 11px; font-weight: 500; border: 1px solid #81d4fa;">${amenity}</span>`
                ).join('')}
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
              <div>
                <strong style="color: #2563eb; font-size: 13px;">📞 Contact Info:</strong><br>
                <span style="font-size: 12px; color: #4b5563;">${DORMITORY_LOCATION.contact}</span>
              </div>
              <div>
                <strong style="color: #2563eb; font-size: 13px;">🕐 Check-in Hours:</strong><br>
                <span style="font-size: 12px; color: #4b5563;">${DORMITORY_LOCATION.checkin}</span>
              </div>
            </div>

            <div style="background: ${DORMITORY_LOCATION.facilities.wheelchairAccess ? '#f0fdf4' : '#fef2f2'}; padding: 12px; border-radius: 8px; margin: 15px 0; border-left: 4px solid ${DORMITORY_LOCATION.facilities.wheelchairAccess ? '#22c55e' : '#ef4444'};">
              <strong style="color: ${DORMITORY_LOCATION.facilities.wheelchairAccess ? '#15803d' : '#dc2626'}; font-size: 14px; display: block; margin-bottom: 8px;">♿ Accessibility Features:</strong>
              <div style="font-size: 12px; line-height: 1.6;">
                <div style="margin: 4px 0; display: flex; align-items: center;">
                  <span style="width: 12px; height: 12px; border-radius: 50%; background: ${DORMITORY_LOCATION.facilities.wheelchairAccess ? '#22c55e' : '#ef4444'}; display: inline-block; margin-right: 8px;"></span>
                  <span style="color: ${DORMITORY_LOCATION.facilities.wheelchairAccess ? '#15803d' : '#dc2626'};">Wheelchair Access</span>
                </div>
                <div style="margin: 4px 0; display: flex; align-items: center;">
                  <span style="width: 12px; height: 12px; border-radius: 50%; background: ${DORMITORY_LOCATION.facilities.elevator ? '#22c55e' : '#ef4444'}; display: inline-block; margin-right: 8px;"></span>
                  <span style="color: ${DORMITORY_LOCATION.facilities.elevator ? '#15803d' : '#dc2626'};">Elevator Available</span>
                </div>
                <div style="margin: 4px 0; display: flex; align-items: center;">
                  <span style="width: 12px; height: 12px; border-radius: 50%; background: ${DORMITORY_LOCATION.facilities.parking ? '#22c55e' : '#ef4444'}; display: inline-block; margin-right: 8px;"></span>
                  <span style="color: ${DORMITORY_LOCATION.facilities.parking ? '#15803d' : '#dc2626'};">Parking Available</span>
                </div>
              </div>
            </div>

            <div style="text-align: center; margin: 15px 0;">
              <a href="${DORMITORY_LOCATION.reviewsLink}" target="_blank" style="
                display: inline-block; background: linear-gradient(135deg, #059669, #10b981); color: white; text-decoration: none; 
                padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: all 0.2s ease;
              " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)';" 
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)';">
                📖 Read Reviews & Ratings
              </a>
            </div>

            <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 15px; border-radius: 12px; margin: 20px 0; border: 1px solid #cbd5e1;">
              <strong style="color: #2563eb; font-size: 15px; display: block; margin-bottom: 10px;">🔍 Discover Nearby Places:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
                <button onclick="window.toggleHotels()" style="
                  background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; padding: 8px 12px; 
                  border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;
                  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
                " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(245, 158, 11, 0.4)';" 
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(245, 158, 11, 0.3)';">
                  🏨 Hotels
                </button>
                <button onclick="window.toggleLibraries()" style="
                  background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; padding: 8px 12px; 
                  border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;
                  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
                " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(59, 130, 246, 0.4)';" 
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(59, 130, 246, 0.3)';">
                  📚 Libraries
                </button>
                <button onclick="window.toggleTransport()" style="
                  background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border: none; padding: 8px 12px; 
                  border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;
                  box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3);
                " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(139, 92, 246, 0.4)';" 
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(139, 92, 246, 0.3)';">
                  🚌 Transport
                </button>
                <button onclick="window.toggleLandmarks()" style="
                  background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 8px 12px; 
                  border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;
                  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
                " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(239, 68, 68, 0.4)';" 
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(239, 68, 68, 0.3)';">
                  🏛️ Landmarks
                </button>
              </div>
              <p style="margin: 8px 0 0 0; color: #64748b; font-size: 11px; text-align: center; font-style: italic;">
                ✨ Real-time data from Google Places API
              </p>
            </div>

            <button onclick="window.getDirections()" style="
              background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; padding: 12px 20px; 
              border-radius: 10px; cursor: pointer; width: 100%; font-size: 14px; font-weight: 600;
              box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); transition: all 0.2s ease;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(37, 99, 235, 0.4)';" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(37, 99, 235, 0.3)';">
              🧭 Get Turn-by-Turn Directions
            </button>
          </div>
        `;

        const dormitoryInfoWindow = new window.google.maps.InfoWindow({
          content: dormitoryInfoContent
        });

        // Open dormitory info window immediately to highlight it
        dormitoryInfoWindow.open(map, dormitoryMarker);

        // Add click listener for dormitory marker
        dormitoryMarker.addListener('click', () => {
          dormitoryInfoWindow.open(map, dormitoryMarker);
        });

        // Global functions for amenity toggles
        window.toggleHotels = toggleHotels;
        window.toggleLibraries = toggleLibraries;
        window.toggleTransport = toggleTransport;
        window.toggleLandmarks = toggleLandmarks;

        // Global function for directions
        window.getDirections = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              
              // Create directions service
              const directionsService = new window.google.maps.DirectionsService();
              const directionsRenderer = new window.google.maps.DirectionsRenderer();
              directionsRenderer.setMap(map);

              directionsService.route({
                origin: userLocation,
                destination: { lat: DORMITORY_LOCATION.lat, lng: DORMITORY_LOCATION.lng },
                travelMode: window.google.maps.TravelMode.DRIVING
              }, (result, status) => {
                if (status === 'OK') {
                  directionsRenderer.setDirections(result);
                } else {
                  alert('Directions request failed: ' + status);
                }
              });
            }, () => {
              alert('Please enable location access for directions');
            });
          } else {
            alert('Geolocation is not supported by this browser');
          }
        };

        console.log('✅ All map features set up successfully!');

      } catch (error) {
        console.error('❌ Error setting up map:', error);
      }
    };

    // Clear previous markers when dormitory changes
    clearAmenityMarkers();
    setShowHotels(false);
    setShowLibraries(false);
    setShowTransport(false);
    setShowLandmarks(false);
    // Don't reset mapReady here - only reset when creating new map

    // Start setup
    setupMap();
    
    return () => {
      console.log('🧹 Component cleanup');
    };
  }, [selectedDormitory, isLoaded, loadError]); // Re-run when dormitory changes or API loads

  console.log('🎨 Rendering component...');

  if (loadError) {
    return (
      <div className="w-full h-[500px] bg-red-50 rounded-xl shadow-2xl overflow-hidden border border-red-200 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">❌ Error Loading Maps</h2>
          <p className="text-red-500">Failed to load Google Maps API. Please check your internet connection and try again.</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] bg-blue-50 rounded-xl shadow-2xl overflow-hidden border border-blue-200 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">⏳ Loading Maps...</h2>
          <p className="text-blue-500">Please wait while we load Google Maps API</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Enhanced Header with dormitory selector */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-xl font-bold flex items-center mb-1">
              🏠 {DORMITORY_LOCATION.name}
            </h2>
            <p className="text-blue-100 text-sm flex items-center">
              📍 Click dormitory marker for details & amenities
            </p>
            <div className="mt-2 flex items-center text-blue-100 text-xs">
              <span className="mr-4">📞 {DORMITORY_LOCATION.contact}</span>
              <span>🕐 Check-in: {DORMITORY_LOCATION.checkin}</span>
            </div>
          </div>
          <div className="text-right">
            <label className="block text-blue-100 text-xs mb-1">Select Location:</label>
            <select 
              value={selectedDormitory}
              onChange={(e) => setSelectedDormitory(parseInt(e.target.value))}
              className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-shadow duration-200 border-0 focus:ring-2 focus:ring-blue-300"
            >
              {DORMITORY_OPTIONS.map((dorm, index) => (
                <option key={index} value={index} className="text-blue-700">
                  {dorm.name.split(' ')[0]} {dorm.name.split(' ')[1]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="relative h-96">
        {/* Map container */}
        <div 
          id="google-map" 
          ref={mapRef}
          style={{width: '100%', height: '100%'}}
          className="bg-gray-100"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="text-center">
              <div className="text-4xl mb-3 animate-bounce">🗺️</div>
              <p className="text-gray-700 font-semibold text-lg">Loading Interactive Map...</p>
              <p className="text-sm text-gray-500 mt-2">Mumbai Student Housing with Real Amenities</p>
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Status overlay */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm p-4 rounded-xl shadow-xl max-w-xs border border-gray-200">
          <h3 className="font-bold text-blue-700 text-sm flex items-center mb-2">
            🎯 Real Places Integration
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            1. Click any blue dormitory marker<br />
            2. Use amenity buttons for real places<br />
            3. All data from Google Places API
          </p>
          
          {/* Enhanced status indicators */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-3 h-3 rounded-full ${mapReady ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className={`font-medium ${mapReady ? 'text-green-700' : 'text-red-600'}`}>
                Map {mapReady ? 'Ready' : 'Loading...'}
              </span>
            </div>
            
            {/* Active amenity indicators */}
            <div className="flex flex-wrap gap-2 mt-2">
              {showHotels && (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                  🏨 Hotels Active
                </span>
              )}
              {showLibraries && (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  📚 Libraries Active
                </span>
              )}
              {showTransport && (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                  🚌 Transport Active
                </span>
              )}
              {showLandmarks && (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                  🏛️ Landmarks Active
                </span>
              )}
            </div>
            
            {!(showHotels || showLibraries || showTransport || showLandmarks) && (
              <p className="text-xs text-gray-500 italic mt-2">
                Select amenities to explore nearby places
              </p>
            )}
          </div>
        </div>

        {/* Accessibility highlights overlay */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200">
          <h4 className="font-bold text-green-700 text-sm flex items-center mb-2">
            ♿ Accessibility Features
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${DORMITORY_LOCATION.facilities.wheelchairAccess ? 'bg-green-500' : 'bg-red-400'}`}></span>
              <span className={DORMITORY_LOCATION.facilities.wheelchairAccess ? 'text-green-700' : 'text-red-600'}>
                Wheelchair Access
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${DORMITORY_LOCATION.facilities.elevator ? 'bg-green-500' : 'bg-red-400'}`}></span>
              <span className={DORMITORY_LOCATION.facilities.elevator ? 'text-green-700' : 'text-red-600'}>
                Elevator Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${DORMITORY_LOCATION.facilities.parking ? 'bg-green-500' : 'bg-red-400'}`}></span>
              <span className={DORMITORY_LOCATION.facilities.parking ? 'text-green-700' : 'text-red-600'}>
                Parking Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions Bar */}
      <div className="bg-gray-50 border-t border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h4 className="text-sm font-semibold text-gray-700">Quick Actions:</h4>
            <button 
              onClick={() => window.getDirections && window.getDirections()}
              className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              🧭 Get Directions
            </button>
            <a 
              href={DORMITORY_LOCATION.reviewsLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
            >
              📖 Read Reviews
            </a>
          </div>
          <div className="text-xs text-gray-500">
            Powered by Google Maps & Places API
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapComponent;