import React from 'react';
import { useWeb3 } from '../../context/Web3Context';
import Portfolio from './Portfolio';
import Swap from './Swap';
import Liquidity from './Liquidity';
import './Main.css';

interface Props {
  onAccountAddressClick: () => any;
  section: string;
}

function Main({ onAccountAddressClick, section }: Props) {

  return (
    <main className="main">
      { section === '/portfolio' && <Portfolio onAccountAddressClick={onAccountAddressClick}/> }
      { section === '/swap' && <Swap/> }
      { section === '/liquidity' && <Liquidity/> }
    </main>
  );
};

export default Main;