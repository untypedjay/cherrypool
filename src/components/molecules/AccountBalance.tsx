import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { useAccount } from '../../context/AccountContext';
import './AccountBalance.css';

function AccountBalance() {
  const web3: any = useWeb3();
  const account = useAccount();
  const [etherBalance, setEtherBalance] = useState(0);
  const [cherryTokenBalance, setCherryTokenBalance] = useState(0);

  useEffect(() => {
    web3.eth.getBalance(account, (err: any, balance: any) => {
      setEtherBalance(web3.utils.fromWei(balance, 'ether'));
    });
  }, []);

  return (
    <div className="account-balance">
      <h3>Assets</h3>
      <p>{ etherBalance } ETH</p>
      <p>{ cherryTokenBalance } CTN</p>
    </div>
  );
};

export default AccountBalance;