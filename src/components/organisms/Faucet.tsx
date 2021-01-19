import React from 'react';
import Section from '../templates/Section';
import InputCard from '../molecules/InputCard';

function Faucet() {
  const requestCTN = (amount: number) => {

  };

  const donateCTN = (amount: number) => {
    // check if amount is lower than balance
  };

  return (
    <div className="faucet">
      <Section title="Request CherryToken">
        <InputCard action={requestCTN} buttonText="Request"/>
      </Section>

      <Section title="Donate CherryToken">
        <InputCard action={donateCTN} buttonText="Donate"/>
      </Section>
    </div>
  );
}

export default Faucet;