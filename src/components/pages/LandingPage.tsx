import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import PrimaryButton from '../atoms/PrimaryButton';
import Card from '../organisms/Card';
import Footer from '../organisms/Footer';
import './LandingPage.css';

function LandingPage() {
  const serviceRef = useRef<any>(null);
  const history = useHistory();

    return (
    <div className="landing-page">
      <Navbar/>
      <div className="landing-page__hero">
        <h1 className="landing-page__heading">Finance, but</h1>
        <h1 className="landing-page__heading">sweet as cherries</h1>
        <div className="landing-page__paragraph-container">
          <p className="landing-page__paragraph">A decentralized, open source DeFi testing platform.</p>
          <p className="landing-page__paragraph">Learn more about Decentralized Finance by using Liquidity Pools and a Decentralized Exchange.</p>
        </div>
        <div className="landing-page__cta">
          <PrimaryButton onClick={() => serviceRef.current.scrollIntoView()}>Get Started</PrimaryButton>
        </div>
      </div>

      <div className="landing-page__services" ref={serviceRef}>
        <Card heading="Liquidity Pool" button={<PrimaryButton onClick={() => history.push('/lending')}>Borrow</PrimaryButton>}>
          <p className="landing-page__paragraph--card">Provide liquidity and earn passive income.</p>
        </Card>
        <Card heading="DEX" button={<PrimaryButton onClick={() => history.push('/swap')}>Exchange</PrimaryButton>}>
          <p className="landing-page__paragraph--card">Exchange your Ether for CherryTokens and vice versa completely decentralized.</p>
        </Card>
        <Card heading="Token Faucet" button={<PrimaryButton onClick={() => history.push('/faucet')}>Stake</PrimaryButton>}>
          <p className="landing-page__paragraph--card">Request CherryTokens from the faucet for testing purposes.</p>
        </Card>
      </div>

      <Footer/>
    </div>
  );
}

export default LandingPage;