import React, { useState } from 'react';
import './InputCard.css';
import PrimaryButton from '../atoms/PrimaryButton';

interface Props {
  action: (inputValue: number) => any
  buttonText: string
}

function InputCard({ action, buttonText }: Props) {
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event as any).target.value <= 10000) {
      setInputValue((event as any).target.value);
    }
  };

  return (
    <div className="input-card">
      <input className="input-card__input" type="number" value={inputValue} onChange={handleChange}/>
      <PrimaryButton onClick={() => { action(inputValue); setInputValue(0); }}>{ buttonText }</PrimaryButton>
    </div>
  );
}

export default InputCard;