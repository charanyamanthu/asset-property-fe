import React from 'react';

const styles = {
  Button: {
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
  },
  Icon: {
    fontSize: '18px',
    width: '18px',
    height: '18px',
    color: '#ffffff',
    fill: '#ffffff',
  },
};

const IconComponent = () => (
  <svg style={styles.Icon} viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
  </svg>
);

const defaultProps = {
  label: 'Message',
  IconComponent,
};

const MessageButton = (props) => {
  // This explicitly logs the onClick prop to verify it exists
  console.log("MessageButton onClick prop:", props.onClick);
  
  return (
    <button 
      style={{
        ...styles.Button,
        ...props.style
      }}
      onClick={props.onClick}
      type="button"
    >
      <span>{props.label ?? defaultProps.label}</span>
      {
        props.IconComponent 
          ? <props.IconComponent style={styles.Icon} /> 
          : <defaultProps.IconComponent />
      }
    </button>
  );
};

export default MessageButton;