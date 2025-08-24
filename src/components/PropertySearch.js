// Import useCallback along with other hooks
import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/PropertySearch.css';
// Import icons
import LocationIcon from '../components/LocationIcon';
import BedIcon from '../components/BedIcon';
import BathIcon from '../components/BathIcon';
import AreaIcon from '../components/AreaIcon';
// Import custom components
import Card from '../components/Card';
import PropertyImage from '../components/PropertyImage';
// Import property service
import { getProperties } from '../services/propertyService';

const PropertySearch = ({ onMessageClick, onPropertyClick }) => {
  // State for search form inputs
  const [beds, setBeds] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  
  // State for dropdowns
  const [bedsOpen, setBedsOpen] = useState(false);
  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const [minPriceOpen, setMinPriceOpen] = useState(false);
  const [maxPriceOpen, setMaxPriceOpen] = useState(false);
  
  // State for search form collapse (mobile only)
  const [isSearchExpanded, setIsSearchExpanded] = useState(window.innerWidth > 768);
  
  // State for property data and search results
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filter options derived from properties data
  const [bedOptions, setBedOptions] = useState([]);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [minPriceOptions, setMinPriceOptions] = useState([]);
  const [maxPriceOptions, setMaxPriceOptions] = useState([]);
  
  // Refs for dropdown outside click detection
  const bedsDropdownRef = useRef(null);
  const propertyTypeDropdownRef = useRef(null);
  const minPriceDropdownRef = useRef(null);
  const maxPriceDropdownRef = useRef(null);

  // Simplified dropdown toggle handlers
  const handlePropertyClick = (property) => {
    if (property.id && onPropertyClick) {
      onPropertyClick(property.id);
    }
  };

  const handleBedsToggle = (isOpen) => {
    setBedsOpen(isOpen);
  };

  const handleMinPriceToggle = (isOpen) => {
    setMinPriceOpen(isOpen);
  };

  const handleMaxPriceToggle = (isOpen) => {
    setMaxPriceOpen(isOpen);
  };

  const handlePropertyTypeToggle = (isOpen) => {
    setPropertyTypeOpen(isOpen);
  };

  // Toggle search form visibility (for mobile)
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
  
  // Simplified outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bedsDropdownRef.current && !bedsDropdownRef.current.contains(event.target)) {
        setBedsOpen(false);
      }
      
      if (propertyTypeDropdownRef.current && !propertyTypeDropdownRef.current.contains(event.target)) {
        setPropertyTypeOpen(false);
      }
      
      if (minPriceDropdownRef.current && !minPriceDropdownRef.current.contains(event.target)) {
        setMinPriceOpen(false);
      }
      
      if (maxPriceDropdownRef.current && !maxPriceDropdownRef.current.contains(event.target)) {
        setMaxPriceOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get availability badge styling and text - Updated with only 5 options
  const getAvailabilityInfo = (availability) => {
    const availabilityMap = {
      'Leased': { text: 'LEASED', className: 'leased-tag' },
      'Available': { text: 'AVAILABLE', className: 'available-tag' },
      'Ready to Move': { text: 'READY TO MOVE', className: 'ready-tag' },
      'Coming Soon': { text: 'COMING SOON', className: 'coming-soon-tag' },
      'Under Offer': { text: 'UNDER OFFER', className: 'under-offer-tag' }
    };
    
    return availabilityMap[availability] || { text: availability?.toUpperCase() || 'AVAILABLE', className: 'available-tag' };
  };

  // Handle message button click
  const handleMessageClick = (property) => {
    if (onMessageClick) {
      const propertyDetails = {
        image: property.previewImage || property.image,
        price: formatPrice(property.price), 
        perUnit: "per month",
        location: property.location,
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        propertyId: property.id.toString()
      };
      
      onMessageClick(propertyDetails);
    }
  };

  // Function to generate price ranges in $500 increments
  const generatePriceOptions = useCallback((properties) => {
    if (!properties || properties.length === 0) return;
    
    // Get min and max property prices
    const prices = properties.map(prop => prop.price).filter(Boolean);
    if (prices.length === 0) return;
    
    const minPropertyPrice = Math.floor(Math.min(...prices) / 500) * 500;
    const maxPropertyPrice = Math.ceil(Math.max(...prices) / 500) * 500;
    
    // Generate price options in $500 increments
    const minOptions = [];
    const maxOptions = [];
    
    // Add "Any" option first
    minOptions.push("");
    maxOptions.push("");
    
    // Generate the ranges
    for (let price = minPropertyPrice; price <= maxPropertyPrice; price += 500) {
      minOptions.push(price);
      maxOptions.push(price);
    }
    
    setMinPriceOptions(minOptions);
    setMaxPriceOptions(maxOptions);
  }, []);
  
  // Extract filter options from property data
  const extractFilterOptions = useCallback((properties) => {
    // Extract unique bed counts and sort them
    const beds = [...new Set(properties.map(prop => prop.beds))].sort((a, b) => a - b);
    setBedOptions(beds);
    
    // Extract unique property types
    const types = [...new Set(properties.map(prop => prop.propertyType))].filter(Boolean);
    setPropertyTypeOptions(types);
    
    // Generate price options
    generatePriceOptions(properties);
  }, [generatePriceOptions]);
  
  // Fetch property data on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // Call the service to get properties from API
        const properties = await getProperties();
        
        // Set search results
        setSearchResults(properties);
        
        // Extract filter options from data
        extractFilterOptions(properties);
        
        setLoading(false);
      } catch (err) {
        setError('Oops, somebody dropped the ball');
        setLoading(false);
        console.error('Error fetching properties:', err);
      }
    };
    
    fetchProperties();
  }, [extractFilterOptions]);
  
  // Clear individual field
  const clearField = (field) => {
    switch(field) {
      case 'beds':
        setBeds('');
        handleBedsToggle(false);
        break;
      case 'propertyType':
        setPropertyType('');
        handlePropertyTypeToggle(false);
        break;
      case 'minPrice':
        setMinPrice('');
        handleMinPriceToggle(false);
        break;
      case 'maxPrice':
        setMaxPrice('');
        handleMaxPriceToggle(false);
        break;
      default:
        break;
    }
  };
  
  // Handler for search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Prepare filter object with only filled values
      const filters = {};
      if (beds) filters.beds = beds;
      if (minPrice) filters.minPrice = minPrice;
      if (maxPrice) filters.maxPrice = maxPrice;
      if (propertyType) filters.propertyType = propertyType;
      
      // Call API with filters
      const filteredProperties = await getProperties(filters);
      setSearchResults(filteredProperties);
      
      // On mobile, collapse the search form after search
      if (window.innerWidth <= 768) {
        setIsSearchExpanded(false);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch properties');
      setLoading(false);
      console.error('Error fetching properties:', err);
    }
  };
  
  // Format price to currency 
  const formatPrice = (price) => {
    if (!price) return 'Any';
    return `$${price.toLocaleString()}`;
  };

  // Handle selection for custom dropdowns
  const handleBedSelect = (bedCount) => {
    setBeds(bedCount);
    handleBedsToggle(false);
  };
  
  const handlePropertyTypeSelect = (type) => {
    setPropertyType(type);
    handlePropertyTypeToggle(false);
  };

  const handleMinPriceSelect = (price) => {
    setMinPrice(price);
    handleMinPriceToggle(false);
  };

  const handleMaxPriceSelect = (price) => {
    setMaxPrice(price);
    handleMaxPriceToggle(false);
  };

  if (loading) return <div className="loading">Loading properties...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="property-search-container">
      <div className="search-form-container">
        {/* Mobile search toggle */}
        <button 
          className="search-toggle" 
          onClick={toggleSearch}
          aria-expanded={isSearchExpanded}
          aria-controls="search-form-content"
        >
          <span>Search Filters</span>
          <span className={`search-toggle-icon ${isSearchExpanded ? 'open' : ''}`}>▼</span>
        </button>
        
        <div 
          id="search-form-content"
          className={`search-form-content ${isSearchExpanded ? 'open' : ''}`}
        >
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-fields">
              <div className="search-field" ref={bedsDropdownRef}>
                <label htmlFor="beds">BEDS</label>
                <div className="input-with-clear">
                  <div 
                    className="custom-select"
                    onClick={() => handleBedsToggle(!bedsOpen)}
                    tabIndex="0"
                    role="combobox"
                    aria-expanded={bedsOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="beds-label"
                    aria-controls="beds-label" 
                  >
                    <input
                      type="text"
                      id="beds"
                      value={beds ? beds : 'Any'}
                      readOnly
                      placeholder="Any"
                    />
                    {beds && (
                      <button 
                        type="button" 
                        className="clear-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('beds');
                        }}
                        aria-label="Clear beds"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  {bedsOpen && (
                    <div className="dropdown-options" role="listbox" aria-labelledby="beds-label">
                      <div 
                        className={`dropdown-option ${beds === '' ? 'selected' : ''}`}
                        onClick={() => handleBedSelect('')}
                        role="option"
                        aria-selected={beds === ''}
                      >
                        Any
                      </div>
                      {bedOptions.map(bedCount => (
                        <div 
                          key={bedCount} 
                          className={`dropdown-option ${beds === bedCount ? 'selected' : ''}`}
                          onClick={() => handleBedSelect(bedCount)}
                          role="option"
                          aria-selected={beds === bedCount}
                        >
                          {bedCount}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Min Price Dropdown */}
              <div className="search-field" ref={minPriceDropdownRef}>
                <label htmlFor="minPrice">MIN. PRICE</label>
                <div className="input-with-clear">
                  <div 
                    className="custom-select"
                    onClick={() => handleMinPriceToggle(!minPriceOpen)}
                    tabIndex="0"
                    role="combobox"
                    aria-expanded={minPriceOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="min-price-label"
                    aria-controls="min-price-label" 
                  >
                    <input
                      type="text"
                      id="minPrice"
                      value={minPrice ? formatPrice(minPrice) : 'Any'}
                      readOnly
                      placeholder="Any"
                    />
                    {minPrice && (
                      <button 
                        type="button" 
                        className="clear-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('minPrice');
                        }}
                        aria-label="Clear minimum price"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  {minPriceOpen && (
                    <div className="dropdown-options" role="listbox" aria-labelledby="min-price-label">
                      <div 
                        className={`dropdown-option ${minPrice === '' ? 'selected' : ''}`}
                        onClick={() => handleMinPriceSelect('')}
                        role="option"
                        aria-selected={minPrice === ''}
                      >
                        Any
                      </div>
                      {minPriceOptions.map((price, index) => {
                        if (price === "") return null;
                        return (
                          <div 
                            key={index} 
                            className={`dropdown-option ${minPrice === price ? 'selected' : ''}`}
                            onClick={() => handleMinPriceSelect(price)}
                            role="option"
                            aria-selected={minPrice === price}
                          >
                            {formatPrice(price)}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Max Price Dropdown */}
              <div className="search-field" ref={maxPriceDropdownRef}>
                <label htmlFor="maxPrice">MAX. PRICE</label>
                <div className="input-with-clear">
                  <div 
                    className="custom-select"
                    onClick={() => handleMaxPriceToggle(!maxPriceOpen)}
                    tabIndex="0"
                    role="combobox"
                    aria-expanded={maxPriceOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="max-price-label"
                    aria-controls="max-price-label" 
                  >
                    <input
                      type="text"
                      id="maxPrice"
                      value={maxPrice ? formatPrice(maxPrice) : 'Any'}
                      readOnly
                      placeholder="Any"
                    />
                    {maxPrice && (
                      <button 
                        type="button" 
                        className="clear-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('maxPrice');
                        }}
                        aria-label="Clear maximum price"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  {maxPriceOpen && (
                    <div className="dropdown-options" role="listbox" aria-labelledby="max-price-label">
                      <div 
                        className={`dropdown-option ${maxPrice === '' ? 'selected' : ''}`}
                        onClick={() => handleMaxPriceSelect('')}
                        role="option"
                        aria-selected={maxPrice === ''}
                      >
                        Any
                      </div>
                      {maxPriceOptions.map((price, index) => {
                        if (price === "") return null;
                        return (
                          <div 
                            key={index} 
                            className={`dropdown-option ${maxPrice === price ? 'selected' : ''}`}
                            onClick={() => handleMaxPriceSelect(price)}
                            role="option"
                            aria-selected={maxPrice === price}
                          >
                            {formatPrice(price)}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="search-field" ref={propertyTypeDropdownRef}>
                <label htmlFor="propertyType">PROPERTY TYPE</label>
                <div className="input-with-clear">
                  <div 
                    className="custom-select"
                    onClick={() => handlePropertyTypeToggle(!propertyTypeOpen)}
                    tabIndex="0"
                    role="combobox"
                    aria-expanded={propertyTypeOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="property-type-label"
                    aria-controls="property-type-label" 
                  >
                    <input
                      type="text"
                      id="propertyType"
                      value={propertyType || 'Any'}
                      readOnly
                      placeholder="Any"
                    />
                    {propertyType && (
                      <button 
                        type="button" 
                        className="clear-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField('propertyType');
                        }}
                        aria-label="Clear property type"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  {propertyTypeOpen && (
                    <div className="dropdown-options" role="listbox" aria-labelledby="property-type-label">
                      <div 
                        className={`dropdown-option ${propertyType === '' ? 'selected' : ''}`}
                        onClick={() => handlePropertyTypeSelect('')}
                        role="option"
                        aria-selected={propertyType === ''}
                      >
                        Any
                      </div>
                      {propertyTypeOptions.map((type, index) => (
                        <div 
                          key={index} 
                          className={`dropdown-option ${propertyType === type ? 'selected' : ''}`}
                          onClick={() => handlePropertyTypeSelect(type)}
                          role="option"
                          aria-selected={propertyType === type}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="search-buttons">
              <button type="submit" className="filter-button">
                <span className="filter-icon">⚙️</span> Filter
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="search-results">
        <h2>Properties Found ({searchResults.length})</h2>
        {searchResults.length === 0 ? (
          <div className="no-results">No properties match your search criteria. Please try adjusting your filters.</div>
        ) : (
          <div className="results-container">
            {searchResults.map((property) => {
              const availabilityInfo = getAvailabilityInfo(property.availability);
              const displayDescription = property.short_description;
              
              return (
                <Card key={property.id} style={{ marginBottom: '20px' }}>
                  <div className="property-card">
                    <div className="property-card-inner">
                      
                      <div className="property-flex-container">
                        {/* Left side - Image */}
                        <div className="property-left-section">
                          <div className="property-image-container">
                            <PropertyImage image={property.previewImage || property.image} />
                            {property.tags && property.tags.includes("Just Posted") && (
                              <div className="just-posted-tag">Just Posted</div>
                            )}
                            
                            {/* Enhanced Availability Tag */}
                            <div className={`availability-tag ${availabilityInfo.className}`}>
                              {availabilityInfo.text}
                            </div>
                            
                            <button className="next-image-button" aria-label="Next image"
                            onClick={() => handlePropertyClick(property)}>
                              <span>→</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Right side - Details */}
                        <div className="property-right-section">
                          <div className="property-header">
                            <h3 
                              className="property-price" 
                              onClick={() => handlePropertyClick(property)}
                              style={{ cursor: 'pointer' }}
                            >
                              {formatPrice(property.price)}
                            </h3>
                            <p className="property-location"><LocationIcon />{property.location}</p>
                            
                            {/* Enhanced Property Type Display */}
                            {property.propertyType && (
                              <div className="property-type-badge">
                                <span className="property-type-icon">🏠</span>
                                <span className="property-type-text">{property.propertyType}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="property-features">
                            <div className="feature-item">
                              <BedIcon /><span className="feature-value">{property.beds}</span><span className="feature-label">bed</span>
                            </div>
                            <div className="feature-item">
                              <BathIcon /><span className="feature-value">{property.baths}</span><span className="feature-label">bath</span>
                            </div>
                            <div className="feature-item">
                              <AreaIcon /><span className="feature-value">{property.sqft}</span><span className="feature-label">{property.sqftUnit || 'ft²'}</span>
                            </div>
                          </div>
                          
                          <p className="property-description">{displayDescription}</p>
                          
                          {/* Only show message button if not leased */}
                          {property.availability !== 'Leased' && (
                          <div className="property-footer">
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
                              onClick={() => handleMessageClick(property)}
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
                          </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySearch;