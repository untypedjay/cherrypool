import React from 'react';
import PropTypes from 'prop-types';
import { useAccount } from '../../context/AccountContext';
import '../../styles/AccountAddress.css';

function AccountAddress({ onClick, providerImg }) {
  const account = useAccount();
  return (
    <button className="account-details" onClick={onClick}>
      <img className="account-details__img" src={providerImg} alt="Wallet Provider"/>
      <p className="account-details__text">
        { `${account.substring(0, 8)}...${account.substring(account.length - 8, account.length)}` }
      </p>
    </button>
  );
}

AccountAddress.propTypes = {
  onClick: PropTypes.func,
  providerImg: PropTypes.string
};

export default AccountAddress;