import React from 'react';
import Logo from '../../images/logo.png';
import '../../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img src={Logo} alt="Cherry Pool"/>
      <ul>
        <li>Borrow</li>
        <li>Exchange</li>
        <li>Stake</li>
      </ul>
    </nav>
  );
}

export default Navbar;