import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import '../../styles/WalletButton.css';

function WalletButton({ imgSrc, onClick, children }) {
  return (
    <button className="wallet-button" onClick={onClick}>
      <img src={imgSrc} alt="Wallet Logo"/>
      { children }
      <FaArrowRight/>
    </button>
  );
}

export default WalletButton;