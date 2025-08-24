import React from 'react';
import '../styles/PropertyCard.css';

const PropertyCard = ({ image, price, perUnit, perWeek, location, beds, baths, sqft }) => {
  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          src={image}
          alt="Property" 
          className="property-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "";
          }}
        />
        <div className="property-features">
          <div className="feature-badge">
            <div className="feature-icon">🛏️</div>
            <div className="feature-value">{beds}</div>
          </div>
          <div className="feature-badge">
            <div className="feature-icon">🚿</div>
            <div className="feature-value">{baths}</div>
          </div>
          <div className="feature-badge">
            <div className="feature-icon">📏</div>
            <div className="feature-value">{sqft}</div>
          </div>
        </div>
      </div>
      <div className="property-details">
        <div className="property-price">
          <span className="price-value">{price} {perUnit}</span>
          <span className="price-per-week">{perWeek}</span>
        </div>
        <div className="property-location">
          <span className="location-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13.5C13.933 13.5 15.5 11.933 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.067 6.5 8.5 8.067 8.5 10C8.5 11.933 10.067 13.5 12 13.5Z" fill="#FF0055"/>
              <path d="M12 2C7.589 2 4 5.554 4 9.923C4 15.397 12 22 12 22C12 22 20 15.397 20 9.923C20 5.554 16.411 2 12 2ZM12 15.5C8.962 15.5 6.5 13.038 6.5 10C6.5 6.962 8.962 4.5 12 4.5C15.038 4.5 17.5 6.962 17.5 10C17.5 13.038 15.038 15.5 12 15.5Z" fill="#FF0055"/>
            </svg>
          </span>
          <span className="location-text">{location}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;