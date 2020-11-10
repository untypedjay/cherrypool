import React from 'react';
import '../../styles/Card.css';

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