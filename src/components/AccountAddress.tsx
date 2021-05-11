import React, { useEffect, useState } from 'react';
import { loadBlockchainData} from '../helper/web3Helper';
import { useLoggedIn, useLoggedInUpdate } from '../context/LoggedInContext';
import PrimaryButton from './Button/PrimaryButton';
import './AccountAddress.css';

interface Account {
  address: string,
  cherryToken: any,
  cherryPool: any
}

interface Props {
    providerImg: string;
};

function AccountAddress({ providerImg }: Props) {
  const isLoggedIn = useLoggedIn();
  const setIsLoggedIn = useLoggedInUpdate();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((blockchainData: Account | null) => {
        if (blockchainData) setAddress(blockchainData.address);
      });
    }
  }, [isLoggedIn]);

  const disconnectWallet = () => {
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="account-address">
      <img className="account-address__img" src={providerImg} alt="Wallet Provider"/>
      <p className="account-address__text">
        { address }
      </p>
      <PrimaryButton onClick={disconnectWallet}>Disconnect</PrimaryButton>
    </div>
  );
};

export default AccountAddress;