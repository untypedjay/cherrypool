import React, {useState} from 'react';
import PrimaryButton from '../Button/PrimaryButton';
import './ExchangeCard.css';

interface Props {
  logo: string,
  action: (ethSupply: number) => void,
  buttonText: string
}

export default function ExchangeCard({ logo, action, buttonText }: Props) {
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((event as any).target.value);
  };

  return (
    <div className="exchange-card">
      <img className="exchange-card__image" src={logo} alt="Ethereum Logo"/>
      <input className="exchange-card__input" type="number" value={inputValue} onChange={handleChange}/>

      <PrimaryButton onClick={() => { action(inputValue); setInputValue(0); }}>{ buttonText }</PrimaryButton>
    </div>
  );
}