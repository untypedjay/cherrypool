import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaHandHoldingUsd, FaExchangeAlt, FaPiggyBank } from 'react-icons/fa';
import Logo from '../../images/logo-small.png';
import '../../styles/Menu.css';

function Menu({ selected }) {
  const iconSize = '35px';
  const history = useHistory();

  const calculateStyling = section => {
    if (section === selected) {
      return 'menu__item menu__item--selected';
    }
    return 'menu__item';
  };

  return (
    <div className="menu">
      <Link to="/"><img className="menu__logo" src={Logo} alt="Cherry Pool"/></Link>
      <button className={calculateStyling('/borrow')} onClick={() => history.push('/borrow')}>
        <FaHandHoldingUsd className="menu__icon" size={iconSize}/>
        <p className="menu__item-text">Borrow</p>
      </button>
      <button className={calculateStyling('/exchange')} onClick={() => history.push('/exchange')}>
        <FaExchangeAlt className="menu__icon" size={iconSize}/>
        <p className="menu__item-text">Exchange</p>
      </button>
      <button className={calculateStyling('/stake')} onClick={() => history.push('/stake')}>
        <FaPiggyBank className="menu__icon" size={iconSize}/>
        <p className="menu__item-text">Stake</p>
      </button>
    </div>
  );
}

export default Menu;