import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './WalletButton.css';

function WalletButton({ children }) {
  return (
    <button className="wallet-button">
      {/* logo*/}
      { children }
      <FaArrowRight/>
    </button>
  );
}

export default WalletButton;