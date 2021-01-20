import React, { useEffect, useState } from 'react';
import { loadBlockchainData} from '../../helper/web3Helper';
import { useLoggedIn, useLoggedInUpdate } from '../../context/LoggedInContext';
import PrimaryButton from '../atoms/PrimaryButton';
import './AccountAddress.css';

interface Account {
  address: string,
  cherryToken: any,
  cherryPool: any
}

interface Props {
    onClick: () => any;
    providerImg: string;
};

function AccountAddress({ onClick, providerImg }: Props) {
  const isLoggedIn = useLoggedIn();
  const setIsLoggedIn = useLoggedInUpdate();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((blockchainData: Account | null) => {
        if (blockchainData) setAddress(blockchainData.address);
      });
    }
  }, []);

  const disconnectWallet = () => {
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="account-details">
      <img className="account-details__img" src={providerImg} alt="Wallet Provider"/>
      <p className="account-details__text">
        { address }
      </p>
      <PrimaryButton onClick={disconnectWallet}>Disconnect</PrimaryButton>
    </div>
  );
};

export default AccountAddress;