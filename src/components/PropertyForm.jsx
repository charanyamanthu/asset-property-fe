import React, { useState } from 'react';
import '../styles/PropertyForm.css';

const PropertyForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    images: [],
    amenities: []
  });

  const [formMsg, setFormMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormMsg('Property submitted successfully!');
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        propertyType: '',
        title: '',
        description: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        images: [],
        amenities: []
      });
      setFormMsg('');
    }, 3000);
  };

  return (
    <div className="property-form-container">
      <div className="property-form-content">
        <div className="form-header">
          <button 
            className="back-button" 
            onClick={onBack}
            style={{
              marginBottom: '20px',
              padding: '8px 16px',
              backgroundColor: '#5000CA',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Back to Home
          </button>
          <h1 className="form-title">Submit Your Property</h1>
          <p className="form-subtitle">List your property for rent with our easy-to-use form</p>
        </div>

        <section className="property-form-section">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="propertyType">Property Type *</label>
                <select 
                  id="propertyType" 
                  name="propertyType" 
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="studio">Studio</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="title">Property Title *</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter property title"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Monthly Rent *</label>
                <input 
                  type="number" 
                  id="price" 
                  name="price" 
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter monthly rent"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter property location"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms *</label>
                <select 
                  id="bedrooms" 
                  name="bedrooms" 
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms *</label>
                <select 
                  id="bathrooms" 
                  name="bathrooms" 
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Bathrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="area">Area (sq ft)</label>
              <input 
                type="number" 
                id="area" 
                name="area" 
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Enter property area in square feet"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Property Description *</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property, amenities, and any special features"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group full-width">
              <label htmlFor="images">Property Images</label>
              <input 
                type="file" 
                id="images" 
                name="images" 
                onChange={handleImageChange}
                multiple
                accept="image/*"
              />
              <small>You can select multiple images. Supported formats: JPG, PNG, GIF</small>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                Submit Property
              </button>
              <div id="formMsg" className="form-message">
                {formMsg && <div className="success-message">{formMsg}</div>}
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PropertyForm;
