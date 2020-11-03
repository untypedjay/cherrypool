import React from 'react';
import Button from '../atoms/Button';
import Card from '../organisms/Card';
import './Home.css';

function Home() {

  return (
    <div className="home">
      <div className="home__cards">
        <Card heading="Borrow Crypto" button={<Button>Borrow</Button>}>
          <p>Borrow cryptocurrencies and ERC20 tokens without the bureaucracy of a centralized agency.</p>
        </Card>
        <Card heading="Exchange Crypto" button={<Button>Exchange</Button>}>
          <p>Exchange your cryptocurrencies and ERC20 tokens in a decentralized way.</p>
        </Card>
        <Card heading="Stake Crypto" button={<Button>Stake</Button>}>
          <p>Do more with your crypto assets. Invest them and earn passive income.</p>
        </Card>
      </div>
    </div>
  );
}

export default Home;