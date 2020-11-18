import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import WalletModal from '../organisms/WalletModal';
import PrimaryButton from '../atoms/PrimaryButton';
import Card from '../organisms/Card';
import Footer from '../organisms/Footer';
import '../../styles/LandingPage.css';

function LandingPage() {
  const [walletModal, setWalletModal] = useState(false);
  const serviceRef = useRef(null);
  const history = useHistory();

  return (
    <div className="landing-page">
      { walletModal && <WalletModal close={() => setWalletModal(false)}/> }
      <Navbar/>
      <div className="landing-page__hero">
        <h1 className="landing-page__heading">Banking, but</h1>
        <h1 className="landing-page__heading">sweet as cherries</h1>
        <div className="landing-page__paragraph-container">
          <p className="landing-page__paragraph">A decentralized, open source DeFi platform.</p>
          <p className="landing-page__paragraph">Stake, lend or exchange tokens on the Ethereum network.</p>
        </div>
        <div className="landing-page__cta">
          <PrimaryButton onClick={() => serviceRef.current.scrollIntoView()}>Get Started</PrimaryButton>
        </div>
      </div>

      <div className="landing-page__services" ref={serviceRef}>
        <Card heading="Borrow Crypto" button={<PrimaryButton onClick={() => history.push('/borrow')}>Borrow</PrimaryButton>}>
          <p className="landing-page__paragraph--card">Borrow cryptocurrencies and ERC20 tokens without the bureaucracy of a centralized agency.</p>
        </Card>
        <Card heading="Exchange Crypto" button={<PrimaryButton onClick={() => history.push('/exchange')}>Exchange</PrimaryButton>}>
          <p className="landing-page__paragraph--card">Exchange your cryptocurrencies and ERC20 tokens in a decentralized way.</p>
        </Card>
        <Card heading="Stake Crypto" button={<PrimaryButton onClick={() => history.push('/stake')}>Stake</PrimaryButton>}>
          <p className="landing-page__paragraph--card">Do more with your crypto assets. Invest them and earn passive income.</p>
        </Card>
      </div>

      <Footer/>
    </div>
  );
}

export default LandingPage;