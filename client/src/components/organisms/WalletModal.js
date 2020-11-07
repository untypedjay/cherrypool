import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import WalletButton from '../molecules/WalletButton';
import './WalletModal.css';
import coinbaseLogo from '../../images/icn-coinbase-wallet.svg';
import ledgerLogo from '../../images/icn-ledger.svg';
import metamaskLogo from '../../images/icn-metamask.svg';

function WalletModal({ close }) {
  return (
    <Modal close={close}>
      {/* Logo */}
      <h4 className="wallet-modal__heading">Connect Wallet</h4>
      <p className="wallet-modal__subheading">To start using --appname--</p>
      <div className="wallet-modal__buttons">
        <WalletButton imgSrc={coinbaseLogo} onClick={() => alert('Not yet implemented')}>Coinbase Wallet</WalletButton>
        <WalletButton imgSrc={ledgerLogo} onClick={() => alert('Not yet implemented')}>Ledger</WalletButton>
        <WalletButton imgSrc={metamaskLogo} onClick={() => alert('Not yet implemented')}>Metamask</WalletButton>
      </div>
      <p className="wallet-modal__terms">By connecting, I accept --appname--'s <Link to="/terms">Terms of Service</Link></p>
    </Modal>
  );
}

export default WalletModal;