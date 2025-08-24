import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = ({ onBack }) => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-header">
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
          <h1 className="about-title">About Samriddhi</h1>
          <p className="about-subtitle">Your Trusted Partner in Property Solutions</p>
        </div>

        <div className="about-sections">
          <div className="about-section">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              Founded with a vision to simplify property management and rental solutions, 
              Samriddhi has been at the forefront of connecting property owners with 
              quality tenants. Our journey began with a simple mission: to make property 
              rental accessible, transparent, and hassle-free for everyone involved.
            </p>
          </div>

          <div className="about-section">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              We strive to provide innovative property solutions that benefit both 
              property owners and tenants. Through our comprehensive platform, we aim 
              to create a seamless experience that transforms how people find, manage, 
              and enjoy their rental properties.
            </p>
          </div>

          <div className="about-section">
            <h2 className="section-title">What We Offer</h2>
            <div className="services-grid">
              <div className="service-item">
                <div className="service-icon">🏠</div>
                <h3>Property Listings</h3>
                <p>Comprehensive property search with detailed information and high-quality images</p>
              </div>
              <div className="service-item">
                <div className="service-icon">🤝</div>
                <h3>Agent Support</h3>
                <p>Direct communication with property agents for personalized assistance</p>
              </div>
              <div className="service-item">
                <div className="service-icon">📱</div>
                <h3>Modern Platform</h3>
                <p>User-friendly interface designed for the best user experience</p>
              </div>
              <div className="service-item">
                <div className="service-icon">🔒</div>
                <h3>Trust & Security</h3>
                <p>Secure platform with verified listings and trusted partners</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2 className="section-title">Our Values</h2>
            <div className="values-list">
              <div className="value-item">
                <strong>Transparency:</strong> Clear, honest communication in all our dealings
              </div>
              <div className="value-item">
                <strong>Quality:</strong> We maintain high standards in property selection and service
              </div>
              <div className="value-item">
                <strong>Innovation:</strong> Continuously improving our platform and services
              </div>
              <div className="value-item">
                <strong>Customer Focus:</strong> Your satisfaction is our top priority
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-text">
              Ready to find your perfect rental property? Our team is here to help you 
              every step of the way. Contact us today to start your property journey.
            </p>
            <div className="contact-info">
              <p>📧 Email: info@samriddhi.com</p>
              <p>📞 Phone: +44 (0) 20 1234 5678</p>
              <p>📍 Address: London, United Kingdom</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
