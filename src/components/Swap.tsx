import React, { useEffect, useState } from 'react';
import { useLoggedIn } from '../context/LoggedInContext';
import Section from './Section/Section';
import ExchangeCard from './Card/ExchangeCard';
import { loadBlockchainData } from '../helper/web3Helper';
import { calculateAssetPair } from '../helper/converter';
import EthLogo from '../images/icn-eth.png';
import CtnLogo from '../images/logo-small.png';

function Swap() {
  const isLoggedIn = useLoggedIn();
  const [totalEtherPool, setTotalEtherPool] = useState(0);
  const [totalCherryTokenPool, setTotalCherryTokenPool] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
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

  const calculateFees = (ctnAmount: number) => {
    return ctnAmount * 0.01;
  }

  const swapEthToCtn = (ethAmount: number) => {
    if (ethAmount === 0) {
      alert('ERROR: Amount cannot be 0!');
      return;
    }

    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        const toWei = (amountInTokens: number) => {
          return web3.utils.toWei(amountInTokens.toString());
        }

        if (account) {
          const ctnAmount = calculateAssetPair(totalCherryTokenPool, totalEtherPool, ethAmount);
          const fees = calculateFees(ctnAmount);
          const ctnOutput = ctnAmount - fees;

          account.cherryPool.methods.swapEthToCtn(toWei(ctnOutput), toWei(fees))
            .send({ from: account.address, value: toWei(ethAmount) }).then(() => {
              alert(`Changed ${ethAmount} ETH to ${ctnOutput} CTN.`);
            }
          );
        }
      });
    }
  };

  const swapCtnToEth = (ctnAmount: number) => {
    if (ctnAmount === 0) {
      alert('ERROR: Amount cannot be 0!');
      return;
    }

    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        const toWei = (amountInTokens: number) => {
          return web3.utils.toWei(amountInTokens.toString());
        }

        if (account) {
          const fees = calculateFees(ctnAmount);
          const ethOutput = calculateAssetPair(totalEtherPool, totalCherryTokenPool, ctnAmount - fees);

          account.cherryToken.methods.approve(
            account.cherryPool._address,
            toWei(ctnAmount)).send({ from: account.address }
          ).then();

          account.cherryPool.methods.swapCtnToEth(toWei(ctnAmount), toWei(ethOutput), toWei(fees))
            .send({ from: account.address }).then(() => {
              alert(`Changed ${ctnAmount} CTN to ${ethOutput} ETH.`);
            }
          );
        }
      });
    }
  };

  return (
    <div className="swap">
      <Section title="Exchange Ether to CherryToken">
        <ExchangeCard logo={EthLogo} action={swapEthToCtn} buttonText="Swap"/>
      </Section>

      <Section title="Exchange CherryToken to Ether">
        <ExchangeCard logo={CtnLogo} action={swapCtnToEth} buttonText="Swap"/>
      </Section>
    </div>
  );
}

export default Swap;