import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccount } from '../../context/AccountContext';
import Main from '../organisms/Main';
import WalletModal from '../organisms/WalletModal';
import Menu from '../organisms/Menu';
import NoWallet from '../molecules/NoWallet';
import './Home.css';

function Home() {
  const [walletModal, setWalletModal] = useState(false);
  const location = useLocation();
  const account = useAccount();

  return (
    <div className="home">
      { walletModal && <WalletModal closeModal={() => setWalletModal(false)}/> }
      <Menu selected={location.pathname}/>
      { account
        ? <Main onAccountAddressClick={() => setWalletModal(true)} section={location.pathname}/>
        : <main className="home__main"><NoWallet onClick={() => setWalletModal(true)}/></main>
      }
    </div>
  );
};

export default Home;