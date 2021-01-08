import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Modal from './Modal';
import WalletButton from '../molecules/WalletButton';
import {useAccountUpdate} from '../../context/AccountContext';
import {useWeb3Update} from '../../context/Web3Context';
import coinbaseLogo from '../../images/icn-coinbase-wallet.svg';
import ledgerLogo from '../../images/icn-ledger.svg';
import metamaskLogo from '../../images/icn-metamask.svg';
import './WalletModal.css';
import Web3 from 'web3';
import CherryToken from '../../abis/CherryToken.json';
import CherryLiquidity from '../../abis/CherryLiquidity.json';
import {useCherryTokenUpdate} from '../../context/CherryTokenContext';
import {useCherryLiquidityUpdate} from '../../context/CherryLiquidityContext';

interface Props {
  closeModal: () => void;
};

function WalletModal({ closeModal }: Props) {
  const setAccount = useAccountUpdate();
  const setCherryToken = useCherryTokenUpdate();
  const setCherryLiquidity = useCherryLiquidityUpdate();
  const setWeb3 = useWeb3Update();
  const [isLoading, setIsLoading] = useState(false);

  const connectToCoinbase = () => {
    alert('Not yet implemented!');
  };

  const connectToLedger = () => {
    alert('Not yet implemented!');
  };

  const connectToMetamask = () => {
    loadWeb3().then(() => loadBlockchainData());
  };

  const loadBlockchainData = async () => {
    setIsLoading(true);
    const web3 = (window as any).web3;
    setWeb3(web3);

    const accounts = await web3.eth.getAccounts();
    if (setAccount) {
      setAccount(accounts[0]);
    }

    const networkId = await web3.eth.net.getId();

    // load CherryToken
    const cherryTokenData = (CherryToken as any).networks[networkId];
    if (cherryTokenData) {
      const cherryToken = new web3.eth.Contract(CherryToken.abi, cherryTokenData.address);
      if (setCherryToken) {
        setCherryToken(cherryToken);
      }
    } else {
      console.error('CherryToken contract not deployed to detected network!');
    }


    // load CherryLiquidity
    const cherryLiquidityData = (CherryLiquidity as any).networks[networkId];
    if (cherryLiquidityData) {
      const cherryLiquidity = new web3.eth.Contract(CherryLiquidity.abi, cherryLiquidityData.address);
      if (setCherryLiquidity) {
        setCherryLiquidity(cherryLiquidity);
      }
    } else {
      console.error('CherryLiquidity contract not deployed to detected network!');
    }
    setIsLoading(false);
    closeModal();
  };

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