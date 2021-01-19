import React, { useState, useEffect } from 'react';
import { useLoggedIn } from '../../context/LoggedInContext';
import './AccountBalance.css';
import { loadBlockchainData } from '../../helper/web3Helper';

interface Account {
  address: string,
  cherryToken: any,
  cherryLiquidity: any
}

function AccountBalance() {
  const isLoggedIn = useLoggedIn();
  const [etherBalance, setEtherBalance] = useState(0);
  const [cherryTokenBalance, setCherryTokenBalance] = useState(0);

  useEffect(() => {
    const web3 = (window as any).web3;

    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        if (account) {
          web3.eth.getBalance(account.address, (err: any, balance: any) => {
            setEtherBalance(web3.utils.fromWei(balance, 'ether'));
          });

          account.cherryToken.methods.balanceOf(account.address).call().then((ctnBalance: number) => {
            setCherryTokenBalance(ctnBalance);
          });
        }
      })
    }
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