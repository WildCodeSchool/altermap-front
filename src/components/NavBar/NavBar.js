import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  return (
    <div className="NavBar">
      <a href="#" className="NavBar__info">
        <Icon icon={faInfo} />
      </a>
    </div>
  );
}

export default NavBar;
