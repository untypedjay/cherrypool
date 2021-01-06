import React from 'react';
import { useAccount } from '../../context/AccountContext';
import './AccountAddress.css';

interface Props {
    onClick: () => any;
    providerImg: string;
};

function AccountAddress({ onClick, providerImg }: Props) {
  const account: any = useAccount();
  return (
    <button className="account-details" onClick={onClick}>
      <img className="account-details__img" src={providerImg} alt="Wallet Provider"/>
      <p className="account-details__text">
        { `${account.substring(0, 8)}...${account.substring(account.length - 8, account.length)}` }
      </p>
    </button>
  );
};

export default AccountAddress;