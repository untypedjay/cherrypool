import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../atoms/PrimaryButton';
import '../../styles/NoWallet.css';

function NoWallet({ onClick }) {
  return (
    <div className="no-wallet">
      <p className="no-wallet__text">Please connect a wallet to use Cherry Pool</p>
      <div className="no-wallet__button-container">
        <PrimaryButton onClick={onClick}>Connect Wallet</PrimaryButton>
      </div>
    </div>
  );
}

NoWallet.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NoWallet;