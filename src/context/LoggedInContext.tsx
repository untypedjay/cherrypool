import React, { useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

type Props = {
  children: ReactNode
};

type LoggedInUpdate = (newState: boolean) => void;

const LoggedInContext = React.createContext<boolean>(false);
const LoggedInUpdateContext = React.createContext<LoggedInUpdate | null>(null);

export function useLoggedIn() {
  return useContext(LoggedInContext);
};

export function useLoggedInUpdate() {
  return useContext(LoggedInUpdateContext);
};

export function AccountProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);

  const updateLoggedIn = (newState: boolean) => {
    setIsLoggedIn(newState);
  };

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <LoggedInUpdateContext.Provider value={updateLoggedIn}>
        { children }
      </LoggedInUpdateContext.Provider>
    </LoggedInContext.Provider>
  );
};