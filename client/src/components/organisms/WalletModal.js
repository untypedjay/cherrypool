import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from './Modal';
import WalletButton from '../molecules/WalletButton';
import { connectWeb3 } from '../../blockchainConnection';
import SimpleStorageContract from '../../contracts/SimpleStorage.json';
import { useAccountUpdate } from '../../context/AccountContext';
import { useWeb3Update } from '../../context/Web3Context';
import coinbaseLogo from '../../images/icn-coinbase-wallet.svg';
import ledgerLogo from '../../images/icn-ledger.svg';
import metamaskLogo from '../../images/icn-metamask.svg';
import '../../styles/WalletModal.css';

function WalletModal({ closeModal }) {
  const setAccount = useAccountUpdate();
  const setWeb3 = useWeb3Update();

  const connectToCoinbase = () => {
    alert('Not yet implemented!');
  };

  const connectToLedger = () => {
    alert('Not yet implemented!');
  };

  const connectToMetamask = () => {

  };


  return (
    <Modal close={closeModal}>
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

WalletModal.propTypes = {
  closeModal: PropTypes.func
};

export default WalletModal;