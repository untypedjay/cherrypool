import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Button.css';

function Button({ classSelector, onClick, children }) {
  return (
    <button className={`button ${classSelector}`} onClick={onClick}>
      { children }
    </button>
  );
}

Button.propTypes = {
  classSelector: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default Button;