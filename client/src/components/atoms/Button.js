import React from 'react';
import '../../styles/Button.css';

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      { children }
    </button>
  );
}

export default Button;