import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavBar({ info, setInfo }) {
  return (
    <div className="NavBar">
<<<<<<< HEAD
      <Link to={info ? '/' : '/info'} className="NavBar__info" onClick={() => setInfo(!info)}>
        <Icon icon={faInfo} className="NavBar__icon" />
      </Link>
=======
      <a href="/" className="NavBar__info">
        <Icon icon={faInfo} />
      </a>
>>>>>>> Add control bar on right and border buttons
    </div>
  );
}

export default NavBar;
