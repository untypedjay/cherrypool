import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaExchangeAlt, FaChartPie, FaShower } from 'react-icons/fa';
import MenuItem from '../molecules/MenuItem';
import Logo from '../../images/logo.png';
import './Menu.css';

interface Props {
  selected: string;
};

function Menu({ selected }: Props) {
  const iconSize = '30px';

  return (
    <div className="menu">
      <Link to="/"><img className="menu__logo" src={Logo} alt="Cherry Pool"/></Link>

      <MenuItem
        selected={selected === '/portfolio'}
        route="/portfolio"
        icon={<FaChartLine className="menu__icon" size={iconSize}/>}
      />

      <MenuItem
        selected={selected === '/swap'}
        route="/swap"
        icon={<FaExchangeAlt className="menu__icon" size={iconSize}/>}
      />

      <MenuItem
        selected={selected === '/liquidity'}
        route="/liquidity"
        icon={<FaChartPie className="menu__icon" size={iconSize}/>}
      />

      <MenuItem
        selected={selected === '/faucet'}
        route="/faucet"
        icon={<FaShower className="menu__icon" size={iconSize}/>}
      />
    </div>
  );
}

export default Menu;
