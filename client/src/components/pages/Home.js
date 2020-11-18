import React, { useState } from 'react';
import Navbar from '../organisms/Navbar';
import '../../styles/Home.css';
import LandingPage from "./LandingPage";

function Home() {
  const [account, setAccount] = useState('');
  if (!account) {
    return <LandingPage/>;
  }
  return (
    <div className="home">
      <Navbar/>
      <main className="home__main">
        <h1>Main Page</h1>
      </main>
    </div>
  );
}

export default Home;