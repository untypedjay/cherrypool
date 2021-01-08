import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { useAccount } from '../../context/AccountContext';
import './AccountBalance.css';
import {useCherryToken} from '../../context/CherryTokenContext';

function AccountBalance() {
  const web3: any = useWeb3();
  const account = useAccount();
  const [etherBalance, setEtherBalance] = useState(0);
  const [cherryTokenBalance, setCherryTokenBalance] = useState(0);
  const cherryToken = useCherryToken();

  useEffect(() => {
    web3.eth.getBalance(account, (err: any, balance: any) => {
      setEtherBalance(web3.utils.fromWei(balance, 'ether'));
    });

    /*cherryLiquidity.methods.getCtnBalance().call().then((data: number) => {
      setCherryTokenBalance(data);
    });*/

    console.log(cherryToken);
    cherryToken.methods.balanceOf(account).call().then((ctnBalance: number) => {
      setCherryTokenBalance(ctnBalance);
    });
  }, []);

  return (
    <div className="account-balance">
      <h3>Assets</h3>
      <p>Ether: { etherBalance } ETH</p>
      <p>CherryToken: { cherryTokenBalance } CTN</p>
    </div>
  );
};

export default AccountBalance;