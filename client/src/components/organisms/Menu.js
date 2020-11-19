import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingUsd, FaExchangeAlt, FaPiggyBank } from 'react-icons/fa';
import Logo from '../../images/logo-small.png';
import '../../styles/Menu.css';

function Menu({ section, setSection }) {
  const iconSize = '35px';

  return (
    <div className="menu">
      <Link to="/"><img className="menu__logo" src={Logo} alt="Cherry Pool"/></Link>
      <button className="menu__item" onClick={() => setSection('borrow')}>
        <FaHandHoldingUsd className="menu__icon" size={iconSize}/>
        <p className="menu__item-text">Borrow</p>
      </button>
      <button className="menu__item" onClick={() => setSection('exchange')}>
        <FaExchangeAlt className="menu__icon" size={iconSize}/>
        <p className="menu__item-text">Exchange</p>
      </button>
      <button className="menu__item" onClick={() => setSection('stake')}>
        <FaPiggyBank className="menu__icon" size={iconSize}/>
        <p className="menu__item-text">Stake</p>
      </button>
    </div>
  );
}

export default Menu;