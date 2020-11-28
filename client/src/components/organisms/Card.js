import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Card.css';

function Card({ heading, children, button }) {
  return (
    <div className="card">
      <h3 className="card__heading">{ heading }</h3>
      { children }
      <div className="card__button-container">
        { button }
      </div>
    </div>
  );
}

Card.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.element,
  button: PropTypes.element
};

export default Card;