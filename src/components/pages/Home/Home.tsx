import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoggedIn } from '../../../context/LoggedInContext';
import Main from '../../Main';
import WalletModal from '../../Modal/WalletModal';
import Menu from '../../Menu';
import NoWallet from '../../NoWallet';
import './Home.css';

export default function Home() {
  const location = useLocation();
  const isLoggedIn = useLoggedIn();
  const [walletModal, setWalletModal] = useState(false);

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
}
