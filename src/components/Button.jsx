import React from 'react';
import '../styles/Button.css';

const Button = ({ 
  type = 'button', 
  label = 'Send message', 
  onClick, 
  className, 
  icon,
  isLoading = false,
  disabled = false
}) => {
  const renderIcon = () => {
    if (isLoading) {
      return (
        <svg className="button-icon spinner" viewBox="0 0 24 24">
          <circle className="spinner-path" cx="12" cy="12" r="10" fill="none" strokeWidth="4"></circle>
        </svg>
      );
    }
    
    if (icon === 'email') {
      return (
        <svg className="button-icon" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
        </svg>
      );
    }
    return null;
  };

  return (
    <button 
      type={type} 
      className={`button ${isLoading ? 'loading' : ''} ${className || ''}`} 
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {renderIcon()}
      <span className="button-text">{isLoading ? 'Sending...' : label}</span>
    </button>
  );
};

export default Button;