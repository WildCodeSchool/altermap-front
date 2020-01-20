import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faInfo, faListUl } from '@fortawesome/free-solid-svg-icons';

function NavBar({ close, closeTable }) {
  return (
    <div className="NavBar">
      <button type="button" className="NavBar__info" onClick={close}>
        <Icon icon={faInfo} className="NavBar__icon" />
      </button>
      <button type="button" className="NavBar__info" onClick={closeTable}>
        <Icon icon={faListUl} className="NavBar__icon" />
      </button>
    </div>
  );
}

export default NavBar;
