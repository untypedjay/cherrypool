import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Home.css';
import WalletModal from '../organisms/WalletModal';
import Menu from '../organisms/Menu';
import NoWallet from '../molecules/NoWallet';

function Home() {
  const [walletModal, setWalletModal] = useState(false);
  const [account, setAccount] = useState('');
  const location = useLocation();

  return (
    <div className="home">
      { walletModal && <WalletModal close={() => setWalletModal(false)}/> }
      <Menu selected={location.pathname}/>
      <main className="home__main">
        { !account && <NoWallet onClick={() => setWalletModal(true)}/> }
      </main>
    </div>
  );
}

export default Home;