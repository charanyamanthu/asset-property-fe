import React, { useState, useEffect, useMemo } from 'react';
import LocationIcon from '../components/LocationIcon';
import BedIcon from '../components/BedIcon';
import BathIcon from '../components/BathIcon';
import AreaIcon from '../components/AreaIcon';
import { getPropertyById } from '../services/propertyService';
import '../styles/PropertyDetails.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8090';

// Helper function outside component
const getFullImageUrl = (relativeUrl) => {
    if (!relativeUrl) return '';
    if (relativeUrl.startsWith('http')) return relativeUrl;
    return `${API_BASE_URL}${relativeUrl}`;
  };
  
const PropertyDetails = ({ propertyId, onMessageClick }) => {  // Add onMessageClick prop
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add the handleMessageClick function
  const handleMessageClick = () => {
    if (onMessageClick && property) {
      const propertyDetails = {
        image: property.previewImage || processedImages[0]?.fullUrl,
        price: formatPrice(property.price),
        perUnit: property.rentFrequency || "per month",
        location: property.location,
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        propertyId: property.id?.toString()
      };
      
      onMessageClick(propertyDetails);
    }
  };

  

  // Memoize the processed images array
  const processedImages = useMemo(() => {
    if (!property?.images) return [];
    return property.images.map(image => ({
      ...image,
      fullUrl: getFullImageUrl(image.url, API_BASE_URL)
    }));
  }, [property?.images]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const data = await getPropertyById(propertyId);
        setProperty(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError('Failed to load property details');
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  const handlePrevImage = () => {
    if (processedImages.length) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? processedImages.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (processedImages.length) {
      setCurrentImageIndex((prev) => 
        prev === processedImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return `$${price.toLocaleString()}`;
  };

  if (loading) return <div className="loading">Loading property details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return <div className="error">Property not found</div>;

  const currentImageUrl = processedImages[currentImageIndex]?.fullUrl;

  return (
    <div className="property-details-container">
      {/* Image Gallery */}
      <div className="property-image-gallery">
        <div className="main-image-container">
          <img 
            src={currentImageUrl || property.previewImage} 
            alt={`Property ${currentImageIndex + 1}`}
            className="main-property-image"
            onClick={openModal}
            style={{ cursor: 'pointer' }}
            loading="lazy" // Native lazy loading
          />
          {processedImages.length > 1 && (
            <>
              <button 
                className="gallery-nav-button prev-button" 
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                ←
              </button>
              <button 
                className="gallery-nav-button next-button" 
                onClick={handleNextImage}
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}
        </div>
        {processedImages.length > 1 && (
          <div className="thumbnail-container">
            {processedImages.map((image, index) => (
              <img
                key={image.id || index}
                src={image.fullUrl}
                alt={`Property thumbnail ${index + 1}`}
                className={`thumbnail-image ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                loading="lazy" // Native lazy loading for thumbnails
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img 
              src={currentImageUrl} 
              alt={`Property ${currentImageIndex + 1}`}
              className="modal-image"
            />
            <button 
              className="modal-close-button" 
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            {processedImages.length > 1 && (
              <>
                <button 
                  className="modal-nav-button modal-prev" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button 
                  className="modal-nav-button modal-next" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Property Header */}
      <div className="property-details-header">
        <h1>{property.location || property.displayAddress || property.address || 'Property Details'}</h1>
        <div className="property-price-details">
          {formatPrice(property.price)} {property.rentFrequency || 'per month'}
        </div>
      </div>

      {/* Property Features */}
      <div className="property-features-details">
        <div className="feature-item">
          <BedIcon />
          <span className="feature-value">{property.beds}</span>
          <span className="feature-label">bed{property.beds !== 1 ? 's' : ''}</span>
        </div>
        <div className="feature-item">
          <BathIcon />
          <span className="feature-value">{property.baths}</span>
          <span className="feature-label">bath{property.baths !== 1 ? 's' : ''}</span>
        </div>
        <div className="feature-item">
          <AreaIcon />
          <span className="feature-value">{property.sqft}</span>
          <span className="feature-label">{property.sqftUnit || 'ft²'}</span>
        </div>
      </div>

      {/* Property Information */}
      <div className="property-info-section">
        <h2>About this property</h2>
        <p className="property-description">{property.description}</p>
        
        {property.keyFeatures && property.keyFeatures.length > 0 && (
          <div className="key-features">
            <h3>Key Features</h3>
            <ul>
              {property.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>


      {/* Location Information */}
      <div className="location-section">
        <h2>Location</h2>
        <div className="location-info">
          <LocationIcon />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Fee Information - only show if any fee data exists */}
      {(property.serviceCharge || property.deposit || property.utilityBills) && (
        <div className="fee-information">
          <h2>Additional Information</h2>
          <div className="fees-grid">
            {property.serviceCharge && (
              <div className="fee-item">
                <span className="fee-label">Service fee</span>
                <span className="fee-value">{property.serviceCharge}</span>
              </div>
            )}
            {property.deposit && (
              <div className="fee-item">
                <span className="fee-label">Deposit</span>
                <span className="fee-value">{property.deposit}</span>
              </div>
            )}
            {property.utilityBills && (
              <div className="fee-item">
                <span className="fee-label">Utility Bills</span>
                <span className="fee-value">{property.utilityBills}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Agent Button */}
      <div className="contact-agent-section">
        {property && !property.tags?.includes("Leased") && (
          <button 
            style={{
              cursor: 'pointer',
              width: '119px',
              height: '40px',
              padding: '0px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row-reverse',
              gap: '6px',
              border: '0',
              boxSizing: 'border-box',
              borderRadius: '12px',
              boxShadow: '0px 0px 10px rgba(3,3,3,0.1)',
              backgroundColor: '#030303',
              color: '#ffffff',
              fontSize: '12px',
              fontFamily: 'Mulish, sans-serif',
              fontWeight: 600,
              lineHeight: '16px',
              outline: 'none',
            }}
            onClick={handleMessageClick}
          >
            <span>Message</span>
            <svg 
              style={{
                fontSize: '18px',
                width: '18px',
                height: '18px',
                color: '#ffffff',
                fill: '#ffffff',
              }} 
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;