import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const Web3Context = React.createContext();
const Web3UpdateContext = React.createContext();

export function useWeb3() {
  return useContext(Web3Context);
}

export function useWeb3Update() {
  return useContext(Web3UpdateContext);
}

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);

  const updateWeb3 = newWeb3 => {
    setWeb3(newWeb3);
  };

  return (
    <Web3Context.Provider value={web3}>
      <Web3UpdateContext.Provider value={updateWeb3}>
        { children }
      </Web3UpdateContext.Provider>
    </Web3Context.Provider>
  );
}

Web3Provider.propTypes = {
  children: PropTypes.object
}