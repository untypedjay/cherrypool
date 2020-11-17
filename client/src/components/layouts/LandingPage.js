import React, { useState } from 'react';
import Navbar from '../organisms/Navbar';
import WalletModal from '../organisms/WalletModal';
import PrimaryButton from '../atoms/PrimaryButton';
import Card from '../organisms/Card';
import '../../styles/LandingPage.css';

function LandingPage() {
  const [walletModal, setWalletModal] = useState(false);

  return (
    <div className="landing-page">
      <Navbar/>
      <h1>Welcome to Cherry Pool,</h1>
      { walletModal && <WalletModal close={() => setWalletModal(false)}/> }
      <div className="landing-page__cards">
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
    </div>
  );
}

export default LandingPage;