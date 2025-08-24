import React from 'react';

export const Logo = ({ color = '#FFD700' }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 3L28 15H24V27H6V15H2L15 3Z" fill={color} />
    </svg>
  );
};