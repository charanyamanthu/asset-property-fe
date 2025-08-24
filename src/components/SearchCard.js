import React from 'react';

const styles = {
  Card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '25px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    margin: '0 0 20px 0',
  },
};

const SearchCard = (props) => {
  return (
    <div style={{
      ...styles.Card,
      ...props.style
    }}>
      {props.children}
    </div>
  );
};

export default SearchCard;