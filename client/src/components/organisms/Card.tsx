import React, { ReactNode } from 'react';
import '../../styles/Card.css';

interface Props {
  heading: string;
  children: ReactNode;
  button: ReactNode;
};

function Card({ heading, children, button }: Props) {
  return (
    <div className="card">
      <h3 className="card__heading">{ heading }</h3>
      { children }
      <div className="card__button-container">
        { button }
      </div>
    </div>
  );
};

export default Card;