import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Modal from './Modal';
import WalletButton from '../molecules/WalletButton';
import './WalletModal.css';
import coinbaseLogo from '../../images/icn-coinbase-wallet.svg';
import ledgerLogo from '../../images/icn-ledger.svg';
import metamaskLogo from '../../images/icn-metamask.svg';

function WalletModal({ close }) {
  const connectToCoinbase = () => {
    alert('Not yet implemented!');
  };

  const connectToLedger = () => {
    alert('Not yet implemented!');
  };

  const connectToMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.etherem);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert('Metamask browser extension is not installed.')
    }
  };

  return (
    <Modal close={close}>
      {/* Logo */}
      <h4 className="wallet-modal__heading">Connect Wallet</h4>
      <p className="wallet-modal__subheading">To start using --appname--</p>
      <div className="wallet-modal__buttons">
        <WalletButton imgSrc={coinbaseLogo} onClick={connectToCoinbase}>Coinbase Wallet</WalletButton>
        <WalletButton imgSrc={ledgerLogo} onClick={connectToLedger}>Ledger</WalletButton>
        <WalletButton imgSrc={metamaskLogo} onClick={connectToMetamask}>Metamask</WalletButton>
      </div>
      <p className="wallet-modal__terms">By connecting, I accept --appname--'s <Link to="/terms">Terms of Service</Link></p>
    </Modal>
  );
}

export default WalletModal;