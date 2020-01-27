import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faMap, faInfo, faListUl } from '@fortawesome/free-solid-svg-icons';
import PdfExport from '../PdfExport/PdfExport';

function NavBar({ close, closeTable }) {
  return (
    <div className="NavBar">
      <button type="button" className="NavBar__info">
        <Icon icon={faMap} className="NavBar__icon" />
      </button>
      <button type="button" className="NavBar__info" onClick={close}>
        <Icon icon={faInfo} className="NavBar__icon" />
      </button>
      <button type="button" className="NavBar__info" onClick={closeTable}>
        <Icon icon={faListUl} className="NavBar__icon" />
      </button>
      <PdfExport />
    </div>
  );
}

export default NavBar;
