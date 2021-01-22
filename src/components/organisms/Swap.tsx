import React from 'react';
import { useLoggedIn } from '../../context/LoggedInContext';
import Section from '../templates/Section';
import ExchangeCard from './ExchangeCard';
import { loadBlockchainData } from '../../helper/web3Helper';
import EthLogo from '../../images/icn-eth.png';
import CtnLogo from '../../images/logo-small.png';

function Swap() {
  const isLoggedIn = useLoggedIn();

  const swapEthToCtn = (ethAmount: number) => {
    if (ethAmount === 0) {
      alert('ERROR: Amount cannot be 0!');
      return;
    }

    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          account.cherryPool.methods.swapEthToCtn()
            .send({ from: account.address, value: web3.utils.toWei(ethAmount.toString()) }).then((response: any) => {
              const decoded = web3.utils.hexToNumberString(response.events[0].raw.data);
              alert(`Changed ${ethAmount} ETH to ${web3.utils.fromWei(decoded)} CTN.`);
          });
        }
      });
    }
  };

  const swapCtnToEth = (ctnAmount: number) => {
    if (ctnAmount === 0) {
      alert('ERROR: Amount cannot be 0!');
      return;
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