import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWeb3Update } from '../../context/Web3Context';
import { useAccount, useAccountUpdate } from '../../context/AccountContext';
import Main from '../organisms/Main';
import WalletModal from '../organisms/WalletModal';
import Menu from '../organisms/Menu';
import NoWallet from '../molecules/NoWallet';
import { connectWeb3 } from '../../blockchainConnection';
import SimpleStorageContract from '../../contracts/SimpleStorage.json';
import '../../styles/Home.css';

function Home() {
  const [walletModal, setWalletModal] = useState(false);
  const location = useLocation();
  const account = useAccount();
  const setWeb3 = useWeb3Update();
  const setAccount = useAccountUpdate();

  useEffect(() => {
    getBlockchainData();
  }, []);

  const getBlockchainData = async () => {
    try {
      const web3 = await connectWeb3();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setWeb3(web3);

      const networkId = await web3.eth.net.getId();

      //--------------------
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      //setContract(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  return (
    <div className="home">
      { walletModal && <WalletModal closeModal={() => setWalletModal(false)}/> }
      <Menu selected={location.pathname}/>
      <main className="home__main">
        { account
          ? <Main onAccountAddressClick={() => setWalletModal(true)}/>
          : <NoWallet onClick={() => setWalletModal(true)}/>
        }
      </main>
    </div>
  );
}

export default Home;