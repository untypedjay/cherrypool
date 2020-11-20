import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Home.css';
import WalletModal from '../organisms/WalletModal';
import Menu from '../organisms/Menu';
import NoWallet from '../molecules/NoWallet';
import getWeb3 from "../../getWeb3";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";

function Home() {
  const [walletModal, setWalletModal] = useState(false);
  const [account, setAccount] = useState('');
  const location = useLocation();

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    getBlockchaindata();
  }, []);

  const getBlockchaindata = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      //--------------------
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

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