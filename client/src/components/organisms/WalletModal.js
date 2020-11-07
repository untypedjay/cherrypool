import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import './WalletModal.css';
import WalletButton from "../molecules/WalletButton";

function WalletModal({ close }) {
  return (
    <Modal close={close}>
      {/* Logo */}
      <h4 className="wallet-modal__heading">Connect Wallet</h4>
      <p className="wallet-modal__subheading">To start using --appname--</p>
      <div className="wallet-modal__buttons">
        <WalletButton>Coinbase Wallet</WalletButton>
        <WalletButton>Ledger</WalletButton>
        <WalletButton>Metamask</WalletButton>
      </div>
      <p className="wallet-modal__terms">By connecting, I accept --appname--'s <Link to="/terms">Terms of Service</Link></p>
    </Modal>
  );
}

export default WalletModal;