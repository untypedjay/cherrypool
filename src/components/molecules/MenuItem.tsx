import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import './MenuItem.css';

interface Props {
  selected: boolean;
  route: string;
  icon: ReactNode;
}

function MenuItem({ selected, route, icon }: Props) {
  const history = useHistory();

  const calculateStyling = () => {
    if (selected) {
      return 'menu-item menu-item--selected';
    }
    return 'menu-item';
  };

  return (
    <button className={calculateStyling()} onClick={() => history.push(route)}>
      { icon }
      <p className="menu-item__text">{ `${route.charAt(1).toUpperCase()}${route.substring(2, route.length)}` }</p>
    </button>
  );
};

export default MenuItem;