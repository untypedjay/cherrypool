import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { FaGithub } from 'react-icons/fa';
import '../../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/"><img className="navbar__logo" src={Logo} alt="Cherry Pool"/></Link>
      <ul className="navbar__menu">
        <li><Link className="navbar__link" to="/borrow">Borrow</Link></li>
        <li><Link className="navbar__link" to="/exchange">Exchange</Link></li>
        <li><Link className="navbar__link" to="/stake">Stake</Link></li>
      </ul>
      <a target="_blank" href="https://github.com/johannesdominik/cherrypool" rel="noopener noreferrer">
        <FaGithub className="navbar__icon" size="45px"/>
      </a>
    </nav>
  );
}

export default Navbar;