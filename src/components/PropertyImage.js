import React from 'react';

const styles = {
  ImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: '25px',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
};


const defaultProps = {
  image: 'https://images.unsplash.com/photo-1630699376106-d550afb865bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHw4fHxlbXB0eSUyMHJvb218ZW58MXx8fHwxNzA2NTI3MTM3fDA&ixlib=rb-4.0.3&q=80&w=1080',
};

const PropertyImage = (props) => {
  return (
    <div 
      style={{
        ...styles.ImageContainer,
        backgroundImage: `url(${props.image ?? defaultProps.image})`,
      }}
    >
    
      {props.children}
    </div>
  );
};

export default PropertyImage;