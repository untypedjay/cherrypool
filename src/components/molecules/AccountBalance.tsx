import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { useAccount } from '../../context/AccountContext';
import './AccountBalance.css';
import {useCherryLiquidity} from '../../context/CherryLiquidityContext';

function AccountBalance() {
  const web3: any = useWeb3();
  const account = useAccount();
  const [etherBalance, setEtherBalance] = useState(0);
  const [cherryTokenBalance, setCherryTokenBalance] = useState(0);
  const cherryLiquidity = useCherryLiquidity();

  useEffect(() => {
    web3.eth.getBalance(account, (err: any, balance: any) => {
      setEtherBalance(web3.utils.fromWei(balance, 'ether'));
    });
    console.log(cherryLiquidity)
    cherryLiquidity.methods.getCtnBalance().call().then((data: number) => {
      setCherryTokenBalance(data);
    });
    //const cherryTokenBalance = await cherryToken.methods.balanceOf().call();
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