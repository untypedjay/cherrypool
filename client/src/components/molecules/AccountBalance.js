import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWeb3 } from '../../context/Web3Context';
import { useAccount } from '../../context/AccountContext';
import '../../styles/AccountBalance.css';

function AccountBalance() {
  const web3 = useWeb3();
  const account = useAccount();
  const [etherBalance, setEtherBalance] = useState(0);

  useEffect(() => {
    web3.eth.getBalance(account, (err, balance) => {
      setEtherBalance(web3.utils.fromWei(balance, 'ether'));
    });
  }, []);

  return (
    <div className="account-balance">
      <p>{ etherBalance } ETH</p>
    </div>
  );
}

export default AccountBalance;