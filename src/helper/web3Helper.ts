import Web3 from 'web3';
import CherryToken from '../abis/CherryToken.json';
import CherryLiquidity from '../abis/CherryLiquidity.json';

export async function loadBlockchainData() {
  if (!loadWeb3()) return null;
  const web3 = (window as any).web3;

  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();

  let cherryToken;
  let cherryLiquidity;

  // load CherryToken
  const cherryTokenData = (CherryToken as any).networks[networkId];
  if (cherryTokenData) {
    cherryToken = new web3.eth.Contract((CherryToken as any).abi, cherryTokenData.address);
  } else {
    alert('CherryToken contract not deployed to detected network!');
    return null;
  }

  // load CherryLiquidity
  const cherryLiquidityData = (CherryLiquidity as any).networks[networkId];
  if (cherryLiquidityData) {
    cherryLiquidity = new web3.eth.Contract((CherryLiquidity as any).abi, cherryLiquidityData.address);
  } else {
    alert('CherryLiquidity contract not deployed to detected network!');
    return null;
  }

  return { address: accounts[0], cherryToken: cherryToken, cherryLiquidity: cherryLiquidity };
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