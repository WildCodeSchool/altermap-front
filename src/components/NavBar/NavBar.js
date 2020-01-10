import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

function NavBar({ close, info, displayLayer }) {
  return (
    <div className="NavBar">
      <button type="button" className="NavBar__info" onClick={close}>
        <Icon icon={faInfo} className="NavBar__icon" />
      </button>
    </div>
  );
}

export default NavBar;
