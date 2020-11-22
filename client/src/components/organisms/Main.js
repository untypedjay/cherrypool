import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Main.css';
import AccountAddress from '../atoms/AccountAddress';
import metamaskLogo from '../../images/icn-metamask.svg';
import AccountBalance from '../molecules/AccountBalance';

function Main({ onAccountAddressClick }) {
  return (
    <div className="main">
      <AccountAddress onClick={onAccountAddressClick} providerImg={metamaskLogo}/>
      <AccountBalance/>
    </div>
  );
}

Main.propTypes = {
  onAccountAddressClick: PropTypes.func
};

export default Main;