import Web3 from 'web3';

const getWeb3 = async () => {
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

export const getExistingWeb3 = () => {
  if (window.web3) {
    return window.web3;
  }

  return null;
}

export default getWeb3;
