import React from 'react';
import '../../styles/Button.css';

function Button({ className, onClick, children }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      { children }
    </button>
  );
}

export default Button;