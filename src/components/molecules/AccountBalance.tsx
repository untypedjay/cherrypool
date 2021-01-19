import React, { useState, useEffect } from 'react';
import { useLoggedIn } from '../../context/LoggedInContext';
import AssetCard from './AssetCard';
import { loadBlockchainData } from '../../helper/web3Helper';
import './AccountBalance.css';
import EthLogo from '../../images/icn-eth.png';
import CtnLogo from '../../images/logo-small.png';

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

    web3.eth.net.getNetworkType().then(console.log);

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
      <AssetCard icon={EthLogo} abbreviation="ETH" name="Ether" balance={etherBalance}/>
      <AssetCard icon={CtnLogo} abbreviation="CTN" name="CherryToken" balance={cherryTokenBalance}/>
      <AssetCard abbreviation="ETH-CTN" name="Liquidity Token for ETH-CTN" balance={0}/>
    </div>
  );
};

export default AccountBalance;