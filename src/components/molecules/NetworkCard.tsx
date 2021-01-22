import React, { useEffect, useState } from 'react';
import { useLoggedIn } from '../../context/LoggedInContext';
import { loadBlockchainData } from '../../helper/web3Helper';
import './NetworkCard.css';

function NetworkCard() {
  const [network, setNetwork] = useState('-');
  const isLoggedIn = useLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          web3.eth.net.getNetworkType().then((networkName: string) => {
            setNetwork(networkName.charAt(0).toUpperCase() + networkName.slice(1));
          });
        }
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="network-card">
      <p className="network-card__text--bold">Network</p>
      <p className="network-card__text">{ network }</p>
    </div>
  );
}

export default NetworkCard;