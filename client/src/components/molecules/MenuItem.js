import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/MenuItem.css';

function MenuItem({ selected, route, icon }) {
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
}

MenuItem.propTypes = {
  selected: PropTypes.bool,
  route: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};

MenuItem.defaultProps = {
  selected: false
};

export default MenuItem;