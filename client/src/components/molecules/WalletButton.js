import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';
import '../../styles/WalletButton.css';

function WalletButton({ imgSrc, onClick, children }) {
  return (
    <button className="wallet-button" onClick={onClick}>
      <img className="wallet-button__logo" src={imgSrc} alt="Wallet Logo"/>
      { children }
      <FaArrowRight/>
    </button>
  );
}

WalletButton.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.element
};

export default WalletButton;