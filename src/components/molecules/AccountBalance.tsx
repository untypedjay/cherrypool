import React, { useState, useEffect } from 'react';
import { useLoggedIn } from '../../context/LoggedInContext';
import AssetCard from './AssetCard';
import { loadBlockchainData } from '../../helper/web3Helper';
import { round } from '../../helper/converter';
import './AccountBalance.css';
import EthLogo from '../../images/icn-eth.png';
import CtnLogo from '../../images/logo-small.png';

function AccountBalance() {
  const isLoggedIn = useLoggedIn();
  const [etherBalance, setEtherBalance] = useState(0);
  const [cherryTokenBalance, setCherryTokenBalance] = useState(0);
  const [liquidityTokenBalance, setLiquidityTokenBalance] = useState(0);
  const [pooledEthBalance, setPooledEthBalance] = useState(0);
  const [pooledCtnBalance, setPooledCtnBalance] = useState(0);
  const [totalEtherPool, setTotalEtherPool] = useState(0);
  const [totalCherryTokenPool, setTotalCherryTokenPool] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          web3.eth.getBalance(account.address, (err: any, balance: any) => {
            setEtherBalance(web3.utils.fromWei(balance, 'ether'));
          });

          account.cherryToken.methods.balanceOf(account.address).call().then((ctnBalance: number) => {
            setCherryTokenBalance(web3.utils.fromWei(ctnBalance.toString()));
          });

          account.cherryPool.methods.getLiquidityTokenBalance(account.address).call().then((value: number) => {
            setLiquidityTokenBalance(web3.utils.fromWei(value.toString()));
          });

          account.cherryPool.methods.getEthBalance().call().then((value: number) => {
            setTotalEtherPool(parseFloat(web3.utils.fromWei(value.toString())));
          });

          account.cherryPool.methods.getCtnBalance().call().then((value: number) => {
            setTotalCherryTokenPool(parseFloat(web3.utils.fromWei(value.toString())));
          });
        }
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const poolPercentage = liquidityTokenBalance / Math.sqrt(totalEtherPool * totalCherryTokenPool);
    setPooledEthBalance(poolPercentage * totalEtherPool);
    setPooledCtnBalance(poolPercentage * totalCherryTokenPool);
  }, [totalEtherPool, totalCherryTokenPool]);


  return (
    <div className="account-balance">
      { etherBalance > 0 &&
        <AssetCard icon={EthLogo} abbreviation="ETH" name="Ether" balance={etherBalance}/>
      }
      { cherryTokenBalance > 0 &&
        <AssetCard icon={CtnLogo} abbreviation="CTN" name="CherryToken" balance={cherryTokenBalance}/>
      }
      { liquidityTokenBalance > 0 &&
        <AssetCard abbreviation="ETH-CTN" name="Liquidity Token for ETH-CTN" balance={liquidityTokenBalance}/>
      }
    </div>
  );
};

export default AccountBalance;