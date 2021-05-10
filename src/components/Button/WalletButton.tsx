import React, {ReactNode} from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './WalletButton.css';

interface Props {
  imgSrc: string;
  onClick: () => any;
  children: ReactNode;
};

function WalletButton({ imgSrc, onClick, children }: Props) {
  return (
    <button className="wallet-button" onClick={onClick}>
      <img className="wallet-button__logo" src={imgSrc} alt="Wallet Logo"/>
      { children }
      <FaArrowRight/>
    </button>
  );
}

export default WalletButton;