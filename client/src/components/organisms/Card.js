import React from 'react';
import './Card.css';

function Card({ heading, children, button }) {
  return (
    <div className="card">
      <h3>{ heading }</h3>
      { children }
      { button }
    </div>
  );
}

export default Card;