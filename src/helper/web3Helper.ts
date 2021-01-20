import Web3 from 'web3';
import CherryToken from '../abis/CherryToken.json';
import CherryPool from '../abis/CherryPool.json';

export async function loadBlockchainData() {
  if (!loadWeb3()) return null;
  const web3 = (window as any).web3;

  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();

  let cherryToken;
  let cherryPool;

  // load CherryToken
  const cherryTokenData = (CherryToken as any).networks[networkId];
  if (cherryTokenData) {
    cherryToken = new web3.eth.Contract((CherryToken as any).abi, cherryTokenData.address);
  } else {
    alert('CherryToken contract not deployed to detected network!');
    return null;
  }

  // load CherryPool
  const cherryPoolData = (CherryPool as any).networks[networkId];
  if (cherryPoolData) {
    cherryPool = new web3.eth.Contract((CherryPool as any).abi, cherryPoolData.address);
  } else {
    alert('CherryPool contract not deployed to detected network!');
    return null;
  }

  return { address: accounts[0], cherryToken: cherryToken, cherryPool: cherryPool };
};

function loadWeb3() {
  if ((window as any).ethereum) {
    (window as any).web3 = new Web3((window as any).ethereum);
    (window as any).ethereum.enable().then();
    return true;
  } else if ((window as any).web3) {
    (window as any).web3 = new Web3((window as any).web3.currentProvider);
    return true;
  }

  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  return false;
}