import React, { useState } from 'react';
import './AddOrRemoveLiquidity.css';
import PrimaryButton from '../atoms/PrimaryButton';
import EthLogo from '../../images/icn-eth.png';
import CtnLogo from '../../images/logo-small.png';

interface Props {
  action: (ethSupply: number) => any,
  buttonText: string
}

function AddOrRemoveLiquidity({ action, buttonText }: Props) {
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((event as any).target.value);
  };

  return (
    <div className="add-or-remove-liquidity">
      <img className="add-or-remove-liquidity__image" src={EthLogo}/>
      <input className="add-or-remove-liquidity__input" type="number" value={inputValue} onChange={handleChange}/>

      <img className="add-or-remove-liquidity__image" src={CtnLogo}/>
      <input className="add-or-remove-liquidity__input" type="number" value={inputValue * 1000} disabled/>
      <PrimaryButton onClick={() => action(inputValue)}>{ buttonText }</PrimaryButton>
    </div>
  );
}

export default AddOrRemoveLiquidity;