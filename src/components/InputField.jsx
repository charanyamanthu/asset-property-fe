import React from 'react';

const styles = {
  Input: {
    top: '335px',
    left: '95px',
    width: '688px',
    height: '48px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '8px',
    backgroundColor: '#f2f2f2',
    color: '#7f7f7f',
    fontSize: '14px',
    fontFamily: 'Mulish',
    fontWeight: 700,
    lineHeight: '24px',
    outline: 'none',
  },
};

const defaultProps = {
  text: 'Name Surname',
};

const InputField = (props) => {
  return (
    <input style={styles.Input} placeholder={props.text ?? defaultProps.text} />
  );
};

export default InputField;