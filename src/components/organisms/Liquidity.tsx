import React, { useEffect, useState } from 'react';
import { useLoggedIn } from '../../context/LoggedInContext';
import Section from '../templates/Section';
import AddOrRemoveLiquidity from '../molecules/AddOrRemoveLiquidity';
import LiquidityCard from '../molecules/LiquidityCard';
import { loadBlockchainData } from '../../helper/web3Helper';
import EthIcon from '../../images/icn-eth.png';
import CtnIcon from '../../images/logo-small.png';

function Liquidity() {
  const isLoggedIn = useLoggedIn();
  const [pooledEthBalance, setPooledEthBalance] = useState(0);
  const [pooledCtnBalance, setPooledCtnBalance] = useState(0);
  const [totalEtherPool, setTotalEtherPool] = useState(0);
  const [totalCherryTokenPool, setTotalCherryTokenPool] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          account.cherryPool.methods.getPooledEthFunds(account.address).call().then((value: number) => {
            setPooledEthBalance(parseFloat(web3.utils.fromWei(value.toString())));
          });

          account.cherryPool.methods.getPooledCtnFunds(account.address).call().then((value: number) => {
            setPooledCtnBalance(parseFloat(web3.utils.fromWei(value.toString())));
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

  const addLiquidity = async (ethToSupply: number) => {
    if (ethToSupply === 0) {
      alert('ERROR: Amount cannot be 0!');
      return;
    }

    if (isLoggedIn) {
      loadBlockchainData().then((account) => {

        const web3 = (window as any).web3;

        if (account) {
          const ctnToSupply = ethToSupply * 1000;
          account.cherryToken.methods.approve(account.cherryPool._address, web3.utils.toWei(ctnToSupply.toString())).send({ from: account.address }).then();

          account.cherryPool.methods.addLiquidity(web3.utils.toWei(ctnToSupply.toString()))
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

    if (ethToRemove > pooledEthBalance) alert('ERROR: Amount is higher than pooled funds!');

    if (isLoggedIn) {
      loadBlockchainData().then((account) => {

        const web3 = (window as any).web3;

        if (account) {
          const ctnToRemove = ethToRemove * 1000;
          account.cherryPool.methods.removeLiquidity(
            web3.utils.toWei(ethToRemove.toString()),
            web3.utils.toWei(ctnToRemove.toString()),
            web3.utils.toWei('0'))
            .send({ from: account.address }).then();
        }
      });
    }
  };

  return (
    <div className="liquidity">
      <Section title="Your Liquidity">
        <LiquidityCard
          logo1={EthIcon}
          logo2={CtnIcon}
          abbreviation1="ETH"
          abbreviation2="CTN"
          apy={0}
          poolValue1={pooledEthBalance}
          poolValue2={pooledCtnBalance}
          poolShare={ pooledEthBalance / totalEtherPool * 100 }
        />
      </Section>
      <Section title="Total Liquidity">
        <>
          <p>Total Pooled ETH: { totalEtherPool }</p>
          <p>Total Pooled CTN: { totalCherryTokenPool }</p>
        </>
      </Section>
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