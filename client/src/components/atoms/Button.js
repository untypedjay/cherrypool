import React from 'react';
import PropTypes from 'react';
import '../../styles/Button.css';

function Button({ className, onClick, children }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      { children }
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.object
};

export default Button;