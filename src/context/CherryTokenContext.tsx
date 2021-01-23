import React, { useContext, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode
};

type CherryTokenUpdate = (newToken: object) => void;

const CherryTokenContext = React.createContext<any>({});
const CherryTokenUpdateContext = React.createContext<CherryTokenUpdate | null>(null);

export function useCherryToken() {
  return useContext(CherryTokenContext);
};

export function useCherryTokenUpdate() {
  return useContext(CherryTokenUpdateContext);
};

export function CherryTokenProvider({ children }: Props) {
  const [cherryToken, setCherryToken] = useState<any>({});

  const updateCherryToken = (newCherryToken: any) => {
    setCherryToken(newCherryToken);
  };

  return (
    <CherryTokenContext.Provider value={cherryToken}>
      <CherryTokenUpdateContext.Provider value={updateCherryToken}>
        { children }
      </CherryTokenUpdateContext.Provider>
    </CherryTokenContext.Provider>
  );
}
