import React from 'react';
import '../styles/UnderDevelopment.css';

const UnderDevelopment = ({ feature = 'This page', onBack }) => {
  return (
    <div className="under-development">
      <div className="under-development-container">
        <div className="under-development-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V12L16 14" stroke="#5000CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#5000CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="under-development-title">Coming Soon!</h2>
        <p className="under-development-message">
          <span className="highlight">{feature}</span> is currently under development. 
          We're working hard to bring you this page soon.
        </p>
        <p className="under-development-submessage">
          Please check back later for updates.
        </p>
        <button className="under-development-button" onClick={onBack}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default UnderDevelopment;