import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '32px',
    fontFamily: 'Mulish',
    fontWeight: 700,
    lineHeight: '42px',
  },
};

const defaultProps = {
  text: 'Contact agent',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;