import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function PrimaryButton({ onClick, children }) {
  return (
    <Button className="button--primary" onClick={onClick}>
      { children }
    </Button>
  );
}

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string
};

export default PrimaryButton;