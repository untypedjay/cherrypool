import React from 'react';
import './TermsOfUse.css';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

function TermsOfUse() {
  return (
    <div className="terms-of-use">
      <Navbar/>
      <header className="terms-of-use__header">
        <h1 className="terms-of-use__heading--main">Terms of use</h1>
      </header>
      <main className="terms-of-use__main">
        <p className="terms-of-use__paragraph">
          Cherry Pool ("we", "us", "our", "Company") welcomes you (the "User(s)", or "you") to our application known as
          "Cherry Pool" (the "Site", or "Platform"). Each of the Site’s visitors and/or the Platform’s Users may use
          the Services in accordance with the terms and conditions hereunder.
        </p>

        <h3 className="terms-of-use__heading--text">1. Acceptance of the Terms</h3>
        <p className="terms-of-use__paragraph">
          By entering to, connecting to, accessing or using the Site and/or Platform you acknowledge that you have read
          and understood the following terms of use and you agree to be bound by them and to comply with all applicable
          laws and regulations regarding your use of the Site and/or Platform.
        </p>

        <h3 className="terms-of-use__heading--text">2. The Services</h3>
        <p className="terms-of-use__paragraph">
          Cherry Pool is a decentralized financial platform for individuals. Cherry Pool will not be liable for any
          damage or loss incurred by you or any other person as a result of or in connection with your use of the
          services and/or the content available therein is entirely at your own risk.
        </p>
      </main>
      <Footer/>
    </div>
  );
}

export default TermsOfUse;