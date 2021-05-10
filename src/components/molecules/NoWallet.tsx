import React from 'react';
import PrimaryButton from '../Button/PrimaryButton';
import './NoWallet.css';

interface Props {
  onClick: () => any;
};

function NoWallet({ onClick }: Props) {
  return (
    <div className="no-wallet">
      <p className="no-wallet__text">Please connect a wallet to use Cherry Pool</p>
      <div className="no-wallet__button-container">
        <PrimaryButton onClick={onClick}>Connect Wallet</PrimaryButton>
      </div>
    </div>
  );
};

export default NoWallet;