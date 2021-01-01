import React, { useContext, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode
};

const AccountContext = React.createContext({});
const AccountUpdateContext = React.createContext({});

export function useAccount() {
  return useContext(AccountContext);
};

export function useAccountUpdate() {
  return useContext(AccountUpdateContext);
};

export function AccountProvider({ children }: Props) {
  const [account, setAccount] = useState<any>('');

  const updateAccount = (newAccount: string) => {
    setAccount(newAccount);
  };

  return (
    <AccountContext.Provider value={account}>
      <AccountUpdateContext.Provider value={updateAccount}>
        { children }
      </AccountUpdateContext.Provider>
    </AccountContext.Provider>
  );
};