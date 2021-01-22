import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoggedIn } from '../../context/LoggedInContext';
import Main from '../organisms/Main';
import WalletModal from '../organisms/WalletModal';
import Menu from '../organisms/Menu';
import NoWallet from '../molecules/NoWallet';
import './Home.css';

function Home() {
  const [walletModal, setWalletModal] = useState(false);
  const location = useLocation();
  const isLoggedIn = useLoggedIn();

  return (
    <div className="home">
      { walletModal && <WalletModal closeModal={() => setWalletModal(false)}/> }
      <Menu selected={location.pathname}/>
      { isLoggedIn
        ? <Main section={location.pathname}/>
        : <main className="home__main"><NoWallet onClick={() => setWalletModal(true)}/></main>
      }
    </div>
  );
};

export default Home;