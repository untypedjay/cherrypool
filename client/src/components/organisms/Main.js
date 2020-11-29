import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Main.css';
import AccountAddress from '../molecules/AccountAddress';
import metamaskLogo from '../../images/icn-metamask.svg';
import AccountBalance from '../molecules/AccountBalance';
import { useWeb3 } from '../../context/Web3Context';

function Main({ onAccountAddressClick }) {
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
}

Main.propTypes = {
  onAccountAddressClick: PropTypes.func
};

export default Main;