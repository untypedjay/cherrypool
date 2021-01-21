import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaExchangeAlt, FaChartPie, FaShower } from 'react-icons/fa';
import { useLoggedIn } from '../../context/LoggedInContext';
import MenuItem from '../molecules/MenuItem';
import { loadBlockchainData } from '../../helper/web3Helper';
import Logo from '../../images/logo.png';
import './Menu.css';

interface Props {
  selected: string;
};

function Menu({ selected }: Props) {
  const [network, setNetwork] = useState('-');
  const isLoggedIn = useLoggedIn();
  const iconSize = '30px';

  useEffect(() => {
    if (isLoggedIn) {
      loadBlockchainData().then((account) => {
        const web3 = (window as any).web3;

        if (account) {
          web3.eth.net.getNetworkType().then((networkName: string) => {
            setNetwork(networkName.charAt(0).toUpperCase() + networkName.slice(1));
          });
        }
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="menu">
      <Link to="/"><img className="menu__logo" src={Logo} alt="Cherry Pool"/></Link>
      <p className="menu__network">Network: { network }</p>

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
};

export default Menu;