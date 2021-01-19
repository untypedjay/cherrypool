import React, {useEffect, useState} from 'react';
import './AccountAddress.css';
import {loadBlockchainData} from '../../helper/web3Helper';
import {useLoggedIn} from '../../context/LoggedInContext';

interface Account {
  address: string,
  cherryToken: any,
  cherryLiquidity: any
}

interface Props {
    onClick: () => any;
    providerImg: string;
};

function AccountAddress({ onClick, providerImg }: Props) {
  const isLoggedIn = useLoggedIn();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((blockchainData: Account | null) => {
        if (blockchainData) setAddress(blockchainData.address);
      });
    }
  }, []);

  return (
    <button className="account-details" onClick={onClick}>
      <img className="account-details__img" src={providerImg} alt="Wallet Provider"/>
      <p className="account-details__text">
        { address }
      </p>
    </button>
  );
};

export default AccountAddress;