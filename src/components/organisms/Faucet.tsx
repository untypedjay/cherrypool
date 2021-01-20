import React, { useEffect } from 'react';
import Section from '../templates/Section';
import InputCard from '../molecules/InputCard';
import {useLoggedIn} from '../../context/LoggedInContext';
import {loadBlockchainData} from '../../helper/web3Helper';

function Faucet() {
  const isLoggedIn = useLoggedIn();

  const requestCTN = (amount: number) => {
    if (amount == 0) alert('ERROR: Amount cannot be 0!');
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          account.cherryToken.methods.mint(
            account.address,
            web3.utils.toWei(amount.toString())
          ).send({ from: account.address }).then((success: boolean) => {
            if (!success) alert('ERROR: Something went wrong.');
          });
        }
      });
    }
  };

  const donateCTN = (amount: number) => {
    if (amount == 0) alert('ERROR: Amount cannot be 0!');
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          account.cherryToken.methods.balanceOf(account.address).call().then((ctnBalanceInWei: number) => {
            const ctnBalance = web3.utils.fromWei(ctnBalanceInWei);

            if (amount > parseFloat(ctnBalance)) {
              alert('ERROR: Account balance is lower than input value!');
            } else {
              account.cherryToken.methods.burn(
                account.address,
                web3.utils.toWei(amount.toString())
              ).send({ from: account.address }).then((success: boolean) => {
                if (!success) alert('ERROR: Something went wrong.');
              });
            }
          });
        }
      });
    }
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