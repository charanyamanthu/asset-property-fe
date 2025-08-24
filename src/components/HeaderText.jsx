import React from 'react';
import '../styles/HeaderText.css';

const HeaderText = ({ text = 'For Sale', className, color, fontSize }) => {
  const customStyle = {
    ...(color && { color }),
    ...(fontSize && { fontSize }),
  };

  return (
    <div className={`text-component ${className || ''}`} style={customStyle}>
      {text}
    </div>
  );
};

export default HeaderText;