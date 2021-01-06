import React from 'react';
import './Main.css';
import AccountAddress from '../molecules/AccountAddress';
import metamaskLogo from '../../images/icn-metamask.svg';
import AccountBalance from '../molecules/AccountBalance';
import { useWeb3 } from '../../context/Web3Context';

interface Props {
  onAccountAddressClick: () => any;
};

function Main({ onAccountAddressClick }: Props) {
  const web3 = useWeb3();

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <main className="main">
      <AccountAddress onClick={onAccountAddressClick} providerImg={metamaskLogo}/>
      <AccountBalance/>
    </main>
  );
};

export default Main;