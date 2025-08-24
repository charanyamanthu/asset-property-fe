import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    width: 'auto',
    height: '36px',
    padding: '0px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    gap: '6px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '100000px',
    backgroundColor: '#ffe403',
    color: '#000000',
    fontSize: '12px',
    fontFamily: 'Mulish, sans-serif',
    fontWeight: 600,
    lineHeight: '16px',
    outline: 'none',
    position: 'absolute',
    top: '15px',
    left: '15px',
    zIndex: 5,
  },
  Icon: {
    fontSize: '18px',
    width: '18px',
    height: '18px',
    color: '#000000',
    fill: '#000000',
  },
};

const IconComponent = () => (
  <svg style={styles.Icon} viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none">
    </path>
    <path d="m23 12-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z">
    </path>
  </svg>
);

const defaultProps = {
  label: 'Just Leased',
  IconComponent,
};

const JustPostedButton = (props) => {
  return (
    <button style={{
      ...styles.Button,
      ...props.style
    }}>
      <span>{props.label ?? defaultProps.label}</span>
      {
        props.IconComponent 
          ? <props.IconComponent style={styles.Icon} /> 
          : <defaultProps.IconComponent />
      }
    </button>
  );
};

export default JustPostedButton;