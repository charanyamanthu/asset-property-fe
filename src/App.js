import React, { useState } from 'react';
import ContactAgent from './components/ContactAgent';
import PropertyCard from './components/PropertyCard';
import PropertySearch from './components/PropertySearch'; // Import the new component
import Footer from './components/Footer';
import UnderDevelopment from './components/UnderDevelopment';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import PropertyDetails from './components/PropertyDetails';
import AboutUs from './components/AboutUs';
import PropertyForm from './components/PropertyForm';
import './styles/App.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  //  new handler function for property clicks
  const handlePropertyClick = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setCurrentView('property-details');
    window.scrollTo(0, 0);
  };

  // State to store selected property details when message button is clicked
  const [selectedProperty, setSelectedProperty] = useState({
    image: "House_Generated.jpg",
    price: "$3,000", 
    perUnit: "per month",
    location: "London",
    beds: 3,
    baths: 2,
    sqft: 2000
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
    window.scrollTo(0, 0); // Scroll to top
  };

 // Handle message button click from PropertySearch with explicit logging
  const handleMessageClick = (propertyDetails) => {
    console.log("App received property details:", propertyDetails);
    setSelectedProperty(propertyDetails);
    console.log("Changing view to contact");
    setCurrentView('contact'); // Switch to the contact view
    window.scrollTo(0, 0); // Scroll to top when redirecting
  };
  // Footer link handler
  const handleFooterLink = (page) => {
    handleNavigation(page);
  };

  // Render the appropriate view based on currentView state
  const renderView = () => {
    switch(currentView) {
      case 'privacy-policy':
        return (
          <PrivacyPolicy 
            onBack={() => handleNavigation('home')} 
          />
        );
      case 'terms-of-service':
        return (
          <TermsOfService
            onBack={() => handleNavigation('home')} 
          />
        );
      case 'cookie-policy':
        return (
          <CookiePolicy
            onBack={() => handleNavigation('home')} 
          />
        );
      case 'about-us':
        return (
          <AboutUs
            onBack={() => handleNavigation('home')} 
          />
        );
      case 'property-form':
        return (
          <PropertyForm
            onBack={() => handleNavigation('home')} 
          />
        );
      case 'services':
        return (
          <UnderDevelopment 
            feature="Services" 
            onBack={() => handleNavigation('home')} 
          />
        );
      case 'pricing':
        return (
          <UnderDevelopment 
            feature="Pricing" 
            onBack={() => handleNavigation('home')} 
          />
        );
      case 'to-rent':
        console.log("Rendering to-rent view");
        return <PropertySearch onMessageClick={handleMessageClick} onPropertyClick={handlePropertyClick} />;
        case 'contact':
          console.log("Rendering contact view with property:", selectedProperty);
          return (
            <div className="content-container">
              {/* Left side - Contact Agent */}
              <div className="contact-wrapper">
                <ContactAgent propertyData={selectedProperty} />
              </div>
              
              {/* Right side - Property Card */}
              <div className="property-wrapper">
                <PropertyCard 
                  image={selectedProperty.image}
                  price={selectedProperty.price} 
                  perUnit={selectedProperty.perUnit} 
                  location={selectedProperty.location} 
                  beds={selectedProperty.beds} 
                  baths={selectedProperty.baths} 
                  sqft={selectedProperty.sqft}
                />
                <button 
                  className="back-button" 
                  onClick={() => handleNavigation('home')}
                  style={{
                    marginTop: '15px',
                    padding: '8px 16px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Back to Properties
                </button>
              </div>
            </div>
          );
          case 'property-details':
            if (!selectedPropertyId) {
              // Fallback to property search if no property is selected
              handleNavigation('to-rent');
              return null;
            }
            return (
              <div>
                <button 
                  className="back-button" 
                  onClick={() => handleNavigation('to-rent')}
                  style={{
                    margin: '16px 0',
                    padding: '8px 16px',
                    backgroundColor: '#5000CA',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ← Back to Search
                </button>
                <PropertyDetails 
                  propertyId={selectedPropertyId} 
                  onMessageClick={handleMessageClick}  // Add this line
                />
              </div>
            );
      case 'home':
      default:
        console.log("Rendering home/default view");
        return <PropertySearch onMessageClick={handleMessageClick} onPropertyClick={handlePropertyClick} />;

        // return (
        //   <div className="content-container">
        //     {/* Left side - Contact Agent */}
        //     <div className="contact-wrapper">
        //       <ContactAgent />
        //     </div>
            
        //     {/* Right side - Property Card */}
        //     <div className="property-wrapper">
        //       <PropertyCard 
        //         image="House_Generated.jpg"
        //         price="$" 
        //         perUnit="per month" 
        //         location="London" 
        //         beds={3} 
        //         baths={2} 
        //         sqft={2000}
        //       />
        //     </div>
        //   </div>
        // );
    }
  };

  return (
    <div className="app">
      {/* Header/Navbar */}
      <header className="header">
        {/* Logo Circle */}
        <div className="logo-circle">
          <button onClick={() => handleNavigation('home')} 
            className="logo-link"
            aria-label="Go to homepage"
          >
            <span className="logo-text">Samriddhi</span>
          </button>
        </div>
        
        {/* Wrap navigation and auth in a container */}
        <div className="nav-container">
          {/* Navigation Links */}
          <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <button 
              className={`nav-link ${currentView === 'to-rent' ? 'active' : ''}`}
              onClick={() => handleNavigation('to-rent')}
            >
              To Rent
            </button>
            <button 
              className={`nav-link ${currentView === 'about-us' ? 'active' : ''}`}
              onClick={() => handleNavigation('about-us')}
            >
              About Us
            </button>
            <button 
              className={`nav-link ${currentView === 'property-form' ? 'active' : ''}`}
              onClick={() => handleNavigation('property-form')}
            >
              Submit Property
            </button>
            <button 
              className={`nav-link ${currentView === 'services' ? 'active' : ''}`}
              onClick={() => handleNavigation('services')}
            >
              Services
            </button>
            <button 
              className={`nav-link ${currentView === 'pricing' ? 'active' : ''}`}
              onClick={() => handleNavigation('pricing')}
            >
              Pricing
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button" 
            onClick={toggleMobileMenu}
          >
            <span className="mobile-menu-icon">☰</span>
          </button>
          
         
        </div>
      </header>
      
      {/* Main content section */}
      <div className="main-content">
        {renderView()}
      </div>
      
      <Footer onLinkClick={handleFooterLink} />
    </div>
  );
}

export default App;