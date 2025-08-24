import React from 'react';

const styles = {
  Icon: {
    color: '#ffe403',
    fill: '#ffe403',
    fontSize: '24px',
    width: '24px',
    height: '24px',
    verticalAlign: 'middle',
    marginRight: '5px'
  },
};

const IconComponent = () => (
  <svg style={styles.Icon} viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none">
    </path>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z">
    </path>
  </svg>
);

const defaultProps = {
  IconComponent,
};

const LocationIcon = (props) => {
  return (
    props.IconComponent 
      ? <props.IconComponent style={styles.Icon} /> 
      : <defaultProps.IconComponent />
  );
};

export default LocationIcon;