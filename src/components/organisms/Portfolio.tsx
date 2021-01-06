import React from 'react';
import AccountAddress from '../molecules/AccountAddress';
import AccountBalance from '../molecules/AccountBalance';
import MetamaskLogo from '../../images/icn-metamask.svg';

interface Props {
  onAccountAddressClick: () => void;
}

function Portfolio({ onAccountAddressClick }: Props) {
  return (
    <div className="portfolio">
      <AccountAddress onClick={onAccountAddressClick} providerImg={MetamaskLogo}/>
      <AccountBalance/>
    </div>
  );
};

export default Portfolio;