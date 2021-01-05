import Web3 from 'web3';

export async function connectWeb3() {
  const ethereum = (window as any).ethereum;
  if (ethereum) {
    const web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
    } catch (error) {
      console.log(error);
    }
    return web3;
  } else if ((window as any).web3) {
    return (window as any).web3;
  } else {
    alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

export function tryReconnectWeb3() {
  if ((window as any).web3) {
    return (window as any).web3;
  }

  return null;
};

