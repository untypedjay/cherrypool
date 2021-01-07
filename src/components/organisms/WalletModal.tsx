import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import WalletButton from '../molecules/WalletButton';
import { useAccountUpdate } from '../../context/AccountContext';
import { useWeb3Update } from '../../context/Web3Context';
import coinbaseLogo from '../../images/icn-coinbase-wallet.svg';
import ledgerLogo from '../../images/icn-ledger.svg';
import metamaskLogo from '../../images/icn-metamask.svg';
import './WalletModal.css';
import Web3 from 'web3';
import CherryToken from '../../abis/CherryToken.json';
import CherrySwap from '../../abis/CherrrySwap.json';

interface Props {
  closeModal: () => void;
};

function WalletModal({ closeModal }: Props) {
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

  const loadBlockchainData = async () => {
    const web3 = (window as any).web3;

    const accounts = await web3.eth.getAccounts();
    if (setAccount) {
      setAccount(accounts[0]);
    }

    const networkId = await web3.eth.net.getId();

    // load CherryToken
    const cherryTokenData = CherryToken.networks[networkId];
    if (cherryTokenData) {

    }
  }

  const loadWeb3 = async () => {
    if ((window as any).ethereum) {
      (window as any).web3 = new Web3((window as any).ethereum)
      await (window as any).ethereum.enable()
    } else if ((window as any).web3) {
      (window as any).web3 = new Web3((window as any).web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
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