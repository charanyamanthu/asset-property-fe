import React from 'react';
import '../styles/Footer.css';

// FontAwesome icons import
// You'll need to install: npm install @fortawesome/react-fontawesome @fortawesome/free-brands-icons @fortawesome/fontawesome-svg-core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ onLinkClick }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-branding">
            {/* Company logo section */}
            <div className="footer-logo">
              <button 
                onClick={() => onLinkClick('home')} 
                className="footer-logo-link"
              >
                <img 
                  src="/samriddhi_logo.jpg" 
                  alt="Company Logo" 
                  className="company-logo"
                />
              </button>
            </div>
            
            
          </div>

          <div className="footer-links">
            <div className="footer-links-column">              
              <h3 className="footer-links-title">To rent</h3>
              <ul className="footer-links-list">
                <li>
                  <button 
                    className="footer-link" 
                    onClick={() => onLinkClick('to-rent')}
                  >
                    Homes
                  </button>
                </li>
                <li>
                  <button 
                    className="footer-link" 
                    onClick={() => onLinkClick('to-rent')}
                  >
                    Commercial Properties
                  </button>
                </li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h3 className="footer-links-title">Services</h3>
              <ul className="footer-links-list">
                <li>
                  <button 
                    className="footer-link" 
                    onClick={() => onLinkClick('services')}
                  >
                    Property Management
                  </button>
                </li>
                <li>
                  <button 
                    className="footer-link" 
                    onClick={() => onLinkClick('services')}
                  >
                    Rental Management
                  </button>
                </li>
                <li>
                  <button 
                    className="footer-link" 
                    onClick={() => onLinkClick('services')}
                  >
                    Absentee Owner Services
                  </button>
                </li>
                <li>
                  <button 
                    className="footer-link" 
                    onClick={() => onLinkClick('services')}
                  >
                    Guides
                  </button>
                </li>
              </ul>
            </div>
            {/* New Contact Us section */}
            <div className="footer-links-column">
              <h3 className="footer-links-title">Contact Us</h3>
              <ul className="footer-links-list contact-list">
                <li>
                  <a 
                    href="mailto:info@samriddhiassets.com" 
                    className="contact-item"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                    <span>info@samriddhiassets.com</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/samriddhipropertyandasset?igsh=YnJleTRpaWNueHI=" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-item"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="contact-icon" />
                    <span>@samriddhipropertyandasset</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.facebook.com/share/18Wy4HrDe3/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-item"
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="contact-icon" />
                    <span>Samriddhi Assets</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} Samriddhi Assets | Website developed by Merakify Solutions Inc. All rights reserved.</p>
          <div className="bottom-links">
            <button 
              className="footer-link" 
              onClick={() => onLinkClick('privacy-policy')}
            >
              Privacy Policy
            </button>
            <button 
              className="footer-link" 
              onClick={() => onLinkClick('terms-of-service')}
            >
              Terms of Service
            </button>
            <button 
              className="footer-link"
              onClick={() => onLinkClick('cookie-policy')}
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;