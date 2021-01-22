import React from 'react';
import Section from '../templates/Section';
import ExchangeCard from './ExchangeCard';
import EthLogo from '../../images/icn-eth.png';
import CtnLogo from '../../images/logo-small.png';

function Swap() {

  const swapEthToCtn = (ethAmount: number) => {
    if (ethAmount === 0) {
      alert('ERROR: Amount cannot be 0!');
      return;
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