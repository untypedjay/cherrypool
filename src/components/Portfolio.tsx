import React from 'react';
import Section from './Section/Section';
import AccountAddress from './AccountAddress';
import AccountBalance from './AccountBalance';
import NetworkCard from './Card/NetworkCard';
import MetamaskLogo from '../images/icn-metamask.svg';

function Portfolio() {
  return (
    <div className="portfolio">
      <Section title="Address">
        <AccountAddress providerImg={MetamaskLogo}/>
        <NetworkCard/>
      </Section>

      <Section title="Assets">
        <AccountBalance/>
      </Section>
    </div>
  );
};

export default Portfolio;