import React, { useEffect, useState } from 'react';
import { useLoggedIn } from '../../context/LoggedInContext';
import Section from '../templates/Section';
import AddOrRemoveLiquidity from '../molecules/AddOrRemoveLiquidity';
import LiquidityCard from '../molecules/LiquidityCard';
import { loadBlockchainData } from '../../helper/web3Helper';
import { round } from '../../helper/converter';
import EthIcon from '../../images/icn-eth.png';
import CtnIcon from '../../images/logo-small.png';
import './Liquidity.css';

function Liquidity() {
  const isLoggedIn = useLoggedIn();
  const [pooledEthBalance, setPooledEthBalance] = useState(0);
  const [pooledCtnBalance, setPooledCtnBalance] = useState(0);
  const [totalEtherPool, setTotalEtherPool] = useState(0);
  const [totalCherryTokenPool, setTotalCherryTokenPool] = useState(0);
  const [pooledRewards, setPooledRewards] = useState(0);
  const [liquidityTokenBalance, setLiquidityTokenBalance] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          account.cherryPool.methods.getLiquidityTokenBalances(account.address).call().then((value: number) => {

            setLiquidityTokenBalance(web3.utils.fromWei(value.toString()));
          });

          account.cherryPool.methods.getEthBalance().call().then((value: number) => {
            setTotalEtherPool(parseFloat(web3.utils.fromWei(value.toString())));
          });

          account.cherryPool.methods.getCtnBalance().call().then((value: number) => {
            setTotalCherryTokenPool(parseFloat(web3.utils.fromWei(value.toString())));
          });

          account.cherryPool.methods.getCollectedFees().call().then((value: number) => {
            setPooledRewards(parseFloat(web3.utils.fromWei(value.toString())));
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

  const addLiquidity = async (ethToSupply: number) => {
    if (ethToSupply === 0) {
      alert('ERROR: Amount cannot be 0!');
      return;
    }

    if (isLoggedIn) {
      loadBlockchainData().then((account) => {

        const web3 = (window as any).web3;

        const ctnToSupply = ethToSupply * 1000;
        const liquidityTokensToAdd = Math.sqrt(ethToSupply * ctnToSupply);

        if (account) {

          account.cherryToken.methods.approve(account.cherryPool._address, web3.utils.toWei(ctnToSupply.toString())).send({ from: account.address }).then();

          account.cherryPool.methods.addLiquidity(web3.utils.toWei(ctnToSupply.toString()), web3.utils.toWei(liquidityTokensToAdd.toString()))
            .send({ from: account.address, value: web3.utils.toWei(ethToSupply.toString()) })
            .then();
        }
      });
    }
  };

  const removeLiquidity = (ethToRemove: number) => {
    if (ethToRemove === 0) {
      alert('ERROR: Amount cannot be 0!');
      return;
    }

    if (ethToRemove > pooledEthBalance) {
      alert('ERROR: Amount is higher than pooled funds!');
      return;
    }

    const ctnToRemove = ethToRemove * 1000;
    const liquidityTokensToRemove = Math.sqrt(ethToRemove * ctnToRemove);

    const poolPercentage = liquidityTokensToRemove / Math.sqrt(totalEtherPool * totalCherryTokenPool);
    const rewardsReceived = pooledRewards * poolPercentage;

    if (isLoggedIn) {
      loadBlockchainData().then((account) => {

        const web3 = (window as any).web3;

        if (account) {

          account.cherryPool.methods.removeLiquidity(
            web3.utils.toWei(ethToRemove.toString()),
            web3.utils.toWei(ctnToRemove.toString()),
            web3.utils.toWei(liquidityTokensToRemove.toString()),
            web3.utils.toWei(rewardsReceived.toString()))
            .send({ from: account.address }).then();
        }
      });
    }
  };

  return (
    <div className="liquidity">
      <div className="liquidity__container">
        <Section title="Your Liquidity">
          <LiquidityCard
            logo1={EthIcon}
            logo2={CtnIcon}
            abbreviation1="ETH"
            abbreviation2="CTN"
            apy={pooledRewards}
            poolValue1={round(pooledEthBalance, 8)}
            poolValue2={round(pooledCtnBalance - pooledRewards, 8)}
            poolShare={ (liquidityTokenBalance / Math.sqrt(totalEtherPool * totalCherryTokenPool)) }
          />
        </Section>
        <Section title="Total Liquidity">
          <div className="liquidity__info-card">
            <p>Total Pooled ETH: { round(totalEtherPool, 8) }</p>
            <p>Total Pooled CTN: { round(totalCherryTokenPool, 8) }</p>
            <p>Total Pooled Rewards (in CTN): { round(pooledRewards, 8) }</p>
          </div>
        </Section>
      </div>

      <Section title="Add Liquidity">
        <AddOrRemoveLiquidity action={addLiquidity} buttonText="Supply"/>
      </Section>
      <Section title="Remove Liquidity">
        <AddOrRemoveLiquidity action={removeLiquidity} buttonText="Confirm"/>
      </Section>
    </div>
  );
}

export default Liquidity;