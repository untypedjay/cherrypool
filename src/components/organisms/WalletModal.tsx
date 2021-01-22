import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoggedInUpdate } from '../../context/LoggedInContext';
import Modal from './Modal';
import WalletButton from '../molecules/WalletButton';
import coinbaseLogo from '../../images/icn-coinbase-wallet.svg';
import ledgerLogo from '../../images/icn-ledger.svg';
import metamaskLogo from '../../images/icn-metamask.svg';
import { loadBlockchainData } from '../../helper/web3Helper';
import './WalletModal.css';

interface Props {
  closeModal: () => void;
};

function WalletModal({ closeModal }: Props) {
  const setIsLoggedIn = useLoggedInUpdate();
  const [isLoading, setIsLoading] = useState(false);

  const connectToCoinbase = () => {
    alert('Coming soon...');
  };

  const connectToLedger = () => {
    alert('Coming soon...');
  };

  const connectToMetamask = async () => {
    setIsLoading(true);

    if (await loadBlockchainData() && setIsLoggedIn) {
      setIsLoggedIn(true);
    }

    setIsLoading(false);
    closeModal();
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
};

export default WalletModal;