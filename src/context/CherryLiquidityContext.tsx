import React, { useContext, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode
};

type CherryLiquidityUpdate = (newLiquidity: any) => void;

const CherryLiquidityContext = React.createContext<any>({});
const CherryLiquidityUpdateContext = React.createContext<CherryLiquidityUpdate | null>(null);

export function useCherryLiquidity() {
  return useContext(CherryLiquidityContext);
};

export function useCherryLiquidityUpdate() {
  return useContext(CherryLiquidityUpdateContext);
};

export function CherryLiquidityProvider({ children }: Props) {
  const [cherryLiquidity, setCherryLiquidity] = useState<any>({});

  const updateCherryLiquidity = (newCherryLiquidity: any) => {
    setCherryLiquidity(newCherryLiquidity);
  };

  return (
    <CherryLiquidityContext.Provider value={cherryLiquidity}>
      <CherryLiquidityUpdateContext.Provider value={updateCherryLiquidity}>
        { children }
      </CherryLiquidityUpdateContext.Provider>
    </CherryLiquidityContext.Provider>
  );
};