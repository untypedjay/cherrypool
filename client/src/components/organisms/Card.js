import React from 'react';
import Button from '../atoms/Button';
import './Card.css';

function Card() {
  return (
    <div className="card">
      <h3>Card Title</h3>
      <p>Text text text</p>
      <Button>Start</Button>
    </div>
  );
}

export default Card;