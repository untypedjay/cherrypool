import React, { useState } from 'react';
import Navbar from '../organisms/Navbar';
import WalletModal from '../organisms/WalletModal';
import PrimaryButton from '../atoms/PrimaryButton';
import Card from '../organisms/Card';
import Footer from '../organisms/Footer';
import '../../styles/LandingPage.css';

function LandingPage() {
  const [walletModal, setWalletModal] = useState(false);

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
          <PrimaryButton onClick={() => setWalletModal(true)}>Get Started</PrimaryButton>
        </div>
      </div>

      <div className="landing-page__services">
        <Card heading="Borrow Crypto" button={<PrimaryButton onClick={() => setWalletModal(true)}>Borrow</PrimaryButton>}>
          <p>Borrow cryptocurrencies and ERC20 tokens without the bureaucracy of a centralized agency.</p>
        </Card>
        <Card heading="Exchange Crypto" button={<PrimaryButton onClick={() => setWalletModal(true)}>Exchange</PrimaryButton>}>
          <p>Exchange your cryptocurrencies and ERC20 tokens in a decentralized way.</p>
        </Card>
        <Card heading="Stake Crypto" button={<PrimaryButton onClick={() => setWalletModal(true)}>Stake</PrimaryButton>}>
          <p>Do more with your crypto assets. Invest them and earn passive income.</p>
        </Card>
      </div>

      <Footer/>
    </div>
  );
}

export default LandingPage;