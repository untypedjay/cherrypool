import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHandHoldingUsd, FaExchangeAlt, FaPiggyBank } from 'react-icons/fa';
import MenuItem from '../molecules/MenuItem';
import Logo from '../../images/logo-small.png';
import '../../styles/Menu.css';

function Menu({ selected }) {
  const iconSize = '35px';

  return (
    <div className="menu">
      <Link to="/"><img className="menu__logo" src={Logo} alt="Cherry Pool"/></Link>
      <MenuItem
        selected={selected === '/borrow'}
        route="/borrow"
        icon={<FaHandHoldingUsd className="menu__icon" size={iconSize}/>}
      />

      <MenuItem
        selected={selected === '/exchange'}
        route="/exchange"
        icon={<FaExchangeAlt className="menu__icon" size={iconSize}/>}
      />

      <MenuItem
        selected={selected === '/stake'}
        route="/stake"
        icon={<FaPiggyBank className="menu__icon" size={iconSize}/>}
      />
    </div>
  );
}

Menu.propTypes = {
  selected: PropTypes.string.isRequired
};

export default Menu;