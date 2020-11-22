import Web3 from 'web3';

export async function connectWeb3() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.log(error);
    }
    return web3;
  } else if (window.web3) {
    return window.web3;
  } else {
    alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

export function tryReconnectWeb3() {
  if (window.web3) {
    return window.web3;
  }

  return null;
};

