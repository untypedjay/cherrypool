import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/AccountDetails.css';

function AccountDetails({ onClick, providerImg, address }) {
  return (
    <button className="account-details" onClick={onClick}>
      <img className="account-details__img" src={providerImg} alt="Wallet Provider"/>
      <p className="account-details__text">{address}</p>
    </button>
  );
}

AccountDetails.propTypes = {
  onClick: PropTypes.func,
  providerImg: PropTypes.string,
  address: PropTypes.string
};

export default AccountDetails;