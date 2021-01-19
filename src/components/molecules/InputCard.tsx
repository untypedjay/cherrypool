import React, { useState } from 'react';
import './InputCard.css';
import PrimaryButton from '../atoms/PrimaryButton';

interface Props {
  action: (inputValue: number) => any
  actionText: string
}

function InputCard({ action, actionText }: Props) {
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((event as any).target.value);
  };

  return (
    <div className="input-card">
      <input type="number" value={inputValue} onChange={handleChange}/>
      <PrimaryButton onClick={() => action(inputValue)}>{ actionText } { inputValue } CTN</PrimaryButton>
    </div>
  )
}