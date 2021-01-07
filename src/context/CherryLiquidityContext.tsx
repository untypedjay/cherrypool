import React, { useContext, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode
};

type CherryLiquidityUpdate = (newLiquidity: object) => void;

const CherryLiquidityContext = React.createContext<object>({});
const CherryLiquidityUpdateContext = React.createContext<CherryLiquidityUpdate | null>(null);

export function useCherryLiquidity() {
  return useContext(CherryLiquidityContext);
};

export function useCherryLiquidityUpdate() {
  return useContext(CherryLiquidityUpdateContext);
};

export function CherryLiquidityProvider({ children }: Props) {
  const [cherryLiquidity, setCherryLiquidity] = useState<object>({});

  const updateCherryLiquidity = (newCherryLiquidity: object) => {
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