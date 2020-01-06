import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavBar({ close, info, popup }) {
  return (
    <div className="NavBar">
      <Link to={info ? '/' : '/info'} className="NavBar__info" onClick={() => close()}>
        <Icon icon={faInfo} className="NavBar__icon" />
      </Link>
      <button type="button" onClick={() => popup(true)}>
        <Icon icon={faInfo} className="NavBar__icon" />
      </button>
    </div>
  );
}

export default NavBar;
