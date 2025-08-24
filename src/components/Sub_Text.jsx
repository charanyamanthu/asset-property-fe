import React from 'react';

const styles = {
  Text: {
    color: '#333333',
    fontSize: '16px',
    fontFamily: 'Mulish',
    fontWeight: '500',
    lineHeight: '28px',
  },
};

const defaultProps = {
  text: 'Full name',
};

const Sub_Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Sub_Text;