import React from 'react';
import Portfolio from './Portfolio';
import Swap from './Swap';
import Liquidity from './Liquidity';
import Faucet from './Faucet';
import './Main.css';

interface Props {
  section: string;
}

function Main({ section }: Props) {

  return (
    <main className="main">
      { section === '/portfolio' && <Portfolio/> }
      { section === '/swap' && <Swap/> }
      { section === '/liquidity' && <Liquidity/> }
      { section === '/faucet' && <Faucet/> }
    </main>
  );
};

export default Main;