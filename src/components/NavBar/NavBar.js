import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faMap, faInfo, faListUl } from '@fortawesome/free-solid-svg-icons';
import PdfExport from '../PdfExport/PdfExport';
import axios from 'axios';
import download from 'downloadjs';

function NavBar({
  close, closeTable, isInfoOpen, tableIsDisplay,
}) {
  const showMap = () => {
    if (isInfoOpen === true && tableIsDisplay === true) {
      close();
      closeTable();
    } else if (isInfoOpen === true) {
      close();
    } else if (tableIsDisplay === true) {
      closeTable();
    }
  };

  const exportConstructionSites = () => {
    axios.get('/api/v1/construction-sites/export')
      .then(response => {
        download(response.data, `export-chantier.csv`, 'application/csv');
      })
  }

  return (
    <div className="NavBar">
      <button type="button" className={(isInfoOpen || tableIsDisplay) ? 'NavBar__info' : 'NavBar__infoOpen'} onClick={showMap}>
        <Icon icon={faMap} className="NavBar__icon" />
      </button>
      <button type="button" className={!isInfoOpen ? 'NavBar__info' : 'NavBar__infoOpen'} onClick={close}>
        <Icon icon={faInfo} className="NavBar__icon" />
      </button>
      <button type="button" className={!tableIsDisplay ? 'NavBar__info' : 'NavBar__infoOpen'} onClick={closeTable}>
        <Icon icon={faListUl} className="NavBar__icon" />
      </button>
      <PdfExport />
      <button type="button" className={!tableIsDisplay ? 'NavBar__info' : 'NavBar__infoOpen'} onClick={exportConstructionSites}>
        <Icon icon={faListUl} className="NavBar__icon" />
      </button>
    </div>
  );
}

export default NavBar;
