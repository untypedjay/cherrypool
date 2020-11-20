import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Modal from './Modal';
import WalletButton from '../molecules/WalletButton';
import '../../styles/WalletModal.css';
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
      <div className="wallet-modal__header">
        <span className="wallet-modal__mark"></span>
        <h4 className="wallet-modal__heading">Connect Wallet</h4>
        <p className="wallet-modal__subheading">To start using Cherry Pool</p>
      </div>
      <div className="wallet-modal__buttons">
        <WalletButton imgSrc={coinbaseLogo} onClick={connectToCoinbase}><p className="wallet-modal__text">Coinbase Wallet</p></WalletButton>
        <WalletButton imgSrc={ledgerLogo} onClick={connectToLedger}><p className="wallet-modal__text">Ledger</p></WalletButton>
        <WalletButton imgSrc={metamaskLogo} onClick={connectToMetamask}><p className="wallet-modal__text">Metamask</p></WalletButton>
      </div>
      <p className="wallet-modal__terms">By connecting, I accept Cherry Pool's <Link to="/terms-of-use">Terms of Use</Link></p>
    </Modal>
  );
}

export default WalletModal;