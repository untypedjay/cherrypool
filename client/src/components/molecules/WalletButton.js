import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './WalletButton.css';

function WalletButton({ children }) {
  return (
    <button className="wallet-button">
      <img src="../../logo.svg" alt="Logo"/>
      { children }
      <FaArrowRight/>
    </button>
  );
}

export default WalletButton;