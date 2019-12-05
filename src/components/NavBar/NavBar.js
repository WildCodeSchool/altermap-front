import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavBar({ info, setInfo }) {
  return (
    <div className="NavBar">
      <Link to="/info" className="NavBar__info" onClick={() => setInfo(!info)}>
        <Icon icon={faInfo} className="NavBar__icon" />
      </Link>
    </div>
  );
}

export default NavBar;
