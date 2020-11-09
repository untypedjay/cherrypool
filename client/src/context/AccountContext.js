import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AccountContext = React.createContext();
const AccountUpdateContext = React.createContext();

export function useAccount() {
  return useContext(AccountContext);
}

export function useUserUpdate() {
  return useContext(AccountUpdateContext);
}

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(null);

  const updateAccount = newAccount => {
    setAccount(newAccount);
  };

  return (
    <AccountContext.Provider value={account}>
      <AccountUpdateContext.Provider value={updateAccount}>
        { children }
      </AccountUpdateContext.Provider>
    </AccountContext.Provider>
  );
}

AccountProvider.propTypes = {
  children: PropTypes.object
}