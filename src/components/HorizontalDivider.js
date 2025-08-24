import React from 'react';

const styles = {
  HorizontalDivider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#e0e0e0',
    borderRadius: '2px',
    margin: '20px 0',
  },
};

const HorizontalDivider = (props) => {
  return (
    <div style={{
      ...styles.HorizontalDivider,
      ...props.style
    }} />
  );
};

export default HorizontalDivider;