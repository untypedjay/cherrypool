import React from 'react';
import Section from '../templates/Section';
import LiquidityCard from '../molecules/LiquidityCard';
import EthIcon from '../../images/icn-eth.png';
import CtnIcon from '../../images/logo-small.png';

function Liquidity() {
  return (
    <div className="liquidity">
      <Section title="Your Liquidity">
        <LiquidityCard
          logo1={EthIcon}
          logo2={CtnIcon}
          abbreviation1="ETH"
          abbreviation2="CTN"
          apy={-99.99}
          poolValue1={-1}
          poolValue2={-1}
          poolShare={-0.1}
        />
      </Section>
      <Section title="Add Liquidity">

      </Section>
      <Section title="Remove Liquidity">

      </Section>
    </div>
  );
}

export default Liquidity;