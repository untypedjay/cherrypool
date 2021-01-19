import React, {useEffect, useState} from 'react';
import Section from '../templates/Section';
import InputCard from '../molecules/InputCard';
import {useLoggedIn} from '../../context/LoggedInContext';
import {loadBlockchainData} from '../../helper/web3Helper';

function Faucet() {
  const isLoggedIn = useLoggedIn();

  useEffect(() => {

  }, []);

  const requestCTN = (amount: number) => {
    if (amount == 0) alert('ERROR: Amount cannot be 0!');
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          console.log(account.address);
          account.cherryToken.methods.mint(
            account.address,
            web3.utils.toWei(amount.toString(), 'ether')
          ).send({ from: account.address }).then((success: boolean) => {
            success ?
              alert(`Successfully added ${amount} CTN to your account.`) :
              alert('ERROR: Something went wrong on our side.');
          });
        }
      });
    }
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