import React, { useState } from 'react';
import './AddOrRemoveLiquidity.css';
import PrimaryButton from '../atoms/PrimaryButton';
import EthLogo from '../../images/icn-eth.png';
import CtnLogo from '../../images/logo-small.png';

interface Props {
  action: (ethSupply: number) => void,
  buttonText: string
}

function AddOrRemoveLiquidity({ action, buttonText }: Props) {
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((event as any).target.value);
  };

  return (
    <div className="add-or-remove-liquidity">
      <img className="add-or-remove-liquidity__image" src={EthLogo} alt="Ethereum Logo"/>
      <input className="add-or-remove-liquidity__input" type="number" value={inputValue} onChange={handleChange}/>

      <img className="add-or-remove-liquidity__image" src={CtnLogo} alt="CherryToken Logo"/>
      <input className="add-or-remove-liquidity__input" type="number" value={inputValue * 1000} disabled/>
      <PrimaryButton onClick={() => { action(inputValue); setInputValue(0); }}>{ buttonText }</PrimaryButton>
    </div>
  );
}

export default AddOrRemoveLiquidity;