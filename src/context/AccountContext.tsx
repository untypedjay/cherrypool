import React, { useContext, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode
};

type AccountUpdate = (newAccount: string) => void;

const AccountContext = React.createContext('');
const AccountUpdateContext = React.createContext<AccountUpdate | null>(null);

export function useAccount() {
  return useContext(AccountContext);
};

export function useAccountUpdate() {
  return useContext(AccountUpdateContext);
};

export function AccountProvider({ children }: Props) {
  const [account, setAccount] = useState<string>('0x0');

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